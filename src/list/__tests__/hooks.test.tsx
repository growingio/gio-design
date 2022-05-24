
import { renderHook } from '@testing-library/react-hooks'
import useCacheOptions from '../hooks/useCacheOptions';
import useValue from '../hooks/useValue';


describe('testing useCacheOption hook ', () => {


  it('useCacheOptions', () => {
    const { result } = renderHook(() => useCacheOptions())
    result.current.setOptions();
    result.current.setOptions([{ value: '1', label: '1' }]);

    expect(result.current.options.size).toEqual(1);
    result.current.setOptions([{ value: '2', label: '2', items: [{ value: '2.1', label: '2.1' }] }]);

    expect(result.current.options.size).toEqual(3);
    expect(result.current.getOptionByValue('2.1')).toStrictEqual({ value: '2.1', label: '2.1' });
    expect(result.current.getOptionByValue()).toBe(undefined);
    expect(result.current.getOptionByValue('1.1.1')).toBe(undefined);
    // getLabelByValue
    expect(result.current.getLabelByValue()).toBe('');
    expect(result.current.getLabelByValue('1')).toBe('1');
    expect(result.current.getLabelByValue(['1', '2'])).toBe('1,2');
    expect(result.current.getLabelByValue('2.1', '.', '.', 'cascader')).toBe('2.1');

    // getOptionTreeByValue
    expect(result.current.getOptionTreeByValue()).toBe('');
    expect(result.current.getOptionTreeByValue('1')).toStrictEqual({ value: '1', label: '1' });
    expect(result.current.getOptionTreeByValue('2.1')).toStrictEqual({ value: '2.1', label: '2.1' });
  })
})

describe('testing useValue hook', () => {
  test('useValue', () => {
    const { result } = renderHook(() => useValue('1', undefined, '1', undefined))
    expect(result.current.value).toEqual('1');

  });
  test('useValue return ""', () => {
    const { result } = renderHook(() => useValue(null, undefined, null, undefined, false))
    expect(result.current.value).toEqual('');

  });
  test('returns []', () => {
    const { result } = renderHook(() => useValue(null, undefined, null, undefined, true))
    expect(result.current.value).toStrictEqual([])
  })
})