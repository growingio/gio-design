import { useRef, useEffect } from 'react';
import isFunction from 'lodash/isFunction';

/**
 * 合并 ref
 */
const useMergeRef = <T>(forwardRef: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null) => {
  const innerRef = useRef<T>((null as unknown) as T);
  useEffect(() => {
    if (isFunction(forwardRef)) {
      forwardRef(innerRef.current);
    } else if (forwardRef) {
      // eslint-disable-next-line no-param-reassign
      forwardRef.current = innerRef.current;
    }
  }, [innerRef, forwardRef]);

  return innerRef;
};

export default useMergeRef;
