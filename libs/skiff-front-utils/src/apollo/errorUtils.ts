import type { ErrorLike } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import type { GraphQLFormattedError } from 'graphql';

/** The GraphQL errors in an error thrown or returned by Apollo Client (none for network errors or anything else). */
export const getGraphQLErrors = (error: unknown): readonly GraphQLFormattedError[] =>
  CombinedGraphQLErrors.is(error) ? error.errors : [];

/**
 * A result's errors the way Apollo Client 3's `errors` field had them: undefined without an error, the GraphQL errors
 * otherwise, and any other error as a single entry with its message.
 */
export const getResultErrors = (error: ErrorLike | undefined): readonly GraphQLFormattedError[] | undefined => {
  if (!error) return undefined;
  return CombinedGraphQLErrors.is(error) ? error.errors : [{ message: error.message }];
};
