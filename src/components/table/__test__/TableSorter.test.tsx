/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import { cloneDeep } from 'lodash';
import useSorter, { collectSortStates } from '../hook/useSorter';
import { getNextSortDirection } from '../Title';
import Table from '../index';

const dataColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: { name: string | any[] }, b: { name: string | any[] }) => a.name.length - b.name.length,
  },
  {
    title: '基本信息',
    key: 'base',
    children: [
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
      },
      {
        title: '体重',
        dataIndex: 'weight',
        key: 'weight',
        sorter: (a: { weight: number }, b: { weight: number }) => a.weight - b.weight,
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
    sortOrder: 'descend',
  },
];

describe('Testing Table Sorter', () => {
  test('without column', () => {
    const sortStates = collectSortStates();
    expect(sortStates.length).toEqual(0);
  });

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
      // @ts-ignore
      sortOrder: getNextSortDirection(sorterState0.sortDirections, sorterState0.sorterOrder),
    });
    expect(result.current[2]).not.toStrictEqual(sortedData);
    const sorterState2 = sortStates[2];
    updateSorterStates({
      ...sorterState2,
      // @ts-ignore
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
        // eslint-disable-next-line no-param-reassign
        column.key = `#${column.key}`;
        return column;
      }),
      // @ts-ignore
      dataDataSource,
    });

    const [newSortStates] = result.current;
    expect(oldSortStates).not.toStrictEqual(newSortStates);
  });

  test('controlled sorter', () => {
    // @ts-ignore
    const { result } = renderHook(({ columns, dataSource }) => useSorter(columns, dataSource), {
      initialProps: { columns: dataControlledColumns, dataSource: dataDataSource },
    });
    const [sortStates, updateSorterStates, sortedData] = result.current;
    // sorter: true 前端不排序
    expect(sortedData).toStrictEqual(dataDataSource);
    const sorterState0 = sortStates[0];
    updateSorterStates({
      ...sorterState0,
      // @ts-ignore
      sortOrder: getNextSortDirection(sorterState0.sortDirections, sorterState0.sorterOrder),
    });
    // 受控时排序字段不改变
    expect(result.current[0][0]).toStrictEqual(sorterState0);
  });

  it('column without sorter', () => {
    const sortStates = collectSortStates([
      {
        title: '体重',
        dataIndex: 'weight',
        key: 'weight',
      },
    ]);
    expect(sortStates.length).toEqual(0);
  });

  it('column.sorter', () => {
    const sortStates = collectSortStates([
      {
        title: '体重',
        dataIndex: 'weight',
        key: 'weight',
        sorter: (a: { weight: number }, b: { weight: number }) => a.weight - b.weight,
        sortPriorityOrder: 2,
        sortDirections: ['ascend'],
      },
    ]);
    expect(sortStates.length).toEqual(1);
  });

  it('different sort directions', () => {
    const dataSource: any[] = [
      {
        key: '1',
        name: '列表文本',
        age: 13,
      },
      {
        key: '2',
        name: '列表文本2',
        age: 324,
      },
      {
        key: '3',
        name: '列表文本123',
        age: 43,
      },
    ];
    const sortColumns = [
      {
        title: '列标题1',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        ellipsis: true,
        width: 200,
        sortOrder: 'descend',
      },
      {
        title: '列标题2',
        dataIndex: 'age',
        key: 'age',
        sorter: (a: any, b: any) => a.age - b.age,
        sortOrder: 'ascend',
      },
    ];
    // @ts-ignore
    render(<Table dataSource={dataSource} columns={sortColumns} />);
    expect(screen.getAllByText('列表文本', { exact: false })).toHaveLength(3);
  });
});
