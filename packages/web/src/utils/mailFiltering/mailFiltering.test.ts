import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { EmailFragment } from 'skiff-front-graphql';
import * as skiffFrontUtils from 'skiff-front-utils';
import { ActionType, FilterField, FilterType, MailFilter, SystemLabels } from 'skiff-graphql';
import { v4 } from 'uuid';

import { MOCK_EMAIL } from '../../../tests/mocks/mockEmail';
import { MOCK_THREAD } from '../../../tests/mocks/mockThread';
import { ThreadDetailInfo } from '../../models/thread';

import { runClientSideMailFilters } from './mailFiltering';
import * as mailFilteringUtils from './mailFiltering.utils';

const PRIVATE_KEY = 'privateKey';

// MOCKS
vi.mock('skiff-front-utils', () => ({
  __esModule: true,
  requireCurrentUserData: () => ({
    userID: 'id',
    username: '1@skiff.com',
    privateUserData: {
      privateKey: PRIVATE_KEY
    }
  }),
  aggregateMailFilterActionsForThreads: vi.fn()
}));

vi.mock('./mailFiltering.utils', () => ({
  fetchUnfilteredThreads: vi.fn(),
  fetchClientsideFilters: vi.fn(),
  applyLabelsToThreads: vi.fn(),
  applySystemLabelsToThreads: vi.fn(),
  markThreadsAsRead: vi.fn(),
  markThreadsAsClientsideFiltered: vi.fn(),
  decryptEmailTextAndSubject: vi.fn()
}));

vi.mock('../mailboxUtils', () => ({
  updateThreadAsReadUnread: vi.fn()
}));

describe('runClientSideMailFilters', () => {
  const decryptedSubjectOfEmailMatchingSubjectFilter = 'test subject';
  const labelIDToApply = v4();
  const systemLabelToMoveTo = SystemLabels.Trash;
  const clientSideFilters: MailFilter[] = [
    {
      mailFilterID: v4(),
      filter: {
        filterType: FilterType.Subject,
        serializedData: 'encryptedSubject',
        filterField: FilterField.Contains
      },
      clientside: true,
      actions: [
        { actionType: ActionType.ApplyLabel, serializedData: labelIDToApply },
        { actionType: ActionType.ApplySystemLabel, serializedData: systemLabelToMoveTo },
        { actionType: ActionType.MarkAsRead }
      ],
      encryptedByKey: 'encryptedByKey',
      encryptedSessionKey: 'encryptedSessionKey'
    }
  ];

  const threadMatchingFilterID = v4();
  const emailMatchingFilter: EmailFragment = {
    ...MOCK_EMAIL,
    decryptedSubject: decryptedSubjectOfEmailMatchingSubjectFilter,
    to: [{ address: 'to@skiff.com' }],
    cc: [],
    bcc: [],
    from: { address: 'from@skiff.com' }
  };

  const threadsToApplyFilterTo: ThreadDetailInfo[] = [
    { ...MOCK_THREAD, emails: [emailMatchingFilter], threadID: threadMatchingFilterID }
  ];

  beforeEach(() => {
    (mailFilteringUtils.fetchUnfilteredThreads as Mock).mockResolvedValue({
      pageInfo: { hasNextPage: false, cursor: undefined },
      threads: threadsToApplyFilterTo
    });
    (mailFilteringUtils.fetchClientsideFilters as Mock).mockResolvedValue(clientSideFilters);
    (mailFilteringUtils.markThreadsAsRead as Mock).mockResolvedValue([]);
    (mailFilteringUtils.applyLabelsToThreads as Mock).mockResolvedValue([]);
    (mailFilteringUtils.decryptEmailTextAndSubject as Mock).mockReturnValue({
      text: 'test body',
      subject: decryptedSubjectOfEmailMatchingSubjectFilter
    });
  });

  afterEach(() => {
    // reset all mocks
    // (skiffCrypto.decryptDatagramV2 as Mock).mockClear();
    (mailFilteringUtils.fetchUnfilteredThreads as Mock).mockClear();
    (mailFilteringUtils.fetchClientsideFilters as Mock).mockClear();
    (mailFilteringUtils.markThreadsAsRead as Mock).mockClear();
    (mailFilteringUtils.applyLabelsToThreads as Mock).mockClear();
    (mailFilteringUtils.markThreadsAsClientsideFiltered as Mock).mockClear();
    (mailFilteringUtils.decryptEmailTextAndSubject as Mock).mockClear();
  });

  it('applies filters to threads that match the conditions', async () => {
    const expectedLabelToThreadIDs = {
      [labelIDToApply]: [threadMatchingFilterID]
    };
    const expectedSystemLabelToThreadIDs = {
      [systemLabelToMoveTo]: [threadMatchingFilterID]
    };

    (skiffFrontUtils.aggregateMailFilterActionsForThreads as Mock).mockReturnValue({
      userLabelToThreadIDs: expectedLabelToThreadIDs,
      systemLabelToThreadIDs: expectedSystemLabelToThreadIDs,
      threadsToMarkAsRead: [threadMatchingFilterID]
    });

    await runClientSideMailFilters();

    // Expect labels to be applied + thread to be marked as read
    expect(mailFilteringUtils.markThreadsAsRead).toHaveBeenCalledWith([threadMatchingFilterID]);
    expect(mailFilteringUtils.applyLabelsToThreads).toHaveBeenCalledWith(
      expectedLabelToThreadIDs,
      expectedSystemLabelToThreadIDs
    );
    // Assert that we call the mutation to update the thread to clientsideFilterApplied = true
    expect(mailFilteringUtils.markThreadsAsClientsideFiltered).toHaveBeenCalledWith([threadMatchingFilterID]);
  });

  it('does not mark threads with actions that failed to apply as successfully filtered', async () => {
    (mailFilteringUtils.applyLabelsToThreads as Mock).mockResolvedValue([threadMatchingFilterID]);

    await runClientSideMailFilters();

    // Assert that we do not call the mutation to update the thread to clientsideFilterApplied = true
    expect(mailFilteringUtils.markThreadsAsClientsideFiltered).not.toBeCalled();
  });

  it('paginates through all threads that have not yet run through the filters', async () => {
    (mailFilteringUtils.fetchUnfilteredThreads as Mock)
      // first call to get threads returns with next page as true
      .mockResolvedValueOnce({
        pageInfo: {
          hasNextPage: true,
          cursor: { threadID: v4(), date: new Date() }
        },
        threads: threadsToApplyFilterTo
      })
      // second call to get threads returns with next page as false, so we stop paginating
      .mockResolvedValueOnce({
        pageInfo: {
          hasNextPage: false,
          cursor: null
        },
        threads: []
      });

    await runClientSideMailFilters();

    expect(mailFilteringUtils.fetchUnfilteredThreads).toHaveBeenCalledTimes(2);
  });
});
