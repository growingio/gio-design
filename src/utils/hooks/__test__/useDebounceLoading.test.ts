import { act, renderHook } from '@testing-library/react-hooks';
import useDebounceLoading from '../useDebounceLoading';

describe('useDebounceLoading.ts', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should defer to set state', () => {
    const { result, rerender } = renderHook((loading: boolean) => useDebounceLoading(loading, 1000), {
      initialProps: false,
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe(false);

    rerender(true);

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe(true);
  });

  it('Should cancel debounce function', () => {
    const { result, rerender } = renderHook((loading: boolean) => useDebounceLoading(loading, 1000), {
      initialProps: true,
    });
    rerender(false);
    rerender(false);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe(false);
  });
});
