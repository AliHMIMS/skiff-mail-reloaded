import { gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client/react';
import {
  MiniSearchResultBase,
  chronSortResults,
  getDateRangeFromDaysAgo,
  getProcessedIndexTokens,
  smartSortResults
} from 'skiff-front-search';
import { AscDesc } from 'skiff-graphql';
import { trimAndLowercase } from 'skiff-utils';

import { SearchSortOrder } from './SearchProvider';
import {
  MailboxSearchFilter,
  MailboxSearchFilterType,
  MatchInfo,
  SearchItemType,
  SkemailSearchResult
} from './searchTypes';
import { getDateRangeFilter, getSystemLabelFilters, getUserLabelIDsFromFilters } from './searchUtils';

// The interval at which to update search results based on a query (MS)
export const SEARCH_UPDATE_INTERVAL = 250;

export const FROM_RELATED_FIELDS = ['fromAddress', 'from'];
export const TO_RELATED_FIELDS = ['toAddresses', 'to', 'ccAddresses', 'cc', 'bccAddresses', 'bcc'];
export const CONTENT_RELATED_FIELDS = ['subject', 'content'];

// mymail-server's full-text search (not part of Skiff's generated schema)
const SearchEmailsDocument = gql`
  query searchEmails($request: SearchEmailsRequest!) {
    searchEmails(request: $request) {
      emailID
      threadID
      createdAt
      score
      matches {
        term
        fields
      }
    }
  }
`;

interface SearchEmailsQuery {
  searchEmails: {
    emailID: string;
    threadID: string;
    createdAt: number;
    score: number;
    matches: { term: string; fields: string[] }[];
  }[];
}

interface SearchEmailsRequest {
  query?: string;
  fields?: string[];
  from?: string;
  to?: string;
  after?: number;
  systemLabels?: string[];
  userLabelIDs?: string[];
  sortOrder?: 'RELEVANCE' | 'ASC' | 'DESC';
}

const SORT_ORDERS = {
  [SearchSortOrder.Relevance]: 'RELEVANCE',
  [SearchSortOrder.Asc]: 'ASC',
  [SearchSortOrder.Desc]: 'DESC'
} as const;

const sortSearchByOrder = <T extends MiniSearchResultBase>(results: T[], sortOrder?: SearchSortOrder) => {
  switch (sortOrder) {
    case SearchSortOrder.Asc:
      return chronSortResults(results, AscDesc.Asc);
    case SearchSortOrder.Desc:
      return chronSortResults(results);
    default:
      return smartSortResults(results);
  }
};

/** The server request for a query and the filters applied in the search bar. */
const toSearchRequest = (
  query: string,
  searchFilters: MailboxSearchFilter[] = [],
  sortOrder = SearchSortOrder.Relevance
): SearchEmailsRequest => {
  const ofType = (type: MailboxSearchFilterType) => searchFilters.find((filter) => filter.type === type);
  const address = (type: MailboxSearchFilterType.FROM | MailboxSearchFilterType.TO) => {
    const filter = ofType(type);
    return filter?.type === type ? filter.addressObj.address : undefined;
  };
  const from = address(MailboxSearchFilterType.FROM);
  const to = address(MailboxSearchFilterType.TO);
  // "in Subject" / "in Body" narrow where the words are looked for; with only a sender or recipient
  // filter, the words are looked for in the subject and body rather than in the addresses too
  const fields = [
    ...(ofType(MailboxSearchFilterType.SUBJECT) ? ['subject'] : []),
    ...(ofType(MailboxSearchFilterType.BODY) ? ['content'] : [])
  ];
  const dateRange = getDateRangeFilter(searchFilters);
  return {
    query,
    fields: fields.length ? fields : from || to ? CONTENT_RELATED_FIELDS : undefined,
    from,
    to,
    after: dateRange ? getDateRangeFromDaysAgo(dateRange.daysAgo).start.valueOf() : undefined,
    systemLabels: getSystemLabelFilters(searchFilters),
    userLabelIDs: getUserLabelIDsFromFilters(searchFilters),
    sortOrder: SORT_ORDERS[sortOrder]
  };
};

/** The server reports query words as typed; highlighting compares normalized (stemmed) tokens. */
const toMatchInfo = (matches: SearchEmailsQuery['searchEmails'][number]['matches']): MatchInfo => {
  const match: MatchInfo = {};
  matches.forEach(({ term, fields }) =>
    getProcessedIndexTokens(term).forEach((token) => {
      match[token] = Array.from(new Set([...(match[token] ?? []), ...fields]));
    })
  );
  return match;
};

export const useSkemailSearch = () => {
  const client = useApolloClient();

  const serverSearch = async (
    query: string,
    searchFilters?: MailboxSearchFilter[],
    _autoSuggest?: boolean,
    searchSortOrder?: SearchSortOrder
  ): Promise<SkemailSearchResult[] | undefined> => {
    const searchString = trimAndLowercase(query);
    if (!searchString && !searchFilters?.length) {
      return;
    }
    let data: SearchEmailsQuery | undefined;
    try {
      ({ data } = await client.query<SearchEmailsQuery>({
        query: SearchEmailsDocument,
        variables: { request: toSearchRequest(searchString, searchFilters, searchSortOrder) },
        fetchPolicy: 'no-cache'
      }));
    } catch (error) {
      console.error('search failed', error);
      return;
    }
    if (!data) return;
    const results = data.searchEmails.map((result) => {
      const match = toMatchInfo(result.matches);
      return {
        id: result.emailID,
        threadID: result.threadID,
        updatedAt: new Date(result.createdAt).getTime(),
        score: result.score,
        match,
        terms: Object.keys(match)
      };
    });
    return sortSearchByOrder(results, searchSortOrder).map((result) => ({
      type: SearchItemType.SKEMAIL_RESULT,
      emailID: result.id,
      threadID: result.threadID,
      match: result.match
    }));
  };
  return { search: serverSearch };
};
