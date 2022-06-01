import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useSize from '../useSize';
import { SizeContextProvider } from '../../SizeContext';

describe('useSize.ts', () => {
  it('Should return a default size', () => {
    let size: string | undefined;
    const { result, rerender } = renderHook(() => useSize(), {
      wrapper: ({ children }) => <SizeContextProvider size={size}>{children}</SizeContextProvider>,
    });
    expect(result.current).toBeUndefined();
    size = 'small';
    rerender();
    expect(result.current).toBe('small');
  });
});
