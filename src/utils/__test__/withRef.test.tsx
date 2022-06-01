import React from 'react';
import { isForwardRef } from 'react-is';
import WithRef from '../withRef';

describe('WithRef.ts', () => {
  test('Should forward ref', () => {
    const FC: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => <div ref={ref} {...props} />;
    const FCWithRef = WithRef(FC);
    expect(isForwardRef(<FCWithRef />)).toBe(true);
  });
});
