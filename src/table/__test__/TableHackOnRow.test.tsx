import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useHackOnRow from '../hook/useHackOnRow';
import Table from '../index';

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

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    info: '这里是用户的姓名',
    sorter: (a: { name: string | any[] }, b: { name: string | any[] }) => a.name.length - b.name.length,
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
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    info: '这里是用户的年龄',
    sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
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
    sorter: (a: { weight: number }, b: { weight: number }) => a.weight - b.weight,
    info: '这里是用户的体重',
    sortPriorityOrder: 2,
    filters: [60, 70],
    onFilter: (value: number, record: { weight: number }) => {
      if (value === 60) {
        return record.weight === 60;
      }
      if (value === 70) {
        return record.weight === 70;
      }
      return false;
    },
  },
];

describe('Testing useHackonRow', () => {
  it('useHackOnRow hook', () => {
    const onClick = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const { container } = render(
      <Table
        dataSource={dataSource}
        columns={columns as any}
        pagination={false}
        hackRowEvent
        onRow={() => ({ onClick, onMouseUp, onMouseDown })}
      />
    );
    fireEvent.click(container.getElementsByClassName('gio-table-row')[0]);
    fireEvent.mouseUp(container.getElementsByClassName('gio-table-row')[0]);
    fireEvent.mouseDown(container.getElementsByClassName('gio-table-row')[0]);
    expect(onClick).toBeCalled();
    expect(onMouseUp).toBeCalled();
    expect(onMouseDown).toBeCalled();
  });

  it('won`t trigger onRow click', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Table
        dataSource={dataSource}
        columns={columns as any}
        pagination={false}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        rowSelection={}
        onRow={() => ({ className: 'gio-row' })}
        onHeaderRow={() => ({ onClick })}
        hackRowEvent
      />
    );

    fireEvent.click(container.getElementsByClassName('gio-checkbox-input')[0]);
    fireEvent.click(container.getElementsByClassName('gio-checkbox-input')[1]);

    expect(onClick).not.toBeCalled();
    fireEvent.click(container.getElementsByClassName('gio-table-cell')[1]);
    expect(onClick).toBeCalled();
  });

  it('onRow to be undefined', () => {
    const { result } = renderHook(() => useHackOnRow(undefined, true));
    expect(result.current([])).toEqual({});
  });

  it('return onRow', () => {
    const { result } = renderHook(() => useHackOnRow((record) => record, false));
    expect(result.current('abc')).toEqual('abc');
  });

  it('onRow without action', () => {
    const onClick = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const { container } = render(
      <Table
        dataSource={dataSource}
        columns={columns as any}
        pagination={false}
        hackRowEvent
        onRow={() => ({ className: 'gio-hackRow' })}
      />
    );
    fireEvent.click(container.getElementsByClassName('gio-table-row')[0]);
    fireEvent.mouseUp(container.getElementsByClassName('gio-table-row')[0]);
    fireEvent.mouseDown(container.getElementsByClassName('gio-table-row')[1]);
    expect(onClick).not.toBeCalled();
    expect(onMouseUp).not.toBeCalled();
    expect(onMouseDown).not.toBeCalled();
  });

  it('click mouse to move', () => {
    const record = {};
    const { result } = renderHook(() => useHackOnRow(() => ({ className: 'gio-onRow' }), true));
    const { onClick, onMouseDown, onMouseUp } = result.current(record);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onMouseDown({ clientX: 30, clientY: 30 });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onMouseUp({ clientX: 50, clientY: 50 });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onClick({ clientX: 50, clientY: 50 });
  });
});
