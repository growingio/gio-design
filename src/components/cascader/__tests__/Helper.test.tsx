import { renderHook } from '@testing-library/react-hooks';

import { isHit, dataFilter, getParentsByValue, useKeyboardNav } from '../helper';

describe('isHit', () => {
  it('should match word', () => {
    const label = 'hello test';
    expect(isHit(label, '', false)).toBeTruthy();
    expect(isHit(label, 'hello', false)).toBeTruthy();
    expect(isHit(label, 'xml', false)).toBeFalsy();
  });
});

describe('dataFilter', () => {
  it('should match word by a parttern', () => {
    const data = [
      { label: 'hello', value: 1 },
      { label: 'nihao', value: 2, children: [] as any },
    ];
    expect(dataFilter(data, null, true)).toHaveLength(2);
    expect(dataFilter(data, /h/i, true)).toHaveLength(2);
    expect(dataFilter(data, /hello/i, true)).toHaveLength(1);
  });
});

describe('getParentsByValue', () => {
  it('should return parents NodeData of a value', () => {
    const data = [
      { label: 'hello', value: 1 },
      { label: 'nihao', value: 2, children: [{ label: 'nihao shijie', value: 21 }] },
    ];

    expect(getParentsByValue({ label: 'label', value: 'value' }, undefined, data)).toHaveLength(0);
    expect(getParentsByValue({ label: 'label', value: 'value' }, 0, data)).toHaveLength(0);
    expect(getParentsByValue({ label: 'label', value: 'value' }, 1, data)).toHaveLength(1);
    expect(getParentsByValue({ label: 'label', value: 'value' }, 21, data)).toHaveLength(2);
  });
});

describe('useKeyboardNav', () => {
  it('should ignore empty wrapper', () => {
    renderHook(() => useKeyboardNav({} as any));
  });
});
