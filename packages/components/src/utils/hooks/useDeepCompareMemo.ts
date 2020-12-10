import { useRef, useMemo, DependencyList } from 'react';
import { isEqual } from 'lodash';

const useDeepCompareMemo = <T>(factory: () => T, deps: DependencyList | undefined): T => {
  const ref = useRef<DependencyList | undefined>(undefined);
  if (!ref.current || !isEqual(deps, ref.current)) {
    ref.current = deps;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo<T>(factory, ref.current);
  return value;
};

export default useDeepCompareMemo;
