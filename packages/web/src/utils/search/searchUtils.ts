import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { filterExists } from 'skiff-utils';

import {
  MailboxSearchFilter,
  MailboxSearchFilterType,
  EditableMailboxSearchFilterType,
  EDITABLE_FILTER_TYPES,
  METADATA_FILTER_TYPES,
  MetadataFilterType,
  SearchResult,
  SkemailSearchResult,
  SearchItemType,
  FilterableSystemLabel
} from './searchTypes';

dayjs.extend(relativeTime);

export function normalizeQuery(searchStr: string): string {
  return searchStr.trim().toLowerCase();
}

export const getSystemLabelFilters = (searchFilters: MailboxSearchFilter[]): FilterableSystemLabel[] => {
  return searchFilters
    .map((filter) => (filter.type === MailboxSearchFilterType.SYSTEM_LABEL ? filter.systemLabel : undefined))
    .filter(filterExists);
};

export const getUserLabelIDsFromFilters = (searchFilters: MailboxSearchFilter[]): string[] => {
  return searchFilters
    .map((filter) =>
      filter.type === MailboxSearchFilterType.USER_FOLDER_LABEL ||
      filter.type === MailboxSearchFilterType.USER_PLAIN_LABEL
        ? filter.userLabel.value
        : undefined
    )
    .filter(filterExists);
};

export const isSkemailSearchResult = (result: SearchResult): result is SkemailSearchResult =>
  result.type === SearchItemType.SKEMAIL_RESULT;

export const isEditableSearchFilterType = (type: MailboxSearchFilterType): type is EditableMailboxSearchFilterType =>
  EDITABLE_FILTER_TYPES.some((editableType) => editableType === type);

export const isMetadataFilterType = (type: MailboxSearchFilterType): type is MetadataFilterType =>
  METADATA_FILTER_TYPES.some((metadataType) => metadataType === type);

// some filters are associated with an attached search string that may differ / compound with the active input string in the search bar,
// while others merely narrow the target fields for that input string
export const getSearchStringFromMailboxFilter = (filter: MailboxSearchFilter, activeSearchInputString: string) => {
  switch (filter.type) {
    case MailboxSearchFilterType.FROM:
    case MailboxSearchFilterType.TO:
      return filter.addressObj.address;
    case MailboxSearchFilterType.SUBJECT:
    case MailboxSearchFilterType.BODY:
      return activeSearchInputString;
  }
};

export const getDateRangeFilter = (filters: MailboxSearchFilter[]) => {
  const dateFilter = filters?.find((searchFilter) => searchFilter.type === MailboxSearchFilterType.DATE);
  if (!dateFilter || dateFilter.type !== MailboxSearchFilterType.DATE) return; // redundant condition to keep typescript happy
  return dateFilter.range;
};
