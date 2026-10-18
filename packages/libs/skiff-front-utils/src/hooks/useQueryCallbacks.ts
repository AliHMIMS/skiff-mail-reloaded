import type { ErrorLike } from '@apollo/client';
import { useEffect, useRef } from 'react';

interface QueryCallbacks<TData> {
  onCompleted?: (data: NonNullable<TData>) => void;
  onError?: (error: ErrorLike) => void;
}

/**
 * Apollo Client 4 dropped useQuery's onCompleted/onError options: wrap a query hook's result to call them when its data
 * or error changes. The latest callbacks are used, so they don't need to be memoized.
 *
 * `const { data } = useQueryCallbacks(useSomeQuery({ variables }), { onCompleted: (data) => ... });`
 */
export function useQueryCallbacks<TResult extends { data?: unknown; error?: ErrorLike }>(
  result: TResult,
  { onCompleted, onError }: QueryCallbacks<TResult['data']>
): TResult {
  const callbacks = useRef<QueryCallbacks<TResult['data']>>({ onCompleted, onError });
  callbacks.current = { onCompleted, onError };
  const { data, error } = result;

  useEffect(() => {
    if (data !== undefined && data !== null) callbacks.current.onCompleted?.(data as NonNullable<TResult['data']>);
  }, [data]);

  useEffect(() => {
    if (error) callbacks.current.onError?.(error);
  }, [error]);

  return result;
}
