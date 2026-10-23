import { AddressObject, DecryptedAttachment } from 'skiff-graphql';

export interface IndexedItemBase {
  id: string;
  updatedAt: number;
}

/** Normalized (stemmed) query term -> the fields it matched in. */
export type MatchInfo = Record<string, string[]>;

export type MiniSearchResultBase = { terms: string[]; score: number; match: MatchInfo } & IndexedItemBase;

export interface IndexedSkemail extends IndexedItemBase {
  threadID: string;
  subject: string;
  content: string;
  toAddresses: string[];
  to: AddressObject[];
  ccAddresses: string[];
  cc: AddressObject[];
  bccAddresses: string[];
  bcc: AddressObject[];
  fromAddress: string;
  from: AddressObject;
  systemLabels: string[];
  userLabels: string[];
  read: boolean;
  attachments: DecryptedAttachment[] | null | undefined;
}

export type SkemailMiniSearchResult = MiniSearchResultBase & Pick<IndexedSkemail, 'threadID'>;

export interface DateRangeFilter {
  daysAgo: number; // for computing preset ranges on the fly; custom ranges will be added soon
}

/** Where earlier versions kept the in-browser search index (deleted on load). */
export const skemailSearchIndexIDBKey = (userID: string) => `skiff:skemailSearchIndex:${userID}`;
