/* eslint-disable @typescript-eslint/await-thenable */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalState } from '@apollo/client/local-state';
import type { ReactNode } from 'react';
import { MockedProvider } from '@apollo/client/testing/react';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CurrentUserDefaultEmailAliasDocument, SetDefaultEmailAliasDocument } from 'skiff-front-graphql';
import { saveCurrentUserData, getDefaultEmailAliasKey, useDefaultEmailAlias } from 'skiff-front-utils';

import store from '../src/redux/store/reduxStore';

import { MOCK_USER } from './mocks/mockUser';

vi.mock('skiff-front-utils', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const original = await vi.importActual('skiff-front-utils');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...original,
    useCurrentUserEmailAliases: () => undefined
  };
});

const testAliasValue = 'test@test.com';


const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <MockedProvider
      localState={new LocalState()}
      mocks={[
        {
          request: {
            query: CurrentUserDefaultEmailAliasDocument,
            variables: {}
          },
          // the first read has no default; after setting one, refetches return it
          maxUsageCount: Number.POSITIVE_INFINITY,
          result: vi
            .fn()
            .mockReturnValueOnce({ data: { currentUser: { userID: MOCK_USER.userID, defaultEmailAlias: null } } })
            .mockReturnValue({ data: { currentUser: { userID: MOCK_USER.userID, defaultEmailAlias: testAliasValue } } })
        },
        {
          request: {
            query: SetDefaultEmailAliasDocument,
            variables: { request: { defaultAlias: testAliasValue } }
          },
          maxUsageCount: Number.POSITIVE_INFINITY,
          result: { data: { setDefaultEmailAlias: true } }
        }
      ]}
    >
      {children}
    </MockedProvider>
  </Provider>
);

describe('useDefaultEmailAlias', () => {
  beforeEach(() => {
    localStorage.removeItem(getDefaultEmailAliasKey(MOCK_USER.userID));
    saveCurrentUserData(MOCK_USER);
  });

  it('reads and sets state from localstorage', async () => {
    const { result } = renderHook(() => useDefaultEmailAlias(MOCK_USER.userID), {
      wrapper
    });

    expect(result.current).toHaveLength(2);
    expect(result.current[0]).toBe('');
    await act(() => result.current[1](testAliasValue));
    expect(result.current[0]).toBe(testAliasValue);
  });
});
