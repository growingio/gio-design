import { renderHook } from '@testing-library/react-hooks';
import usePrefixCls from '../use-prefix-cls';

describe('usePrefixCls.ts', () => {
  it('Should set prefix-cls', () => {
    const { result, rerender } = renderHook((customRootPrefixCls?: string) =>
      usePrefixCls('test', customRootPrefixCls)
    );
    expect(result.current).toBe('gio-test');
    rerender('gio-root');
    expect(result.current).toBe('gio-root-test');
  });
});
