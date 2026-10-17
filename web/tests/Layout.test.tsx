import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import {
  CreateOrUpdateDraftDocument,
  EMPTY_DOCUMENT_DATA,
  GetAllDraftsDocument,
  GetCreditsDocument,
  GetCurrentUserEmailAliasesDocument,
  GetLastViewedReferralCreditDocument,
  MailboxDocument,
  UserLabelsDocument,
  models
} from 'skiff-front-graphql';
import { removeCurrentUserData, saveCurrentUserData } from 'skiff-front-utils';
import { SystemLabels } from 'skiff-graphql';

import { ComposeDataTest } from '../src/components/Compose/Compose';
import { ComposeHeaderDataTest } from '../src/components/Compose/ComposeHeader';
import { Layout } from '../src/components/layout/Layout';
import { SidebarDataTest } from '../src/components/layout/MailSidebar';
import { DEFAULT_MAILBOX_LIMIT } from '../src/constants/mailbox.constants';
import * as useCurrentLabel from '../src/hooks/useCurrentLabel';
import SystemLabelMailbox from '../src/pages/SystemLabelMailbox';
import store from '../src/redux/store/reduxStore';

vi.mock('email-regex', () => ({ default: vi.fn() }));

vi.mock('idb-keyval', () => ({
  get: vi.fn(),
  set: vi.fn(),
  del: vi.fn()
}));
vi.mock('react-virtualized-auto-sizer', () => ({
  default: ({ children }: any) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    children({ height: 600, width: 600 })
}));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock('../src/utils/draftUtils', async () => ({
  ...(await vi.importActual('../src/utils/draftUtils')),
  getUserDrafts: vi.fn().mockResolvedValue([]),
  getDraftSaveData: vi.fn().mockResolvedValue({})
}));
vi.mock('../src/hooks/useSearchWorker', () => ({
  getSearchWorker: vi.fn(),
  useInitializeSearchWorker: vi.fn()
}));

vi.mock('../src/hooks/useGetSearchIndexProgressDate', () => ({ default: vi.fn() }));

vi.mock('../src/hooks/useFetchCurrentUser', () => ({
  default: () => ({ isLoggedIn: true, isCachedLoginSuccessful: true, isCachedLoginDone: true })
}));

vi.mock('../src/hooks/useRealtimeSync', () => ({ useRealtimeSync: vi.fn() }));

vi.mock('../src/utils/mailFiltering/mailFiltering', () => ({
  runClientSideMailFilters: vi.fn()
}));

vi.mock('skiff-front-utils', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const original = await vi.importActual('skiff-front-utils');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...original,
    useToast: () => ({ enqueueToast: vi.fn(), closeToast: vi.fn() }),
    useCheckoutResultToast: vi.fn(),
    useCurrentUserEmailAliases: () => ({ emailAliases: ['1@skiff.town'], walletAliasesWithName: [], quickAliases: [] }),
    useRequiredCurrentUserData: () => ({
      userID: 'id',
      username: '1@skiff.com',
      privateUserData: {
        privateKey: 'privateKey'
      }
    }),
    useSyncSavedAccount: () => {},
    useCurrentUserData: () => ({
      userID: 'id',
      username: '1@skiff.com',
      privateUserData: {
        privateKey: 'privateKey'
      }
    }),
    useContactsSettings: () => []
  };
});

vi.mock('skiff-front-graphql', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const original = await vi.importActual('skiff-front-graphql');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...original,
    useUserProfile: () => ({
      publicData: {
        displayName: 'one'
      }
    })
  };
});
vi.mock('../src/hooks/useThreadActions', () => ({
  useThreadActions: () => ({
    trashThreads: vi.fn(),
    setActiveThreadID: vi.fn()
  })
}));

vi.mock('../src/svgs/empty-inbox.svg', () => ({ default: vi.fn().mockReturnValue(null) }));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock('../src/utils/userUtils', async () => ({
  ...(await vi.importActual('../src/utils/userUtils')),
  storeWorkspaceEvent: vi.fn()
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  useLocation: () => ({ pathname: '/mail/inbox' })
}));

const getMailboxQueryMock: MockedResponse = {
  request: {
    query: MailboxDocument,
    variables: {
      request: {
        label: SystemLabels.Drafts,
        cursor: null,
        limit: DEFAULT_MAILBOX_LIMIT,
        polling: true,
        filters: {},
        platformInfo: {
          // for some reason, isMobile and isIos are expected as ''
          isMobile: '',
          isIos: '',
          isAndroid: false,
          isMacOs: false,
          isReactNative: false,
          isSkiffWindowsDesktop: false
        },
        isAliasInbox: false,
        clientsideFiltersApplied: true
      }
    }
  },
  result: {
    data: {
      mailbox: {
        threads: [],
        pageInfo: {
          cursor: null,
          hasNextPage: false
        }
      }
    }
  }
};

const getCurrentUserEmailAliasesQueryMock: MockedResponse = {
  request: {
    query: GetCurrentUserEmailAliasesDocument,
    variables: {}
  },
  result: {
    data: {
      currentUser: {
        userID: 'id',
        emailAliases: ['1@skiff.com']
      }
    }
  }
};

const getAllDraftsResponse: MockedResponse = {
  request: {
    query: GetAllDraftsDocument,
    variables: {}
  },
  result: {
    data: {
      allDrafts: []
    }
  }
};

const upsertDraftResponse: MockedResponse = {
  request: {
    query: CreateOrUpdateDraftDocument,
    variables: {
      request: {}
    }
  },
  result: {
    data: {
      upsertDraft: true
    }
  }
};

const userLabelsQueryMock: MockedResponse = {
  request: {
    query: UserLabelsDocument,
    variables: {}
  },
  result: {
    data: {
      userLabels: []
    }
  }
};

const getCreditsQueryMock: MockedResponse = {
  request: {
    query: GetCreditsDocument,
    variables: {
      request: {
        entityID: 'id',
        entityType: 'USER',
        include: ['CREDITS_FROM_REFERRALS']
      }
    }
  },
  result: {
    data: {
      credits: {
        credits: [
          {
            info: 'CREDITS_FROM_REFERRALS',
            count: 4,
            amount: {
              cents: 0,
              skemailStorageBytes: 4000000000,
              editorStorageBytes: 4000000000
            }
          }
        ]
      }
    }
  }
};

const getLastViewedReferralCreditQueryMock: MockedResponse = {
  request: {
    query: GetLastViewedReferralCreditDocument,
    variables: {}
  },
  result: {
    data: {
      lastViewedReferralCredit: {
        count: 0,
        amount: {
          cents: 0,
          skemailStorageBytes: '0',
          editorStorageBytes: '0'
        }
      }
    }
  }
};

const mocks = [
  getMailboxQueryMock,
  getCurrentUserEmailAliasesQueryMock,
  userLabelsQueryMock,
  getCreditsQueryMock,
  getLastViewedReferralCreditQueryMock,
  getAllDraftsResponse,
  upsertDraftResponse
];

describe('Layout', () => {
  beforeAll(() => {
    const mockUser: models.User = {
      username: 'currentUsername',
      publicKey: {
        key: 'key'
      },
      signingPublicKey: 'key',
      passwordDerivedSecret: 'secret',
      privateUserData: {
        documentKey: '',
        privateKey: '',
        signingPrivateKey: ''
      },
      userID: 'currentUserID',
      publicData: {},
      privateDocumentData: EMPTY_DOCUMENT_DATA,
      rootOrgID: '',
      defaultEmailAlias: 'defaultEmailAlias'
    };
    saveCurrentUserData({ ...mockUser });
  });

  afterAll(() => {
    removeCurrentUserData();
  });

  it('opens and closes compose properly', async () => {
    vi.spyOn(useCurrentLabel, 'useCurrentLabel').mockImplementation(() => ({
      label: SystemLabels.Inbox,
      userLabelVariant: null
    }));

    render(
      <Suspense fallback={null}>
        <Provider store={store}>
          <MockedProvider mocks={mocks}>
            <DndProvider backend={HTML5Backend}>
              <BrowserRouter>
                <Layout>
                  <SystemLabelMailbox />
                </Layout>
              </BrowserRouter>
            </DndProvider>
          </MockedProvider>
        </Provider>
      </Suspense>
    );

    // Wait for Layout to load fully
    await screen.findByTestId(SidebarDataTest.openComposeButton, {}, { timeout: 20_000 });

    // Open compose and test components are there
    const composeButton = screen.getByTestId(SidebarDataTest.openComposeButton);
    await userEvent.click(composeButton);

    await waitFor(() => {
      expect(screen.getByTestId(ComposeDataTest.sendButton)).toBeInTheDocument();
      expect(screen.getByTestId(ComposeDataTest.subjectField)).toBeInTheDocument();
      expect(screen.getByTestId(ComposeDataTest.toField)).toBeInTheDocument();
      expect(screen.getByTestId(ComposeDataTest.showCcButton)).toBeInTheDocument();
      expect(screen.getByTestId(ComposeDataTest.showBccButton)).toBeInTheDocument();
    });

    // Close compose and test components are not there
    const closeComposeButton = screen.getByTestId(ComposeHeaderDataTest.closeButton);
    await userEvent.click(closeComposeButton);

    await waitFor(() => {
      expect(screen.queryByTestId(ComposeDataTest.sendButton)).not.toBeInTheDocument();
      expect(screen.queryByTestId(ComposeDataTest.subjectField)).not.toBeInTheDocument();
      expect(screen.queryByTestId(ComposeDataTest.toField)).not.toBeInTheDocument();
      expect(screen.queryByTestId(ComposeDataTest.ccField)).not.toBeInTheDocument();
      expect(screen.queryByTestId(ComposeDataTest.bccField)).not.toBeInTheDocument();
      expect(screen.queryByTestId(ComposeDataTest.showCcButton)).not.toBeInTheDocument();
      expect(screen.queryByTestId(ComposeDataTest.showBccButton)).not.toBeInTheDocument();
    });
  });

  it('creates, saves, and re-opens draft', async () => {
    vi.spyOn(useCurrentLabel, 'useCurrentLabel').mockImplementation(() => ({
      label: SystemLabels.Drafts,
      userLabelVariant: null
    }));

    act(() => {
      render(
        <Suspense fallback={null}>
          <Provider store={store}>
            <MockedProvider mocks={mocks}>
              <DndProvider backend={HTML5Backend}>
                <BrowserRouter>
                  <Layout>
                    <SystemLabelMailbox />
                  </Layout>
                </BrowserRouter>
              </DndProvider>
            </MockedProvider>
          </Provider>
        </Suspense>
      );
    });
    // Wait for Layout to load fully
    await screen.findByTestId(SidebarDataTest.openComposeButton, {}, { timeout: 20_000 });

    // Open compose and test components are there
    const composeButton = screen.getByTestId(SidebarDataTest.openComposeButton);
    await userEvent.click(composeButton);

    const toField = screen.getByTestId(ComposeDataTest.toField);
    const toInput = within(toField).getByPlaceholderText(/Recipients/i);
    const subjectField = screen.getByTestId(ComposeDataTest.subjectField);
    const subjectInput = within(subjectField).getByPlaceholderText(/Subject/i);
    const closeComposeButton = screen.getByTestId(ComposeHeaderDataTest.closeButton);

    await userEvent.type(toInput, '2@skiff.com{enter}');
    await userEvent.type(subjectInput, 'test subject{tab}');
    // wait for a second before closing so draft content saves
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await userEvent.click(closeComposeButton);

    // Click on message cell to edit draft
    const messageCell = await screen.findByText(/test subject/i);
    await userEvent.click(messageCell);

    // Verify that draft info is saved
    const newSubjectField = await screen.findByTestId(ComposeDataTest.subjectField);
    const newSubjectInput = within(newSubjectField).getByPlaceholderText(/Subject/i);
    expect(newSubjectInput).toHaveAttribute('value', 'test subject');
    const newToField = screen.getByTestId(ComposeDataTest.toField);
    expect(within(newToField).getByText('2')).toBeInTheDocument();
  });
});
