import React, { useRef } from 'react';

type RefKey = string | number | symbol;

export default function useRefs<RefType>(): [
  (key: RefKey, ref?: React.RefObject<RefType>) => React.RefObject<RefType> | undefined,
  (key: RefKey) => React.RefObject<RefType> | undefined,
  React.MutableRefObject<Map<RefKey, React.RefObject<RefType>>>
  ] {
  const cacheRefs = useRef(new Map<RefKey, React.RefObject<RefType>>());
  
  const setRef = useRef((key: RefKey, ref?: React.RefObject<RefType>) => {
    if (!cacheRefs.current.has(key)) {
      cacheRefs.current.set(key, ref?.current ? ref : React.createRef<RefType>());
    }
    return cacheRefs.current.get(key);
  }).current;

  const getRef = useRef((key: RefKey) => cacheRefs.current.get(key)).current

  return [setRef, getRef, cacheRefs];
}
