import { describe, it, expect, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { ApplyLabelsDocument } from 'skiff-front-graphql';
import { SystemLabels } from 'skiff-graphql';

import { MailboxActions, MailboxActionsDataTest } from '../src/components/mailbox/MailboxActions/MailboxActions';
import { skemailHotKeysReducer } from '../src/redux/reducers/hotkeysReducer';
import { skemailMailboxReducer } from '../src/redux/reducers/mailboxReducer';
import { skemailModalReducer } from '../src/redux/reducers/modalReducer';
import { skemailSearchReducer } from '../src/redux/reducers/searchReducer';

import { MOCK_THREAD } from './mocks/mockThread';

vi.mock('../src/hooks/useSearchWorker', () => ({
  getSearchWorker: undefined
}));

vi.mock('../src/hooks/useThreadActions', () => ({
  useThreadActions: () => ({
    moveThreads: vi.fn(),
    trashThreads: vi.fn()
  })
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  useLocation: () => ({ pathname: '/mail/inbox' })
}));

const mockedRequests = [
  {
    request: {
      query: ApplyLabelsDocument,
      variables: { request: { threadIDs: MOCK_THREAD.threadID } }
    }
  }
];

export const createStore = () =>
  configureStore({
    reducer: {
      mailbox: skemailMailboxReducer.reducer,
      hotkeys: skemailHotKeysReducer.reducer,
      modal: skemailModalReducer.reducer,
      search: skemailSearchReducer.reducer
    },
    preloadedState: {
      mailbox: {
        selectedThreadIDs: [],
        filters: {},
        hoveredThreadID: '',
        hoveredThreadIndex: 0,
        renderedMailboxThreadsCount: 0,
        lastSelectedIndex: null,
        activeThread: {
          activeThreadID: undefined,
          activeEmailID: undefined
        },
        pendingReplies: []
      },
      search: {
        isSearchBarOpen: false,
        shouldFocus: false
      }
    }
  });

describe('MailboxActions', () => {
  it('renders Move to Trash option if not currently in Trash', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <MockedProvider mocks={mockedRequests}>
          <SnackbarProvider>
            <MailboxActions
              clearLastSelectedIndex={vi.fn()}
              label={SystemLabels.Inbox}
              onRefresh={vi.fn()}
              threads={[MOCK_THREAD]}
            />
          </SnackbarProvider>
        </MockedProvider>
      </Provider>
    );
    // option shown only after thread selected
    act(() => {
      store.dispatch(skemailMailboxReducer.actions.setSelectedThreadIDs({ selectedThreadIDs: [MOCK_THREAD.threadID] }));
    });
    expect(screen.getByTestId(MailboxActionsDataTest.moveToTrashIcon)).toBeInTheDocument();
  });

  it('renders undo trash option if currently in Trash', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <MockedProvider mocks={mockedRequests}>
          <SnackbarProvider>
            <MailboxActions
              clearLastSelectedIndex={vi.fn()}
              label={SystemLabels.Trash}
              onRefresh={vi.fn()}
              threads={[MOCK_THREAD]}
            />
          </SnackbarProvider>
        </MockedProvider>
      </Provider>
    );
    // option shown only after thread selected
    act(() => {
      store.dispatch(skemailMailboxReducer.actions.setSelectedThreadIDs({ selectedThreadIDs: [MOCK_THREAD.threadID] }));
    });
    expect(screen.getByTestId(MailboxActionsDataTest.undoTrashIcon)).toBeInTheDocument();
    expect(screen.queryByTestId(MailboxActionsDataTest.moveToTrashIcon)).not.toBeInTheDocument();
  });
});
