import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

const useDebounceLoading = (loading: boolean, delay: number) => {
  const [shouldLoading, setShouldLoading] = useState<boolean>(loading);
  const debounceFunc = useCallback(
    debounce((_loading: boolean) => setShouldLoading(_loading), delay),
    [delay],
  );
  useEffect(() => {
    if (shouldLoading && !loading) {
      debounceFunc.cancel();
    }
    debounceFunc(loading);
  }, [loading]);

  return shouldLoading;
};

export default useDebounceLoading;
