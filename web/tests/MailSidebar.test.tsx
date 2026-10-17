import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { LocalState } from '@apollo/client/local-state';
import { MockedProvider } from '@apollo/client/testing/react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { EMPTY_DOCUMENT_DATA, SystemLabels, models } from 'skiff-front-graphql';
import { removeCurrentUserData, saveCurrentUserData } from 'skiff-front-utils';

import MailSidebar from '../src/components/layout/MailSidebar';
import { DrawerProvider } from '../src/context/DrawerContext';
import { reducer } from '../src/redux/reducers';
import { SYSTEM_LABELS, isDefaultSidebarLabel } from '../src/utils/label';

import { MOCK_USER } from './mocks/mockUser';

vi.mock('skiff-front-utils', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const original = await vi.importActual('skiff-front-utils');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...original,
    useRequiredCurrentUserData: vi.fn((): models.User => MOCK_USER),
    useCurrentUserData: vi.fn((): models.User => MOCK_USER),
    useCurrentUserEmailAliases: () => ({ emailAliases: ['1@skiff.town'], walletAliasesWithName: [], quickAliases: [] })
  };
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  useLocation: () => ({ pathname: '/mail/inbox' })
}));

vi.mock('../src/hooks/useCurrentLabel', () => ({
  useCurrentLabel: () => ({ label: SystemLabels.Inbox, userLabelVariant: null })
}));

describe('Sidebar', () => {
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
      rootOrgID: ''
    };
    saveCurrentUserData({ ...mockUser });
  });

  afterAll(() => {
    removeCurrentUserData();
  });

  // TODO: Move wrapper setup to util file https://redux.js.org/usage/writing-tests
  const store = configureStore({ reducer });

  const wrapper = ({ children }) => (
    <Provider store={store}>
      <SnackbarProvider maxSnack={7}>
        <DrawerProvider>
          <DndProvider backend={HTML5Backend}>
            <MockedProvider localState={new LocalState()}>
              <BrowserRouter>{children}</BrowserRouter>
            </MockedProvider>
          </DndProvider>
        </DrawerProvider>
      </SnackbarProvider>
    </Provider>
  );

  it('renders all system labels and pages', () => {
    render(<MailSidebar />, { wrapper });
    SYSTEM_LABELS.filter(isDefaultSidebarLabel).forEach((label) => {
      expect(screen.getByText(label.name)).toBeInTheDocument();
    });

    expect(screen.getByText(/compose/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('marks label as active based on routing', () => {
    window.history.pushState({}, '', '/inbox');
    render(<MailSidebar />, { wrapper });
    const style = (name: string) => {
      const text = screen.getByText(name);
      const row = text.closest('a')?.firstElementChild;
      return { background: row ? getComputedStyle(row).background : '', color: getComputedStyle(text).color };
    };
    expect(style('Inbox')).toEqual({ background: 'var(--bg-overlay-tertiary)', color: 'var(--text-primary)' });
    expect(style('Sent')).toEqual({ background: 'rgba(0, 0, 0, 0)', color: 'var(--text-secondary)' });
  });
});
