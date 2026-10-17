import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import * as skiffFrontUtils from 'skiff-front-utils';

import {
  ConnectWalletModal,
  ConnectWalletModalDataTest
} from '../src/components/modals/ConnectWalletModal/ConnectWalletModal';

import { MOCK_USER } from './mocks/mockUser';

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

describe('ConnectWalletModal', () => {
  beforeEach(() => {
    skiffFrontUtils.saveCurrentUserData(MOCK_USER);
  });

  it('renders title and wallet buttons', () => {
    render(
      <MockedProvider>
        <ConnectWalletModal
          closeParentModal={vi.fn}
          onBack={vi.fn()}
          onClose={vi.fn()}
          open
          setUserPublicKey={vi.fn()}
          userID={''}
        />
      </MockedProvider>
    );

    expect(screen.getByText(/connect wallet/i)).toBeInTheDocument();
    expect(screen.getByText(/Send and receive emails from your wallet address./i)).toBeInTheDocument();
    expect(screen.getByText(/metamask/i)).toBeInTheDocument();
    expect(screen.getByText(/coinbase/i)).toBeInTheDocument();
    expect(screen.getByText(/phantom/i)).toBeInTheDocument();
    expect(screen.getByText(/brave/i)).toBeInTheDocument();
  });

  it('redirects to wallet page if the wallet is not detected', async () => {
    const originalOpen = window.open;
    window.open = vi.fn();
    render(
      <MockedProvider>
        <ConnectWalletModal
          closeParentModal={vi.fn}
          onBack={vi.fn()}
          onClose={vi.fn()}
          open
          setUserPublicKey={vi.fn()}
          userID={''}
        />
      </MockedProvider>
    );

    const addMetamaskButton = screen.getByTestId(`${ConnectWalletModalDataTest.addWalletBtn}-MetaMask`);
    await act(async () => {
      await userEvent.click(addMetamaskButton);
    });
    // check that a new tab was opened to the metamask download page
    expect(window.open).toBeCalledWith('https://metamask.io/download/', '_blank');

    // Cleanup
    window.open = originalOpen;
  });

  // TODO: Uncomment
  it.skip('renders error message', async () => {
    const originalOpen = window.open;
    window.open = vi.fn();
    vi.spyOn(skiffFrontUtils, 'activateEthProvider').mockImplementation(() => {
      throw new Error('Could not connect wallet.');
    });

    render(
      <MockedProvider>
        <ConnectWalletModal
          closeParentModal={vi.fn}
          onBack={vi.fn()}
          onClose={vi.fn()}
          open
          setUserPublicKey={vi.fn()}
          userID={''}
        />
      </MockedProvider>
    );

    const addMetamaskButton = screen.getByTestId(`${ConnectWalletModalDataTest.addWalletBtn}-MetaMask`);
    await act(async () => {
      await userEvent.click(addMetamaskButton);
    });
    expect(screen.getByText(/could not connect wallet./i)).toBeInTheDocument();
    window.open = originalOpen;
  });

  it('clicking back button calls onBack', async () => {
    const onBack = vi.fn();
    render(
      <MockedProvider>
        <ConnectWalletModal
          closeParentModal={vi.fn}
          onBack={onBack}
          onClose={vi.fn()}
          open
          setUserPublicKey={vi.fn()}
          userID={''}
        />
      </MockedProvider>
    );

    const backButton = screen.getByTestId(ConnectWalletModalDataTest.backBtn);
    await userEvent.click(backButton);
    expect(onBack).toBeCalled();
  });

  it('clicking close button calls onClose', async () => {
    const onClose = vi.fn();
    render(
      <MockedProvider>
        <ConnectWalletModal
          closeParentModal={vi.fn}
          onBack={vi.fn()}
          onClose={onClose}
          open
          setUserPublicKey={vi.fn()}
          userID={''}
        />
      </MockedProvider>
    );

    const closeButton = screen.getByTestId(ConnectWalletModalDataTest.closeBtn);
    await userEvent.click(closeButton);
    expect(onClose).toBeCalled();
  });
});
