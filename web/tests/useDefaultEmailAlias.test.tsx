/* eslint-disable @typescript-eslint/await-thenable */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
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

vi.mock('../src/hooks/useSearchWorker', () => ({
  getSearchWorker: undefined
}));

const wrapper: React.FC = ({ children }) => (
  <Provider store={store}>
    <MockedProvider
      mocks={[
        {
          request: {
            query: CurrentUserDefaultEmailAliasDocument,
            variables: {}
          },
          result: {
            data: {
              currentUser: {
                userID: MOCK_USER.userID,
                defaultEmailAlias: null
                // no default
              }
            }
          },
          newData: vi.fn(() => {
            return {
              data: {
                currentUser: {
                  userID: MOCK_USER.userID,
                  defaultEmailAlias: testAliasValue
                }
              }
            };
          })
        },
        {
          request: {
            query: SetDefaultEmailAliasDocument,
            variables: { request: { defaultAlias: testAliasValue } }
          },
          result: {
            data: {
              user: {}
            }
          },
          newData: vi.fn(() => {
            return { data: { setDefaultEmailAlias: true } };
          })
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
