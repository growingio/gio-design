/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { isMemo } from 'react-is';

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

export function supportRef(nodeOrComponent: any): boolean {
  if (typeof nodeOrComponent !== 'object') {
    return false;
  }
  const type = isMemo(nodeOrComponent) ? nodeOrComponent.type.type : nodeOrComponent.type;

  // Function component node
  if (typeof type === 'function' && !type.prototype?.render) {
    return false;
  }

  // Class component
  if (typeof nodeOrComponent === 'function' && !nodeOrComponent.prototype?.render) {
    return false;
  }

  return true;
}
export default composeRef;
