/* eslint-disable prettier/prettier */
/**
 * @see https://streamich.github.io/react-use/?path=/story/side-effects-useasync--docs
 * @see https://github.com/streamich/react-use/blob/master/src/useAsyncFn.ts
 */
import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';
import useMountedState from './useMountedState';

type FunctionReturningPromise = (...args: any[]) => Promise<any>;
type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;
type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> = AsyncState<PromiseType<ReturnType<T>>>;

type AsyncFnReturn<T extends FunctionReturningPromise = FunctionReturningPromise> = [
  StateFromFunctionReturningPromise<T>,
  T
];

function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFunctionReturningPromise<T> = { loading: false }
): AsyncFnReturn<T> {
  const lastCallId = useRef(0);
  const isMounted = useMountedState();
  const [state, set] = useState<StateFromFunctionReturningPromise<T>>(initialState);

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    // eslint-disable-next-line no-plusplus
    const callId = ++lastCallId.current;
    set((prevState) => ({ ...prevState, loading: true }));

    return fn(...args).then(
      (value) => {
        isMounted() && callId === lastCallId.current && set({ value, loading: false });

        return value;
      },
      (error) => {
        isMounted() && callId === lastCallId.current && set({ error, loading: false });

        return error;
      }
    ) as ReturnType<T>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, callback as unknown as T];
}

export default function useAsync<T extends FunctionReturningPromise>(fn: T, deps: DependencyList = []) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
