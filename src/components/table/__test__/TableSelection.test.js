import React from 'react';
import { renderHook, act as hookACT } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useSelection, { getRowKey } from '../hook/useSelection';
import Table from '../index';
import { waitForComponentToPaint } from '../../../utils/test';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
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

describe('Testing Table rowSelection', () => {
  test('rowSelection display logic', () => {
    const { result, rerender } = renderHook(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      ({ dataSource, rowSelection, config }) => useSelection(dataSource, rowSelection, config),
      {
        initialProps: { dataSource, rowSelection: {}, config: {} },
      }
    );
    const oldResult = result.current[0]([]);
    expect(oldResult.length).toBe(1);
    hookACT(() => {
      rerender({ dataSource, rowSelection: undefined, config: {} });
    });
    const newResult = result.current[0]([]);
    expect(newResult.length).toBe(0);
  });

  test('onChange prop', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Table dataSource={dataSource} columns={columns} pagination={false} rowSelection={{ onChange }} />
    );
    expect(wrapper.find('.gio-checkbox-checked')).toHaveLength(0);
    act(() => {
      wrapper
        .find('.gio-checkbox-input')
        .at(0)
        .simulate('change', { target: { checked: true } });
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.gio-checkbox-checked')).toHaveLength(dataSource.length + 1);
    act(() => {
      wrapper
        .find('.gio-checkbox-input')
        .at(0)
        .simulate('change', { target: { checked: false } });
    });
    act(() => {
      wrapper
        .find('.gio-checkbox-input')
        .at(1)
        .simulate('change', { target: { checked: true } });
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.gio-checkbox-checked')).toHaveLength(2);
    act(() => {
      wrapper
        .find('.gio-checkbox-input')
        .at(1)
        .simulate('change', { target: { checked: false } });
    });
    expect(onChange).toBeCalledTimes(4);
  });

  test('getCheckboxProps prop', async () => {
    const getCheckboxProps = (record) => ({ disabled: record.key === '1' });
    const wrapper = mount(
      <Table dataSource={dataSource} columns={columns} pagination={false} rowSelection={{ getCheckboxProps }} />
    );
    act(() => {
      wrapper
        .find('.gio-checkbox-input')
        .at(1)
        .simulate('change', { target: { checked: true } });
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.gio-checkbox-checked')).toHaveLength(0);
    act(() => {
      wrapper
        .find('.gio-checkbox-input')
        .at(0)
        .simulate('change', { target: { checked: true } });
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.gio-checkbox-checked')).toHaveLength(dataSource.length);
  });

  test('getRowKey function', () => {
    const rowKeyUnset = getRowKey(dataSource[0], undefined);
    expect(rowKeyUnset).toBe('1');
    const rowKeyString = getRowKey(dataSource[0], 'age');
    expect(rowKeyString).toBe('1');
    const rowKeyString2 = getRowKey(dataSource[0], 'name');
    expect(rowKeyString2).toBe('胡彦斌');
    const rowKeyFunction = getRowKey(dataSource[0], (data) => data.weight.toString());
    expect(rowKeyFunction).toBe('70');
  });
});
