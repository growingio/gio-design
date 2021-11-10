import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, fireEvent, screen } from '@testing-library/react';
import { isEqual, cloneDeep } from 'lodash';
import { DesignContext, DefaultContextProps } from '@gio-design/utils';
import enUS from '../../../locales/en-US';
import useFilter, { collectFilterStates } from '../hook/useFilter';
import FilterPopover from '../FilterPopover';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    filters: ['名字俩字', '名字仨字'],
    onFilter: (value: string, record: { name: string | any[] }) => {
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
        onFilter: (value: string, record: { age: number }) => {
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
    height: 180,
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    weight: 60,
    height: 170,
  },
  {
    key: '3',
    name: '航航',
    age: 18,
    weight: 70,
    height: 200,
  },
  {
    key: '4',
    name: '屁屁',
    age: 22,
    weight: 60,
    height: 210,
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
    const { result } = renderHook(({ columns, dataSource }) => useFilter(columns, dataSource), {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        filteredKeys: [60],
      });
    });
    expect(result.current[2].length).toBe(1);
  });

  test('object data type', () => {
    const onClick = jest.fn();
    const { getByText, getAllByRole, container, rerender } = render(
      <FilterPopover
        prefixCls="gio-table"
        values={[]}
        onClick={onClick}
        filters={[
          { label: '第一项', value: '1' },
          { label: '第二项', value: '2' },
        ]}
      >
        <span>trigger</span>
      </FilterPopover>
    );
    fireEvent.click(getByText('trigger'));
    fireEvent.click(getAllByRole('option')[0]);
    fireEvent.click(getByText('确 定'));
    expect(onClick).toBeCalledWith(['1']);

    fireEvent.click(getByText('trigger'));
    fireEvent.click(getAllByRole('option')[0]);
    // 不点确定 并关掉 Filter
    fireEvent.click(getByText('trigger'));
    // 再打开
    fireEvent.click(getByText('trigger'));
    expect(container.getElementsByClassName('gio-checkbox-checked')).toBeTruthy();

    rerender(
      <DesignContext.Provider value={{ ...DefaultContextProps, locale: enUS }}>
        <FilterPopover
          prefixCls="gio-table"
          values={[]}
          onClick={onClick}
          filters={[
            { label: '第一项', value: '1' },
            { label: '第二项', value: '2' },
          ]}
        >
          <span>trigger</span>
        </FilterPopover>
      </DesignContext.Provider>
    );
    fireEvent.click(getByText('trigger'));
    expect(screen.getByText('Confirm')).toBeTruthy();
    expect(screen.getByText('Clear')).toBeTruthy();
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
          // eslint-disable-next-line no-param-reassign
          column.key = `#${column.key}`;
          return column;
        }),
        dataSource,
      });
    });

    const [newSortStates] = result.current;
    expect(isEqual(oldSortStates, newSortStates)).toBe(false);
  });

  it('no column to filter', () => {
    const filterStates = collectFilterStates();
    expect(filterStates.length).toEqual(0);
  });

  it('filter with default filtered', () => {
    const column = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '身高',
        dataIndex: 'height',
        key: 'height',
        filters: ['两米以下', '两米以上'],
        onFilter: (value: string, record: { height: number }) => {
          if (value === '两米以下') {
            return record.height < 200;
          }
          if (value === '两米以上') {
            return record.height >= 200;
          }
          return false;
        },
        defaultFilteredValue: ['两米以下'],
        filteredValue: ['两米以下'],
      },
    ];
    const dataSourse = [
      {
        key: '1',
        name: '胡彦斌',
        height: 180,
      },
      {
        key: '2',
        name: '胡彦祖',
        height: 210,
      },
    ];
    const { result } = renderHook(() => useFilter(column, dataSourse));
    const [filterStates, updateFilterStates, filtedData] = result.current;
    updateFilterStates({
      ...filterStates[0],
      filteredKeys: ['两米以下'],
    });
    expect(filtedData.length).toEqual(1);
  });
});
