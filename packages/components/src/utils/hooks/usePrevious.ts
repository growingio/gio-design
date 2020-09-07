import { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: T): T | undefined {
  // 初始化的时候不需要赋值
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
