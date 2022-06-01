import { act, renderHook } from '@testing-library/react-hooks';
import useControlledState, { format } from '../useControlledState';

describe('useControlledState', () => {
  const newState = 'new';

  it('can not change with self', () => {
    const state = 'origin';
    const { result } = renderHook(() => useControlledState(state, ''));
    expect(result.current[0]).toBe(state);
    expect(typeof result.current[1]).toBe('function');

    act(() => {
      result.current[1](newState);
    });

    expect(result.current[0]).toBe(state);
  });

  it('will be changed by props', () => {
    let state = 'origin';
    const { result, rerender } = renderHook(() => useControlledState(state, ''));

    state = newState;
    rerender();

    expect(result.current[0]).toBe(state);
  });

  it('will be changed for undefined', () => {
    const { result } = renderHook(() => useControlledState<string | undefined>(undefined, undefined));
    act(() => {
      result.current[1](newState, true);
    });
    expect(result.current[0]).toBe(newState);
  });

  it('will use empty when is undefined', () => {
    const { result } = renderHook(() => useControlledState(undefined, ''));
    expect(result.current[0]).toBe('');
  });
});

describe('format()', () => {
  it('Should return a default message', () => {
    expect(format([1, 2])).toBe('State is controlled | Value is 2');
    expect(format([1, undefined])).toBe('State is uncontrolled | Value is 1');
    expect(format([undefined, 1])).toBe('State is controlled | Value is 1');
    expect(format([undefined, undefined])).toBe('State is uncontrolled | Value is undefined');
  });
});
