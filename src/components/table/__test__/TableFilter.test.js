import { renderHook, act } from '@testing-library/react-hooks';
import { isEqual, cloneDeep } from 'lodash';
import useFilter, { collectFilterStates } from '../hook/useFilter';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    filters: ['名字俩字', '名字仨字'],
    onFilter: (value, record) => {
      if (value === '名字俩字') {
        return record.name.length === 2;
      }
      if (value === '名字仨字') {
        return record.name.length === 3;
      }
      return false;
    },
  },
  {
    title: '基本信息',
    key: 'base',
    children: [
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        filters: ['小孩子', '大人'],
        onFilter: (value, record) => {
          if (value === '小孩子') {
            return record.age <= 22;
          }
          if (value === '大人') {
            return record.age > 22;
          }
          return false;
        },
      },
      {
        title: '体重',
        dataIndex: 'weight',
        key: 'weight',
        filters: [60, 70],
      },
    ],
  },
];

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    weight: 70,
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    weight: 60,
  },
  {
    key: '3',
    name: '航航',
    age: 18,
    weight: 70,
  },
  {
    key: '4',
    name: '屁屁',
    age: 22,
    weight: 60,
  },
];

describe('Testing Table Filter', () => {
  test('collectFilterStates function', () => {
    const filterStates = collectFilterStates(columns);
    expect(filterStates.length).toBe(3);
    expect(filterStates[0].key).toBe(columns[0].key);
    expect(filterStates[2].filters).toBe(columns[1].children[1].filters);
  });

  test('useFilter hook', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { result, rerender } = renderHook(({ columns, dataSource }) => useFilter(columns, dataSource), {
      initialProps: { columns, dataSource },
    });
    const [filterStates, updateFilterStates] = result.current;
    const filterState0 = filterStates[0];
    act(() => {
      updateFilterStates({
        ...filterState0,
        filteredKeys: ['名字俩字'],
      });
    });

    expect(result.current[2].length).toBe(2);

    const filterState2 = filterStates[2];
    const newUpdateFilterStates = result.current[1];
    act(() => {
      newUpdateFilterStates({
        ...filterState2,
        filteredKeys: [60],
      });
    });
    expect(result.current[2].length).toBe(1);
  });

  it('should re-collect states, after columns update', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { result, rerender } = renderHook(({ columns, dataSource }) => useFilter(columns, dataSource), {
      initialProps: { columns, dataSource },
    });
    const [oldSortStates] = result.current;
    act(() => {
      rerender({
        columns: cloneDeep(columns).map((column) => {
          column.key = `#${  column.key}`;
          return column;
        }),
        dataSource,
      });
    });

    const [newSortStates] = result.current;
    expect(isEqual(oldSortStates, newSortStates)).toBe(false);
  });
});
