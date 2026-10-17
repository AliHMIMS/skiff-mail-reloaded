import * as Types from 'skiff-graphql';
export * from 'skiff-graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetAllCurrentUserContactsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCurrentUserContactsQuery = { __typename?: 'Query', allContacts: Array<{ __typename?: 'Contact', contactID: string, emailAddress?: string | null, firstName?: string | null, lastName?: string | null, encryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedContactData?: string | null, decryptedSessionKey?: string | null, displayPictureData?: { __typename?: 'DisplayPictureDataSkemail', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null, decryptedData?: { __typename?: 'DecryptedContactData', decryptedNotes?: string | null, decryptedBirthday?: string | null, decryptedCompany?: string | null, decryptedJobTitle?: string | null, decryptedNickname?: string | null, decryptedURL?: string | null, decryptedPhoneNumbers?: Array<{ __typename?: 'ValueLabel', value: string, label: string }> | null, decryptedAddresses?: Array<{ __typename?: 'ValueLabel', value: string, label: string }> | null } | null }> };

export type GetAllCurrentUserContactsNativeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCurrentUserContactsNativeQuery = { __typename?: 'Query', allContacts: Array<{ __typename?: 'Contact', contactID: string, emailAddress?: string | null, firstName?: string | null, lastName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureDataSkemail', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null }> };

export type GetContactsQueryVariables = Types.Exact<{
  request: Types.GetContactsRequest;
}>;


export type GetContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', contactID: string, emailAddress?: string | null, firstName?: string | null, lastName?: string | null, encryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedContactData?: string | null, decryptedSessionKey?: string | null, displayPictureData?: { __typename?: 'DisplayPictureDataSkemail', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null, decryptedData?: { __typename?: 'DecryptedContactData', decryptedNotes?: string | null, decryptedBirthday?: string | null, decryptedCompany?: string | null, decryptedJobTitle?: string | null, decryptedNickname?: string | null, decryptedURL?: string | null, decryptedPhoneNumbers?: Array<{ __typename?: 'ValueLabel', value: string, label: string }> | null, decryptedAddresses?: Array<{ __typename?: 'ValueLabel', value: string, label: string }> | null } | null }> };

export type GetDefaultProfilePictureQueryVariables = Types.Exact<{
  request: Types.GetDefaultProfilePictureRequest;
}>;


export type GetDefaultProfilePictureQuery = { __typename?: 'Query', defaultProfilePicture?: { __typename?: 'DefaultDisplayPictureData', profilePictureData: string } | null };

export type CreateOrUpdateContactMutationVariables = Types.Exact<{
  request: Types.CreateOrUpdateContactRequest;
}>;


export type CreateOrUpdateContactMutation = { __typename?: 'Mutation', createOrUpdateContact?: any | null };

export type DeleteContactMutationVariables = Types.Exact<{
  request: Types.DeleteContactRequest;
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact?: any | null };

export type DeleteContactsMutationVariables = Types.Exact<{
  request: Types.DeleteContactsRequest;
}>;


export type DeleteContactsMutation = { __typename?: 'Mutation', deleteContacts?: any | null };

export type GetCreditsQueryVariables = Types.Exact<{
  request: Types.GetCreditsRequest;
}>;


export type GetCreditsQuery = { __typename?: 'Query', credits: { __typename?: 'GetCreditsResponse', credits: Array<{ __typename?: 'CreditInfoResponse', info: Types.CreditInfo, count: number, amount: { __typename?: 'CreditAmount', cents: number, skemailStorageBytes: string, editorStorageBytes: string } }> } };

export type GetLastViewedReferralCreditQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLastViewedReferralCreditQuery = { __typename?: 'Query', lastViewedReferralCredit: { __typename?: 'LastViewedReferralCreditResponse', count: number, amount: { __typename?: 'CreditAmount', cents: number, skemailStorageBytes: string, editorStorageBytes: string } } };

export type SetLastViewedReferralCreditMutationVariables = Types.Exact<{
  request: Types.SetLastViewedReferralCreditRequest;
}>;


export type SetLastViewedReferralCreditMutation = { __typename?: 'Mutation', setLastViewedReferralCredit: boolean };

export type GrantCreditsMutationVariables = Types.Exact<{
  request: Types.GrantCreditsRequest;
}>;


export type GrantCreditsMutation = { __typename?: 'Mutation', grantCredits: { __typename?: 'GrantCreditsResponse', creditsGranted: { __typename?: 'CreditAmount', cents: number, skemailStorageBytes: string, editorStorageBytes: string }, remainingCreditsToEarnForReason: { __typename?: 'CreditAmount', cents: number, skemailStorageBytes: string, editorStorageBytes: string } } };

export type DnsRecordDataFragment = { __typename?: 'DNSRecord', name: string, type: Types.DnsRecordType, data: string, error?: { __typename?: 'DnsRecordStatusError', errorType: string, errorData?: { __typename?: 'DnsRecordStatusErrorData', retrievedRecord?: { __typename?: 'SingleRetrievedRecord', priority?: string | null, data: string } | null } | null } | null };

export type GetCurrentUserCustomDomainsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserCustomDomainsQuery = { __typename?: 'Query', getCurrentUserCustomDomains: { __typename?: 'GetCurrentUserCustomDomainsResponse', domains: Array<{ __typename?: 'CustomDomainRecord', domainID: string, domain: string, skiffManaged: boolean, verificationStatus: string, createdAt: Date, dnsRecords: Array<{ __typename?: 'DNSRecord', name: string, type: Types.DnsRecordType, data: string, error?: { __typename?: 'DnsRecordStatusError', errorType: string, errorData?: { __typename?: 'DnsRecordStatusErrorData', retrievedRecord?: { __typename?: 'SingleRetrievedRecord', priority?: string | null, data: string } | null } | null } | null }> }> } };

export type CheckIfDomainsAvailableQueryVariables = Types.Exact<{
  domains: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type CheckIfDomainsAvailableQuery = { __typename?: 'Query', checkIfDomainsAvailable: { __typename?: 'CheckIfDomainsAvailableResponse', domains?: Array<{ __typename?: 'Domain', available: boolean, currency?: string | null, domain: string, period?: number | null, price?: number | null }> | null } };

export type GetDomainSuggestionsQueryVariables = Types.Exact<{
  domain: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetDomainSuggestionsQuery = { __typename?: 'Query', getDomainSuggestions: { __typename?: 'GetDomainSuggestionsResponse', domains?: Array<string> | null } };

export type GetDomainDetailsQueryVariables = Types.Exact<{
  domain: Types.Scalars['String'];
}>;


export type GetDomainDetailsQuery = { __typename?: 'Query', getDomainDetails: { __typename?: 'DomainDetails', expiresAt: string, renewAuto: boolean, renewalDetails: { __typename?: 'RenewalDetails', price?: number | null } } };

export type GenerateCustomDomainRecordsMutationVariables = Types.Exact<{
  request: Types.GenerateCustomDomainRecordsRequest;
}>;


export type GenerateCustomDomainRecordsMutation = { __typename?: 'Mutation', generateCustomDomainRecords: { __typename?: 'GenerateCustomDomainRecordsResponse', domainID: string, mxRecords: Array<{ __typename?: 'DNSRecord', name: string, type: Types.DnsRecordType, data: string, error?: { __typename?: 'DnsRecordStatusError', errorType: string, errorData?: { __typename?: 'DnsRecordStatusErrorData', retrievedRecord?: { __typename?: 'SingleRetrievedRecord', priority?: string | null, data: string } | null } | null } | null }>, spfRecords: { __typename?: 'DNSRecord', name: string, type: Types.DnsRecordType, data: string, error?: { __typename?: 'DnsRecordStatusError', errorType: string, errorData?: { __typename?: 'DnsRecordStatusErrorData', retrievedRecord?: { __typename?: 'SingleRetrievedRecord', priority?: string | null, data: string } | null } | null } | null }, dkimRecords: Array<{ __typename?: 'DNSRecord', name: string, type: Types.DnsRecordType, data: string, error?: { __typename?: 'DnsRecordStatusError', errorType: string, errorData?: { __typename?: 'DnsRecordStatusErrorData', retrievedRecord?: { __typename?: 'SingleRetrievedRecord', priority?: string | null, data: string } | null } | null } | null }>, dmarcRecord: { __typename?: 'DNSRecord', name: string, type: Types.DnsRecordType, data: string, error?: { __typename?: 'DnsRecordStatusError', errorType: string, errorData?: { __typename?: 'DnsRecordStatusErrorData', retrievedRecord?: { __typename?: 'SingleRetrievedRecord', priority?: string | null, data: string } | null } | null } | null } } };

export type SaveCustomDomainRecordsMutationVariables = Types.Exact<{
  request: Types.SaveCustomDomainRequest;
}>;


export type SaveCustomDomainRecordsMutation = { __typename?: 'Mutation', saveCustomDomainRecords?: any | null };

export type DeleteCustomDomainMutationVariables = Types.Exact<{
  request: Types.DeleteCustomDomainRequest;
}>;


export type DeleteCustomDomainMutation = { __typename?: 'Mutation', deleteCustomDomain?: any | null };

export type DeleteCustomDomainAliasMutationVariables = Types.Exact<{
  request: Types.DeleteCustomDomainAliasRequest;
}>;


export type DeleteCustomDomainAliasMutation = { __typename?: 'Mutation', deleteCustomDomainAlias?: any | null };

export type VerifyCustomDomainMutationVariables = Types.Exact<{
  domainId: Types.Scalars['String'];
}>;


export type VerifyCustomDomainMutation = { __typename?: 'Mutation', verifyCustomDomain?: any | null };

export type GetAllDraftsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllDraftsQuery = { __typename?: 'Query', allDrafts: Array<{ __typename?: 'Draft', draftID: string, encryptedKey: string, encryptedDraft: string, updatedAt?: Date | null }> };

export type DeleteDraftMutationVariables = Types.Exact<{
  request: Types.DeleteDraftRequest;
}>;


export type DeleteDraftMutation = { __typename?: 'Mutation', deleteDraft?: any | null };

export type CreateOrUpdateDraftMutationVariables = Types.Exact<{
  request: Types.CreateOrUpdateDraftRequest;
}>;


export type CreateOrUpdateDraftMutation = { __typename?: 'Mutation', createOrUpdateDraft?: any | null };

export type AddressFragment = { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null };

export type EmailWithoutContentFragment = { __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null };

export type ThreadWithoutContentFragment = { __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, deletedAt?: Date | null, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> };

export type EmailFragment = { __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null };

export type ThreadFragment = { __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, deletedAt?: Date | null, senderToSilence?: string | null, senderToSilenceMessageCounter?: number | null, senderToSilenceTotalBytes?: number | null, threadContentUpdatedAt: Date, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> };

export type MobileThreadFragment = { __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, clientsideFiltersApplied?: boolean | null, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> };

export type SlimThreadFragment = { __typename?: 'SlimUserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> } };

export type SlimThreadWithoutLabelsFragment = { __typename?: 'SlimUserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string }> } };

export type MailboxWithContentQueryVariables = Types.Exact<{
  request: Types.MailboxRequest;
}>;


export type MailboxWithContentQuery = { __typename?: 'Query', mailbox?: { __typename?: 'Mailbox', threads: Array<{ __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, deletedAt?: Date | null, senderToSilence?: string | null, senderToSilenceMessageCounter?: number | null, senderToSilenceTotalBytes?: number | null, threadContentUpdatedAt: Date, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> }>, pageInfo: { __typename?: 'MailboxPageInfo', hasNextPage: boolean, cursor?: { __typename?: 'MailboxCursorResponse', threadID: string, date: Date } | null } } | null };

export type MailboxQueryVariables = Types.Exact<{
  request: Types.MailboxRequest;
}>;


export type MailboxQuery = { __typename?: 'Query', mailbox?: { __typename?: 'Mailbox', threads: Array<{ __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, deletedAt?: Date | null, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> }>, pageInfo: { __typename?: 'MailboxPageInfo', hasNextPage: boolean, cursor?: { __typename?: 'MailboxCursorResponse', threadID: string, date: Date } | null } } | null };

export type FilteredThreadIDsQueryVariables = Types.Exact<{
  request: Types.FilteredThreadIDsRequest;
}>;


export type FilteredThreadIDsQuery = { __typename?: 'Query', filteredThreadIDs: { __typename?: 'FilteredThreadIDs', threadIDs: Array<string>, numThreadIDsRemoved: number } };

export type MobileMailboxQueryVariables = Types.Exact<{
  mailboxRequest: Types.NativeMailboxRequest;
  threadIDs: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type MobileMailboxQuery = { __typename?: 'Query', nativeMailbox?: { __typename?: 'NativeMailbox', threads: Array<{ __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, clientsideFiltersApplied?: boolean | null, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> }>, slimThreads: Array<{ __typename?: 'SlimUserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> } }>, pageInfo: { __typename?: 'MailboxPageInfo', hasNextPage: boolean, cursor?: { __typename?: 'MailboxCursorResponse', threadID: string, date: Date } | null } } | null, userThreads: Array<{ __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, clientsideFiltersApplied?: boolean | null, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> }> };

export type MobileMailboxLabelsSyncQueryVariables = Types.Exact<{
  mailboxRequest: Types.NativeMailboxRequest;
  threadIDs: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type MobileMailboxLabelsSyncQuery = { __typename?: 'Query', nativeMailbox?: { __typename?: 'NativeMailbox', threads: Array<{ __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, clientsideFiltersApplied?: boolean | null, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> }>, slimThreads: Array<{ __typename?: 'SlimUserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string }> } }>, pageInfo: { __typename?: 'MailboxPageInfo', hasNextPage: boolean, cursor?: { __typename?: 'MailboxCursorResponse', threadID: string, date: Date } | null } } | null, userThreads: Array<{ __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, clientsideFiltersApplied?: boolean | null, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> }>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> };

export type GetMobileThreadsFromIdQueryVariables = Types.Exact<{
  threadIDs: Array<Types.Scalars['String']> | Types.Scalars['String'];
  returnDeleted?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type GetMobileThreadsFromIdQuery = { __typename?: 'Query', userThreads: Array<{ __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, updatedAt: Date, deletedAt?: Date | null, permanentlyDeleted: boolean, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, clientsideFiltersApplied?: boolean | null, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> }> };

export type GetThreadFromIdQueryVariables = Types.Exact<{
  threadID: Types.Scalars['String'];
}>;


export type GetThreadFromIdQuery = { __typename?: 'Query', userThread?: { __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, deletedAt?: Date | null, senderToSilence?: string | null, senderToSilenceMessageCounter?: number | null, senderToSilenceTotalBytes?: number | null, threadContentUpdatedAt: Date, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> } | null };

export type GetThreadsFromIDsQueryVariables = Types.Exact<{
  threadIDs: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type GetThreadsFromIDsQuery = { __typename?: 'Query', userThreads: Array<{ __typename?: 'UserThread', threadID: string, emailsUpdatedAt: Date, sentLabelUpdatedAt?: Date | null, deletedAt?: Date | null, senderToSilence?: string | null, senderToSilenceMessageCounter?: number | null, senderToSilenceTotalBytes?: number | null, threadContentUpdatedAt: Date, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> }, emails: Array<{ __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null }> }> };

export type GetFromAddressListForEmailsOnThreadQueryVariables = Types.Exact<{
  threadID: Types.Scalars['String'];
}>;


export type GetFromAddressListForEmailsOnThreadQuery = { __typename?: 'Query', userThread?: { __typename?: 'UserThread', threadID: string, emails: Array<{ __typename?: 'Email', id: string, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } }> } | null };

export type ThreadAttributesQueryVariables = Types.Exact<{
  threadID: Types.Scalars['String'];
}>;


export type ThreadAttributesQuery = { __typename?: 'Query', userThread?: { __typename?: 'UserThread', threadID: string, attributes: { __typename?: 'ThreadAttributes', read: boolean, systemLabels: Array<string>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, color: string, labelName: string, variant: Types.UserLabelVariant }> } } | null };

export type ValidateMailAliasQueryVariables = Types.Exact<{
  request: Types.GetAliasValidRequest;
}>;


export type ValidateMailAliasQuery = { __typename?: 'Query', aliasValid: boolean };

export type UpdateQuickAliasActiveStateMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.UpdateQuickAliasActiveStateRequest>;
}>;


export type UpdateQuickAliasActiveStateMutation = { __typename?: 'Mutation', updateQuickAliasActiveState?: { __typename?: 'UpdateQuickAliasActiveStateResponse', status: Types.RequestStatus } | null };

export type UpdateEmailAliasSendReceiveEnabledStateMutationVariables = Types.Exact<{
  request: Types.UpdateEmailAliasEnabledStateRequest;
}>;


export type UpdateEmailAliasSendReceiveEnabledStateMutation = { __typename?: 'Mutation', updateEmailAliasSendReceiveEnabledState?: any | null };

export type CreateEmailAliasMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.CreateEmailAliasRequest>;
}>;


export type CreateEmailAliasMutation = { __typename?: 'Mutation', createEmailAlias?: { __typename?: 'CreateEmailAliasResponse', emailAliases: Array<string> } | null };

export type CreateCustomDomainAliasMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.CreateCustomDomainAliasRequest>;
}>;


export type CreateCustomDomainAliasMutation = { __typename?: 'Mutation', createCustomDomainAlias?: { __typename?: 'CreateCustomDomainAliasResponse', emailAliases: Array<string> } | null };

export type UpdateEmailAliasActiveStateMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.UpdateEmailAliasActiveStateRequest>;
}>;


export type UpdateEmailAliasActiveStateMutation = { __typename?: 'Mutation', updateEmailAliasActiveState?: { __typename?: 'UpdateEmailAliasActiveStateResponse', status: Types.RequestStatus } | null };

export type UpdateEmailAliasProfileMutationVariables = Types.Exact<{
  request: Types.UpdateEmailAliasProfileRequest;
}>;


export type UpdateEmailAliasProfileMutation = { __typename?: 'Mutation', updateEmailAliasProfile: boolean };

export type SetAllThreadsReadStatusMutationVariables = Types.Exact<{
  request: Types.SetAllThreadsReadStatusRequest;
}>;


export type SetAllThreadsReadStatusMutation = { __typename?: 'Mutation', setAllThreadsReadStatus: boolean };

export type SetUserPublicKeyMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.SetUserPublicKeyRequest>;
}>;


export type SetUserPublicKeyMutation = { __typename?: 'Mutation', setUserPublicKey?: any | null };

export type SetReadStatusMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.SetReadStatusRequest>;
}>;


export type SetReadStatusMutation = { __typename?: 'Mutation', setReadStatus?: { __typename?: 'SetReadStatusResponse', updatedThreadIDs: Array<string> } | null };

export type SendMessageMutationVariables = Types.Exact<{
  request: Types.SendEmailRequest;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'SendEmailResponse', messageID: string, threadID: string } | null };

export type UnsendMessageMutationVariables = Types.Exact<{
  request: Types.UnsendEmailRequest;
}>;


export type UnsendMessageMutation = { __typename?: 'Mutation', unsendMessage?: { __typename?: 'Email', id: string, createdAt: Date, scheduleSendAt?: Date | null, encryptedRawMimeUrl?: string | null, decryptedSessionKey?: string | null, decryptedSubject?: string | null, decryptedText?: string | null, decryptedHtml?: string | null, decryptedTextAsHtml?: string | null, decryptedTextSnippet?: string | null, notificationsTurnedOffForSender: boolean, attachmentMetadata: Array<{ __typename?: 'EncryptedAttachmentMetadata', attachmentID: string, encryptedData: { __typename?: 'EncryptedDataOutput', encryptedData: string } }>, from: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }, to: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, cc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, bcc: Array<{ __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null }>, replyTo?: { __typename?: 'AddressObject', name?: string | null, address: string, blocked?: boolean | null } | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } }, encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextSnippet?: { __typename?: 'EncryptedDataOutput', encryptedData: string } | null, decryptedAttachmentMetadata?: Array<{ __typename?: 'DecryptedAttachment', attachmentID: string, decryptedMetadata?: { __typename?: 'AttachmentMetadata', contentType: string, contentDisposition: string, filename: string, checksum: string, size: number, contentId: string } | null }> | null } | null };

export type SendReplyMessageMutationVariables = Types.Exact<{
  request: Types.ReplyToEmailRequest;
}>;


export type SendReplyMessageMutation = { __typename?: 'Mutation', replyToMessage?: { __typename?: 'ReplyToEmailResponse', messageID: string, threadID: string } | null };

export type DecryptionServicePublicKeyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DecryptionServicePublicKeyQuery = { __typename?: 'Query', decryptionServicePublicKey?: { key: string, signature?: string } | null };

export type AttachmentFragment = { __typename?: 'Attachment', attachmentID: string, downloadLink: string, decryptedSessionKey?: string | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } } };

export type GetAttachmentsQueryVariables = Types.Exact<{
  ids: Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetAttachmentsQuery = { __typename?: 'Query', attachments?: Array<{ __typename?: 'Attachment', attachmentID: string, downloadLink: string, decryptedSessionKey?: string | null, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } } } | null> | null };

export type SendFeedbackMutationVariables = Types.Exact<{
  request: Types.SendFeedbackRequest;
}>;


export type SendFeedbackMutation = { __typename?: 'Mutation', sendFeedback: boolean };

export type GetNumUnreadQueryVariables = Types.Exact<{
  label: Types.Scalars['String'];
}>;


export type GetNumUnreadQuery = { __typename?: 'Query', unread: number };

export type GetNumUnreadAllLabelsQueryVariables = Types.Exact<{
  labels: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type GetNumUnreadAllLabelsQuery = { __typename?: 'Query', unreadAllLabels: Array<{ __typename?: 'LabelUnreadCount', label: string, count: number }> };

export type BlockEmailAddressMutationVariables = Types.Exact<{
  request: Types.BlockEmailAddressRequest;
}>;


export type BlockEmailAddressMutation = { __typename?: 'Mutation', blockEmailAddress?: any | null };

export type UnblockEmailAddressMutationVariables = Types.Exact<{
  request: Types.UnblockEmailAddressRequest;
}>;


export type UnblockEmailAddressMutation = { __typename?: 'Mutation', unblockEmailAddress?: any | null };

export type IsBlockedQueryVariables = Types.Exact<{
  senderAddress: Types.Scalars['String'];
}>;


export type IsBlockedQuery = { __typename?: 'Query', isBlocked: boolean };

export type IsCustomDomainQueryVariables = Types.Exact<{
  domains: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type IsCustomDomainQuery = { __typename?: 'Query', isCustomDomain: boolean };

export type VerifyWalletAddressCreateAliasMutationVariables = Types.Exact<{
  request: Types.VerifyWalletAddressCreateAliasRequest;
}>;


export type VerifyWalletAddressCreateAliasMutation = { __typename?: 'Mutation', verifyWalletAddressCreateAlias: { __typename?: 'CreateEmailAliasResponse', emailAliases: Array<string> } };

export type DeleteThreadMutationVariables = Types.Exact<{
  request: Types.DeleteThreadRequest;
}>;


export type DeleteThreadMutation = { __typename?: 'Mutation', deleteThread?: any | null };

export type BulkDeleteTrashedThreadsMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type BulkDeleteTrashedThreadsMutation = { __typename?: 'Mutation', bulkDeleteTrashedThreads?: { __typename?: 'BulkDeleteTrashedThreadsResponse', jobID: string } | null };

export type GetBulkActionJobStatusQueryVariables = Types.Exact<{
  request: Types.BulkActionJobStatusRequest;
}>;


export type GetBulkActionJobStatusQuery = { __typename?: 'Query', bulkActionJobStatus: { __typename?: 'BulkModifyLabelsJobStatusResponse', jobStatus: Types.BullMqJobStatus, completed: boolean } };

export type SetPushTokenMutationVariables = Types.Exact<{
  request: Types.SetPushTokenRequest;
}>;


export type SetPushTokenMutation = { __typename?: 'Mutation', setPushToken?: any | null };

export type UnsetPushTokenMutationVariables = Types.Exact<{
  request: Types.UnsetPushTokenRequest;
}>;


export type UnsetPushTokenMutation = { __typename?: 'Mutation', unsetPushToken?: any | null };

export type GetEnsNameQueryVariables = Types.Exact<{
  ethereumAddress: Types.Scalars['String'];
}>;


export type GetEnsNameQuery = { __typename?: 'Query', getENSName?: string | null };

export type GetBonfidaNamesQueryVariables = Types.Exact<{
  solanaAddress: Types.Scalars['String'];
}>;


export type GetBonfidaNamesQuery = { __typename?: 'Query', getBonfidaNames: Array<string> };

export type SetCatchallAddressMutationVariables = Types.Exact<{
  request: Types.SetCatchallAddressRequest;
}>;


export type SetCatchallAddressMutation = { __typename?: 'Mutation', setCatchallAddress: boolean };

export type GetAliasesOnDomainQueryVariables = Types.Exact<{
  domainID: Types.Scalars['String'];
}>;


export type GetAliasesOnDomainQuery = { __typename?: 'Query', getAliasesOnDomain: { __typename?: 'AliasesOnDomainResponse', domainAliases: Array<{ __typename?: 'DomainAliasData', emailAlias?: string | null, displayEmailAlias: string, isCatchall: boolean }> } };

export type CreateMailFilterMutationVariables = Types.Exact<{
  request: Types.CreateMailFilterInput;
}>;


export type CreateMailFilterMutation = { __typename?: 'Mutation', createMailFilter?: any | null };

export type UpdateMailFilterMutationVariables = Types.Exact<{
  request: Types.UpdateMailFilterInput;
}>;


export type UpdateMailFilterMutation = { __typename?: 'Mutation', updateMailFilter?: any | null };

export type DeleteMailFilterMutationVariables = Types.Exact<{
  request: Types.DeleteMailFilterInput;
}>;


export type DeleteMailFilterMutation = { __typename?: 'Mutation', deleteMailFilter?: any | null };

export type MarkThreadsAsClientsideFilteredMutationVariables = Types.Exact<{
  request: Types.MarkThreadsAsClientsideFilteredInput;
}>;


export type MarkThreadsAsClientsideFilteredMutation = { __typename?: 'Mutation', markThreadsAsClientsideFiltered?: any | null };

export type SilenceMultipleEmailAddressesMutationVariables = Types.Exact<{
  request: Types.SilenceMultipleEmailAddressesRequest;
}>;


export type SilenceMultipleEmailAddressesMutation = { __typename?: 'Mutation', silenceMultipleEmailAddresses?: any | null };

export type MarkSpamMultipleEmailAddressesMutationVariables = Types.Exact<{
  request: Types.MarkSpamMultipleEmailAddressesRequest;
}>;


export type MarkSpamMultipleEmailAddressesMutation = { __typename?: 'Mutation', markSpamMultipleEmailAddresses?: any | null };

export type MarkNotSpamMultipleEmailAddressesMutationVariables = Types.Exact<{
  request: Types.MarkNotSpamMultipleEmailAddressesRequest;
}>;


export type MarkNotSpamMultipleEmailAddressesMutation = { __typename?: 'Mutation', markNotSpamMultipleEmailAddresses?: any | null };

export type BulkTrashMutationVariables = Types.Exact<{
  request: Types.BulkTrashRequest;
}>;


export type BulkTrashMutation = { __typename?: 'Mutation', bulkTrash?: { __typename?: 'BulkTrashResponse', jobID: string } | null };

export type MarkThreadAsOpenedMutationVariables = Types.Exact<{
  request: Types.MarkThreadAsOpenedInput;
}>;


export type MarkThreadAsOpenedMutation = { __typename?: 'Mutation', markThreadAsOpened?: any | null };

export type MuteNotificationForSenderMutationVariables = Types.Exact<{
  request: Types.MuteNotificationForSenderRequest;
}>;


export type MuteNotificationForSenderMutation = { __typename?: 'Mutation', muteNotificationForSender?: any | null };

export type UnmuteNotificationForSenderMutationVariables = Types.Exact<{
  request: Types.UnmuteNotificationForSenderRequest;
}>;


export type UnmuteNotificationForSenderMutation = { __typename?: 'Mutation', unmuteNotificationForSender?: any | null };

export type DocumentPermissionInfoFragment = { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null };

export type DocumentCollaboratorInfoFragment = { __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } };

export type DocumentPublicInfoFragment = { __typename?: 'Document', publicOrgData?: Array<{ __typename?: 'PublicOrgData', orgID: string, name: string, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } | null> | null };

export type DocumentHierarchicalPermissionChainInfoFragment = { __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null };

export type DocumentBasicInfoWithoutTeamOrOrgFragment = { __typename?: 'Document', docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> };

export type DocumentBasicInfoFragment = { __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> };

export type DocumentBaseFragment = { __typename?: 'Document', updatedAt?: Date | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> };

export type DocumentDecryptedMetadataFragment = { __typename?: 'Document', createdAt?: Date | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } };

export type DocumentContentsFragment = { __typename?: 'Document', updatedAt?: Date | null, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> } };

export type DocumentCurrentlyEditingUsersFragment = { __typename?: 'Document', docID: string, currentlyEditingUsers: Array<{ __typename?: 'CurrentlyEditingUser', name: string, userID: string, color: string, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } | null> };

export type DocumentLinkFragment = { __typename?: 'Document', link?: { __typename?: 'LinkOutput', encryptedLinkKey: string, permissionLevel: Types.PermissionLevel, salt: string, decryptedLinkKey: string } | null };

export type DocumentInvitesFragment = { __typename?: 'Document', invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }> };

export type DocumentTeamFragment = { __typename?: 'Document', team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null };

export type DocumentPermissionProxiesFragment = { __typename?: 'Document', permissionProxies: Array<{ __typename?: 'DocumentPermissionProxy', sourceDocID: string, sourceTeam: { __typename?: 'Team', teamID: string, name: string, icon: string } }> };

export type DocumentParentsFullBreadcrumbFragment = { __typename?: 'Document', parentsBreadcrumb: Array<{ __typename?: 'Document', cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }> };

export type DocumentParentsBreadcrumbFragment = { __typename?: 'Document', parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }> };

export type DocumentCollaboratorsFragment = { __typename?: 'Document', collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }> };

export type DocumentNativeInfoFragment = { __typename?: 'Document', updatedAt?: Date | null, thumbnail?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, createdAt?: Date | null, team?: { __typename?: 'Team', personal: boolean, teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } };

export type DocumentFullInfoFragment = { __typename?: 'Document', parentKeysClaim?: string | null, parentPublicHierarchicalKey?: string | null, thumbnail?: string | null, decryptedThumbnail?: string | null, cloneDocID?: string | null, createdAt?: Date | null, updatedAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, currentlyEditingUsers: Array<{ __typename?: 'CurrentlyEditingUser', name: string, userID: string, color: string, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } | null>, link?: { __typename?: 'LinkOutput', encryptedLinkKey: string, permissionLevel: Types.PermissionLevel, salt: string, decryptedLinkKey: string } | null, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> };

export type TemplateDataFragment = { __typename?: 'Template', templateID: string, group: string, parentID?: string | null, contents: { __typename?: 'TemplateContent', pmDoc: any }, metadata: { __typename?: 'TemplateMetaData', title: string, icon?: string | null, color?: string | null, description?: string | null } };

export type OrganizationFullInfoFragment = { __typename?: 'Organization', orgID: string, name: string, rootDocID: string, hasCustomized: boolean, teams: Array<{ __typename?: 'Team', accessLevel?: Types.TeamAccess | null, teamID: string, name: string, icon: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, permissionProxies: Array<{ __typename?: 'DocumentPermissionProxy', sourceDocID: string, sourceTeam: { __typename?: 'Team', teamID: string, name: string, icon: string } }> } | null }>, everyoneTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }> } | null }, personalTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', docID: string } | null }, displayPictureData: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } };

export type UserProfileDataFragment = { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } };

export type UserProfileOrgDataFragment = { __typename?: 'User', userID: string, username: string, publicKey: { key: string, signature?: string }, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null }, rootOrganization: { __typename?: 'Organization', orgID: string, name: string, displayPictureData: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } } };

export type UserOrgPersonalTeamDataFragment = { __typename?: 'User', userID: string, rootOrganization: { __typename?: 'Organization', orgID: string, rootDocID: string, personalTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', docID: string } | null } } };

export type UserOrgEveryoneTeamDataFragment = { __typename?: 'User', userID: string, rootOrganization: { __typename?: 'Organization', orgID: string, rootDocID: string, everyoneTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }> } | null } } };

export type UserProfileDataWithKeysFragment = { __typename?: 'User', publicKey: { key: string, signature?: string }, signingPublicKey: string, userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } };

export type UserWithEmailAliasesFragment = { __typename?: 'User', userID: string, emailAliases?: Array<string> | null };

export type UserWithMailStorageUsedFragment = { __typename?: 'User', userID: string, skemailStorageUsage?: { __typename?: 'StorageUsage', attachmentUsageBytes: string, messageUsageBytes: string } | null };

export type ContactDataFragment = { __typename?: 'Contact', contactID: string, emailAddress?: string | null, firstName?: string | null, lastName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureDataSkemail', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null };

export type UserPreferencesDataFragment = { __typename?: 'UserPreferences', autoAdvance?: boolean | null, advanceToNext?: boolean | null, theme?: string | null, dateFormat?: string | null, hourFormat?: string | null, showPageIcon?: boolean | null, defaultCalendarColor?: string | null, defaultCalendarView?: Types.CalendarView | null, defaultCalendarViewMobile?: Types.CalendarView | null, startDayOfTheWeek?: number | null, leftSwipeGesture?: Types.SwipeSetting | null, rightSwipeGesture?: Types.SwipeSetting | null, blockRemoteContent?: boolean | null, securedBySkiffSigDisabled?: boolean | null, showAliasInboxes?: boolean | null, fileTableFormat?: Types.FileTableDisplayFormat | null, threadFormat?: Types.ThreadDisplayFormat | null, hideActivationChecklist?: boolean | null, tableOfContents?: Types.TableOfContentsSetting | null };

export type UserPreferencesFragmentFragment = { __typename?: 'User', userID: string, userPreferences?: { __typename?: 'UserPreferences', autoAdvance?: boolean | null, advanceToNext?: boolean | null, theme?: string | null, dateFormat?: string | null, hourFormat?: string | null, showPageIcon?: boolean | null, defaultCalendarColor?: string | null, defaultCalendarView?: Types.CalendarView | null, defaultCalendarViewMobile?: Types.CalendarView | null, startDayOfTheWeek?: number | null, leftSwipeGesture?: Types.SwipeSetting | null, rightSwipeGesture?: Types.SwipeSetting | null, blockRemoteContent?: boolean | null, securedBySkiffSigDisabled?: boolean | null, showAliasInboxes?: boolean | null, fileTableFormat?: Types.FileTableDisplayFormat | null, threadFormat?: Types.ThreadDisplayFormat | null, hideActivationChecklist?: boolean | null, tableOfContents?: Types.TableOfContentsSetting | null } | null };

export type ImportEmlEmailMutationVariables = Types.Exact<{
  importRequest: Types.ImportEmlEmailRequest;
}>;


export type ImportEmlEmailMutation = { __typename?: 'Mutation', importEmlEmail?: any | null };

export type ImportMboxEmailsMutationVariables = Types.Exact<{
  importMboxRequest: Types.ImportMboxRequest;
}>;


export type ImportMboxEmailsMutation = { __typename?: 'Mutation', importMboxEmails?: any | null };

export type GetMboxImportUrlMutationVariables = Types.Exact<{
  getImportUrlRequest: Types.GetMboxImportUrlRequest;
}>;


export type GetMboxImportUrlMutation = { __typename?: 'Mutation', getMboxImportUrl?: { __typename?: 'GetMboxImportUrlResponse', fileID: string, uploadData: string } | null };

export type ImportGmailEmailsMutationVariables = Types.Exact<{
  request: Types.ImportGmailRequest;
}>;


export type ImportGmailEmailsMutation = { __typename?: 'Mutation', importGmailEmails?: any | null };

export type UnsubscribeFromGmailImportMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UnsubscribeFromGmailImportMutation = { __typename?: 'Mutation', unsubscribeFromGmailImport?: any | null };

export type GetGmailAutoImportStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetGmailAutoImportStatusQuery = { __typename?: 'Query', getGmailAutoImportStatus: { __typename?: 'AutoImportStatus', subscribed: boolean } };

export type ImportOutlookEmailsMutationVariables = Types.Exact<{
  code: Types.Scalars['String'];
  state: Types.Scalars['String'];
}>;


export type ImportOutlookEmailsMutation = { __typename?: 'Mutation', importOutlookEmails?: any | null };

export type GetGoogleAuthUrlQueryVariables = Types.Exact<{
  action?: Types.InputMaybe<Types.AuthAction>;
}>;


export type GetGoogleAuthUrlQuery = { __typename?: 'Query', getGoogleAuthURL: string };

export type GetOutlookAuthUrlQueryVariables = Types.Exact<{
  action?: Types.InputMaybe<Types.AuthAction>;
}>;


export type GetOutlookAuthUrlQuery = { __typename?: 'Query', getOutlookAuthUrl: string };

export type GetEmailAutoForwardingSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetEmailAutoForwardingSettingsQuery = { __typename?: 'Query', emailAutoForwardingSettings: { __typename?: 'EmailAutoForwardingSettings', gmail: { __typename?: 'EmailAutoForwardingClientSettings', enabled: boolean }, outlook: { __typename?: 'EmailAutoForwardingClientSettings', enabled: boolean } } };

export type EnableEmailAutoForwardingMutationVariables = Types.Exact<{
  request: Types.EnableEmailAutoForwardingRequest;
}>;


export type EnableEmailAutoForwardingMutation = { __typename?: 'Mutation', enableEmailAutoForwarding?: any | null };

export type DisableEmailAutoForwardingMutationVariables = Types.Exact<{
  request: Types.DisableEmailAutoForwardingRequest;
}>;


export type DisableEmailAutoForwardingMutation = { __typename?: 'Mutation', disableEmailAutoForwarding?: any | null };

export type GetEmailImportMetaQueryVariables = Types.Exact<{
  request: Types.EmailImportMetaRequest;
}>;


export type GetEmailImportMetaQuery = { __typename?: 'Query', emailImportMeta: { __typename?: 'EmailImportMeta', estimatedEmailCount: number } };

type ExternalEmailClientLabel_ExternalEmailClientSystemLabel_Fragment = { __typename?: 'ExternalEmailClientSystemLabel', skiffSystemLabel?: Types.SystemLabels | null, labelID: string, labelName: string };

type ExternalEmailClientLabel_ExternalEmailClientUserLabel_Fragment = { __typename?: 'ExternalEmailClientUserLabel', labelID: string, labelName: string, skiffUserLabel?: { __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant } | null };

export type ExternalEmailClientLabelFragment = ExternalEmailClientLabel_ExternalEmailClientSystemLabel_Fragment | ExternalEmailClientLabel_ExternalEmailClientUserLabel_Fragment;

export type GetGmailLabelsQueryVariables = Types.Exact<{
  request: Types.GmailInboxOrganizationRequest;
}>;


export type GetGmailLabelsQuery = { __typename?: 'Query', gmailInboxOrganization: { __typename?: 'GmailInboxOrganization', labels: Array<{ __typename?: 'ExternalEmailClientSystemLabel', skiffSystemLabel?: Types.SystemLabels | null, labelID: string, labelName: string } | { __typename?: 'ExternalEmailClientUserLabel', labelID: string, labelName: string, skiffUserLabel?: { __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant } | null }> } };

export type GetOutlookCategoriesAndFoldersQueryVariables = Types.Exact<{
  request: Types.OutlookInboxOrganizationRequest;
}>;


export type GetOutlookCategoriesAndFoldersQuery = { __typename?: 'Query', outlookInboxOrganization: { __typename?: 'OutlookInboxOrganization', categories: Array<{ __typename?: 'ExternalEmailClientUserLabel', labelID: string, labelName: string, skiffUserLabel?: { __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant } | null }>, folders: Array<{ __typename?: 'ExternalEmailClientSystemLabel', skiffSystemLabel?: Types.SystemLabels | null, labelID: string, labelName: string } | { __typename?: 'ExternalEmailClientUserLabel', labelID: string, labelName: string, skiffUserLabel?: { __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant } | null }> } };

export type EnableGmailImportMutationVariables = Types.Exact<{
  request: Types.EnableGmailImportRequest;
}>;


export type EnableGmailImportMutation = { __typename?: 'Mutation', enableGmailImport?: any | null };

export type EnableOutlookImportMutationVariables = Types.Exact<{
  request: Types.EnableOutlookImportRequest;
}>;


export type EnableOutlookImportMutation = { __typename?: 'Mutation', enableOutlookImport?: any | null };

export type CreateImportSessionMutationVariables = Types.Exact<{
  request: Types.CreateImportSessionRequest;
}>;


export type CreateImportSessionMutation = { __typename?: 'Mutation', createImportSession: { __typename?: 'ImportSession', importID: string } };

export type GetImportStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetImportStatusQuery = { __typename?: 'Query', importStatus: Array<{ __typename?: 'ImportStatusType', importID: string, importedEmailCount?: number | null, status: Types.ImportStatus }> };

export type ApplyLabelsMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.ModifyLabelsRequest>;
}>;


export type ApplyLabelsMutation = { __typename?: 'Mutation', applyLabels?: { __typename?: 'ModifyLabelsResponse', updatedThreads: Array<{ __typename?: 'UpdatedThreadLabels', threadID: string, systemLabels: Array<Types.SystemLabels>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant }> }> } | null };

export type BulkApplyLabelsMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.BulkModifyLabelsRequest>;
}>;


export type BulkApplyLabelsMutation = { __typename?: 'Mutation', bulkApplyLabels?: { __typename?: 'BulkModifyLabelsResponse', jobID: string } | null };

export type RemoveLabelsMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.ModifyLabelsRequest>;
}>;


export type RemoveLabelsMutation = { __typename?: 'Mutation', removeLabels?: { __typename?: 'ModifyLabelsResponse', updatedThreads: Array<{ __typename?: 'UpdatedThreadLabels', threadID: string, systemLabels: Array<Types.SystemLabels>, userLabels: Array<{ __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant }> }> } | null };

export type BulkRemoveLabelsMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.BulkModifyLabelsRequest>;
}>;


export type BulkRemoveLabelsMutation = { __typename?: 'Mutation', bulkRemoveLabels?: { __typename?: 'BulkModifyLabelsResponse', jobID: string } | null };

export type CreateUserLabelMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.CreateUserLabelRequest>;
}>;


export type CreateUserLabelMutation = { __typename?: 'Mutation', createUserLabel?: { __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant } | null };

export type EditUserLabelMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.EditUserLabelRequest>;
}>;


export type EditUserLabelMutation = { __typename?: 'Mutation', editUserLabel?: { __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant } | null };

export type DeleteUserLabelMutationVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.DeleteUserLabelRequest>;
}>;


export type DeleteUserLabelMutation = { __typename?: 'Mutation', deleteUserLabel?: any | null };

export type UserLabelsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserLabelsQuery = { __typename?: 'Query', userLabels: Array<{ __typename?: 'UserLabel', labelID: string, labelName: string, color: string, variant: Types.UserLabelVariant }> };

export type GetBulkModifyLabelsJobStatusQueryVariables = Types.Exact<{
  jobID: Types.Scalars['String'];
}>;


export type GetBulkModifyLabelsJobStatusQuery = { __typename?: 'Query', bulkModifyLabelsJobStatus: { __typename?: 'BulkModifyLabelsJobStatusResponse', jobStatus: Types.BullMqJobStatus, completed: boolean } };

export type CreateSrpResponseDataFragment = { __typename?: 'CreateSrpResponse', userID?: string | null, status: Types.LoginMutationStatus, jwt?: string | null, cacheKey?: string | null, recoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null, createdMailAccount?: boolean | null };

export type CreateSrpMutationVariables = Types.Exact<{
  request: Types.CreateSrpRequest;
}>;


export type CreateSrpMutation = { __typename?: 'Mutation', createSrp: { __typename?: 'CreateSrpResponse', userID?: string | null, status: Types.LoginMutationStatus, jwt?: string | null, cacheKey?: string | null, recoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null, createdMailAccount?: boolean | null } };

export type UpdateSrpMutationVariables = Types.Exact<{
  request: Types.UpdateSrpRequest;
}>;


export type UpdateSrpMutation = { __typename?: 'Mutation', updateSrp: { __typename?: 'UpdateSrpResponse', status: Types.LoginMutationStatus } };

export type ProvisionSrpMutationVariables = Types.Exact<{
  request: Types.ProvisionSrpRequest;
}>;


export type ProvisionSrpMutation = { __typename?: 'Mutation', provisionSrp: boolean };

export type LoginSrpResponseDataFragment = { __typename?: 'LoginSrpResponse', userID?: string | null, status?: Types.LoginMutationStatus | null, serverSessionProof?: string | null, publicKey?: { key: string, signature?: string } | null, signingPublicKey?: string | null, encryptedUserData?: string | null, encryptedDocumentData?: string | null, jwt?: string | null, cacheKey?: string | null, encryptedMetamaskSecret?: string | null, recoveryEmail?: string | null, unverifiedRecoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null, mfaTypes?: Array<string> | null, publicData?: { __typename?: 'PublicData', displayName?: string | null } | null, webAuthnChallengeResponse?: { __typename?: 'GenerateWebAuthnChallengeResponse', options: any } | null };

export type SetupProvisionedUserMutationVariables = Types.Exact<{
  request: Types.SetupProvisionedUserRequest;
}>;


export type SetupProvisionedUserMutation = { __typename?: 'Mutation', setupProvisionedUser: { __typename?: 'LoginSrpResponse', userID?: string | null, status?: Types.LoginMutationStatus | null, serverSessionProof?: string | null, publicKey?: { key: string, signature?: string } | null, signingPublicKey?: string | null, encryptedUserData?: string | null, encryptedDocumentData?: string | null, jwt?: string | null, cacheKey?: string | null, encryptedMetamaskSecret?: string | null, recoveryEmail?: string | null, unverifiedRecoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null, mfaTypes?: Array<string> | null, publicData?: { __typename?: 'PublicData', displayName?: string | null } | null, webAuthnChallengeResponse?: { __typename?: 'GenerateWebAuthnChallengeResponse', options: any } | null } };

export type LoginSrpStep1MutationVariables = Types.Exact<{
  request: Types.LoginSrpRequest;
}>;


export type LoginSrpStep1Mutation = { __typename?: 'Mutation', loginSrp: { __typename?: 'LoginSrpResponse', salt?: string | null, serverEphemeralPublic?: string | null } };

export type LoginSrpStep2MutationVariables = Types.Exact<{
  request: Types.LoginSrpRequest;
}>;


export type LoginSrpStep2Mutation = { __typename?: 'Mutation', loginSrp: { __typename?: 'LoginSrpResponse', userID?: string | null, status?: Types.LoginMutationStatus | null, serverSessionProof?: string | null, publicKey?: { key: string, signature?: string } | null, signingPublicKey?: string | null, encryptedUserData?: string | null, encryptedDocumentData?: string | null, jwt?: string | null, cacheKey?: string | null, encryptedMetamaskSecret?: string | null, recoveryEmail?: string | null, unverifiedRecoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null, mfaTypes?: Array<string> | null, publicData?: { __typename?: 'PublicData', displayName?: string | null } | null, webAuthnChallengeResponse?: { __typename?: 'GenerateWebAuthnChallengeResponse', options: any } | null } };

export type ClearSessionCacheMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type ClearSessionCacheMutation = { __typename?: 'Mutation', clearSessionCache: { __typename?: 'ClearSessionCacheResponse', status: Types.RequestStatus } };

export type SendAccessRequestEmailMutationVariables = Types.Exact<{
  request: Types.SendAccessRequestEmailRequest;
}>;


export type SendAccessRequestEmailMutation = { __typename?: 'Mutation', sendAccessRequestEmail: boolean };

export type CreateWalletChallengeMutationVariables = Types.Exact<{
  request: Types.CreateWalletChallengeRequest;
}>;


export type CreateWalletChallengeMutation = { __typename?: 'Mutation', createWalletChallenge: { __typename?: 'CreateWalletChallengeResponse', token: string } };

export type CreateSrpMetamaskMutationVariables = Types.Exact<{
  request: Types.CreateSrpMetamaskRequest;
}>;


export type CreateSrpMetamaskMutation = { __typename?: 'Mutation', createSrpMetamask: { __typename?: 'CreateSrpResponse', userID?: string | null, status: Types.LoginMutationStatus, jwt?: string | null, cacheKey?: string | null, recoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null, createdMailAccount?: boolean | null } };

export type CreateWalletChallengeSkemailMutationVariables = Types.Exact<{
  request: Types.CreateWalletChallengeRequestSkemail;
}>;


export type CreateWalletChallengeSkemailMutation = { __typename?: 'Mutation', createWalletChallengeSkemail: { __typename?: 'CreateWalletChallengeResponseSkemail', token: string } };

export type GenerateDocPublicLinkAuthTokenStep1MutationVariables = Types.Exact<{
  request: Types.GenerateDocPublicLinkAuthTokenStep1Request;
}>;


export type GenerateDocPublicLinkAuthTokenStep1Mutation = { __typename?: 'Mutation', generateDocPublicLinkAuthTokenStep1: { __typename?: 'GenerateDocPublicLinkAuthTokenStep1Response', salt: string, serverEphemeralPublic: string } };

export type GenerateDocPublicLinkAuthTokenStep2MutationVariables = Types.Exact<{
  request: Types.GenerateDocPublicLinkAuthTokenStep2Request;
}>;


export type GenerateDocPublicLinkAuthTokenStep2Mutation = { __typename?: 'Mutation', generateDocPublicLinkAuthTokenStep2: { __typename?: 'GenerateDocPublicLinkAuthTokenStep2Response', serverSessionProof: string, jwt: string, encryptedPrivateHierarchicalKey: string } };

export type SaveContentsMutationVariables = Types.Exact<{
  request: Types.SaveContentsRequest;
}>;


export type SaveContentsMutation = { __typename?: 'Mutation', saveContents: { __typename?: 'SaveContentsResponse', document: { __typename?: 'Document', docID: string, updatedAt?: Date | null, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> } } } };

export type SaveMetadataMutationVariables = Types.Exact<{
  request: Types.SaveMetadataRequest;
}>;


export type SaveMetadataMutation = { __typename?: 'Mutation', saveMetadata: { __typename?: 'SaveMetadataResponse', document: { __typename?: 'Document', cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type SaveMetadataNativeMutationVariables = Types.Exact<{
  request: Types.SaveMetadataRequest;
}>;


export type SaveMetadataNativeMutation = { __typename?: 'Mutation', saveMetadata: { __typename?: 'SaveMetadataResponse', document: { __typename?: 'Document', updatedAt?: Date | null, thumbnail?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, createdAt?: Date | null, team?: { __typename?: 'Team', personal: boolean, teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } } } };

export type SaveThumbnailMutationVariables = Types.Exact<{
  request: Types.SaveThumbnailRequest;
}>;


export type SaveThumbnailMutation = { __typename?: 'Mutation', saveThumbnail: { __typename?: 'SaveThumbnailResponse', document: { __typename?: 'Document', cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type SaveThumbnailNativeMutationVariables = Types.Exact<{
  request: Types.SaveThumbnailRequest;
}>;


export type SaveThumbnailNativeMutation = { __typename?: 'Mutation', saveThumbnail: { __typename?: 'SaveThumbnailResponse', document: { __typename?: 'Document', updatedAt?: Date | null, thumbnail?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, createdAt?: Date | null, team?: { __typename?: 'Team', personal: boolean, teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } } } };

export type NewMultipleDocsMutationVariables = Types.Exact<{
  request: Array<Types.NewDocRequest> | Types.NewDocRequest;
}>;


export type NewMultipleDocsMutation = { __typename?: 'Mutation', newMultipleDocs: Array<{ __typename?: 'NewDocResponse', docID: string, document?: { __typename?: 'Document', parentKeysClaim?: string | null, parentPublicHierarchicalKey?: string | null, thumbnail?: string | null, decryptedThumbnail?: string | null, cloneDocID?: string | null, createdAt?: Date | null, updatedAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, currentlyEditingUsers: Array<{ __typename?: 'CurrentlyEditingUser', name: string, userID: string, color: string, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } | null>, link?: { __typename?: 'LinkOutput', encryptedLinkKey: string, permissionLevel: Types.PermissionLevel, salt: string, decryptedLinkKey: string } | null, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } | null, error?: { __typename?: 'BatchError', message: string, code: string, extensions?: any | null } | null }> };

export type ShareDocMutationVariables = Types.Exact<{
  request: Types.ShareDocRequest;
}>;


export type ShareDocMutation = { __typename?: 'Mutation', shareDoc: { __typename?: 'ShareDocResponse', document: { __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type UpgradeKeyMutationVariables = Types.Exact<{
  request: Types.UpgradeKeyRequest;
}>;


export type UpgradeKeyMutation = { __typename?: 'Mutation', upgradeKey: { __typename?: 'UpgradeKeyResponse', document: { __typename?: 'Document', cloneDocID?: string | null, createdAt?: Date | null, updatedAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, link?: { __typename?: 'LinkOutput', encryptedLinkKey: string, permissionLevel: Types.PermissionLevel, salt: string, decryptedLinkKey: string } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type UpgradeHierarchicalKeysMutationVariables = Types.Exact<{
  request: Types.UpgradeHierarchicalKeysRequest;
}>;


export type UpgradeHierarchicalKeysMutation = { __typename?: 'Mutation', upgradeHierarchicalKeys: { __typename?: 'UpgradeHierarchicalKeysResponse', documents: Array<{ __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }> } };

export type UnshareDocMutationVariables = Types.Exact<{
  request: Types.UnshareDocRequest;
}>;


export type UnshareDocMutation = { __typename?: 'Mutation', unshareDoc: { __typename?: 'UnshareDocResponse', document: { __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type DeleteDocMutationVariables = Types.Exact<{
  request: Types.DeleteDocRequest;
}>;


export type DeleteDocMutation = { __typename?: 'Mutation', deleteDoc: { __typename?: 'DeleteDocResponse', status: Types.RequestStatus } };

export type DeleteSnapshotMutationVariables = Types.Exact<{
  request: Types.DeleteSnapshotRequest;
}>;


export type DeleteSnapshotMutation = { __typename?: 'Mutation', deleteSnapshot: { __typename?: 'DeleteSnapshotResponse', document?: { __typename?: 'Document', docID: string, updatedAt?: Date | null, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> } } | null } };

export type SetupLinkMutationVariables = Types.Exact<{
  request: Types.SetupLinkRequest;
}>;


export type SetupLinkMutation = { __typename?: 'Mutation', setupLink: { __typename?: 'SetupLinkResponse', document: { __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, link?: { __typename?: 'LinkOutput', salt: string, encryptedLinkKey: string, permissionLevel: Types.PermissionLevel, decryptedLinkKey: string } | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type DeleteLinkMutationVariables = Types.Exact<{
  request: Types.DeleteLinkRequest;
}>;


export type DeleteLinkMutation = { __typename?: 'Mutation', deleteLink: { __typename?: 'DeleteLinkResponse', status: Types.RequestStatus } };

export type MoveDocMutationVariables = Types.Exact<{
  request: Types.MoveDocRequest;
}>;


export type MoveDocMutation = { __typename?: 'Mutation', moveDoc: { __typename?: 'MoveDocResponse', document: { __typename?: 'Document', updatedAt?: Date | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type MoveMultipleDocMutationVariables = Types.Exact<{
  request: Array<Types.MoveDocRequest> | Types.MoveDocRequest;
}>;


export type MoveMultipleDocMutation = { __typename?: 'Mutation', moveMultipleDoc: Array<{ __typename?: 'MoveDocResponse', document: { __typename?: 'Document', updatedAt?: Date | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } }> };

export type MoveMultipleDocNativeMutationVariables = Types.Exact<{
  request: Array<Types.MoveDocRequest> | Types.MoveDocRequest;
}>;


export type MoveMultipleDocNativeMutation = { __typename?: 'Mutation', moveMultipleDoc: Array<{ __typename?: 'MoveDocResponse', document: { __typename?: 'Document', updatedAt?: Date | null, thumbnail?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, createdAt?: Date | null, team?: { __typename?: 'Team', personal: boolean, teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } } }> };

export type CreateCacheElementMutationVariables = Types.Exact<{
  request: Types.CreateCacheElementRequest;
}>;


export type CreateCacheElementMutation = { __typename?: 'Mutation', createCacheElement: { __typename?: 'CreateCacheElementResponse', writeUrl: string, cacheID: string } };

export type ConfirmCacheUploadMutationVariables = Types.Exact<{
  request: Types.ConfirmCacheUploadRequest;
}>;


export type ConfirmCacheUploadMutation = { __typename?: 'Mutation', confirmCacheUpload: { __typename?: 'ConfirmCacheUploadResponse', readUrl?: string | null, ipfsPath?: string | null } };

export type SendDocumentEventMutationVariables = Types.Exact<{
  request: Types.SendDocumentEventRequest;
}>;


export type SendDocumentEventMutation = { __typename?: 'Mutation', sendDocumentEvent?: boolean | null };

export type ChangeLinkPermissionMutationVariables = Types.Exact<{
  request: Types.ChangeLinkPermissionRequest;
}>;


export type ChangeLinkPermissionMutation = { __typename?: 'Mutation', changeLinkPermission: { __typename?: 'ChangeLinkPermissionResponse', document: { __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, link?: { __typename?: 'LinkOutput', salt: string, encryptedLinkKey: string, permissionLevel: Types.PermissionLevel, decryptedLinkKey: string } | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type TrashDocsMutationVariables = Types.Exact<{
  request: Array<Types.TrashDocRequest> | Types.TrashDocRequest;
}>;


export type TrashDocsMutation = { __typename?: 'Mutation', trashDocs: Array<{ __typename?: 'MoveDocResponse', document: { __typename?: 'Document', updatedAt?: Date | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } }> };

export type TrashDocsNativeMutationVariables = Types.Exact<{
  request: Array<Types.TrashDocRequest> | Types.TrashDocRequest;
}>;


export type TrashDocsNativeMutation = { __typename?: 'Mutation', trashDocs: Array<{ __typename?: 'MoveDocResponse', document: { __typename?: 'Document', updatedAt?: Date | null, thumbnail?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, createdAt?: Date | null, team?: { __typename?: 'Team', personal: boolean, teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } } }> };

export type RestoreTrashDocMutationVariables = Types.Exact<{
  request: Types.TrashDocRequest;
}>;


export type RestoreTrashDocMutation = { __typename?: 'Mutation', restoreTrashDoc: { __typename?: 'MoveDocResponse', document: { __typename?: 'Document', updatedAt?: Date | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } } };

export type RestoreTrashDocNativeMutationVariables = Types.Exact<{
  request: Types.TrashDocRequest;
}>;


export type RestoreTrashDocNativeMutation = { __typename?: 'Mutation', restoreTrashDoc: { __typename?: 'MoveDocResponse', document: { __typename?: 'Document', updatedAt?: Date | null, thumbnail?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, createdAt?: Date | null, team?: { __typename?: 'Team', personal: boolean, teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } } } };

export type DuplicateDocDeepMutationVariables = Types.Exact<{
  request: Types.DuplicateDocDeepRequest;
}>;


export type DuplicateDocDeepMutation = { __typename?: 'Mutation', duplicateDocDeep: { __typename?: 'DuplicateDocDeepResponse', docID: string } };

export type StoreWorkspaceEventMutationVariables = Types.Exact<{
  request: Types.WorkspaceEventRequest;
}>;


export type StoreWorkspaceEventMutation = { __typename?: 'Mutation', storeWorkspaceEvent: boolean };

export type StoreUnauthenticatedWorkspaceEventMutationVariables = Types.Exact<{
  request: Types.WorkspaceEventRequest;
}>;


export type StoreUnauthenticatedWorkspaceEventMutation = { __typename?: 'Mutation', storeUnauthenticatedWorkspaceEvent: boolean };

export type AddPendingInviteMutationVariables = Types.Exact<{
  request: Types.AddPendingInviteRequest;
}>;


export type AddPendingInviteMutation = { __typename?: 'Mutation', addPendingInvite: { __typename?: 'AddPendingInviteResponse', status: Types.RequestStatus } };

export type DeleteInviteMutationVariables = Types.Exact<{
  request: Types.DeleteInviteRequest;
}>;


export type DeleteInviteMutation = { __typename?: 'Mutation', deleteInvite: { __typename?: 'DeleteInviteResponse', status: Types.RequestStatus } };

export type AcceptInviteStep1MutationVariables = Types.Exact<{
  request: Types.AcceptInviteStep1Request;
}>;


export type AcceptInviteStep1Mutation = { __typename?: 'Mutation', acceptInviteStep1: { __typename?: 'AcceptInviteStep1Response', salt: string, serverEphemeralPublic: string, encryptedSessionKey: string, encryptedPrivateHierarchicalKey: string, permissionLevel: Types.PermissionLevel, publicHierarchicalKey?: string | null } };

export type UploadSpamReportMutationVariables = Types.Exact<{
  request: Types.UploadSpamReportRequest;
}>;


export type UploadSpamReportMutation = { __typename?: 'Mutation', uploadSpamReport?: any | null };

export type UnsilenceMultipleEmailAddressesMutationVariables = Types.Exact<{
  request: Types.UnsilenceMultipleEmailAddressesRequest;
}>;


export type UnsilenceMultipleEmailAddressesMutation = { __typename?: 'Mutation', unsilenceMultipleEmailAddresses?: any | null };

export type NotificationClickedMutationVariables = Types.Exact<{
  request: Types.NotificationClickedRequest;
}>;


export type NotificationClickedMutation = { __typename?: 'Mutation', notificationClicked?: boolean | null };

export type CreateTeamMutationVariables = Types.Exact<{
  request: Types.CreateTeamRequest;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', teamID: string, name: string, icon: string, rootDocument?: { __typename?: 'Document', cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } | null, organization: { __typename?: 'Organization', orgID: string, teams: Array<{ __typename?: 'Team', teamID: string, name: string }> } } };

export type ShareTeamDocWithOtherTeamMutationVariables = Types.Exact<{
  request: Types.ShareTeamDocWithOtherTeamRequest;
}>;


export type ShareTeamDocWithOtherTeamMutation = { __typename?: 'Mutation', shareTeamDocWithOtherTeam: { __typename?: 'Team', teamID: string, name: string, icon: string, rootDocument?: { __typename?: 'Document', cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } | null } };

export type UnshareTeamDocWithOtherTeamMutationVariables = Types.Exact<{
  request: Types.UnshareTeamDocWithOtherTeamRequest;
}>;


export type UnshareTeamDocWithOtherTeamMutation = { __typename?: 'Mutation', unshareTeamDocWithOtherTeam: { __typename?: 'Team', teamID: string, name: string, icon: string, rootDocument?: { __typename?: 'Document', cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } | null } };

export type DeleteTeamMutationVariables = Types.Exact<{
  request: Types.DeleteTeamRequest;
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: boolean };

export type EditOrganizationMutationVariables = Types.Exact<{
  request: Types.EditOrganizationRequest;
}>;


export type EditOrganizationMutation = { __typename?: 'Mutation', editOrganization: { __typename?: 'EditOrganizationResponse', organization: { __typename?: 'Organization', orgID: string, name: string, hasCustomized: boolean } } };

export type EditTeamMutationVariables = Types.Exact<{
  request: Types.EditTeamRequest;
}>;


export type EditTeamMutation = { __typename?: 'Mutation', editTeam: { __typename?: 'Team', teamID: string, name: string, icon: string } };

export type DeleteUserOrganizationMembershipMutationVariables = Types.Exact<{
  request: Types.DeleteUserOrganizationMembershipRequest;
}>;


export type DeleteUserOrganizationMembershipMutation = { __typename?: 'Mutation', deleteUserOrganizationMembership: boolean };

export type ManageOrganizationPaymentDetailsMutationVariables = Types.Exact<{
  request: Types.ManageOrganizationPaymentDetailsRequest;
}>;


export type ManageOrganizationPaymentDetailsMutation = { __typename?: 'Mutation', manageOrganizationPaymentDetails: { __typename?: 'ManageOrganizationPaymentDetailsResponse', redirectURL: string } };

export type ReferUserMutationVariables = Types.Exact<{
  request: Types.ReferUserRequest;
}>;


export type ReferUserMutation = { __typename?: 'Mutation', referUser: { __typename?: 'ReferUserResponse', status: Types.RequestStatus } };

export type EnrollMfaMutationVariables = Types.Exact<{
  request: Types.EnrollMfaRequest;
}>;


export type EnrollMfaMutation = { __typename?: 'Mutation', enrollMfa: { __typename?: 'EnrollMfaResponse', status: Types.RequestStatus, backupCodes: Array<string> } };

export type DisableMfaMutationVariables = Types.Exact<{
  request: Types.DisableMfaRequest;
}>;


export type DisableMfaMutation = { __typename?: 'Mutation', disableMfa: { __typename?: 'DisableMfaResponse', status: Types.RequestStatus } };

export type RegenerateMfaBackupCodesMutationVariables = Types.Exact<{
  request: Types.RegenerateMfaBackupCodesRequest;
}>;


export type RegenerateMfaBackupCodesMutation = { __typename?: 'Mutation', regenerateMfaBackupCodes: { __typename?: 'RegenerateMfaBackupCodesResponse', status: Types.RequestStatus, backupCodes: Array<string> } };

export type UpdateDisplayNameMutationVariables = Types.Exact<{
  request: Types.UpdateDisplayNameRequest;
}>;


export type UpdateDisplayNameMutation = { __typename?: 'Mutation', updateDisplayName: { __typename?: 'UpdateDisplayNameResponse', status: Types.RequestStatus } };

export type UpdateDocumentDataMutationVariables = Types.Exact<{
  request: Types.UpdateDocumentDataRequest;
}>;


export type UpdateDocumentDataMutation = { __typename?: 'Mutation', updateDocumentData: { __typename?: 'UpdateDocumentDataResponse', status: Types.RequestStatus } };

export type DeleteAccountMutationVariables = Types.Exact<{
  request: Types.DeleteAccountRequest;
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'DeleteAccountResponse', status: Types.RequestStatus } };

export type DeleteMailAccountMutationVariables = Types.Exact<{
  request: Types.DeleteMailAccountRequest;
}>;


export type DeleteMailAccountMutation = { __typename?: 'Mutation', deleteMailAccount: { __typename?: 'DeleteMailAccountResponse', status: Types.RequestStatus } };

export type UploadRecoveryDataMutationVariables = Types.Exact<{
  request: Types.UploadRecoveryDataRequest;
}>;


export type UploadRecoveryDataMutation = { __typename?: 'Mutation', uploadRecoveryData: { __typename?: 'UploadRecoveryDataResponse', status: Types.RequestStatus } };

export type ResetAccountMutationVariables = Types.Exact<{
  request: Types.ResetAccountRequest;
}>;


export type ResetAccountMutation = { __typename?: 'Mutation', resetAccount?: boolean | null };

export type AddEmailMutationVariables = Types.Exact<{
  request: Types.AddEmailRequest;
}>;


export type AddEmailMutation = { __typename?: 'Mutation', addEmail: { __typename?: 'AddEmailResponse', status: Types.RequestStatus } };

export type DeleteRecoveryEmailMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type DeleteRecoveryEmailMutation = { __typename?: 'Mutation', deleteRecoveryEmail: boolean };

export type SetUseIpfsMutationVariables = Types.Exact<{
  request: Types.SetUseIpfsRequest;
}>;


export type SetUseIpfsMutation = { __typename?: 'Mutation', setUseIPFS: { __typename?: 'SetUseIPFSResponse', status: Types.RequestStatus } };

export type SetNotificationPreferencesMutationVariables = Types.Exact<{
  request: Types.SetNotificationPreferencesRequest;
}>;


export type SetNotificationPreferencesMutation = { __typename?: 'Mutation', setNotificationPreferences?: boolean | null };

export type SetPdSubscribeFlagMutationVariables = Types.Exact<{
  request: Types.SetPdSubscribeFlagRequest;
}>;


export type SetPdSubscribeFlagMutation = { __typename?: 'Mutation', setPDSubscribeFlag?: any | null };

export type SetPgpKeyMutationVariables = Types.Exact<{
  request: Types.SetPgpKey;
}>;


export type SetPgpKeyMutation = { __typename?: 'Mutation', setPGPKey?: any | null };

export type SendAnonymousSubdomainTutorialEmailMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type SendAnonymousSubdomainTutorialEmailMutation = { __typename?: 'Mutation', sendAnonymousSubdomainTutorialEmail?: any | null };

export type CreateQuickAliasDomainMutationVariables = Types.Exact<{
  request: Types.CreateAnonymousSubdomainInput;
}>;


export type CreateQuickAliasDomainMutation = { __typename?: 'Mutation', createAnonymousSubdomain?: any | null };

export type DeleteQuickAliasDomainMutationVariables = Types.Exact<{
  userDomainID: Types.Scalars['String'];
}>;


export type DeleteQuickAliasDomainMutation = { __typename?: 'Mutation', deleteAnonymousSubdomain?: any | null };

export type UpdateQuickAliasInfoMutationVariables = Types.Exact<{
  request: Types.UpdateQuickAliasInfoInput;
}>;


export type UpdateQuickAliasInfoMutation = { __typename?: 'Mutation', updateQuickAliasInfo?: any | null };

export type CreateUploadAvatarLinkMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateUploadAvatarLinkMutation = { __typename?: 'Mutation', createUploadAvatarLink: { __typename?: 'CreateUploadAvatarLinkResponse', writeUrl: string, profileCustomURI: string } };

export type UpdateDisplayPictureMutationVariables = Types.Exact<{
  request: Types.UpdateDisplayPictureRequest;
}>;


export type UpdateDisplayPictureMutation = { __typename?: 'Mutation', updateDisplayPicture: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } };

export type CreateCalendarUserMutationVariables = Types.Exact<{
  request: Types.CreateCalendarUserRequest;
}>;


export type CreateCalendarUserMutation = { __typename?: 'Mutation', createCalendarUser?: any | null };

export type MarkCurrentUserOnboardedWorkspaceMigrationMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type MarkCurrentUserOnboardedWorkspaceMigrationMutation = { __typename?: 'Mutation', markCurrentUserOnboardedWorkspaceMigration?: any | null };

export type SetDefaultEmailAliasMutationVariables = Types.Exact<{
  request: Types.SetDefaultEmailAliasRequest;
}>;


export type SetDefaultEmailAliasMutation = { __typename?: 'Mutation', setDefaultEmailAlias: boolean };

export type GenerateWebAuthnChallengeMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type GenerateWebAuthnChallengeMutation = { __typename?: 'Mutation', generateWebAuthnChallenge?: { __typename?: 'GenerateWebAuthnChallengeResponse', options: any } | null };

export type GenerateWebAuthnRegistrationMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type GenerateWebAuthnRegistrationMutation = { __typename?: 'Mutation', generateWebAuthnRegistration: { __typename?: 'GenerateWebAuthnRegistrationResponse', options: any } };

export type VerifyWebAuthnRegistrationMutationVariables = Types.Exact<{
  request: Types.VerifyWebAuthnRegistrationRequest;
}>;


export type VerifyWebAuthnRegistrationMutation = { __typename?: 'Mutation', verifyWebAuthnRegistration: { __typename?: 'VerifyWebAuthnRegistrationResponse', status: Types.RequestStatus } };

export type RenameWebauthnDeviceMutationVariables = Types.Exact<{
  request: Types.RenameWebAuthnDeviceRequest;
}>;


export type RenameWebauthnDeviceMutation = { __typename?: 'Mutation', renameWebAuthnDevice?: any | null };

export type GetCheckoutSessionUrlOrStripeUpdateStatusQueryVariables = Types.Exact<{
  request: Types.GetCheckoutSessionRequest;
}>;


export type GetCheckoutSessionUrlOrStripeUpdateStatusQuery = { __typename?: 'Query', checkoutPortal: { __typename?: 'CheckoutSession', url?: string | null, status: Types.RequestStatus, downgradeProgress?: { __typename?: 'DowngradeProgress', currentStorageInMb: number, customDomains: number, emailAliases: number, shortAliases: number, workspaceUsers: number, userLabels: number, userFolders: number, userMailFilters: number, quickAliases: number, quickAliasSubdomains: number } | null } };

export type GetCustomDomainCheckoutPortalQueryVariables = Types.Exact<{
  request: Types.GetCustomDomainCheckoutSessionRequest;
}>;


export type GetCustomDomainCheckoutPortalQuery = { __typename?: 'Query', customDomainCheckoutPortal: { __typename?: 'CheckoutSession', status: Types.RequestStatus, url?: string | null } };

export type GetCoinbaseCheckoutIdQueryVariables = Types.Exact<{
  request: Types.GetCoinbaseCheckoutIdRequest;
}>;


export type GetCoinbaseCheckoutIdQuery = { __typename?: 'Query', getCoinbaseCheckoutID: { __typename?: 'GetCoinbaseCheckoutIDResponse', coinbaseCheckoutID: string } };

export type GetBillingPortalSessionUrlQueryVariables = Types.Exact<{
  request: Types.GetBillingPortalSessionRequest;
}>;


export type GetBillingPortalSessionUrlQuery = { __typename?: 'Query', billingPortal?: { __typename?: 'CreateBillingPortalSessionOutput', url?: string | null } | null };

export type GetOrCreateStripeCustomerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetOrCreateStripeCustomerQuery = { __typename?: 'Query', getOrCreateStripeCustomer: { __typename?: 'GetOrCreateStripeCustomerResponse', stripeCustomerID: string } };

export type AdjustBusinessPlanMutationVariables = Types.Exact<{
  request: Types.AdjustBusinessPlanRequest;
}>;


export type AdjustBusinessPlanMutation = { __typename?: 'Mutation', adjustBusinessPlan: { __typename?: 'AdjustBusinessPlanResponse', status: Types.RequestStatus, seats?: number | null } };

export type RequestAppStoreTestNotificationQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RequestAppStoreTestNotificationQuery = { __typename?: 'Query', requestAppStoreTestNotification?: { __typename?: 'AppStoreTestNotificationResponse', testNotificationToken?: string | null } | null };

export type GetTestNotificationStatusQueryVariables = Types.Exact<{
  request: Types.GetAppleTestNotificationStatusInput;
}>;


export type GetTestNotificationStatusQuery = { __typename?: 'Query', getAppleTestNotificationStatus: { __typename?: 'CheckTestNotificationResponse', signedPayload?: string | null, sendAttempts?: Array<{ __typename?: 'SendAttemptItem', attemptDate?: Date | null, sendAttemptResult?: Types.SendAttemptResult | null } | null> | null } };

export type ValidateOriginalTransactionIdMatchesUserQueryVariables = Types.Exact<{
  request: Types.ValidateOriginalTransactionIdMatchesUserInput;
}>;


export type ValidateOriginalTransactionIdMatchesUserQuery = { __typename?: 'Query', validateOriginalTransactionIdMatchesUser: boolean };

export type ValidateAppStoreSubscriptionRequestMutationVariables = Types.Exact<{
  request: Types.ValidateAppStoreSubscriptionRequest;
}>;


export type ValidateAppStoreSubscriptionRequestMutation = { __typename?: 'Mutation', ValidateAppStoreSubscriptionRequest: boolean };

export type GetAppleSubscriptionPlansQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAppleSubscriptionPlansQuery = { __typename?: 'Query', getAppleSubscriptionPlans: { __typename?: 'GetAppleSubscriptionPlansResult', plans: Array<{ __typename?: 'SubscriptionPlanWithSKU', tierName: string, monthly?: string | null, yearly?: string | null }> } };

export type GetGoogleSubscriptionPlansQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetGoogleSubscriptionPlansQuery = { __typename?: 'Query', getGoogleSubscriptionPlans: { __typename?: 'GetGoogleSubscriptionPlansResult', plans: Array<{ __typename?: 'GoogleSubscriptionPlanWithSKU', tierName: string, skuName: string, skuMonthlyOfferId: string, skuAnnualOfferId: string }> } };

export type GetActiveUsersQueryVariables = Types.Exact<{
  request: Types.GetDocumentRequest;
}>;


export type GetActiveUsersQuery = { __typename?: 'Query', document: { __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, currentlyEditingUsers: Array<{ __typename?: 'CurrentlyEditingUser', name: string, userID: string, color: string, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } | null>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } };

export type GetLinkQueryVariables = Types.Exact<{
  request: Types.GetDocumentRequest;
}>;


export type GetLinkQuery = { __typename?: 'Query', document: { __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, link?: { __typename?: 'LinkOutput', encryptedLinkKey: string, permissionLevel: Types.PermissionLevel, salt: string, decryptedLinkKey: string } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } };

export type GetDocumentsBaseQueryVariables = Types.Exact<{
  request: Types.GetDocumentsRequest;
}>;


export type GetDocumentsBaseQuery = { __typename?: 'Query', documents: Array<{ __typename?: 'Document', updatedAt?: Date | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }> };

export type GetDocumentsBaseForTrashQueryVariables = Types.Exact<{
  request: Types.GetDocumentsRequest;
}>;


export type GetDocumentsBaseForTrashQuery = { __typename?: 'Query', documents: Array<{ __typename?: 'Document', updatedAt?: Date | null, previousParentID?: string | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }> };

export type GetDocumentBreadcrumbQueryVariables = Types.Exact<{
  request: Types.GetDocumentRequest;
}>;


export type GetDocumentBreadcrumbQuery = { __typename?: 'Query', document: { __typename?: 'Document', cloneDocID?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, parentsBreadcrumb: Array<{ __typename?: 'Document', cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } };

export type GetDocumentBaseQueryVariables = Types.Exact<{
  request: Types.GetDocumentRequest;
}>;


export type GetDocumentBaseQuery = { __typename?: 'Query', document: { __typename?: 'Document', updatedAt?: Date | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } };

export type GetDocumentFullQueryVariables = Types.Exact<{
  request: Types.GetDocumentRequest;
}>;


export type GetDocumentFullQuery = { __typename?: 'Query', document: { __typename?: 'Document', parentKeysClaim?: string | null, parentPublicHierarchicalKey?: string | null, thumbnail?: string | null, decryptedThumbnail?: string | null, cloneDocID?: string | null, createdAt?: Date | null, updatedAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, currentlyEditingUsers: Array<{ __typename?: 'CurrentlyEditingUser', name: string, userID: string, color: string, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } | null>, link?: { __typename?: 'LinkOutput', encryptedLinkKey: string, permissionLevel: Types.PermissionLevel, salt: string, decryptedLinkKey: string } | null, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }>, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> } };

export type GetNativeDocumentsQueryVariables = Types.Exact<{
  request: Types.GetDocumentsRequest;
}>;


export type GetNativeDocumentsQuery = { __typename?: 'Query', documents: Array<{ __typename?: 'Document', updatedAt?: Date | null, thumbnail?: string | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, createdAt?: Date | null, team?: { __typename?: 'Team', personal: boolean, teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, contents: { __typename?: 'EncryptedContentsOutput', contentsArr: Array<{ __typename?: 'EncryptedChunkOutput', content: string, signedBy: string, signature: string, chunkNumber: number }> }, decryptedContents: { __typename?: 'DocumentDecryptedContents', contentsArr: Array<{ __typename?: 'DocumentDecryptedContentsChunk', chunkNumber: number, chunkData: any }> }, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } }> };

export type GetDocumentPublicOrgDataQueryVariables = Types.Exact<{
  request: Types.GetDocumentRequest;
}>;


export type GetDocumentPublicOrgDataQuery = { __typename?: 'Query', document: { __typename?: 'Document', docID: string, publicOrgData?: Array<{ __typename?: 'PublicOrgData', orgID: string, name: string, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } | null> | null } };

export type GetDocumentSnapshotsQueryVariables = Types.Exact<{
  request: Types.GetDocumentRequest;
}>;


export type GetDocumentSnapshotsQuery = { __typename?: 'Query', document: { __typename?: 'Document', docID: string, snapshots: Array<{ __typename?: 'DocumentSnapshot', data: string, createdAt: Date, version: number, decryptedKey: string, decryptedData: any, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }> } };

export type GetPendingDocumentKeyUpgradesQueryVariables = Types.Exact<{
  request: Types.PendingDocumentKeyUpgradesRequest;
}>;


export type GetPendingDocumentKeyUpgradesQuery = { __typename?: 'Query', pendingDocumentKeyUpgrades: { __typename?: 'PendingDocumentKeyUpgradesOutput', collaborators: Array<{ __typename?: 'PendingDocumentKeyUpgradesCollaborator', userID: string, publicKey: { key: string, signature?: string } }>, newHierarchicalKeys: Array<{ __typename?: 'PendingDocumentKeyUpgradesNewHierarchicalKey', docID: string, collaboratorsIDs: Array<string>, encryptedLinkKey?: string | null, currentPublicHierarchicalKey?: string | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }>, newKeysClaims: Array<{ __typename?: 'PendingDocumentKeyUpgradesNewKeysClaim', docID: string, keysClaimSourceDocID: string, keysClaimSourceDocPublicHierarchicalKey?: string | null, currentKeysClaim?: string | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }> } };

export type GetMailFiltersQueryVariables = Types.Exact<{
  request?: Types.InputMaybe<Types.GetMailFiltersInput>;
}>;


export type GetMailFiltersQuery = { __typename?: 'Query', mailFilters: Array<{ __typename?: 'MailFilter', name?: string | null, mailFilterID: string, clientside: boolean, encryptedSessionKey?: string | null, encryptedByKey?: string | null, actions: Array<{ __typename?: 'FilterAction', actionType: Types.ActionType, serializedData?: string | null }>, filter: { __typename?: 'MailFilterField', filterField?: Types.FilterField | null, filterType: Types.FilterType, serializedData?: string | null, subFilter?: Array<{ __typename?: 'MailFilterField', filterField?: Types.FilterField | null, filterType: Types.FilterType, serializedData?: string | null, subFilter?: Array<{ __typename?: 'MailFilterField', filterField?: Types.FilterField | null, filterType: Types.FilterType, serializedData?: string | null }> | null }> | null } }> };

export type GetAccountMailDataQueryVariables = Types.Exact<{
  label: Types.Scalars['String'];
}>;


export type GetAccountMailDataQuery = { __typename?: 'Query', unread: number, currentUser?: { __typename?: 'User', userID: string, defaultEmailAlias?: string | null, emailAliases?: Array<string> | null, recoveryEmail?: string | null, unverifiedRecoveryEmail?: string | null, username: string, publicKey: { key: string, signature?: string }, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null }, rootOrganization: { __typename?: 'Organization', orgID: string, name: string, rootDocID: string, displayPictureData: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null }, personalTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', docID: string } | null }, everyoneTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }> } | null } } } | null };

export type GetNumMailboxThreadsQueryVariables = Types.Exact<{
  label: Types.Scalars['String'];
}>;


export type GetNumMailboxThreadsQuery = { __typename?: 'Query', numMailboxThreads: number };

export type GetSilenceSenderSuggestionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSilenceSenderSuggestionsQuery = { __typename?: 'Query', silenceSenderSuggestions: { __typename?: 'BulkSilenceSuggestions', silenceSenderDomains: Array<{ __typename?: 'SilencedDomainAggregation', domain: string, senders: Array<{ __typename?: 'SilenceSenderBulkSuggestion', sender: string, messageCount: number, totalBytes?: number | null }> }>, silenceSenderIndividuals: Array<{ __typename?: 'SilenceSenderBulkSuggestion', sender: string, messageCount: number, totalBytes?: number | null }> } };

export type GetSilencedSendersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSilencedSendersQuery = { __typename?: 'Query', silencedSenders: { __typename?: 'BulkSilenceSuggestions', silenceSenderDomains: Array<{ __typename?: 'SilencedDomainAggregation', domain: string, senders: Array<{ __typename?: 'SilenceSenderBulkSuggestion', sender: string, messageCount: number, totalBytes?: number | null }> }>, silenceSenderIndividuals: Array<{ __typename?: 'SilenceSenderBulkSuggestion', sender: string, messageCount: number, totalBytes?: number | null }> } };

export type GetSessionCacheQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSessionCacheQuery = { __typename?: 'Query', sessionCache: { __typename?: 'SessionCacheOutput', cacheKey: string, alternativeCacheKeys: Array<string> }, currentUser?: { __typename?: 'User', userID: string, recoveryEmail?: string | null, unverifiedRecoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } | null };

export type GetSessionCacheMobileQueryVariables = Types.Exact<{
  req: Types.SessionCacheMobileRequest;
}>;


export type GetSessionCacheMobileQuery = { __typename?: 'Query', sessionCacheMobile?: any | null };

export type GetSessionCacheChallengeQueryVariables = Types.Exact<{
  req: Types.SessionCacheInput;
}>;


export type GetSessionCacheChallengeQuery = { __typename?: 'Query', sessionCacheChallenge: { __typename?: 'SessionCacheChallengeResponse', serverPublicKey: string, encryptedChallenge: string } };

export type GetPgpInfoQueryVariables = Types.Exact<{
  emailAlias: Types.Scalars['String'];
  allKeys?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type GetPgpInfoQuery = { __typename?: 'Query', pgpInfo: Array<{ __typename?: 'PGPInfo', createdAt: Date, emailAlias: string, encryptionFingerprint: string, encryptionKeyID: string, publicKey: string, signingFingerprint: string, signingKeyID: string, status: Types.PgpKeyStatus, encryptedPrivateKey: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedSessionKey: string, encryptedBy: { key: string, signature?: string } } } | null> };

export type GetSessionCacheWithCalendarsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSessionCacheWithCalendarsQuery = { __typename?: 'Query', sessionCache: { __typename?: 'SessionCacheOutput', cacheKey: string, alternativeCacheKeys: Array<string> }, currentUser?: { __typename?: 'User', userID: string, recoveryEmail?: string | null, unverifiedRecoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null, primaryCalendar?: { __typename?: 'Calendar', calendarID: string } | null, calendars?: Array<{ __typename?: 'UserCalendar', calendarID: string, publicKey: string, encryptedPrivateKey?: string | null, encryptedByKey: string }> | null } | null };

export type GetSearchIndexableDocumentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSearchIndexableDocumentsQuery = { __typename?: 'Query', searchIndexableDocuments: Array<{ __typename?: 'IndexableDocument', docID: string, updatedAt: Date }> };

export type GetSearchIndexProgressQueryVariables = Types.Exact<{
  request: Types.GetSearchIndexProgressRequest;
}>;


export type GetSearchIndexProgressQuery = { __typename?: 'Query', searchIndexProgress: { __typename?: 'SearchIndexProgress', numIndexableThreads: number, numThreadsIndexed: number, isIndexComplete: boolean } };

export type GetAllFolderDocumentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllFolderDocumentsQuery = { __typename?: 'Query', allFolderDocuments: Array<{ __typename?: 'Document', updatedAt?: Date | null, cloneDocID?: string | null, createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, parentsBreadcrumb: Array<{ __typename?: 'Document', docID: string, createdAt?: Date | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null } }>, team?: { __typename?: 'Team', teamID: string, name: string, icon: string, accessLevel?: Types.TeamAccess | null, rootDocument?: { __typename?: 'Document', docID: string } | null, organization: { __typename?: 'Organization', orgID: string } } | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }> }> };

export type ApiVersionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ApiVersionQuery = { __typename?: 'Query', apiVersion?: string | null };

export type GetIcnsNameQueryVariables = Types.Exact<{
  cosmosAddress: Types.Scalars['String'];
}>;


export type GetIcnsNameQuery = { __typename?: 'Query', getICNSName?: string | null };

export type RefreshTokenQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken?: any | null };

export type GetNativeDriveManifestQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetNativeDriveManifestQuery = { __typename?: 'Query', nativeDriveManifest: { __typename?: 'NativeDriveManifestResponse', slimDocuments: Array<{ __typename?: 'SlimDocument', docID: string, parentID?: string | null, currentUserPermissionLevel: Types.PermissionLevel, trashedAt?: string | null, updatedAt: string }> } };

export type GetOrganizationQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetOrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', orgID: string, name: string, rootDocID: string, hasCustomized: boolean, teams: Array<{ __typename?: 'Team', accessLevel?: Types.TeamAccess | null, teamID: string, name: string, icon: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, permissionProxies: Array<{ __typename?: 'DocumentPermissionProxy', sourceDocID: string, sourceTeam: { __typename?: 'Team', teamID: string, name: string, icon: string } }> } | null }>, everyoneTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }> } | null }, personalTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', docID: string } | null }, displayPictureData: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } } };

export type GetOrganizationMembersQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetOrganizationMembersQuery = { __typename?: 'Query', organization: { __typename?: 'Organization', orgID: string, name: string, rootDocID: string, everyoneTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }> } | null }, displayPictureData: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null }, teams: Array<{ __typename?: 'Team', accessLevel?: Types.TeamAccess | null, teamID: string, name: string, icon: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, permissionProxies: Array<{ __typename?: 'DocumentPermissionProxy', sourceDocID: string, sourceTeam: { __typename?: 'Team', teamID: string, name: string, icon: string } }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }> } | null }> } };

export type GetTemplatesQueryVariables = Types.Exact<{
  request: Types.GetTemplatesRequest;
}>;


export type GetTemplatesQuery = { __typename?: 'Query', templates: Array<{ __typename?: 'Template', templateID: string, group: string, parentID?: string | null, contents: { __typename?: 'TemplateContent', pmDoc: any }, metadata: { __typename?: 'TemplateMetaData', title: string, icon?: string | null, color?: string | null, description?: string | null } }> };

export type GetUserIdQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string } | null };

export type GetUserStorageUsedQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserStorageUsedQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, storageUsed: string } | null };

export type GetUserMailStorageUsedQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserMailStorageUsedQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, skemailStorageUsage?: { __typename?: 'StorageUsage', attachmentUsageBytes: string, messageUsageBytes: string } | null } | null };

export type GetUsersProfileDataQueryVariables = Types.Exact<{
  request: Types.GetUsersRequest;
}>;


export type GetUsersProfileDataQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } }> | null };

export type GetUserProfileDataQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserProfileDataQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } | null };

export type GetPublicKeyQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetPublicKeyQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, publicKey: { key: string, signature?: string }, signingPublicKey: string } | null };

export type GetPublicKeysQueryVariables = Types.Exact<{
  request: Types.GetUsersRequest;
}>;


export type GetPublicKeysQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', userID: string, publicKey: { key: string, signature?: string }, signingPublicKey: string }> | null };

export type GetUserMfaQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserMfaQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, mfa: { __typename?: 'MFAFactors', totpData?: string | null, backupCodes?: Array<string> | null, webAuthnKeys?: Array<{ __typename?: 'WebAuthnKey', keyName?: string | null, credentialID: string, lastSuccessfulChallenge?: Date | null, transports?: Array<string> | null }> | null } } | null };

export type GetRecoveryDataQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetRecoveryDataQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, encryptedRecoveryData?: string | null } | null };

export type GetRecoveryShareQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetRecoveryShareQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, username: string, publicKey: { key: string, signature?: string }, recoverySigningPublicKey?: { key: string, signature?: string } | null, recoveryServerShare?: string | null } | null };

export type GetUserTagsQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserTagsQuery = { __typename?: 'Query', user?: { __typename?: 'User', accountTags?: Array<string> | null, userID: string } | null };

export type GetSubscriptionInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSubscriptionInfoQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, subscriptionInfo: { __typename?: 'SubscriptionInfo', subscriptionPlan: string, isCryptoSubscription: boolean, isAppleSubscription: boolean, isGoogleSubscription: boolean, cancelAtPeriodEnd: boolean, supposedEndDate?: Date | null, stripeStatus?: string | null, billingInterval?: Types.SubscriptionInterval | null, quantity?: number | null } } | null };

export type GetInvoiceHistoryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetInvoiceHistoryQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, invoiceHistory: { __typename?: 'InvoiceHistory', invoiceHistory?: Array<{ __typename?: 'Invoice', amountDue?: number | null, created?: Date | null, url?: string | null, invoiceTiers?: Array<string> | null, status?: string | null } | null> | null } } | null };

export type GetUserMetamaskSecretQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserMetamaskSecretQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, encryptedMetamaskSecret?: string | null } | null };

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', publicKey: { key: string, signature?: string }, signingPublicKey: string, userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } | null };

export type CurrentUserEmailAliasesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserEmailAliasesQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, emailAliases?: Array<string> | null } | null };

export type GetFullAliasInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFullAliasInfoQuery = { __typename?: 'Query', fullAliasInfo: Array<{ __typename?: 'FullAliasInfo', emailAlias: string, displayName?: string | null, encryptedAliasData?: string | null, encryptedByKey?: string | null, encryptedSessionKey?: string | null, areNotificationsEnabled?: boolean | null, createdAt: Date, decryptedSessionKey?: string | null, displayPictureData?: { __typename?: 'DisplayPictureDataSkemail', profileIcon?: string | null, profileAccentColor?: string | null, profileCustomURI?: string | null } | null, decryptedData?: { __typename?: 'DecryptedAliasData', note?: string | null } | null }> };

export type AliasDisplayInfoQueryVariables = Types.Exact<{
  emailAlias: Types.Scalars['String'];
}>;


export type AliasDisplayInfoQuery = { __typename?: 'Query', aliasDisplayInfo?: { __typename?: 'AliasDisplayInfo', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureDataSkemail', profileIcon?: string | null, profileAccentColor?: string | null, profileCustomURI?: string | null } | null } | null };

export type GetQuickAliasRootDomainsForUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetQuickAliasRootDomainsForUserQuery = { __typename?: 'Query', getQuickAliasRootDomainsForUser: Array<string> };

export type GetRecoveryPublicKeysAndDataQueryVariables = Types.Exact<{
  request: Types.GetRecoveryPublicKeysAndDataRequest;
}>;


export type GetRecoveryPublicKeysAndDataQuery = { __typename?: 'Query', recoveryPublicKeysAndData?: { __typename?: 'RecoveryPublicKeysAndDataOutput', recoverySigningPublicKey?: { key: string, signature?: string } | null, publicKey: { key: string, signature?: string }, encryptedRecoveryData?: string | null, recoveryServerShare?: string | null } | null };

export type ValidatePaperShareHashQueryVariables = Types.Exact<{
  request: Types.GetValidPaperShareHashRequest;
}>;


export type ValidatePaperShareHashQuery = { __typename?: 'Query', validPaperShareHash: boolean };

export type OrgMemberEmailAliasesQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type OrgMemberEmailAliasesQuery = { __typename?: 'Query', orgMemberEmailAliases: Array<string> };

export type CurrentUserDefaultEmailAliasQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserDefaultEmailAliasQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, defaultEmailAlias?: string | null } | null };

export type OrgMemberDefaultEmailAliasQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
}>;


export type OrgMemberDefaultEmailAliasQuery = { __typename?: 'Query', orgMemberDefaultEmailAlias?: string | null };

export type GetUserPreferencesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserPreferencesQuery = { __typename?: 'Query', userPreferences?: { __typename?: 'UserPreferences', autoAdvance?: boolean | null, advanceToNext?: boolean | null, theme?: string | null, dateFormat?: string | null, hourFormat?: string | null, showPageIcon?: boolean | null, defaultCalendarColor?: string | null, defaultCalendarView?: Types.CalendarView | null, defaultCalendarViewMobile?: Types.CalendarView | null, startDayOfTheWeek?: number | null, leftSwipeGesture?: Types.SwipeSetting | null, rightSwipeGesture?: Types.SwipeSetting | null, blockRemoteContent?: boolean | null, securedBySkiffSigDisabled?: boolean | null, showAliasInboxes?: boolean | null, fileTableFormat?: Types.FileTableDisplayFormat | null, threadFormat?: Types.ThreadDisplayFormat | null, hideActivationChecklist?: boolean | null, tableOfContents?: Types.TableOfContentsSetting | null } | null };

export type CanDirectlyUpdateSrpQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CanDirectlyUpdateSrpQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, canDirectlyUpdateSrp?: boolean | null } | null };

export type BrowserPushNotificationsEnabledQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type BrowserPushNotificationsEnabledQuery = { __typename?: 'Query', browserPushNotificationsEnabled: boolean };

export type SpamListsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SpamListsQuery = { __typename?: 'Query', blockedUsers: Array<string>, spamUsers: Array<string>, allowedUsers: Array<string> };

export type CurrentUserSubscribedToPdQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserSubscribedToPdQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, subscribedToPD?: boolean | null } | null };

export type UsersFromEmailAliasQueryVariables = Types.Exact<{
  emailAliases: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type UsersFromEmailAliasQuery = { __typename?: 'Query', usersFromEmailAlias: Array<{ __typename?: 'User', userID: string, username: string, publicKey: { key: string, signature?: string }, publicData: { __typename?: 'PublicData', displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } | null> };

export type UsersFromEmailAliasWithCatchallQueryVariables = Types.Exact<{
  emailAliases: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type UsersFromEmailAliasWithCatchallQuery = { __typename?: 'Query', usersFromEmailAliasWithCatchall: Array<{ __typename?: 'User', userID: string, publicKey: { key: string, signature?: string } } | null> };

export type GetUserProfileOrgDataQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserProfileOrgDataQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, username: string, publicKey: { key: string, signature?: string }, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null }, rootOrganization: { __typename?: 'Organization', orgID: string, name: string, displayPictureData: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } } } | null };

export type GetCurrentUserEmailAliasesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserEmailAliasesQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, emailAliases?: Array<string> | null } | null };

export type GetUserEmailAndWalletQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserEmailAndWalletQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, recoveryEmail?: string | null, unverifiedRecoveryEmail?: string | null, walletAddress?: string | null, rootOrgID?: string | null } | null };

export type SubscribeNotificationMutationVariables = Types.Exact<{
  request: Types.SubscribeNotificationRequest;
}>;


export type SubscribeNotificationMutation = { __typename?: 'Mutation', subscribeNotification?: any | null };

export type UnsubscribeNotificationMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UnsubscribeNotificationMutation = { __typename?: 'Mutation', unsubscribeNotification?: any | null };

export type GetUserSignatureQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserSignatureQuery = { __typename?: 'Query', userSignature?: { __typename?: 'UserSignatureOutput', userSignature: { __typename?: 'EncryptedDataOutput', encryptedData: string }, sessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedBy: { key: string, signature?: string }, encryptedSessionKey: string } } | null };

export type GetUserCustomDomainSubscriptionsInfoQueryVariables = Types.Exact<{
  request: Types.GetUserRequest;
}>;


export type GetUserCustomDomainSubscriptionsInfoQuery = { __typename?: 'Query', user?: { __typename?: 'User', userID: string, customDomainSubscriptionsInfo?: Array<{ __typename?: 'CustomDomainSubscriptionInfo', domainID: string, cancelAtPeriodEnd: boolean, supposedEndDate: Date }> | null } | null };

export type GetUserPaidUpStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserPaidUpStatusQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, paidUpStatus?: { __typename?: 'PaidUpStatus', paidUp: boolean, downgradeProgress: { __typename?: 'DowngradeProgress', currentStorageInMb: number, customDomains: number, emailAliases: number, shortAliases: number, workspaceUsers: number, userLabels: number, userFolders: number, userMailFilters: number, quickAliases: number, quickAliasSubdomains: number } } | null } | null };

export type CreateUploadContactAvatarLinkMutationVariables = Types.Exact<{
  request: Types.CreateUploadContactAvatarLinkRequest;
}>;


export type CreateUploadContactAvatarLinkMutation = { __typename?: 'Mutation', createUploadContactAvatarLink: { __typename?: 'CreateUploadAvatarLinkResponse', writeUrl: string, profileCustomURI: string } };

export type CreateUploadAliasAvatarLinkMutationVariables = Types.Exact<{
  emailAlias: Types.Scalars['String'];
}>;


export type CreateUploadAliasAvatarLinkMutation = { __typename?: 'Mutation', createUploadAliasAvatarLink: { __typename?: 'CreateUploadAvatarLinkResponse', writeUrl: string, profileCustomURI: string } };

export type UpdateUploadContactAvatarLinkMutationVariables = Types.Exact<{
  request: Types.UpdateUploadContactAvatarLinkRequest;
}>;


export type UpdateUploadContactAvatarLinkMutation = { __typename?: 'Mutation', updateUploadContactAvatarLink: { __typename?: 'UpdateUploadContactAvatarLinkResponse', newProfileCustomURI: string } };

export type CreateOrgUploadAvatarLinkMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateOrgUploadAvatarLinkMutation = { __typename?: 'Mutation', createOrgUploadAvatarLink: { __typename?: 'CreateUploadAvatarLinkResponse', writeUrl: string, profileCustomURI: string } };

export type SetUserSignatureMutationVariables = Types.Exact<{
  request: Types.SetUserSignatureRequest;
}>;


export type SetUserSignatureMutation = { __typename?: 'Mutation', setUserSignature?: any | null };

export type DeleteUserSignatureMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type DeleteUserSignatureMutation = { __typename?: 'Mutation', deleteUserSignature?: any | null };

export type GetAutoReplyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAutoReplyQuery = { __typename?: 'Query', autoReply?: { __typename?: 'AutoReplyOutput', encryptedSubject: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedText: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedTextAsHtml: { __typename?: 'EncryptedDataOutput', encryptedData: string }, encryptedSessionKey: { __typename?: 'EncryptedSessionKeyOutput', encryptedBy: { key: string, signature?: string }, encryptedSessionKey: string } } | null };

export type SetAutoReplyMutationVariables = Types.Exact<{
  request: Types.SetAutoReplyRequest;
}>;


export type SetAutoReplyMutation = { __typename?: 'Mutation', setAutoReply?: any | null };

export type DeleteAutoReplyMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type DeleteAutoReplyMutation = { __typename?: 'Mutation', deleteAutoReply?: any | null };

export type AddExternalEmailMutationVariables = Types.Exact<{
  request: Types.AddEmailRequest;
}>;


export type AddExternalEmailMutation = { __typename?: 'Mutation', addEmail: { __typename?: 'AddEmailResponse', status: Types.RequestStatus } };

export type SetUserPreferencesMutationVariables = Types.Exact<{
  request: Types.SetUserPreferencesRequest;
}>;


export type SetUserPreferencesMutation = { __typename?: 'Mutation', setUserPreferences?: { __typename?: 'UserPreferences', autoAdvance?: boolean | null, advanceToNext?: boolean | null, theme?: string | null, dateFormat?: string | null, hourFormat?: string | null, showPageIcon?: boolean | null, defaultCalendarColor?: string | null, defaultCalendarView?: Types.CalendarView | null, defaultCalendarViewMobile?: Types.CalendarView | null, startDayOfTheWeek?: number | null, leftSwipeGesture?: Types.SwipeSetting | null, rightSwipeGesture?: Types.SwipeSetting | null, blockRemoteContent?: boolean | null, securedBySkiffSigDisabled?: boolean | null, showAliasInboxes?: boolean | null, fileTableFormat?: Types.FileTableDisplayFormat | null, threadFormat?: Types.ThreadDisplayFormat | null, hideActivationChecklist?: boolean | null, tableOfContents?: Types.TableOfContentsSetting | null } | null };

export type SetContactAutosyncSettingMutationVariables = Types.Exact<{
  request: Types.Scalars['Boolean'];
}>;


export type SetContactAutosyncSettingMutation = { __typename?: 'Mutation', setAutoSyncContactsSetting?: any | null };

export type GetContactAutoSyncSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetContactAutoSyncSettingsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, autoSyncContactsSetting?: boolean | null } | null };

export type GetUserQuickAliasDomainsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserQuickAliasDomainsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, anonymousSubdomains?: Array<{ __typename?: 'AnonymousSubdomain', domain: string, domainID: string }> | null } | null };

export type GetNumUserDeactivatedQuickAliasDomainsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetNumUserDeactivatedQuickAliasDomainsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, numDeactivatedAnonymousSubdomains?: number | null } | null };

export type GetUserQuickAliasesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserQuickAliasesQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, quickAliases?: Array<{ __typename?: 'QuickAlias', alias: string, isSendingAndReceivingEnabled: boolean }> | null } | null };

export type GetCurrentUserAllOrgDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserAllOrgDataQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', userID: string, username: string, rootOrganization: { __typename?: 'Organization', orgID: string, name: string, rootDocID: string, hasCustomized: boolean, teams: Array<{ __typename?: 'Team', accessLevel?: Types.TeamAccess | null, teamID: string, name: string, icon: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, permissionProxies: Array<{ __typename?: 'DocumentPermissionProxy', sourceDocID: string, sourceTeam: { __typename?: 'Team', teamID: string, name: string, icon: string } }> } | null }>, everyoneTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', createdAt?: Date | null, docID: string, documentType: Types.NwContentType, publicHierarchicalKey?: string | null, decryptedSessionKey: string, decryptedPrivateHierarchicalKey?: string | null, currentUserPermissionLevel: Types.PermissionLevel, parentID?: string | null, hasChildren: boolean, trashedAt?: string | null, previousParentID?: string | null, metadata: { __typename?: 'EncryptedMetadataOutput', signedBy: string, encryptedMetadata: string, signature: string }, decryptedMetadata: { __typename?: 'DocumentDecryptedMetadata', title: string, icon?: string | null, color?: string | null, description?: string | null, timeLastModified?: Date | null, fileSizeBytes?: number | null, mimeType?: string | null }, hierarchicalPermissionChain: Array<{ __typename?: 'HierarchicalPermissionChainLink', docID: string, previousLinkDocID?: string | null, keysClaim?: string | null, keysClaimEncryptedByKey?: string | null, encryptedSessionKey?: string | null, encryptedSessionKeyEncryptedByKey?: string | null, permission?: { __typename?: 'PermissionEntry', userID: string, expiryDate?: Date | null, encryptedBy: { key: string, signature?: string }, encryptedKey?: string | null, encryptedPrivateHierarchicalKey?: string | null } | null }>, invites: Array<{ __typename?: 'PendingUserInvite', docID: string, email: string, permissionLevel: Types.PermissionLevel }>, collaborators: Array<{ __typename?: 'DocumentCollaborator', permissionLevel: Types.PermissionLevel, expiryDate?: Date | null, sourceDocID: string, user: { __typename?: 'User', userID: string, username: string, publicData: { __typename?: 'PublicData', displayName?: string | null, displayPictureData?: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } | null } } }> } | null }, personalTeam: { __typename?: 'Team', teamID: string, rootDocument?: { __typename?: 'Document', docID: string } | null }, displayPictureData: { __typename?: 'DisplayPictureData', profileAccentColor?: string | null, profileCustomURI?: string | null, profileIcon?: string | null } } } | null };

export const DnsRecordDataFragmentDoc = /*#__PURE__*/ gql`
    fragment DNSRecordData on DNSRecord {
  name
  type
  data
  error {
    errorData {
      retrievedRecord {
        priority
        data
      }
    }
    errorType
  }
}
    `;
export const AddressFragmentDoc = /*#__PURE__*/ gql`
    fragment Address on AddressObject {
  name
  address
  blocked
}
    `;
export const EmailWithoutContentFragmentDoc = /*#__PURE__*/ gql`
    fragment EmailWithoutContent on Email {
  id
  attachmentMetadata {
    attachmentID
  }
  createdAt
  from {
    ...Address
  }
  to {
    ...Address
  }
  cc {
    ...Address
  }
  bcc {
    ...Address
  }
  replyTo {
    ...Address
  }
  encryptedSessionKey {
    encryptedSessionKey
    encryptedBy
  }
  encryptedSubject {
    encryptedData
  }
  encryptedTextSnippet {
    encryptedData
  }
  attachmentMetadata {
    attachmentID
    encryptedData {
      encryptedData
    }
  }
  scheduleSendAt
  encryptedRawMimeUrl
  decryptedSessionKey @client
  decryptedSubject @client
  decryptedTextSnippet @client
  decryptedAttachmentMetadata @client {
    attachmentID
    decryptedMetadata {
      contentType
      contentDisposition
      filename
      checksum
      size
      contentId
    }
  }
  notificationsTurnedOffForSender
}
    ${AddressFragmentDoc}`;
export const ThreadWithoutContentFragmentDoc = /*#__PURE__*/ gql`
    fragment ThreadWithoutContent on UserThread {
  threadID
  attributes {
    read
    systemLabels
    userLabels {
      labelID
      color
      labelName
      variant
    }
  }
  emails {
    ...EmailWithoutContent
  }
  emailsUpdatedAt
  sentLabelUpdatedAt
  deletedAt
}
    ${EmailWithoutContentFragmentDoc}`;
export const EmailFragmentDoc = /*#__PURE__*/ gql`
    fragment Email on Email {
  id
  attachmentMetadata {
    attachmentID
  }
  createdAt
  from {
    ...Address
  }
  to {
    ...Address
  }
  cc {
    ...Address
  }
  bcc {
    ...Address
  }
  replyTo {
    ...Address
  }
  encryptedSessionKey {
    encryptedSessionKey
    encryptedBy
  }
  encryptedSubject {
    encryptedData
  }
  encryptedText {
    encryptedData
  }
  encryptedHtml {
    encryptedData
  }
  encryptedTextAsHtml {
    encryptedData
  }
  encryptedTextSnippet {
    encryptedData
  }
  attachmentMetadata {
    attachmentID
    encryptedData {
      encryptedData
    }
  }
  scheduleSendAt
  encryptedRawMimeUrl
  decryptedSessionKey @client
  decryptedSubject @client
  decryptedText @client
  decryptedHtml @client
  decryptedTextAsHtml @client
  decryptedTextSnippet @client
  decryptedAttachmentMetadata @client {
    attachmentID
    decryptedMetadata {
      contentType
      contentDisposition
      filename
      checksum
      size
      contentId
    }
  }
  notificationsTurnedOffForSender
}
    ${AddressFragmentDoc}`;
export const ThreadFragmentDoc = /*#__PURE__*/ gql`
    fragment Thread on UserThread {
  threadID
  attributes {
    read
    systemLabels
    userLabels {
      labelID
      color
      labelName
      variant
    }
  }
  emails {
    ...Email
  }
  emailsUpdatedAt
  sentLabelUpdatedAt
  deletedAt
  senderToSilence
  senderToSilenceMessageCounter
  senderToSilenceTotalBytes
  threadContentUpdatedAt
}
    ${EmailFragmentDoc}`;
export const MobileThreadFragmentDoc = /*#__PURE__*/ gql`
    fragment MobileThread on UserThread {
  threadID
  attributes {
    read
    systemLabels
    userLabels {
      labelID
      color
      labelName
      variant
    }
    clientsideFiltersApplied
  }
  emails {
    ...Email
  }
  emailsUpdatedAt
  sentLabelUpdatedAt
  updatedAt
  deletedAt
  permanentlyDeleted
}
    ${EmailFragmentDoc}`;
export const SlimThreadFragmentDoc = /*#__PURE__*/ gql`
    fragment SlimThread on SlimUserThread {
  threadID
  attributes {
    read
    systemLabels
    userLabels {
      labelID
      color
      labelName
      variant
    }
  }
  emailsUpdatedAt
  sentLabelUpdatedAt
  updatedAt
  deletedAt
  permanentlyDeleted
}
    `;
export const SlimThreadWithoutLabelsFragmentDoc = /*#__PURE__*/ gql`
    fragment SlimThreadWithoutLabels on SlimUserThread {
  threadID
  attributes {
    read
    systemLabels
    userLabels {
      labelID
    }
  }
  emailsUpdatedAt
  sentLabelUpdatedAt
  updatedAt
  deletedAt
  permanentlyDeleted
}
    `;
export const AttachmentFragmentDoc = /*#__PURE__*/ gql`
    fragment Attachment on Attachment {
  attachmentID
  downloadLink
  encryptedSessionKey {
    encryptedSessionKey
    encryptedBy
  }
  decryptedSessionKey @client
}
    `;
export const DocumentPublicInfoFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentPublicInfo on Document {
  publicOrgData {
    orgID
    name
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
  }
}
    `;
export const DocumentPermissionInfoFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentPermissionInfo on PermissionEntry {
  userID
  expiryDate
  encryptedBy
  encryptedKey
  encryptedPrivateHierarchicalKey
}
    `;
export const DocumentHierarchicalPermissionChainInfoFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentHierarchicalPermissionChainInfo on HierarchicalPermissionChainLink {
  docID
  previousLinkDocID
  keysClaim
  keysClaimEncryptedByKey
  permission {
    ...DocumentPermissionInfo
  }
  encryptedSessionKey
  encryptedSessionKeyEncryptedByKey
}
    ${DocumentPermissionInfoFragmentDoc}`;
export const DocumentBasicInfoWithoutTeamOrOrgFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentBasicInfoWithoutTeamOrOrg on Document {
  docID
  documentType
  publicHierarchicalKey
  decryptedSessionKey @client
  decryptedPrivateHierarchicalKey @client
  currentUserPermissionLevel
  hierarchicalPermissionChain {
    ...DocumentHierarchicalPermissionChainInfo
  }
  parentID
  hasChildren
  trashedAt
  previousParentID
}
    ${DocumentHierarchicalPermissionChainInfoFragmentDoc}`;
export const DocumentBasicInfoFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentBasicInfo on Document {
  ...DocumentBasicInfoWithoutTeamOrOrg
  team {
    teamID
    name
    icon
    accessLevel
    rootDocument {
      docID
    }
    organization {
      orgID
    }
  }
  cloneDocID
}
    ${DocumentBasicInfoWithoutTeamOrOrgFragmentDoc}`;
export const DocumentDecryptedMetadataFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentDecryptedMetadata on Document {
  createdAt
  metadata {
    signedBy
    encryptedMetadata
    signature
  }
  decryptedMetadata @client {
    title
    icon
    color
    description
    timeLastModified
    fileSizeBytes
    mimeType
  }
}
    `;
export const DocumentParentsBreadcrumbFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentParentsBreadcrumb on Document {
  parentsBreadcrumb {
    docID
  }
}
    `;
export const DocumentBaseFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentBase on Document {
  ...DocumentBasicInfo
  ...DocumentDecryptedMetadata
  ...DocumentParentsBreadcrumb
  updatedAt
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}
${DocumentParentsBreadcrumbFragmentDoc}`;
export const DocumentParentsFullBreadcrumbFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentParentsFullBreadcrumb on Document {
  parentsBreadcrumb {
    ...DocumentBasicInfo
    ...DocumentDecryptedMetadata
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}`;
export const DocumentTeamFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentTeam on Document {
  team {
    teamID
    name
    icon
    accessLevel
    rootDocument {
      docID
    }
    organization {
      orgID
    }
  }
}
    `;
export const DocumentContentsFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentContents on Document {
  updatedAt
  contents {
    contentsArr {
      content
      signedBy
      signature
      chunkNumber
    }
  }
  decryptedContents @client {
    contentsArr {
      chunkNumber
      chunkData
    }
  }
}
    `;
export const DocumentNativeInfoFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentNativeInfo on Document {
  ...DocumentBasicInfoWithoutTeamOrOrg
  ...DocumentTeam
  ...DocumentContents
  ...DocumentDecryptedMetadata
  team {
    personal
  }
  updatedAt
  thumbnail
}
    ${DocumentBasicInfoWithoutTeamOrOrgFragmentDoc}
${DocumentTeamFragmentDoc}
${DocumentContentsFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}`;
export const DocumentCurrentlyEditingUsersFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentCurrentlyEditingUsers on Document {
  docID
  currentlyEditingUsers @client {
    name
    userID
    color
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
  }
}
    `;
export const DocumentLinkFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentLink on Document {
  link {
    encryptedLinkKey
    permissionLevel
    salt
    decryptedLinkKey @client
  }
}
    `;
export const DocumentInvitesFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentInvites on Document {
  invites {
    docID
    email
    permissionLevel
  }
}
    `;
export const UserProfileDataFragmentDoc = /*#__PURE__*/ gql`
    fragment UserProfileData on User {
  userID
  username
  publicData {
    displayName
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
  }
}
    `;
export const DocumentCollaboratorInfoFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentCollaboratorInfo on DocumentCollaborator {
  user {
    ...UserProfileData
  }
  permissionLevel
  expiryDate
  sourceDocID
}
    ${UserProfileDataFragmentDoc}`;
export const DocumentCollaboratorsFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentCollaborators on Document {
  collaborators {
    ...DocumentCollaboratorInfo
  }
}
    ${DocumentCollaboratorInfoFragmentDoc}`;
export const DocumentFullInfoFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentFullInfo on Document {
  ...DocumentBasicInfo
  ...DocumentDecryptedMetadata
  ...DocumentContents
  ...DocumentCurrentlyEditingUsers
  ...DocumentLink
  ...DocumentInvites
  ...DocumentTeam
  ...DocumentParentsBreadcrumb
  ...DocumentCollaborators
  parentKeysClaim
  parentPublicHierarchicalKey
  thumbnail
  decryptedThumbnail @client
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}
${DocumentContentsFragmentDoc}
${DocumentCurrentlyEditingUsersFragmentDoc}
${DocumentLinkFragmentDoc}
${DocumentInvitesFragmentDoc}
${DocumentTeamFragmentDoc}
${DocumentParentsBreadcrumbFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export const TemplateDataFragmentDoc = /*#__PURE__*/ gql`
    fragment TemplateData on Template {
  templateID
  group
  contents {
    pmDoc
  }
  metadata {
    title
    icon
    color
    description
  }
  parentID
}
    `;
export const DocumentPermissionProxiesFragmentDoc = /*#__PURE__*/ gql`
    fragment DocumentPermissionProxies on Document {
  permissionProxies {
    sourceDocID
    sourceTeam {
      teamID
      name
      icon
    }
  }
}
    `;
export const OrganizationFullInfoFragmentDoc = /*#__PURE__*/ gql`
    fragment OrganizationFullInfo on Organization {
  orgID
  name
  teams {
    accessLevel
    teamID
    name
    icon
    rootDocument {
      ...DocumentDecryptedMetadata
      ...DocumentBasicInfoWithoutTeamOrOrg
      ...DocumentPermissionProxies
    }
  }
  everyoneTeam {
    teamID
    rootDocument {
      ...DocumentDecryptedMetadata
      ...DocumentBasicInfoWithoutTeamOrOrg
      ...DocumentInvites
      ...DocumentCollaborators
    }
  }
  personalTeam {
    teamID
    rootDocument {
      docID
    }
  }
  displayPictureData {
    profileAccentColor
    profileCustomURI
    profileIcon
  }
  rootDocID
  hasCustomized
}
    ${DocumentDecryptedMetadataFragmentDoc}
${DocumentBasicInfoWithoutTeamOrOrgFragmentDoc}
${DocumentPermissionProxiesFragmentDoc}
${DocumentInvitesFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export const UserProfileOrgDataFragmentDoc = /*#__PURE__*/ gql`
    fragment UserProfileOrgData on User {
  userID
  username
  publicData {
    displayName
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
  }
  publicKey
  rootOrganization {
    orgID
    name
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
  }
}
    `;
export const UserOrgPersonalTeamDataFragmentDoc = /*#__PURE__*/ gql`
    fragment UserOrgPersonalTeamData on User {
  userID
  rootOrganization {
    orgID
    rootDocID
    personalTeam {
      teamID
      rootDocument {
        docID
      }
    }
  }
}
    `;
export const UserOrgEveryoneTeamDataFragmentDoc = /*#__PURE__*/ gql`
    fragment UserOrgEveryoneTeamData on User {
  userID
  rootOrganization {
    orgID
    rootDocID
    everyoneTeam {
      teamID
      rootDocument {
        ...DocumentDecryptedMetadata
        ...DocumentBasicInfoWithoutTeamOrOrg
        ...DocumentInvites
        ...DocumentCollaborators
      }
    }
  }
}
    ${DocumentDecryptedMetadataFragmentDoc}
${DocumentBasicInfoWithoutTeamOrOrgFragmentDoc}
${DocumentInvitesFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export const UserProfileDataWithKeysFragmentDoc = /*#__PURE__*/ gql`
    fragment UserProfileDataWithKeys on User {
  ...UserProfileData
  publicKey
  signingPublicKey
}
    ${UserProfileDataFragmentDoc}`;
export const UserWithEmailAliasesFragmentDoc = /*#__PURE__*/ gql`
    fragment UserWithEmailAliases on User {
  userID
  emailAliases
}
    `;
export const UserWithMailStorageUsedFragmentDoc = /*#__PURE__*/ gql`
    fragment UserWithMailStorageUsed on User {
  userID
  skemailStorageUsage {
    attachmentUsageBytes
    messageUsageBytes
  }
}
    `;
export const ContactDataFragmentDoc = /*#__PURE__*/ gql`
    fragment ContactData on Contact {
  contactID
  emailAddress
  firstName
  lastName
  displayPictureData {
    profileAccentColor
    profileCustomURI
    profileIcon
  }
}
    `;
export const UserPreferencesDataFragmentDoc = /*#__PURE__*/ gql`
    fragment UserPreferencesData on UserPreferences {
  autoAdvance
  advanceToNext
  theme
  dateFormat
  hourFormat
  showPageIcon
  defaultCalendarColor
  defaultCalendarView
  defaultCalendarViewMobile
  startDayOfTheWeek
  leftSwipeGesture
  rightSwipeGesture
  blockRemoteContent
  securedBySkiffSigDisabled
  showAliasInboxes
  fileTableFormat
  threadFormat
  hideActivationChecklist
  tableOfContents
}
    `;
export const UserPreferencesFragmentFragmentDoc = /*#__PURE__*/ gql`
    fragment UserPreferencesFragment on User {
  userID
  userPreferences {
    ...UserPreferencesData
  }
}
    ${UserPreferencesDataFragmentDoc}`;
export const ExternalEmailClientLabelFragmentDoc = /*#__PURE__*/ gql`
    fragment ExternalEmailClientLabel on ExternalEmailClientLabel {
  labelID
  labelName
  ... on ExternalEmailClientSystemLabel {
    skiffSystemLabel
  }
  ... on ExternalEmailClientUserLabel {
    skiffUserLabel {
      labelID
      labelName
      color
      variant
    }
  }
}
    `;
export const CreateSrpResponseDataFragmentDoc = /*#__PURE__*/ gql`
    fragment CreateSrpResponseData on CreateSrpResponse {
  userID
  status
  jwt
  cacheKey
  recoveryEmail
  walletAddress
  rootOrgID
  createdMailAccount
}
    `;
export const LoginSrpResponseDataFragmentDoc = /*#__PURE__*/ gql`
    fragment LoginSrpResponseData on LoginSrpResponse {
  userID
  status
  serverSessionProof
  publicKey
  signingPublicKey
  encryptedUserData
  encryptedDocumentData
  jwt
  cacheKey
  encryptedMetamaskSecret
  publicData {
    displayName
  }
  recoveryEmail
  unverifiedRecoveryEmail
  walletAddress
  rootOrgID
  webAuthnChallengeResponse {
    options
  }
  mfaTypes
}
    `;
export const GetAllCurrentUserContactsDocument = /*#__PURE__*/ gql`
    query getAllCurrentUserContacts {
  allContacts {
    contactID
    emailAddress
    firstName
    lastName
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
    encryptedByKey
    encryptedSessionKey
    encryptedContactData
    decryptedSessionKey @client
    decryptedData @client {
      decryptedPhoneNumbers {
        value
        label
      }
      decryptedNotes
      decryptedBirthday
      decryptedCompany
      decryptedJobTitle
      decryptedAddresses {
        value
        label
      }
      decryptedNickname
      decryptedURL
    }
  }
}
    `;

/**
 * __useGetAllCurrentUserContactsQuery__
 *
 * To run a query within a React component, call `useGetAllCurrentUserContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCurrentUserContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCurrentUserContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCurrentUserContactsQuery(baseOptions?: Apollo.useQuery.Options<GetAllCurrentUserContactsQuery, GetAllCurrentUserContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCurrentUserContactsQuery, GetAllCurrentUserContactsQueryVariables>(GetAllCurrentUserContactsDocument, options);
      }
export function useGetAllCurrentUserContactsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAllCurrentUserContactsQuery, GetAllCurrentUserContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCurrentUserContactsQuery, GetAllCurrentUserContactsQueryVariables>(GetAllCurrentUserContactsDocument, options);
        }
export type GetAllCurrentUserContactsQueryHookResult = ReturnType<typeof useGetAllCurrentUserContactsQuery>;
export type GetAllCurrentUserContactsLazyQueryHookResult = ReturnType<typeof useGetAllCurrentUserContactsLazyQuery>;
export type GetAllCurrentUserContactsQueryResult = Apollo.useQuery.Result<GetAllCurrentUserContactsQuery, GetAllCurrentUserContactsQueryVariables>;
export const GetAllCurrentUserContactsNativeDocument = /*#__PURE__*/ gql`
    query getAllCurrentUserContactsNative {
  allContacts {
    contactID
    emailAddress
    firstName
    lastName
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
  }
}
    `;

/**
 * __useGetAllCurrentUserContactsNativeQuery__
 *
 * To run a query within a React component, call `useGetAllCurrentUserContactsNativeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCurrentUserContactsNativeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCurrentUserContactsNativeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCurrentUserContactsNativeQuery(baseOptions?: Apollo.useQuery.Options<GetAllCurrentUserContactsNativeQuery, GetAllCurrentUserContactsNativeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCurrentUserContactsNativeQuery, GetAllCurrentUserContactsNativeQueryVariables>(GetAllCurrentUserContactsNativeDocument, options);
      }
export function useGetAllCurrentUserContactsNativeLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAllCurrentUserContactsNativeQuery, GetAllCurrentUserContactsNativeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCurrentUserContactsNativeQuery, GetAllCurrentUserContactsNativeQueryVariables>(GetAllCurrentUserContactsNativeDocument, options);
        }
export type GetAllCurrentUserContactsNativeQueryHookResult = ReturnType<typeof useGetAllCurrentUserContactsNativeQuery>;
export type GetAllCurrentUserContactsNativeLazyQueryHookResult = ReturnType<typeof useGetAllCurrentUserContactsNativeLazyQuery>;
export type GetAllCurrentUserContactsNativeQueryResult = Apollo.useQuery.Result<GetAllCurrentUserContactsNativeQuery, GetAllCurrentUserContactsNativeQueryVariables>;
export const GetContactsDocument = /*#__PURE__*/ gql`
    query getContacts($request: GetContactsRequest!) {
  contacts(request: $request) {
    contactID
    emailAddress
    firstName
    lastName
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
    encryptedByKey
    encryptedSessionKey
    encryptedContactData
    decryptedSessionKey @client
    decryptedData @client {
      decryptedPhoneNumbers {
        value
        label
      }
      decryptedNotes
      decryptedBirthday
      decryptedCompany
      decryptedJobTitle
      decryptedAddresses {
        value
        label
      }
      decryptedNickname
      decryptedURL
    }
  }
}
    `;

/**
 * __useGetContactsQuery__
 *
 * To run a query within a React component, call `useGetContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetContactsQuery(baseOptions: Apollo.useQuery.Options<GetContactsQuery, GetContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactsQuery, GetContactsQueryVariables>(GetContactsDocument, options);
      }
export function useGetContactsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetContactsQuery, GetContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactsQuery, GetContactsQueryVariables>(GetContactsDocument, options);
        }
export type GetContactsQueryHookResult = ReturnType<typeof useGetContactsQuery>;
export type GetContactsLazyQueryHookResult = ReturnType<typeof useGetContactsLazyQuery>;
export type GetContactsQueryResult = Apollo.useQuery.Result<GetContactsQuery, GetContactsQueryVariables>;
export const GetDefaultProfilePictureDocument = /*#__PURE__*/ gql`
    query getDefaultProfilePicture($request: GetDefaultProfilePictureRequest!) {
  defaultProfilePicture(request: $request) {
    profilePictureData
  }
}
    `;

/**
 * __useGetDefaultProfilePictureQuery__
 *
 * To run a query within a React component, call `useGetDefaultProfilePictureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDefaultProfilePictureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDefaultProfilePictureQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetDefaultProfilePictureQuery(baseOptions: Apollo.useQuery.Options<GetDefaultProfilePictureQuery, GetDefaultProfilePictureQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDefaultProfilePictureQuery, GetDefaultProfilePictureQueryVariables>(GetDefaultProfilePictureDocument, options);
      }
export function useGetDefaultProfilePictureLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDefaultProfilePictureQuery, GetDefaultProfilePictureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDefaultProfilePictureQuery, GetDefaultProfilePictureQueryVariables>(GetDefaultProfilePictureDocument, options);
        }
export type GetDefaultProfilePictureQueryHookResult = ReturnType<typeof useGetDefaultProfilePictureQuery>;
export type GetDefaultProfilePictureLazyQueryHookResult = ReturnType<typeof useGetDefaultProfilePictureLazyQuery>;
export type GetDefaultProfilePictureQueryResult = Apollo.useQuery.Result<GetDefaultProfilePictureQuery, GetDefaultProfilePictureQueryVariables>;
export const CreateOrUpdateContactDocument = /*#__PURE__*/ gql`
    mutation createOrUpdateContact($request: CreateOrUpdateContactRequest!) {
  createOrUpdateContact(request: $request)
}
    `;
export type CreateOrUpdateContactMutationFn = Apollo.useMutation.MutationFunction<CreateOrUpdateContactMutation, CreateOrUpdateContactMutationVariables>;

/**
 * __useCreateOrUpdateContactMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateContactMutation, { data, loading, error }] = useCreateOrUpdateContactMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateOrUpdateContactMutation(baseOptions?: Apollo.useMutation.Options<CreateOrUpdateContactMutation, CreateOrUpdateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateContactMutation, CreateOrUpdateContactMutationVariables>(CreateOrUpdateContactDocument, options);
      }
export type CreateOrUpdateContactMutationHookResult = ReturnType<typeof useCreateOrUpdateContactMutation>;
export type CreateOrUpdateContactMutationResult = Apollo.useMutation.Result<CreateOrUpdateContactMutation>;
export type CreateOrUpdateContactMutationOptions = Apollo.useMutation.Options<CreateOrUpdateContactMutation, CreateOrUpdateContactMutationVariables>;
export const DeleteContactDocument = /*#__PURE__*/ gql`
    mutation deleteContact($request: DeleteContactRequest!) {
  deleteContact(request: $request)
}
    `;
export type DeleteContactMutationFn = Apollo.useMutation.MutationFunction<DeleteContactMutation, DeleteContactMutationVariables>;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteContactMutation(baseOptions?: Apollo.useMutation.Options<DeleteContactMutation, DeleteContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, options);
      }
export type DeleteContactMutationHookResult = ReturnType<typeof useDeleteContactMutation>;
export type DeleteContactMutationResult = Apollo.useMutation.Result<DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.useMutation.Options<DeleteContactMutation, DeleteContactMutationVariables>;
export const DeleteContactsDocument = /*#__PURE__*/ gql`
    mutation deleteContacts($request: DeleteContactsRequest!) {
  deleteContacts(request: $request)
}
    `;
export type DeleteContactsMutationFn = Apollo.useMutation.MutationFunction<DeleteContactsMutation, DeleteContactsMutationVariables>;

/**
 * __useDeleteContactsMutation__
 *
 * To run a mutation, you first call `useDeleteContactsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactsMutation, { data, loading, error }] = useDeleteContactsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteContactsMutation(baseOptions?: Apollo.useMutation.Options<DeleteContactsMutation, DeleteContactsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContactsMutation, DeleteContactsMutationVariables>(DeleteContactsDocument, options);
      }
export type DeleteContactsMutationHookResult = ReturnType<typeof useDeleteContactsMutation>;
export type DeleteContactsMutationResult = Apollo.useMutation.Result<DeleteContactsMutation>;
export type DeleteContactsMutationOptions = Apollo.useMutation.Options<DeleteContactsMutation, DeleteContactsMutationVariables>;
export const GetCreditsDocument = /*#__PURE__*/ gql`
    query getCredits($request: GetCreditsRequest!) {
  credits(request: $request) {
    credits {
      ... on CreditInfoResponse {
        info
        count
        amount {
          cents
          skemailStorageBytes
          editorStorageBytes
        }
      }
    }
  }
}
    `;

/**
 * __useGetCreditsQuery__
 *
 * To run a query within a React component, call `useGetCreditsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreditsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreditsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetCreditsQuery(baseOptions: Apollo.useQuery.Options<GetCreditsQuery, GetCreditsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreditsQuery, GetCreditsQueryVariables>(GetCreditsDocument, options);
      }
export function useGetCreditsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetCreditsQuery, GetCreditsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreditsQuery, GetCreditsQueryVariables>(GetCreditsDocument, options);
        }
export type GetCreditsQueryHookResult = ReturnType<typeof useGetCreditsQuery>;
export type GetCreditsLazyQueryHookResult = ReturnType<typeof useGetCreditsLazyQuery>;
export type GetCreditsQueryResult = Apollo.useQuery.Result<GetCreditsQuery, GetCreditsQueryVariables>;
export const GetLastViewedReferralCreditDocument = /*#__PURE__*/ gql`
    query getLastViewedReferralCredit {
  lastViewedReferralCredit {
    count
    amount {
      cents
      skemailStorageBytes
      editorStorageBytes
    }
  }
}
    `;

/**
 * __useGetLastViewedReferralCreditQuery__
 *
 * To run a query within a React component, call `useGetLastViewedReferralCreditQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastViewedReferralCreditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastViewedReferralCreditQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLastViewedReferralCreditQuery(baseOptions?: Apollo.useQuery.Options<GetLastViewedReferralCreditQuery, GetLastViewedReferralCreditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastViewedReferralCreditQuery, GetLastViewedReferralCreditQueryVariables>(GetLastViewedReferralCreditDocument, options);
      }
export function useGetLastViewedReferralCreditLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetLastViewedReferralCreditQuery, GetLastViewedReferralCreditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastViewedReferralCreditQuery, GetLastViewedReferralCreditQueryVariables>(GetLastViewedReferralCreditDocument, options);
        }
export type GetLastViewedReferralCreditQueryHookResult = ReturnType<typeof useGetLastViewedReferralCreditQuery>;
export type GetLastViewedReferralCreditLazyQueryHookResult = ReturnType<typeof useGetLastViewedReferralCreditLazyQuery>;
export type GetLastViewedReferralCreditQueryResult = Apollo.useQuery.Result<GetLastViewedReferralCreditQuery, GetLastViewedReferralCreditQueryVariables>;
export const SetLastViewedReferralCreditDocument = /*#__PURE__*/ gql`
    mutation setLastViewedReferralCredit($request: SetLastViewedReferralCreditRequest!) {
  setLastViewedReferralCredit(request: $request)
}
    `;
export type SetLastViewedReferralCreditMutationFn = Apollo.useMutation.MutationFunction<SetLastViewedReferralCreditMutation, SetLastViewedReferralCreditMutationVariables>;

/**
 * __useSetLastViewedReferralCreditMutation__
 *
 * To run a mutation, you first call `useSetLastViewedReferralCreditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLastViewedReferralCreditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLastViewedReferralCreditMutation, { data, loading, error }] = useSetLastViewedReferralCreditMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetLastViewedReferralCreditMutation(baseOptions?: Apollo.useMutation.Options<SetLastViewedReferralCreditMutation, SetLastViewedReferralCreditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetLastViewedReferralCreditMutation, SetLastViewedReferralCreditMutationVariables>(SetLastViewedReferralCreditDocument, options);
      }
export type SetLastViewedReferralCreditMutationHookResult = ReturnType<typeof useSetLastViewedReferralCreditMutation>;
export type SetLastViewedReferralCreditMutationResult = Apollo.useMutation.Result<SetLastViewedReferralCreditMutation>;
export type SetLastViewedReferralCreditMutationOptions = Apollo.useMutation.Options<SetLastViewedReferralCreditMutation, SetLastViewedReferralCreditMutationVariables>;
export const GrantCreditsDocument = /*#__PURE__*/ gql`
    mutation grantCredits($request: GrantCreditsRequest!) {
  grantCredits(request: $request) {
    creditsGranted {
      cents
      skemailStorageBytes
      editorStorageBytes
    }
    remainingCreditsToEarnForReason {
      cents
      skemailStorageBytes
      editorStorageBytes
    }
  }
}
    `;
export type GrantCreditsMutationFn = Apollo.useMutation.MutationFunction<GrantCreditsMutation, GrantCreditsMutationVariables>;

/**
 * __useGrantCreditsMutation__
 *
 * To run a mutation, you first call `useGrantCreditsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGrantCreditsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [grantCreditsMutation, { data, loading, error }] = useGrantCreditsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGrantCreditsMutation(baseOptions?: Apollo.useMutation.Options<GrantCreditsMutation, GrantCreditsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GrantCreditsMutation, GrantCreditsMutationVariables>(GrantCreditsDocument, options);
      }
export type GrantCreditsMutationHookResult = ReturnType<typeof useGrantCreditsMutation>;
export type GrantCreditsMutationResult = Apollo.useMutation.Result<GrantCreditsMutation>;
export type GrantCreditsMutationOptions = Apollo.useMutation.Options<GrantCreditsMutation, GrantCreditsMutationVariables>;
export const GetCurrentUserCustomDomainsDocument = /*#__PURE__*/ gql`
    query getCurrentUserCustomDomains {
  getCurrentUserCustomDomains {
    domains {
      domainID
      domain
      skiffManaged
      dnsRecords {
        ...DNSRecordData
      }
      verificationStatus
      createdAt
    }
  }
}
    ${DnsRecordDataFragmentDoc}`;

/**
 * __useGetCurrentUserCustomDomainsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserCustomDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserCustomDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserCustomDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserCustomDomainsQuery(baseOptions?: Apollo.useQuery.Options<GetCurrentUserCustomDomainsQuery, GetCurrentUserCustomDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserCustomDomainsQuery, GetCurrentUserCustomDomainsQueryVariables>(GetCurrentUserCustomDomainsDocument, options);
      }
export function useGetCurrentUserCustomDomainsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetCurrentUserCustomDomainsQuery, GetCurrentUserCustomDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserCustomDomainsQuery, GetCurrentUserCustomDomainsQueryVariables>(GetCurrentUserCustomDomainsDocument, options);
        }
export type GetCurrentUserCustomDomainsQueryHookResult = ReturnType<typeof useGetCurrentUserCustomDomainsQuery>;
export type GetCurrentUserCustomDomainsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserCustomDomainsLazyQuery>;
export type GetCurrentUserCustomDomainsQueryResult = Apollo.useQuery.Result<GetCurrentUserCustomDomainsQuery, GetCurrentUserCustomDomainsQueryVariables>;
export const CheckIfDomainsAvailableDocument = /*#__PURE__*/ gql`
    query checkIfDomainsAvailable($domains: [String!]!) {
  checkIfDomainsAvailable(domains: $domains) {
    domains {
      available
      currency
      domain
      period
      price
    }
  }
}
    `;

/**
 * __useCheckIfDomainsAvailableQuery__
 *
 * To run a query within a React component, call `useCheckIfDomainsAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfDomainsAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfDomainsAvailableQuery({
 *   variables: {
 *      domains: // value for 'domains'
 *   },
 * });
 */
export function useCheckIfDomainsAvailableQuery(baseOptions: Apollo.useQuery.Options<CheckIfDomainsAvailableQuery, CheckIfDomainsAvailableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfDomainsAvailableQuery, CheckIfDomainsAvailableQueryVariables>(CheckIfDomainsAvailableDocument, options);
      }
export function useCheckIfDomainsAvailableLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<CheckIfDomainsAvailableQuery, CheckIfDomainsAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfDomainsAvailableQuery, CheckIfDomainsAvailableQueryVariables>(CheckIfDomainsAvailableDocument, options);
        }
export type CheckIfDomainsAvailableQueryHookResult = ReturnType<typeof useCheckIfDomainsAvailableQuery>;
export type CheckIfDomainsAvailableLazyQueryHookResult = ReturnType<typeof useCheckIfDomainsAvailableLazyQuery>;
export type CheckIfDomainsAvailableQueryResult = Apollo.useQuery.Result<CheckIfDomainsAvailableQuery, CheckIfDomainsAvailableQueryVariables>;
export const GetDomainSuggestionsDocument = /*#__PURE__*/ gql`
    query getDomainSuggestions($domain: String!, $limit: Int) {
  getDomainSuggestions(domain: $domain, limit: $limit) {
    domains
  }
}
    `;

/**
 * __useGetDomainSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetDomainSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainSuggestionsQuery({
 *   variables: {
 *      domain: // value for 'domain'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetDomainSuggestionsQuery(baseOptions: Apollo.useQuery.Options<GetDomainSuggestionsQuery, GetDomainSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDomainSuggestionsQuery, GetDomainSuggestionsQueryVariables>(GetDomainSuggestionsDocument, options);
      }
export function useGetDomainSuggestionsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDomainSuggestionsQuery, GetDomainSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDomainSuggestionsQuery, GetDomainSuggestionsQueryVariables>(GetDomainSuggestionsDocument, options);
        }
export type GetDomainSuggestionsQueryHookResult = ReturnType<typeof useGetDomainSuggestionsQuery>;
export type GetDomainSuggestionsLazyQueryHookResult = ReturnType<typeof useGetDomainSuggestionsLazyQuery>;
export type GetDomainSuggestionsQueryResult = Apollo.useQuery.Result<GetDomainSuggestionsQuery, GetDomainSuggestionsQueryVariables>;
export const GetDomainDetailsDocument = /*#__PURE__*/ gql`
    query getDomainDetails($domain: String!) {
  getDomainDetails(domain: $domain) {
    expiresAt
    renewAuto
    renewalDetails {
      price
    }
  }
}
    `;

/**
 * __useGetDomainDetailsQuery__
 *
 * To run a query within a React component, call `useGetDomainDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDomainDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDomainDetailsQuery({
 *   variables: {
 *      domain: // value for 'domain'
 *   },
 * });
 */
export function useGetDomainDetailsQuery(baseOptions: Apollo.useQuery.Options<GetDomainDetailsQuery, GetDomainDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDomainDetailsQuery, GetDomainDetailsQueryVariables>(GetDomainDetailsDocument, options);
      }
export function useGetDomainDetailsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDomainDetailsQuery, GetDomainDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDomainDetailsQuery, GetDomainDetailsQueryVariables>(GetDomainDetailsDocument, options);
        }
export type GetDomainDetailsQueryHookResult = ReturnType<typeof useGetDomainDetailsQuery>;
export type GetDomainDetailsLazyQueryHookResult = ReturnType<typeof useGetDomainDetailsLazyQuery>;
export type GetDomainDetailsQueryResult = Apollo.useQuery.Result<GetDomainDetailsQuery, GetDomainDetailsQueryVariables>;
export const GenerateCustomDomainRecordsDocument = /*#__PURE__*/ gql`
    mutation generateCustomDomainRecords($request: GenerateCustomDomainRecordsRequest!) {
  generateCustomDomainRecords(request: $request) {
    mxRecords {
      ...DNSRecordData
    }
    spfRecords {
      ...DNSRecordData
    }
    dkimRecords {
      ...DNSRecordData
    }
    dmarcRecord {
      ...DNSRecordData
    }
    domainID
  }
}
    ${DnsRecordDataFragmentDoc}`;
export type GenerateCustomDomainRecordsMutationFn = Apollo.useMutation.MutationFunction<GenerateCustomDomainRecordsMutation, GenerateCustomDomainRecordsMutationVariables>;

/**
 * __useGenerateCustomDomainRecordsMutation__
 *
 * To run a mutation, you first call `useGenerateCustomDomainRecordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateCustomDomainRecordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateCustomDomainRecordsMutation, { data, loading, error }] = useGenerateCustomDomainRecordsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGenerateCustomDomainRecordsMutation(baseOptions?: Apollo.useMutation.Options<GenerateCustomDomainRecordsMutation, GenerateCustomDomainRecordsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateCustomDomainRecordsMutation, GenerateCustomDomainRecordsMutationVariables>(GenerateCustomDomainRecordsDocument, options);
      }
export type GenerateCustomDomainRecordsMutationHookResult = ReturnType<typeof useGenerateCustomDomainRecordsMutation>;
export type GenerateCustomDomainRecordsMutationResult = Apollo.useMutation.Result<GenerateCustomDomainRecordsMutation>;
export type GenerateCustomDomainRecordsMutationOptions = Apollo.useMutation.Options<GenerateCustomDomainRecordsMutation, GenerateCustomDomainRecordsMutationVariables>;
export const SaveCustomDomainRecordsDocument = /*#__PURE__*/ gql`
    mutation saveCustomDomainRecords($request: SaveCustomDomainRequest!) {
  saveCustomDomainRecords(request: $request)
}
    `;
export type SaveCustomDomainRecordsMutationFn = Apollo.useMutation.MutationFunction<SaveCustomDomainRecordsMutation, SaveCustomDomainRecordsMutationVariables>;

/**
 * __useSaveCustomDomainRecordsMutation__
 *
 * To run a mutation, you first call `useSaveCustomDomainRecordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCustomDomainRecordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCustomDomainRecordsMutation, { data, loading, error }] = useSaveCustomDomainRecordsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSaveCustomDomainRecordsMutation(baseOptions?: Apollo.useMutation.Options<SaveCustomDomainRecordsMutation, SaveCustomDomainRecordsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveCustomDomainRecordsMutation, SaveCustomDomainRecordsMutationVariables>(SaveCustomDomainRecordsDocument, options);
      }
export type SaveCustomDomainRecordsMutationHookResult = ReturnType<typeof useSaveCustomDomainRecordsMutation>;
export type SaveCustomDomainRecordsMutationResult = Apollo.useMutation.Result<SaveCustomDomainRecordsMutation>;
export type SaveCustomDomainRecordsMutationOptions = Apollo.useMutation.Options<SaveCustomDomainRecordsMutation, SaveCustomDomainRecordsMutationVariables>;
export const DeleteCustomDomainDocument = /*#__PURE__*/ gql`
    mutation deleteCustomDomain($request: DeleteCustomDomainRequest!) {
  deleteCustomDomain(request: $request)
}
    `;
export type DeleteCustomDomainMutationFn = Apollo.useMutation.MutationFunction<DeleteCustomDomainMutation, DeleteCustomDomainMutationVariables>;

/**
 * __useDeleteCustomDomainMutation__
 *
 * To run a mutation, you first call `useDeleteCustomDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomDomainMutation, { data, loading, error }] = useDeleteCustomDomainMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteCustomDomainMutation(baseOptions?: Apollo.useMutation.Options<DeleteCustomDomainMutation, DeleteCustomDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomDomainMutation, DeleteCustomDomainMutationVariables>(DeleteCustomDomainDocument, options);
      }
export type DeleteCustomDomainMutationHookResult = ReturnType<typeof useDeleteCustomDomainMutation>;
export type DeleteCustomDomainMutationResult = Apollo.useMutation.Result<DeleteCustomDomainMutation>;
export type DeleteCustomDomainMutationOptions = Apollo.useMutation.Options<DeleteCustomDomainMutation, DeleteCustomDomainMutationVariables>;
export const DeleteCustomDomainAliasDocument = /*#__PURE__*/ gql`
    mutation deleteCustomDomainAlias($request: DeleteCustomDomainAliasRequest!) {
  deleteCustomDomainAlias(request: $request)
}
    `;
export type DeleteCustomDomainAliasMutationFn = Apollo.useMutation.MutationFunction<DeleteCustomDomainAliasMutation, DeleteCustomDomainAliasMutationVariables>;

/**
 * __useDeleteCustomDomainAliasMutation__
 *
 * To run a mutation, you first call `useDeleteCustomDomainAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomDomainAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomDomainAliasMutation, { data, loading, error }] = useDeleteCustomDomainAliasMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteCustomDomainAliasMutation(baseOptions?: Apollo.useMutation.Options<DeleteCustomDomainAliasMutation, DeleteCustomDomainAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomDomainAliasMutation, DeleteCustomDomainAliasMutationVariables>(DeleteCustomDomainAliasDocument, options);
      }
export type DeleteCustomDomainAliasMutationHookResult = ReturnType<typeof useDeleteCustomDomainAliasMutation>;
export type DeleteCustomDomainAliasMutationResult = Apollo.useMutation.Result<DeleteCustomDomainAliasMutation>;
export type DeleteCustomDomainAliasMutationOptions = Apollo.useMutation.Options<DeleteCustomDomainAliasMutation, DeleteCustomDomainAliasMutationVariables>;
export const VerifyCustomDomainDocument = /*#__PURE__*/ gql`
    mutation VerifyCustomDomain($domainId: String!) {
  verifyCustomDomain(domainID: $domainId)
}
    `;
export type VerifyCustomDomainMutationFn = Apollo.useMutation.MutationFunction<VerifyCustomDomainMutation, VerifyCustomDomainMutationVariables>;

/**
 * __useVerifyCustomDomainMutation__
 *
 * To run a mutation, you first call `useVerifyCustomDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyCustomDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyCustomDomainMutation, { data, loading, error }] = useVerifyCustomDomainMutation({
 *   variables: {
 *      domainId: // value for 'domainId'
 *   },
 * });
 */
export function useVerifyCustomDomainMutation(baseOptions?: Apollo.useMutation.Options<VerifyCustomDomainMutation, VerifyCustomDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyCustomDomainMutation, VerifyCustomDomainMutationVariables>(VerifyCustomDomainDocument, options);
      }
export type VerifyCustomDomainMutationHookResult = ReturnType<typeof useVerifyCustomDomainMutation>;
export type VerifyCustomDomainMutationResult = Apollo.useMutation.Result<VerifyCustomDomainMutation>;
export type VerifyCustomDomainMutationOptions = Apollo.useMutation.Options<VerifyCustomDomainMutation, VerifyCustomDomainMutationVariables>;
export const GetAllDraftsDocument = /*#__PURE__*/ gql`
    query getAllDrafts {
  allDrafts {
    draftID
    encryptedKey
    encryptedDraft
    updatedAt
  }
}
    `;

/**
 * __useGetAllDraftsQuery__
 *
 * To run a query within a React component, call `useGetAllDraftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDraftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDraftsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDraftsQuery(baseOptions?: Apollo.useQuery.Options<GetAllDraftsQuery, GetAllDraftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDraftsQuery, GetAllDraftsQueryVariables>(GetAllDraftsDocument, options);
      }
export function useGetAllDraftsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAllDraftsQuery, GetAllDraftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDraftsQuery, GetAllDraftsQueryVariables>(GetAllDraftsDocument, options);
        }
export type GetAllDraftsQueryHookResult = ReturnType<typeof useGetAllDraftsQuery>;
export type GetAllDraftsLazyQueryHookResult = ReturnType<typeof useGetAllDraftsLazyQuery>;
export type GetAllDraftsQueryResult = Apollo.useQuery.Result<GetAllDraftsQuery, GetAllDraftsQueryVariables>;
export const DeleteDraftDocument = /*#__PURE__*/ gql`
    mutation deleteDraft($request: DeleteDraftRequest!) {
  deleteDraft(request: $request)
}
    `;
export type DeleteDraftMutationFn = Apollo.useMutation.MutationFunction<DeleteDraftMutation, DeleteDraftMutationVariables>;

/**
 * __useDeleteDraftMutation__
 *
 * To run a mutation, you first call `useDeleteDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDraftMutation, { data, loading, error }] = useDeleteDraftMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteDraftMutation(baseOptions?: Apollo.useMutation.Options<DeleteDraftMutation, DeleteDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDraftMutation, DeleteDraftMutationVariables>(DeleteDraftDocument, options);
      }
export type DeleteDraftMutationHookResult = ReturnType<typeof useDeleteDraftMutation>;
export type DeleteDraftMutationResult = Apollo.useMutation.Result<DeleteDraftMutation>;
export type DeleteDraftMutationOptions = Apollo.useMutation.Options<DeleteDraftMutation, DeleteDraftMutationVariables>;
export const CreateOrUpdateDraftDocument = /*#__PURE__*/ gql`
    mutation createOrUpdateDraft($request: CreateOrUpdateDraftRequest!) {
  createOrUpdateDraft(request: $request)
}
    `;
export type CreateOrUpdateDraftMutationFn = Apollo.useMutation.MutationFunction<CreateOrUpdateDraftMutation, CreateOrUpdateDraftMutationVariables>;

/**
 * __useCreateOrUpdateDraftMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateDraftMutation, { data, loading, error }] = useCreateOrUpdateDraftMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateOrUpdateDraftMutation(baseOptions?: Apollo.useMutation.Options<CreateOrUpdateDraftMutation, CreateOrUpdateDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateDraftMutation, CreateOrUpdateDraftMutationVariables>(CreateOrUpdateDraftDocument, options);
      }
export type CreateOrUpdateDraftMutationHookResult = ReturnType<typeof useCreateOrUpdateDraftMutation>;
export type CreateOrUpdateDraftMutationResult = Apollo.useMutation.Result<CreateOrUpdateDraftMutation>;
export type CreateOrUpdateDraftMutationOptions = Apollo.useMutation.Options<CreateOrUpdateDraftMutation, CreateOrUpdateDraftMutationVariables>;
export const MailboxWithContentDocument = /*#__PURE__*/ gql`
    query mailboxWithContent($request: MailboxRequest!) {
  mailbox(request: $request) {
    threads {
      ...Thread
    }
    pageInfo {
      hasNextPage
      cursor {
        threadID
        date
      }
    }
  }
}
    ${ThreadFragmentDoc}`;

/**
 * __useMailboxWithContentQuery__
 *
 * To run a query within a React component, call `useMailboxWithContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailboxWithContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailboxWithContentQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMailboxWithContentQuery(baseOptions: Apollo.useQuery.Options<MailboxWithContentQuery, MailboxWithContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailboxWithContentQuery, MailboxWithContentQueryVariables>(MailboxWithContentDocument, options);
      }
export function useMailboxWithContentLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<MailboxWithContentQuery, MailboxWithContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailboxWithContentQuery, MailboxWithContentQueryVariables>(MailboxWithContentDocument, options);
        }
export type MailboxWithContentQueryHookResult = ReturnType<typeof useMailboxWithContentQuery>;
export type MailboxWithContentLazyQueryHookResult = ReturnType<typeof useMailboxWithContentLazyQuery>;
export type MailboxWithContentQueryResult = Apollo.useQuery.Result<MailboxWithContentQuery, MailboxWithContentQueryVariables>;
export const MailboxDocument = /*#__PURE__*/ gql`
    query mailbox($request: MailboxRequest!) {
  mailbox(request: $request) {
    threads {
      ...ThreadWithoutContent
    }
    pageInfo {
      hasNextPage
      cursor {
        threadID
        date
      }
    }
  }
}
    ${ThreadWithoutContentFragmentDoc}`;

/**
 * __useMailboxQuery__
 *
 * To run a query within a React component, call `useMailboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useMailboxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMailboxQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMailboxQuery(baseOptions: Apollo.useQuery.Options<MailboxQuery, MailboxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MailboxQuery, MailboxQueryVariables>(MailboxDocument, options);
      }
export function useMailboxLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<MailboxQuery, MailboxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MailboxQuery, MailboxQueryVariables>(MailboxDocument, options);
        }
export type MailboxQueryHookResult = ReturnType<typeof useMailboxQuery>;
export type MailboxLazyQueryHookResult = ReturnType<typeof useMailboxLazyQuery>;
export type MailboxQueryResult = Apollo.useQuery.Result<MailboxQuery, MailboxQueryVariables>;
export const FilteredThreadIDsDocument = /*#__PURE__*/ gql`
    query filteredThreadIDs($request: FilteredThreadIDsRequest!) {
  filteredThreadIDs(request: $request) {
    threadIDs
    numThreadIDsRemoved
  }
}
    `;

/**
 * __useFilteredThreadIDsQuery__
 *
 * To run a query within a React component, call `useFilteredThreadIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilteredThreadIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilteredThreadIDsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useFilteredThreadIDsQuery(baseOptions: Apollo.useQuery.Options<FilteredThreadIDsQuery, FilteredThreadIDsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilteredThreadIDsQuery, FilteredThreadIDsQueryVariables>(FilteredThreadIDsDocument, options);
      }
export function useFilteredThreadIDsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<FilteredThreadIDsQuery, FilteredThreadIDsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilteredThreadIDsQuery, FilteredThreadIDsQueryVariables>(FilteredThreadIDsDocument, options);
        }
export type FilteredThreadIDsQueryHookResult = ReturnType<typeof useFilteredThreadIDsQuery>;
export type FilteredThreadIDsLazyQueryHookResult = ReturnType<typeof useFilteredThreadIDsLazyQuery>;
export type FilteredThreadIDsQueryResult = Apollo.useQuery.Result<FilteredThreadIDsQuery, FilteredThreadIDsQueryVariables>;
export const MobileMailboxDocument = /*#__PURE__*/ gql`
    query mobileMailbox($mailboxRequest: NativeMailboxRequest!, $threadIDs: [String!]!) {
  nativeMailbox(request: $mailboxRequest) {
    threads {
      ...MobileThread
    }
    slimThreads {
      ...SlimThread
    }
    pageInfo {
      hasNextPage
      cursor {
        threadID
        date
      }
    }
  }
  userThreads(threadIDs: $threadIDs) {
    ...MobileThread
  }
}
    ${MobileThreadFragmentDoc}
${SlimThreadFragmentDoc}`;

/**
 * __useMobileMailboxQuery__
 *
 * To run a query within a React component, call `useMobileMailboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useMobileMailboxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMobileMailboxQuery({
 *   variables: {
 *      mailboxRequest: // value for 'mailboxRequest'
 *      threadIDs: // value for 'threadIDs'
 *   },
 * });
 */
export function useMobileMailboxQuery(baseOptions: Apollo.useQuery.Options<MobileMailboxQuery, MobileMailboxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MobileMailboxQuery, MobileMailboxQueryVariables>(MobileMailboxDocument, options);
      }
export function useMobileMailboxLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<MobileMailboxQuery, MobileMailboxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MobileMailboxQuery, MobileMailboxQueryVariables>(MobileMailboxDocument, options);
        }
export type MobileMailboxQueryHookResult = ReturnType<typeof useMobileMailboxQuery>;
export type MobileMailboxLazyQueryHookResult = ReturnType<typeof useMobileMailboxLazyQuery>;
export type MobileMailboxQueryResult = Apollo.useQuery.Result<MobileMailboxQuery, MobileMailboxQueryVariables>;
export const MobileMailboxLabelsSyncDocument = /*#__PURE__*/ gql`
    query mobileMailboxLabelsSync($mailboxRequest: NativeMailboxRequest!, $threadIDs: [String!]!) {
  nativeMailbox(request: $mailboxRequest) {
    threads {
      ...MobileThread
    }
    slimThreads {
      ...SlimThreadWithoutLabels
    }
    pageInfo {
      hasNextPage
      cursor {
        threadID
        date
      }
    }
  }
  userThreads(threadIDs: $threadIDs) {
    ...MobileThread
  }
  userLabels {
    labelID
    color
    labelName
    variant
  }
}
    ${MobileThreadFragmentDoc}
${SlimThreadWithoutLabelsFragmentDoc}`;

/**
 * __useMobileMailboxLabelsSyncQuery__
 *
 * To run a query within a React component, call `useMobileMailboxLabelsSyncQuery` and pass it any options that fit your needs.
 * When your component renders, `useMobileMailboxLabelsSyncQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMobileMailboxLabelsSyncQuery({
 *   variables: {
 *      mailboxRequest: // value for 'mailboxRequest'
 *      threadIDs: // value for 'threadIDs'
 *   },
 * });
 */
export function useMobileMailboxLabelsSyncQuery(baseOptions: Apollo.useQuery.Options<MobileMailboxLabelsSyncQuery, MobileMailboxLabelsSyncQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MobileMailboxLabelsSyncQuery, MobileMailboxLabelsSyncQueryVariables>(MobileMailboxLabelsSyncDocument, options);
      }
export function useMobileMailboxLabelsSyncLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<MobileMailboxLabelsSyncQuery, MobileMailboxLabelsSyncQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MobileMailboxLabelsSyncQuery, MobileMailboxLabelsSyncQueryVariables>(MobileMailboxLabelsSyncDocument, options);
        }
export type MobileMailboxLabelsSyncQueryHookResult = ReturnType<typeof useMobileMailboxLabelsSyncQuery>;
export type MobileMailboxLabelsSyncLazyQueryHookResult = ReturnType<typeof useMobileMailboxLabelsSyncLazyQuery>;
export type MobileMailboxLabelsSyncQueryResult = Apollo.useQuery.Result<MobileMailboxLabelsSyncQuery, MobileMailboxLabelsSyncQueryVariables>;
export const GetMobileThreadsFromIdDocument = /*#__PURE__*/ gql`
    query getMobileThreadsFromID($threadIDs: [String!]!, $returnDeleted: Boolean) {
  userThreads(threadIDs: $threadIDs, returnDeleted: $returnDeleted) {
    ...MobileThread
  }
}
    ${MobileThreadFragmentDoc}`;

/**
 * __useGetMobileThreadsFromIdQuery__
 *
 * To run a query within a React component, call `useGetMobileThreadsFromIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMobileThreadsFromIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMobileThreadsFromIdQuery({
 *   variables: {
 *      threadIDs: // value for 'threadIDs'
 *      returnDeleted: // value for 'returnDeleted'
 *   },
 * });
 */
export function useGetMobileThreadsFromIdQuery(baseOptions: Apollo.useQuery.Options<GetMobileThreadsFromIdQuery, GetMobileThreadsFromIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMobileThreadsFromIdQuery, GetMobileThreadsFromIdQueryVariables>(GetMobileThreadsFromIdDocument, options);
      }
export function useGetMobileThreadsFromIdLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetMobileThreadsFromIdQuery, GetMobileThreadsFromIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMobileThreadsFromIdQuery, GetMobileThreadsFromIdQueryVariables>(GetMobileThreadsFromIdDocument, options);
        }
export type GetMobileThreadsFromIdQueryHookResult = ReturnType<typeof useGetMobileThreadsFromIdQuery>;
export type GetMobileThreadsFromIdLazyQueryHookResult = ReturnType<typeof useGetMobileThreadsFromIdLazyQuery>;
export type GetMobileThreadsFromIdQueryResult = Apollo.useQuery.Result<GetMobileThreadsFromIdQuery, GetMobileThreadsFromIdQueryVariables>;
export const GetThreadFromIdDocument = /*#__PURE__*/ gql`
    query getThreadFromID($threadID: String!) {
  userThread(threadID: $threadID) {
    ...Thread
  }
}
    ${ThreadFragmentDoc}`;

/**
 * __useGetThreadFromIdQuery__
 *
 * To run a query within a React component, call `useGetThreadFromIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadFromIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadFromIdQuery({
 *   variables: {
 *      threadID: // value for 'threadID'
 *   },
 * });
 */
export function useGetThreadFromIdQuery(baseOptions: Apollo.useQuery.Options<GetThreadFromIdQuery, GetThreadFromIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadFromIdQuery, GetThreadFromIdQueryVariables>(GetThreadFromIdDocument, options);
      }
export function useGetThreadFromIdLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetThreadFromIdQuery, GetThreadFromIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadFromIdQuery, GetThreadFromIdQueryVariables>(GetThreadFromIdDocument, options);
        }
export type GetThreadFromIdQueryHookResult = ReturnType<typeof useGetThreadFromIdQuery>;
export type GetThreadFromIdLazyQueryHookResult = ReturnType<typeof useGetThreadFromIdLazyQuery>;
export type GetThreadFromIdQueryResult = Apollo.useQuery.Result<GetThreadFromIdQuery, GetThreadFromIdQueryVariables>;
export const GetThreadsFromIDsDocument = /*#__PURE__*/ gql`
    query getThreadsFromIDs($threadIDs: [String!]!) {
  userThreads(threadIDs: $threadIDs) {
    ...Thread
  }
}
    ${ThreadFragmentDoc}`;

/**
 * __useGetThreadsFromIDsQuery__
 *
 * To run a query within a React component, call `useGetThreadsFromIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadsFromIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadsFromIDsQuery({
 *   variables: {
 *      threadIDs: // value for 'threadIDs'
 *   },
 * });
 */
export function useGetThreadsFromIDsQuery(baseOptions: Apollo.useQuery.Options<GetThreadsFromIDsQuery, GetThreadsFromIDsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadsFromIDsQuery, GetThreadsFromIDsQueryVariables>(GetThreadsFromIDsDocument, options);
      }
export function useGetThreadsFromIDsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetThreadsFromIDsQuery, GetThreadsFromIDsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadsFromIDsQuery, GetThreadsFromIDsQueryVariables>(GetThreadsFromIDsDocument, options);
        }
export type GetThreadsFromIDsQueryHookResult = ReturnType<typeof useGetThreadsFromIDsQuery>;
export type GetThreadsFromIDsLazyQueryHookResult = ReturnType<typeof useGetThreadsFromIDsLazyQuery>;
export type GetThreadsFromIDsQueryResult = Apollo.useQuery.Result<GetThreadsFromIDsQuery, GetThreadsFromIDsQueryVariables>;
export const GetFromAddressListForEmailsOnThreadDocument = /*#__PURE__*/ gql`
    query getFromAddressListForEmailsOnThread($threadID: String!) {
  userThread(threadID: $threadID) {
    threadID
    emails {
      id
      from {
        ...Address
      }
    }
  }
}
    ${AddressFragmentDoc}`;

/**
 * __useGetFromAddressListForEmailsOnThreadQuery__
 *
 * To run a query within a React component, call `useGetFromAddressListForEmailsOnThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFromAddressListForEmailsOnThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFromAddressListForEmailsOnThreadQuery({
 *   variables: {
 *      threadID: // value for 'threadID'
 *   },
 * });
 */
export function useGetFromAddressListForEmailsOnThreadQuery(baseOptions: Apollo.useQuery.Options<GetFromAddressListForEmailsOnThreadQuery, GetFromAddressListForEmailsOnThreadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFromAddressListForEmailsOnThreadQuery, GetFromAddressListForEmailsOnThreadQueryVariables>(GetFromAddressListForEmailsOnThreadDocument, options);
      }
export function useGetFromAddressListForEmailsOnThreadLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetFromAddressListForEmailsOnThreadQuery, GetFromAddressListForEmailsOnThreadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFromAddressListForEmailsOnThreadQuery, GetFromAddressListForEmailsOnThreadQueryVariables>(GetFromAddressListForEmailsOnThreadDocument, options);
        }
export type GetFromAddressListForEmailsOnThreadQueryHookResult = ReturnType<typeof useGetFromAddressListForEmailsOnThreadQuery>;
export type GetFromAddressListForEmailsOnThreadLazyQueryHookResult = ReturnType<typeof useGetFromAddressListForEmailsOnThreadLazyQuery>;
export type GetFromAddressListForEmailsOnThreadQueryResult = Apollo.useQuery.Result<GetFromAddressListForEmailsOnThreadQuery, GetFromAddressListForEmailsOnThreadQueryVariables>;
export const ThreadAttributesDocument = /*#__PURE__*/ gql`
    query threadAttributes($threadID: String!) {
  userThread(threadID: $threadID) {
    threadID
    attributes {
      read
      systemLabels
      userLabels {
        labelID
        color
        labelName
        variant
      }
    }
  }
}
    `;

/**
 * __useThreadAttributesQuery__
 *
 * To run a query within a React component, call `useThreadAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useThreadAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThreadAttributesQuery({
 *   variables: {
 *      threadID: // value for 'threadID'
 *   },
 * });
 */
export function useThreadAttributesQuery(baseOptions: Apollo.useQuery.Options<ThreadAttributesQuery, ThreadAttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ThreadAttributesQuery, ThreadAttributesQueryVariables>(ThreadAttributesDocument, options);
      }
export function useThreadAttributesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<ThreadAttributesQuery, ThreadAttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ThreadAttributesQuery, ThreadAttributesQueryVariables>(ThreadAttributesDocument, options);
        }
export type ThreadAttributesQueryHookResult = ReturnType<typeof useThreadAttributesQuery>;
export type ThreadAttributesLazyQueryHookResult = ReturnType<typeof useThreadAttributesLazyQuery>;
export type ThreadAttributesQueryResult = Apollo.useQuery.Result<ThreadAttributesQuery, ThreadAttributesQueryVariables>;
export const ValidateMailAliasDocument = /*#__PURE__*/ gql`
    query validateMailAlias($request: GetAliasValidRequest!) {
  aliasValid(request: $request)
}
    `;

/**
 * __useValidateMailAliasQuery__
 *
 * To run a query within a React component, call `useValidateMailAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateMailAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateMailAliasQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useValidateMailAliasQuery(baseOptions: Apollo.useQuery.Options<ValidateMailAliasQuery, ValidateMailAliasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateMailAliasQuery, ValidateMailAliasQueryVariables>(ValidateMailAliasDocument, options);
      }
export function useValidateMailAliasLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<ValidateMailAliasQuery, ValidateMailAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateMailAliasQuery, ValidateMailAliasQueryVariables>(ValidateMailAliasDocument, options);
        }
export type ValidateMailAliasQueryHookResult = ReturnType<typeof useValidateMailAliasQuery>;
export type ValidateMailAliasLazyQueryHookResult = ReturnType<typeof useValidateMailAliasLazyQuery>;
export type ValidateMailAliasQueryResult = Apollo.useQuery.Result<ValidateMailAliasQuery, ValidateMailAliasQueryVariables>;
export const UpdateQuickAliasActiveStateDocument = /*#__PURE__*/ gql`
    mutation updateQuickAliasActiveState($request: UpdateQuickAliasActiveStateRequest) {
  updateQuickAliasActiveState(request: $request) {
    status
  }
}
    `;
export type UpdateQuickAliasActiveStateMutationFn = Apollo.useMutation.MutationFunction<UpdateQuickAliasActiveStateMutation, UpdateQuickAliasActiveStateMutationVariables>;

/**
 * __useUpdateQuickAliasActiveStateMutation__
 *
 * To run a mutation, you first call `useUpdateQuickAliasActiveStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuickAliasActiveStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuickAliasActiveStateMutation, { data, loading, error }] = useUpdateQuickAliasActiveStateMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateQuickAliasActiveStateMutation(baseOptions?: Apollo.useMutation.Options<UpdateQuickAliasActiveStateMutation, UpdateQuickAliasActiveStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuickAliasActiveStateMutation, UpdateQuickAliasActiveStateMutationVariables>(UpdateQuickAliasActiveStateDocument, options);
      }
export type UpdateQuickAliasActiveStateMutationHookResult = ReturnType<typeof useUpdateQuickAliasActiveStateMutation>;
export type UpdateQuickAliasActiveStateMutationResult = Apollo.useMutation.Result<UpdateQuickAliasActiveStateMutation>;
export type UpdateQuickAliasActiveStateMutationOptions = Apollo.useMutation.Options<UpdateQuickAliasActiveStateMutation, UpdateQuickAliasActiveStateMutationVariables>;
export const UpdateEmailAliasSendReceiveEnabledStateDocument = /*#__PURE__*/ gql`
    mutation updateEmailAliasSendReceiveEnabledState($request: UpdateEmailAliasEnabledStateRequest!) {
  updateEmailAliasSendReceiveEnabledState(request: $request)
}
    `;
export type UpdateEmailAliasSendReceiveEnabledStateMutationFn = Apollo.useMutation.MutationFunction<UpdateEmailAliasSendReceiveEnabledStateMutation, UpdateEmailAliasSendReceiveEnabledStateMutationVariables>;

/**
 * __useUpdateEmailAliasSendReceiveEnabledStateMutation__
 *
 * To run a mutation, you first call `useUpdateEmailAliasSendReceiveEnabledStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailAliasSendReceiveEnabledStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailAliasSendReceiveEnabledStateMutation, { data, loading, error }] = useUpdateEmailAliasSendReceiveEnabledStateMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateEmailAliasSendReceiveEnabledStateMutation(baseOptions?: Apollo.useMutation.Options<UpdateEmailAliasSendReceiveEnabledStateMutation, UpdateEmailAliasSendReceiveEnabledStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailAliasSendReceiveEnabledStateMutation, UpdateEmailAliasSendReceiveEnabledStateMutationVariables>(UpdateEmailAliasSendReceiveEnabledStateDocument, options);
      }
export type UpdateEmailAliasSendReceiveEnabledStateMutationHookResult = ReturnType<typeof useUpdateEmailAliasSendReceiveEnabledStateMutation>;
export type UpdateEmailAliasSendReceiveEnabledStateMutationResult = Apollo.useMutation.Result<UpdateEmailAliasSendReceiveEnabledStateMutation>;
export type UpdateEmailAliasSendReceiveEnabledStateMutationOptions = Apollo.useMutation.Options<UpdateEmailAliasSendReceiveEnabledStateMutation, UpdateEmailAliasSendReceiveEnabledStateMutationVariables>;
export const CreateEmailAliasDocument = /*#__PURE__*/ gql`
    mutation createEmailAlias($request: CreateEmailAliasRequest) {
  createEmailAlias(request: $request) {
    emailAliases
  }
}
    `;
export type CreateEmailAliasMutationFn = Apollo.useMutation.MutationFunction<CreateEmailAliasMutation, CreateEmailAliasMutationVariables>;

/**
 * __useCreateEmailAliasMutation__
 *
 * To run a mutation, you first call `useCreateEmailAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmailAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmailAliasMutation, { data, loading, error }] = useCreateEmailAliasMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateEmailAliasMutation(baseOptions?: Apollo.useMutation.Options<CreateEmailAliasMutation, CreateEmailAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmailAliasMutation, CreateEmailAliasMutationVariables>(CreateEmailAliasDocument, options);
      }
export type CreateEmailAliasMutationHookResult = ReturnType<typeof useCreateEmailAliasMutation>;
export type CreateEmailAliasMutationResult = Apollo.useMutation.Result<CreateEmailAliasMutation>;
export type CreateEmailAliasMutationOptions = Apollo.useMutation.Options<CreateEmailAliasMutation, CreateEmailAliasMutationVariables>;
export const CreateCustomDomainAliasDocument = /*#__PURE__*/ gql`
    mutation createCustomDomainAlias($request: CreateCustomDomainAliasRequest) {
  createCustomDomainAlias(request: $request) {
    emailAliases
  }
}
    `;
export type CreateCustomDomainAliasMutationFn = Apollo.useMutation.MutationFunction<CreateCustomDomainAliasMutation, CreateCustomDomainAliasMutationVariables>;

/**
 * __useCreateCustomDomainAliasMutation__
 *
 * To run a mutation, you first call `useCreateCustomDomainAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomDomainAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomDomainAliasMutation, { data, loading, error }] = useCreateCustomDomainAliasMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateCustomDomainAliasMutation(baseOptions?: Apollo.useMutation.Options<CreateCustomDomainAliasMutation, CreateCustomDomainAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomDomainAliasMutation, CreateCustomDomainAliasMutationVariables>(CreateCustomDomainAliasDocument, options);
      }
export type CreateCustomDomainAliasMutationHookResult = ReturnType<typeof useCreateCustomDomainAliasMutation>;
export type CreateCustomDomainAliasMutationResult = Apollo.useMutation.Result<CreateCustomDomainAliasMutation>;
export type CreateCustomDomainAliasMutationOptions = Apollo.useMutation.Options<CreateCustomDomainAliasMutation, CreateCustomDomainAliasMutationVariables>;
export const UpdateEmailAliasActiveStateDocument = /*#__PURE__*/ gql`
    mutation updateEmailAliasActiveState($request: UpdateEmailAliasActiveStateRequest) {
  updateEmailAliasActiveState(request: $request) {
    status
  }
}
    `;
export type UpdateEmailAliasActiveStateMutationFn = Apollo.useMutation.MutationFunction<UpdateEmailAliasActiveStateMutation, UpdateEmailAliasActiveStateMutationVariables>;

/**
 * __useUpdateEmailAliasActiveStateMutation__
 *
 * To run a mutation, you first call `useUpdateEmailAliasActiveStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailAliasActiveStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailAliasActiveStateMutation, { data, loading, error }] = useUpdateEmailAliasActiveStateMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateEmailAliasActiveStateMutation(baseOptions?: Apollo.useMutation.Options<UpdateEmailAliasActiveStateMutation, UpdateEmailAliasActiveStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailAliasActiveStateMutation, UpdateEmailAliasActiveStateMutationVariables>(UpdateEmailAliasActiveStateDocument, options);
      }
export type UpdateEmailAliasActiveStateMutationHookResult = ReturnType<typeof useUpdateEmailAliasActiveStateMutation>;
export type UpdateEmailAliasActiveStateMutationResult = Apollo.useMutation.Result<UpdateEmailAliasActiveStateMutation>;
export type UpdateEmailAliasActiveStateMutationOptions = Apollo.useMutation.Options<UpdateEmailAliasActiveStateMutation, UpdateEmailAliasActiveStateMutationVariables>;
export const UpdateEmailAliasProfileDocument = /*#__PURE__*/ gql`
    mutation updateEmailAliasProfile($request: UpdateEmailAliasProfileRequest!) {
  updateEmailAliasProfile(request: $request)
}
    `;
export type UpdateEmailAliasProfileMutationFn = Apollo.useMutation.MutationFunction<UpdateEmailAliasProfileMutation, UpdateEmailAliasProfileMutationVariables>;

/**
 * __useUpdateEmailAliasProfileMutation__
 *
 * To run a mutation, you first call `useUpdateEmailAliasProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailAliasProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailAliasProfileMutation, { data, loading, error }] = useUpdateEmailAliasProfileMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateEmailAliasProfileMutation(baseOptions?: Apollo.useMutation.Options<UpdateEmailAliasProfileMutation, UpdateEmailAliasProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailAliasProfileMutation, UpdateEmailAliasProfileMutationVariables>(UpdateEmailAliasProfileDocument, options);
      }
export type UpdateEmailAliasProfileMutationHookResult = ReturnType<typeof useUpdateEmailAliasProfileMutation>;
export type UpdateEmailAliasProfileMutationResult = Apollo.useMutation.Result<UpdateEmailAliasProfileMutation>;
export type UpdateEmailAliasProfileMutationOptions = Apollo.useMutation.Options<UpdateEmailAliasProfileMutation, UpdateEmailAliasProfileMutationVariables>;
export const SetAllThreadsReadStatusDocument = /*#__PURE__*/ gql`
    mutation setAllThreadsReadStatus($request: SetAllThreadsReadStatusRequest!) {
  setAllThreadsReadStatus(request: $request)
}
    `;
export type SetAllThreadsReadStatusMutationFn = Apollo.useMutation.MutationFunction<SetAllThreadsReadStatusMutation, SetAllThreadsReadStatusMutationVariables>;

/**
 * __useSetAllThreadsReadStatusMutation__
 *
 * To run a mutation, you first call `useSetAllThreadsReadStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAllThreadsReadStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAllThreadsReadStatusMutation, { data, loading, error }] = useSetAllThreadsReadStatusMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetAllThreadsReadStatusMutation(baseOptions?: Apollo.useMutation.Options<SetAllThreadsReadStatusMutation, SetAllThreadsReadStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAllThreadsReadStatusMutation, SetAllThreadsReadStatusMutationVariables>(SetAllThreadsReadStatusDocument, options);
      }
export type SetAllThreadsReadStatusMutationHookResult = ReturnType<typeof useSetAllThreadsReadStatusMutation>;
export type SetAllThreadsReadStatusMutationResult = Apollo.useMutation.Result<SetAllThreadsReadStatusMutation>;
export type SetAllThreadsReadStatusMutationOptions = Apollo.useMutation.Options<SetAllThreadsReadStatusMutation, SetAllThreadsReadStatusMutationVariables>;
export const SetUserPublicKeyDocument = /*#__PURE__*/ gql`
    mutation setUserPublicKey($request: SetUserPublicKeyRequest) {
  setUserPublicKey(request: $request)
}
    `;
export type SetUserPublicKeyMutationFn = Apollo.useMutation.MutationFunction<SetUserPublicKeyMutation, SetUserPublicKeyMutationVariables>;

/**
 * __useSetUserPublicKeyMutation__
 *
 * To run a mutation, you first call `useSetUserPublicKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserPublicKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserPublicKeyMutation, { data, loading, error }] = useSetUserPublicKeyMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetUserPublicKeyMutation(baseOptions?: Apollo.useMutation.Options<SetUserPublicKeyMutation, SetUserPublicKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserPublicKeyMutation, SetUserPublicKeyMutationVariables>(SetUserPublicKeyDocument, options);
      }
export type SetUserPublicKeyMutationHookResult = ReturnType<typeof useSetUserPublicKeyMutation>;
export type SetUserPublicKeyMutationResult = Apollo.useMutation.Result<SetUserPublicKeyMutation>;
export type SetUserPublicKeyMutationOptions = Apollo.useMutation.Options<SetUserPublicKeyMutation, SetUserPublicKeyMutationVariables>;
export const SetReadStatusDocument = /*#__PURE__*/ gql`
    mutation setReadStatus($request: SetReadStatusRequest) {
  setReadStatus(request: $request) {
    updatedThreadIDs
  }
}
    `;
export type SetReadStatusMutationFn = Apollo.useMutation.MutationFunction<SetReadStatusMutation, SetReadStatusMutationVariables>;

/**
 * __useSetReadStatusMutation__
 *
 * To run a mutation, you first call `useSetReadStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetReadStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setReadStatusMutation, { data, loading, error }] = useSetReadStatusMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetReadStatusMutation(baseOptions?: Apollo.useMutation.Options<SetReadStatusMutation, SetReadStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetReadStatusMutation, SetReadStatusMutationVariables>(SetReadStatusDocument, options);
      }
export type SetReadStatusMutationHookResult = ReturnType<typeof useSetReadStatusMutation>;
export type SetReadStatusMutationResult = Apollo.useMutation.Result<SetReadStatusMutation>;
export type SetReadStatusMutationOptions = Apollo.useMutation.Options<SetReadStatusMutation, SetReadStatusMutationVariables>;
export const SendMessageDocument = /*#__PURE__*/ gql`
    mutation sendMessage($request: SendEmailRequest!) {
  sendMessage(message: $request) {
    messageID
    threadID
  }
}
    `;
export type SendMessageMutationFn = Apollo.useMutation.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.useMutation.Options<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.useMutation.Result<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.useMutation.Options<SendMessageMutation, SendMessageMutationVariables>;
export const UnsendMessageDocument = /*#__PURE__*/ gql`
    mutation unsendMessage($request: UnsendEmailRequest!) {
  unsendMessage(message: $request) {
    ...Email
  }
}
    ${EmailFragmentDoc}`;
export type UnsendMessageMutationFn = Apollo.useMutation.MutationFunction<UnsendMessageMutation, UnsendMessageMutationVariables>;

/**
 * __useUnsendMessageMutation__
 *
 * To run a mutation, you first call `useUnsendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsendMessageMutation, { data, loading, error }] = useUnsendMessageMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnsendMessageMutation(baseOptions?: Apollo.useMutation.Options<UnsendMessageMutation, UnsendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsendMessageMutation, UnsendMessageMutationVariables>(UnsendMessageDocument, options);
      }
export type UnsendMessageMutationHookResult = ReturnType<typeof useUnsendMessageMutation>;
export type UnsendMessageMutationResult = Apollo.useMutation.Result<UnsendMessageMutation>;
export type UnsendMessageMutationOptions = Apollo.useMutation.Options<UnsendMessageMutation, UnsendMessageMutationVariables>;
export const SendReplyMessageDocument = /*#__PURE__*/ gql`
    mutation sendReplyMessage($request: ReplyToEmailRequest!) {
  replyToMessage(message: $request) {
    messageID
    threadID
  }
}
    `;
export type SendReplyMessageMutationFn = Apollo.useMutation.MutationFunction<SendReplyMessageMutation, SendReplyMessageMutationVariables>;

/**
 * __useSendReplyMessageMutation__
 *
 * To run a mutation, you first call `useSendReplyMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendReplyMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendReplyMessageMutation, { data, loading, error }] = useSendReplyMessageMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSendReplyMessageMutation(baseOptions?: Apollo.useMutation.Options<SendReplyMessageMutation, SendReplyMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendReplyMessageMutation, SendReplyMessageMutationVariables>(SendReplyMessageDocument, options);
      }
export type SendReplyMessageMutationHookResult = ReturnType<typeof useSendReplyMessageMutation>;
export type SendReplyMessageMutationResult = Apollo.useMutation.Result<SendReplyMessageMutation>;
export type SendReplyMessageMutationOptions = Apollo.useMutation.Options<SendReplyMessageMutation, SendReplyMessageMutationVariables>;
export const DecryptionServicePublicKeyDocument = /*#__PURE__*/ gql`
    query decryptionServicePublicKey {
  decryptionServicePublicKey
}
    `;

/**
 * __useDecryptionServicePublicKeyQuery__
 *
 * To run a query within a React component, call `useDecryptionServicePublicKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useDecryptionServicePublicKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDecryptionServicePublicKeyQuery({
 *   variables: {
 *   },
 * });
 */
export function useDecryptionServicePublicKeyQuery(baseOptions?: Apollo.useQuery.Options<DecryptionServicePublicKeyQuery, DecryptionServicePublicKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DecryptionServicePublicKeyQuery, DecryptionServicePublicKeyQueryVariables>(DecryptionServicePublicKeyDocument, options);
      }
export function useDecryptionServicePublicKeyLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<DecryptionServicePublicKeyQuery, DecryptionServicePublicKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DecryptionServicePublicKeyQuery, DecryptionServicePublicKeyQueryVariables>(DecryptionServicePublicKeyDocument, options);
        }
export type DecryptionServicePublicKeyQueryHookResult = ReturnType<typeof useDecryptionServicePublicKeyQuery>;
export type DecryptionServicePublicKeyLazyQueryHookResult = ReturnType<typeof useDecryptionServicePublicKeyLazyQuery>;
export type DecryptionServicePublicKeyQueryResult = Apollo.useQuery.Result<DecryptionServicePublicKeyQuery, DecryptionServicePublicKeyQueryVariables>;
export const GetAttachmentsDocument = /*#__PURE__*/ gql`
    query getAttachments($ids: [String]!) {
  attachments(ids: $ids) {
    ...Attachment
  }
}
    ${AttachmentFragmentDoc}`;

/**
 * __useGetAttachmentsQuery__
 *
 * To run a query within a React component, call `useGetAttachmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttachmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttachmentsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetAttachmentsQuery(baseOptions: Apollo.useQuery.Options<GetAttachmentsQuery, GetAttachmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttachmentsQuery, GetAttachmentsQueryVariables>(GetAttachmentsDocument, options);
      }
export function useGetAttachmentsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAttachmentsQuery, GetAttachmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttachmentsQuery, GetAttachmentsQueryVariables>(GetAttachmentsDocument, options);
        }
export type GetAttachmentsQueryHookResult = ReturnType<typeof useGetAttachmentsQuery>;
export type GetAttachmentsLazyQueryHookResult = ReturnType<typeof useGetAttachmentsLazyQuery>;
export type GetAttachmentsQueryResult = Apollo.useQuery.Result<GetAttachmentsQuery, GetAttachmentsQueryVariables>;
export const SendFeedbackDocument = /*#__PURE__*/ gql`
    mutation sendFeedback($request: SendFeedbackRequest!) {
  sendFeedback(request: $request)
}
    `;
export type SendFeedbackMutationFn = Apollo.useMutation.MutationFunction<SendFeedbackMutation, SendFeedbackMutationVariables>;

/**
 * __useSendFeedbackMutation__
 *
 * To run a mutation, you first call `useSendFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFeedbackMutation, { data, loading, error }] = useSendFeedbackMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSendFeedbackMutation(baseOptions?: Apollo.useMutation.Options<SendFeedbackMutation, SendFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFeedbackMutation, SendFeedbackMutationVariables>(SendFeedbackDocument, options);
      }
export type SendFeedbackMutationHookResult = ReturnType<typeof useSendFeedbackMutation>;
export type SendFeedbackMutationResult = Apollo.useMutation.Result<SendFeedbackMutation>;
export type SendFeedbackMutationOptions = Apollo.useMutation.Options<SendFeedbackMutation, SendFeedbackMutationVariables>;
export const GetNumUnreadDocument = /*#__PURE__*/ gql`
    query getNumUnread($label: String!) {
  unread(label: $label)
}
    `;

/**
 * __useGetNumUnreadQuery__
 *
 * To run a query within a React component, call `useGetNumUnreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumUnreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumUnreadQuery({
 *   variables: {
 *      label: // value for 'label'
 *   },
 * });
 */
export function useGetNumUnreadQuery(baseOptions: Apollo.useQuery.Options<GetNumUnreadQuery, GetNumUnreadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumUnreadQuery, GetNumUnreadQueryVariables>(GetNumUnreadDocument, options);
      }
export function useGetNumUnreadLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetNumUnreadQuery, GetNumUnreadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumUnreadQuery, GetNumUnreadQueryVariables>(GetNumUnreadDocument, options);
        }
export type GetNumUnreadQueryHookResult = ReturnType<typeof useGetNumUnreadQuery>;
export type GetNumUnreadLazyQueryHookResult = ReturnType<typeof useGetNumUnreadLazyQuery>;
export type GetNumUnreadQueryResult = Apollo.useQuery.Result<GetNumUnreadQuery, GetNumUnreadQueryVariables>;
export const GetNumUnreadAllLabelsDocument = /*#__PURE__*/ gql`
    query getNumUnreadAllLabels($labels: [String!]!) {
  unreadAllLabels(labels: $labels) {
    label
    count
  }
}
    `;

/**
 * __useGetNumUnreadAllLabelsQuery__
 *
 * To run a query within a React component, call `useGetNumUnreadAllLabelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumUnreadAllLabelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumUnreadAllLabelsQuery({
 *   variables: {
 *      labels: // value for 'labels'
 *   },
 * });
 */
export function useGetNumUnreadAllLabelsQuery(baseOptions: Apollo.useQuery.Options<GetNumUnreadAllLabelsQuery, GetNumUnreadAllLabelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumUnreadAllLabelsQuery, GetNumUnreadAllLabelsQueryVariables>(GetNumUnreadAllLabelsDocument, options);
      }
export function useGetNumUnreadAllLabelsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetNumUnreadAllLabelsQuery, GetNumUnreadAllLabelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumUnreadAllLabelsQuery, GetNumUnreadAllLabelsQueryVariables>(GetNumUnreadAllLabelsDocument, options);
        }
export type GetNumUnreadAllLabelsQueryHookResult = ReturnType<typeof useGetNumUnreadAllLabelsQuery>;
export type GetNumUnreadAllLabelsLazyQueryHookResult = ReturnType<typeof useGetNumUnreadAllLabelsLazyQuery>;
export type GetNumUnreadAllLabelsQueryResult = Apollo.useQuery.Result<GetNumUnreadAllLabelsQuery, GetNumUnreadAllLabelsQueryVariables>;
export const BlockEmailAddressDocument = /*#__PURE__*/ gql`
    mutation blockEmailAddress($request: BlockEmailAddressRequest!) {
  blockEmailAddress(request: $request)
}
    `;
export type BlockEmailAddressMutationFn = Apollo.useMutation.MutationFunction<BlockEmailAddressMutation, BlockEmailAddressMutationVariables>;

/**
 * __useBlockEmailAddressMutation__
 *
 * To run a mutation, you first call `useBlockEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockEmailAddressMutation, { data, loading, error }] = useBlockEmailAddressMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBlockEmailAddressMutation(baseOptions?: Apollo.useMutation.Options<BlockEmailAddressMutation, BlockEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockEmailAddressMutation, BlockEmailAddressMutationVariables>(BlockEmailAddressDocument, options);
      }
export type BlockEmailAddressMutationHookResult = ReturnType<typeof useBlockEmailAddressMutation>;
export type BlockEmailAddressMutationResult = Apollo.useMutation.Result<BlockEmailAddressMutation>;
export type BlockEmailAddressMutationOptions = Apollo.useMutation.Options<BlockEmailAddressMutation, BlockEmailAddressMutationVariables>;
export const UnblockEmailAddressDocument = /*#__PURE__*/ gql`
    mutation unblockEmailAddress($request: UnblockEmailAddressRequest!) {
  unblockEmailAddress(request: $request)
}
    `;
export type UnblockEmailAddressMutationFn = Apollo.useMutation.MutationFunction<UnblockEmailAddressMutation, UnblockEmailAddressMutationVariables>;

/**
 * __useUnblockEmailAddressMutation__
 *
 * To run a mutation, you first call `useUnblockEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockEmailAddressMutation, { data, loading, error }] = useUnblockEmailAddressMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnblockEmailAddressMutation(baseOptions?: Apollo.useMutation.Options<UnblockEmailAddressMutation, UnblockEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockEmailAddressMutation, UnblockEmailAddressMutationVariables>(UnblockEmailAddressDocument, options);
      }
export type UnblockEmailAddressMutationHookResult = ReturnType<typeof useUnblockEmailAddressMutation>;
export type UnblockEmailAddressMutationResult = Apollo.useMutation.Result<UnblockEmailAddressMutation>;
export type UnblockEmailAddressMutationOptions = Apollo.useMutation.Options<UnblockEmailAddressMutation, UnblockEmailAddressMutationVariables>;
export const IsBlockedDocument = /*#__PURE__*/ gql`
    query isBlocked($senderAddress: String!) {
  isBlocked(senderAddress: $senderAddress)
}
    `;

/**
 * __useIsBlockedQuery__
 *
 * To run a query within a React component, call `useIsBlockedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsBlockedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsBlockedQuery({
 *   variables: {
 *      senderAddress: // value for 'senderAddress'
 *   },
 * });
 */
export function useIsBlockedQuery(baseOptions: Apollo.useQuery.Options<IsBlockedQuery, IsBlockedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsBlockedQuery, IsBlockedQueryVariables>(IsBlockedDocument, options);
      }
export function useIsBlockedLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<IsBlockedQuery, IsBlockedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsBlockedQuery, IsBlockedQueryVariables>(IsBlockedDocument, options);
        }
export type IsBlockedQueryHookResult = ReturnType<typeof useIsBlockedQuery>;
export type IsBlockedLazyQueryHookResult = ReturnType<typeof useIsBlockedLazyQuery>;
export type IsBlockedQueryResult = Apollo.useQuery.Result<IsBlockedQuery, IsBlockedQueryVariables>;
export const IsCustomDomainDocument = /*#__PURE__*/ gql`
    query isCustomDomain($domains: [String!]!) {
  isCustomDomain(domains: $domains)
}
    `;

/**
 * __useIsCustomDomainQuery__
 *
 * To run a query within a React component, call `useIsCustomDomainQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsCustomDomainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsCustomDomainQuery({
 *   variables: {
 *      domains: // value for 'domains'
 *   },
 * });
 */
export function useIsCustomDomainQuery(baseOptions: Apollo.useQuery.Options<IsCustomDomainQuery, IsCustomDomainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsCustomDomainQuery, IsCustomDomainQueryVariables>(IsCustomDomainDocument, options);
      }
export function useIsCustomDomainLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<IsCustomDomainQuery, IsCustomDomainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsCustomDomainQuery, IsCustomDomainQueryVariables>(IsCustomDomainDocument, options);
        }
export type IsCustomDomainQueryHookResult = ReturnType<typeof useIsCustomDomainQuery>;
export type IsCustomDomainLazyQueryHookResult = ReturnType<typeof useIsCustomDomainLazyQuery>;
export type IsCustomDomainQueryResult = Apollo.useQuery.Result<IsCustomDomainQuery, IsCustomDomainQueryVariables>;
export const VerifyWalletAddressCreateAliasDocument = /*#__PURE__*/ gql`
    mutation verifyWalletAddressCreateAlias($request: VerifyWalletAddressCreateAliasRequest!) {
  verifyWalletAddressCreateAlias(request: $request) {
    emailAliases
  }
}
    `;
export type VerifyWalletAddressCreateAliasMutationFn = Apollo.useMutation.MutationFunction<VerifyWalletAddressCreateAliasMutation, VerifyWalletAddressCreateAliasMutationVariables>;

/**
 * __useVerifyWalletAddressCreateAliasMutation__
 *
 * To run a mutation, you first call `useVerifyWalletAddressCreateAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyWalletAddressCreateAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyWalletAddressCreateAliasMutation, { data, loading, error }] = useVerifyWalletAddressCreateAliasMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useVerifyWalletAddressCreateAliasMutation(baseOptions?: Apollo.useMutation.Options<VerifyWalletAddressCreateAliasMutation, VerifyWalletAddressCreateAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyWalletAddressCreateAliasMutation, VerifyWalletAddressCreateAliasMutationVariables>(VerifyWalletAddressCreateAliasDocument, options);
      }
export type VerifyWalletAddressCreateAliasMutationHookResult = ReturnType<typeof useVerifyWalletAddressCreateAliasMutation>;
export type VerifyWalletAddressCreateAliasMutationResult = Apollo.useMutation.Result<VerifyWalletAddressCreateAliasMutation>;
export type VerifyWalletAddressCreateAliasMutationOptions = Apollo.useMutation.Options<VerifyWalletAddressCreateAliasMutation, VerifyWalletAddressCreateAliasMutationVariables>;
export const DeleteThreadDocument = /*#__PURE__*/ gql`
    mutation deleteThread($request: DeleteThreadRequest!) {
  deleteThread(request: $request)
}
    `;
export type DeleteThreadMutationFn = Apollo.useMutation.MutationFunction<DeleteThreadMutation, DeleteThreadMutationVariables>;

/**
 * __useDeleteThreadMutation__
 *
 * To run a mutation, you first call `useDeleteThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThreadMutation, { data, loading, error }] = useDeleteThreadMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteThreadMutation(baseOptions?: Apollo.useMutation.Options<DeleteThreadMutation, DeleteThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteThreadMutation, DeleteThreadMutationVariables>(DeleteThreadDocument, options);
      }
export type DeleteThreadMutationHookResult = ReturnType<typeof useDeleteThreadMutation>;
export type DeleteThreadMutationResult = Apollo.useMutation.Result<DeleteThreadMutation>;
export type DeleteThreadMutationOptions = Apollo.useMutation.Options<DeleteThreadMutation, DeleteThreadMutationVariables>;
export const BulkDeleteTrashedThreadsDocument = /*#__PURE__*/ gql`
    mutation bulkDeleteTrashedThreads {
  bulkDeleteTrashedThreads {
    jobID
  }
}
    `;
export type BulkDeleteTrashedThreadsMutationFn = Apollo.useMutation.MutationFunction<BulkDeleteTrashedThreadsMutation, BulkDeleteTrashedThreadsMutationVariables>;

/**
 * __useBulkDeleteTrashedThreadsMutation__
 *
 * To run a mutation, you first call `useBulkDeleteTrashedThreadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteTrashedThreadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkDeleteTrashedThreadsMutation, { data, loading, error }] = useBulkDeleteTrashedThreadsMutation({
 *   variables: {
 *   },
 * });
 */
export function useBulkDeleteTrashedThreadsMutation(baseOptions?: Apollo.useMutation.Options<BulkDeleteTrashedThreadsMutation, BulkDeleteTrashedThreadsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkDeleteTrashedThreadsMutation, BulkDeleteTrashedThreadsMutationVariables>(BulkDeleteTrashedThreadsDocument, options);
      }
export type BulkDeleteTrashedThreadsMutationHookResult = ReturnType<typeof useBulkDeleteTrashedThreadsMutation>;
export type BulkDeleteTrashedThreadsMutationResult = Apollo.useMutation.Result<BulkDeleteTrashedThreadsMutation>;
export type BulkDeleteTrashedThreadsMutationOptions = Apollo.useMutation.Options<BulkDeleteTrashedThreadsMutation, BulkDeleteTrashedThreadsMutationVariables>;
export const GetBulkActionJobStatusDocument = /*#__PURE__*/ gql`
    query getBulkActionJobStatus($request: BulkActionJobStatusRequest!) {
  bulkActionJobStatus(request: $request) {
    jobStatus
    completed
  }
}
    `;

/**
 * __useGetBulkActionJobStatusQuery__
 *
 * To run a query within a React component, call `useGetBulkActionJobStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBulkActionJobStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBulkActionJobStatusQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetBulkActionJobStatusQuery(baseOptions: Apollo.useQuery.Options<GetBulkActionJobStatusQuery, GetBulkActionJobStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBulkActionJobStatusQuery, GetBulkActionJobStatusQueryVariables>(GetBulkActionJobStatusDocument, options);
      }
export function useGetBulkActionJobStatusLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetBulkActionJobStatusQuery, GetBulkActionJobStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBulkActionJobStatusQuery, GetBulkActionJobStatusQueryVariables>(GetBulkActionJobStatusDocument, options);
        }
export type GetBulkActionJobStatusQueryHookResult = ReturnType<typeof useGetBulkActionJobStatusQuery>;
export type GetBulkActionJobStatusLazyQueryHookResult = ReturnType<typeof useGetBulkActionJobStatusLazyQuery>;
export type GetBulkActionJobStatusQueryResult = Apollo.useQuery.Result<GetBulkActionJobStatusQuery, GetBulkActionJobStatusQueryVariables>;
export const SetPushTokenDocument = /*#__PURE__*/ gql`
    mutation setPushToken($request: SetPushTokenRequest!) {
  setPushToken(request: $request)
}
    `;
export type SetPushTokenMutationFn = Apollo.useMutation.MutationFunction<SetPushTokenMutation, SetPushTokenMutationVariables>;

/**
 * __useSetPushTokenMutation__
 *
 * To run a mutation, you first call `useSetPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPushTokenMutation, { data, loading, error }] = useSetPushTokenMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetPushTokenMutation(baseOptions?: Apollo.useMutation.Options<SetPushTokenMutation, SetPushTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPushTokenMutation, SetPushTokenMutationVariables>(SetPushTokenDocument, options);
      }
export type SetPushTokenMutationHookResult = ReturnType<typeof useSetPushTokenMutation>;
export type SetPushTokenMutationResult = Apollo.useMutation.Result<SetPushTokenMutation>;
export type SetPushTokenMutationOptions = Apollo.useMutation.Options<SetPushTokenMutation, SetPushTokenMutationVariables>;
export const UnsetPushTokenDocument = /*#__PURE__*/ gql`
    mutation unsetPushToken($request: UnsetPushTokenRequest!) {
  unsetPushToken(request: $request)
}
    `;
export type UnsetPushTokenMutationFn = Apollo.useMutation.MutationFunction<UnsetPushTokenMutation, UnsetPushTokenMutationVariables>;

/**
 * __useUnsetPushTokenMutation__
 *
 * To run a mutation, you first call `useUnsetPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsetPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsetPushTokenMutation, { data, loading, error }] = useUnsetPushTokenMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnsetPushTokenMutation(baseOptions?: Apollo.useMutation.Options<UnsetPushTokenMutation, UnsetPushTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsetPushTokenMutation, UnsetPushTokenMutationVariables>(UnsetPushTokenDocument, options);
      }
export type UnsetPushTokenMutationHookResult = ReturnType<typeof useUnsetPushTokenMutation>;
export type UnsetPushTokenMutationResult = Apollo.useMutation.Result<UnsetPushTokenMutation>;
export type UnsetPushTokenMutationOptions = Apollo.useMutation.Options<UnsetPushTokenMutation, UnsetPushTokenMutationVariables>;
export const GetEnsNameDocument = /*#__PURE__*/ gql`
    query getENSName($ethereumAddress: String!) {
  getENSName(ethereumAddress: $ethereumAddress)
}
    `;

/**
 * __useGetEnsNameQuery__
 *
 * To run a query within a React component, call `useGetEnsNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnsNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnsNameQuery({
 *   variables: {
 *      ethereumAddress: // value for 'ethereumAddress'
 *   },
 * });
 */
export function useGetEnsNameQuery(baseOptions: Apollo.useQuery.Options<GetEnsNameQuery, GetEnsNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEnsNameQuery, GetEnsNameQueryVariables>(GetEnsNameDocument, options);
      }
export function useGetEnsNameLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetEnsNameQuery, GetEnsNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEnsNameQuery, GetEnsNameQueryVariables>(GetEnsNameDocument, options);
        }
export type GetEnsNameQueryHookResult = ReturnType<typeof useGetEnsNameQuery>;
export type GetEnsNameLazyQueryHookResult = ReturnType<typeof useGetEnsNameLazyQuery>;
export type GetEnsNameQueryResult = Apollo.useQuery.Result<GetEnsNameQuery, GetEnsNameQueryVariables>;
export const GetBonfidaNamesDocument = /*#__PURE__*/ gql`
    query getBonfidaNames($solanaAddress: String!) {
  getBonfidaNames(solanaAddress: $solanaAddress)
}
    `;

/**
 * __useGetBonfidaNamesQuery__
 *
 * To run a query within a React component, call `useGetBonfidaNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBonfidaNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBonfidaNamesQuery({
 *   variables: {
 *      solanaAddress: // value for 'solanaAddress'
 *   },
 * });
 */
export function useGetBonfidaNamesQuery(baseOptions: Apollo.useQuery.Options<GetBonfidaNamesQuery, GetBonfidaNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBonfidaNamesQuery, GetBonfidaNamesQueryVariables>(GetBonfidaNamesDocument, options);
      }
export function useGetBonfidaNamesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetBonfidaNamesQuery, GetBonfidaNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBonfidaNamesQuery, GetBonfidaNamesQueryVariables>(GetBonfidaNamesDocument, options);
        }
export type GetBonfidaNamesQueryHookResult = ReturnType<typeof useGetBonfidaNamesQuery>;
export type GetBonfidaNamesLazyQueryHookResult = ReturnType<typeof useGetBonfidaNamesLazyQuery>;
export type GetBonfidaNamesQueryResult = Apollo.useQuery.Result<GetBonfidaNamesQuery, GetBonfidaNamesQueryVariables>;
export const SetCatchallAddressDocument = /*#__PURE__*/ gql`
    mutation setCatchallAddress($request: SetCatchallAddressRequest!) {
  setCatchallAddress(request: $request)
}
    `;
export type SetCatchallAddressMutationFn = Apollo.useMutation.MutationFunction<SetCatchallAddressMutation, SetCatchallAddressMutationVariables>;

/**
 * __useSetCatchallAddressMutation__
 *
 * To run a mutation, you first call `useSetCatchallAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetCatchallAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setCatchallAddressMutation, { data, loading, error }] = useSetCatchallAddressMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetCatchallAddressMutation(baseOptions?: Apollo.useMutation.Options<SetCatchallAddressMutation, SetCatchallAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetCatchallAddressMutation, SetCatchallAddressMutationVariables>(SetCatchallAddressDocument, options);
      }
export type SetCatchallAddressMutationHookResult = ReturnType<typeof useSetCatchallAddressMutation>;
export type SetCatchallAddressMutationResult = Apollo.useMutation.Result<SetCatchallAddressMutation>;
export type SetCatchallAddressMutationOptions = Apollo.useMutation.Options<SetCatchallAddressMutation, SetCatchallAddressMutationVariables>;
export const GetAliasesOnDomainDocument = /*#__PURE__*/ gql`
    query getAliasesOnDomain($domainID: String!) {
  getAliasesOnDomain(domainID: $domainID) {
    domainAliases {
      emailAlias
      displayEmailAlias
      isCatchall
    }
  }
}
    `;

/**
 * __useGetAliasesOnDomainQuery__
 *
 * To run a query within a React component, call `useGetAliasesOnDomainQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAliasesOnDomainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAliasesOnDomainQuery({
 *   variables: {
 *      domainID: // value for 'domainID'
 *   },
 * });
 */
export function useGetAliasesOnDomainQuery(baseOptions: Apollo.useQuery.Options<GetAliasesOnDomainQuery, GetAliasesOnDomainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAliasesOnDomainQuery, GetAliasesOnDomainQueryVariables>(GetAliasesOnDomainDocument, options);
      }
export function useGetAliasesOnDomainLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAliasesOnDomainQuery, GetAliasesOnDomainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAliasesOnDomainQuery, GetAliasesOnDomainQueryVariables>(GetAliasesOnDomainDocument, options);
        }
export type GetAliasesOnDomainQueryHookResult = ReturnType<typeof useGetAliasesOnDomainQuery>;
export type GetAliasesOnDomainLazyQueryHookResult = ReturnType<typeof useGetAliasesOnDomainLazyQuery>;
export type GetAliasesOnDomainQueryResult = Apollo.useQuery.Result<GetAliasesOnDomainQuery, GetAliasesOnDomainQueryVariables>;
export const CreateMailFilterDocument = /*#__PURE__*/ gql`
    mutation createMailFilter($request: CreateMailFilterInput!) {
  createMailFilter(input: $request)
}
    `;
export type CreateMailFilterMutationFn = Apollo.useMutation.MutationFunction<CreateMailFilterMutation, CreateMailFilterMutationVariables>;

/**
 * __useCreateMailFilterMutation__
 *
 * To run a mutation, you first call `useCreateMailFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMailFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMailFilterMutation, { data, loading, error }] = useCreateMailFilterMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateMailFilterMutation(baseOptions?: Apollo.useMutation.Options<CreateMailFilterMutation, CreateMailFilterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMailFilterMutation, CreateMailFilterMutationVariables>(CreateMailFilterDocument, options);
      }
export type CreateMailFilterMutationHookResult = ReturnType<typeof useCreateMailFilterMutation>;
export type CreateMailFilterMutationResult = Apollo.useMutation.Result<CreateMailFilterMutation>;
export type CreateMailFilterMutationOptions = Apollo.useMutation.Options<CreateMailFilterMutation, CreateMailFilterMutationVariables>;
export const UpdateMailFilterDocument = /*#__PURE__*/ gql`
    mutation updateMailFilter($request: UpdateMailFilterInput!) {
  updateMailFilter(input: $request)
}
    `;
export type UpdateMailFilterMutationFn = Apollo.useMutation.MutationFunction<UpdateMailFilterMutation, UpdateMailFilterMutationVariables>;

/**
 * __useUpdateMailFilterMutation__
 *
 * To run a mutation, you first call `useUpdateMailFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMailFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMailFilterMutation, { data, loading, error }] = useUpdateMailFilterMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateMailFilterMutation(baseOptions?: Apollo.useMutation.Options<UpdateMailFilterMutation, UpdateMailFilterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMailFilterMutation, UpdateMailFilterMutationVariables>(UpdateMailFilterDocument, options);
      }
export type UpdateMailFilterMutationHookResult = ReturnType<typeof useUpdateMailFilterMutation>;
export type UpdateMailFilterMutationResult = Apollo.useMutation.Result<UpdateMailFilterMutation>;
export type UpdateMailFilterMutationOptions = Apollo.useMutation.Options<UpdateMailFilterMutation, UpdateMailFilterMutationVariables>;
export const DeleteMailFilterDocument = /*#__PURE__*/ gql`
    mutation deleteMailFilter($request: DeleteMailFilterInput!) {
  deleteMailFilter(input: $request)
}
    `;
export type DeleteMailFilterMutationFn = Apollo.useMutation.MutationFunction<DeleteMailFilterMutation, DeleteMailFilterMutationVariables>;

/**
 * __useDeleteMailFilterMutation__
 *
 * To run a mutation, you first call `useDeleteMailFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMailFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMailFilterMutation, { data, loading, error }] = useDeleteMailFilterMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteMailFilterMutation(baseOptions?: Apollo.useMutation.Options<DeleteMailFilterMutation, DeleteMailFilterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMailFilterMutation, DeleteMailFilterMutationVariables>(DeleteMailFilterDocument, options);
      }
export type DeleteMailFilterMutationHookResult = ReturnType<typeof useDeleteMailFilterMutation>;
export type DeleteMailFilterMutationResult = Apollo.useMutation.Result<DeleteMailFilterMutation>;
export type DeleteMailFilterMutationOptions = Apollo.useMutation.Options<DeleteMailFilterMutation, DeleteMailFilterMutationVariables>;
export const MarkThreadsAsClientsideFilteredDocument = /*#__PURE__*/ gql`
    mutation markThreadsAsClientsideFiltered($request: MarkThreadsAsClientsideFilteredInput!) {
  markThreadsAsClientsideFiltered(input: $request)
}
    `;
export type MarkThreadsAsClientsideFilteredMutationFn = Apollo.useMutation.MutationFunction<MarkThreadsAsClientsideFilteredMutation, MarkThreadsAsClientsideFilteredMutationVariables>;

/**
 * __useMarkThreadsAsClientsideFilteredMutation__
 *
 * To run a mutation, you first call `useMarkThreadsAsClientsideFilteredMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkThreadsAsClientsideFilteredMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markThreadsAsClientsideFilteredMutation, { data, loading, error }] = useMarkThreadsAsClientsideFilteredMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMarkThreadsAsClientsideFilteredMutation(baseOptions?: Apollo.useMutation.Options<MarkThreadsAsClientsideFilteredMutation, MarkThreadsAsClientsideFilteredMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkThreadsAsClientsideFilteredMutation, MarkThreadsAsClientsideFilteredMutationVariables>(MarkThreadsAsClientsideFilteredDocument, options);
      }
export type MarkThreadsAsClientsideFilteredMutationHookResult = ReturnType<typeof useMarkThreadsAsClientsideFilteredMutation>;
export type MarkThreadsAsClientsideFilteredMutationResult = Apollo.useMutation.Result<MarkThreadsAsClientsideFilteredMutation>;
export type MarkThreadsAsClientsideFilteredMutationOptions = Apollo.useMutation.Options<MarkThreadsAsClientsideFilteredMutation, MarkThreadsAsClientsideFilteredMutationVariables>;
export const SilenceMultipleEmailAddressesDocument = /*#__PURE__*/ gql`
    mutation silenceMultipleEmailAddresses($request: SilenceMultipleEmailAddressesRequest!) {
  silenceMultipleEmailAddresses(request: $request)
}
    `;
export type SilenceMultipleEmailAddressesMutationFn = Apollo.useMutation.MutationFunction<SilenceMultipleEmailAddressesMutation, SilenceMultipleEmailAddressesMutationVariables>;

/**
 * __useSilenceMultipleEmailAddressesMutation__
 *
 * To run a mutation, you first call `useSilenceMultipleEmailAddressesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSilenceMultipleEmailAddressesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [silenceMultipleEmailAddressesMutation, { data, loading, error }] = useSilenceMultipleEmailAddressesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSilenceMultipleEmailAddressesMutation(baseOptions?: Apollo.useMutation.Options<SilenceMultipleEmailAddressesMutation, SilenceMultipleEmailAddressesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SilenceMultipleEmailAddressesMutation, SilenceMultipleEmailAddressesMutationVariables>(SilenceMultipleEmailAddressesDocument, options);
      }
export type SilenceMultipleEmailAddressesMutationHookResult = ReturnType<typeof useSilenceMultipleEmailAddressesMutation>;
export type SilenceMultipleEmailAddressesMutationResult = Apollo.useMutation.Result<SilenceMultipleEmailAddressesMutation>;
export type SilenceMultipleEmailAddressesMutationOptions = Apollo.useMutation.Options<SilenceMultipleEmailAddressesMutation, SilenceMultipleEmailAddressesMutationVariables>;
export const MarkSpamMultipleEmailAddressesDocument = /*#__PURE__*/ gql`
    mutation markSpamMultipleEmailAddresses($request: MarkSpamMultipleEmailAddressesRequest!) {
  markSpamMultipleEmailAddresses(request: $request)
}
    `;
export type MarkSpamMultipleEmailAddressesMutationFn = Apollo.useMutation.MutationFunction<MarkSpamMultipleEmailAddressesMutation, MarkSpamMultipleEmailAddressesMutationVariables>;

/**
 * __useMarkSpamMultipleEmailAddressesMutation__
 *
 * To run a mutation, you first call `useMarkSpamMultipleEmailAddressesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkSpamMultipleEmailAddressesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markSpamMultipleEmailAddressesMutation, { data, loading, error }] = useMarkSpamMultipleEmailAddressesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMarkSpamMultipleEmailAddressesMutation(baseOptions?: Apollo.useMutation.Options<MarkSpamMultipleEmailAddressesMutation, MarkSpamMultipleEmailAddressesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkSpamMultipleEmailAddressesMutation, MarkSpamMultipleEmailAddressesMutationVariables>(MarkSpamMultipleEmailAddressesDocument, options);
      }
export type MarkSpamMultipleEmailAddressesMutationHookResult = ReturnType<typeof useMarkSpamMultipleEmailAddressesMutation>;
export type MarkSpamMultipleEmailAddressesMutationResult = Apollo.useMutation.Result<MarkSpamMultipleEmailAddressesMutation>;
export type MarkSpamMultipleEmailAddressesMutationOptions = Apollo.useMutation.Options<MarkSpamMultipleEmailAddressesMutation, MarkSpamMultipleEmailAddressesMutationVariables>;
export const MarkNotSpamMultipleEmailAddressesDocument = /*#__PURE__*/ gql`
    mutation markNotSpamMultipleEmailAddresses($request: MarkNotSpamMultipleEmailAddressesRequest!) {
  markNotSpamMultipleEmailAddresses(request: $request)
}
    `;
export type MarkNotSpamMultipleEmailAddressesMutationFn = Apollo.useMutation.MutationFunction<MarkNotSpamMultipleEmailAddressesMutation, MarkNotSpamMultipleEmailAddressesMutationVariables>;

/**
 * __useMarkNotSpamMultipleEmailAddressesMutation__
 *
 * To run a mutation, you first call `useMarkNotSpamMultipleEmailAddressesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotSpamMultipleEmailAddressesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotSpamMultipleEmailAddressesMutation, { data, loading, error }] = useMarkNotSpamMultipleEmailAddressesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMarkNotSpamMultipleEmailAddressesMutation(baseOptions?: Apollo.useMutation.Options<MarkNotSpamMultipleEmailAddressesMutation, MarkNotSpamMultipleEmailAddressesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotSpamMultipleEmailAddressesMutation, MarkNotSpamMultipleEmailAddressesMutationVariables>(MarkNotSpamMultipleEmailAddressesDocument, options);
      }
export type MarkNotSpamMultipleEmailAddressesMutationHookResult = ReturnType<typeof useMarkNotSpamMultipleEmailAddressesMutation>;
export type MarkNotSpamMultipleEmailAddressesMutationResult = Apollo.useMutation.Result<MarkNotSpamMultipleEmailAddressesMutation>;
export type MarkNotSpamMultipleEmailAddressesMutationOptions = Apollo.useMutation.Options<MarkNotSpamMultipleEmailAddressesMutation, MarkNotSpamMultipleEmailAddressesMutationVariables>;
export const BulkTrashDocument = /*#__PURE__*/ gql`
    mutation bulkTrash($request: BulkTrashRequest!) {
  bulkTrash(request: $request) {
    jobID
  }
}
    `;
export type BulkTrashMutationFn = Apollo.useMutation.MutationFunction<BulkTrashMutation, BulkTrashMutationVariables>;

/**
 * __useBulkTrashMutation__
 *
 * To run a mutation, you first call `useBulkTrashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkTrashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkTrashMutation, { data, loading, error }] = useBulkTrashMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBulkTrashMutation(baseOptions?: Apollo.useMutation.Options<BulkTrashMutation, BulkTrashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkTrashMutation, BulkTrashMutationVariables>(BulkTrashDocument, options);
      }
export type BulkTrashMutationHookResult = ReturnType<typeof useBulkTrashMutation>;
export type BulkTrashMutationResult = Apollo.useMutation.Result<BulkTrashMutation>;
export type BulkTrashMutationOptions = Apollo.useMutation.Options<BulkTrashMutation, BulkTrashMutationVariables>;
export const MarkThreadAsOpenedDocument = /*#__PURE__*/ gql`
    mutation markThreadAsOpened($request: MarkThreadAsOpenedInput!) {
  markThreadAsOpened(request: $request)
}
    `;
export type MarkThreadAsOpenedMutationFn = Apollo.useMutation.MutationFunction<MarkThreadAsOpenedMutation, MarkThreadAsOpenedMutationVariables>;

/**
 * __useMarkThreadAsOpenedMutation__
 *
 * To run a mutation, you first call `useMarkThreadAsOpenedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkThreadAsOpenedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markThreadAsOpenedMutation, { data, loading, error }] = useMarkThreadAsOpenedMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMarkThreadAsOpenedMutation(baseOptions?: Apollo.useMutation.Options<MarkThreadAsOpenedMutation, MarkThreadAsOpenedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkThreadAsOpenedMutation, MarkThreadAsOpenedMutationVariables>(MarkThreadAsOpenedDocument, options);
      }
export type MarkThreadAsOpenedMutationHookResult = ReturnType<typeof useMarkThreadAsOpenedMutation>;
export type MarkThreadAsOpenedMutationResult = Apollo.useMutation.Result<MarkThreadAsOpenedMutation>;
export type MarkThreadAsOpenedMutationOptions = Apollo.useMutation.Options<MarkThreadAsOpenedMutation, MarkThreadAsOpenedMutationVariables>;
export const MuteNotificationForSenderDocument = /*#__PURE__*/ gql`
    mutation muteNotificationForSender($request: MuteNotificationForSenderRequest!) {
  muteNotificationForSender(request: $request)
}
    `;
export type MuteNotificationForSenderMutationFn = Apollo.useMutation.MutationFunction<MuteNotificationForSenderMutation, MuteNotificationForSenderMutationVariables>;

/**
 * __useMuteNotificationForSenderMutation__
 *
 * To run a mutation, you first call `useMuteNotificationForSenderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMuteNotificationForSenderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [muteNotificationForSenderMutation, { data, loading, error }] = useMuteNotificationForSenderMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMuteNotificationForSenderMutation(baseOptions?: Apollo.useMutation.Options<MuteNotificationForSenderMutation, MuteNotificationForSenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MuteNotificationForSenderMutation, MuteNotificationForSenderMutationVariables>(MuteNotificationForSenderDocument, options);
      }
export type MuteNotificationForSenderMutationHookResult = ReturnType<typeof useMuteNotificationForSenderMutation>;
export type MuteNotificationForSenderMutationResult = Apollo.useMutation.Result<MuteNotificationForSenderMutation>;
export type MuteNotificationForSenderMutationOptions = Apollo.useMutation.Options<MuteNotificationForSenderMutation, MuteNotificationForSenderMutationVariables>;
export const UnmuteNotificationForSenderDocument = /*#__PURE__*/ gql`
    mutation unmuteNotificationForSender($request: UnmuteNotificationForSenderRequest!) {
  unmuteNotificationForSender(request: $request)
}
    `;
export type UnmuteNotificationForSenderMutationFn = Apollo.useMutation.MutationFunction<UnmuteNotificationForSenderMutation, UnmuteNotificationForSenderMutationVariables>;

/**
 * __useUnmuteNotificationForSenderMutation__
 *
 * To run a mutation, you first call `useUnmuteNotificationForSenderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnmuteNotificationForSenderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unmuteNotificationForSenderMutation, { data, loading, error }] = useUnmuteNotificationForSenderMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnmuteNotificationForSenderMutation(baseOptions?: Apollo.useMutation.Options<UnmuteNotificationForSenderMutation, UnmuteNotificationForSenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnmuteNotificationForSenderMutation, UnmuteNotificationForSenderMutationVariables>(UnmuteNotificationForSenderDocument, options);
      }
export type UnmuteNotificationForSenderMutationHookResult = ReturnType<typeof useUnmuteNotificationForSenderMutation>;
export type UnmuteNotificationForSenderMutationResult = Apollo.useMutation.Result<UnmuteNotificationForSenderMutation>;
export type UnmuteNotificationForSenderMutationOptions = Apollo.useMutation.Options<UnmuteNotificationForSenderMutation, UnmuteNotificationForSenderMutationVariables>;
export const ImportEmlEmailDocument = /*#__PURE__*/ gql`
    mutation importEmlEmail($importRequest: ImportEmlEmailRequest!) {
  importEmlEmail(importRequest: $importRequest)
}
    `;
export type ImportEmlEmailMutationFn = Apollo.useMutation.MutationFunction<ImportEmlEmailMutation, ImportEmlEmailMutationVariables>;

/**
 * __useImportEmlEmailMutation__
 *
 * To run a mutation, you first call `useImportEmlEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportEmlEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importEmlEmailMutation, { data, loading, error }] = useImportEmlEmailMutation({
 *   variables: {
 *      importRequest: // value for 'importRequest'
 *   },
 * });
 */
export function useImportEmlEmailMutation(baseOptions?: Apollo.useMutation.Options<ImportEmlEmailMutation, ImportEmlEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportEmlEmailMutation, ImportEmlEmailMutationVariables>(ImportEmlEmailDocument, options);
      }
export type ImportEmlEmailMutationHookResult = ReturnType<typeof useImportEmlEmailMutation>;
export type ImportEmlEmailMutationResult = Apollo.useMutation.Result<ImportEmlEmailMutation>;
export type ImportEmlEmailMutationOptions = Apollo.useMutation.Options<ImportEmlEmailMutation, ImportEmlEmailMutationVariables>;
export const ImportMboxEmailsDocument = /*#__PURE__*/ gql`
    mutation importMboxEmails($importMboxRequest: ImportMboxRequest!) {
  importMboxEmails(importMboxRequest: $importMboxRequest)
}
    `;
export type ImportMboxEmailsMutationFn = Apollo.useMutation.MutationFunction<ImportMboxEmailsMutation, ImportMboxEmailsMutationVariables>;

/**
 * __useImportMboxEmailsMutation__
 *
 * To run a mutation, you first call `useImportMboxEmailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportMboxEmailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importMboxEmailsMutation, { data, loading, error }] = useImportMboxEmailsMutation({
 *   variables: {
 *      importMboxRequest: // value for 'importMboxRequest'
 *   },
 * });
 */
export function useImportMboxEmailsMutation(baseOptions?: Apollo.useMutation.Options<ImportMboxEmailsMutation, ImportMboxEmailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportMboxEmailsMutation, ImportMboxEmailsMutationVariables>(ImportMboxEmailsDocument, options);
      }
export type ImportMboxEmailsMutationHookResult = ReturnType<typeof useImportMboxEmailsMutation>;
export type ImportMboxEmailsMutationResult = Apollo.useMutation.Result<ImportMboxEmailsMutation>;
export type ImportMboxEmailsMutationOptions = Apollo.useMutation.Options<ImportMboxEmailsMutation, ImportMboxEmailsMutationVariables>;
export const GetMboxImportUrlDocument = /*#__PURE__*/ gql`
    mutation getMboxImportUrl($getImportUrlRequest: GetMboxImportUrlRequest!) {
  getMboxImportUrl(getImportUrlRequest: $getImportUrlRequest) {
    fileID
    uploadData
  }
}
    `;
export type GetMboxImportUrlMutationFn = Apollo.useMutation.MutationFunction<GetMboxImportUrlMutation, GetMboxImportUrlMutationVariables>;

/**
 * __useGetMboxImportUrlMutation__
 *
 * To run a mutation, you first call `useGetMboxImportUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetMboxImportUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getMboxImportUrlMutation, { data, loading, error }] = useGetMboxImportUrlMutation({
 *   variables: {
 *      getImportUrlRequest: // value for 'getImportUrlRequest'
 *   },
 * });
 */
export function useGetMboxImportUrlMutation(baseOptions?: Apollo.useMutation.Options<GetMboxImportUrlMutation, GetMboxImportUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetMboxImportUrlMutation, GetMboxImportUrlMutationVariables>(GetMboxImportUrlDocument, options);
      }
export type GetMboxImportUrlMutationHookResult = ReturnType<typeof useGetMboxImportUrlMutation>;
export type GetMboxImportUrlMutationResult = Apollo.useMutation.Result<GetMboxImportUrlMutation>;
export type GetMboxImportUrlMutationOptions = Apollo.useMutation.Options<GetMboxImportUrlMutation, GetMboxImportUrlMutationVariables>;
export const ImportGmailEmailsDocument = /*#__PURE__*/ gql`
    mutation importGmailEmails($request: ImportGmailRequest!) {
  importGmailEmails(request: $request)
}
    `;
export type ImportGmailEmailsMutationFn = Apollo.useMutation.MutationFunction<ImportGmailEmailsMutation, ImportGmailEmailsMutationVariables>;

/**
 * __useImportGmailEmailsMutation__
 *
 * To run a mutation, you first call `useImportGmailEmailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportGmailEmailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importGmailEmailsMutation, { data, loading, error }] = useImportGmailEmailsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useImportGmailEmailsMutation(baseOptions?: Apollo.useMutation.Options<ImportGmailEmailsMutation, ImportGmailEmailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportGmailEmailsMutation, ImportGmailEmailsMutationVariables>(ImportGmailEmailsDocument, options);
      }
export type ImportGmailEmailsMutationHookResult = ReturnType<typeof useImportGmailEmailsMutation>;
export type ImportGmailEmailsMutationResult = Apollo.useMutation.Result<ImportGmailEmailsMutation>;
export type ImportGmailEmailsMutationOptions = Apollo.useMutation.Options<ImportGmailEmailsMutation, ImportGmailEmailsMutationVariables>;
export const UnsubscribeFromGmailImportDocument = /*#__PURE__*/ gql`
    mutation unsubscribeFromGmailImport {
  unsubscribeFromGmailImport
}
    `;
export type UnsubscribeFromGmailImportMutationFn = Apollo.useMutation.MutationFunction<UnsubscribeFromGmailImportMutation, UnsubscribeFromGmailImportMutationVariables>;

/**
 * __useUnsubscribeFromGmailImportMutation__
 *
 * To run a mutation, you first call `useUnsubscribeFromGmailImportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeFromGmailImportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeFromGmailImportMutation, { data, loading, error }] = useUnsubscribeFromGmailImportMutation({
 *   variables: {
 *   },
 * });
 */
export function useUnsubscribeFromGmailImportMutation(baseOptions?: Apollo.useMutation.Options<UnsubscribeFromGmailImportMutation, UnsubscribeFromGmailImportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeFromGmailImportMutation, UnsubscribeFromGmailImportMutationVariables>(UnsubscribeFromGmailImportDocument, options);
      }
export type UnsubscribeFromGmailImportMutationHookResult = ReturnType<typeof useUnsubscribeFromGmailImportMutation>;
export type UnsubscribeFromGmailImportMutationResult = Apollo.useMutation.Result<UnsubscribeFromGmailImportMutation>;
export type UnsubscribeFromGmailImportMutationOptions = Apollo.useMutation.Options<UnsubscribeFromGmailImportMutation, UnsubscribeFromGmailImportMutationVariables>;
export const GetGmailAutoImportStatusDocument = /*#__PURE__*/ gql`
    query getGmailAutoImportStatus {
  getGmailAutoImportStatus {
    subscribed
  }
}
    `;

/**
 * __useGetGmailAutoImportStatusQuery__
 *
 * To run a query within a React component, call `useGetGmailAutoImportStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGmailAutoImportStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGmailAutoImportStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGmailAutoImportStatusQuery(baseOptions?: Apollo.useQuery.Options<GetGmailAutoImportStatusQuery, GetGmailAutoImportStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGmailAutoImportStatusQuery, GetGmailAutoImportStatusQueryVariables>(GetGmailAutoImportStatusDocument, options);
      }
export function useGetGmailAutoImportStatusLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetGmailAutoImportStatusQuery, GetGmailAutoImportStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGmailAutoImportStatusQuery, GetGmailAutoImportStatusQueryVariables>(GetGmailAutoImportStatusDocument, options);
        }
export type GetGmailAutoImportStatusQueryHookResult = ReturnType<typeof useGetGmailAutoImportStatusQuery>;
export type GetGmailAutoImportStatusLazyQueryHookResult = ReturnType<typeof useGetGmailAutoImportStatusLazyQuery>;
export type GetGmailAutoImportStatusQueryResult = Apollo.useQuery.Result<GetGmailAutoImportStatusQuery, GetGmailAutoImportStatusQueryVariables>;
export const ImportOutlookEmailsDocument = /*#__PURE__*/ gql`
    mutation importOutlookEmails($code: String!, $state: String!) {
  importOutlookEmails(code: $code, state: $state)
}
    `;
export type ImportOutlookEmailsMutationFn = Apollo.useMutation.MutationFunction<ImportOutlookEmailsMutation, ImportOutlookEmailsMutationVariables>;

/**
 * __useImportOutlookEmailsMutation__
 *
 * To run a mutation, you first call `useImportOutlookEmailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportOutlookEmailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importOutlookEmailsMutation, { data, loading, error }] = useImportOutlookEmailsMutation({
 *   variables: {
 *      code: // value for 'code'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useImportOutlookEmailsMutation(baseOptions?: Apollo.useMutation.Options<ImportOutlookEmailsMutation, ImportOutlookEmailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportOutlookEmailsMutation, ImportOutlookEmailsMutationVariables>(ImportOutlookEmailsDocument, options);
      }
export type ImportOutlookEmailsMutationHookResult = ReturnType<typeof useImportOutlookEmailsMutation>;
export type ImportOutlookEmailsMutationResult = Apollo.useMutation.Result<ImportOutlookEmailsMutation>;
export type ImportOutlookEmailsMutationOptions = Apollo.useMutation.Options<ImportOutlookEmailsMutation, ImportOutlookEmailsMutationVariables>;
export const GetGoogleAuthUrlDocument = /*#__PURE__*/ gql`
    query getGoogleAuthURL($action: AuthAction) {
  getGoogleAuthURL(action: $action)
}
    `;

/**
 * __useGetGoogleAuthUrlQuery__
 *
 * To run a query within a React component, call `useGetGoogleAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoogleAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoogleAuthUrlQuery({
 *   variables: {
 *      action: // value for 'action'
 *   },
 * });
 */
export function useGetGoogleAuthUrlQuery(baseOptions?: Apollo.useQuery.Options<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>(GetGoogleAuthUrlDocument, options);
      }
export function useGetGoogleAuthUrlLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>(GetGoogleAuthUrlDocument, options);
        }
export type GetGoogleAuthUrlQueryHookResult = ReturnType<typeof useGetGoogleAuthUrlQuery>;
export type GetGoogleAuthUrlLazyQueryHookResult = ReturnType<typeof useGetGoogleAuthUrlLazyQuery>;
export type GetGoogleAuthUrlQueryResult = Apollo.useQuery.Result<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>;
export const GetOutlookAuthUrlDocument = /*#__PURE__*/ gql`
    query getOutlookAuthUrl($action: AuthAction) {
  getOutlookAuthUrl(action: $action)
}
    `;

/**
 * __useGetOutlookAuthUrlQuery__
 *
 * To run a query within a React component, call `useGetOutlookAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOutlookAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOutlookAuthUrlQuery({
 *   variables: {
 *      action: // value for 'action'
 *   },
 * });
 */
export function useGetOutlookAuthUrlQuery(baseOptions?: Apollo.useQuery.Options<GetOutlookAuthUrlQuery, GetOutlookAuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOutlookAuthUrlQuery, GetOutlookAuthUrlQueryVariables>(GetOutlookAuthUrlDocument, options);
      }
export function useGetOutlookAuthUrlLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetOutlookAuthUrlQuery, GetOutlookAuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOutlookAuthUrlQuery, GetOutlookAuthUrlQueryVariables>(GetOutlookAuthUrlDocument, options);
        }
export type GetOutlookAuthUrlQueryHookResult = ReturnType<typeof useGetOutlookAuthUrlQuery>;
export type GetOutlookAuthUrlLazyQueryHookResult = ReturnType<typeof useGetOutlookAuthUrlLazyQuery>;
export type GetOutlookAuthUrlQueryResult = Apollo.useQuery.Result<GetOutlookAuthUrlQuery, GetOutlookAuthUrlQueryVariables>;
export const GetEmailAutoForwardingSettingsDocument = /*#__PURE__*/ gql`
    query getEmailAutoForwardingSettings {
  emailAutoForwardingSettings {
    gmail {
      enabled
    }
    outlook {
      enabled
    }
  }
}
    `;

/**
 * __useGetEmailAutoForwardingSettingsQuery__
 *
 * To run a query within a React component, call `useGetEmailAutoForwardingSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailAutoForwardingSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailAutoForwardingSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmailAutoForwardingSettingsQuery(baseOptions?: Apollo.useQuery.Options<GetEmailAutoForwardingSettingsQuery, GetEmailAutoForwardingSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailAutoForwardingSettingsQuery, GetEmailAutoForwardingSettingsQueryVariables>(GetEmailAutoForwardingSettingsDocument, options);
      }
export function useGetEmailAutoForwardingSettingsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetEmailAutoForwardingSettingsQuery, GetEmailAutoForwardingSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailAutoForwardingSettingsQuery, GetEmailAutoForwardingSettingsQueryVariables>(GetEmailAutoForwardingSettingsDocument, options);
        }
export type GetEmailAutoForwardingSettingsQueryHookResult = ReturnType<typeof useGetEmailAutoForwardingSettingsQuery>;
export type GetEmailAutoForwardingSettingsLazyQueryHookResult = ReturnType<typeof useGetEmailAutoForwardingSettingsLazyQuery>;
export type GetEmailAutoForwardingSettingsQueryResult = Apollo.useQuery.Result<GetEmailAutoForwardingSettingsQuery, GetEmailAutoForwardingSettingsQueryVariables>;
export const EnableEmailAutoForwardingDocument = /*#__PURE__*/ gql`
    mutation enableEmailAutoForwarding($request: EnableEmailAutoForwardingRequest!) {
  enableEmailAutoForwarding(request: $request)
}
    `;
export type EnableEmailAutoForwardingMutationFn = Apollo.useMutation.MutationFunction<EnableEmailAutoForwardingMutation, EnableEmailAutoForwardingMutationVariables>;

/**
 * __useEnableEmailAutoForwardingMutation__
 *
 * To run a mutation, you first call `useEnableEmailAutoForwardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableEmailAutoForwardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableEmailAutoForwardingMutation, { data, loading, error }] = useEnableEmailAutoForwardingMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useEnableEmailAutoForwardingMutation(baseOptions?: Apollo.useMutation.Options<EnableEmailAutoForwardingMutation, EnableEmailAutoForwardingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableEmailAutoForwardingMutation, EnableEmailAutoForwardingMutationVariables>(EnableEmailAutoForwardingDocument, options);
      }
export type EnableEmailAutoForwardingMutationHookResult = ReturnType<typeof useEnableEmailAutoForwardingMutation>;
export type EnableEmailAutoForwardingMutationResult = Apollo.useMutation.Result<EnableEmailAutoForwardingMutation>;
export type EnableEmailAutoForwardingMutationOptions = Apollo.useMutation.Options<EnableEmailAutoForwardingMutation, EnableEmailAutoForwardingMutationVariables>;
export const DisableEmailAutoForwardingDocument = /*#__PURE__*/ gql`
    mutation disableEmailAutoForwarding($request: DisableEmailAutoForwardingRequest!) {
  disableEmailAutoForwarding(request: $request)
}
    `;
export type DisableEmailAutoForwardingMutationFn = Apollo.useMutation.MutationFunction<DisableEmailAutoForwardingMutation, DisableEmailAutoForwardingMutationVariables>;

/**
 * __useDisableEmailAutoForwardingMutation__
 *
 * To run a mutation, you first call `useDisableEmailAutoForwardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableEmailAutoForwardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableEmailAutoForwardingMutation, { data, loading, error }] = useDisableEmailAutoForwardingMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDisableEmailAutoForwardingMutation(baseOptions?: Apollo.useMutation.Options<DisableEmailAutoForwardingMutation, DisableEmailAutoForwardingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableEmailAutoForwardingMutation, DisableEmailAutoForwardingMutationVariables>(DisableEmailAutoForwardingDocument, options);
      }
export type DisableEmailAutoForwardingMutationHookResult = ReturnType<typeof useDisableEmailAutoForwardingMutation>;
export type DisableEmailAutoForwardingMutationResult = Apollo.useMutation.Result<DisableEmailAutoForwardingMutation>;
export type DisableEmailAutoForwardingMutationOptions = Apollo.useMutation.Options<DisableEmailAutoForwardingMutation, DisableEmailAutoForwardingMutationVariables>;
export const GetEmailImportMetaDocument = /*#__PURE__*/ gql`
    query getEmailImportMeta($request: EmailImportMetaRequest!) {
  emailImportMeta(request: $request) {
    estimatedEmailCount
  }
}
    `;

/**
 * __useGetEmailImportMetaQuery__
 *
 * To run a query within a React component, call `useGetEmailImportMetaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailImportMetaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailImportMetaQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetEmailImportMetaQuery(baseOptions: Apollo.useQuery.Options<GetEmailImportMetaQuery, GetEmailImportMetaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailImportMetaQuery, GetEmailImportMetaQueryVariables>(GetEmailImportMetaDocument, options);
      }
export function useGetEmailImportMetaLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetEmailImportMetaQuery, GetEmailImportMetaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailImportMetaQuery, GetEmailImportMetaQueryVariables>(GetEmailImportMetaDocument, options);
        }
export type GetEmailImportMetaQueryHookResult = ReturnType<typeof useGetEmailImportMetaQuery>;
export type GetEmailImportMetaLazyQueryHookResult = ReturnType<typeof useGetEmailImportMetaLazyQuery>;
export type GetEmailImportMetaQueryResult = Apollo.useQuery.Result<GetEmailImportMetaQuery, GetEmailImportMetaQueryVariables>;
export const GetGmailLabelsDocument = /*#__PURE__*/ gql`
    query getGmailLabels($request: GmailInboxOrganizationRequest!) {
  gmailInboxOrganization(request: $request) {
    labels {
      ...ExternalEmailClientLabel
    }
  }
}
    ${ExternalEmailClientLabelFragmentDoc}`;

/**
 * __useGetGmailLabelsQuery__
 *
 * To run a query within a React component, call `useGetGmailLabelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGmailLabelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGmailLabelsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetGmailLabelsQuery(baseOptions: Apollo.useQuery.Options<GetGmailLabelsQuery, GetGmailLabelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGmailLabelsQuery, GetGmailLabelsQueryVariables>(GetGmailLabelsDocument, options);
      }
export function useGetGmailLabelsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetGmailLabelsQuery, GetGmailLabelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGmailLabelsQuery, GetGmailLabelsQueryVariables>(GetGmailLabelsDocument, options);
        }
export type GetGmailLabelsQueryHookResult = ReturnType<typeof useGetGmailLabelsQuery>;
export type GetGmailLabelsLazyQueryHookResult = ReturnType<typeof useGetGmailLabelsLazyQuery>;
export type GetGmailLabelsQueryResult = Apollo.useQuery.Result<GetGmailLabelsQuery, GetGmailLabelsQueryVariables>;
export const GetOutlookCategoriesAndFoldersDocument = /*#__PURE__*/ gql`
    query getOutlookCategoriesAndFolders($request: OutlookInboxOrganizationRequest!) {
  outlookInboxOrganization(request: $request) {
    categories {
      labelID
      labelName
      skiffUserLabel {
        labelID
        labelName
        color
        variant
      }
    }
    folders {
      ...ExternalEmailClientLabel
    }
  }
}
    ${ExternalEmailClientLabelFragmentDoc}`;

/**
 * __useGetOutlookCategoriesAndFoldersQuery__
 *
 * To run a query within a React component, call `useGetOutlookCategoriesAndFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOutlookCategoriesAndFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOutlookCategoriesAndFoldersQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetOutlookCategoriesAndFoldersQuery(baseOptions: Apollo.useQuery.Options<GetOutlookCategoriesAndFoldersQuery, GetOutlookCategoriesAndFoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOutlookCategoriesAndFoldersQuery, GetOutlookCategoriesAndFoldersQueryVariables>(GetOutlookCategoriesAndFoldersDocument, options);
      }
export function useGetOutlookCategoriesAndFoldersLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetOutlookCategoriesAndFoldersQuery, GetOutlookCategoriesAndFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOutlookCategoriesAndFoldersQuery, GetOutlookCategoriesAndFoldersQueryVariables>(GetOutlookCategoriesAndFoldersDocument, options);
        }
export type GetOutlookCategoriesAndFoldersQueryHookResult = ReturnType<typeof useGetOutlookCategoriesAndFoldersQuery>;
export type GetOutlookCategoriesAndFoldersLazyQueryHookResult = ReturnType<typeof useGetOutlookCategoriesAndFoldersLazyQuery>;
export type GetOutlookCategoriesAndFoldersQueryResult = Apollo.useQuery.Result<GetOutlookCategoriesAndFoldersQuery, GetOutlookCategoriesAndFoldersQueryVariables>;
export const EnableGmailImportDocument = /*#__PURE__*/ gql`
    mutation enableGmailImport($request: EnableGmailImportRequest!) {
  enableGmailImport(request: $request)
}
    `;
export type EnableGmailImportMutationFn = Apollo.useMutation.MutationFunction<EnableGmailImportMutation, EnableGmailImportMutationVariables>;

/**
 * __useEnableGmailImportMutation__
 *
 * To run a mutation, you first call `useEnableGmailImportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableGmailImportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableGmailImportMutation, { data, loading, error }] = useEnableGmailImportMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useEnableGmailImportMutation(baseOptions?: Apollo.useMutation.Options<EnableGmailImportMutation, EnableGmailImportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableGmailImportMutation, EnableGmailImportMutationVariables>(EnableGmailImportDocument, options);
      }
export type EnableGmailImportMutationHookResult = ReturnType<typeof useEnableGmailImportMutation>;
export type EnableGmailImportMutationResult = Apollo.useMutation.Result<EnableGmailImportMutation>;
export type EnableGmailImportMutationOptions = Apollo.useMutation.Options<EnableGmailImportMutation, EnableGmailImportMutationVariables>;
export const EnableOutlookImportDocument = /*#__PURE__*/ gql`
    mutation enableOutlookImport($request: EnableOutlookImportRequest!) {
  enableOutlookImport(request: $request)
}
    `;
export type EnableOutlookImportMutationFn = Apollo.useMutation.MutationFunction<EnableOutlookImportMutation, EnableOutlookImportMutationVariables>;

/**
 * __useEnableOutlookImportMutation__
 *
 * To run a mutation, you first call `useEnableOutlookImportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableOutlookImportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableOutlookImportMutation, { data, loading, error }] = useEnableOutlookImportMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useEnableOutlookImportMutation(baseOptions?: Apollo.useMutation.Options<EnableOutlookImportMutation, EnableOutlookImportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableOutlookImportMutation, EnableOutlookImportMutationVariables>(EnableOutlookImportDocument, options);
      }
export type EnableOutlookImportMutationHookResult = ReturnType<typeof useEnableOutlookImportMutation>;
export type EnableOutlookImportMutationResult = Apollo.useMutation.Result<EnableOutlookImportMutation>;
export type EnableOutlookImportMutationOptions = Apollo.useMutation.Options<EnableOutlookImportMutation, EnableOutlookImportMutationVariables>;
export const CreateImportSessionDocument = /*#__PURE__*/ gql`
    mutation createImportSession($request: CreateImportSessionRequest!) {
  createImportSession(request: $request) {
    importID
  }
}
    `;
export type CreateImportSessionMutationFn = Apollo.useMutation.MutationFunction<CreateImportSessionMutation, CreateImportSessionMutationVariables>;

/**
 * __useCreateImportSessionMutation__
 *
 * To run a mutation, you first call `useCreateImportSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImportSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImportSessionMutation, { data, loading, error }] = useCreateImportSessionMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateImportSessionMutation(baseOptions?: Apollo.useMutation.Options<CreateImportSessionMutation, CreateImportSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateImportSessionMutation, CreateImportSessionMutationVariables>(CreateImportSessionDocument, options);
      }
export type CreateImportSessionMutationHookResult = ReturnType<typeof useCreateImportSessionMutation>;
export type CreateImportSessionMutationResult = Apollo.useMutation.Result<CreateImportSessionMutation>;
export type CreateImportSessionMutationOptions = Apollo.useMutation.Options<CreateImportSessionMutation, CreateImportSessionMutationVariables>;
export const GetImportStatusDocument = /*#__PURE__*/ gql`
    query getImportStatus {
  importStatus {
    importID
    importedEmailCount
    status
  }
}
    `;

/**
 * __useGetImportStatusQuery__
 *
 * To run a query within a React component, call `useGetImportStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetImportStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetImportStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetImportStatusQuery(baseOptions?: Apollo.useQuery.Options<GetImportStatusQuery, GetImportStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetImportStatusQuery, GetImportStatusQueryVariables>(GetImportStatusDocument, options);
      }
export function useGetImportStatusLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetImportStatusQuery, GetImportStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetImportStatusQuery, GetImportStatusQueryVariables>(GetImportStatusDocument, options);
        }
export type GetImportStatusQueryHookResult = ReturnType<typeof useGetImportStatusQuery>;
export type GetImportStatusLazyQueryHookResult = ReturnType<typeof useGetImportStatusLazyQuery>;
export type GetImportStatusQueryResult = Apollo.useQuery.Result<GetImportStatusQuery, GetImportStatusQueryVariables>;
export const ApplyLabelsDocument = /*#__PURE__*/ gql`
    mutation applyLabels($request: ModifyLabelsRequest) {
  applyLabels(request: $request) {
    updatedThreads {
      threadID
      systemLabels
      userLabels {
        labelID
        labelName
        color
        variant
      }
    }
  }
}
    `;
export type ApplyLabelsMutationFn = Apollo.useMutation.MutationFunction<ApplyLabelsMutation, ApplyLabelsMutationVariables>;

/**
 * __useApplyLabelsMutation__
 *
 * To run a mutation, you first call `useApplyLabelsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyLabelsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyLabelsMutation, { data, loading, error }] = useApplyLabelsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useApplyLabelsMutation(baseOptions?: Apollo.useMutation.Options<ApplyLabelsMutation, ApplyLabelsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyLabelsMutation, ApplyLabelsMutationVariables>(ApplyLabelsDocument, options);
      }
export type ApplyLabelsMutationHookResult = ReturnType<typeof useApplyLabelsMutation>;
export type ApplyLabelsMutationResult = Apollo.useMutation.Result<ApplyLabelsMutation>;
export type ApplyLabelsMutationOptions = Apollo.useMutation.Options<ApplyLabelsMutation, ApplyLabelsMutationVariables>;
export const BulkApplyLabelsDocument = /*#__PURE__*/ gql`
    mutation bulkApplyLabels($request: BulkModifyLabelsRequest) {
  bulkApplyLabels(request: $request) {
    jobID
  }
}
    `;
export type BulkApplyLabelsMutationFn = Apollo.useMutation.MutationFunction<BulkApplyLabelsMutation, BulkApplyLabelsMutationVariables>;

/**
 * __useBulkApplyLabelsMutation__
 *
 * To run a mutation, you first call `useBulkApplyLabelsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkApplyLabelsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkApplyLabelsMutation, { data, loading, error }] = useBulkApplyLabelsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBulkApplyLabelsMutation(baseOptions?: Apollo.useMutation.Options<BulkApplyLabelsMutation, BulkApplyLabelsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkApplyLabelsMutation, BulkApplyLabelsMutationVariables>(BulkApplyLabelsDocument, options);
      }
export type BulkApplyLabelsMutationHookResult = ReturnType<typeof useBulkApplyLabelsMutation>;
export type BulkApplyLabelsMutationResult = Apollo.useMutation.Result<BulkApplyLabelsMutation>;
export type BulkApplyLabelsMutationOptions = Apollo.useMutation.Options<BulkApplyLabelsMutation, BulkApplyLabelsMutationVariables>;
export const RemoveLabelsDocument = /*#__PURE__*/ gql`
    mutation removeLabels($request: ModifyLabelsRequest) {
  removeLabels(request: $request) {
    updatedThreads {
      threadID
      systemLabels
      userLabels {
        labelID
        labelName
        color
        variant
      }
    }
  }
}
    `;
export type RemoveLabelsMutationFn = Apollo.useMutation.MutationFunction<RemoveLabelsMutation, RemoveLabelsMutationVariables>;

/**
 * __useRemoveLabelsMutation__
 *
 * To run a mutation, you first call `useRemoveLabelsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLabelsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLabelsMutation, { data, loading, error }] = useRemoveLabelsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRemoveLabelsMutation(baseOptions?: Apollo.useMutation.Options<RemoveLabelsMutation, RemoveLabelsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLabelsMutation, RemoveLabelsMutationVariables>(RemoveLabelsDocument, options);
      }
export type RemoveLabelsMutationHookResult = ReturnType<typeof useRemoveLabelsMutation>;
export type RemoveLabelsMutationResult = Apollo.useMutation.Result<RemoveLabelsMutation>;
export type RemoveLabelsMutationOptions = Apollo.useMutation.Options<RemoveLabelsMutation, RemoveLabelsMutationVariables>;
export const BulkRemoveLabelsDocument = /*#__PURE__*/ gql`
    mutation bulkRemoveLabels($request: BulkModifyLabelsRequest) {
  bulkRemoveLabels(request: $request) {
    jobID
  }
}
    `;
export type BulkRemoveLabelsMutationFn = Apollo.useMutation.MutationFunction<BulkRemoveLabelsMutation, BulkRemoveLabelsMutationVariables>;

/**
 * __useBulkRemoveLabelsMutation__
 *
 * To run a mutation, you first call `useBulkRemoveLabelsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveLabelsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveLabelsMutation, { data, loading, error }] = useBulkRemoveLabelsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useBulkRemoveLabelsMutation(baseOptions?: Apollo.useMutation.Options<BulkRemoveLabelsMutation, BulkRemoveLabelsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveLabelsMutation, BulkRemoveLabelsMutationVariables>(BulkRemoveLabelsDocument, options);
      }
export type BulkRemoveLabelsMutationHookResult = ReturnType<typeof useBulkRemoveLabelsMutation>;
export type BulkRemoveLabelsMutationResult = Apollo.useMutation.Result<BulkRemoveLabelsMutation>;
export type BulkRemoveLabelsMutationOptions = Apollo.useMutation.Options<BulkRemoveLabelsMutation, BulkRemoveLabelsMutationVariables>;
export const CreateUserLabelDocument = /*#__PURE__*/ gql`
    mutation createUserLabel($request: CreateUserLabelRequest) {
  createUserLabel(request: $request) {
    labelID
    labelName
    color
    variant
  }
}
    `;
export type CreateUserLabelMutationFn = Apollo.useMutation.MutationFunction<CreateUserLabelMutation, CreateUserLabelMutationVariables>;

/**
 * __useCreateUserLabelMutation__
 *
 * To run a mutation, you first call `useCreateUserLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserLabelMutation, { data, loading, error }] = useCreateUserLabelMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateUserLabelMutation(baseOptions?: Apollo.useMutation.Options<CreateUserLabelMutation, CreateUserLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserLabelMutation, CreateUserLabelMutationVariables>(CreateUserLabelDocument, options);
      }
export type CreateUserLabelMutationHookResult = ReturnType<typeof useCreateUserLabelMutation>;
export type CreateUserLabelMutationResult = Apollo.useMutation.Result<CreateUserLabelMutation>;
export type CreateUserLabelMutationOptions = Apollo.useMutation.Options<CreateUserLabelMutation, CreateUserLabelMutationVariables>;
export const EditUserLabelDocument = /*#__PURE__*/ gql`
    mutation editUserLabel($request: EditUserLabelRequest) {
  editUserLabel(request: $request) {
    labelID
    labelName
    color
    variant
  }
}
    `;
export type EditUserLabelMutationFn = Apollo.useMutation.MutationFunction<EditUserLabelMutation, EditUserLabelMutationVariables>;

/**
 * __useEditUserLabelMutation__
 *
 * To run a mutation, you first call `useEditUserLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserLabelMutation, { data, loading, error }] = useEditUserLabelMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useEditUserLabelMutation(baseOptions?: Apollo.useMutation.Options<EditUserLabelMutation, EditUserLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserLabelMutation, EditUserLabelMutationVariables>(EditUserLabelDocument, options);
      }
export type EditUserLabelMutationHookResult = ReturnType<typeof useEditUserLabelMutation>;
export type EditUserLabelMutationResult = Apollo.useMutation.Result<EditUserLabelMutation>;
export type EditUserLabelMutationOptions = Apollo.useMutation.Options<EditUserLabelMutation, EditUserLabelMutationVariables>;
export const DeleteUserLabelDocument = /*#__PURE__*/ gql`
    mutation deleteUserLabel($request: DeleteUserLabelRequest) {
  deleteUserLabel(request: $request)
}
    `;
export type DeleteUserLabelMutationFn = Apollo.useMutation.MutationFunction<DeleteUserLabelMutation, DeleteUserLabelMutationVariables>;

/**
 * __useDeleteUserLabelMutation__
 *
 * To run a mutation, you first call `useDeleteUserLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserLabelMutation, { data, loading, error }] = useDeleteUserLabelMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteUserLabelMutation(baseOptions?: Apollo.useMutation.Options<DeleteUserLabelMutation, DeleteUserLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserLabelMutation, DeleteUserLabelMutationVariables>(DeleteUserLabelDocument, options);
      }
export type DeleteUserLabelMutationHookResult = ReturnType<typeof useDeleteUserLabelMutation>;
export type DeleteUserLabelMutationResult = Apollo.useMutation.Result<DeleteUserLabelMutation>;
export type DeleteUserLabelMutationOptions = Apollo.useMutation.Options<DeleteUserLabelMutation, DeleteUserLabelMutationVariables>;
export const UserLabelsDocument = /*#__PURE__*/ gql`
    query userLabels {
  userLabels {
    labelID
    labelName
    color
    variant
  }
}
    `;

/**
 * __useUserLabelsQuery__
 *
 * To run a query within a React component, call `useUserLabelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserLabelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLabelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserLabelsQuery(baseOptions?: Apollo.useQuery.Options<UserLabelsQuery, UserLabelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserLabelsQuery, UserLabelsQueryVariables>(UserLabelsDocument, options);
      }
export function useUserLabelsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<UserLabelsQuery, UserLabelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserLabelsQuery, UserLabelsQueryVariables>(UserLabelsDocument, options);
        }
export type UserLabelsQueryHookResult = ReturnType<typeof useUserLabelsQuery>;
export type UserLabelsLazyQueryHookResult = ReturnType<typeof useUserLabelsLazyQuery>;
export type UserLabelsQueryResult = Apollo.useQuery.Result<UserLabelsQuery, UserLabelsQueryVariables>;
export const GetBulkModifyLabelsJobStatusDocument = /*#__PURE__*/ gql`
    query getBulkModifyLabelsJobStatus($jobID: String!) {
  bulkModifyLabelsJobStatus(jobID: $jobID) {
    jobStatus
    completed
  }
}
    `;

/**
 * __useGetBulkModifyLabelsJobStatusQuery__
 *
 * To run a query within a React component, call `useGetBulkModifyLabelsJobStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBulkModifyLabelsJobStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBulkModifyLabelsJobStatusQuery({
 *   variables: {
 *      jobID: // value for 'jobID'
 *   },
 * });
 */
export function useGetBulkModifyLabelsJobStatusQuery(baseOptions: Apollo.useQuery.Options<GetBulkModifyLabelsJobStatusQuery, GetBulkModifyLabelsJobStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBulkModifyLabelsJobStatusQuery, GetBulkModifyLabelsJobStatusQueryVariables>(GetBulkModifyLabelsJobStatusDocument, options);
      }
export function useGetBulkModifyLabelsJobStatusLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetBulkModifyLabelsJobStatusQuery, GetBulkModifyLabelsJobStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBulkModifyLabelsJobStatusQuery, GetBulkModifyLabelsJobStatusQueryVariables>(GetBulkModifyLabelsJobStatusDocument, options);
        }
export type GetBulkModifyLabelsJobStatusQueryHookResult = ReturnType<typeof useGetBulkModifyLabelsJobStatusQuery>;
export type GetBulkModifyLabelsJobStatusLazyQueryHookResult = ReturnType<typeof useGetBulkModifyLabelsJobStatusLazyQuery>;
export type GetBulkModifyLabelsJobStatusQueryResult = Apollo.useQuery.Result<GetBulkModifyLabelsJobStatusQuery, GetBulkModifyLabelsJobStatusQueryVariables>;
export const CreateSrpDocument = /*#__PURE__*/ gql`
    mutation createSrp($request: CreateSrpRequest!) {
  createSrp(request: $request) {
    ...CreateSrpResponseData
  }
}
    ${CreateSrpResponseDataFragmentDoc}`;
export type CreateSrpMutationFn = Apollo.useMutation.MutationFunction<CreateSrpMutation, CreateSrpMutationVariables>;

/**
 * __useCreateSrpMutation__
 *
 * To run a mutation, you first call `useCreateSrpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSrpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSrpMutation, { data, loading, error }] = useCreateSrpMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateSrpMutation(baseOptions?: Apollo.useMutation.Options<CreateSrpMutation, CreateSrpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSrpMutation, CreateSrpMutationVariables>(CreateSrpDocument, options);
      }
export type CreateSrpMutationHookResult = ReturnType<typeof useCreateSrpMutation>;
export type CreateSrpMutationResult = Apollo.useMutation.Result<CreateSrpMutation>;
export type CreateSrpMutationOptions = Apollo.useMutation.Options<CreateSrpMutation, CreateSrpMutationVariables>;
export const UpdateSrpDocument = /*#__PURE__*/ gql`
    mutation updateSrp($request: UpdateSrpRequest!) {
  updateSrp(request: $request) {
    status
  }
}
    `;
export type UpdateSrpMutationFn = Apollo.useMutation.MutationFunction<UpdateSrpMutation, UpdateSrpMutationVariables>;

/**
 * __useUpdateSrpMutation__
 *
 * To run a mutation, you first call `useUpdateSrpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSrpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSrpMutation, { data, loading, error }] = useUpdateSrpMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateSrpMutation(baseOptions?: Apollo.useMutation.Options<UpdateSrpMutation, UpdateSrpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSrpMutation, UpdateSrpMutationVariables>(UpdateSrpDocument, options);
      }
export type UpdateSrpMutationHookResult = ReturnType<typeof useUpdateSrpMutation>;
export type UpdateSrpMutationResult = Apollo.useMutation.Result<UpdateSrpMutation>;
export type UpdateSrpMutationOptions = Apollo.useMutation.Options<UpdateSrpMutation, UpdateSrpMutationVariables>;
export const ProvisionSrpDocument = /*#__PURE__*/ gql`
    mutation provisionSrp($request: ProvisionSrpRequest!) {
  provisionSrp(request: $request)
}
    `;
export type ProvisionSrpMutationFn = Apollo.useMutation.MutationFunction<ProvisionSrpMutation, ProvisionSrpMutationVariables>;

/**
 * __useProvisionSrpMutation__
 *
 * To run a mutation, you first call `useProvisionSrpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProvisionSrpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [provisionSrpMutation, { data, loading, error }] = useProvisionSrpMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useProvisionSrpMutation(baseOptions?: Apollo.useMutation.Options<ProvisionSrpMutation, ProvisionSrpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProvisionSrpMutation, ProvisionSrpMutationVariables>(ProvisionSrpDocument, options);
      }
export type ProvisionSrpMutationHookResult = ReturnType<typeof useProvisionSrpMutation>;
export type ProvisionSrpMutationResult = Apollo.useMutation.Result<ProvisionSrpMutation>;
export type ProvisionSrpMutationOptions = Apollo.useMutation.Options<ProvisionSrpMutation, ProvisionSrpMutationVariables>;
export const SetupProvisionedUserDocument = /*#__PURE__*/ gql`
    mutation setupProvisionedUser($request: SetupProvisionedUserRequest!) {
  setupProvisionedUser(request: $request) {
    ...LoginSrpResponseData
  }
}
    ${LoginSrpResponseDataFragmentDoc}`;
export type SetupProvisionedUserMutationFn = Apollo.useMutation.MutationFunction<SetupProvisionedUserMutation, SetupProvisionedUserMutationVariables>;

/**
 * __useSetupProvisionedUserMutation__
 *
 * To run a mutation, you first call `useSetupProvisionedUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupProvisionedUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupProvisionedUserMutation, { data, loading, error }] = useSetupProvisionedUserMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetupProvisionedUserMutation(baseOptions?: Apollo.useMutation.Options<SetupProvisionedUserMutation, SetupProvisionedUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetupProvisionedUserMutation, SetupProvisionedUserMutationVariables>(SetupProvisionedUserDocument, options);
      }
export type SetupProvisionedUserMutationHookResult = ReturnType<typeof useSetupProvisionedUserMutation>;
export type SetupProvisionedUserMutationResult = Apollo.useMutation.Result<SetupProvisionedUserMutation>;
export type SetupProvisionedUserMutationOptions = Apollo.useMutation.Options<SetupProvisionedUserMutation, SetupProvisionedUserMutationVariables>;
export const LoginSrpStep1Document = /*#__PURE__*/ gql`
    mutation loginSrpStep1($request: LoginSrpRequest!) {
  loginSrp(request: $request) {
    salt
    serverEphemeralPublic
  }
}
    `;
export type LoginSrpStep1MutationFn = Apollo.useMutation.MutationFunction<LoginSrpStep1Mutation, LoginSrpStep1MutationVariables>;

/**
 * __useLoginSrpStep1Mutation__
 *
 * To run a mutation, you first call `useLoginSrpStep1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginSrpStep1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginSrpStep1Mutation, { data, loading, error }] = useLoginSrpStep1Mutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useLoginSrpStep1Mutation(baseOptions?: Apollo.useMutation.Options<LoginSrpStep1Mutation, LoginSrpStep1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginSrpStep1Mutation, LoginSrpStep1MutationVariables>(LoginSrpStep1Document, options);
      }
export type LoginSrpStep1MutationHookResult = ReturnType<typeof useLoginSrpStep1Mutation>;
export type LoginSrpStep1MutationResult = Apollo.useMutation.Result<LoginSrpStep1Mutation>;
export type LoginSrpStep1MutationOptions = Apollo.useMutation.Options<LoginSrpStep1Mutation, LoginSrpStep1MutationVariables>;
export const LoginSrpStep2Document = /*#__PURE__*/ gql`
    mutation loginSrpStep2($request: LoginSrpRequest!) {
  loginSrp(request: $request) {
    ...LoginSrpResponseData
  }
}
    ${LoginSrpResponseDataFragmentDoc}`;
export type LoginSrpStep2MutationFn = Apollo.useMutation.MutationFunction<LoginSrpStep2Mutation, LoginSrpStep2MutationVariables>;

/**
 * __useLoginSrpStep2Mutation__
 *
 * To run a mutation, you first call `useLoginSrpStep2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginSrpStep2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginSrpStep2Mutation, { data, loading, error }] = useLoginSrpStep2Mutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useLoginSrpStep2Mutation(baseOptions?: Apollo.useMutation.Options<LoginSrpStep2Mutation, LoginSrpStep2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginSrpStep2Mutation, LoginSrpStep2MutationVariables>(LoginSrpStep2Document, options);
      }
export type LoginSrpStep2MutationHookResult = ReturnType<typeof useLoginSrpStep2Mutation>;
export type LoginSrpStep2MutationResult = Apollo.useMutation.Result<LoginSrpStep2Mutation>;
export type LoginSrpStep2MutationOptions = Apollo.useMutation.Options<LoginSrpStep2Mutation, LoginSrpStep2MutationVariables>;
export const ClearSessionCacheDocument = /*#__PURE__*/ gql`
    mutation clearSessionCache {
  clearSessionCache {
    status
  }
}
    `;
export type ClearSessionCacheMutationFn = Apollo.useMutation.MutationFunction<ClearSessionCacheMutation, ClearSessionCacheMutationVariables>;

/**
 * __useClearSessionCacheMutation__
 *
 * To run a mutation, you first call `useClearSessionCacheMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearSessionCacheMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearSessionCacheMutation, { data, loading, error }] = useClearSessionCacheMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearSessionCacheMutation(baseOptions?: Apollo.useMutation.Options<ClearSessionCacheMutation, ClearSessionCacheMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearSessionCacheMutation, ClearSessionCacheMutationVariables>(ClearSessionCacheDocument, options);
      }
export type ClearSessionCacheMutationHookResult = ReturnType<typeof useClearSessionCacheMutation>;
export type ClearSessionCacheMutationResult = Apollo.useMutation.Result<ClearSessionCacheMutation>;
export type ClearSessionCacheMutationOptions = Apollo.useMutation.Options<ClearSessionCacheMutation, ClearSessionCacheMutationVariables>;
export const SendAccessRequestEmailDocument = /*#__PURE__*/ gql`
    mutation sendAccessRequestEmail($request: SendAccessRequestEmailRequest!) {
  sendAccessRequestEmail(request: $request)
}
    `;
export type SendAccessRequestEmailMutationFn = Apollo.useMutation.MutationFunction<SendAccessRequestEmailMutation, SendAccessRequestEmailMutationVariables>;

/**
 * __useSendAccessRequestEmailMutation__
 *
 * To run a mutation, you first call `useSendAccessRequestEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendAccessRequestEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendAccessRequestEmailMutation, { data, loading, error }] = useSendAccessRequestEmailMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSendAccessRequestEmailMutation(baseOptions?: Apollo.useMutation.Options<SendAccessRequestEmailMutation, SendAccessRequestEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendAccessRequestEmailMutation, SendAccessRequestEmailMutationVariables>(SendAccessRequestEmailDocument, options);
      }
export type SendAccessRequestEmailMutationHookResult = ReturnType<typeof useSendAccessRequestEmailMutation>;
export type SendAccessRequestEmailMutationResult = Apollo.useMutation.Result<SendAccessRequestEmailMutation>;
export type SendAccessRequestEmailMutationOptions = Apollo.useMutation.Options<SendAccessRequestEmailMutation, SendAccessRequestEmailMutationVariables>;
export const CreateWalletChallengeDocument = /*#__PURE__*/ gql`
    mutation createWalletChallenge($request: CreateWalletChallengeRequest!) {
  createWalletChallenge(request: $request) {
    token
  }
}
    `;
export type CreateWalletChallengeMutationFn = Apollo.useMutation.MutationFunction<CreateWalletChallengeMutation, CreateWalletChallengeMutationVariables>;

/**
 * __useCreateWalletChallengeMutation__
 *
 * To run a mutation, you first call `useCreateWalletChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWalletChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWalletChallengeMutation, { data, loading, error }] = useCreateWalletChallengeMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateWalletChallengeMutation(baseOptions?: Apollo.useMutation.Options<CreateWalletChallengeMutation, CreateWalletChallengeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWalletChallengeMutation, CreateWalletChallengeMutationVariables>(CreateWalletChallengeDocument, options);
      }
export type CreateWalletChallengeMutationHookResult = ReturnType<typeof useCreateWalletChallengeMutation>;
export type CreateWalletChallengeMutationResult = Apollo.useMutation.Result<CreateWalletChallengeMutation>;
export type CreateWalletChallengeMutationOptions = Apollo.useMutation.Options<CreateWalletChallengeMutation, CreateWalletChallengeMutationVariables>;
export const CreateSrpMetamaskDocument = /*#__PURE__*/ gql`
    mutation createSrpMetamask($request: CreateSrpMetamaskRequest!) {
  createSrpMetamask(request: $request) {
    ...CreateSrpResponseData
  }
}
    ${CreateSrpResponseDataFragmentDoc}`;
export type CreateSrpMetamaskMutationFn = Apollo.useMutation.MutationFunction<CreateSrpMetamaskMutation, CreateSrpMetamaskMutationVariables>;

/**
 * __useCreateSrpMetamaskMutation__
 *
 * To run a mutation, you first call `useCreateSrpMetamaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSrpMetamaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSrpMetamaskMutation, { data, loading, error }] = useCreateSrpMetamaskMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateSrpMetamaskMutation(baseOptions?: Apollo.useMutation.Options<CreateSrpMetamaskMutation, CreateSrpMetamaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSrpMetamaskMutation, CreateSrpMetamaskMutationVariables>(CreateSrpMetamaskDocument, options);
      }
export type CreateSrpMetamaskMutationHookResult = ReturnType<typeof useCreateSrpMetamaskMutation>;
export type CreateSrpMetamaskMutationResult = Apollo.useMutation.Result<CreateSrpMetamaskMutation>;
export type CreateSrpMetamaskMutationOptions = Apollo.useMutation.Options<CreateSrpMetamaskMutation, CreateSrpMetamaskMutationVariables>;
export const CreateWalletChallengeSkemailDocument = /*#__PURE__*/ gql`
    mutation createWalletChallengeSkemail($request: CreateWalletChallengeRequestSkemail!) {
  createWalletChallengeSkemail(request: $request) {
    token
  }
}
    `;
export type CreateWalletChallengeSkemailMutationFn = Apollo.useMutation.MutationFunction<CreateWalletChallengeSkemailMutation, CreateWalletChallengeSkemailMutationVariables>;

/**
 * __useCreateWalletChallengeSkemailMutation__
 *
 * To run a mutation, you first call `useCreateWalletChallengeSkemailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWalletChallengeSkemailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWalletChallengeSkemailMutation, { data, loading, error }] = useCreateWalletChallengeSkemailMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateWalletChallengeSkemailMutation(baseOptions?: Apollo.useMutation.Options<CreateWalletChallengeSkemailMutation, CreateWalletChallengeSkemailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWalletChallengeSkemailMutation, CreateWalletChallengeSkemailMutationVariables>(CreateWalletChallengeSkemailDocument, options);
      }
export type CreateWalletChallengeSkemailMutationHookResult = ReturnType<typeof useCreateWalletChallengeSkemailMutation>;
export type CreateWalletChallengeSkemailMutationResult = Apollo.useMutation.Result<CreateWalletChallengeSkemailMutation>;
export type CreateWalletChallengeSkemailMutationOptions = Apollo.useMutation.Options<CreateWalletChallengeSkemailMutation, CreateWalletChallengeSkemailMutationVariables>;
export const GenerateDocPublicLinkAuthTokenStep1Document = /*#__PURE__*/ gql`
    mutation generateDocPublicLinkAuthTokenStep1($request: GenerateDocPublicLinkAuthTokenStep1Request!) {
  generateDocPublicLinkAuthTokenStep1(request: $request) {
    salt
    serverEphemeralPublic
  }
}
    `;
export type GenerateDocPublicLinkAuthTokenStep1MutationFn = Apollo.useMutation.MutationFunction<GenerateDocPublicLinkAuthTokenStep1Mutation, GenerateDocPublicLinkAuthTokenStep1MutationVariables>;

/**
 * __useGenerateDocPublicLinkAuthTokenStep1Mutation__
 *
 * To run a mutation, you first call `useGenerateDocPublicLinkAuthTokenStep1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateDocPublicLinkAuthTokenStep1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateDocPublicLinkAuthTokenStep1Mutation, { data, loading, error }] = useGenerateDocPublicLinkAuthTokenStep1Mutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGenerateDocPublicLinkAuthTokenStep1Mutation(baseOptions?: Apollo.useMutation.Options<GenerateDocPublicLinkAuthTokenStep1Mutation, GenerateDocPublicLinkAuthTokenStep1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateDocPublicLinkAuthTokenStep1Mutation, GenerateDocPublicLinkAuthTokenStep1MutationVariables>(GenerateDocPublicLinkAuthTokenStep1Document, options);
      }
export type GenerateDocPublicLinkAuthTokenStep1MutationHookResult = ReturnType<typeof useGenerateDocPublicLinkAuthTokenStep1Mutation>;
export type GenerateDocPublicLinkAuthTokenStep1MutationResult = Apollo.useMutation.Result<GenerateDocPublicLinkAuthTokenStep1Mutation>;
export type GenerateDocPublicLinkAuthTokenStep1MutationOptions = Apollo.useMutation.Options<GenerateDocPublicLinkAuthTokenStep1Mutation, GenerateDocPublicLinkAuthTokenStep1MutationVariables>;
export const GenerateDocPublicLinkAuthTokenStep2Document = /*#__PURE__*/ gql`
    mutation generateDocPublicLinkAuthTokenStep2($request: GenerateDocPublicLinkAuthTokenStep2Request!) {
  generateDocPublicLinkAuthTokenStep2(request: $request) {
    serverSessionProof
    jwt
    encryptedPrivateHierarchicalKey
  }
}
    `;
export type GenerateDocPublicLinkAuthTokenStep2MutationFn = Apollo.useMutation.MutationFunction<GenerateDocPublicLinkAuthTokenStep2Mutation, GenerateDocPublicLinkAuthTokenStep2MutationVariables>;

/**
 * __useGenerateDocPublicLinkAuthTokenStep2Mutation__
 *
 * To run a mutation, you first call `useGenerateDocPublicLinkAuthTokenStep2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateDocPublicLinkAuthTokenStep2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateDocPublicLinkAuthTokenStep2Mutation, { data, loading, error }] = useGenerateDocPublicLinkAuthTokenStep2Mutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGenerateDocPublicLinkAuthTokenStep2Mutation(baseOptions?: Apollo.useMutation.Options<GenerateDocPublicLinkAuthTokenStep2Mutation, GenerateDocPublicLinkAuthTokenStep2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateDocPublicLinkAuthTokenStep2Mutation, GenerateDocPublicLinkAuthTokenStep2MutationVariables>(GenerateDocPublicLinkAuthTokenStep2Document, options);
      }
export type GenerateDocPublicLinkAuthTokenStep2MutationHookResult = ReturnType<typeof useGenerateDocPublicLinkAuthTokenStep2Mutation>;
export type GenerateDocPublicLinkAuthTokenStep2MutationResult = Apollo.useMutation.Result<GenerateDocPublicLinkAuthTokenStep2Mutation>;
export type GenerateDocPublicLinkAuthTokenStep2MutationOptions = Apollo.useMutation.Options<GenerateDocPublicLinkAuthTokenStep2Mutation, GenerateDocPublicLinkAuthTokenStep2MutationVariables>;
export const SaveContentsDocument = /*#__PURE__*/ gql`
    mutation saveContents($request: SaveContentsRequest!) {
  saveContents(request: $request) {
    document {
      docID
      ...DocumentContents
    }
  }
}
    ${DocumentContentsFragmentDoc}`;
export type SaveContentsMutationFn = Apollo.useMutation.MutationFunction<SaveContentsMutation, SaveContentsMutationVariables>;

/**
 * __useSaveContentsMutation__
 *
 * To run a mutation, you first call `useSaveContentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveContentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveContentsMutation, { data, loading, error }] = useSaveContentsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSaveContentsMutation(baseOptions?: Apollo.useMutation.Options<SaveContentsMutation, SaveContentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveContentsMutation, SaveContentsMutationVariables>(SaveContentsDocument, options);
      }
export type SaveContentsMutationHookResult = ReturnType<typeof useSaveContentsMutation>;
export type SaveContentsMutationResult = Apollo.useMutation.Result<SaveContentsMutation>;
export type SaveContentsMutationOptions = Apollo.useMutation.Options<SaveContentsMutation, SaveContentsMutationVariables>;
export const SaveMetadataDocument = /*#__PURE__*/ gql`
    mutation saveMetadata($request: SaveMetadataRequest!) {
  saveMetadata(request: $request) {
    document {
      ...DocumentBasicInfo
      ...DocumentDecryptedMetadata
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}`;
export type SaveMetadataMutationFn = Apollo.useMutation.MutationFunction<SaveMetadataMutation, SaveMetadataMutationVariables>;

/**
 * __useSaveMetadataMutation__
 *
 * To run a mutation, you first call `useSaveMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMetadataMutation, { data, loading, error }] = useSaveMetadataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSaveMetadataMutation(baseOptions?: Apollo.useMutation.Options<SaveMetadataMutation, SaveMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveMetadataMutation, SaveMetadataMutationVariables>(SaveMetadataDocument, options);
      }
export type SaveMetadataMutationHookResult = ReturnType<typeof useSaveMetadataMutation>;
export type SaveMetadataMutationResult = Apollo.useMutation.Result<SaveMetadataMutation>;
export type SaveMetadataMutationOptions = Apollo.useMutation.Options<SaveMetadataMutation, SaveMetadataMutationVariables>;
export const SaveMetadataNativeDocument = /*#__PURE__*/ gql`
    mutation saveMetadataNative($request: SaveMetadataRequest!) {
  saveMetadata(request: $request) {
    document {
      ...DocumentNativeInfo
    }
  }
}
    ${DocumentNativeInfoFragmentDoc}`;
export type SaveMetadataNativeMutationFn = Apollo.useMutation.MutationFunction<SaveMetadataNativeMutation, SaveMetadataNativeMutationVariables>;

/**
 * __useSaveMetadataNativeMutation__
 *
 * To run a mutation, you first call `useSaveMetadataNativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMetadataNativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMetadataNativeMutation, { data, loading, error }] = useSaveMetadataNativeMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSaveMetadataNativeMutation(baseOptions?: Apollo.useMutation.Options<SaveMetadataNativeMutation, SaveMetadataNativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveMetadataNativeMutation, SaveMetadataNativeMutationVariables>(SaveMetadataNativeDocument, options);
      }
export type SaveMetadataNativeMutationHookResult = ReturnType<typeof useSaveMetadataNativeMutation>;
export type SaveMetadataNativeMutationResult = Apollo.useMutation.Result<SaveMetadataNativeMutation>;
export type SaveMetadataNativeMutationOptions = Apollo.useMutation.Options<SaveMetadataNativeMutation, SaveMetadataNativeMutationVariables>;
export const SaveThumbnailDocument = /*#__PURE__*/ gql`
    mutation saveThumbnail($request: SaveThumbnailRequest!) {
  saveThumbnail(request: $request) {
    document {
      ...DocumentBasicInfo
      ...DocumentDecryptedMetadata
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}`;
export type SaveThumbnailMutationFn = Apollo.useMutation.MutationFunction<SaveThumbnailMutation, SaveThumbnailMutationVariables>;

/**
 * __useSaveThumbnailMutation__
 *
 * To run a mutation, you first call `useSaveThumbnailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveThumbnailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveThumbnailMutation, { data, loading, error }] = useSaveThumbnailMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSaveThumbnailMutation(baseOptions?: Apollo.useMutation.Options<SaveThumbnailMutation, SaveThumbnailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveThumbnailMutation, SaveThumbnailMutationVariables>(SaveThumbnailDocument, options);
      }
export type SaveThumbnailMutationHookResult = ReturnType<typeof useSaveThumbnailMutation>;
export type SaveThumbnailMutationResult = Apollo.useMutation.Result<SaveThumbnailMutation>;
export type SaveThumbnailMutationOptions = Apollo.useMutation.Options<SaveThumbnailMutation, SaveThumbnailMutationVariables>;
export const SaveThumbnailNativeDocument = /*#__PURE__*/ gql`
    mutation saveThumbnailNative($request: SaveThumbnailRequest!) {
  saveThumbnail(request: $request) {
    document {
      ...DocumentNativeInfo
    }
  }
}
    ${DocumentNativeInfoFragmentDoc}`;
export type SaveThumbnailNativeMutationFn = Apollo.useMutation.MutationFunction<SaveThumbnailNativeMutation, SaveThumbnailNativeMutationVariables>;

/**
 * __useSaveThumbnailNativeMutation__
 *
 * To run a mutation, you first call `useSaveThumbnailNativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveThumbnailNativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveThumbnailNativeMutation, { data, loading, error }] = useSaveThumbnailNativeMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSaveThumbnailNativeMutation(baseOptions?: Apollo.useMutation.Options<SaveThumbnailNativeMutation, SaveThumbnailNativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveThumbnailNativeMutation, SaveThumbnailNativeMutationVariables>(SaveThumbnailNativeDocument, options);
      }
export type SaveThumbnailNativeMutationHookResult = ReturnType<typeof useSaveThumbnailNativeMutation>;
export type SaveThumbnailNativeMutationResult = Apollo.useMutation.Result<SaveThumbnailNativeMutation>;
export type SaveThumbnailNativeMutationOptions = Apollo.useMutation.Options<SaveThumbnailNativeMutation, SaveThumbnailNativeMutationVariables>;
export const NewMultipleDocsDocument = /*#__PURE__*/ gql`
    mutation newMultipleDocs($request: [NewDocRequest!]!) {
  newMultipleDocs(request: $request) {
    docID
    document {
      ...DocumentFullInfo
    }
    error {
      message
      code
      extensions
    }
  }
}
    ${DocumentFullInfoFragmentDoc}`;
export type NewMultipleDocsMutationFn = Apollo.useMutation.MutationFunction<NewMultipleDocsMutation, NewMultipleDocsMutationVariables>;

/**
 * __useNewMultipleDocsMutation__
 *
 * To run a mutation, you first call `useNewMultipleDocsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewMultipleDocsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newMultipleDocsMutation, { data, loading, error }] = useNewMultipleDocsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useNewMultipleDocsMutation(baseOptions?: Apollo.useMutation.Options<NewMultipleDocsMutation, NewMultipleDocsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewMultipleDocsMutation, NewMultipleDocsMutationVariables>(NewMultipleDocsDocument, options);
      }
export type NewMultipleDocsMutationHookResult = ReturnType<typeof useNewMultipleDocsMutation>;
export type NewMultipleDocsMutationResult = Apollo.useMutation.Result<NewMultipleDocsMutation>;
export type NewMultipleDocsMutationOptions = Apollo.useMutation.Options<NewMultipleDocsMutation, NewMultipleDocsMutationVariables>;
export const ShareDocDocument = /*#__PURE__*/ gql`
    mutation shareDoc($request: ShareDocRequest!) {
  shareDoc(request: $request) {
    document {
      ...DocumentBasicInfo
      ...DocumentCollaborators
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export type ShareDocMutationFn = Apollo.useMutation.MutationFunction<ShareDocMutation, ShareDocMutationVariables>;

/**
 * __useShareDocMutation__
 *
 * To run a mutation, you first call `useShareDocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareDocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareDocMutation, { data, loading, error }] = useShareDocMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useShareDocMutation(baseOptions?: Apollo.useMutation.Options<ShareDocMutation, ShareDocMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShareDocMutation, ShareDocMutationVariables>(ShareDocDocument, options);
      }
export type ShareDocMutationHookResult = ReturnType<typeof useShareDocMutation>;
export type ShareDocMutationResult = Apollo.useMutation.Result<ShareDocMutation>;
export type ShareDocMutationOptions = Apollo.useMutation.Options<ShareDocMutation, ShareDocMutationVariables>;
export const UpgradeKeyDocument = /*#__PURE__*/ gql`
    mutation upgradeKey($request: UpgradeKeyRequest!) {
  upgradeKey(request: $request) {
    document {
      ...DocumentBasicInfo
      ...DocumentDecryptedMetadata
      ...DocumentContents
      ...DocumentLink
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}
${DocumentContentsFragmentDoc}
${DocumentLinkFragmentDoc}`;
export type UpgradeKeyMutationFn = Apollo.useMutation.MutationFunction<UpgradeKeyMutation, UpgradeKeyMutationVariables>;

/**
 * __useUpgradeKeyMutation__
 *
 * To run a mutation, you first call `useUpgradeKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgradeKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgradeKeyMutation, { data, loading, error }] = useUpgradeKeyMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpgradeKeyMutation(baseOptions?: Apollo.useMutation.Options<UpgradeKeyMutation, UpgradeKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpgradeKeyMutation, UpgradeKeyMutationVariables>(UpgradeKeyDocument, options);
      }
export type UpgradeKeyMutationHookResult = ReturnType<typeof useUpgradeKeyMutation>;
export type UpgradeKeyMutationResult = Apollo.useMutation.Result<UpgradeKeyMutation>;
export type UpgradeKeyMutationOptions = Apollo.useMutation.Options<UpgradeKeyMutation, UpgradeKeyMutationVariables>;
export const UpgradeHierarchicalKeysDocument = /*#__PURE__*/ gql`
    mutation upgradeHierarchicalKeys($request: UpgradeHierarchicalKeysRequest!) {
  upgradeHierarchicalKeys(request: $request) {
    documents {
      ...DocumentBasicInfo
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}`;
export type UpgradeHierarchicalKeysMutationFn = Apollo.useMutation.MutationFunction<UpgradeHierarchicalKeysMutation, UpgradeHierarchicalKeysMutationVariables>;

/**
 * __useUpgradeHierarchicalKeysMutation__
 *
 * To run a mutation, you first call `useUpgradeHierarchicalKeysMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgradeHierarchicalKeysMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgradeHierarchicalKeysMutation, { data, loading, error }] = useUpgradeHierarchicalKeysMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpgradeHierarchicalKeysMutation(baseOptions?: Apollo.useMutation.Options<UpgradeHierarchicalKeysMutation, UpgradeHierarchicalKeysMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpgradeHierarchicalKeysMutation, UpgradeHierarchicalKeysMutationVariables>(UpgradeHierarchicalKeysDocument, options);
      }
export type UpgradeHierarchicalKeysMutationHookResult = ReturnType<typeof useUpgradeHierarchicalKeysMutation>;
export type UpgradeHierarchicalKeysMutationResult = Apollo.useMutation.Result<UpgradeHierarchicalKeysMutation>;
export type UpgradeHierarchicalKeysMutationOptions = Apollo.useMutation.Options<UpgradeHierarchicalKeysMutation, UpgradeHierarchicalKeysMutationVariables>;
export const UnshareDocDocument = /*#__PURE__*/ gql`
    mutation unshareDoc($request: UnshareDocRequest!) {
  unshareDoc(request: $request) {
    document {
      ...DocumentBasicInfo
      ...DocumentCollaborators
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export type UnshareDocMutationFn = Apollo.useMutation.MutationFunction<UnshareDocMutation, UnshareDocMutationVariables>;

/**
 * __useUnshareDocMutation__
 *
 * To run a mutation, you first call `useUnshareDocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnshareDocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unshareDocMutation, { data, loading, error }] = useUnshareDocMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnshareDocMutation(baseOptions?: Apollo.useMutation.Options<UnshareDocMutation, UnshareDocMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnshareDocMutation, UnshareDocMutationVariables>(UnshareDocDocument, options);
      }
export type UnshareDocMutationHookResult = ReturnType<typeof useUnshareDocMutation>;
export type UnshareDocMutationResult = Apollo.useMutation.Result<UnshareDocMutation>;
export type UnshareDocMutationOptions = Apollo.useMutation.Options<UnshareDocMutation, UnshareDocMutationVariables>;
export const DeleteDocDocument = /*#__PURE__*/ gql`
    mutation deleteDoc($request: DeleteDocRequest!) {
  deleteDoc(request: $request) {
    status
  }
}
    `;
export type DeleteDocMutationFn = Apollo.useMutation.MutationFunction<DeleteDocMutation, DeleteDocMutationVariables>;

/**
 * __useDeleteDocMutation__
 *
 * To run a mutation, you first call `useDeleteDocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDocMutation, { data, loading, error }] = useDeleteDocMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteDocMutation(baseOptions?: Apollo.useMutation.Options<DeleteDocMutation, DeleteDocMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDocMutation, DeleteDocMutationVariables>(DeleteDocDocument, options);
      }
export type DeleteDocMutationHookResult = ReturnType<typeof useDeleteDocMutation>;
export type DeleteDocMutationResult = Apollo.useMutation.Result<DeleteDocMutation>;
export type DeleteDocMutationOptions = Apollo.useMutation.Options<DeleteDocMutation, DeleteDocMutationVariables>;
export const DeleteSnapshotDocument = /*#__PURE__*/ gql`
    mutation deleteSnapshot($request: DeleteSnapshotRequest!) {
  deleteSnapshot(request: $request) {
    document {
      docID
      ...DocumentContents
    }
  }
}
    ${DocumentContentsFragmentDoc}`;
export type DeleteSnapshotMutationFn = Apollo.useMutation.MutationFunction<DeleteSnapshotMutation, DeleteSnapshotMutationVariables>;

/**
 * __useDeleteSnapshotMutation__
 *
 * To run a mutation, you first call `useDeleteSnapshotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSnapshotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSnapshotMutation, { data, loading, error }] = useDeleteSnapshotMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteSnapshotMutation(baseOptions?: Apollo.useMutation.Options<DeleteSnapshotMutation, DeleteSnapshotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSnapshotMutation, DeleteSnapshotMutationVariables>(DeleteSnapshotDocument, options);
      }
export type DeleteSnapshotMutationHookResult = ReturnType<typeof useDeleteSnapshotMutation>;
export type DeleteSnapshotMutationResult = Apollo.useMutation.Result<DeleteSnapshotMutation>;
export type DeleteSnapshotMutationOptions = Apollo.useMutation.Options<DeleteSnapshotMutation, DeleteSnapshotMutationVariables>;
export const SetupLinkDocument = /*#__PURE__*/ gql`
    mutation setupLink($request: SetupLinkRequest!) {
  setupLink(request: $request) {
    document {
      ...DocumentBasicInfo
      link {
        salt
        encryptedLinkKey
        permissionLevel
        decryptedLinkKey @client
      }
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}`;
export type SetupLinkMutationFn = Apollo.useMutation.MutationFunction<SetupLinkMutation, SetupLinkMutationVariables>;

/**
 * __useSetupLinkMutation__
 *
 * To run a mutation, you first call `useSetupLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupLinkMutation, { data, loading, error }] = useSetupLinkMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetupLinkMutation(baseOptions?: Apollo.useMutation.Options<SetupLinkMutation, SetupLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetupLinkMutation, SetupLinkMutationVariables>(SetupLinkDocument, options);
      }
export type SetupLinkMutationHookResult = ReturnType<typeof useSetupLinkMutation>;
export type SetupLinkMutationResult = Apollo.useMutation.Result<SetupLinkMutation>;
export type SetupLinkMutationOptions = Apollo.useMutation.Options<SetupLinkMutation, SetupLinkMutationVariables>;
export const DeleteLinkDocument = /*#__PURE__*/ gql`
    mutation deleteLink($request: DeleteLinkRequest!) {
  deleteLink(request: $request) {
    status
  }
}
    `;
export type DeleteLinkMutationFn = Apollo.useMutation.MutationFunction<DeleteLinkMutation, DeleteLinkMutationVariables>;

/**
 * __useDeleteLinkMutation__
 *
 * To run a mutation, you first call `useDeleteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLinkMutation, { data, loading, error }] = useDeleteLinkMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteLinkMutation(baseOptions?: Apollo.useMutation.Options<DeleteLinkMutation, DeleteLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLinkMutation, DeleteLinkMutationVariables>(DeleteLinkDocument, options);
      }
export type DeleteLinkMutationHookResult = ReturnType<typeof useDeleteLinkMutation>;
export type DeleteLinkMutationResult = Apollo.useMutation.Result<DeleteLinkMutation>;
export type DeleteLinkMutationOptions = Apollo.useMutation.Options<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const MoveDocDocument = /*#__PURE__*/ gql`
    mutation moveDoc($request: MoveDocRequest!) {
  moveDoc(request: $request) {
    document {
      ...DocumentBase
      ...DocumentCollaborators
    }
  }
}
    ${DocumentBaseFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export type MoveDocMutationFn = Apollo.useMutation.MutationFunction<MoveDocMutation, MoveDocMutationVariables>;

/**
 * __useMoveDocMutation__
 *
 * To run a mutation, you first call `useMoveDocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveDocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveDocMutation, { data, loading, error }] = useMoveDocMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMoveDocMutation(baseOptions?: Apollo.useMutation.Options<MoveDocMutation, MoveDocMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveDocMutation, MoveDocMutationVariables>(MoveDocDocument, options);
      }
export type MoveDocMutationHookResult = ReturnType<typeof useMoveDocMutation>;
export type MoveDocMutationResult = Apollo.useMutation.Result<MoveDocMutation>;
export type MoveDocMutationOptions = Apollo.useMutation.Options<MoveDocMutation, MoveDocMutationVariables>;
export const MoveMultipleDocDocument = /*#__PURE__*/ gql`
    mutation moveMultipleDoc($request: [MoveDocRequest!]!) {
  moveMultipleDoc(request: $request) {
    document {
      ...DocumentBase
      ...DocumentCollaborators
    }
  }
}
    ${DocumentBaseFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export type MoveMultipleDocMutationFn = Apollo.useMutation.MutationFunction<MoveMultipleDocMutation, MoveMultipleDocMutationVariables>;

/**
 * __useMoveMultipleDocMutation__
 *
 * To run a mutation, you first call `useMoveMultipleDocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveMultipleDocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveMultipleDocMutation, { data, loading, error }] = useMoveMultipleDocMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMoveMultipleDocMutation(baseOptions?: Apollo.useMutation.Options<MoveMultipleDocMutation, MoveMultipleDocMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveMultipleDocMutation, MoveMultipleDocMutationVariables>(MoveMultipleDocDocument, options);
      }
export type MoveMultipleDocMutationHookResult = ReturnType<typeof useMoveMultipleDocMutation>;
export type MoveMultipleDocMutationResult = Apollo.useMutation.Result<MoveMultipleDocMutation>;
export type MoveMultipleDocMutationOptions = Apollo.useMutation.Options<MoveMultipleDocMutation, MoveMultipleDocMutationVariables>;
export const MoveMultipleDocNativeDocument = /*#__PURE__*/ gql`
    mutation moveMultipleDocNative($request: [MoveDocRequest!]!) {
  moveMultipleDoc(request: $request) {
    document {
      ...DocumentNativeInfo
    }
  }
}
    ${DocumentNativeInfoFragmentDoc}`;
export type MoveMultipleDocNativeMutationFn = Apollo.useMutation.MutationFunction<MoveMultipleDocNativeMutation, MoveMultipleDocNativeMutationVariables>;

/**
 * __useMoveMultipleDocNativeMutation__
 *
 * To run a mutation, you first call `useMoveMultipleDocNativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveMultipleDocNativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveMultipleDocNativeMutation, { data, loading, error }] = useMoveMultipleDocNativeMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useMoveMultipleDocNativeMutation(baseOptions?: Apollo.useMutation.Options<MoveMultipleDocNativeMutation, MoveMultipleDocNativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveMultipleDocNativeMutation, MoveMultipleDocNativeMutationVariables>(MoveMultipleDocNativeDocument, options);
      }
export type MoveMultipleDocNativeMutationHookResult = ReturnType<typeof useMoveMultipleDocNativeMutation>;
export type MoveMultipleDocNativeMutationResult = Apollo.useMutation.Result<MoveMultipleDocNativeMutation>;
export type MoveMultipleDocNativeMutationOptions = Apollo.useMutation.Options<MoveMultipleDocNativeMutation, MoveMultipleDocNativeMutationVariables>;
export const CreateCacheElementDocument = /*#__PURE__*/ gql`
    mutation createCacheElement($request: CreateCacheElementRequest!) {
  createCacheElement(request: $request) {
    writeUrl
    cacheID
  }
}
    `;
export type CreateCacheElementMutationFn = Apollo.useMutation.MutationFunction<CreateCacheElementMutation, CreateCacheElementMutationVariables>;

/**
 * __useCreateCacheElementMutation__
 *
 * To run a mutation, you first call `useCreateCacheElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCacheElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCacheElementMutation, { data, loading, error }] = useCreateCacheElementMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateCacheElementMutation(baseOptions?: Apollo.useMutation.Options<CreateCacheElementMutation, CreateCacheElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCacheElementMutation, CreateCacheElementMutationVariables>(CreateCacheElementDocument, options);
      }
export type CreateCacheElementMutationHookResult = ReturnType<typeof useCreateCacheElementMutation>;
export type CreateCacheElementMutationResult = Apollo.useMutation.Result<CreateCacheElementMutation>;
export type CreateCacheElementMutationOptions = Apollo.useMutation.Options<CreateCacheElementMutation, CreateCacheElementMutationVariables>;
export const ConfirmCacheUploadDocument = /*#__PURE__*/ gql`
    mutation confirmCacheUpload($request: ConfirmCacheUploadRequest!) {
  confirmCacheUpload(request: $request) {
    readUrl
    ipfsPath
  }
}
    `;
export type ConfirmCacheUploadMutationFn = Apollo.useMutation.MutationFunction<ConfirmCacheUploadMutation, ConfirmCacheUploadMutationVariables>;

/**
 * __useConfirmCacheUploadMutation__
 *
 * To run a mutation, you first call `useConfirmCacheUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmCacheUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmCacheUploadMutation, { data, loading, error }] = useConfirmCacheUploadMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useConfirmCacheUploadMutation(baseOptions?: Apollo.useMutation.Options<ConfirmCacheUploadMutation, ConfirmCacheUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmCacheUploadMutation, ConfirmCacheUploadMutationVariables>(ConfirmCacheUploadDocument, options);
      }
export type ConfirmCacheUploadMutationHookResult = ReturnType<typeof useConfirmCacheUploadMutation>;
export type ConfirmCacheUploadMutationResult = Apollo.useMutation.Result<ConfirmCacheUploadMutation>;
export type ConfirmCacheUploadMutationOptions = Apollo.useMutation.Options<ConfirmCacheUploadMutation, ConfirmCacheUploadMutationVariables>;
export const SendDocumentEventDocument = /*#__PURE__*/ gql`
    mutation sendDocumentEvent($request: SendDocumentEventRequest!) {
  sendDocumentEvent(request: $request)
}
    `;
export type SendDocumentEventMutationFn = Apollo.useMutation.MutationFunction<SendDocumentEventMutation, SendDocumentEventMutationVariables>;

/**
 * __useSendDocumentEventMutation__
 *
 * To run a mutation, you first call `useSendDocumentEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDocumentEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDocumentEventMutation, { data, loading, error }] = useSendDocumentEventMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSendDocumentEventMutation(baseOptions?: Apollo.useMutation.Options<SendDocumentEventMutation, SendDocumentEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendDocumentEventMutation, SendDocumentEventMutationVariables>(SendDocumentEventDocument, options);
      }
export type SendDocumentEventMutationHookResult = ReturnType<typeof useSendDocumentEventMutation>;
export type SendDocumentEventMutationResult = Apollo.useMutation.Result<SendDocumentEventMutation>;
export type SendDocumentEventMutationOptions = Apollo.useMutation.Options<SendDocumentEventMutation, SendDocumentEventMutationVariables>;
export const ChangeLinkPermissionDocument = /*#__PURE__*/ gql`
    mutation changeLinkPermission($request: ChangeLinkPermissionRequest!) {
  changeLinkPermission(request: $request) {
    document {
      ...DocumentBasicInfo
      link {
        salt
        encryptedLinkKey
        permissionLevel
        decryptedLinkKey @client
      }
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}`;
export type ChangeLinkPermissionMutationFn = Apollo.useMutation.MutationFunction<ChangeLinkPermissionMutation, ChangeLinkPermissionMutationVariables>;

/**
 * __useChangeLinkPermissionMutation__
 *
 * To run a mutation, you first call `useChangeLinkPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeLinkPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeLinkPermissionMutation, { data, loading, error }] = useChangeLinkPermissionMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useChangeLinkPermissionMutation(baseOptions?: Apollo.useMutation.Options<ChangeLinkPermissionMutation, ChangeLinkPermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeLinkPermissionMutation, ChangeLinkPermissionMutationVariables>(ChangeLinkPermissionDocument, options);
      }
export type ChangeLinkPermissionMutationHookResult = ReturnType<typeof useChangeLinkPermissionMutation>;
export type ChangeLinkPermissionMutationResult = Apollo.useMutation.Result<ChangeLinkPermissionMutation>;
export type ChangeLinkPermissionMutationOptions = Apollo.useMutation.Options<ChangeLinkPermissionMutation, ChangeLinkPermissionMutationVariables>;
export const TrashDocsDocument = /*#__PURE__*/ gql`
    mutation trashDocs($request: [TrashDocRequest!]!) {
  trashDocs(request: $request) {
    document {
      ...DocumentBase
      ...DocumentCollaborators
    }
  }
}
    ${DocumentBaseFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export type TrashDocsMutationFn = Apollo.useMutation.MutationFunction<TrashDocsMutation, TrashDocsMutationVariables>;

/**
 * __useTrashDocsMutation__
 *
 * To run a mutation, you first call `useTrashDocsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrashDocsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trashDocsMutation, { data, loading, error }] = useTrashDocsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useTrashDocsMutation(baseOptions?: Apollo.useMutation.Options<TrashDocsMutation, TrashDocsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrashDocsMutation, TrashDocsMutationVariables>(TrashDocsDocument, options);
      }
export type TrashDocsMutationHookResult = ReturnType<typeof useTrashDocsMutation>;
export type TrashDocsMutationResult = Apollo.useMutation.Result<TrashDocsMutation>;
export type TrashDocsMutationOptions = Apollo.useMutation.Options<TrashDocsMutation, TrashDocsMutationVariables>;
export const TrashDocsNativeDocument = /*#__PURE__*/ gql`
    mutation trashDocsNative($request: [TrashDocRequest!]!) {
  trashDocs(request: $request) {
    document {
      ...DocumentNativeInfo
    }
  }
}
    ${DocumentNativeInfoFragmentDoc}`;
export type TrashDocsNativeMutationFn = Apollo.useMutation.MutationFunction<TrashDocsNativeMutation, TrashDocsNativeMutationVariables>;

/**
 * __useTrashDocsNativeMutation__
 *
 * To run a mutation, you first call `useTrashDocsNativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrashDocsNativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trashDocsNativeMutation, { data, loading, error }] = useTrashDocsNativeMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useTrashDocsNativeMutation(baseOptions?: Apollo.useMutation.Options<TrashDocsNativeMutation, TrashDocsNativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrashDocsNativeMutation, TrashDocsNativeMutationVariables>(TrashDocsNativeDocument, options);
      }
export type TrashDocsNativeMutationHookResult = ReturnType<typeof useTrashDocsNativeMutation>;
export type TrashDocsNativeMutationResult = Apollo.useMutation.Result<TrashDocsNativeMutation>;
export type TrashDocsNativeMutationOptions = Apollo.useMutation.Options<TrashDocsNativeMutation, TrashDocsNativeMutationVariables>;
export const RestoreTrashDocDocument = /*#__PURE__*/ gql`
    mutation restoreTrashDoc($request: TrashDocRequest!) {
  restoreTrashDoc(request: $request) {
    document {
      ...DocumentBase
      ...DocumentCollaborators
    }
  }
}
    ${DocumentBaseFragmentDoc}
${DocumentCollaboratorsFragmentDoc}`;
export type RestoreTrashDocMutationFn = Apollo.useMutation.MutationFunction<RestoreTrashDocMutation, RestoreTrashDocMutationVariables>;

/**
 * __useRestoreTrashDocMutation__
 *
 * To run a mutation, you first call `useRestoreTrashDocMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreTrashDocMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreTrashDocMutation, { data, loading, error }] = useRestoreTrashDocMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRestoreTrashDocMutation(baseOptions?: Apollo.useMutation.Options<RestoreTrashDocMutation, RestoreTrashDocMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreTrashDocMutation, RestoreTrashDocMutationVariables>(RestoreTrashDocDocument, options);
      }
export type RestoreTrashDocMutationHookResult = ReturnType<typeof useRestoreTrashDocMutation>;
export type RestoreTrashDocMutationResult = Apollo.useMutation.Result<RestoreTrashDocMutation>;
export type RestoreTrashDocMutationOptions = Apollo.useMutation.Options<RestoreTrashDocMutation, RestoreTrashDocMutationVariables>;
export const RestoreTrashDocNativeDocument = /*#__PURE__*/ gql`
    mutation restoreTrashDocNative($request: TrashDocRequest!) {
  restoreTrashDoc(request: $request) {
    document {
      ...DocumentNativeInfo
    }
  }
}
    ${DocumentNativeInfoFragmentDoc}`;
export type RestoreTrashDocNativeMutationFn = Apollo.useMutation.MutationFunction<RestoreTrashDocNativeMutation, RestoreTrashDocNativeMutationVariables>;

/**
 * __useRestoreTrashDocNativeMutation__
 *
 * To run a mutation, you first call `useRestoreTrashDocNativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreTrashDocNativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreTrashDocNativeMutation, { data, loading, error }] = useRestoreTrashDocNativeMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRestoreTrashDocNativeMutation(baseOptions?: Apollo.useMutation.Options<RestoreTrashDocNativeMutation, RestoreTrashDocNativeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreTrashDocNativeMutation, RestoreTrashDocNativeMutationVariables>(RestoreTrashDocNativeDocument, options);
      }
export type RestoreTrashDocNativeMutationHookResult = ReturnType<typeof useRestoreTrashDocNativeMutation>;
export type RestoreTrashDocNativeMutationResult = Apollo.useMutation.Result<RestoreTrashDocNativeMutation>;
export type RestoreTrashDocNativeMutationOptions = Apollo.useMutation.Options<RestoreTrashDocNativeMutation, RestoreTrashDocNativeMutationVariables>;
export const DuplicateDocDeepDocument = /*#__PURE__*/ gql`
    mutation duplicateDocDeep($request: DuplicateDocDeepRequest!) {
  duplicateDocDeep(request: $request) {
    docID
  }
}
    `;
export type DuplicateDocDeepMutationFn = Apollo.useMutation.MutationFunction<DuplicateDocDeepMutation, DuplicateDocDeepMutationVariables>;

/**
 * __useDuplicateDocDeepMutation__
 *
 * To run a mutation, you first call `useDuplicateDocDeepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateDocDeepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateDocDeepMutation, { data, loading, error }] = useDuplicateDocDeepMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDuplicateDocDeepMutation(baseOptions?: Apollo.useMutation.Options<DuplicateDocDeepMutation, DuplicateDocDeepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateDocDeepMutation, DuplicateDocDeepMutationVariables>(DuplicateDocDeepDocument, options);
      }
export type DuplicateDocDeepMutationHookResult = ReturnType<typeof useDuplicateDocDeepMutation>;
export type DuplicateDocDeepMutationResult = Apollo.useMutation.Result<DuplicateDocDeepMutation>;
export type DuplicateDocDeepMutationOptions = Apollo.useMutation.Options<DuplicateDocDeepMutation, DuplicateDocDeepMutationVariables>;
export const StoreWorkspaceEventDocument = /*#__PURE__*/ gql`
    mutation storeWorkspaceEvent($request: WorkspaceEventRequest!) {
  storeWorkspaceEvent(request: $request)
}
    `;
export type StoreWorkspaceEventMutationFn = Apollo.useMutation.MutationFunction<StoreWorkspaceEventMutation, StoreWorkspaceEventMutationVariables>;

/**
 * __useStoreWorkspaceEventMutation__
 *
 * To run a mutation, you first call `useStoreWorkspaceEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStoreWorkspaceEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [storeWorkspaceEventMutation, { data, loading, error }] = useStoreWorkspaceEventMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useStoreWorkspaceEventMutation(baseOptions?: Apollo.useMutation.Options<StoreWorkspaceEventMutation, StoreWorkspaceEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StoreWorkspaceEventMutation, StoreWorkspaceEventMutationVariables>(StoreWorkspaceEventDocument, options);
      }
export type StoreWorkspaceEventMutationHookResult = ReturnType<typeof useStoreWorkspaceEventMutation>;
export type StoreWorkspaceEventMutationResult = Apollo.useMutation.Result<StoreWorkspaceEventMutation>;
export type StoreWorkspaceEventMutationOptions = Apollo.useMutation.Options<StoreWorkspaceEventMutation, StoreWorkspaceEventMutationVariables>;
export const StoreUnauthenticatedWorkspaceEventDocument = /*#__PURE__*/ gql`
    mutation storeUnauthenticatedWorkspaceEvent($request: WorkspaceEventRequest!) {
  storeUnauthenticatedWorkspaceEvent(request: $request)
}
    `;
export type StoreUnauthenticatedWorkspaceEventMutationFn = Apollo.useMutation.MutationFunction<StoreUnauthenticatedWorkspaceEventMutation, StoreUnauthenticatedWorkspaceEventMutationVariables>;

/**
 * __useStoreUnauthenticatedWorkspaceEventMutation__
 *
 * To run a mutation, you first call `useStoreUnauthenticatedWorkspaceEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStoreUnauthenticatedWorkspaceEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [storeUnauthenticatedWorkspaceEventMutation, { data, loading, error }] = useStoreUnauthenticatedWorkspaceEventMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useStoreUnauthenticatedWorkspaceEventMutation(baseOptions?: Apollo.useMutation.Options<StoreUnauthenticatedWorkspaceEventMutation, StoreUnauthenticatedWorkspaceEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StoreUnauthenticatedWorkspaceEventMutation, StoreUnauthenticatedWorkspaceEventMutationVariables>(StoreUnauthenticatedWorkspaceEventDocument, options);
      }
export type StoreUnauthenticatedWorkspaceEventMutationHookResult = ReturnType<typeof useStoreUnauthenticatedWorkspaceEventMutation>;
export type StoreUnauthenticatedWorkspaceEventMutationResult = Apollo.useMutation.Result<StoreUnauthenticatedWorkspaceEventMutation>;
export type StoreUnauthenticatedWorkspaceEventMutationOptions = Apollo.useMutation.Options<StoreUnauthenticatedWorkspaceEventMutation, StoreUnauthenticatedWorkspaceEventMutationVariables>;
export const AddPendingInviteDocument = /*#__PURE__*/ gql`
    mutation addPendingInvite($request: AddPendingInviteRequest!) {
  addPendingInvite(request: $request) {
    status
  }
}
    `;
export type AddPendingInviteMutationFn = Apollo.useMutation.MutationFunction<AddPendingInviteMutation, AddPendingInviteMutationVariables>;

/**
 * __useAddPendingInviteMutation__
 *
 * To run a mutation, you first call `useAddPendingInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPendingInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPendingInviteMutation, { data, loading, error }] = useAddPendingInviteMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddPendingInviteMutation(baseOptions?: Apollo.useMutation.Options<AddPendingInviteMutation, AddPendingInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPendingInviteMutation, AddPendingInviteMutationVariables>(AddPendingInviteDocument, options);
      }
export type AddPendingInviteMutationHookResult = ReturnType<typeof useAddPendingInviteMutation>;
export type AddPendingInviteMutationResult = Apollo.useMutation.Result<AddPendingInviteMutation>;
export type AddPendingInviteMutationOptions = Apollo.useMutation.Options<AddPendingInviteMutation, AddPendingInviteMutationVariables>;
export const DeleteInviteDocument = /*#__PURE__*/ gql`
    mutation deleteInvite($request: DeleteInviteRequest!) {
  deleteInvite(request: $request) {
    status
  }
}
    `;
export type DeleteInviteMutationFn = Apollo.useMutation.MutationFunction<DeleteInviteMutation, DeleteInviteMutationVariables>;

/**
 * __useDeleteInviteMutation__
 *
 * To run a mutation, you first call `useDeleteInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInviteMutation, { data, loading, error }] = useDeleteInviteMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteInviteMutation(baseOptions?: Apollo.useMutation.Options<DeleteInviteMutation, DeleteInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInviteMutation, DeleteInviteMutationVariables>(DeleteInviteDocument, options);
      }
export type DeleteInviteMutationHookResult = ReturnType<typeof useDeleteInviteMutation>;
export type DeleteInviteMutationResult = Apollo.useMutation.Result<DeleteInviteMutation>;
export type DeleteInviteMutationOptions = Apollo.useMutation.Options<DeleteInviteMutation, DeleteInviteMutationVariables>;
export const AcceptInviteStep1Document = /*#__PURE__*/ gql`
    mutation acceptInviteStep1($request: AcceptInviteStep1Request!) {
  acceptInviteStep1(request: $request) {
    salt
    serverEphemeralPublic
    encryptedSessionKey
    encryptedPrivateHierarchicalKey
    permissionLevel
    publicHierarchicalKey
  }
}
    `;
export type AcceptInviteStep1MutationFn = Apollo.useMutation.MutationFunction<AcceptInviteStep1Mutation, AcceptInviteStep1MutationVariables>;

/**
 * __useAcceptInviteStep1Mutation__
 *
 * To run a mutation, you first call `useAcceptInviteStep1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteStep1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteStep1Mutation, { data, loading, error }] = useAcceptInviteStep1Mutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAcceptInviteStep1Mutation(baseOptions?: Apollo.useMutation.Options<AcceptInviteStep1Mutation, AcceptInviteStep1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptInviteStep1Mutation, AcceptInviteStep1MutationVariables>(AcceptInviteStep1Document, options);
      }
export type AcceptInviteStep1MutationHookResult = ReturnType<typeof useAcceptInviteStep1Mutation>;
export type AcceptInviteStep1MutationResult = Apollo.useMutation.Result<AcceptInviteStep1Mutation>;
export type AcceptInviteStep1MutationOptions = Apollo.useMutation.Options<AcceptInviteStep1Mutation, AcceptInviteStep1MutationVariables>;
export const UploadSpamReportDocument = /*#__PURE__*/ gql`
    mutation uploadSpamReport($request: UploadSpamReportRequest!) {
  uploadSpamReport(request: $request)
}
    `;
export type UploadSpamReportMutationFn = Apollo.useMutation.MutationFunction<UploadSpamReportMutation, UploadSpamReportMutationVariables>;

/**
 * __useUploadSpamReportMutation__
 *
 * To run a mutation, you first call `useUploadSpamReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadSpamReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadSpamReportMutation, { data, loading, error }] = useUploadSpamReportMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUploadSpamReportMutation(baseOptions?: Apollo.useMutation.Options<UploadSpamReportMutation, UploadSpamReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadSpamReportMutation, UploadSpamReportMutationVariables>(UploadSpamReportDocument, options);
      }
export type UploadSpamReportMutationHookResult = ReturnType<typeof useUploadSpamReportMutation>;
export type UploadSpamReportMutationResult = Apollo.useMutation.Result<UploadSpamReportMutation>;
export type UploadSpamReportMutationOptions = Apollo.useMutation.Options<UploadSpamReportMutation, UploadSpamReportMutationVariables>;
export const UnsilenceMultipleEmailAddressesDocument = /*#__PURE__*/ gql`
    mutation unsilenceMultipleEmailAddresses($request: UnsilenceMultipleEmailAddressesRequest!) {
  unsilenceMultipleEmailAddresses(request: $request)
}
    `;
export type UnsilenceMultipleEmailAddressesMutationFn = Apollo.useMutation.MutationFunction<UnsilenceMultipleEmailAddressesMutation, UnsilenceMultipleEmailAddressesMutationVariables>;

/**
 * __useUnsilenceMultipleEmailAddressesMutation__
 *
 * To run a mutation, you first call `useUnsilenceMultipleEmailAddressesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsilenceMultipleEmailAddressesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsilenceMultipleEmailAddressesMutation, { data, loading, error }] = useUnsilenceMultipleEmailAddressesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnsilenceMultipleEmailAddressesMutation(baseOptions?: Apollo.useMutation.Options<UnsilenceMultipleEmailAddressesMutation, UnsilenceMultipleEmailAddressesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsilenceMultipleEmailAddressesMutation, UnsilenceMultipleEmailAddressesMutationVariables>(UnsilenceMultipleEmailAddressesDocument, options);
      }
export type UnsilenceMultipleEmailAddressesMutationHookResult = ReturnType<typeof useUnsilenceMultipleEmailAddressesMutation>;
export type UnsilenceMultipleEmailAddressesMutationResult = Apollo.useMutation.Result<UnsilenceMultipleEmailAddressesMutation>;
export type UnsilenceMultipleEmailAddressesMutationOptions = Apollo.useMutation.Options<UnsilenceMultipleEmailAddressesMutation, UnsilenceMultipleEmailAddressesMutationVariables>;
export const NotificationClickedDocument = /*#__PURE__*/ gql`
    mutation notificationClicked($request: NotificationClickedRequest!) {
  notificationClicked(request: $request)
}
    `;
export type NotificationClickedMutationFn = Apollo.useMutation.MutationFunction<NotificationClickedMutation, NotificationClickedMutationVariables>;

/**
 * __useNotificationClickedMutation__
 *
 * To run a mutation, you first call `useNotificationClickedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationClickedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationClickedMutation, { data, loading, error }] = useNotificationClickedMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useNotificationClickedMutation(baseOptions?: Apollo.useMutation.Options<NotificationClickedMutation, NotificationClickedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationClickedMutation, NotificationClickedMutationVariables>(NotificationClickedDocument, options);
      }
export type NotificationClickedMutationHookResult = ReturnType<typeof useNotificationClickedMutation>;
export type NotificationClickedMutationResult = Apollo.useMutation.Result<NotificationClickedMutation>;
export type NotificationClickedMutationOptions = Apollo.useMutation.Options<NotificationClickedMutation, NotificationClickedMutationVariables>;
export const CreateTeamDocument = /*#__PURE__*/ gql`
    mutation createTeam($request: CreateTeamRequest!) {
  createTeam(request: $request) {
    teamID
    name
    icon
    rootDocument {
      ...DocumentBasicInfo
      ...DocumentDecryptedMetadata
    }
    organization {
      orgID
      teams {
        teamID
        name
      }
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}`;
export type CreateTeamMutationFn = Apollo.useMutation.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.useMutation.Options<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.useMutation.Result<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.useMutation.Options<CreateTeamMutation, CreateTeamMutationVariables>;
export const ShareTeamDocWithOtherTeamDocument = /*#__PURE__*/ gql`
    mutation shareTeamDocWithOtherTeam($request: ShareTeamDocWithOtherTeamRequest!) {
  shareTeamDocWithOtherTeam(request: $request) {
    teamID
    name
    icon
    rootDocument {
      ...DocumentBasicInfo
      ...DocumentDecryptedMetadata
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}`;
export type ShareTeamDocWithOtherTeamMutationFn = Apollo.useMutation.MutationFunction<ShareTeamDocWithOtherTeamMutation, ShareTeamDocWithOtherTeamMutationVariables>;

/**
 * __useShareTeamDocWithOtherTeamMutation__
 *
 * To run a mutation, you first call `useShareTeamDocWithOtherTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareTeamDocWithOtherTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareTeamDocWithOtherTeamMutation, { data, loading, error }] = useShareTeamDocWithOtherTeamMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useShareTeamDocWithOtherTeamMutation(baseOptions?: Apollo.useMutation.Options<ShareTeamDocWithOtherTeamMutation, ShareTeamDocWithOtherTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShareTeamDocWithOtherTeamMutation, ShareTeamDocWithOtherTeamMutationVariables>(ShareTeamDocWithOtherTeamDocument, options);
      }
export type ShareTeamDocWithOtherTeamMutationHookResult = ReturnType<typeof useShareTeamDocWithOtherTeamMutation>;
export type ShareTeamDocWithOtherTeamMutationResult = Apollo.useMutation.Result<ShareTeamDocWithOtherTeamMutation>;
export type ShareTeamDocWithOtherTeamMutationOptions = Apollo.useMutation.Options<ShareTeamDocWithOtherTeamMutation, ShareTeamDocWithOtherTeamMutationVariables>;
export const UnshareTeamDocWithOtherTeamDocument = /*#__PURE__*/ gql`
    mutation unshareTeamDocWithOtherTeam($request: UnshareTeamDocWithOtherTeamRequest!) {
  unshareTeamDocWithOtherTeam(request: $request) {
    teamID
    name
    icon
    rootDocument {
      ...DocumentBasicInfo
      ...DocumentDecryptedMetadata
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}`;
export type UnshareTeamDocWithOtherTeamMutationFn = Apollo.useMutation.MutationFunction<UnshareTeamDocWithOtherTeamMutation, UnshareTeamDocWithOtherTeamMutationVariables>;

/**
 * __useUnshareTeamDocWithOtherTeamMutation__
 *
 * To run a mutation, you first call `useUnshareTeamDocWithOtherTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnshareTeamDocWithOtherTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unshareTeamDocWithOtherTeamMutation, { data, loading, error }] = useUnshareTeamDocWithOtherTeamMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUnshareTeamDocWithOtherTeamMutation(baseOptions?: Apollo.useMutation.Options<UnshareTeamDocWithOtherTeamMutation, UnshareTeamDocWithOtherTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnshareTeamDocWithOtherTeamMutation, UnshareTeamDocWithOtherTeamMutationVariables>(UnshareTeamDocWithOtherTeamDocument, options);
      }
export type UnshareTeamDocWithOtherTeamMutationHookResult = ReturnType<typeof useUnshareTeamDocWithOtherTeamMutation>;
export type UnshareTeamDocWithOtherTeamMutationResult = Apollo.useMutation.Result<UnshareTeamDocWithOtherTeamMutation>;
export type UnshareTeamDocWithOtherTeamMutationOptions = Apollo.useMutation.Options<UnshareTeamDocWithOtherTeamMutation, UnshareTeamDocWithOtherTeamMutationVariables>;
export const DeleteTeamDocument = /*#__PURE__*/ gql`
    mutation deleteTeam($request: DeleteTeamRequest!) {
  deleteTeam(request: $request)
}
    `;
export type DeleteTeamMutationFn = Apollo.useMutation.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.useMutation.Options<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.useMutation.Result<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.useMutation.Options<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const EditOrganizationDocument = /*#__PURE__*/ gql`
    mutation editOrganization($request: EditOrganizationRequest!) {
  editOrganization(request: $request) {
    organization {
      orgID
      name
      hasCustomized
    }
  }
}
    `;
export type EditOrganizationMutationFn = Apollo.useMutation.MutationFunction<EditOrganizationMutation, EditOrganizationMutationVariables>;

/**
 * __useEditOrganizationMutation__
 *
 * To run a mutation, you first call `useEditOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrganizationMutation, { data, loading, error }] = useEditOrganizationMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useEditOrganizationMutation(baseOptions?: Apollo.useMutation.Options<EditOrganizationMutation, EditOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrganizationMutation, EditOrganizationMutationVariables>(EditOrganizationDocument, options);
      }
export type EditOrganizationMutationHookResult = ReturnType<typeof useEditOrganizationMutation>;
export type EditOrganizationMutationResult = Apollo.useMutation.Result<EditOrganizationMutation>;
export type EditOrganizationMutationOptions = Apollo.useMutation.Options<EditOrganizationMutation, EditOrganizationMutationVariables>;
export const EditTeamDocument = /*#__PURE__*/ gql`
    mutation editTeam($request: EditTeamRequest!) {
  editTeam(request: $request) {
    teamID
    name
    icon
  }
}
    `;
export type EditTeamMutationFn = Apollo.useMutation.MutationFunction<EditTeamMutation, EditTeamMutationVariables>;

/**
 * __useEditTeamMutation__
 *
 * To run a mutation, you first call `useEditTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTeamMutation, { data, loading, error }] = useEditTeamMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useEditTeamMutation(baseOptions?: Apollo.useMutation.Options<EditTeamMutation, EditTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTeamMutation, EditTeamMutationVariables>(EditTeamDocument, options);
      }
export type EditTeamMutationHookResult = ReturnType<typeof useEditTeamMutation>;
export type EditTeamMutationResult = Apollo.useMutation.Result<EditTeamMutation>;
export type EditTeamMutationOptions = Apollo.useMutation.Options<EditTeamMutation, EditTeamMutationVariables>;
export const DeleteUserOrganizationMembershipDocument = /*#__PURE__*/ gql`
    mutation deleteUserOrganizationMembership($request: DeleteUserOrganizationMembershipRequest!) {
  deleteUserOrganizationMembership(request: $request)
}
    `;
export type DeleteUserOrganizationMembershipMutationFn = Apollo.useMutation.MutationFunction<DeleteUserOrganizationMembershipMutation, DeleteUserOrganizationMembershipMutationVariables>;

/**
 * __useDeleteUserOrganizationMembershipMutation__
 *
 * To run a mutation, you first call `useDeleteUserOrganizationMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserOrganizationMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserOrganizationMembershipMutation, { data, loading, error }] = useDeleteUserOrganizationMembershipMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteUserOrganizationMembershipMutation(baseOptions?: Apollo.useMutation.Options<DeleteUserOrganizationMembershipMutation, DeleteUserOrganizationMembershipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserOrganizationMembershipMutation, DeleteUserOrganizationMembershipMutationVariables>(DeleteUserOrganizationMembershipDocument, options);
      }
export type DeleteUserOrganizationMembershipMutationHookResult = ReturnType<typeof useDeleteUserOrganizationMembershipMutation>;
export type DeleteUserOrganizationMembershipMutationResult = Apollo.useMutation.Result<DeleteUserOrganizationMembershipMutation>;
export type DeleteUserOrganizationMembershipMutationOptions = Apollo.useMutation.Options<DeleteUserOrganizationMembershipMutation, DeleteUserOrganizationMembershipMutationVariables>;
export const ManageOrganizationPaymentDetailsDocument = /*#__PURE__*/ gql`
    mutation manageOrganizationPaymentDetails($request: ManageOrganizationPaymentDetailsRequest!) {
  manageOrganizationPaymentDetails(request: $request) {
    redirectURL
  }
}
    `;
export type ManageOrganizationPaymentDetailsMutationFn = Apollo.useMutation.MutationFunction<ManageOrganizationPaymentDetailsMutation, ManageOrganizationPaymentDetailsMutationVariables>;

/**
 * __useManageOrganizationPaymentDetailsMutation__
 *
 * To run a mutation, you first call `useManageOrganizationPaymentDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useManageOrganizationPaymentDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [manageOrganizationPaymentDetailsMutation, { data, loading, error }] = useManageOrganizationPaymentDetailsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useManageOrganizationPaymentDetailsMutation(baseOptions?: Apollo.useMutation.Options<ManageOrganizationPaymentDetailsMutation, ManageOrganizationPaymentDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ManageOrganizationPaymentDetailsMutation, ManageOrganizationPaymentDetailsMutationVariables>(ManageOrganizationPaymentDetailsDocument, options);
      }
export type ManageOrganizationPaymentDetailsMutationHookResult = ReturnType<typeof useManageOrganizationPaymentDetailsMutation>;
export type ManageOrganizationPaymentDetailsMutationResult = Apollo.useMutation.Result<ManageOrganizationPaymentDetailsMutation>;
export type ManageOrganizationPaymentDetailsMutationOptions = Apollo.useMutation.Options<ManageOrganizationPaymentDetailsMutation, ManageOrganizationPaymentDetailsMutationVariables>;
export const ReferUserDocument = /*#__PURE__*/ gql`
    mutation referUser($request: ReferUserRequest!) {
  referUser(request: $request) {
    status
  }
}
    `;
export type ReferUserMutationFn = Apollo.useMutation.MutationFunction<ReferUserMutation, ReferUserMutationVariables>;

/**
 * __useReferUserMutation__
 *
 * To run a mutation, you first call `useReferUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReferUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [referUserMutation, { data, loading, error }] = useReferUserMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useReferUserMutation(baseOptions?: Apollo.useMutation.Options<ReferUserMutation, ReferUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReferUserMutation, ReferUserMutationVariables>(ReferUserDocument, options);
      }
export type ReferUserMutationHookResult = ReturnType<typeof useReferUserMutation>;
export type ReferUserMutationResult = Apollo.useMutation.Result<ReferUserMutation>;
export type ReferUserMutationOptions = Apollo.useMutation.Options<ReferUserMutation, ReferUserMutationVariables>;
export const EnrollMfaDocument = /*#__PURE__*/ gql`
    mutation enrollMfa($request: EnrollMfaRequest!) {
  enrollMfa(request: $request) {
    status
    backupCodes
  }
}
    `;
export type EnrollMfaMutationFn = Apollo.useMutation.MutationFunction<EnrollMfaMutation, EnrollMfaMutationVariables>;

/**
 * __useEnrollMfaMutation__
 *
 * To run a mutation, you first call `useEnrollMfaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollMfaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollMfaMutation, { data, loading, error }] = useEnrollMfaMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useEnrollMfaMutation(baseOptions?: Apollo.useMutation.Options<EnrollMfaMutation, EnrollMfaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrollMfaMutation, EnrollMfaMutationVariables>(EnrollMfaDocument, options);
      }
export type EnrollMfaMutationHookResult = ReturnType<typeof useEnrollMfaMutation>;
export type EnrollMfaMutationResult = Apollo.useMutation.Result<EnrollMfaMutation>;
export type EnrollMfaMutationOptions = Apollo.useMutation.Options<EnrollMfaMutation, EnrollMfaMutationVariables>;
export const DisableMfaDocument = /*#__PURE__*/ gql`
    mutation disableMfa($request: DisableMfaRequest!) {
  disableMfa(request: $request) {
    status
  }
}
    `;
export type DisableMfaMutationFn = Apollo.useMutation.MutationFunction<DisableMfaMutation, DisableMfaMutationVariables>;

/**
 * __useDisableMfaMutation__
 *
 * To run a mutation, you first call `useDisableMfaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableMfaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableMfaMutation, { data, loading, error }] = useDisableMfaMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDisableMfaMutation(baseOptions?: Apollo.useMutation.Options<DisableMfaMutation, DisableMfaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableMfaMutation, DisableMfaMutationVariables>(DisableMfaDocument, options);
      }
export type DisableMfaMutationHookResult = ReturnType<typeof useDisableMfaMutation>;
export type DisableMfaMutationResult = Apollo.useMutation.Result<DisableMfaMutation>;
export type DisableMfaMutationOptions = Apollo.useMutation.Options<DisableMfaMutation, DisableMfaMutationVariables>;
export const RegenerateMfaBackupCodesDocument = /*#__PURE__*/ gql`
    mutation regenerateMfaBackupCodes($request: RegenerateMfaBackupCodesRequest!) {
  regenerateMfaBackupCodes(request: $request) {
    status
    backupCodes
  }
}
    `;
export type RegenerateMfaBackupCodesMutationFn = Apollo.useMutation.MutationFunction<RegenerateMfaBackupCodesMutation, RegenerateMfaBackupCodesMutationVariables>;

/**
 * __useRegenerateMfaBackupCodesMutation__
 *
 * To run a mutation, you first call `useRegenerateMfaBackupCodesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegenerateMfaBackupCodesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [regenerateMfaBackupCodesMutation, { data, loading, error }] = useRegenerateMfaBackupCodesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRegenerateMfaBackupCodesMutation(baseOptions?: Apollo.useMutation.Options<RegenerateMfaBackupCodesMutation, RegenerateMfaBackupCodesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegenerateMfaBackupCodesMutation, RegenerateMfaBackupCodesMutationVariables>(RegenerateMfaBackupCodesDocument, options);
      }
export type RegenerateMfaBackupCodesMutationHookResult = ReturnType<typeof useRegenerateMfaBackupCodesMutation>;
export type RegenerateMfaBackupCodesMutationResult = Apollo.useMutation.Result<RegenerateMfaBackupCodesMutation>;
export type RegenerateMfaBackupCodesMutationOptions = Apollo.useMutation.Options<RegenerateMfaBackupCodesMutation, RegenerateMfaBackupCodesMutationVariables>;
export const UpdateDisplayNameDocument = /*#__PURE__*/ gql`
    mutation updateDisplayName($request: UpdateDisplayNameRequest!) {
  updateDisplayName(request: $request) {
    status
  }
}
    `;
export type UpdateDisplayNameMutationFn = Apollo.useMutation.MutationFunction<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>;

/**
 * __useUpdateDisplayNameMutation__
 *
 * To run a mutation, you first call `useUpdateDisplayNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDisplayNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDisplayNameMutation, { data, loading, error }] = useUpdateDisplayNameMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateDisplayNameMutation(baseOptions?: Apollo.useMutation.Options<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>(UpdateDisplayNameDocument, options);
      }
export type UpdateDisplayNameMutationHookResult = ReturnType<typeof useUpdateDisplayNameMutation>;
export type UpdateDisplayNameMutationResult = Apollo.useMutation.Result<UpdateDisplayNameMutation>;
export type UpdateDisplayNameMutationOptions = Apollo.useMutation.Options<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>;
export const UpdateDocumentDataDocument = /*#__PURE__*/ gql`
    mutation updateDocumentData($request: UpdateDocumentDataRequest!) {
  updateDocumentData(request: $request) {
    status
  }
}
    `;
export type UpdateDocumentDataMutationFn = Apollo.useMutation.MutationFunction<UpdateDocumentDataMutation, UpdateDocumentDataMutationVariables>;

/**
 * __useUpdateDocumentDataMutation__
 *
 * To run a mutation, you first call `useUpdateDocumentDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDocumentDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDocumentDataMutation, { data, loading, error }] = useUpdateDocumentDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateDocumentDataMutation(baseOptions?: Apollo.useMutation.Options<UpdateDocumentDataMutation, UpdateDocumentDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDocumentDataMutation, UpdateDocumentDataMutationVariables>(UpdateDocumentDataDocument, options);
      }
export type UpdateDocumentDataMutationHookResult = ReturnType<typeof useUpdateDocumentDataMutation>;
export type UpdateDocumentDataMutationResult = Apollo.useMutation.Result<UpdateDocumentDataMutation>;
export type UpdateDocumentDataMutationOptions = Apollo.useMutation.Options<UpdateDocumentDataMutation, UpdateDocumentDataMutationVariables>;
export const DeleteAccountDocument = /*#__PURE__*/ gql`
    mutation deleteAccount($request: DeleteAccountRequest!) {
  deleteAccount(request: $request) {
    status
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.useMutation.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.useMutation.Options<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.useMutation.Result<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.useMutation.Options<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteMailAccountDocument = /*#__PURE__*/ gql`
    mutation deleteMailAccount($request: DeleteMailAccountRequest!) {
  deleteMailAccount(deleteRequest: $request) {
    status
  }
}
    `;
export type DeleteMailAccountMutationFn = Apollo.useMutation.MutationFunction<DeleteMailAccountMutation, DeleteMailAccountMutationVariables>;

/**
 * __useDeleteMailAccountMutation__
 *
 * To run a mutation, you first call `useDeleteMailAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMailAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMailAccountMutation, { data, loading, error }] = useDeleteMailAccountMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useDeleteMailAccountMutation(baseOptions?: Apollo.useMutation.Options<DeleteMailAccountMutation, DeleteMailAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMailAccountMutation, DeleteMailAccountMutationVariables>(DeleteMailAccountDocument, options);
      }
export type DeleteMailAccountMutationHookResult = ReturnType<typeof useDeleteMailAccountMutation>;
export type DeleteMailAccountMutationResult = Apollo.useMutation.Result<DeleteMailAccountMutation>;
export type DeleteMailAccountMutationOptions = Apollo.useMutation.Options<DeleteMailAccountMutation, DeleteMailAccountMutationVariables>;
export const UploadRecoveryDataDocument = /*#__PURE__*/ gql`
    mutation uploadRecoveryData($request: UploadRecoveryDataRequest!) {
  uploadRecoveryData(request: $request) {
    status
  }
}
    `;
export type UploadRecoveryDataMutationFn = Apollo.useMutation.MutationFunction<UploadRecoveryDataMutation, UploadRecoveryDataMutationVariables>;

/**
 * __useUploadRecoveryDataMutation__
 *
 * To run a mutation, you first call `useUploadRecoveryDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadRecoveryDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadRecoveryDataMutation, { data, loading, error }] = useUploadRecoveryDataMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUploadRecoveryDataMutation(baseOptions?: Apollo.useMutation.Options<UploadRecoveryDataMutation, UploadRecoveryDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadRecoveryDataMutation, UploadRecoveryDataMutationVariables>(UploadRecoveryDataDocument, options);
      }
export type UploadRecoveryDataMutationHookResult = ReturnType<typeof useUploadRecoveryDataMutation>;
export type UploadRecoveryDataMutationResult = Apollo.useMutation.Result<UploadRecoveryDataMutation>;
export type UploadRecoveryDataMutationOptions = Apollo.useMutation.Options<UploadRecoveryDataMutation, UploadRecoveryDataMutationVariables>;
export const ResetAccountDocument = /*#__PURE__*/ gql`
    mutation resetAccount($request: ResetAccountRequest!) {
  resetAccount(request: $request)
}
    `;
export type ResetAccountMutationFn = Apollo.useMutation.MutationFunction<ResetAccountMutation, ResetAccountMutationVariables>;

/**
 * __useResetAccountMutation__
 *
 * To run a mutation, you first call `useResetAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetAccountMutation, { data, loading, error }] = useResetAccountMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useResetAccountMutation(baseOptions?: Apollo.useMutation.Options<ResetAccountMutation, ResetAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetAccountMutation, ResetAccountMutationVariables>(ResetAccountDocument, options);
      }
export type ResetAccountMutationHookResult = ReturnType<typeof useResetAccountMutation>;
export type ResetAccountMutationResult = Apollo.useMutation.Result<ResetAccountMutation>;
export type ResetAccountMutationOptions = Apollo.useMutation.Options<ResetAccountMutation, ResetAccountMutationVariables>;
export const AddEmailDocument = /*#__PURE__*/ gql`
    mutation addEmail($request: AddEmailRequest!) {
  addEmail(request: $request) {
    status
  }
}
    `;
export type AddEmailMutationFn = Apollo.useMutation.MutationFunction<AddEmailMutation, AddEmailMutationVariables>;

/**
 * __useAddEmailMutation__
 *
 * To run a mutation, you first call `useAddEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmailMutation, { data, loading, error }] = useAddEmailMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddEmailMutation(baseOptions?: Apollo.useMutation.Options<AddEmailMutation, AddEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEmailMutation, AddEmailMutationVariables>(AddEmailDocument, options);
      }
export type AddEmailMutationHookResult = ReturnType<typeof useAddEmailMutation>;
export type AddEmailMutationResult = Apollo.useMutation.Result<AddEmailMutation>;
export type AddEmailMutationOptions = Apollo.useMutation.Options<AddEmailMutation, AddEmailMutationVariables>;
export const DeleteRecoveryEmailDocument = /*#__PURE__*/ gql`
    mutation deleteRecoveryEmail {
  deleteRecoveryEmail
}
    `;
export type DeleteRecoveryEmailMutationFn = Apollo.useMutation.MutationFunction<DeleteRecoveryEmailMutation, DeleteRecoveryEmailMutationVariables>;

/**
 * __useDeleteRecoveryEmailMutation__
 *
 * To run a mutation, you first call `useDeleteRecoveryEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecoveryEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecoveryEmailMutation, { data, loading, error }] = useDeleteRecoveryEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteRecoveryEmailMutation(baseOptions?: Apollo.useMutation.Options<DeleteRecoveryEmailMutation, DeleteRecoveryEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecoveryEmailMutation, DeleteRecoveryEmailMutationVariables>(DeleteRecoveryEmailDocument, options);
      }
export type DeleteRecoveryEmailMutationHookResult = ReturnType<typeof useDeleteRecoveryEmailMutation>;
export type DeleteRecoveryEmailMutationResult = Apollo.useMutation.Result<DeleteRecoveryEmailMutation>;
export type DeleteRecoveryEmailMutationOptions = Apollo.useMutation.Options<DeleteRecoveryEmailMutation, DeleteRecoveryEmailMutationVariables>;
export const SetUseIpfsDocument = /*#__PURE__*/ gql`
    mutation setUseIPFS($request: SetUseIPFSRequest!) {
  setUseIPFS(request: $request) {
    status
  }
}
    `;
export type SetUseIpfsMutationFn = Apollo.useMutation.MutationFunction<SetUseIpfsMutation, SetUseIpfsMutationVariables>;

/**
 * __useSetUseIpfsMutation__
 *
 * To run a mutation, you first call `useSetUseIpfsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUseIpfsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUseIpfsMutation, { data, loading, error }] = useSetUseIpfsMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetUseIpfsMutation(baseOptions?: Apollo.useMutation.Options<SetUseIpfsMutation, SetUseIpfsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUseIpfsMutation, SetUseIpfsMutationVariables>(SetUseIpfsDocument, options);
      }
export type SetUseIpfsMutationHookResult = ReturnType<typeof useSetUseIpfsMutation>;
export type SetUseIpfsMutationResult = Apollo.useMutation.Result<SetUseIpfsMutation>;
export type SetUseIpfsMutationOptions = Apollo.useMutation.Options<SetUseIpfsMutation, SetUseIpfsMutationVariables>;
export const SetNotificationPreferencesDocument = /*#__PURE__*/ gql`
    mutation setNotificationPreferences($request: SetNotificationPreferencesRequest!) {
  setNotificationPreferences(request: $request)
}
    `;
export type SetNotificationPreferencesMutationFn = Apollo.useMutation.MutationFunction<SetNotificationPreferencesMutation, SetNotificationPreferencesMutationVariables>;

/**
 * __useSetNotificationPreferencesMutation__
 *
 * To run a mutation, you first call `useSetNotificationPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNotificationPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNotificationPreferencesMutation, { data, loading, error }] = useSetNotificationPreferencesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetNotificationPreferencesMutation(baseOptions?: Apollo.useMutation.Options<SetNotificationPreferencesMutation, SetNotificationPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetNotificationPreferencesMutation, SetNotificationPreferencesMutationVariables>(SetNotificationPreferencesDocument, options);
      }
export type SetNotificationPreferencesMutationHookResult = ReturnType<typeof useSetNotificationPreferencesMutation>;
export type SetNotificationPreferencesMutationResult = Apollo.useMutation.Result<SetNotificationPreferencesMutation>;
export type SetNotificationPreferencesMutationOptions = Apollo.useMutation.Options<SetNotificationPreferencesMutation, SetNotificationPreferencesMutationVariables>;
export const SetPdSubscribeFlagDocument = /*#__PURE__*/ gql`
    mutation setPDSubscribeFlag($request: SetPDSubscribeFlagRequest!) {
  setPDSubscribeFlag(request: $request)
}
    `;
export type SetPdSubscribeFlagMutationFn = Apollo.useMutation.MutationFunction<SetPdSubscribeFlagMutation, SetPdSubscribeFlagMutationVariables>;

/**
 * __useSetPdSubscribeFlagMutation__
 *
 * To run a mutation, you first call `useSetPdSubscribeFlagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPdSubscribeFlagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPdSubscribeFlagMutation, { data, loading, error }] = useSetPdSubscribeFlagMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetPdSubscribeFlagMutation(baseOptions?: Apollo.useMutation.Options<SetPdSubscribeFlagMutation, SetPdSubscribeFlagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPdSubscribeFlagMutation, SetPdSubscribeFlagMutationVariables>(SetPdSubscribeFlagDocument, options);
      }
export type SetPdSubscribeFlagMutationHookResult = ReturnType<typeof useSetPdSubscribeFlagMutation>;
export type SetPdSubscribeFlagMutationResult = Apollo.useMutation.Result<SetPdSubscribeFlagMutation>;
export type SetPdSubscribeFlagMutationOptions = Apollo.useMutation.Options<SetPdSubscribeFlagMutation, SetPdSubscribeFlagMutationVariables>;
export const SetPgpKeyDocument = /*#__PURE__*/ gql`
    mutation setPGPKey($request: SetPGPKey!) {
  setPGPKey(request: $request)
}
    `;
export type SetPgpKeyMutationFn = Apollo.useMutation.MutationFunction<SetPgpKeyMutation, SetPgpKeyMutationVariables>;

/**
 * __useSetPgpKeyMutation__
 *
 * To run a mutation, you first call `useSetPgpKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPgpKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPgpKeyMutation, { data, loading, error }] = useSetPgpKeyMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetPgpKeyMutation(baseOptions?: Apollo.useMutation.Options<SetPgpKeyMutation, SetPgpKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPgpKeyMutation, SetPgpKeyMutationVariables>(SetPgpKeyDocument, options);
      }
export type SetPgpKeyMutationHookResult = ReturnType<typeof useSetPgpKeyMutation>;
export type SetPgpKeyMutationResult = Apollo.useMutation.Result<SetPgpKeyMutation>;
export type SetPgpKeyMutationOptions = Apollo.useMutation.Options<SetPgpKeyMutation, SetPgpKeyMutationVariables>;
export const SendAnonymousSubdomainTutorialEmailDocument = /*#__PURE__*/ gql`
    mutation sendAnonymousSubdomainTutorialEmail($email: String!) {
  sendAnonymousSubdomainTutorialEmail(email: $email)
}
    `;
export type SendAnonymousSubdomainTutorialEmailMutationFn = Apollo.useMutation.MutationFunction<SendAnonymousSubdomainTutorialEmailMutation, SendAnonymousSubdomainTutorialEmailMutationVariables>;

/**
 * __useSendAnonymousSubdomainTutorialEmailMutation__
 *
 * To run a mutation, you first call `useSendAnonymousSubdomainTutorialEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendAnonymousSubdomainTutorialEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendAnonymousSubdomainTutorialEmailMutation, { data, loading, error }] = useSendAnonymousSubdomainTutorialEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendAnonymousSubdomainTutorialEmailMutation(baseOptions?: Apollo.useMutation.Options<SendAnonymousSubdomainTutorialEmailMutation, SendAnonymousSubdomainTutorialEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendAnonymousSubdomainTutorialEmailMutation, SendAnonymousSubdomainTutorialEmailMutationVariables>(SendAnonymousSubdomainTutorialEmailDocument, options);
      }
export type SendAnonymousSubdomainTutorialEmailMutationHookResult = ReturnType<typeof useSendAnonymousSubdomainTutorialEmailMutation>;
export type SendAnonymousSubdomainTutorialEmailMutationResult = Apollo.useMutation.Result<SendAnonymousSubdomainTutorialEmailMutation>;
export type SendAnonymousSubdomainTutorialEmailMutationOptions = Apollo.useMutation.Options<SendAnonymousSubdomainTutorialEmailMutation, SendAnonymousSubdomainTutorialEmailMutationVariables>;
export const CreateQuickAliasDomainDocument = /*#__PURE__*/ gql`
    mutation createQuickAliasDomain($request: CreateAnonymousSubdomainInput!) {
  createAnonymousSubdomain(request: $request)
}
    `;
export type CreateQuickAliasDomainMutationFn = Apollo.useMutation.MutationFunction<CreateQuickAliasDomainMutation, CreateQuickAliasDomainMutationVariables>;

/**
 * __useCreateQuickAliasDomainMutation__
 *
 * To run a mutation, you first call `useCreateQuickAliasDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuickAliasDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuickAliasDomainMutation, { data, loading, error }] = useCreateQuickAliasDomainMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateQuickAliasDomainMutation(baseOptions?: Apollo.useMutation.Options<CreateQuickAliasDomainMutation, CreateQuickAliasDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuickAliasDomainMutation, CreateQuickAliasDomainMutationVariables>(CreateQuickAliasDomainDocument, options);
      }
export type CreateQuickAliasDomainMutationHookResult = ReturnType<typeof useCreateQuickAliasDomainMutation>;
export type CreateQuickAliasDomainMutationResult = Apollo.useMutation.Result<CreateQuickAliasDomainMutation>;
export type CreateQuickAliasDomainMutationOptions = Apollo.useMutation.Options<CreateQuickAliasDomainMutation, CreateQuickAliasDomainMutationVariables>;
export const DeleteQuickAliasDomainDocument = /*#__PURE__*/ gql`
    mutation deleteQuickAliasDomain($userDomainID: String!) {
  deleteAnonymousSubdomain(userDomainID: $userDomainID)
}
    `;
export type DeleteQuickAliasDomainMutationFn = Apollo.useMutation.MutationFunction<DeleteQuickAliasDomainMutation, DeleteQuickAliasDomainMutationVariables>;

/**
 * __useDeleteQuickAliasDomainMutation__
 *
 * To run a mutation, you first call `useDeleteQuickAliasDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuickAliasDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuickAliasDomainMutation, { data, loading, error }] = useDeleteQuickAliasDomainMutation({
 *   variables: {
 *      userDomainID: // value for 'userDomainID'
 *   },
 * });
 */
export function useDeleteQuickAliasDomainMutation(baseOptions?: Apollo.useMutation.Options<DeleteQuickAliasDomainMutation, DeleteQuickAliasDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuickAliasDomainMutation, DeleteQuickAliasDomainMutationVariables>(DeleteQuickAliasDomainDocument, options);
      }
export type DeleteQuickAliasDomainMutationHookResult = ReturnType<typeof useDeleteQuickAliasDomainMutation>;
export type DeleteQuickAliasDomainMutationResult = Apollo.useMutation.Result<DeleteQuickAliasDomainMutation>;
export type DeleteQuickAliasDomainMutationOptions = Apollo.useMutation.Options<DeleteQuickAliasDomainMutation, DeleteQuickAliasDomainMutationVariables>;
export const UpdateQuickAliasInfoDocument = /*#__PURE__*/ gql`
    mutation updateQuickAliasInfo($request: UpdateQuickAliasInfoInput!) {
  updateQuickAliasInfo(request: $request)
}
    `;
export type UpdateQuickAliasInfoMutationFn = Apollo.useMutation.MutationFunction<UpdateQuickAliasInfoMutation, UpdateQuickAliasInfoMutationVariables>;

/**
 * __useUpdateQuickAliasInfoMutation__
 *
 * To run a mutation, you first call `useUpdateQuickAliasInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuickAliasInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuickAliasInfoMutation, { data, loading, error }] = useUpdateQuickAliasInfoMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateQuickAliasInfoMutation(baseOptions?: Apollo.useMutation.Options<UpdateQuickAliasInfoMutation, UpdateQuickAliasInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuickAliasInfoMutation, UpdateQuickAliasInfoMutationVariables>(UpdateQuickAliasInfoDocument, options);
      }
export type UpdateQuickAliasInfoMutationHookResult = ReturnType<typeof useUpdateQuickAliasInfoMutation>;
export type UpdateQuickAliasInfoMutationResult = Apollo.useMutation.Result<UpdateQuickAliasInfoMutation>;
export type UpdateQuickAliasInfoMutationOptions = Apollo.useMutation.Options<UpdateQuickAliasInfoMutation, UpdateQuickAliasInfoMutationVariables>;
export const CreateUploadAvatarLinkDocument = /*#__PURE__*/ gql`
    mutation createUploadAvatarLink {
  createUploadAvatarLink {
    writeUrl
    profileCustomURI
  }
}
    `;
export type CreateUploadAvatarLinkMutationFn = Apollo.useMutation.MutationFunction<CreateUploadAvatarLinkMutation, CreateUploadAvatarLinkMutationVariables>;

/**
 * __useCreateUploadAvatarLinkMutation__
 *
 * To run a mutation, you first call `useCreateUploadAvatarLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadAvatarLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadAvatarLinkMutation, { data, loading, error }] = useCreateUploadAvatarLinkMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateUploadAvatarLinkMutation(baseOptions?: Apollo.useMutation.Options<CreateUploadAvatarLinkMutation, CreateUploadAvatarLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUploadAvatarLinkMutation, CreateUploadAvatarLinkMutationVariables>(CreateUploadAvatarLinkDocument, options);
      }
export type CreateUploadAvatarLinkMutationHookResult = ReturnType<typeof useCreateUploadAvatarLinkMutation>;
export type CreateUploadAvatarLinkMutationResult = Apollo.useMutation.Result<CreateUploadAvatarLinkMutation>;
export type CreateUploadAvatarLinkMutationOptions = Apollo.useMutation.Options<CreateUploadAvatarLinkMutation, CreateUploadAvatarLinkMutationVariables>;
export const UpdateDisplayPictureDocument = /*#__PURE__*/ gql`
    mutation updateDisplayPicture($request: UpdateDisplayPictureRequest!) {
  updateDisplayPicture(request: $request) {
    ...UserProfileData
  }
}
    ${UserProfileDataFragmentDoc}`;
export type UpdateDisplayPictureMutationFn = Apollo.useMutation.MutationFunction<UpdateDisplayPictureMutation, UpdateDisplayPictureMutationVariables>;

/**
 * __useUpdateDisplayPictureMutation__
 *
 * To run a mutation, you first call `useUpdateDisplayPictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDisplayPictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDisplayPictureMutation, { data, loading, error }] = useUpdateDisplayPictureMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateDisplayPictureMutation(baseOptions?: Apollo.useMutation.Options<UpdateDisplayPictureMutation, UpdateDisplayPictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDisplayPictureMutation, UpdateDisplayPictureMutationVariables>(UpdateDisplayPictureDocument, options);
      }
export type UpdateDisplayPictureMutationHookResult = ReturnType<typeof useUpdateDisplayPictureMutation>;
export type UpdateDisplayPictureMutationResult = Apollo.useMutation.Result<UpdateDisplayPictureMutation>;
export type UpdateDisplayPictureMutationOptions = Apollo.useMutation.Options<UpdateDisplayPictureMutation, UpdateDisplayPictureMutationVariables>;
export const CreateCalendarUserDocument = /*#__PURE__*/ gql`
    mutation createCalendarUser($request: CreateCalendarUserRequest!) {
  createCalendarUser(request: $request)
}
    `;
export type CreateCalendarUserMutationFn = Apollo.useMutation.MutationFunction<CreateCalendarUserMutation, CreateCalendarUserMutationVariables>;

/**
 * __useCreateCalendarUserMutation__
 *
 * To run a mutation, you first call `useCreateCalendarUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCalendarUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCalendarUserMutation, { data, loading, error }] = useCreateCalendarUserMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateCalendarUserMutation(baseOptions?: Apollo.useMutation.Options<CreateCalendarUserMutation, CreateCalendarUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCalendarUserMutation, CreateCalendarUserMutationVariables>(CreateCalendarUserDocument, options);
      }
export type CreateCalendarUserMutationHookResult = ReturnType<typeof useCreateCalendarUserMutation>;
export type CreateCalendarUserMutationResult = Apollo.useMutation.Result<CreateCalendarUserMutation>;
export type CreateCalendarUserMutationOptions = Apollo.useMutation.Options<CreateCalendarUserMutation, CreateCalendarUserMutationVariables>;
export const MarkCurrentUserOnboardedWorkspaceMigrationDocument = /*#__PURE__*/ gql`
    mutation markCurrentUserOnboardedWorkspaceMigration {
  markCurrentUserOnboardedWorkspaceMigration
}
    `;
export type MarkCurrentUserOnboardedWorkspaceMigrationMutationFn = Apollo.useMutation.MutationFunction<MarkCurrentUserOnboardedWorkspaceMigrationMutation, MarkCurrentUserOnboardedWorkspaceMigrationMutationVariables>;

/**
 * __useMarkCurrentUserOnboardedWorkspaceMigrationMutation__
 *
 * To run a mutation, you first call `useMarkCurrentUserOnboardedWorkspaceMigrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkCurrentUserOnboardedWorkspaceMigrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markCurrentUserOnboardedWorkspaceMigrationMutation, { data, loading, error }] = useMarkCurrentUserOnboardedWorkspaceMigrationMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkCurrentUserOnboardedWorkspaceMigrationMutation(baseOptions?: Apollo.useMutation.Options<MarkCurrentUserOnboardedWorkspaceMigrationMutation, MarkCurrentUserOnboardedWorkspaceMigrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkCurrentUserOnboardedWorkspaceMigrationMutation, MarkCurrentUserOnboardedWorkspaceMigrationMutationVariables>(MarkCurrentUserOnboardedWorkspaceMigrationDocument, options);
      }
export type MarkCurrentUserOnboardedWorkspaceMigrationMutationHookResult = ReturnType<typeof useMarkCurrentUserOnboardedWorkspaceMigrationMutation>;
export type MarkCurrentUserOnboardedWorkspaceMigrationMutationResult = Apollo.useMutation.Result<MarkCurrentUserOnboardedWorkspaceMigrationMutation>;
export type MarkCurrentUserOnboardedWorkspaceMigrationMutationOptions = Apollo.useMutation.Options<MarkCurrentUserOnboardedWorkspaceMigrationMutation, MarkCurrentUserOnboardedWorkspaceMigrationMutationVariables>;
export const SetDefaultEmailAliasDocument = /*#__PURE__*/ gql`
    mutation setDefaultEmailAlias($request: SetDefaultEmailAliasRequest!) {
  setDefaultEmailAlias(request: $request)
}
    `;
export type SetDefaultEmailAliasMutationFn = Apollo.useMutation.MutationFunction<SetDefaultEmailAliasMutation, SetDefaultEmailAliasMutationVariables>;

/**
 * __useSetDefaultEmailAliasMutation__
 *
 * To run a mutation, you first call `useSetDefaultEmailAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultEmailAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultEmailAliasMutation, { data, loading, error }] = useSetDefaultEmailAliasMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetDefaultEmailAliasMutation(baseOptions?: Apollo.useMutation.Options<SetDefaultEmailAliasMutation, SetDefaultEmailAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDefaultEmailAliasMutation, SetDefaultEmailAliasMutationVariables>(SetDefaultEmailAliasDocument, options);
      }
export type SetDefaultEmailAliasMutationHookResult = ReturnType<typeof useSetDefaultEmailAliasMutation>;
export type SetDefaultEmailAliasMutationResult = Apollo.useMutation.Result<SetDefaultEmailAliasMutation>;
export type SetDefaultEmailAliasMutationOptions = Apollo.useMutation.Options<SetDefaultEmailAliasMutation, SetDefaultEmailAliasMutationVariables>;
export const GenerateWebAuthnChallengeDocument = /*#__PURE__*/ gql`
    mutation generateWebAuthnChallenge {
  generateWebAuthnChallenge {
    options
  }
}
    `;
export type GenerateWebAuthnChallengeMutationFn = Apollo.useMutation.MutationFunction<GenerateWebAuthnChallengeMutation, GenerateWebAuthnChallengeMutationVariables>;

/**
 * __useGenerateWebAuthnChallengeMutation__
 *
 * To run a mutation, you first call `useGenerateWebAuthnChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateWebAuthnChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateWebAuthnChallengeMutation, { data, loading, error }] = useGenerateWebAuthnChallengeMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateWebAuthnChallengeMutation(baseOptions?: Apollo.useMutation.Options<GenerateWebAuthnChallengeMutation, GenerateWebAuthnChallengeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateWebAuthnChallengeMutation, GenerateWebAuthnChallengeMutationVariables>(GenerateWebAuthnChallengeDocument, options);
      }
export type GenerateWebAuthnChallengeMutationHookResult = ReturnType<typeof useGenerateWebAuthnChallengeMutation>;
export type GenerateWebAuthnChallengeMutationResult = Apollo.useMutation.Result<GenerateWebAuthnChallengeMutation>;
export type GenerateWebAuthnChallengeMutationOptions = Apollo.useMutation.Options<GenerateWebAuthnChallengeMutation, GenerateWebAuthnChallengeMutationVariables>;
export const GenerateWebAuthnRegistrationDocument = /*#__PURE__*/ gql`
    mutation generateWebAuthnRegistration {
  generateWebAuthnRegistration {
    options
  }
}
    `;
export type GenerateWebAuthnRegistrationMutationFn = Apollo.useMutation.MutationFunction<GenerateWebAuthnRegistrationMutation, GenerateWebAuthnRegistrationMutationVariables>;

/**
 * __useGenerateWebAuthnRegistrationMutation__
 *
 * To run a mutation, you first call `useGenerateWebAuthnRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateWebAuthnRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateWebAuthnRegistrationMutation, { data, loading, error }] = useGenerateWebAuthnRegistrationMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateWebAuthnRegistrationMutation(baseOptions?: Apollo.useMutation.Options<GenerateWebAuthnRegistrationMutation, GenerateWebAuthnRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateWebAuthnRegistrationMutation, GenerateWebAuthnRegistrationMutationVariables>(GenerateWebAuthnRegistrationDocument, options);
      }
export type GenerateWebAuthnRegistrationMutationHookResult = ReturnType<typeof useGenerateWebAuthnRegistrationMutation>;
export type GenerateWebAuthnRegistrationMutationResult = Apollo.useMutation.Result<GenerateWebAuthnRegistrationMutation>;
export type GenerateWebAuthnRegistrationMutationOptions = Apollo.useMutation.Options<GenerateWebAuthnRegistrationMutation, GenerateWebAuthnRegistrationMutationVariables>;
export const VerifyWebAuthnRegistrationDocument = /*#__PURE__*/ gql`
    mutation verifyWebAuthnRegistration($request: VerifyWebAuthnRegistrationRequest!) {
  verifyWebAuthnRegistration(request: $request) {
    status
  }
}
    `;
export type VerifyWebAuthnRegistrationMutationFn = Apollo.useMutation.MutationFunction<VerifyWebAuthnRegistrationMutation, VerifyWebAuthnRegistrationMutationVariables>;

/**
 * __useVerifyWebAuthnRegistrationMutation__
 *
 * To run a mutation, you first call `useVerifyWebAuthnRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyWebAuthnRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyWebAuthnRegistrationMutation, { data, loading, error }] = useVerifyWebAuthnRegistrationMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useVerifyWebAuthnRegistrationMutation(baseOptions?: Apollo.useMutation.Options<VerifyWebAuthnRegistrationMutation, VerifyWebAuthnRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyWebAuthnRegistrationMutation, VerifyWebAuthnRegistrationMutationVariables>(VerifyWebAuthnRegistrationDocument, options);
      }
export type VerifyWebAuthnRegistrationMutationHookResult = ReturnType<typeof useVerifyWebAuthnRegistrationMutation>;
export type VerifyWebAuthnRegistrationMutationResult = Apollo.useMutation.Result<VerifyWebAuthnRegistrationMutation>;
export type VerifyWebAuthnRegistrationMutationOptions = Apollo.useMutation.Options<VerifyWebAuthnRegistrationMutation, VerifyWebAuthnRegistrationMutationVariables>;
export const RenameWebauthnDeviceDocument = /*#__PURE__*/ gql`
    mutation renameWebauthnDevice($request: RenameWebAuthnDeviceRequest!) {
  renameWebAuthnDevice(request: $request)
}
    `;
export type RenameWebauthnDeviceMutationFn = Apollo.useMutation.MutationFunction<RenameWebauthnDeviceMutation, RenameWebauthnDeviceMutationVariables>;

/**
 * __useRenameWebauthnDeviceMutation__
 *
 * To run a mutation, you first call `useRenameWebauthnDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameWebauthnDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameWebauthnDeviceMutation, { data, loading, error }] = useRenameWebauthnDeviceMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRenameWebauthnDeviceMutation(baseOptions?: Apollo.useMutation.Options<RenameWebauthnDeviceMutation, RenameWebauthnDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameWebauthnDeviceMutation, RenameWebauthnDeviceMutationVariables>(RenameWebauthnDeviceDocument, options);
      }
export type RenameWebauthnDeviceMutationHookResult = ReturnType<typeof useRenameWebauthnDeviceMutation>;
export type RenameWebauthnDeviceMutationResult = Apollo.useMutation.Result<RenameWebauthnDeviceMutation>;
export type RenameWebauthnDeviceMutationOptions = Apollo.useMutation.Options<RenameWebauthnDeviceMutation, RenameWebauthnDeviceMutationVariables>;
export const GetCheckoutSessionUrlOrStripeUpdateStatusDocument = /*#__PURE__*/ gql`
    query getCheckoutSessionUrlOrStripeUpdateStatus($request: GetCheckoutSessionRequest!) {
  checkoutPortal(request: $request) {
    url
    status
    downgradeProgress {
      currentStorageInMb
      customDomains
      emailAliases
      shortAliases
      workspaceUsers
      userLabels
      userFolders
      userMailFilters
      quickAliases
      quickAliasSubdomains
    }
  }
}
    `;

/**
 * __useGetCheckoutSessionUrlOrStripeUpdateStatusQuery__
 *
 * To run a query within a React component, call `useGetCheckoutSessionUrlOrStripeUpdateStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckoutSessionUrlOrStripeUpdateStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckoutSessionUrlOrStripeUpdateStatusQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetCheckoutSessionUrlOrStripeUpdateStatusQuery(baseOptions: Apollo.useQuery.Options<GetCheckoutSessionUrlOrStripeUpdateStatusQuery, GetCheckoutSessionUrlOrStripeUpdateStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckoutSessionUrlOrStripeUpdateStatusQuery, GetCheckoutSessionUrlOrStripeUpdateStatusQueryVariables>(GetCheckoutSessionUrlOrStripeUpdateStatusDocument, options);
      }
export function useGetCheckoutSessionUrlOrStripeUpdateStatusLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetCheckoutSessionUrlOrStripeUpdateStatusQuery, GetCheckoutSessionUrlOrStripeUpdateStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckoutSessionUrlOrStripeUpdateStatusQuery, GetCheckoutSessionUrlOrStripeUpdateStatusQueryVariables>(GetCheckoutSessionUrlOrStripeUpdateStatusDocument, options);
        }
export type GetCheckoutSessionUrlOrStripeUpdateStatusQueryHookResult = ReturnType<typeof useGetCheckoutSessionUrlOrStripeUpdateStatusQuery>;
export type GetCheckoutSessionUrlOrStripeUpdateStatusLazyQueryHookResult = ReturnType<typeof useGetCheckoutSessionUrlOrStripeUpdateStatusLazyQuery>;
export type GetCheckoutSessionUrlOrStripeUpdateStatusQueryResult = Apollo.useQuery.Result<GetCheckoutSessionUrlOrStripeUpdateStatusQuery, GetCheckoutSessionUrlOrStripeUpdateStatusQueryVariables>;
export const GetCustomDomainCheckoutPortalDocument = /*#__PURE__*/ gql`
    query getCustomDomainCheckoutPortal($request: GetCustomDomainCheckoutSessionRequest!) {
  customDomainCheckoutPortal(request: $request) {
    status
    url
  }
}
    `;

/**
 * __useGetCustomDomainCheckoutPortalQuery__
 *
 * To run a query within a React component, call `useGetCustomDomainCheckoutPortalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomDomainCheckoutPortalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomDomainCheckoutPortalQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetCustomDomainCheckoutPortalQuery(baseOptions: Apollo.useQuery.Options<GetCustomDomainCheckoutPortalQuery, GetCustomDomainCheckoutPortalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomDomainCheckoutPortalQuery, GetCustomDomainCheckoutPortalQueryVariables>(GetCustomDomainCheckoutPortalDocument, options);
      }
export function useGetCustomDomainCheckoutPortalLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetCustomDomainCheckoutPortalQuery, GetCustomDomainCheckoutPortalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomDomainCheckoutPortalQuery, GetCustomDomainCheckoutPortalQueryVariables>(GetCustomDomainCheckoutPortalDocument, options);
        }
export type GetCustomDomainCheckoutPortalQueryHookResult = ReturnType<typeof useGetCustomDomainCheckoutPortalQuery>;
export type GetCustomDomainCheckoutPortalLazyQueryHookResult = ReturnType<typeof useGetCustomDomainCheckoutPortalLazyQuery>;
export type GetCustomDomainCheckoutPortalQueryResult = Apollo.useQuery.Result<GetCustomDomainCheckoutPortalQuery, GetCustomDomainCheckoutPortalQueryVariables>;
export const GetCoinbaseCheckoutIdDocument = /*#__PURE__*/ gql`
    query getCoinbaseCheckoutID($request: GetCoinbaseCheckoutIDRequest!) {
  getCoinbaseCheckoutID(request: $request) {
    coinbaseCheckoutID
  }
}
    `;

/**
 * __useGetCoinbaseCheckoutIdQuery__
 *
 * To run a query within a React component, call `useGetCoinbaseCheckoutIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoinbaseCheckoutIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoinbaseCheckoutIdQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetCoinbaseCheckoutIdQuery(baseOptions: Apollo.useQuery.Options<GetCoinbaseCheckoutIdQuery, GetCoinbaseCheckoutIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoinbaseCheckoutIdQuery, GetCoinbaseCheckoutIdQueryVariables>(GetCoinbaseCheckoutIdDocument, options);
      }
export function useGetCoinbaseCheckoutIdLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetCoinbaseCheckoutIdQuery, GetCoinbaseCheckoutIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoinbaseCheckoutIdQuery, GetCoinbaseCheckoutIdQueryVariables>(GetCoinbaseCheckoutIdDocument, options);
        }
export type GetCoinbaseCheckoutIdQueryHookResult = ReturnType<typeof useGetCoinbaseCheckoutIdQuery>;
export type GetCoinbaseCheckoutIdLazyQueryHookResult = ReturnType<typeof useGetCoinbaseCheckoutIdLazyQuery>;
export type GetCoinbaseCheckoutIdQueryResult = Apollo.useQuery.Result<GetCoinbaseCheckoutIdQuery, GetCoinbaseCheckoutIdQueryVariables>;
export const GetBillingPortalSessionUrlDocument = /*#__PURE__*/ gql`
    query getBillingPortalSessionUrl($request: GetBillingPortalSessionRequest!) {
  billingPortal(request: $request) {
    url
  }
}
    `;

/**
 * __useGetBillingPortalSessionUrlQuery__
 *
 * To run a query within a React component, call `useGetBillingPortalSessionUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingPortalSessionUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingPortalSessionUrlQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetBillingPortalSessionUrlQuery(baseOptions: Apollo.useQuery.Options<GetBillingPortalSessionUrlQuery, GetBillingPortalSessionUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBillingPortalSessionUrlQuery, GetBillingPortalSessionUrlQueryVariables>(GetBillingPortalSessionUrlDocument, options);
      }
export function useGetBillingPortalSessionUrlLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetBillingPortalSessionUrlQuery, GetBillingPortalSessionUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBillingPortalSessionUrlQuery, GetBillingPortalSessionUrlQueryVariables>(GetBillingPortalSessionUrlDocument, options);
        }
export type GetBillingPortalSessionUrlQueryHookResult = ReturnType<typeof useGetBillingPortalSessionUrlQuery>;
export type GetBillingPortalSessionUrlLazyQueryHookResult = ReturnType<typeof useGetBillingPortalSessionUrlLazyQuery>;
export type GetBillingPortalSessionUrlQueryResult = Apollo.useQuery.Result<GetBillingPortalSessionUrlQuery, GetBillingPortalSessionUrlQueryVariables>;
export const GetOrCreateStripeCustomerDocument = /*#__PURE__*/ gql`
    query getOrCreateStripeCustomer {
  getOrCreateStripeCustomer {
    stripeCustomerID
  }
}
    `;

/**
 * __useGetOrCreateStripeCustomerQuery__
 *
 * To run a query within a React component, call `useGetOrCreateStripeCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrCreateStripeCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrCreateStripeCustomerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrCreateStripeCustomerQuery(baseOptions?: Apollo.useQuery.Options<GetOrCreateStripeCustomerQuery, GetOrCreateStripeCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrCreateStripeCustomerQuery, GetOrCreateStripeCustomerQueryVariables>(GetOrCreateStripeCustomerDocument, options);
      }
export function useGetOrCreateStripeCustomerLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetOrCreateStripeCustomerQuery, GetOrCreateStripeCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrCreateStripeCustomerQuery, GetOrCreateStripeCustomerQueryVariables>(GetOrCreateStripeCustomerDocument, options);
        }
export type GetOrCreateStripeCustomerQueryHookResult = ReturnType<typeof useGetOrCreateStripeCustomerQuery>;
export type GetOrCreateStripeCustomerLazyQueryHookResult = ReturnType<typeof useGetOrCreateStripeCustomerLazyQuery>;
export type GetOrCreateStripeCustomerQueryResult = Apollo.useQuery.Result<GetOrCreateStripeCustomerQuery, GetOrCreateStripeCustomerQueryVariables>;
export const AdjustBusinessPlanDocument = /*#__PURE__*/ gql`
    mutation adjustBusinessPlan($request: AdjustBusinessPlanRequest!) {
  adjustBusinessPlan(request: $request) {
    status
    seats
  }
}
    `;
export type AdjustBusinessPlanMutationFn = Apollo.useMutation.MutationFunction<AdjustBusinessPlanMutation, AdjustBusinessPlanMutationVariables>;

/**
 * __useAdjustBusinessPlanMutation__
 *
 * To run a mutation, you first call `useAdjustBusinessPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdjustBusinessPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adjustBusinessPlanMutation, { data, loading, error }] = useAdjustBusinessPlanMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAdjustBusinessPlanMutation(baseOptions?: Apollo.useMutation.Options<AdjustBusinessPlanMutation, AdjustBusinessPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdjustBusinessPlanMutation, AdjustBusinessPlanMutationVariables>(AdjustBusinessPlanDocument, options);
      }
export type AdjustBusinessPlanMutationHookResult = ReturnType<typeof useAdjustBusinessPlanMutation>;
export type AdjustBusinessPlanMutationResult = Apollo.useMutation.Result<AdjustBusinessPlanMutation>;
export type AdjustBusinessPlanMutationOptions = Apollo.useMutation.Options<AdjustBusinessPlanMutation, AdjustBusinessPlanMutationVariables>;
export const RequestAppStoreTestNotificationDocument = /*#__PURE__*/ gql`
    query requestAppStoreTestNotification {
  requestAppStoreTestNotification {
    testNotificationToken
  }
}
    `;

/**
 * __useRequestAppStoreTestNotificationQuery__
 *
 * To run a query within a React component, call `useRequestAppStoreTestNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestAppStoreTestNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestAppStoreTestNotificationQuery({
 *   variables: {
 *   },
 * });
 */
export function useRequestAppStoreTestNotificationQuery(baseOptions?: Apollo.useQuery.Options<RequestAppStoreTestNotificationQuery, RequestAppStoreTestNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestAppStoreTestNotificationQuery, RequestAppStoreTestNotificationQueryVariables>(RequestAppStoreTestNotificationDocument, options);
      }
export function useRequestAppStoreTestNotificationLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<RequestAppStoreTestNotificationQuery, RequestAppStoreTestNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestAppStoreTestNotificationQuery, RequestAppStoreTestNotificationQueryVariables>(RequestAppStoreTestNotificationDocument, options);
        }
export type RequestAppStoreTestNotificationQueryHookResult = ReturnType<typeof useRequestAppStoreTestNotificationQuery>;
export type RequestAppStoreTestNotificationLazyQueryHookResult = ReturnType<typeof useRequestAppStoreTestNotificationLazyQuery>;
export type RequestAppStoreTestNotificationQueryResult = Apollo.useQuery.Result<RequestAppStoreTestNotificationQuery, RequestAppStoreTestNotificationQueryVariables>;
export const GetTestNotificationStatusDocument = /*#__PURE__*/ gql`
    query getTestNotificationStatus($request: GetAppleTestNotificationStatusInput!) {
  getAppleTestNotificationStatus(request: $request) {
    signedPayload
    sendAttempts {
      attemptDate
      sendAttemptResult
    }
  }
}
    `;

/**
 * __useGetTestNotificationStatusQuery__
 *
 * To run a query within a React component, call `useGetTestNotificationStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTestNotificationStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTestNotificationStatusQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetTestNotificationStatusQuery(baseOptions: Apollo.useQuery.Options<GetTestNotificationStatusQuery, GetTestNotificationStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTestNotificationStatusQuery, GetTestNotificationStatusQueryVariables>(GetTestNotificationStatusDocument, options);
      }
export function useGetTestNotificationStatusLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetTestNotificationStatusQuery, GetTestNotificationStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTestNotificationStatusQuery, GetTestNotificationStatusQueryVariables>(GetTestNotificationStatusDocument, options);
        }
export type GetTestNotificationStatusQueryHookResult = ReturnType<typeof useGetTestNotificationStatusQuery>;
export type GetTestNotificationStatusLazyQueryHookResult = ReturnType<typeof useGetTestNotificationStatusLazyQuery>;
export type GetTestNotificationStatusQueryResult = Apollo.useQuery.Result<GetTestNotificationStatusQuery, GetTestNotificationStatusQueryVariables>;
export const ValidateOriginalTransactionIdMatchesUserDocument = /*#__PURE__*/ gql`
    query validateOriginalTransactionIdMatchesUser($request: ValidateOriginalTransactionIdMatchesUserInput!) {
  validateOriginalTransactionIdMatchesUser(request: $request)
}
    `;

/**
 * __useValidateOriginalTransactionIdMatchesUserQuery__
 *
 * To run a query within a React component, call `useValidateOriginalTransactionIdMatchesUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateOriginalTransactionIdMatchesUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateOriginalTransactionIdMatchesUserQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useValidateOriginalTransactionIdMatchesUserQuery(baseOptions: Apollo.useQuery.Options<ValidateOriginalTransactionIdMatchesUserQuery, ValidateOriginalTransactionIdMatchesUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateOriginalTransactionIdMatchesUserQuery, ValidateOriginalTransactionIdMatchesUserQueryVariables>(ValidateOriginalTransactionIdMatchesUserDocument, options);
      }
export function useValidateOriginalTransactionIdMatchesUserLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<ValidateOriginalTransactionIdMatchesUserQuery, ValidateOriginalTransactionIdMatchesUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateOriginalTransactionIdMatchesUserQuery, ValidateOriginalTransactionIdMatchesUserQueryVariables>(ValidateOriginalTransactionIdMatchesUserDocument, options);
        }
export type ValidateOriginalTransactionIdMatchesUserQueryHookResult = ReturnType<typeof useValidateOriginalTransactionIdMatchesUserQuery>;
export type ValidateOriginalTransactionIdMatchesUserLazyQueryHookResult = ReturnType<typeof useValidateOriginalTransactionIdMatchesUserLazyQuery>;
export type ValidateOriginalTransactionIdMatchesUserQueryResult = Apollo.useQuery.Result<ValidateOriginalTransactionIdMatchesUserQuery, ValidateOriginalTransactionIdMatchesUserQueryVariables>;
export const ValidateAppStoreSubscriptionRequestDocument = /*#__PURE__*/ gql`
    mutation ValidateAppStoreSubscriptionRequest($request: ValidateAppStoreSubscriptionRequest!) {
  ValidateAppStoreSubscriptionRequest(request: $request)
}
    `;
export type ValidateAppStoreSubscriptionRequestMutationFn = Apollo.useMutation.MutationFunction<ValidateAppStoreSubscriptionRequestMutation, ValidateAppStoreSubscriptionRequestMutationVariables>;

/**
 * __useValidateAppStoreSubscriptionRequestMutation__
 *
 * To run a mutation, you first call `useValidateAppStoreSubscriptionRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateAppStoreSubscriptionRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateAppStoreSubscriptionRequestMutation, { data, loading, error }] = useValidateAppStoreSubscriptionRequestMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useValidateAppStoreSubscriptionRequestMutation(baseOptions?: Apollo.useMutation.Options<ValidateAppStoreSubscriptionRequestMutation, ValidateAppStoreSubscriptionRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateAppStoreSubscriptionRequestMutation, ValidateAppStoreSubscriptionRequestMutationVariables>(ValidateAppStoreSubscriptionRequestDocument, options);
      }
export type ValidateAppStoreSubscriptionRequestMutationHookResult = ReturnType<typeof useValidateAppStoreSubscriptionRequestMutation>;
export type ValidateAppStoreSubscriptionRequestMutationResult = Apollo.useMutation.Result<ValidateAppStoreSubscriptionRequestMutation>;
export type ValidateAppStoreSubscriptionRequestMutationOptions = Apollo.useMutation.Options<ValidateAppStoreSubscriptionRequestMutation, ValidateAppStoreSubscriptionRequestMutationVariables>;
export const GetAppleSubscriptionPlansDocument = /*#__PURE__*/ gql`
    query getAppleSubscriptionPlans {
  getAppleSubscriptionPlans {
    plans {
      tierName
      monthly
      yearly
    }
  }
}
    `;

/**
 * __useGetAppleSubscriptionPlansQuery__
 *
 * To run a query within a React component, call `useGetAppleSubscriptionPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppleSubscriptionPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppleSubscriptionPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppleSubscriptionPlansQuery(baseOptions?: Apollo.useQuery.Options<GetAppleSubscriptionPlansQuery, GetAppleSubscriptionPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppleSubscriptionPlansQuery, GetAppleSubscriptionPlansQueryVariables>(GetAppleSubscriptionPlansDocument, options);
      }
export function useGetAppleSubscriptionPlansLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAppleSubscriptionPlansQuery, GetAppleSubscriptionPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppleSubscriptionPlansQuery, GetAppleSubscriptionPlansQueryVariables>(GetAppleSubscriptionPlansDocument, options);
        }
export type GetAppleSubscriptionPlansQueryHookResult = ReturnType<typeof useGetAppleSubscriptionPlansQuery>;
export type GetAppleSubscriptionPlansLazyQueryHookResult = ReturnType<typeof useGetAppleSubscriptionPlansLazyQuery>;
export type GetAppleSubscriptionPlansQueryResult = Apollo.useQuery.Result<GetAppleSubscriptionPlansQuery, GetAppleSubscriptionPlansQueryVariables>;
export const GetGoogleSubscriptionPlansDocument = /*#__PURE__*/ gql`
    query getGoogleSubscriptionPlans {
  getGoogleSubscriptionPlans {
    plans {
      tierName
      skuName
      skuMonthlyOfferId
      skuAnnualOfferId
    }
  }
}
    `;

/**
 * __useGetGoogleSubscriptionPlansQuery__
 *
 * To run a query within a React component, call `useGetGoogleSubscriptionPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoogleSubscriptionPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoogleSubscriptionPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGoogleSubscriptionPlansQuery(baseOptions?: Apollo.useQuery.Options<GetGoogleSubscriptionPlansQuery, GetGoogleSubscriptionPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoogleSubscriptionPlansQuery, GetGoogleSubscriptionPlansQueryVariables>(GetGoogleSubscriptionPlansDocument, options);
      }
export function useGetGoogleSubscriptionPlansLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetGoogleSubscriptionPlansQuery, GetGoogleSubscriptionPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoogleSubscriptionPlansQuery, GetGoogleSubscriptionPlansQueryVariables>(GetGoogleSubscriptionPlansDocument, options);
        }
export type GetGoogleSubscriptionPlansQueryHookResult = ReturnType<typeof useGetGoogleSubscriptionPlansQuery>;
export type GetGoogleSubscriptionPlansLazyQueryHookResult = ReturnType<typeof useGetGoogleSubscriptionPlansLazyQuery>;
export type GetGoogleSubscriptionPlansQueryResult = Apollo.useQuery.Result<GetGoogleSubscriptionPlansQuery, GetGoogleSubscriptionPlansQueryVariables>;
export const GetActiveUsersDocument = /*#__PURE__*/ gql`
    query getActiveUsers($request: GetDocumentRequest!) {
  document(request: $request) {
    ...DocumentBasicInfo
    ...DocumentCollaborators
    ...DocumentCurrentlyEditingUsers
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentCollaboratorsFragmentDoc}
${DocumentCurrentlyEditingUsersFragmentDoc}`;

/**
 * __useGetActiveUsersQuery__
 *
 * To run a query within a React component, call `useGetActiveUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveUsersQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetActiveUsersQuery(baseOptions: Apollo.useQuery.Options<GetActiveUsersQuery, GetActiveUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveUsersQuery, GetActiveUsersQueryVariables>(GetActiveUsersDocument, options);
      }
export function useGetActiveUsersLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetActiveUsersQuery, GetActiveUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveUsersQuery, GetActiveUsersQueryVariables>(GetActiveUsersDocument, options);
        }
export type GetActiveUsersQueryHookResult = ReturnType<typeof useGetActiveUsersQuery>;
export type GetActiveUsersLazyQueryHookResult = ReturnType<typeof useGetActiveUsersLazyQuery>;
export type GetActiveUsersQueryResult = Apollo.useQuery.Result<GetActiveUsersQuery, GetActiveUsersQueryVariables>;
export const GetLinkDocument = /*#__PURE__*/ gql`
    query getLink($request: GetDocumentRequest!) {
  document(request: $request) {
    ...DocumentBasicInfo
    ...DocumentLink
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentLinkFragmentDoc}`;

/**
 * __useGetLinkQuery__
 *
 * To run a query within a React component, call `useGetLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetLinkQuery(baseOptions: Apollo.useQuery.Options<GetLinkQuery, GetLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLinkQuery, GetLinkQueryVariables>(GetLinkDocument, options);
      }
export function useGetLinkLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetLinkQuery, GetLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLinkQuery, GetLinkQueryVariables>(GetLinkDocument, options);
        }
export type GetLinkQueryHookResult = ReturnType<typeof useGetLinkQuery>;
export type GetLinkLazyQueryHookResult = ReturnType<typeof useGetLinkLazyQuery>;
export type GetLinkQueryResult = Apollo.useQuery.Result<GetLinkQuery, GetLinkQueryVariables>;
export const GetDocumentsBaseDocument = /*#__PURE__*/ gql`
    query getDocumentsBase($request: GetDocumentsRequest!) {
  documents(request: $request) {
    ...DocumentBase
    updatedAt
  }
}
    ${DocumentBaseFragmentDoc}`;

/**
 * __useGetDocumentsBaseQuery__
 *
 * To run a query within a React component, call `useGetDocumentsBaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentsBaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentsBaseQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetDocumentsBaseQuery(baseOptions: Apollo.useQuery.Options<GetDocumentsBaseQuery, GetDocumentsBaseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentsBaseQuery, GetDocumentsBaseQueryVariables>(GetDocumentsBaseDocument, options);
      }
export function useGetDocumentsBaseLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDocumentsBaseQuery, GetDocumentsBaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentsBaseQuery, GetDocumentsBaseQueryVariables>(GetDocumentsBaseDocument, options);
        }
export type GetDocumentsBaseQueryHookResult = ReturnType<typeof useGetDocumentsBaseQuery>;
export type GetDocumentsBaseLazyQueryHookResult = ReturnType<typeof useGetDocumentsBaseLazyQuery>;
export type GetDocumentsBaseQueryResult = Apollo.useQuery.Result<GetDocumentsBaseQuery, GetDocumentsBaseQueryVariables>;
export const GetDocumentsBaseForTrashDocument = /*#__PURE__*/ gql`
    query getDocumentsBaseForTrash($request: GetDocumentsRequest!) {
  documents(request: $request) {
    ...DocumentBase
    updatedAt
    previousParentID
  }
}
    ${DocumentBaseFragmentDoc}`;

/**
 * __useGetDocumentsBaseForTrashQuery__
 *
 * To run a query within a React component, call `useGetDocumentsBaseForTrashQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentsBaseForTrashQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentsBaseForTrashQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetDocumentsBaseForTrashQuery(baseOptions: Apollo.useQuery.Options<GetDocumentsBaseForTrashQuery, GetDocumentsBaseForTrashQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentsBaseForTrashQuery, GetDocumentsBaseForTrashQueryVariables>(GetDocumentsBaseForTrashDocument, options);
      }
export function useGetDocumentsBaseForTrashLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDocumentsBaseForTrashQuery, GetDocumentsBaseForTrashQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentsBaseForTrashQuery, GetDocumentsBaseForTrashQueryVariables>(GetDocumentsBaseForTrashDocument, options);
        }
export type GetDocumentsBaseForTrashQueryHookResult = ReturnType<typeof useGetDocumentsBaseForTrashQuery>;
export type GetDocumentsBaseForTrashLazyQueryHookResult = ReturnType<typeof useGetDocumentsBaseForTrashLazyQuery>;
export type GetDocumentsBaseForTrashQueryResult = Apollo.useQuery.Result<GetDocumentsBaseForTrashQuery, GetDocumentsBaseForTrashQueryVariables>;
export const GetDocumentBreadcrumbDocument = /*#__PURE__*/ gql`
    query getDocumentBreadcrumb($request: GetDocumentRequest!) {
  document(request: $request) {
    ...DocumentBasicInfo
    ...DocumentParentsFullBreadcrumb
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentParentsFullBreadcrumbFragmentDoc}`;

/**
 * __useGetDocumentBreadcrumbQuery__
 *
 * To run a query within a React component, call `useGetDocumentBreadcrumbQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentBreadcrumbQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentBreadcrumbQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetDocumentBreadcrumbQuery(baseOptions: Apollo.useQuery.Options<GetDocumentBreadcrumbQuery, GetDocumentBreadcrumbQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentBreadcrumbQuery, GetDocumentBreadcrumbQueryVariables>(GetDocumentBreadcrumbDocument, options);
      }
export function useGetDocumentBreadcrumbLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDocumentBreadcrumbQuery, GetDocumentBreadcrumbQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentBreadcrumbQuery, GetDocumentBreadcrumbQueryVariables>(GetDocumentBreadcrumbDocument, options);
        }
export type GetDocumentBreadcrumbQueryHookResult = ReturnType<typeof useGetDocumentBreadcrumbQuery>;
export type GetDocumentBreadcrumbLazyQueryHookResult = ReturnType<typeof useGetDocumentBreadcrumbLazyQuery>;
export type GetDocumentBreadcrumbQueryResult = Apollo.useQuery.Result<GetDocumentBreadcrumbQuery, GetDocumentBreadcrumbQueryVariables>;
export const GetDocumentBaseDocument = /*#__PURE__*/ gql`
    query getDocumentBase($request: GetDocumentRequest!) {
  document(request: $request) {
    ...DocumentBase
  }
}
    ${DocumentBaseFragmentDoc}`;

/**
 * __useGetDocumentBaseQuery__
 *
 * To run a query within a React component, call `useGetDocumentBaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentBaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentBaseQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetDocumentBaseQuery(baseOptions: Apollo.useQuery.Options<GetDocumentBaseQuery, GetDocumentBaseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentBaseQuery, GetDocumentBaseQueryVariables>(GetDocumentBaseDocument, options);
      }
export function useGetDocumentBaseLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDocumentBaseQuery, GetDocumentBaseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentBaseQuery, GetDocumentBaseQueryVariables>(GetDocumentBaseDocument, options);
        }
export type GetDocumentBaseQueryHookResult = ReturnType<typeof useGetDocumentBaseQuery>;
export type GetDocumentBaseLazyQueryHookResult = ReturnType<typeof useGetDocumentBaseLazyQuery>;
export type GetDocumentBaseQueryResult = Apollo.useQuery.Result<GetDocumentBaseQuery, GetDocumentBaseQueryVariables>;
export const GetDocumentFullDocument = /*#__PURE__*/ gql`
    query getDocumentFull($request: GetDocumentRequest!) {
  document(request: $request) {
    ...DocumentFullInfo
  }
}
    ${DocumentFullInfoFragmentDoc}`;

/**
 * __useGetDocumentFullQuery__
 *
 * To run a query within a React component, call `useGetDocumentFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentFullQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetDocumentFullQuery(baseOptions: Apollo.useQuery.Options<GetDocumentFullQuery, GetDocumentFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentFullQuery, GetDocumentFullQueryVariables>(GetDocumentFullDocument, options);
      }
export function useGetDocumentFullLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDocumentFullQuery, GetDocumentFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentFullQuery, GetDocumentFullQueryVariables>(GetDocumentFullDocument, options);
        }
export type GetDocumentFullQueryHookResult = ReturnType<typeof useGetDocumentFullQuery>;
export type GetDocumentFullLazyQueryHookResult = ReturnType<typeof useGetDocumentFullLazyQuery>;
export type GetDocumentFullQueryResult = Apollo.useQuery.Result<GetDocumentFullQuery, GetDocumentFullQueryVariables>;
export const GetNativeDocumentsDocument = /*#__PURE__*/ gql`
    query getNativeDocuments($request: GetDocumentsRequest!) {
  documents(request: $request) {
    ...DocumentNativeInfo
  }
}
    ${DocumentNativeInfoFragmentDoc}`;

/**
 * __useGetNativeDocumentsQuery__
 *
 * To run a query within a React component, call `useGetNativeDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNativeDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNativeDocumentsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetNativeDocumentsQuery(baseOptions: Apollo.useQuery.Options<GetNativeDocumentsQuery, GetNativeDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNativeDocumentsQuery, GetNativeDocumentsQueryVariables>(GetNativeDocumentsDocument, options);
      }
export function useGetNativeDocumentsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetNativeDocumentsQuery, GetNativeDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNativeDocumentsQuery, GetNativeDocumentsQueryVariables>(GetNativeDocumentsDocument, options);
        }
export type GetNativeDocumentsQueryHookResult = ReturnType<typeof useGetNativeDocumentsQuery>;
export type GetNativeDocumentsLazyQueryHookResult = ReturnType<typeof useGetNativeDocumentsLazyQuery>;
export type GetNativeDocumentsQueryResult = Apollo.useQuery.Result<GetNativeDocumentsQuery, GetNativeDocumentsQueryVariables>;
export const GetDocumentPublicOrgDataDocument = /*#__PURE__*/ gql`
    query getDocumentPublicOrgData($request: GetDocumentRequest!) {
  document(request: $request) {
    docID
    ...DocumentPublicInfo
  }
}
    ${DocumentPublicInfoFragmentDoc}`;

/**
 * __useGetDocumentPublicOrgDataQuery__
 *
 * To run a query within a React component, call `useGetDocumentPublicOrgDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentPublicOrgDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentPublicOrgDataQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetDocumentPublicOrgDataQuery(baseOptions: Apollo.useQuery.Options<GetDocumentPublicOrgDataQuery, GetDocumentPublicOrgDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentPublicOrgDataQuery, GetDocumentPublicOrgDataQueryVariables>(GetDocumentPublicOrgDataDocument, options);
      }
export function useGetDocumentPublicOrgDataLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDocumentPublicOrgDataQuery, GetDocumentPublicOrgDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentPublicOrgDataQuery, GetDocumentPublicOrgDataQueryVariables>(GetDocumentPublicOrgDataDocument, options);
        }
export type GetDocumentPublicOrgDataQueryHookResult = ReturnType<typeof useGetDocumentPublicOrgDataQuery>;
export type GetDocumentPublicOrgDataLazyQueryHookResult = ReturnType<typeof useGetDocumentPublicOrgDataLazyQuery>;
export type GetDocumentPublicOrgDataQueryResult = Apollo.useQuery.Result<GetDocumentPublicOrgDataQuery, GetDocumentPublicOrgDataQueryVariables>;
export const GetDocumentSnapshotsDocument = /*#__PURE__*/ gql`
    query getDocumentSnapshots($request: GetDocumentRequest!) {
  document(request: $request) {
    docID
    snapshots {
      data
      hierarchicalPermissionChain {
        ...DocumentHierarchicalPermissionChainInfo
      }
      createdAt
      version
      decryptedKey @client
      decryptedData @client
    }
  }
}
    ${DocumentHierarchicalPermissionChainInfoFragmentDoc}`;

/**
 * __useGetDocumentSnapshotsQuery__
 *
 * To run a query within a React component, call `useGetDocumentSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentSnapshotsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetDocumentSnapshotsQuery(baseOptions: Apollo.useQuery.Options<GetDocumentSnapshotsQuery, GetDocumentSnapshotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentSnapshotsQuery, GetDocumentSnapshotsQueryVariables>(GetDocumentSnapshotsDocument, options);
      }
export function useGetDocumentSnapshotsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetDocumentSnapshotsQuery, GetDocumentSnapshotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentSnapshotsQuery, GetDocumentSnapshotsQueryVariables>(GetDocumentSnapshotsDocument, options);
        }
export type GetDocumentSnapshotsQueryHookResult = ReturnType<typeof useGetDocumentSnapshotsQuery>;
export type GetDocumentSnapshotsLazyQueryHookResult = ReturnType<typeof useGetDocumentSnapshotsLazyQuery>;
export type GetDocumentSnapshotsQueryResult = Apollo.useQuery.Result<GetDocumentSnapshotsQuery, GetDocumentSnapshotsQueryVariables>;
export const GetPendingDocumentKeyUpgradesDocument = /*#__PURE__*/ gql`
    query getPendingDocumentKeyUpgrades($request: PendingDocumentKeyUpgradesRequest!) {
  pendingDocumentKeyUpgrades(request: $request) {
    collaborators {
      userID
      publicKey
    }
    newHierarchicalKeys {
      docID
      hierarchicalPermissionChain {
        ...DocumentHierarchicalPermissionChainInfo
      }
      collaboratorsIDs
      encryptedLinkKey
      currentPublicHierarchicalKey
    }
    newKeysClaims {
      docID
      hierarchicalPermissionChain {
        ...DocumentHierarchicalPermissionChainInfo
      }
      keysClaimSourceDocID
      keysClaimSourceDocPublicHierarchicalKey
      currentKeysClaim
    }
  }
}
    ${DocumentHierarchicalPermissionChainInfoFragmentDoc}`;

/**
 * __useGetPendingDocumentKeyUpgradesQuery__
 *
 * To run a query within a React component, call `useGetPendingDocumentKeyUpgradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingDocumentKeyUpgradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingDocumentKeyUpgradesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetPendingDocumentKeyUpgradesQuery(baseOptions: Apollo.useQuery.Options<GetPendingDocumentKeyUpgradesQuery, GetPendingDocumentKeyUpgradesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingDocumentKeyUpgradesQuery, GetPendingDocumentKeyUpgradesQueryVariables>(GetPendingDocumentKeyUpgradesDocument, options);
      }
export function useGetPendingDocumentKeyUpgradesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetPendingDocumentKeyUpgradesQuery, GetPendingDocumentKeyUpgradesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingDocumentKeyUpgradesQuery, GetPendingDocumentKeyUpgradesQueryVariables>(GetPendingDocumentKeyUpgradesDocument, options);
        }
export type GetPendingDocumentKeyUpgradesQueryHookResult = ReturnType<typeof useGetPendingDocumentKeyUpgradesQuery>;
export type GetPendingDocumentKeyUpgradesLazyQueryHookResult = ReturnType<typeof useGetPendingDocumentKeyUpgradesLazyQuery>;
export type GetPendingDocumentKeyUpgradesQueryResult = Apollo.useQuery.Result<GetPendingDocumentKeyUpgradesQuery, GetPendingDocumentKeyUpgradesQueryVariables>;
export const GetMailFiltersDocument = /*#__PURE__*/ gql`
    query getMailFilters($request: GetMailFiltersInput) {
  mailFilters(request: $request) {
    actions {
      actionType
      serializedData
    }
    filter {
      filterField
      filterType
      serializedData
      subFilter {
        filterField
        filterType
        serializedData
        subFilter {
          filterField
          filterType
          serializedData
        }
      }
    }
    name
    mailFilterID
    clientside
    encryptedSessionKey
    encryptedByKey
  }
}
    `;

/**
 * __useGetMailFiltersQuery__
 *
 * To run a query within a React component, call `useGetMailFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMailFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMailFiltersQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetMailFiltersQuery(baseOptions?: Apollo.useQuery.Options<GetMailFiltersQuery, GetMailFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMailFiltersQuery, GetMailFiltersQueryVariables>(GetMailFiltersDocument, options);
      }
export function useGetMailFiltersLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetMailFiltersQuery, GetMailFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMailFiltersQuery, GetMailFiltersQueryVariables>(GetMailFiltersDocument, options);
        }
export type GetMailFiltersQueryHookResult = ReturnType<typeof useGetMailFiltersQuery>;
export type GetMailFiltersLazyQueryHookResult = ReturnType<typeof useGetMailFiltersLazyQuery>;
export type GetMailFiltersQueryResult = Apollo.useQuery.Result<GetMailFiltersQuery, GetMailFiltersQueryVariables>;
export const GetAccountMailDataDocument = /*#__PURE__*/ gql`
    query getAccountMailData($label: String!) {
  unread(label: $label)
  currentUser {
    ...UserProfileOrgData
    ...UserOrgPersonalTeamData
    ...UserOrgEveryoneTeamData
    userID
    defaultEmailAlias
    emailAliases
    recoveryEmail
    unverifiedRecoveryEmail
  }
}
    ${UserProfileOrgDataFragmentDoc}
${UserOrgPersonalTeamDataFragmentDoc}
${UserOrgEveryoneTeamDataFragmentDoc}`;

/**
 * __useGetAccountMailDataQuery__
 *
 * To run a query within a React component, call `useGetAccountMailDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountMailDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountMailDataQuery({
 *   variables: {
 *      label: // value for 'label'
 *   },
 * });
 */
export function useGetAccountMailDataQuery(baseOptions: Apollo.useQuery.Options<GetAccountMailDataQuery, GetAccountMailDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountMailDataQuery, GetAccountMailDataQueryVariables>(GetAccountMailDataDocument, options);
      }
export function useGetAccountMailDataLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAccountMailDataQuery, GetAccountMailDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountMailDataQuery, GetAccountMailDataQueryVariables>(GetAccountMailDataDocument, options);
        }
export type GetAccountMailDataQueryHookResult = ReturnType<typeof useGetAccountMailDataQuery>;
export type GetAccountMailDataLazyQueryHookResult = ReturnType<typeof useGetAccountMailDataLazyQuery>;
export type GetAccountMailDataQueryResult = Apollo.useQuery.Result<GetAccountMailDataQuery, GetAccountMailDataQueryVariables>;
export const GetNumMailboxThreadsDocument = /*#__PURE__*/ gql`
    query getNumMailboxThreads($label: String!) {
  numMailboxThreads(label: $label)
}
    `;

/**
 * __useGetNumMailboxThreadsQuery__
 *
 * To run a query within a React component, call `useGetNumMailboxThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumMailboxThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumMailboxThreadsQuery({
 *   variables: {
 *      label: // value for 'label'
 *   },
 * });
 */
export function useGetNumMailboxThreadsQuery(baseOptions: Apollo.useQuery.Options<GetNumMailboxThreadsQuery, GetNumMailboxThreadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumMailboxThreadsQuery, GetNumMailboxThreadsQueryVariables>(GetNumMailboxThreadsDocument, options);
      }
export function useGetNumMailboxThreadsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetNumMailboxThreadsQuery, GetNumMailboxThreadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumMailboxThreadsQuery, GetNumMailboxThreadsQueryVariables>(GetNumMailboxThreadsDocument, options);
        }
export type GetNumMailboxThreadsQueryHookResult = ReturnType<typeof useGetNumMailboxThreadsQuery>;
export type GetNumMailboxThreadsLazyQueryHookResult = ReturnType<typeof useGetNumMailboxThreadsLazyQuery>;
export type GetNumMailboxThreadsQueryResult = Apollo.useQuery.Result<GetNumMailboxThreadsQuery, GetNumMailboxThreadsQueryVariables>;
export const GetSilenceSenderSuggestionsDocument = /*#__PURE__*/ gql`
    query getSilenceSenderSuggestions {
  silenceSenderSuggestions {
    silenceSenderDomains {
      domain
      senders {
        sender
        messageCount
        totalBytes
      }
    }
    silenceSenderIndividuals {
      sender
      messageCount
      totalBytes
    }
  }
}
    `;

/**
 * __useGetSilenceSenderSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetSilenceSenderSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSilenceSenderSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSilenceSenderSuggestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSilenceSenderSuggestionsQuery(baseOptions?: Apollo.useQuery.Options<GetSilenceSenderSuggestionsQuery, GetSilenceSenderSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSilenceSenderSuggestionsQuery, GetSilenceSenderSuggestionsQueryVariables>(GetSilenceSenderSuggestionsDocument, options);
      }
export function useGetSilenceSenderSuggestionsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSilenceSenderSuggestionsQuery, GetSilenceSenderSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSilenceSenderSuggestionsQuery, GetSilenceSenderSuggestionsQueryVariables>(GetSilenceSenderSuggestionsDocument, options);
        }
export type GetSilenceSenderSuggestionsQueryHookResult = ReturnType<typeof useGetSilenceSenderSuggestionsQuery>;
export type GetSilenceSenderSuggestionsLazyQueryHookResult = ReturnType<typeof useGetSilenceSenderSuggestionsLazyQuery>;
export type GetSilenceSenderSuggestionsQueryResult = Apollo.useQuery.Result<GetSilenceSenderSuggestionsQuery, GetSilenceSenderSuggestionsQueryVariables>;
export const GetSilencedSendersDocument = /*#__PURE__*/ gql`
    query getSilencedSenders {
  silencedSenders {
    silenceSenderDomains {
      domain
      senders {
        sender
        messageCount
        totalBytes
      }
    }
    silenceSenderIndividuals {
      sender
      messageCount
      totalBytes
    }
  }
}
    `;

/**
 * __useGetSilencedSendersQuery__
 *
 * To run a query within a React component, call `useGetSilencedSendersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSilencedSendersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSilencedSendersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSilencedSendersQuery(baseOptions?: Apollo.useQuery.Options<GetSilencedSendersQuery, GetSilencedSendersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSilencedSendersQuery, GetSilencedSendersQueryVariables>(GetSilencedSendersDocument, options);
      }
export function useGetSilencedSendersLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSilencedSendersQuery, GetSilencedSendersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSilencedSendersQuery, GetSilencedSendersQueryVariables>(GetSilencedSendersDocument, options);
        }
export type GetSilencedSendersQueryHookResult = ReturnType<typeof useGetSilencedSendersQuery>;
export type GetSilencedSendersLazyQueryHookResult = ReturnType<typeof useGetSilencedSendersLazyQuery>;
export type GetSilencedSendersQueryResult = Apollo.useQuery.Result<GetSilencedSendersQuery, GetSilencedSendersQueryVariables>;
export const GetSessionCacheDocument = /*#__PURE__*/ gql`
    query getSessionCache {
  sessionCache {
    cacheKey
    alternativeCacheKeys
  }
  currentUser {
    userID
    recoveryEmail
    unverifiedRecoveryEmail
    walletAddress
    rootOrgID
    publicData {
      displayName
      displayPictureData {
        profileAccentColor
        profileCustomURI
        profileIcon
      }
    }
  }
}
    `;

/**
 * __useGetSessionCacheQuery__
 *
 * To run a query within a React component, call `useGetSessionCacheQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionCacheQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionCacheQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionCacheQuery(baseOptions?: Apollo.useQuery.Options<GetSessionCacheQuery, GetSessionCacheQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionCacheQuery, GetSessionCacheQueryVariables>(GetSessionCacheDocument, options);
      }
export function useGetSessionCacheLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSessionCacheQuery, GetSessionCacheQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionCacheQuery, GetSessionCacheQueryVariables>(GetSessionCacheDocument, options);
        }
export type GetSessionCacheQueryHookResult = ReturnType<typeof useGetSessionCacheQuery>;
export type GetSessionCacheLazyQueryHookResult = ReturnType<typeof useGetSessionCacheLazyQuery>;
export type GetSessionCacheQueryResult = Apollo.useQuery.Result<GetSessionCacheQuery, GetSessionCacheQueryVariables>;
export const GetSessionCacheMobileDocument = /*#__PURE__*/ gql`
    query getSessionCacheMobile($req: SessionCacheMobileRequest!) {
  sessionCacheMobile(req: $req)
}
    `;

/**
 * __useGetSessionCacheMobileQuery__
 *
 * To run a query within a React component, call `useGetSessionCacheMobileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionCacheMobileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionCacheMobileQuery({
 *   variables: {
 *      req: // value for 'req'
 *   },
 * });
 */
export function useGetSessionCacheMobileQuery(baseOptions: Apollo.useQuery.Options<GetSessionCacheMobileQuery, GetSessionCacheMobileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionCacheMobileQuery, GetSessionCacheMobileQueryVariables>(GetSessionCacheMobileDocument, options);
      }
export function useGetSessionCacheMobileLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSessionCacheMobileQuery, GetSessionCacheMobileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionCacheMobileQuery, GetSessionCacheMobileQueryVariables>(GetSessionCacheMobileDocument, options);
        }
export type GetSessionCacheMobileQueryHookResult = ReturnType<typeof useGetSessionCacheMobileQuery>;
export type GetSessionCacheMobileLazyQueryHookResult = ReturnType<typeof useGetSessionCacheMobileLazyQuery>;
export type GetSessionCacheMobileQueryResult = Apollo.useQuery.Result<GetSessionCacheMobileQuery, GetSessionCacheMobileQueryVariables>;
export const GetSessionCacheChallengeDocument = /*#__PURE__*/ gql`
    query getSessionCacheChallenge($req: SessionCacheInput!) {
  sessionCacheChallenge(req: $req) {
    serverPublicKey
    encryptedChallenge
  }
}
    `;

/**
 * __useGetSessionCacheChallengeQuery__
 *
 * To run a query within a React component, call `useGetSessionCacheChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionCacheChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionCacheChallengeQuery({
 *   variables: {
 *      req: // value for 'req'
 *   },
 * });
 */
export function useGetSessionCacheChallengeQuery(baseOptions: Apollo.useQuery.Options<GetSessionCacheChallengeQuery, GetSessionCacheChallengeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionCacheChallengeQuery, GetSessionCacheChallengeQueryVariables>(GetSessionCacheChallengeDocument, options);
      }
export function useGetSessionCacheChallengeLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSessionCacheChallengeQuery, GetSessionCacheChallengeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionCacheChallengeQuery, GetSessionCacheChallengeQueryVariables>(GetSessionCacheChallengeDocument, options);
        }
export type GetSessionCacheChallengeQueryHookResult = ReturnType<typeof useGetSessionCacheChallengeQuery>;
export type GetSessionCacheChallengeLazyQueryHookResult = ReturnType<typeof useGetSessionCacheChallengeLazyQuery>;
export type GetSessionCacheChallengeQueryResult = Apollo.useQuery.Result<GetSessionCacheChallengeQuery, GetSessionCacheChallengeQueryVariables>;
export const GetPgpInfoDocument = /*#__PURE__*/ gql`
    query getPgpInfo($emailAlias: String!, $allKeys: Boolean) {
  pgpInfo(emailAlias: $emailAlias, allKeys: $allKeys) {
    createdAt
    emailAlias
    encryptedPrivateKey {
      encryptedData
    }
    encryptionFingerprint
    encryptedSessionKey {
      encryptedSessionKey
      encryptedBy
    }
    encryptionKeyID
    publicKey
    signingFingerprint
    signingKeyID
    status
  }
}
    `;

/**
 * __useGetPgpInfoQuery__
 *
 * To run a query within a React component, call `useGetPgpInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPgpInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPgpInfoQuery({
 *   variables: {
 *      emailAlias: // value for 'emailAlias'
 *      allKeys: // value for 'allKeys'
 *   },
 * });
 */
export function useGetPgpInfoQuery(baseOptions: Apollo.useQuery.Options<GetPgpInfoQuery, GetPgpInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPgpInfoQuery, GetPgpInfoQueryVariables>(GetPgpInfoDocument, options);
      }
export function useGetPgpInfoLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetPgpInfoQuery, GetPgpInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPgpInfoQuery, GetPgpInfoQueryVariables>(GetPgpInfoDocument, options);
        }
export type GetPgpInfoQueryHookResult = ReturnType<typeof useGetPgpInfoQuery>;
export type GetPgpInfoLazyQueryHookResult = ReturnType<typeof useGetPgpInfoLazyQuery>;
export type GetPgpInfoQueryResult = Apollo.useQuery.Result<GetPgpInfoQuery, GetPgpInfoQueryVariables>;
export const GetSessionCacheWithCalendarsDocument = /*#__PURE__*/ gql`
    query getSessionCacheWithCalendars {
  sessionCache {
    cacheKey
    alternativeCacheKeys
  }
  currentUser {
    userID
    recoveryEmail
    unverifiedRecoveryEmail
    walletAddress
    rootOrgID
    primaryCalendar {
      calendarID
    }
    calendars {
      calendarID
      publicKey
      encryptedPrivateKey
      encryptedByKey
    }
  }
}
    `;

/**
 * __useGetSessionCacheWithCalendarsQuery__
 *
 * To run a query within a React component, call `useGetSessionCacheWithCalendarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionCacheWithCalendarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionCacheWithCalendarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionCacheWithCalendarsQuery(baseOptions?: Apollo.useQuery.Options<GetSessionCacheWithCalendarsQuery, GetSessionCacheWithCalendarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionCacheWithCalendarsQuery, GetSessionCacheWithCalendarsQueryVariables>(GetSessionCacheWithCalendarsDocument, options);
      }
export function useGetSessionCacheWithCalendarsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSessionCacheWithCalendarsQuery, GetSessionCacheWithCalendarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionCacheWithCalendarsQuery, GetSessionCacheWithCalendarsQueryVariables>(GetSessionCacheWithCalendarsDocument, options);
        }
export type GetSessionCacheWithCalendarsQueryHookResult = ReturnType<typeof useGetSessionCacheWithCalendarsQuery>;
export type GetSessionCacheWithCalendarsLazyQueryHookResult = ReturnType<typeof useGetSessionCacheWithCalendarsLazyQuery>;
export type GetSessionCacheWithCalendarsQueryResult = Apollo.useQuery.Result<GetSessionCacheWithCalendarsQuery, GetSessionCacheWithCalendarsQueryVariables>;
export const GetSearchIndexableDocumentsDocument = /*#__PURE__*/ gql`
    query getSearchIndexableDocuments {
  searchIndexableDocuments {
    docID
    updatedAt
  }
}
    `;

/**
 * __useGetSearchIndexableDocumentsQuery__
 *
 * To run a query within a React component, call `useGetSearchIndexableDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchIndexableDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchIndexableDocumentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSearchIndexableDocumentsQuery(baseOptions?: Apollo.useQuery.Options<GetSearchIndexableDocumentsQuery, GetSearchIndexableDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchIndexableDocumentsQuery, GetSearchIndexableDocumentsQueryVariables>(GetSearchIndexableDocumentsDocument, options);
      }
export function useGetSearchIndexableDocumentsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSearchIndexableDocumentsQuery, GetSearchIndexableDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchIndexableDocumentsQuery, GetSearchIndexableDocumentsQueryVariables>(GetSearchIndexableDocumentsDocument, options);
        }
export type GetSearchIndexableDocumentsQueryHookResult = ReturnType<typeof useGetSearchIndexableDocumentsQuery>;
export type GetSearchIndexableDocumentsLazyQueryHookResult = ReturnType<typeof useGetSearchIndexableDocumentsLazyQuery>;
export type GetSearchIndexableDocumentsQueryResult = Apollo.useQuery.Result<GetSearchIndexableDocumentsQuery, GetSearchIndexableDocumentsQueryVariables>;
export const GetSearchIndexProgressDocument = /*#__PURE__*/ gql`
    query getSearchIndexProgress($request: GetSearchIndexProgressRequest!) {
  searchIndexProgress(request: $request) {
    numIndexableThreads
    numThreadsIndexed
    isIndexComplete
  }
}
    `;

/**
 * __useGetSearchIndexProgressQuery__
 *
 * To run a query within a React component, call `useGetSearchIndexProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchIndexProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchIndexProgressQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetSearchIndexProgressQuery(baseOptions: Apollo.useQuery.Options<GetSearchIndexProgressQuery, GetSearchIndexProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchIndexProgressQuery, GetSearchIndexProgressQueryVariables>(GetSearchIndexProgressDocument, options);
      }
export function useGetSearchIndexProgressLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSearchIndexProgressQuery, GetSearchIndexProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchIndexProgressQuery, GetSearchIndexProgressQueryVariables>(GetSearchIndexProgressDocument, options);
        }
export type GetSearchIndexProgressQueryHookResult = ReturnType<typeof useGetSearchIndexProgressQuery>;
export type GetSearchIndexProgressLazyQueryHookResult = ReturnType<typeof useGetSearchIndexProgressLazyQuery>;
export type GetSearchIndexProgressQueryResult = Apollo.useQuery.Result<GetSearchIndexProgressQuery, GetSearchIndexProgressQueryVariables>;
export const GetAllFolderDocumentsDocument = /*#__PURE__*/ gql`
    query getAllFolderDocuments {
  allFolderDocuments {
    ...DocumentBasicInfo
    ...DocumentDecryptedMetadata
    updatedAt
    parentsBreadcrumb {
      docID
      ...DocumentDecryptedMetadata
    }
  }
}
    ${DocumentBasicInfoFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}`;

/**
 * __useGetAllFolderDocumentsQuery__
 *
 * To run a query within a React component, call `useGetAllFolderDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFolderDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFolderDocumentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFolderDocumentsQuery(baseOptions?: Apollo.useQuery.Options<GetAllFolderDocumentsQuery, GetAllFolderDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFolderDocumentsQuery, GetAllFolderDocumentsQueryVariables>(GetAllFolderDocumentsDocument, options);
      }
export function useGetAllFolderDocumentsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAllFolderDocumentsQuery, GetAllFolderDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFolderDocumentsQuery, GetAllFolderDocumentsQueryVariables>(GetAllFolderDocumentsDocument, options);
        }
export type GetAllFolderDocumentsQueryHookResult = ReturnType<typeof useGetAllFolderDocumentsQuery>;
export type GetAllFolderDocumentsLazyQueryHookResult = ReturnType<typeof useGetAllFolderDocumentsLazyQuery>;
export type GetAllFolderDocumentsQueryResult = Apollo.useQuery.Result<GetAllFolderDocumentsQuery, GetAllFolderDocumentsQueryVariables>;
export const ApiVersionDocument = /*#__PURE__*/ gql`
    query apiVersion {
  apiVersion
}
    `;

/**
 * __useApiVersionQuery__
 *
 * To run a query within a React component, call `useApiVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useApiVersionQuery(baseOptions?: Apollo.useQuery.Options<ApiVersionQuery, ApiVersionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApiVersionQuery, ApiVersionQueryVariables>(ApiVersionDocument, options);
      }
export function useApiVersionLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<ApiVersionQuery, ApiVersionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApiVersionQuery, ApiVersionQueryVariables>(ApiVersionDocument, options);
        }
export type ApiVersionQueryHookResult = ReturnType<typeof useApiVersionQuery>;
export type ApiVersionLazyQueryHookResult = ReturnType<typeof useApiVersionLazyQuery>;
export type ApiVersionQueryResult = Apollo.useQuery.Result<ApiVersionQuery, ApiVersionQueryVariables>;
export const GetIcnsNameDocument = /*#__PURE__*/ gql`
    query getICNSName($cosmosAddress: String!) {
  getICNSName(cosmosAddress: $cosmosAddress)
}
    `;

/**
 * __useGetIcnsNameQuery__
 *
 * To run a query within a React component, call `useGetIcnsNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIcnsNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIcnsNameQuery({
 *   variables: {
 *      cosmosAddress: // value for 'cosmosAddress'
 *   },
 * });
 */
export function useGetIcnsNameQuery(baseOptions: Apollo.useQuery.Options<GetIcnsNameQuery, GetIcnsNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIcnsNameQuery, GetIcnsNameQueryVariables>(GetIcnsNameDocument, options);
      }
export function useGetIcnsNameLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetIcnsNameQuery, GetIcnsNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIcnsNameQuery, GetIcnsNameQueryVariables>(GetIcnsNameDocument, options);
        }
export type GetIcnsNameQueryHookResult = ReturnType<typeof useGetIcnsNameQuery>;
export type GetIcnsNameLazyQueryHookResult = ReturnType<typeof useGetIcnsNameLazyQuery>;
export type GetIcnsNameQueryResult = Apollo.useQuery.Result<GetIcnsNameQuery, GetIcnsNameQueryVariables>;
export const RefreshTokenDocument = /*#__PURE__*/ gql`
    query refreshToken {
  refreshToken
}
    `;

/**
 * __useRefreshTokenQuery__
 *
 * To run a query within a React component, call `useRefreshTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenQuery(baseOptions?: Apollo.useQuery.Options<RefreshTokenQuery, RefreshTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
      }
export function useRefreshTokenLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<RefreshTokenQuery, RefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
        }
export type RefreshTokenQueryHookResult = ReturnType<typeof useRefreshTokenQuery>;
export type RefreshTokenLazyQueryHookResult = ReturnType<typeof useRefreshTokenLazyQuery>;
export type RefreshTokenQueryResult = Apollo.useQuery.Result<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const GetNativeDriveManifestDocument = /*#__PURE__*/ gql`
    query getNativeDriveManifest {
  nativeDriveManifest {
    slimDocuments {
      docID
      parentID
      currentUserPermissionLevel
      trashedAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetNativeDriveManifestQuery__
 *
 * To run a query within a React component, call `useGetNativeDriveManifestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNativeDriveManifestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNativeDriveManifestQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNativeDriveManifestQuery(baseOptions?: Apollo.useQuery.Options<GetNativeDriveManifestQuery, GetNativeDriveManifestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNativeDriveManifestQuery, GetNativeDriveManifestQueryVariables>(GetNativeDriveManifestDocument, options);
      }
export function useGetNativeDriveManifestLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetNativeDriveManifestQuery, GetNativeDriveManifestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNativeDriveManifestQuery, GetNativeDriveManifestQueryVariables>(GetNativeDriveManifestDocument, options);
        }
export type GetNativeDriveManifestQueryHookResult = ReturnType<typeof useGetNativeDriveManifestQuery>;
export type GetNativeDriveManifestLazyQueryHookResult = ReturnType<typeof useGetNativeDriveManifestLazyQuery>;
export type GetNativeDriveManifestQueryResult = Apollo.useQuery.Result<GetNativeDriveManifestQuery, GetNativeDriveManifestQueryVariables>;
export const GetOrganizationDocument = /*#__PURE__*/ gql`
    query getOrganization($id: String!) {
  organization(id: $id) {
    ...OrganizationFullInfo
  }
}
    ${OrganizationFullInfoFragmentDoc}`;

/**
 * __useGetOrganizationQuery__
 *
 * To run a query within a React component, call `useGetOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizationQuery(baseOptions: Apollo.useQuery.Options<GetOrganizationQuery, GetOrganizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
      }
export function useGetOrganizationLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetOrganizationQuery, GetOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, options);
        }
export type GetOrganizationQueryHookResult = ReturnType<typeof useGetOrganizationQuery>;
export type GetOrganizationLazyQueryHookResult = ReturnType<typeof useGetOrganizationLazyQuery>;
export type GetOrganizationQueryResult = Apollo.useQuery.Result<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const GetOrganizationMembersDocument = /*#__PURE__*/ gql`
    query getOrganizationMembers($id: String!) {
  organization(id: $id) {
    orgID
    name
    everyoneTeam {
      teamID
      rootDocument {
        ...DocumentBasicInfoWithoutTeamOrOrg
        ...DocumentInvites
        ...DocumentCollaborators
      }
    }
    displayPictureData {
      profileAccentColor
      profileCustomURI
      profileIcon
    }
    rootDocID
    teams {
      accessLevel
      teamID
      name
      icon
      rootDocument {
        ...DocumentDecryptedMetadata
        ...DocumentBasicInfoWithoutTeamOrOrg
        ...DocumentPermissionProxies
        ...DocumentCollaborators
      }
    }
  }
}
    ${DocumentBasicInfoWithoutTeamOrOrgFragmentDoc}
${DocumentInvitesFragmentDoc}
${DocumentCollaboratorsFragmentDoc}
${DocumentDecryptedMetadataFragmentDoc}
${DocumentPermissionProxiesFragmentDoc}`;

/**
 * __useGetOrganizationMembersQuery__
 *
 * To run a query within a React component, call `useGetOrganizationMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationMembersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizationMembersQuery(baseOptions: Apollo.useQuery.Options<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>(GetOrganizationMembersDocument, options);
      }
export function useGetOrganizationMembersLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>(GetOrganizationMembersDocument, options);
        }
export type GetOrganizationMembersQueryHookResult = ReturnType<typeof useGetOrganizationMembersQuery>;
export type GetOrganizationMembersLazyQueryHookResult = ReturnType<typeof useGetOrganizationMembersLazyQuery>;
export type GetOrganizationMembersQueryResult = Apollo.useQuery.Result<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>;
export const GetTemplatesDocument = /*#__PURE__*/ gql`
    query getTemplates($request: GetTemplatesRequest!) {
  templates(request: $request) {
    ...TemplateData
  }
}
    ${TemplateDataFragmentDoc}`;

/**
 * __useGetTemplatesQuery__
 *
 * To run a query within a React component, call `useGetTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTemplatesQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetTemplatesQuery(baseOptions: Apollo.useQuery.Options<GetTemplatesQuery, GetTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTemplatesQuery, GetTemplatesQueryVariables>(GetTemplatesDocument, options);
      }
export function useGetTemplatesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetTemplatesQuery, GetTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTemplatesQuery, GetTemplatesQueryVariables>(GetTemplatesDocument, options);
        }
export type GetTemplatesQueryHookResult = ReturnType<typeof useGetTemplatesQuery>;
export type GetTemplatesLazyQueryHookResult = ReturnType<typeof useGetTemplatesLazyQuery>;
export type GetTemplatesQueryResult = Apollo.useQuery.Result<GetTemplatesQuery, GetTemplatesQueryVariables>;
export const GetUserIdDocument = /*#__PURE__*/ gql`
    query getUserID($request: GetUserRequest!) {
  user(request: $request) {
    userID
  }
}
    `;

/**
 * __useGetUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIdQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserIdQuery(baseOptions: Apollo.useQuery.Options<GetUserIdQuery, GetUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
      }
export function useGetUserIdLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserIdQuery, GetUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserIdQuery, GetUserIdQueryVariables>(GetUserIdDocument, options);
        }
export type GetUserIdQueryHookResult = ReturnType<typeof useGetUserIdQuery>;
export type GetUserIdLazyQueryHookResult = ReturnType<typeof useGetUserIdLazyQuery>;
export type GetUserIdQueryResult = Apollo.useQuery.Result<GetUserIdQuery, GetUserIdQueryVariables>;
export const GetUserStorageUsedDocument = /*#__PURE__*/ gql`
    query getUserStorageUsed($request: GetUserRequest!) {
  user(request: $request) {
    userID
    storageUsed
  }
}
    `;

/**
 * __useGetUserStorageUsedQuery__
 *
 * To run a query within a React component, call `useGetUserStorageUsedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserStorageUsedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserStorageUsedQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserStorageUsedQuery(baseOptions: Apollo.useQuery.Options<GetUserStorageUsedQuery, GetUserStorageUsedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserStorageUsedQuery, GetUserStorageUsedQueryVariables>(GetUserStorageUsedDocument, options);
      }
export function useGetUserStorageUsedLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserStorageUsedQuery, GetUserStorageUsedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserStorageUsedQuery, GetUserStorageUsedQueryVariables>(GetUserStorageUsedDocument, options);
        }
export type GetUserStorageUsedQueryHookResult = ReturnType<typeof useGetUserStorageUsedQuery>;
export type GetUserStorageUsedLazyQueryHookResult = ReturnType<typeof useGetUserStorageUsedLazyQuery>;
export type GetUserStorageUsedQueryResult = Apollo.useQuery.Result<GetUserStorageUsedQuery, GetUserStorageUsedQueryVariables>;
export const GetUserMailStorageUsedDocument = /*#__PURE__*/ gql`
    query getUserMailStorageUsed {
  currentUser {
    ...UserWithMailStorageUsed
  }
}
    ${UserWithMailStorageUsedFragmentDoc}`;

/**
 * __useGetUserMailStorageUsedQuery__
 *
 * To run a query within a React component, call `useGetUserMailStorageUsedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserMailStorageUsedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserMailStorageUsedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserMailStorageUsedQuery(baseOptions?: Apollo.useQuery.Options<GetUserMailStorageUsedQuery, GetUserMailStorageUsedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserMailStorageUsedQuery, GetUserMailStorageUsedQueryVariables>(GetUserMailStorageUsedDocument, options);
      }
export function useGetUserMailStorageUsedLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserMailStorageUsedQuery, GetUserMailStorageUsedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserMailStorageUsedQuery, GetUserMailStorageUsedQueryVariables>(GetUserMailStorageUsedDocument, options);
        }
export type GetUserMailStorageUsedQueryHookResult = ReturnType<typeof useGetUserMailStorageUsedQuery>;
export type GetUserMailStorageUsedLazyQueryHookResult = ReturnType<typeof useGetUserMailStorageUsedLazyQuery>;
export type GetUserMailStorageUsedQueryResult = Apollo.useQuery.Result<GetUserMailStorageUsedQuery, GetUserMailStorageUsedQueryVariables>;
export const GetUsersProfileDataDocument = /*#__PURE__*/ gql`
    query getUsersProfileData($request: GetUsersRequest!) {
  users(request: $request) {
    ...UserProfileData
  }
}
    ${UserProfileDataFragmentDoc}`;

/**
 * __useGetUsersProfileDataQuery__
 *
 * To run a query within a React component, call `useGetUsersProfileDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersProfileDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersProfileDataQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUsersProfileDataQuery(baseOptions: Apollo.useQuery.Options<GetUsersProfileDataQuery, GetUsersProfileDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersProfileDataQuery, GetUsersProfileDataQueryVariables>(GetUsersProfileDataDocument, options);
      }
export function useGetUsersProfileDataLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUsersProfileDataQuery, GetUsersProfileDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersProfileDataQuery, GetUsersProfileDataQueryVariables>(GetUsersProfileDataDocument, options);
        }
export type GetUsersProfileDataQueryHookResult = ReturnType<typeof useGetUsersProfileDataQuery>;
export type GetUsersProfileDataLazyQueryHookResult = ReturnType<typeof useGetUsersProfileDataLazyQuery>;
export type GetUsersProfileDataQueryResult = Apollo.useQuery.Result<GetUsersProfileDataQuery, GetUsersProfileDataQueryVariables>;
export const GetUserProfileDataDocument = /*#__PURE__*/ gql`
    query getUserProfileData($request: GetUserRequest!) {
  user(request: $request) {
    ...UserProfileData
  }
}
    ${UserProfileDataFragmentDoc}`;

/**
 * __useGetUserProfileDataQuery__
 *
 * To run a query within a React component, call `useGetUserProfileDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileDataQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserProfileDataQuery(baseOptions: Apollo.useQuery.Options<GetUserProfileDataQuery, GetUserProfileDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileDataQuery, GetUserProfileDataQueryVariables>(GetUserProfileDataDocument, options);
      }
export function useGetUserProfileDataLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserProfileDataQuery, GetUserProfileDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileDataQuery, GetUserProfileDataQueryVariables>(GetUserProfileDataDocument, options);
        }
export type GetUserProfileDataQueryHookResult = ReturnType<typeof useGetUserProfileDataQuery>;
export type GetUserProfileDataLazyQueryHookResult = ReturnType<typeof useGetUserProfileDataLazyQuery>;
export type GetUserProfileDataQueryResult = Apollo.useQuery.Result<GetUserProfileDataQuery, GetUserProfileDataQueryVariables>;
export const GetPublicKeyDocument = /*#__PURE__*/ gql`
    query getPublicKey($request: GetUserRequest!) {
  user(request: $request) {
    userID
    publicKey
    signingPublicKey
  }
}
    `;

/**
 * __useGetPublicKeyQuery__
 *
 * To run a query within a React component, call `useGetPublicKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicKeyQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetPublicKeyQuery(baseOptions: Apollo.useQuery.Options<GetPublicKeyQuery, GetPublicKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicKeyQuery, GetPublicKeyQueryVariables>(GetPublicKeyDocument, options);
      }
export function useGetPublicKeyLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetPublicKeyQuery, GetPublicKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicKeyQuery, GetPublicKeyQueryVariables>(GetPublicKeyDocument, options);
        }
export type GetPublicKeyQueryHookResult = ReturnType<typeof useGetPublicKeyQuery>;
export type GetPublicKeyLazyQueryHookResult = ReturnType<typeof useGetPublicKeyLazyQuery>;
export type GetPublicKeyQueryResult = Apollo.useQuery.Result<GetPublicKeyQuery, GetPublicKeyQueryVariables>;
export const GetPublicKeysDocument = /*#__PURE__*/ gql`
    query getPublicKeys($request: GetUsersRequest!) {
  users(request: $request) {
    userID
    publicKey
    signingPublicKey
  }
}
    `;

/**
 * __useGetPublicKeysQuery__
 *
 * To run a query within a React component, call `useGetPublicKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicKeysQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetPublicKeysQuery(baseOptions: Apollo.useQuery.Options<GetPublicKeysQuery, GetPublicKeysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicKeysQuery, GetPublicKeysQueryVariables>(GetPublicKeysDocument, options);
      }
export function useGetPublicKeysLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetPublicKeysQuery, GetPublicKeysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicKeysQuery, GetPublicKeysQueryVariables>(GetPublicKeysDocument, options);
        }
export type GetPublicKeysQueryHookResult = ReturnType<typeof useGetPublicKeysQuery>;
export type GetPublicKeysLazyQueryHookResult = ReturnType<typeof useGetPublicKeysLazyQuery>;
export type GetPublicKeysQueryResult = Apollo.useQuery.Result<GetPublicKeysQuery, GetPublicKeysQueryVariables>;
export const GetUserMfaDocument = /*#__PURE__*/ gql`
    query getUserMfa($request: GetUserRequest!) {
  user(request: $request) {
    userID
    mfa {
      webAuthnKeys {
        keyName
        credentialID
        lastSuccessfulChallenge
        transports
      }
      totpData
      backupCodes
    }
  }
}
    `;

/**
 * __useGetUserMfaQuery__
 *
 * To run a query within a React component, call `useGetUserMfaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserMfaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserMfaQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserMfaQuery(baseOptions: Apollo.useQuery.Options<GetUserMfaQuery, GetUserMfaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserMfaQuery, GetUserMfaQueryVariables>(GetUserMfaDocument, options);
      }
export function useGetUserMfaLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserMfaQuery, GetUserMfaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserMfaQuery, GetUserMfaQueryVariables>(GetUserMfaDocument, options);
        }
export type GetUserMfaQueryHookResult = ReturnType<typeof useGetUserMfaQuery>;
export type GetUserMfaLazyQueryHookResult = ReturnType<typeof useGetUserMfaLazyQuery>;
export type GetUserMfaQueryResult = Apollo.useQuery.Result<GetUserMfaQuery, GetUserMfaQueryVariables>;
export const GetRecoveryDataDocument = /*#__PURE__*/ gql`
    query getRecoveryData($request: GetUserRequest!) {
  user(request: $request) {
    userID
    encryptedRecoveryData
  }
}
    `;

/**
 * __useGetRecoveryDataQuery__
 *
 * To run a query within a React component, call `useGetRecoveryDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecoveryDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecoveryDataQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetRecoveryDataQuery(baseOptions: Apollo.useQuery.Options<GetRecoveryDataQuery, GetRecoveryDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecoveryDataQuery, GetRecoveryDataQueryVariables>(GetRecoveryDataDocument, options);
      }
export function useGetRecoveryDataLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetRecoveryDataQuery, GetRecoveryDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecoveryDataQuery, GetRecoveryDataQueryVariables>(GetRecoveryDataDocument, options);
        }
export type GetRecoveryDataQueryHookResult = ReturnType<typeof useGetRecoveryDataQuery>;
export type GetRecoveryDataLazyQueryHookResult = ReturnType<typeof useGetRecoveryDataLazyQuery>;
export type GetRecoveryDataQueryResult = Apollo.useQuery.Result<GetRecoveryDataQuery, GetRecoveryDataQueryVariables>;
export const GetRecoveryShareDocument = /*#__PURE__*/ gql`
    query getRecoveryShare($request: GetUserRequest!) {
  user(request: $request) {
    userID
    username
    publicKey
    recoverySigningPublicKey
    recoveryServerShare
  }
}
    `;

/**
 * __useGetRecoveryShareQuery__
 *
 * To run a query within a React component, call `useGetRecoveryShareQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecoveryShareQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecoveryShareQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetRecoveryShareQuery(baseOptions: Apollo.useQuery.Options<GetRecoveryShareQuery, GetRecoveryShareQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecoveryShareQuery, GetRecoveryShareQueryVariables>(GetRecoveryShareDocument, options);
      }
export function useGetRecoveryShareLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetRecoveryShareQuery, GetRecoveryShareQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecoveryShareQuery, GetRecoveryShareQueryVariables>(GetRecoveryShareDocument, options);
        }
export type GetRecoveryShareQueryHookResult = ReturnType<typeof useGetRecoveryShareQuery>;
export type GetRecoveryShareLazyQueryHookResult = ReturnType<typeof useGetRecoveryShareLazyQuery>;
export type GetRecoveryShareQueryResult = Apollo.useQuery.Result<GetRecoveryShareQuery, GetRecoveryShareQueryVariables>;
export const GetUserTagsDocument = /*#__PURE__*/ gql`
    query getUserTags($request: GetUserRequest!) {
  user(request: $request) {
    accountTags
    userID
  }
}
    `;

/**
 * __useGetUserTagsQuery__
 *
 * To run a query within a React component, call `useGetUserTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTagsQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserTagsQuery(baseOptions: Apollo.useQuery.Options<GetUserTagsQuery, GetUserTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTagsQuery, GetUserTagsQueryVariables>(GetUserTagsDocument, options);
      }
export function useGetUserTagsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserTagsQuery, GetUserTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTagsQuery, GetUserTagsQueryVariables>(GetUserTagsDocument, options);
        }
export type GetUserTagsQueryHookResult = ReturnType<typeof useGetUserTagsQuery>;
export type GetUserTagsLazyQueryHookResult = ReturnType<typeof useGetUserTagsLazyQuery>;
export type GetUserTagsQueryResult = Apollo.useQuery.Result<GetUserTagsQuery, GetUserTagsQueryVariables>;
export const GetSubscriptionInfoDocument = /*#__PURE__*/ gql`
    query getSubscriptionInfo {
  currentUser {
    userID
    subscriptionInfo {
      subscriptionPlan
      isCryptoSubscription
      isAppleSubscription
      isGoogleSubscription
      cancelAtPeriodEnd
      supposedEndDate
      stripeStatus
      billingInterval
      quantity
    }
  }
}
    `;

/**
 * __useGetSubscriptionInfoQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubscriptionInfoQuery(baseOptions?: Apollo.useQuery.Options<GetSubscriptionInfoQuery, GetSubscriptionInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionInfoQuery, GetSubscriptionInfoQueryVariables>(GetSubscriptionInfoDocument, options);
      }
export function useGetSubscriptionInfoLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetSubscriptionInfoQuery, GetSubscriptionInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionInfoQuery, GetSubscriptionInfoQueryVariables>(GetSubscriptionInfoDocument, options);
        }
export type GetSubscriptionInfoQueryHookResult = ReturnType<typeof useGetSubscriptionInfoQuery>;
export type GetSubscriptionInfoLazyQueryHookResult = ReturnType<typeof useGetSubscriptionInfoLazyQuery>;
export type GetSubscriptionInfoQueryResult = Apollo.useQuery.Result<GetSubscriptionInfoQuery, GetSubscriptionInfoQueryVariables>;
export const GetInvoiceHistoryDocument = /*#__PURE__*/ gql`
    query getInvoiceHistory {
  currentUser {
    userID
    invoiceHistory {
      invoiceHistory {
        amountDue
        created
        url
        invoiceTiers
        status
      }
    }
  }
}
    `;

/**
 * __useGetInvoiceHistoryQuery__
 *
 * To run a query within a React component, call `useGetInvoiceHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInvoiceHistoryQuery(baseOptions?: Apollo.useQuery.Options<GetInvoiceHistoryQuery, GetInvoiceHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceHistoryQuery, GetInvoiceHistoryQueryVariables>(GetInvoiceHistoryDocument, options);
      }
export function useGetInvoiceHistoryLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetInvoiceHistoryQuery, GetInvoiceHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceHistoryQuery, GetInvoiceHistoryQueryVariables>(GetInvoiceHistoryDocument, options);
        }
export type GetInvoiceHistoryQueryHookResult = ReturnType<typeof useGetInvoiceHistoryQuery>;
export type GetInvoiceHistoryLazyQueryHookResult = ReturnType<typeof useGetInvoiceHistoryLazyQuery>;
export type GetInvoiceHistoryQueryResult = Apollo.useQuery.Result<GetInvoiceHistoryQuery, GetInvoiceHistoryQueryVariables>;
export const GetUserMetamaskSecretDocument = /*#__PURE__*/ gql`
    query getUserMetamaskSecret($request: GetUserRequest!) {
  user(request: $request) {
    userID
    encryptedMetamaskSecret
  }
}
    `;

/**
 * __useGetUserMetamaskSecretQuery__
 *
 * To run a query within a React component, call `useGetUserMetamaskSecretQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserMetamaskSecretQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserMetamaskSecretQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserMetamaskSecretQuery(baseOptions: Apollo.useQuery.Options<GetUserMetamaskSecretQuery, GetUserMetamaskSecretQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserMetamaskSecretQuery, GetUserMetamaskSecretQueryVariables>(GetUserMetamaskSecretDocument, options);
      }
export function useGetUserMetamaskSecretLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserMetamaskSecretQuery, GetUserMetamaskSecretQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserMetamaskSecretQuery, GetUserMetamaskSecretQueryVariables>(GetUserMetamaskSecretDocument, options);
        }
export type GetUserMetamaskSecretQueryHookResult = ReturnType<typeof useGetUserMetamaskSecretQuery>;
export type GetUserMetamaskSecretLazyQueryHookResult = ReturnType<typeof useGetUserMetamaskSecretLazyQuery>;
export type GetUserMetamaskSecretQueryResult = Apollo.useQuery.Result<GetUserMetamaskSecretQuery, GetUserMetamaskSecretQueryVariables>;
export const CurrentUserDocument = /*#__PURE__*/ gql`
    query currentUser {
  currentUser {
    ...UserProfileDataWithKeys
  }
}
    ${UserProfileDataWithKeysFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.useQuery.Options<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.useQuery.Result<CurrentUserQuery, CurrentUserQueryVariables>;
export const CurrentUserEmailAliasesDocument = /*#__PURE__*/ gql`
    query currentUserEmailAliases {
  currentUser {
    ...UserWithEmailAliases
  }
}
    ${UserWithEmailAliasesFragmentDoc}`;

/**
 * __useCurrentUserEmailAliasesQuery__
 *
 * To run a query within a React component, call `useCurrentUserEmailAliasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserEmailAliasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserEmailAliasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserEmailAliasesQuery(baseOptions?: Apollo.useQuery.Options<CurrentUserEmailAliasesQuery, CurrentUserEmailAliasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserEmailAliasesQuery, CurrentUserEmailAliasesQueryVariables>(CurrentUserEmailAliasesDocument, options);
      }
export function useCurrentUserEmailAliasesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<CurrentUserEmailAliasesQuery, CurrentUserEmailAliasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserEmailAliasesQuery, CurrentUserEmailAliasesQueryVariables>(CurrentUserEmailAliasesDocument, options);
        }
export type CurrentUserEmailAliasesQueryHookResult = ReturnType<typeof useCurrentUserEmailAliasesQuery>;
export type CurrentUserEmailAliasesLazyQueryHookResult = ReturnType<typeof useCurrentUserEmailAliasesLazyQuery>;
export type CurrentUserEmailAliasesQueryResult = Apollo.useQuery.Result<CurrentUserEmailAliasesQuery, CurrentUserEmailAliasesQueryVariables>;
export const GetFullAliasInfoDocument = /*#__PURE__*/ gql`
    query getFullAliasInfo {
  fullAliasInfo {
    emailAlias
    displayName
    encryptedAliasData
    encryptedByKey
    encryptedSessionKey
    areNotificationsEnabled
    createdAt
    displayPictureData {
      profileIcon
      profileAccentColor
      profileCustomURI
    }
    decryptedSessionKey @client
    decryptedData @client {
      note
    }
  }
}
    `;

/**
 * __useGetFullAliasInfoQuery__
 *
 * To run a query within a React component, call `useGetFullAliasInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFullAliasInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFullAliasInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFullAliasInfoQuery(baseOptions?: Apollo.useQuery.Options<GetFullAliasInfoQuery, GetFullAliasInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFullAliasInfoQuery, GetFullAliasInfoQueryVariables>(GetFullAliasInfoDocument, options);
      }
export function useGetFullAliasInfoLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetFullAliasInfoQuery, GetFullAliasInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFullAliasInfoQuery, GetFullAliasInfoQueryVariables>(GetFullAliasInfoDocument, options);
        }
export type GetFullAliasInfoQueryHookResult = ReturnType<typeof useGetFullAliasInfoQuery>;
export type GetFullAliasInfoLazyQueryHookResult = ReturnType<typeof useGetFullAliasInfoLazyQuery>;
export type GetFullAliasInfoQueryResult = Apollo.useQuery.Result<GetFullAliasInfoQuery, GetFullAliasInfoQueryVariables>;
export const AliasDisplayInfoDocument = /*#__PURE__*/ gql`
    query aliasDisplayInfo($emailAlias: String!) {
  aliasDisplayInfo(emailAlias: $emailAlias) {
    displayName
    displayPictureData {
      profileIcon
      profileAccentColor
      profileCustomURI
    }
  }
}
    `;

/**
 * __useAliasDisplayInfoQuery__
 *
 * To run a query within a React component, call `useAliasDisplayInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAliasDisplayInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAliasDisplayInfoQuery({
 *   variables: {
 *      emailAlias: // value for 'emailAlias'
 *   },
 * });
 */
export function useAliasDisplayInfoQuery(baseOptions: Apollo.useQuery.Options<AliasDisplayInfoQuery, AliasDisplayInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AliasDisplayInfoQuery, AliasDisplayInfoQueryVariables>(AliasDisplayInfoDocument, options);
      }
export function useAliasDisplayInfoLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<AliasDisplayInfoQuery, AliasDisplayInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AliasDisplayInfoQuery, AliasDisplayInfoQueryVariables>(AliasDisplayInfoDocument, options);
        }
export type AliasDisplayInfoQueryHookResult = ReturnType<typeof useAliasDisplayInfoQuery>;
export type AliasDisplayInfoLazyQueryHookResult = ReturnType<typeof useAliasDisplayInfoLazyQuery>;
export type AliasDisplayInfoQueryResult = Apollo.useQuery.Result<AliasDisplayInfoQuery, AliasDisplayInfoQueryVariables>;
export const GetQuickAliasRootDomainsForUserDocument = /*#__PURE__*/ gql`
    query getQuickAliasRootDomainsForUser {
  getQuickAliasRootDomainsForUser
}
    `;

/**
 * __useGetQuickAliasRootDomainsForUserQuery__
 *
 * To run a query within a React component, call `useGetQuickAliasRootDomainsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuickAliasRootDomainsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuickAliasRootDomainsForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetQuickAliasRootDomainsForUserQuery(baseOptions?: Apollo.useQuery.Options<GetQuickAliasRootDomainsForUserQuery, GetQuickAliasRootDomainsForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuickAliasRootDomainsForUserQuery, GetQuickAliasRootDomainsForUserQueryVariables>(GetQuickAliasRootDomainsForUserDocument, options);
      }
export function useGetQuickAliasRootDomainsForUserLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetQuickAliasRootDomainsForUserQuery, GetQuickAliasRootDomainsForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuickAliasRootDomainsForUserQuery, GetQuickAliasRootDomainsForUserQueryVariables>(GetQuickAliasRootDomainsForUserDocument, options);
        }
export type GetQuickAliasRootDomainsForUserQueryHookResult = ReturnType<typeof useGetQuickAliasRootDomainsForUserQuery>;
export type GetQuickAliasRootDomainsForUserLazyQueryHookResult = ReturnType<typeof useGetQuickAliasRootDomainsForUserLazyQuery>;
export type GetQuickAliasRootDomainsForUserQueryResult = Apollo.useQuery.Result<GetQuickAliasRootDomainsForUserQuery, GetQuickAliasRootDomainsForUserQueryVariables>;
export const GetRecoveryPublicKeysAndDataDocument = /*#__PURE__*/ gql`
    query getRecoveryPublicKeysAndData($request: GetRecoveryPublicKeysAndDataRequest!) {
  recoveryPublicKeysAndData(request: $request) {
    recoverySigningPublicKey
    publicKey
    encryptedRecoveryData
    recoveryServerShare
  }
}
    `;

/**
 * __useGetRecoveryPublicKeysAndDataQuery__
 *
 * To run a query within a React component, call `useGetRecoveryPublicKeysAndDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecoveryPublicKeysAndDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecoveryPublicKeysAndDataQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetRecoveryPublicKeysAndDataQuery(baseOptions: Apollo.useQuery.Options<GetRecoveryPublicKeysAndDataQuery, GetRecoveryPublicKeysAndDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecoveryPublicKeysAndDataQuery, GetRecoveryPublicKeysAndDataQueryVariables>(GetRecoveryPublicKeysAndDataDocument, options);
      }
export function useGetRecoveryPublicKeysAndDataLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetRecoveryPublicKeysAndDataQuery, GetRecoveryPublicKeysAndDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecoveryPublicKeysAndDataQuery, GetRecoveryPublicKeysAndDataQueryVariables>(GetRecoveryPublicKeysAndDataDocument, options);
        }
export type GetRecoveryPublicKeysAndDataQueryHookResult = ReturnType<typeof useGetRecoveryPublicKeysAndDataQuery>;
export type GetRecoveryPublicKeysAndDataLazyQueryHookResult = ReturnType<typeof useGetRecoveryPublicKeysAndDataLazyQuery>;
export type GetRecoveryPublicKeysAndDataQueryResult = Apollo.useQuery.Result<GetRecoveryPublicKeysAndDataQuery, GetRecoveryPublicKeysAndDataQueryVariables>;
export const ValidatePaperShareHashDocument = /*#__PURE__*/ gql`
    query validatePaperShareHash($request: GetValidPaperShareHashRequest!) {
  validPaperShareHash(request: $request)
}
    `;

/**
 * __useValidatePaperShareHashQuery__
 *
 * To run a query within a React component, call `useValidatePaperShareHashQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatePaperShareHashQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatePaperShareHashQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useValidatePaperShareHashQuery(baseOptions: Apollo.useQuery.Options<ValidatePaperShareHashQuery, ValidatePaperShareHashQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatePaperShareHashQuery, ValidatePaperShareHashQueryVariables>(ValidatePaperShareHashDocument, options);
      }
export function useValidatePaperShareHashLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<ValidatePaperShareHashQuery, ValidatePaperShareHashQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatePaperShareHashQuery, ValidatePaperShareHashQueryVariables>(ValidatePaperShareHashDocument, options);
        }
export type ValidatePaperShareHashQueryHookResult = ReturnType<typeof useValidatePaperShareHashQuery>;
export type ValidatePaperShareHashLazyQueryHookResult = ReturnType<typeof useValidatePaperShareHashLazyQuery>;
export type ValidatePaperShareHashQueryResult = Apollo.useQuery.Result<ValidatePaperShareHashQuery, ValidatePaperShareHashQueryVariables>;
export const OrgMemberEmailAliasesDocument = /*#__PURE__*/ gql`
    query orgMemberEmailAliases($userId: String!) {
  orgMemberEmailAliases(userID: $userId)
}
    `;

/**
 * __useOrgMemberEmailAliasesQuery__
 *
 * To run a query within a React component, call `useOrgMemberEmailAliasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgMemberEmailAliasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgMemberEmailAliasesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useOrgMemberEmailAliasesQuery(baseOptions: Apollo.useQuery.Options<OrgMemberEmailAliasesQuery, OrgMemberEmailAliasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrgMemberEmailAliasesQuery, OrgMemberEmailAliasesQueryVariables>(OrgMemberEmailAliasesDocument, options);
      }
export function useOrgMemberEmailAliasesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<OrgMemberEmailAliasesQuery, OrgMemberEmailAliasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrgMemberEmailAliasesQuery, OrgMemberEmailAliasesQueryVariables>(OrgMemberEmailAliasesDocument, options);
        }
export type OrgMemberEmailAliasesQueryHookResult = ReturnType<typeof useOrgMemberEmailAliasesQuery>;
export type OrgMemberEmailAliasesLazyQueryHookResult = ReturnType<typeof useOrgMemberEmailAliasesLazyQuery>;
export type OrgMemberEmailAliasesQueryResult = Apollo.useQuery.Result<OrgMemberEmailAliasesQuery, OrgMemberEmailAliasesQueryVariables>;
export const CurrentUserDefaultEmailAliasDocument = /*#__PURE__*/ gql`
    query currentUserDefaultEmailAlias {
  currentUser {
    userID
    defaultEmailAlias
  }
}
    `;

/**
 * __useCurrentUserDefaultEmailAliasQuery__
 *
 * To run a query within a React component, call `useCurrentUserDefaultEmailAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserDefaultEmailAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserDefaultEmailAliasQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserDefaultEmailAliasQuery(baseOptions?: Apollo.useQuery.Options<CurrentUserDefaultEmailAliasQuery, CurrentUserDefaultEmailAliasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserDefaultEmailAliasQuery, CurrentUserDefaultEmailAliasQueryVariables>(CurrentUserDefaultEmailAliasDocument, options);
      }
export function useCurrentUserDefaultEmailAliasLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<CurrentUserDefaultEmailAliasQuery, CurrentUserDefaultEmailAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserDefaultEmailAliasQuery, CurrentUserDefaultEmailAliasQueryVariables>(CurrentUserDefaultEmailAliasDocument, options);
        }
export type CurrentUserDefaultEmailAliasQueryHookResult = ReturnType<typeof useCurrentUserDefaultEmailAliasQuery>;
export type CurrentUserDefaultEmailAliasLazyQueryHookResult = ReturnType<typeof useCurrentUserDefaultEmailAliasLazyQuery>;
export type CurrentUserDefaultEmailAliasQueryResult = Apollo.useQuery.Result<CurrentUserDefaultEmailAliasQuery, CurrentUserDefaultEmailAliasQueryVariables>;
export const OrgMemberDefaultEmailAliasDocument = /*#__PURE__*/ gql`
    query orgMemberDefaultEmailAlias($userId: String!) {
  orgMemberDefaultEmailAlias(userID: $userId)
}
    `;

/**
 * __useOrgMemberDefaultEmailAliasQuery__
 *
 * To run a query within a React component, call `useOrgMemberDefaultEmailAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgMemberDefaultEmailAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgMemberDefaultEmailAliasQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useOrgMemberDefaultEmailAliasQuery(baseOptions: Apollo.useQuery.Options<OrgMemberDefaultEmailAliasQuery, OrgMemberDefaultEmailAliasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrgMemberDefaultEmailAliasQuery, OrgMemberDefaultEmailAliasQueryVariables>(OrgMemberDefaultEmailAliasDocument, options);
      }
export function useOrgMemberDefaultEmailAliasLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<OrgMemberDefaultEmailAliasQuery, OrgMemberDefaultEmailAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrgMemberDefaultEmailAliasQuery, OrgMemberDefaultEmailAliasQueryVariables>(OrgMemberDefaultEmailAliasDocument, options);
        }
export type OrgMemberDefaultEmailAliasQueryHookResult = ReturnType<typeof useOrgMemberDefaultEmailAliasQuery>;
export type OrgMemberDefaultEmailAliasLazyQueryHookResult = ReturnType<typeof useOrgMemberDefaultEmailAliasLazyQuery>;
export type OrgMemberDefaultEmailAliasQueryResult = Apollo.useQuery.Result<OrgMemberDefaultEmailAliasQuery, OrgMemberDefaultEmailAliasQueryVariables>;
export const GetUserPreferencesDocument = /*#__PURE__*/ gql`
    query getUserPreferences {
  userPreferences {
    ...UserPreferencesData
  }
}
    ${UserPreferencesDataFragmentDoc}`;

/**
 * __useGetUserPreferencesQuery__
 *
 * To run a query within a React component, call `useGetUserPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPreferencesQuery(baseOptions?: Apollo.useQuery.Options<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>(GetUserPreferencesDocument, options);
      }
export function useGetUserPreferencesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>(GetUserPreferencesDocument, options);
        }
export type GetUserPreferencesQueryHookResult = ReturnType<typeof useGetUserPreferencesQuery>;
export type GetUserPreferencesLazyQueryHookResult = ReturnType<typeof useGetUserPreferencesLazyQuery>;
export type GetUserPreferencesQueryResult = Apollo.useQuery.Result<GetUserPreferencesQuery, GetUserPreferencesQueryVariables>;
export const CanDirectlyUpdateSrpDocument = /*#__PURE__*/ gql`
    query canDirectlyUpdateSrp {
  currentUser {
    userID
    canDirectlyUpdateSrp
  }
}
    `;

/**
 * __useCanDirectlyUpdateSrpQuery__
 *
 * To run a query within a React component, call `useCanDirectlyUpdateSrpQuery` and pass it any options that fit your needs.
 * When your component renders, `useCanDirectlyUpdateSrpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanDirectlyUpdateSrpQuery({
 *   variables: {
 *   },
 * });
 */
export function useCanDirectlyUpdateSrpQuery(baseOptions?: Apollo.useQuery.Options<CanDirectlyUpdateSrpQuery, CanDirectlyUpdateSrpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CanDirectlyUpdateSrpQuery, CanDirectlyUpdateSrpQueryVariables>(CanDirectlyUpdateSrpDocument, options);
      }
export function useCanDirectlyUpdateSrpLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<CanDirectlyUpdateSrpQuery, CanDirectlyUpdateSrpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CanDirectlyUpdateSrpQuery, CanDirectlyUpdateSrpQueryVariables>(CanDirectlyUpdateSrpDocument, options);
        }
export type CanDirectlyUpdateSrpQueryHookResult = ReturnType<typeof useCanDirectlyUpdateSrpQuery>;
export type CanDirectlyUpdateSrpLazyQueryHookResult = ReturnType<typeof useCanDirectlyUpdateSrpLazyQuery>;
export type CanDirectlyUpdateSrpQueryResult = Apollo.useQuery.Result<CanDirectlyUpdateSrpQuery, CanDirectlyUpdateSrpQueryVariables>;
export const BrowserPushNotificationsEnabledDocument = /*#__PURE__*/ gql`
    query browserPushNotificationsEnabled {
  browserPushNotificationsEnabled
}
    `;

/**
 * __useBrowserPushNotificationsEnabledQuery__
 *
 * To run a query within a React component, call `useBrowserPushNotificationsEnabledQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrowserPushNotificationsEnabledQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrowserPushNotificationsEnabledQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrowserPushNotificationsEnabledQuery(baseOptions?: Apollo.useQuery.Options<BrowserPushNotificationsEnabledQuery, BrowserPushNotificationsEnabledQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrowserPushNotificationsEnabledQuery, BrowserPushNotificationsEnabledQueryVariables>(BrowserPushNotificationsEnabledDocument, options);
      }
export function useBrowserPushNotificationsEnabledLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<BrowserPushNotificationsEnabledQuery, BrowserPushNotificationsEnabledQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrowserPushNotificationsEnabledQuery, BrowserPushNotificationsEnabledQueryVariables>(BrowserPushNotificationsEnabledDocument, options);
        }
export type BrowserPushNotificationsEnabledQueryHookResult = ReturnType<typeof useBrowserPushNotificationsEnabledQuery>;
export type BrowserPushNotificationsEnabledLazyQueryHookResult = ReturnType<typeof useBrowserPushNotificationsEnabledLazyQuery>;
export type BrowserPushNotificationsEnabledQueryResult = Apollo.useQuery.Result<BrowserPushNotificationsEnabledQuery, BrowserPushNotificationsEnabledQueryVariables>;
export const SpamListsDocument = /*#__PURE__*/ gql`
    query spamLists {
  blockedUsers
  spamUsers
  allowedUsers
}
    `;

/**
 * __useSpamListsQuery__
 *
 * To run a query within a React component, call `useSpamListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpamListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpamListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSpamListsQuery(baseOptions?: Apollo.useQuery.Options<SpamListsQuery, SpamListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SpamListsQuery, SpamListsQueryVariables>(SpamListsDocument, options);
      }
export function useSpamListsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<SpamListsQuery, SpamListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SpamListsQuery, SpamListsQueryVariables>(SpamListsDocument, options);
        }
export type SpamListsQueryHookResult = ReturnType<typeof useSpamListsQuery>;
export type SpamListsLazyQueryHookResult = ReturnType<typeof useSpamListsLazyQuery>;
export type SpamListsQueryResult = Apollo.useQuery.Result<SpamListsQuery, SpamListsQueryVariables>;
export const CurrentUserSubscribedToPdDocument = /*#__PURE__*/ gql`
    query currentUserSubscribedToPD {
  currentUser {
    userID
    subscribedToPD
  }
}
    `;

/**
 * __useCurrentUserSubscribedToPdQuery__
 *
 * To run a query within a React component, call `useCurrentUserSubscribedToPdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserSubscribedToPdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserSubscribedToPdQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserSubscribedToPdQuery(baseOptions?: Apollo.useQuery.Options<CurrentUserSubscribedToPdQuery, CurrentUserSubscribedToPdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserSubscribedToPdQuery, CurrentUserSubscribedToPdQueryVariables>(CurrentUserSubscribedToPdDocument, options);
      }
export function useCurrentUserSubscribedToPdLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<CurrentUserSubscribedToPdQuery, CurrentUserSubscribedToPdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserSubscribedToPdQuery, CurrentUserSubscribedToPdQueryVariables>(CurrentUserSubscribedToPdDocument, options);
        }
export type CurrentUserSubscribedToPdQueryHookResult = ReturnType<typeof useCurrentUserSubscribedToPdQuery>;
export type CurrentUserSubscribedToPdLazyQueryHookResult = ReturnType<typeof useCurrentUserSubscribedToPdLazyQuery>;
export type CurrentUserSubscribedToPdQueryResult = Apollo.useQuery.Result<CurrentUserSubscribedToPdQuery, CurrentUserSubscribedToPdQueryVariables>;
export const UsersFromEmailAliasDocument = /*#__PURE__*/ gql`
    query usersFromEmailAlias($emailAliases: [String!]!) {
  usersFromEmailAlias(emailAliases: $emailAliases) {
    userID
    username
    publicKey
    publicData {
      displayPictureData {
        profileAccentColor
        profileCustomURI
        profileIcon
      }
    }
  }
}
    `;

/**
 * __useUsersFromEmailAliasQuery__
 *
 * To run a query within a React component, call `useUsersFromEmailAliasQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersFromEmailAliasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersFromEmailAliasQuery({
 *   variables: {
 *      emailAliases: // value for 'emailAliases'
 *   },
 * });
 */
export function useUsersFromEmailAliasQuery(baseOptions: Apollo.useQuery.Options<UsersFromEmailAliasQuery, UsersFromEmailAliasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersFromEmailAliasQuery, UsersFromEmailAliasQueryVariables>(UsersFromEmailAliasDocument, options);
      }
export function useUsersFromEmailAliasLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<UsersFromEmailAliasQuery, UsersFromEmailAliasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersFromEmailAliasQuery, UsersFromEmailAliasQueryVariables>(UsersFromEmailAliasDocument, options);
        }
export type UsersFromEmailAliasQueryHookResult = ReturnType<typeof useUsersFromEmailAliasQuery>;
export type UsersFromEmailAliasLazyQueryHookResult = ReturnType<typeof useUsersFromEmailAliasLazyQuery>;
export type UsersFromEmailAliasQueryResult = Apollo.useQuery.Result<UsersFromEmailAliasQuery, UsersFromEmailAliasQueryVariables>;
export const UsersFromEmailAliasWithCatchallDocument = /*#__PURE__*/ gql`
    query usersFromEmailAliasWithCatchall($emailAliases: [String!]!) {
  usersFromEmailAliasWithCatchall(emailAliases: $emailAliases) {
    userID
    publicKey
  }
}
    `;

/**
 * __useUsersFromEmailAliasWithCatchallQuery__
 *
 * To run a query within a React component, call `useUsersFromEmailAliasWithCatchallQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersFromEmailAliasWithCatchallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersFromEmailAliasWithCatchallQuery({
 *   variables: {
 *      emailAliases: // value for 'emailAliases'
 *   },
 * });
 */
export function useUsersFromEmailAliasWithCatchallQuery(baseOptions: Apollo.useQuery.Options<UsersFromEmailAliasWithCatchallQuery, UsersFromEmailAliasWithCatchallQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersFromEmailAliasWithCatchallQuery, UsersFromEmailAliasWithCatchallQueryVariables>(UsersFromEmailAliasWithCatchallDocument, options);
      }
export function useUsersFromEmailAliasWithCatchallLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<UsersFromEmailAliasWithCatchallQuery, UsersFromEmailAliasWithCatchallQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersFromEmailAliasWithCatchallQuery, UsersFromEmailAliasWithCatchallQueryVariables>(UsersFromEmailAliasWithCatchallDocument, options);
        }
export type UsersFromEmailAliasWithCatchallQueryHookResult = ReturnType<typeof useUsersFromEmailAliasWithCatchallQuery>;
export type UsersFromEmailAliasWithCatchallLazyQueryHookResult = ReturnType<typeof useUsersFromEmailAliasWithCatchallLazyQuery>;
export type UsersFromEmailAliasWithCatchallQueryResult = Apollo.useQuery.Result<UsersFromEmailAliasWithCatchallQuery, UsersFromEmailAliasWithCatchallQueryVariables>;
export const GetUserProfileOrgDataDocument = /*#__PURE__*/ gql`
    query getUserProfileOrgData($request: GetUserRequest!) {
  user(request: $request) {
    ...UserProfileOrgData
  }
}
    ${UserProfileOrgDataFragmentDoc}`;

/**
 * __useGetUserProfileOrgDataQuery__
 *
 * To run a query within a React component, call `useGetUserProfileOrgDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileOrgDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileOrgDataQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserProfileOrgDataQuery(baseOptions: Apollo.useQuery.Options<GetUserProfileOrgDataQuery, GetUserProfileOrgDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileOrgDataQuery, GetUserProfileOrgDataQueryVariables>(GetUserProfileOrgDataDocument, options);
      }
export function useGetUserProfileOrgDataLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserProfileOrgDataQuery, GetUserProfileOrgDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileOrgDataQuery, GetUserProfileOrgDataQueryVariables>(GetUserProfileOrgDataDocument, options);
        }
export type GetUserProfileOrgDataQueryHookResult = ReturnType<typeof useGetUserProfileOrgDataQuery>;
export type GetUserProfileOrgDataLazyQueryHookResult = ReturnType<typeof useGetUserProfileOrgDataLazyQuery>;
export type GetUserProfileOrgDataQueryResult = Apollo.useQuery.Result<GetUserProfileOrgDataQuery, GetUserProfileOrgDataQueryVariables>;
export const GetCurrentUserEmailAliasesDocument = /*#__PURE__*/ gql`
    query getCurrentUserEmailAliases {
  currentUser {
    userID
    emailAliases
  }
}
    `;

/**
 * __useGetCurrentUserEmailAliasesQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserEmailAliasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserEmailAliasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserEmailAliasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserEmailAliasesQuery(baseOptions?: Apollo.useQuery.Options<GetCurrentUserEmailAliasesQuery, GetCurrentUserEmailAliasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserEmailAliasesQuery, GetCurrentUserEmailAliasesQueryVariables>(GetCurrentUserEmailAliasesDocument, options);
      }
export function useGetCurrentUserEmailAliasesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetCurrentUserEmailAliasesQuery, GetCurrentUserEmailAliasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserEmailAliasesQuery, GetCurrentUserEmailAliasesQueryVariables>(GetCurrentUserEmailAliasesDocument, options);
        }
export type GetCurrentUserEmailAliasesQueryHookResult = ReturnType<typeof useGetCurrentUserEmailAliasesQuery>;
export type GetCurrentUserEmailAliasesLazyQueryHookResult = ReturnType<typeof useGetCurrentUserEmailAliasesLazyQuery>;
export type GetCurrentUserEmailAliasesQueryResult = Apollo.useQuery.Result<GetCurrentUserEmailAliasesQuery, GetCurrentUserEmailAliasesQueryVariables>;
export const GetUserEmailAndWalletDocument = /*#__PURE__*/ gql`
    query getUserEmailAndWallet($request: GetUserRequest!) {
  user(request: $request) {
    userID
    recoveryEmail
    unverifiedRecoveryEmail
    walletAddress
    rootOrgID
  }
}
    `;

/**
 * __useGetUserEmailAndWalletQuery__
 *
 * To run a query within a React component, call `useGetUserEmailAndWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEmailAndWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEmailAndWalletQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserEmailAndWalletQuery(baseOptions: Apollo.useQuery.Options<GetUserEmailAndWalletQuery, GetUserEmailAndWalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEmailAndWalletQuery, GetUserEmailAndWalletQueryVariables>(GetUserEmailAndWalletDocument, options);
      }
export function useGetUserEmailAndWalletLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserEmailAndWalletQuery, GetUserEmailAndWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEmailAndWalletQuery, GetUserEmailAndWalletQueryVariables>(GetUserEmailAndWalletDocument, options);
        }
export type GetUserEmailAndWalletQueryHookResult = ReturnType<typeof useGetUserEmailAndWalletQuery>;
export type GetUserEmailAndWalletLazyQueryHookResult = ReturnType<typeof useGetUserEmailAndWalletLazyQuery>;
export type GetUserEmailAndWalletQueryResult = Apollo.useQuery.Result<GetUserEmailAndWalletQuery, GetUserEmailAndWalletQueryVariables>;
export const SubscribeNotificationDocument = /*#__PURE__*/ gql`
    mutation subscribeNotification($request: SubscribeNotificationRequest!) {
  subscribeNotification(request: $request)
}
    `;
export type SubscribeNotificationMutationFn = Apollo.useMutation.MutationFunction<SubscribeNotificationMutation, SubscribeNotificationMutationVariables>;

/**
 * __useSubscribeNotificationMutation__
 *
 * To run a mutation, you first call `useSubscribeNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeNotificationMutation, { data, loading, error }] = useSubscribeNotificationMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSubscribeNotificationMutation(baseOptions?: Apollo.useMutation.Options<SubscribeNotificationMutation, SubscribeNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeNotificationMutation, SubscribeNotificationMutationVariables>(SubscribeNotificationDocument, options);
      }
export type SubscribeNotificationMutationHookResult = ReturnType<typeof useSubscribeNotificationMutation>;
export type SubscribeNotificationMutationResult = Apollo.useMutation.Result<SubscribeNotificationMutation>;
export type SubscribeNotificationMutationOptions = Apollo.useMutation.Options<SubscribeNotificationMutation, SubscribeNotificationMutationVariables>;
export const UnsubscribeNotificationDocument = /*#__PURE__*/ gql`
    mutation unsubscribeNotification {
  unsubscribeNotification
}
    `;
export type UnsubscribeNotificationMutationFn = Apollo.useMutation.MutationFunction<UnsubscribeNotificationMutation, UnsubscribeNotificationMutationVariables>;

/**
 * __useUnsubscribeNotificationMutation__
 *
 * To run a mutation, you first call `useUnsubscribeNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeNotificationMutation, { data, loading, error }] = useUnsubscribeNotificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useUnsubscribeNotificationMutation(baseOptions?: Apollo.useMutation.Options<UnsubscribeNotificationMutation, UnsubscribeNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeNotificationMutation, UnsubscribeNotificationMutationVariables>(UnsubscribeNotificationDocument, options);
      }
export type UnsubscribeNotificationMutationHookResult = ReturnType<typeof useUnsubscribeNotificationMutation>;
export type UnsubscribeNotificationMutationResult = Apollo.useMutation.Result<UnsubscribeNotificationMutation>;
export type UnsubscribeNotificationMutationOptions = Apollo.useMutation.Options<UnsubscribeNotificationMutation, UnsubscribeNotificationMutationVariables>;
export const GetUserSignatureDocument = /*#__PURE__*/ gql`
    query getUserSignature {
  userSignature {
    userSignature {
      encryptedData
    }
    sessionKey {
      encryptedBy
      encryptedSessionKey
    }
  }
}
    `;

/**
 * __useGetUserSignatureQuery__
 *
 * To run a query within a React component, call `useGetUserSignatureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserSignatureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserSignatureQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserSignatureQuery(baseOptions?: Apollo.useQuery.Options<GetUserSignatureQuery, GetUserSignatureQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserSignatureQuery, GetUserSignatureQueryVariables>(GetUserSignatureDocument, options);
      }
export function useGetUserSignatureLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserSignatureQuery, GetUserSignatureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserSignatureQuery, GetUserSignatureQueryVariables>(GetUserSignatureDocument, options);
        }
export type GetUserSignatureQueryHookResult = ReturnType<typeof useGetUserSignatureQuery>;
export type GetUserSignatureLazyQueryHookResult = ReturnType<typeof useGetUserSignatureLazyQuery>;
export type GetUserSignatureQueryResult = Apollo.useQuery.Result<GetUserSignatureQuery, GetUserSignatureQueryVariables>;
export const GetUserCustomDomainSubscriptionsInfoDocument = /*#__PURE__*/ gql`
    query getUserCustomDomainSubscriptionsInfo($request: GetUserRequest!) {
  user(request: $request) {
    userID
    customDomainSubscriptionsInfo {
      domainID
      cancelAtPeriodEnd
      supposedEndDate
    }
  }
}
    `;

/**
 * __useGetUserCustomDomainSubscriptionsInfoQuery__
 *
 * To run a query within a React component, call `useGetUserCustomDomainSubscriptionsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCustomDomainSubscriptionsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCustomDomainSubscriptionsInfoQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetUserCustomDomainSubscriptionsInfoQuery(baseOptions: Apollo.useQuery.Options<GetUserCustomDomainSubscriptionsInfoQuery, GetUserCustomDomainSubscriptionsInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCustomDomainSubscriptionsInfoQuery, GetUserCustomDomainSubscriptionsInfoQueryVariables>(GetUserCustomDomainSubscriptionsInfoDocument, options);
      }
export function useGetUserCustomDomainSubscriptionsInfoLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserCustomDomainSubscriptionsInfoQuery, GetUserCustomDomainSubscriptionsInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCustomDomainSubscriptionsInfoQuery, GetUserCustomDomainSubscriptionsInfoQueryVariables>(GetUserCustomDomainSubscriptionsInfoDocument, options);
        }
export type GetUserCustomDomainSubscriptionsInfoQueryHookResult = ReturnType<typeof useGetUserCustomDomainSubscriptionsInfoQuery>;
export type GetUserCustomDomainSubscriptionsInfoLazyQueryHookResult = ReturnType<typeof useGetUserCustomDomainSubscriptionsInfoLazyQuery>;
export type GetUserCustomDomainSubscriptionsInfoQueryResult = Apollo.useQuery.Result<GetUserCustomDomainSubscriptionsInfoQuery, GetUserCustomDomainSubscriptionsInfoQueryVariables>;
export const GetUserPaidUpStatusDocument = /*#__PURE__*/ gql`
    query getUserPaidUpStatus {
  currentUser {
    userID
    paidUpStatus {
      paidUp
      downgradeProgress {
        currentStorageInMb
        customDomains
        emailAliases
        shortAliases
        workspaceUsers
        userLabels
        userFolders
        userMailFilters
        quickAliases
        quickAliasSubdomains
      }
    }
  }
}
    `;

/**
 * __useGetUserPaidUpStatusQuery__
 *
 * To run a query within a React component, call `useGetUserPaidUpStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPaidUpStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPaidUpStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPaidUpStatusQuery(baseOptions?: Apollo.useQuery.Options<GetUserPaidUpStatusQuery, GetUserPaidUpStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPaidUpStatusQuery, GetUserPaidUpStatusQueryVariables>(GetUserPaidUpStatusDocument, options);
      }
export function useGetUserPaidUpStatusLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserPaidUpStatusQuery, GetUserPaidUpStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPaidUpStatusQuery, GetUserPaidUpStatusQueryVariables>(GetUserPaidUpStatusDocument, options);
        }
export type GetUserPaidUpStatusQueryHookResult = ReturnType<typeof useGetUserPaidUpStatusQuery>;
export type GetUserPaidUpStatusLazyQueryHookResult = ReturnType<typeof useGetUserPaidUpStatusLazyQuery>;
export type GetUserPaidUpStatusQueryResult = Apollo.useQuery.Result<GetUserPaidUpStatusQuery, GetUserPaidUpStatusQueryVariables>;
export const CreateUploadContactAvatarLinkDocument = /*#__PURE__*/ gql`
    mutation createUploadContactAvatarLink($request: CreateUploadContactAvatarLinkRequest!) {
  createUploadContactAvatarLink(request: $request) {
    writeUrl
    profileCustomURI
  }
}
    `;
export type CreateUploadContactAvatarLinkMutationFn = Apollo.useMutation.MutationFunction<CreateUploadContactAvatarLinkMutation, CreateUploadContactAvatarLinkMutationVariables>;

/**
 * __useCreateUploadContactAvatarLinkMutation__
 *
 * To run a mutation, you first call `useCreateUploadContactAvatarLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadContactAvatarLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadContactAvatarLinkMutation, { data, loading, error }] = useCreateUploadContactAvatarLinkMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateUploadContactAvatarLinkMutation(baseOptions?: Apollo.useMutation.Options<CreateUploadContactAvatarLinkMutation, CreateUploadContactAvatarLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUploadContactAvatarLinkMutation, CreateUploadContactAvatarLinkMutationVariables>(CreateUploadContactAvatarLinkDocument, options);
      }
export type CreateUploadContactAvatarLinkMutationHookResult = ReturnType<typeof useCreateUploadContactAvatarLinkMutation>;
export type CreateUploadContactAvatarLinkMutationResult = Apollo.useMutation.Result<CreateUploadContactAvatarLinkMutation>;
export type CreateUploadContactAvatarLinkMutationOptions = Apollo.useMutation.Options<CreateUploadContactAvatarLinkMutation, CreateUploadContactAvatarLinkMutationVariables>;
export const CreateUploadAliasAvatarLinkDocument = /*#__PURE__*/ gql`
    mutation createUploadAliasAvatarLink($emailAlias: String!) {
  createUploadAliasAvatarLink(emailAlias: $emailAlias) {
    writeUrl
    profileCustomURI
  }
}
    `;
export type CreateUploadAliasAvatarLinkMutationFn = Apollo.useMutation.MutationFunction<CreateUploadAliasAvatarLinkMutation, CreateUploadAliasAvatarLinkMutationVariables>;

/**
 * __useCreateUploadAliasAvatarLinkMutation__
 *
 * To run a mutation, you first call `useCreateUploadAliasAvatarLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadAliasAvatarLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadAliasAvatarLinkMutation, { data, loading, error }] = useCreateUploadAliasAvatarLinkMutation({
 *   variables: {
 *      emailAlias: // value for 'emailAlias'
 *   },
 * });
 */
export function useCreateUploadAliasAvatarLinkMutation(baseOptions?: Apollo.useMutation.Options<CreateUploadAliasAvatarLinkMutation, CreateUploadAliasAvatarLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUploadAliasAvatarLinkMutation, CreateUploadAliasAvatarLinkMutationVariables>(CreateUploadAliasAvatarLinkDocument, options);
      }
export type CreateUploadAliasAvatarLinkMutationHookResult = ReturnType<typeof useCreateUploadAliasAvatarLinkMutation>;
export type CreateUploadAliasAvatarLinkMutationResult = Apollo.useMutation.Result<CreateUploadAliasAvatarLinkMutation>;
export type CreateUploadAliasAvatarLinkMutationOptions = Apollo.useMutation.Options<CreateUploadAliasAvatarLinkMutation, CreateUploadAliasAvatarLinkMutationVariables>;
export const UpdateUploadContactAvatarLinkDocument = /*#__PURE__*/ gql`
    mutation updateUploadContactAvatarLink($request: UpdateUploadContactAvatarLinkRequest!) {
  updateUploadContactAvatarLink(request: $request) {
    newProfileCustomURI
  }
}
    `;
export type UpdateUploadContactAvatarLinkMutationFn = Apollo.useMutation.MutationFunction<UpdateUploadContactAvatarLinkMutation, UpdateUploadContactAvatarLinkMutationVariables>;

/**
 * __useUpdateUploadContactAvatarLinkMutation__
 *
 * To run a mutation, you first call `useUpdateUploadContactAvatarLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUploadContactAvatarLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUploadContactAvatarLinkMutation, { data, loading, error }] = useUpdateUploadContactAvatarLinkMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateUploadContactAvatarLinkMutation(baseOptions?: Apollo.useMutation.Options<UpdateUploadContactAvatarLinkMutation, UpdateUploadContactAvatarLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUploadContactAvatarLinkMutation, UpdateUploadContactAvatarLinkMutationVariables>(UpdateUploadContactAvatarLinkDocument, options);
      }
export type UpdateUploadContactAvatarLinkMutationHookResult = ReturnType<typeof useUpdateUploadContactAvatarLinkMutation>;
export type UpdateUploadContactAvatarLinkMutationResult = Apollo.useMutation.Result<UpdateUploadContactAvatarLinkMutation>;
export type UpdateUploadContactAvatarLinkMutationOptions = Apollo.useMutation.Options<UpdateUploadContactAvatarLinkMutation, UpdateUploadContactAvatarLinkMutationVariables>;
export const CreateOrgUploadAvatarLinkDocument = /*#__PURE__*/ gql`
    mutation createOrgUploadAvatarLink {
  createOrgUploadAvatarLink {
    writeUrl
    profileCustomURI
  }
}
    `;
export type CreateOrgUploadAvatarLinkMutationFn = Apollo.useMutation.MutationFunction<CreateOrgUploadAvatarLinkMutation, CreateOrgUploadAvatarLinkMutationVariables>;

/**
 * __useCreateOrgUploadAvatarLinkMutation__
 *
 * To run a mutation, you first call `useCreateOrgUploadAvatarLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrgUploadAvatarLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrgUploadAvatarLinkMutation, { data, loading, error }] = useCreateOrgUploadAvatarLinkMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateOrgUploadAvatarLinkMutation(baseOptions?: Apollo.useMutation.Options<CreateOrgUploadAvatarLinkMutation, CreateOrgUploadAvatarLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrgUploadAvatarLinkMutation, CreateOrgUploadAvatarLinkMutationVariables>(CreateOrgUploadAvatarLinkDocument, options);
      }
export type CreateOrgUploadAvatarLinkMutationHookResult = ReturnType<typeof useCreateOrgUploadAvatarLinkMutation>;
export type CreateOrgUploadAvatarLinkMutationResult = Apollo.useMutation.Result<CreateOrgUploadAvatarLinkMutation>;
export type CreateOrgUploadAvatarLinkMutationOptions = Apollo.useMutation.Options<CreateOrgUploadAvatarLinkMutation, CreateOrgUploadAvatarLinkMutationVariables>;
export const SetUserSignatureDocument = /*#__PURE__*/ gql`
    mutation setUserSignature($request: SetUserSignatureRequest!) {
  setUserSignature(request: $request)
}
    `;
export type SetUserSignatureMutationFn = Apollo.useMutation.MutationFunction<SetUserSignatureMutation, SetUserSignatureMutationVariables>;

/**
 * __useSetUserSignatureMutation__
 *
 * To run a mutation, you first call `useSetUserSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserSignatureMutation, { data, loading, error }] = useSetUserSignatureMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetUserSignatureMutation(baseOptions?: Apollo.useMutation.Options<SetUserSignatureMutation, SetUserSignatureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserSignatureMutation, SetUserSignatureMutationVariables>(SetUserSignatureDocument, options);
      }
export type SetUserSignatureMutationHookResult = ReturnType<typeof useSetUserSignatureMutation>;
export type SetUserSignatureMutationResult = Apollo.useMutation.Result<SetUserSignatureMutation>;
export type SetUserSignatureMutationOptions = Apollo.useMutation.Options<SetUserSignatureMutation, SetUserSignatureMutationVariables>;
export const DeleteUserSignatureDocument = /*#__PURE__*/ gql`
    mutation deleteUserSignature {
  deleteUserSignature
}
    `;
export type DeleteUserSignatureMutationFn = Apollo.useMutation.MutationFunction<DeleteUserSignatureMutation, DeleteUserSignatureMutationVariables>;

/**
 * __useDeleteUserSignatureMutation__
 *
 * To run a mutation, you first call `useDeleteUserSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserSignatureMutation, { data, loading, error }] = useDeleteUserSignatureMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserSignatureMutation(baseOptions?: Apollo.useMutation.Options<DeleteUserSignatureMutation, DeleteUserSignatureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserSignatureMutation, DeleteUserSignatureMutationVariables>(DeleteUserSignatureDocument, options);
      }
export type DeleteUserSignatureMutationHookResult = ReturnType<typeof useDeleteUserSignatureMutation>;
export type DeleteUserSignatureMutationResult = Apollo.useMutation.Result<DeleteUserSignatureMutation>;
export type DeleteUserSignatureMutationOptions = Apollo.useMutation.Options<DeleteUserSignatureMutation, DeleteUserSignatureMutationVariables>;
export const GetAutoReplyDocument = /*#__PURE__*/ gql`
    query getAutoReply {
  autoReply {
    encryptedSubject {
      encryptedData
    }
    encryptedText {
      encryptedData
    }
    encryptedHtml {
      encryptedData
    }
    encryptedTextAsHtml {
      encryptedData
    }
    encryptedSessionKey {
      encryptedBy
      encryptedSessionKey
    }
  }
}
    `;

/**
 * __useGetAutoReplyQuery__
 *
 * To run a query within a React component, call `useGetAutoReplyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAutoReplyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAutoReplyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAutoReplyQuery(baseOptions?: Apollo.useQuery.Options<GetAutoReplyQuery, GetAutoReplyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAutoReplyQuery, GetAutoReplyQueryVariables>(GetAutoReplyDocument, options);
      }
export function useGetAutoReplyLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetAutoReplyQuery, GetAutoReplyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAutoReplyQuery, GetAutoReplyQueryVariables>(GetAutoReplyDocument, options);
        }
export type GetAutoReplyQueryHookResult = ReturnType<typeof useGetAutoReplyQuery>;
export type GetAutoReplyLazyQueryHookResult = ReturnType<typeof useGetAutoReplyLazyQuery>;
export type GetAutoReplyQueryResult = Apollo.useQuery.Result<GetAutoReplyQuery, GetAutoReplyQueryVariables>;
export const SetAutoReplyDocument = /*#__PURE__*/ gql`
    mutation setAutoReply($request: SetAutoReplyRequest!) {
  setAutoReply(request: $request)
}
    `;
export type SetAutoReplyMutationFn = Apollo.useMutation.MutationFunction<SetAutoReplyMutation, SetAutoReplyMutationVariables>;

/**
 * __useSetAutoReplyMutation__
 *
 * To run a mutation, you first call `useSetAutoReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAutoReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAutoReplyMutation, { data, loading, error }] = useSetAutoReplyMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetAutoReplyMutation(baseOptions?: Apollo.useMutation.Options<SetAutoReplyMutation, SetAutoReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAutoReplyMutation, SetAutoReplyMutationVariables>(SetAutoReplyDocument, options);
      }
export type SetAutoReplyMutationHookResult = ReturnType<typeof useSetAutoReplyMutation>;
export type SetAutoReplyMutationResult = Apollo.useMutation.Result<SetAutoReplyMutation>;
export type SetAutoReplyMutationOptions = Apollo.useMutation.Options<SetAutoReplyMutation, SetAutoReplyMutationVariables>;
export const DeleteAutoReplyDocument = /*#__PURE__*/ gql`
    mutation deleteAutoReply {
  deleteAutoReply
}
    `;
export type DeleteAutoReplyMutationFn = Apollo.useMutation.MutationFunction<DeleteAutoReplyMutation, DeleteAutoReplyMutationVariables>;

/**
 * __useDeleteAutoReplyMutation__
 *
 * To run a mutation, you first call `useDeleteAutoReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAutoReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAutoReplyMutation, { data, loading, error }] = useDeleteAutoReplyMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAutoReplyMutation(baseOptions?: Apollo.useMutation.Options<DeleteAutoReplyMutation, DeleteAutoReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAutoReplyMutation, DeleteAutoReplyMutationVariables>(DeleteAutoReplyDocument, options);
      }
export type DeleteAutoReplyMutationHookResult = ReturnType<typeof useDeleteAutoReplyMutation>;
export type DeleteAutoReplyMutationResult = Apollo.useMutation.Result<DeleteAutoReplyMutation>;
export type DeleteAutoReplyMutationOptions = Apollo.useMutation.Options<DeleteAutoReplyMutation, DeleteAutoReplyMutationVariables>;
export const AddExternalEmailDocument = /*#__PURE__*/ gql`
    mutation addExternalEmail($request: AddEmailRequest!) {
  addEmail(request: $request) {
    status
  }
}
    `;
export type AddExternalEmailMutationFn = Apollo.useMutation.MutationFunction<AddExternalEmailMutation, AddExternalEmailMutationVariables>;

/**
 * __useAddExternalEmailMutation__
 *
 * To run a mutation, you first call `useAddExternalEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExternalEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExternalEmailMutation, { data, loading, error }] = useAddExternalEmailMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddExternalEmailMutation(baseOptions?: Apollo.useMutation.Options<AddExternalEmailMutation, AddExternalEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExternalEmailMutation, AddExternalEmailMutationVariables>(AddExternalEmailDocument, options);
      }
export type AddExternalEmailMutationHookResult = ReturnType<typeof useAddExternalEmailMutation>;
export type AddExternalEmailMutationResult = Apollo.useMutation.Result<AddExternalEmailMutation>;
export type AddExternalEmailMutationOptions = Apollo.useMutation.Options<AddExternalEmailMutation, AddExternalEmailMutationVariables>;
export const SetUserPreferencesDocument = /*#__PURE__*/ gql`
    mutation setUserPreferences($request: SetUserPreferencesRequest!) {
  setUserPreferences(request: $request) {
    ...UserPreferencesData
  }
}
    ${UserPreferencesDataFragmentDoc}`;
export type SetUserPreferencesMutationFn = Apollo.useMutation.MutationFunction<SetUserPreferencesMutation, SetUserPreferencesMutationVariables>;

/**
 * __useSetUserPreferencesMutation__
 *
 * To run a mutation, you first call `useSetUserPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserPreferencesMutation, { data, loading, error }] = useSetUserPreferencesMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetUserPreferencesMutation(baseOptions?: Apollo.useMutation.Options<SetUserPreferencesMutation, SetUserPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserPreferencesMutation, SetUserPreferencesMutationVariables>(SetUserPreferencesDocument, options);
      }
export type SetUserPreferencesMutationHookResult = ReturnType<typeof useSetUserPreferencesMutation>;
export type SetUserPreferencesMutationResult = Apollo.useMutation.Result<SetUserPreferencesMutation>;
export type SetUserPreferencesMutationOptions = Apollo.useMutation.Options<SetUserPreferencesMutation, SetUserPreferencesMutationVariables>;
export const SetContactAutosyncSettingDocument = /*#__PURE__*/ gql`
    mutation setContactAutosyncSetting($request: Boolean!) {
  setAutoSyncContactsSetting(value: $request)
}
    `;
export type SetContactAutosyncSettingMutationFn = Apollo.useMutation.MutationFunction<SetContactAutosyncSettingMutation, SetContactAutosyncSettingMutationVariables>;

/**
 * __useSetContactAutosyncSettingMutation__
 *
 * To run a mutation, you first call `useSetContactAutosyncSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetContactAutosyncSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setContactAutosyncSettingMutation, { data, loading, error }] = useSetContactAutosyncSettingMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useSetContactAutosyncSettingMutation(baseOptions?: Apollo.useMutation.Options<SetContactAutosyncSettingMutation, SetContactAutosyncSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetContactAutosyncSettingMutation, SetContactAutosyncSettingMutationVariables>(SetContactAutosyncSettingDocument, options);
      }
export type SetContactAutosyncSettingMutationHookResult = ReturnType<typeof useSetContactAutosyncSettingMutation>;
export type SetContactAutosyncSettingMutationResult = Apollo.useMutation.Result<SetContactAutosyncSettingMutation>;
export type SetContactAutosyncSettingMutationOptions = Apollo.useMutation.Options<SetContactAutosyncSettingMutation, SetContactAutosyncSettingMutationVariables>;
export const GetContactAutoSyncSettingsDocument = /*#__PURE__*/ gql`
    query getContactAutoSyncSettings {
  currentUser {
    userID
    autoSyncContactsSetting
  }
}
    `;

/**
 * __useGetContactAutoSyncSettingsQuery__
 *
 * To run a query within a React component, call `useGetContactAutoSyncSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactAutoSyncSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactAutoSyncSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContactAutoSyncSettingsQuery(baseOptions?: Apollo.useQuery.Options<GetContactAutoSyncSettingsQuery, GetContactAutoSyncSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactAutoSyncSettingsQuery, GetContactAutoSyncSettingsQueryVariables>(GetContactAutoSyncSettingsDocument, options);
      }
export function useGetContactAutoSyncSettingsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetContactAutoSyncSettingsQuery, GetContactAutoSyncSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactAutoSyncSettingsQuery, GetContactAutoSyncSettingsQueryVariables>(GetContactAutoSyncSettingsDocument, options);
        }
export type GetContactAutoSyncSettingsQueryHookResult = ReturnType<typeof useGetContactAutoSyncSettingsQuery>;
export type GetContactAutoSyncSettingsLazyQueryHookResult = ReturnType<typeof useGetContactAutoSyncSettingsLazyQuery>;
export type GetContactAutoSyncSettingsQueryResult = Apollo.useQuery.Result<GetContactAutoSyncSettingsQuery, GetContactAutoSyncSettingsQueryVariables>;
export const GetUserQuickAliasDomainsDocument = /*#__PURE__*/ gql`
    query getUserQuickAliasDomains {
  currentUser {
    userID
    anonymousSubdomains {
      domain
      domainID
    }
  }
}
    `;

/**
 * __useGetUserQuickAliasDomainsQuery__
 *
 * To run a query within a React component, call `useGetUserQuickAliasDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuickAliasDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuickAliasDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuickAliasDomainsQuery(baseOptions?: Apollo.useQuery.Options<GetUserQuickAliasDomainsQuery, GetUserQuickAliasDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuickAliasDomainsQuery, GetUserQuickAliasDomainsQueryVariables>(GetUserQuickAliasDomainsDocument, options);
      }
export function useGetUserQuickAliasDomainsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserQuickAliasDomainsQuery, GetUserQuickAliasDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuickAliasDomainsQuery, GetUserQuickAliasDomainsQueryVariables>(GetUserQuickAliasDomainsDocument, options);
        }
export type GetUserQuickAliasDomainsQueryHookResult = ReturnType<typeof useGetUserQuickAliasDomainsQuery>;
export type GetUserQuickAliasDomainsLazyQueryHookResult = ReturnType<typeof useGetUserQuickAliasDomainsLazyQuery>;
export type GetUserQuickAliasDomainsQueryResult = Apollo.useQuery.Result<GetUserQuickAliasDomainsQuery, GetUserQuickAliasDomainsQueryVariables>;
export const GetNumUserDeactivatedQuickAliasDomainsDocument = /*#__PURE__*/ gql`
    query getNumUserDeactivatedQuickAliasDomains {
  currentUser {
    userID
    numDeactivatedAnonymousSubdomains
  }
}
    `;

/**
 * __useGetNumUserDeactivatedQuickAliasDomainsQuery__
 *
 * To run a query within a React component, call `useGetNumUserDeactivatedQuickAliasDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumUserDeactivatedQuickAliasDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumUserDeactivatedQuickAliasDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNumUserDeactivatedQuickAliasDomainsQuery(baseOptions?: Apollo.useQuery.Options<GetNumUserDeactivatedQuickAliasDomainsQuery, GetNumUserDeactivatedQuickAliasDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumUserDeactivatedQuickAliasDomainsQuery, GetNumUserDeactivatedQuickAliasDomainsQueryVariables>(GetNumUserDeactivatedQuickAliasDomainsDocument, options);
      }
export function useGetNumUserDeactivatedQuickAliasDomainsLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetNumUserDeactivatedQuickAliasDomainsQuery, GetNumUserDeactivatedQuickAliasDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumUserDeactivatedQuickAliasDomainsQuery, GetNumUserDeactivatedQuickAliasDomainsQueryVariables>(GetNumUserDeactivatedQuickAliasDomainsDocument, options);
        }
export type GetNumUserDeactivatedQuickAliasDomainsQueryHookResult = ReturnType<typeof useGetNumUserDeactivatedQuickAliasDomainsQuery>;
export type GetNumUserDeactivatedQuickAliasDomainsLazyQueryHookResult = ReturnType<typeof useGetNumUserDeactivatedQuickAliasDomainsLazyQuery>;
export type GetNumUserDeactivatedQuickAliasDomainsQueryResult = Apollo.useQuery.Result<GetNumUserDeactivatedQuickAliasDomainsQuery, GetNumUserDeactivatedQuickAliasDomainsQueryVariables>;
export const GetUserQuickAliasesDocument = /*#__PURE__*/ gql`
    query getUserQuickAliases {
  currentUser {
    userID
    quickAliases {
      alias
      isSendingAndReceivingEnabled
    }
  }
}
    `;

/**
 * __useGetUserQuickAliasesQuery__
 *
 * To run a query within a React component, call `useGetUserQuickAliasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuickAliasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuickAliasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuickAliasesQuery(baseOptions?: Apollo.useQuery.Options<GetUserQuickAliasesQuery, GetUserQuickAliasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuickAliasesQuery, GetUserQuickAliasesQueryVariables>(GetUserQuickAliasesDocument, options);
      }
export function useGetUserQuickAliasesLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetUserQuickAliasesQuery, GetUserQuickAliasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuickAliasesQuery, GetUserQuickAliasesQueryVariables>(GetUserQuickAliasesDocument, options);
        }
export type GetUserQuickAliasesQueryHookResult = ReturnType<typeof useGetUserQuickAliasesQuery>;
export type GetUserQuickAliasesLazyQueryHookResult = ReturnType<typeof useGetUserQuickAliasesLazyQuery>;
export type GetUserQuickAliasesQueryResult = Apollo.useQuery.Result<GetUserQuickAliasesQuery, GetUserQuickAliasesQueryVariables>;
export const GetCurrentUserAllOrgDataDocument = /*#__PURE__*/ gql`
    query getCurrentUserAllOrgData {
  currentUser {
    userID
    userID
    username
    rootOrganization {
      ...OrganizationFullInfo
    }
  }
}
    ${OrganizationFullInfoFragmentDoc}`;

/**
 * __useGetCurrentUserAllOrgDataQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserAllOrgDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserAllOrgDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserAllOrgDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserAllOrgDataQuery(baseOptions?: Apollo.useQuery.Options<GetCurrentUserAllOrgDataQuery, GetCurrentUserAllOrgDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserAllOrgDataQuery, GetCurrentUserAllOrgDataQueryVariables>(GetCurrentUserAllOrgDataDocument, options);
      }
export function useGetCurrentUserAllOrgDataLazyQuery(baseOptions?: Apollo.useLazyQuery.Options<GetCurrentUserAllOrgDataQuery, GetCurrentUserAllOrgDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserAllOrgDataQuery, GetCurrentUserAllOrgDataQueryVariables>(GetCurrentUserAllOrgDataDocument, options);
        }
export type GetCurrentUserAllOrgDataQueryHookResult = ReturnType<typeof useGetCurrentUserAllOrgDataQuery>;
export type GetCurrentUserAllOrgDataLazyQueryHookResult = ReturnType<typeof useGetCurrentUserAllOrgDataLazyQuery>;
export type GetCurrentUserAllOrgDataQueryResult = Apollo.useQuery.Result<GetCurrentUserAllOrgDataQuery, GetCurrentUserAllOrgDataQueryVariables>;