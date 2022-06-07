import { renderHook } from '@testing-library/react-hooks';
import usePagination from '../hooks/usePagination';

describe('Test usePagination', () => {
  it('render usePagination hook', () => {
    const { result, rerender } = renderHook((init) => usePagination({ ...init }), {
      initialProps: { pageSize: 10, total: 100, current: 1 },
    });
    expect(result.current.maxPages).toBe(10);
    expect(result.current.goToPage).toBeInstanceOf(Function);

    rerender({ pageSize: 10, total: 50, current: 10 });
    expect(result.current.maxPages).toBe(5);
  });
  it('render usePagination hook with total=undefined', () => {
    const { result } = renderHook((init) => usePagination({ ...init }), {
      initialProps: { pageSize: 10, total: undefined, current: 1 },
    });
    expect(result.current.maxPages).toBe(0);
  });
});
