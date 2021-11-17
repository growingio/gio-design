import { useEffect, useState, useCallback } from 'react';
import useDebounceFn from './useDebounceFn';
import useMountedState from './useMountedState';

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

const useDebounce = <T = undefined>(value: T, wait = 500): [T, Dispatch<SetStateAction<T | undefined>>] => {
  const isMounted = useMountedState();

  const [state, dispatch] = useState(value);
  const callback = useCallback((_v: T) => isMounted() && dispatch(_v), [isMounted]);
  const debounced = useDebounceFn(callback, wait);

  useEffect(() => {
    debounced(value);
  }, [value, debounced]);

  return [state, debounced];
};

export default useDebounce;
