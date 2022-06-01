import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import usePatchElement from '../usePatchElement';

describe('usePatchElement.ts', () => {
  it('Should set an element', () => {
    const { result } = renderHook(() => usePatchElement());
    const patch = result.current[1];
    act(() => {
      patch(<div />);
      patch(<span />);
    });
    const elements = result.current[0];
    expect(elements).toHaveLength(2);
    expect(elements[0].type).toBe('div');
    expect(elements[1].type).toBe('span');
  });

  it('Should remove an element', () => {
    const { result } = renderHook(() => usePatchElement());
    const patch = result.current[1];
    act(() => {
      const removeDiv = patch(<div />);
      patch(<span />);
      removeDiv();
    });
    const elements = result.current[0];
    expect(elements).toHaveLength(1);
    expect(elements[0].type).toBe('span');
  });
});
