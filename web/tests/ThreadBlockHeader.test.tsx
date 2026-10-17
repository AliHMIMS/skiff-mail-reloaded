import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LocalState } from '@apollo/client/local-state';
import { MockedProvider } from '@apollo/client/testing/react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { abbreviateWalletAddress } from 'skiff-front-utils';

import { ThreadBlockHeader } from '../src/components/Thread/ThreadBlockHeader';
import { skemailDraftsReducer } from '../src/redux/reducers/draftsReducer';
import { skemailModalReducer } from '../src/redux/reducers/modalReducer';

import { MOCK_EMAIL } from './mocks/mockEmail';

vi.mock('../src/hooks/useSearchWorker', () => ({
  getSearchWorker: undefined
}));
vi.mock('skiff-front-utils', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const original = await vi.importActual('skiff-front-utils');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...original,
    useToast: () => ({ enqueueToast: vi.fn(), closeToast: vi.fn() })
  };
});
vi.mock('../src/hooks/useDrafts', () => ({
  useDrafts: () => ({
    composeNewDraft: vi.fn()
  })
}));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  useParams: () => ({ mailboxLabel: 'inbox' })
}));
vi.mock('../src/hooks/useThreadActions', () => ({
  useThreadActions: () => ({
    activeThreadID: 'threadID'
  })
}));

const mockEmail = {
  ...MOCK_EMAIL,
  decryptedAttachmentMetadata: [],
  attachmentMetadata: []
};
const ethAddress = `0x${'a'.padStart(40, 'a')}`;
const solAddress = `${'A'.padStart(44, 'A')}`;

const originalOpen = window.open;

export const createStore = () =>
  configureStore({
    reducer: {
      mobileDrawer: skemailModalReducer.reducer,
      draft: skemailDraftsReducer.reducer
    }
  });

describe('ThreadBlockHeader', () => {
  // TODO: Move wrapper setup to util file https://redux.js.org/usage/writing-tests
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={createStore()}>
      <MockedProvider localState={new LocalState()}>
        <BrowserRouter>{children}</BrowserRouter>
      </MockedProvider>
    </Provider>
  );

  beforeEach(() => {
    window.open = vi.fn();
  });

  afterEach(() => {
    // Cleanup
    window.open = originalOpen;
  });

  it('renders sender name and address', () => {
    const address = 'address';
    const name = 'name';
    const sender = { address, name };
    const email = { ...mockEmail, from: sender };
    render(
      <ThreadBlockHeader
        disableOnClick={false}
        email={email}
        expanded={false}
        moreButtonRef={React.createRef<HTMLDivElement>()}
        onClick={vi.fn()}
        reply={vi.fn()}
        setShowMoreOptions={vi.fn()}
      />,
      { wrapper }
    );

    expect(screen.getByText(sender.name)).toBeInTheDocument();
    expect(screen.getByText(`<${sender.address}>`)).toBeInTheDocument();
  });

  it('renders ENS name for sender with display name', () => {
    const ensName = 'test.eth';
    const sender = { address: `${ensName}@skiff.town`, name: 'Test ENS' };
    const email = { ...mockEmail, from: sender };
    render(
      <ThreadBlockHeader
        disableOnClick={false}
        email={email}
        expanded={false}
        moreButtonRef={React.createRef<HTMLDivElement>()}
        onClick={vi.fn()}
        reply={vi.fn()}
        setShowMoreOptions={vi.fn()}
      />,
      { wrapper }
    );

    expect(screen.getByText(ensName)).toBeInTheDocument();
  });

  it('renders abbreviated eth address for sender without display name', () => {
    const abbreviatedWalletAddress = abbreviateWalletAddress(ethAddress);
    const sender = { address: `${ethAddress}@skiff.town` };
    const email = { ...mockEmail, from: sender };
    render(
      <ThreadBlockHeader
        disableOnClick={false}
        email={email}
        expanded={false}
        moreButtonRef={React.createRef<HTMLDivElement>()}
        onClick={vi.fn()}
        reply={vi.fn()}
        setShowMoreOptions={vi.fn()}
      />,
      { wrapper }
    );

    expect(screen.getByText(`${abbreviatedWalletAddress}@skiff.town`)).toBeInTheDocument();
  });

  it('renders abbreviated sol address for sender without display name', () => {
    const abbreviatedWalletAddress = abbreviateWalletAddress(solAddress);
    const sender = { address: `${solAddress}@skiff.town` };
    const email = { ...mockEmail, from: sender };
    render(
      <ThreadBlockHeader
        disableOnClick={false}
        email={email}
        expanded={false}
        moreButtonRef={React.createRef<HTMLDivElement>()}
        onClick={vi.fn()}
        reply={vi.fn()}
        setShowMoreOptions={vi.fn()}
      />,
      { wrapper }
    );

    expect(screen.getByText(`${abbreviatedWalletAddress}@skiff.town`)).toBeInTheDocument();
  });
});
