import React from 'react';

const composeRef = <T>(...refs: React.Ref<T>[]): React.RefCallback<T> => (node: T) => {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(node);
    } else if (typeof ref === 'object' && ref && 'current' in ref) {
      // eslint-disable-next-line no-param-reassign
      (ref as any).current = node;
    }
  });
};

export default composeRef;
