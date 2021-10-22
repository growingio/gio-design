import React from 'react';

function WithRef<T, P>(OptComponent: React.ForwardRefRenderFunction<T, P>) {
  return React.forwardRef<T, P>(OptComponent);
}

export default WithRef;
