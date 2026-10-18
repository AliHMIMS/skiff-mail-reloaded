//! A JSON-backed GraphQL server built from the client's own schema (completeSchema.graphql).
//!
//! Every field of the schema exists. Root fields with a registered handler run it and return a JSON tree;
//! nested fields are read from that JSON by name. Anything missing resolves to a type-correct empty value
//! (null when nullable, otherwise ""/0/false/[]/first enum value/empty object) so the UI never breaks on a
//! feature this server doesn't implement.

use std::{collections::HashMap, future::Future, io::Read, pin::Pin, sync::Arc};

use anyhow::{Context as _, Result};
use async_graphql::{
    ErrorExtensions as _, Name, Value,
    dynamic::{
        Enum, EnumItem, Field, FieldFuture, FieldValue, InputObject, InputValue, Interface, InterfaceField, Object,
        ResolverContext, Scalar, Schema, SchemaBuilder, TypeRef, Union,
    },
    parser::types::{BaseType, Type, TypeKind, TypeSystemDefinition},
};
use serde_json::{Map, Value as Json, json};

/// Error carrying a GraphQL `extensions.code` the client understands (NOT_AUTHORIZED, NOT_FOUND, BAD_REQUEST...).
#[derive(Debug)]
pub struct CodedError {
    pub code: &'static str,
    pub message: String,
}

impl std::fmt::Display for CodedError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.message)
    }
}

impl std::error::Error for CodedError {}

pub fn coded(code: &'static str, message: impl Into<String>) -> anyhow::Error {
    CodedError { code, message: message.into() }.into()
}

/// What a handler sees: its arguments (uploads already inlined as text) and per-request data.
pub struct Call<S> {
    pub args: Json,
    pub state: Arc<S>,
    pub request: RequestData,
}

/// Per-HTTP-request data: the session cookie value and cookies to set on the response.
#[derive(Clone, Default)]
pub struct RequestData {
    pub session_token: Option<String>,
    pub set_cookies: Arc<std::sync::Mutex<Vec<String>>>,
}

pub type HandlerFuture = Pin<Box<dyn Future<Output = Result<Json>> + Send>>;
pub type Handler<S> = Arc<dyn Fn(Call<S>) -> HandlerFuture + Send + Sync>;

pub struct Handlers<S> {
    map: HashMap<String, Handler<S>>,
}

impl<S> Default for Handlers<S> {
    fn default() -> Self {
        Self { map: HashMap::new() }
    }
}

impl<S: Send + Sync + 'static> Handlers<S> {
    /// Register a handler for a root field, e.g. `"Query.mailbox"` or `"Mutation.loginSrp"`.
    pub fn on<F, Fut>(&mut self, field: &str, f: F)
    where
        F: Fn(Call<S>) -> Fut + Send + Sync + 'static,
        Fut: Future<Output = Result<Json>> + Send + 'static,
    {
        self.map.insert(field.to_string(), Arc::new(move |c| Box::pin(f(c))));
    }
}

#[derive(Clone, Copy, PartialEq)]
enum Kind {
    Scalar,
    Enum,
    Object,
    Abstract,
    Input,
}

/// Type information needed while resolving.
#[derive(Default)]
struct Catalog {
    kinds: HashMap<String, Kind>,
    first_enum_value: HashMap<String, String>,
    first_possible_type: HashMap<String, String>,
}

fn type_ref(ty: &Type) -> TypeRef {
    let base = match &ty.base {
        BaseType::Named(name) => TypeRef::Named(name.to_string().into()),
        BaseType::List(inner) => TypeRef::List(Box::new(type_ref(inner))),
    };
    if ty.nullable { base } else { TypeRef::NonNull(Box::new(base)) }
}

fn json_to_gql(v: &Json) -> Value {
    Value::from_json(v.clone()).unwrap_or(Value::Null)
}

impl Catalog {
    fn empty(&self, ty: &TypeRef) -> Option<FieldValue<'static>> {
        match ty {
            TypeRef::NonNull(inner) => Some(self.empty(inner).unwrap_or(FieldValue::NULL)),
            TypeRef::List(_) => Some(FieldValue::list(Vec::<FieldValue>::new())),
            TypeRef::Named(name) => {
                let name = name.as_ref();
                Some(match (self.kinds.get(name), name) {
                    (_, "String" | "ID") => FieldValue::value(""),
                    (_, "Int") => FieldValue::value(0),
                    (_, "Float") => FieldValue::value(0.0),
                    (_, "Boolean") => FieldValue::value(false),
                    (_, "Date") => FieldValue::value(0),
                    (_, "PublicKey" | "PublicKeyWithSignature") => FieldValue::value(json_to_gql(&json!({"key": ""}))),
                    (_, "JSON") => FieldValue::value(json_to_gql(&json!({}))),
                    (Some(Kind::Enum), _) => FieldValue::value(Value::Enum(Name::new(
                        self.first_enum_value.get(name).cloned().unwrap_or_default(),
                    ))),
                    (Some(Kind::Object), _) => FieldValue::owned_any(Json::Object(Map::new())),
                    (Some(Kind::Abstract), _) => FieldValue::owned_any(Json::Object(Map::new()))
                        .with_type(self.first_possible_type.get(name).cloned().unwrap_or_default()),
                    _ => FieldValue::NULL,
                })
            }
        }
    }

    /// Nullable fields resolve to None (null); non-null ones get an empty value.
    fn empty_or_null(&self, ty: &TypeRef) -> Option<FieldValue<'static>> {
        match ty {
            TypeRef::NonNull(_) => self.empty(ty),
            _ => None,
        }
    }

    fn convert(&self, v: Json, ty: &TypeRef) -> Option<FieldValue<'static>> {
        if v.is_null() {
            return self.empty_or_null(ty);
        }
        match ty {
            TypeRef::NonNull(inner) => self.convert(v, inner).or_else(|| self.empty(inner)),
            TypeRef::List(inner) => match v {
                Json::Array(items) => Some(FieldValue::list(
                    items.into_iter().map(|i| self.convert(i, inner).unwrap_or(FieldValue::NULL)),
                )),
                _ => Some(FieldValue::list(Vec::<FieldValue>::new())),
            },
            TypeRef::Named(name) => match self.kinds.get(name.as_ref()) {
                Some(Kind::Enum) => v.as_str().map(|s| FieldValue::value(Value::Enum(Name::new(s)))),
                Some(Kind::Object) => Some(FieldValue::owned_any(v)),
                Some(Kind::Abstract) => {
                    let ty = v
                        .get("__typename")
                        .and_then(Json::as_str)
                        .map(str::to_string)
                        .or_else(|| self.first_possible_type.get(name.as_ref()).cloned())
                        .unwrap_or_default();
                    Some(FieldValue::owned_any(v).with_type(ty))
                }
                _ => Some(FieldValue::value(json_to_gql(&v))),
            },
        }
    }
}

/// Replace upload markers ("#__graphql_file__:N") in the arguments with the uploaded file's text.
fn inline_uploads(v: &mut Json, ctx: &ResolverContext<'_>) -> Result<()> {
    match v {
        Json::String(s) => {
            if let Some(idx) = s.strip_prefix("#__graphql_file__:").and_then(|n| n.parse::<usize>().ok()) {
                let mut text = String::new();
                async_graphql::Upload(idx)
                    .value(ctx.ctx)
                    .context("reading upload")?
                    .into_read()
                    .read_to_string(&mut text)
                    .context("upload is not text")?;
                *s = text;
            }
        }
        Json::Array(items) => items.iter_mut().try_for_each(|i| inline_uploads(i, ctx))?,
        Json::Object(map) => map.values_mut().try_for_each(|i| inline_uploads(i, ctx))?,
        _ => {}
    }
    Ok(())
}

fn to_gql_error(e: anyhow::Error) -> async_graphql::Error {
    let code = e.downcast_ref::<CodedError>().map(|c| c.code).unwrap_or("INTERNAL_SERVER_ERROR");
    if code == "INTERNAL_SERVER_ERROR" {
        tracing::warn!("handler error: {e:#}");
    }
    async_graphql::Error::new(format!("{e:#}")).extend_with(|_, ext| ext.set("code", code))
}

pub fn build<S: Send + Sync + 'static>(sdl: &str, handlers: Handlers<S>, state: Arc<S>) -> Result<Schema> {
    let doc = async_graphql::parser::parse_schema(sdl).context("parsing schema")?;
    let defs: Vec<_> = doc
        .definitions
        .into_iter()
        .filter_map(|d| match d {
            TypeSystemDefinition::Type(t) => Some(t.node),
            _ => None,
        })
        .collect();

    // Merge `extend type` definitions (client-local fields) into their base types.
    let mut merged: Vec<async_graphql::parser::types::TypeDefinition> = Vec::new();
    for def in defs {
        if let Some(base) = merged.iter_mut().find(|m| m.name.node == def.name.node) {
            match (&mut base.kind, def.kind) {
                (TypeKind::Object(b), TypeKind::Object(e)) => b.fields.extend(e.fields),
                (TypeKind::InputObject(b), TypeKind::InputObject(e)) => b.fields.extend(e.fields),
                (TypeKind::Enum(b), TypeKind::Enum(e)) => b.values.extend(e.values),
                _ => {}
            }
        } else {
            merged.push(def);
        }
    }

    let mut catalog = Catalog::default();
    for def in &merged {
        let name = def.name.node.to_string();
        let kind = match &def.kind {
            TypeKind::Scalar => Kind::Scalar,
            TypeKind::Enum(e) => {
                if let Some(first) = e.values.first() {
                    catalog.first_enum_value.insert(name.clone(), first.node.value.node.to_string());
                }
                Kind::Enum
            }
            TypeKind::Object(_) => Kind::Object,
            TypeKind::Interface(_) | TypeKind::Union(_) => Kind::Abstract,
            TypeKind::InputObject(_) => Kind::Input,
        };
        catalog.kinds.insert(name, kind);
    }
    for def in &merged {
        match &def.kind {
            TypeKind::Union(u) => {
                if let Some(first) = u.members.first() {
                    catalog.first_possible_type.insert(def.name.node.to_string(), first.node.to_string());
                }
            }
            TypeKind::Object(o) => {
                for iface in &o.implements {
                    catalog
                        .first_possible_type
                        .entry(iface.node.to_string())
                        .or_insert_with(|| def.name.node.to_string());
                }
            }
            _ => {}
        }
    }
    let catalog = Arc::new(catalog);
    let handlers = Arc::new(handlers.map);

    let mut builder: SchemaBuilder = Schema::build("Query", Some("Mutation"), None);
    for def in merged {
        let type_name = def.name.node.to_string();
        if matches!(type_name.as_str(), "String" | "Int" | "Float" | "Boolean" | "ID") {
            continue;
        }
        builder = match def.kind {
            TypeKind::Scalar => builder.register(Scalar::new(type_name)),
            TypeKind::Enum(e) => builder.register(
                e.values
                    .iter()
                    .fold(Enum::new(type_name), |en, v| en.item(EnumItem::new(v.node.value.node.to_string()))),
            ),
            TypeKind::InputObject(io) => {
                builder.register(io.fields.iter().fold(InputObject::new(type_name), |obj, f| {
                    obj.field(InputValue::new(f.node.name.node.to_string(), type_ref(&f.node.ty.node)))
                }))
            }
            TypeKind::Union(u) => builder
                .register(u.members.iter().fold(Union::new(type_name), |un, m| un.possible_type(m.node.to_string()))),
            TypeKind::Interface(i) => builder.register(i.fields.iter().fold(Interface::new(type_name), |iface, f| {
                let field = f
                    .node
                    .arguments
                    .iter()
                    .fold(InterfaceField::new(f.node.name.node.to_string(), type_ref(&f.node.ty.node)), |fd, a| {
                        fd.argument(InputValue::new(a.node.name.node.to_string(), type_ref(&a.node.ty.node)))
                    });
                iface.field(field)
            })),
            TypeKind::Object(o) => {
                let mut obj = Object::new(type_name.clone());
                for iface in &o.implements {
                    obj = obj.implement(iface.node.to_string());
                }
                for f in o.fields {
                    let field_name = f.node.name.node.to_string();
                    let ty = type_ref(&f.node.ty.node);
                    let handler = handlers.get(&format!("{type_name}.{field_name}")).cloned();
                    let (catalog, state, fname, rty) = (catalog.clone(), state.clone(), field_name.clone(), ty.clone());
                    let mut field = Field::new(field_name, ty, move |ctx: ResolverContext<'_>| {
                        let (catalog, state, handler, fname, rty) =
                            (catalog.clone(), state.clone(), handler.clone(), fname.clone(), rty.clone());
                        FieldFuture::new(async move {
                            if let Some(handler) = handler {
                                let mut args = Value::Object(ctx.args.as_index_map().clone())
                                    .into_json()
                                    .map_err(|e| async_graphql::Error::new(e.to_string()))?;
                                inline_uploads(&mut args, &ctx).map_err(to_gql_error)?;
                                let request = ctx.data::<RequestData>().cloned().unwrap_or_default();
                                let out = handler(Call { args, state, request }).await.map_err(to_gql_error)?;
                                return Ok(catalog.convert(out, &rty));
                            }
                            let parent = ctx.parent_value.downcast_ref::<Json>();
                            match parent.and_then(|p| p.get(&fname)) {
                                Some(v) => Ok(catalog.convert(v.clone(), &rty)),
                                None => Ok(catalog.empty_or_null(&rty)),
                            }
                        })
                    });
                    for a in f.node.arguments {
                        field =
                            field.argument(InputValue::new(a.node.name.node.to_string(), type_ref(&a.node.ty.node)));
                    }
                    obj = obj.field(field);
                }
                builder.register(obj)
            }
        };
    }
    builder.disable_introspection().finish().context("building schema")
}
