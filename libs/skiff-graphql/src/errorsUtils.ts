/* eslint-disable import/prefer-default-export */
import type { GraphQLFormattedError } from 'graphql';
import { isPaywallErrorCode, PaywallErrorCode } from 'skiff-utils';

import type { LogicErrorTypes } from './errors';

// https://www.apollographql.com/docs/apollo-server/data/errors/
export const isApolloLogicErrorType = <T extends LogicErrorTypes>(e: any, type: T): e is InstanceType<T> =>
  e?.extensions?.code === type.CODE;

export const getPaywallErrorCode = (errors: readonly GraphQLFormattedError[]) => {
  if (!errors.length) return;
  const allErrorCodes = errors.map((error) => (!!error.extensions?.code ? (error.extensions.code as string) : ''));
  const paywallErrorCode = allErrorCodes.find((code) => isPaywallErrorCode(code));
  if (!paywallErrorCode) return;
  return paywallErrorCode as PaywallErrorCode;
};
