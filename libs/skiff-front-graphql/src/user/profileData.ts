/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { LocalState } from '@apollo/client/local-state';
import { SKIFF_USERID_HEADER_NAME } from 'skiff-utils';

import {
  GetUserProfileOrgDataQuery,
  GetUserProfileOrgDataQueryVariables,
  GetUserProfileOrgDataDocument
} from '../graphql';

// creates an auth link that respects incoming headers above others
const createAliasAuthLink = (userID: string) => {
  const aliasAuthLink = new ApolloLink((operation, forward) => {
    const initialHeaders: Record<string, string> = {};
    operation.setContext({
      headers: {
        // inverted
        ...initialHeaders,
        ...operation.getContext().headers,
        [SKIFF_USERID_HEADER_NAME]: userID
      }
    });
    return forward(operation);
  });
  return aliasAuthLink;
};

// create an apollo client as a given userID
export const createAliasClientGivenID = (routerURI: string, userID: string) => {
  const curAuthLink = createAliasAuthLink(userID);
  const httpLink = new HttpLink({ uri: `${routerURI}/graphql`, credentials: 'include' });
  const retryLink = new RetryLink();
  return new ApolloClient({
    link: ApolloLink.from([curAuthLink, retryLink, httpLink]),
    clientAwareness: { name: 'editor-web-alias', version: process.env.GIT_HASH },
    cache: new InMemoryCache(),
    localState: new LocalState()
  });
};

/**
 * Fetches public data about user from ID
 * @param {string} routerURI Apollo router URI
 * @param {Array<UserID>} userIDs array of target user IDs
 */
export async function fetchUserProfileOrgDataFromID(routerURI: string, userID: string) {
  const client = createAliasClientGivenID(routerURI, userID);
  const profileDataResponse = await client.query<GetUserProfileOrgDataQuery, GetUserProfileOrgDataQueryVariables>({
    query: GetUserProfileOrgDataDocument,
    variables: {
      request: {
        userID
      }
    },
    context: {
      headers: {
        [SKIFF_USERID_HEADER_NAME]: userID
      }
    },
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  });

  const user = profileDataResponse.data?.user;

  if (!user) {
    console.error('FetchUsersPublicOrgData: Request failed.');
    return null;
  }

  return user;
}
