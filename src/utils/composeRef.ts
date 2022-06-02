/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { isMemo, isElement, ForwardRef, isForwardRef } from 'react-is';

export const composeRef =
  <T>(...refs: React.Ref<T>[]): React.Ref<T> =>
  (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (typeof ref === 'object' && ref && 'current' in ref) {
        // eslint-disable-next-line no-param-reassign
        (ref as any).current = node;
      }
    });
  };

export function supportRef<T = any>(nodeOrComponent: T): boolean {
  // 只有 ReactElement 支持 ref
  if (!isElement(nodeOrComponent)) {
    return false;
  }

  // 原生标签的 type 是一个 string
  // 原生标签支持 ref
  if (typeof nodeOrComponent.type === 'string') {
    return true;
  }

  // 使用 React.memo 包裹的 ForwardRef Function Component
  // prettier-ignore
  if (
    isMemo(nodeOrComponent) &&
    nodeOrComponent.type.type.$$typeof === ForwardRef
  ) {
    return true;
  }

  // ForwardRef Function Component
  if (isForwardRef(nodeOrComponent)) {
    return true;
  }

  // Class Component 支持 ref
  const { prototype } = nodeOrComponent.type;
  if (prototype && prototype.isReactComponent) {
    return true;
  }

  return false;
}
export default composeRef;
