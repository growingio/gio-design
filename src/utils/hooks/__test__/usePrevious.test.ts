import { renderHook } from '@testing-library/react-hooks';
import usePrevious from '../usePrevious';

describe('usePrevious.ts', () => {
  it('Should return a previous value', () => {
    const { result, rerender } = renderHook((value: number) => usePrevious(value), { initialProps: 1 });
    expect(result.current).toBeUndefined();
    rerender(2);
    expect(result.current).toBe(1);
    rerender(3);
    expect(result.current).toBe(2);
  });
});
