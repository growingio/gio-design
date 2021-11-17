import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

/**
 * @see loadash.DebounceSettings
 */
interface DebounceSettings {
  leading?: boolean;

  maxWait?: number;

  trailing?: boolean;
}
type Fn = (...args: any) => any;

function useDebounceFn<T extends Fn>(fn: T, wait = 0, options?: DebounceSettings) {
  const debouncedCallback = useMemo(() => debounce(fn, wait, options), [fn, wait, options]);
  useEffect(
    () => () => {
      const callback = debouncedCallback as any;
      callback.clear && callback.clear();
    },
    [debouncedCallback]
  );

  return debouncedCallback;
}

export default useDebounceFn;
