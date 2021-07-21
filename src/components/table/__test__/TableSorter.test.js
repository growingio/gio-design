/* eslint-disable @typescript-eslint/no-shadow */
import { renderHook, act } from '@testing-library/react-hooks';
import { cloneDeep } from 'lodash';
import useSorter, { collectSortStates } from '../hook/useSorter';
import { getNextSortDirection } from '../Title';

const dataColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: '基本信息',
    key: 'base',
    children: [
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '体重',
        dataIndex: 'weight',
        key: 'weight',
        sorter: (a, b) => a.weight - b.weight,
        sortPriorityOrder: 2,
      },
    ],
  },
];

const dataDataSource = [
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

const dataControlledColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    sortOrder: 'descend'
  }
];

describe('Testing Table Sorter', () => {
  test('collectSortStates function', () => {
    const sortStates = collectSortStates(dataColumns);
    expect(sortStates.length).toBe(3);
    expect(sortStates[0].key).toBe(dataColumns[0].key);
    expect(sortStates[2].sortPriorityOrder).toBe(2);
  });

  test('useSorter hook', () => {
    const { result } = renderHook(({ columns, dataSource }) => useSorter(columns, dataSource), {
      initialProps: { columns: dataColumns, dataSource: dataDataSource },
    });
    const [sortStates, updateSorterStates, sortedData] = result.current;
    const sorterState0 = sortStates[0];
    updateSorterStates({
      ...sorterState0,
      sortOrder: getNextSortDirection(sorterState0.sortDirections, sorterState0.sorterOrder),
    });
    expect(result.current[2]).not.toStrictEqual(sortedData);
    const sorterState2 = sortStates[2];
    updateSorterStates({
      ...sorterState2,
      sortOrder: getNextSortDirection(sorterState2.sortDirections, sorterState2.sorterOrder),
    });
    expect(result.current[2]).not.toStrictEqual(sortedData);
    expect(result.current[0][0].sortOrder).toBe(null);
    expect(result.current[0][2].sortOrder).toBe('ascend');
  });

  it('should re-collect states, after columns update', () => {
    const { result, rerender } = renderHook(({ columns, dataSource }) => useSorter(columns, dataSource), {
      initialProps: { columns: dataColumns, dataSource: dataDataSource },
    });
    const [oldSortStates] = result.current;
    rerender({
      columns: cloneDeep(dataColumns).map((column) => {
        column.key = `#${  column.key}`;
        return column;
      }),
      dataDataSource,
    });

    const [newSortStates] = result.current;
    expect(oldSortStates).not.toStrictEqual(newSortStates);
  });

  test('controlled sorter', () => {
    const { result } = renderHook(({ columns, dataSource }) => useSorter(columns, dataSource), {
      initialProps: { columns: dataControlledColumns, dataSource: dataDataSource },
    });
    const [sortStates, updateSorterStates, sortedData] = result.current;
    // sorter: true 前端不排序
    expect(sortedData).toStrictEqual(dataDataSource);
    const sorterState0 = sortStates[0];
    updateSorterStates({
      ...sorterState0,
      sortOrder: getNextSortDirection(sorterState0.sortDirections, sorterState0.sorterOrder),
    });
    // 受控时排序字段不改变
    expect(result.current[0][0]).toStrictEqual(sorterState0);
  });
});
