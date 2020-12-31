import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

const useDebounceLoading = (loading: boolean, delay: number): boolean => {
  const [shouldLoading, setShouldLoading] = useState<boolean>(loading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFunc = useCallback(
    debounce((_loading: boolean) => setShouldLoading(_loading), delay),
    [delay]
  );
  useEffect(() => {
    if (shouldLoading && !loading) {
      debounceFunc.cancel();
    }
    debounceFunc(loading);
  }, [debounceFunc, loading, shouldLoading]);

  return shouldLoading;
};

export default useDebounceLoading;
