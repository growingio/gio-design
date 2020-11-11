import { NodeData } from '../menu-item';
import { isHit, dataFilter } from '../helper';

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
      { label: 'nihao', value: 2, children: [] as NodeData[] },
    ];
    expect(dataFilter(data, null, true)).toHaveLength(2);
    expect(dataFilter(data, /h/i, true)).toHaveLength(2);
    expect(dataFilter(data, /hello/i, true)).toHaveLength(1);
  });
});
