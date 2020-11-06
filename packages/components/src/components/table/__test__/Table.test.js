import React from 'react';
import { mount, render } from 'enzyme';
import Table from '../index';
import Title, { getNextSortDirection } from '../Title';
import { collectSortStates } from '../hook/useSorter';
import { collectFilterStates } from '../hook/useFilter';

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
    sorter: (a, b) => a.name.length - b.name.length,
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
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    info: '这里是用户的年龄',
    sorter: (a, b) => a.age - b.age,
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
    sorter: (a, b) => a.weight - b.weight,
    info: '这里是用户的体重',
    sortPriorityOrder: 2,
    filters: [60, 70],
    onFilter: (value, record) => {
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

describe('Testing Table', () => {
  const getTable = () => <Table title="列表标题" dataSource={dataSource} columns={columns} pagination={false} />;

  it('should be stable', () => {
    const wrapper = render(getTable());
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(getTable());
      wrapper.setProps({ title: '列表标题设置' });
      wrapper.setProps({ pagination: true });
      wrapper.setProps({
        rowSelection: {
          onChange: (localSelectedRowKeys, selectRows) => {
            console.log(localSelectedRowKeys, selectRows);
          },
        },
      });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props prefixCls', () => {
    const wrapper = mount(getTable());
    wrapper.setProps({ prefixCls: 'gio-table-custom' });
    expect(wrapper.exists('.gio-table-custom')).toBe(true);
    expect(wrapper.exists('.gio-table')).toBe(false);
  });

  test('props className', () => {
    const wrapper = mount(getTable());
    wrapper.setProps({ className: 'custom-classname' });
    expect(wrapper.exists('.custom-classname')).toBe(true);
  });

  test('props title', () => {
    const wrapper = mount(getTable());
    expect(wrapper.exists('.gio-table-title')).toBe(true);
    expect(wrapper.find('.gio-table-title').at(0).text()).toBe('列表标题');
  });

  test('props pagination', () => {
    const wrapper = mount(getTable());
    wrapper.setProps({ pagination: true });
    expect(wrapper.exists('.gio-table-pagination')).toBe(true);
  });

  it('should be render rightly', () => {
    const wrapper = mount(getTable());
    expect(wrapper.exists('.gio-table-title')).toBe(true);
    expect(wrapper.exists('.gio-table-column-title-info')).toBe(true);
    expect(wrapper.exists('.gio-table-column-filter')).toBe(true);
    expect(wrapper.exists('.gio-table-column-sorter')).toBe(true);
  });

  test('column key rule', () => {/**/});

  test('getNextSortDirection function', () => {
    expect(getNextSortDirection(['1', '2', null], '1')).toBe('2');
    expect(getNextSortDirection(['1', '2', null], '2')).toBe(null);
    expect(getNextSortDirection(['1', '2', null], null)).toBe('1');
  });

  test('Title component', () => {
    const updateSorterStates = jest.fn();
    const updateFilterStates = jest.fn();
    const onTriggerStateUpdate = jest.fn();
    const wrapper = mount(
      <Title
        prefixCls="gio-table"
        sorterState={collectSortStates(columns)[0]}
        filterState={collectFilterStates(columns)[0]}
        column={columns[0]}
        updateSorterStates={updateSorterStates}
        updateFilterStates={updateFilterStates}
        onTriggerStateUpdate={onTriggerStateUpdate}
      />
    );

    expect(wrapper.exists('.gio-table-column-sorter')).toBe(true);
    expect(wrapper.exists('.gio-table-column-filter')).toBe(true);
    expect(wrapper.exists('.gio-table-column-title-info')).toBe(true);
    wrapper.find('.gio-table-column-sorter-inner-btn').at(0).simulate('click');
    expect(updateSorterStates).toBeCalled();
    wrapper.find('.gio-table-column-filter-inner-btn').at(0).simulate('click');
    expect(wrapper.exists('.gio-popover')).toBe(true);
    wrapper.find('.gio-checkbox-inner').at(0).simulate('click');
    wrapper.find('.gio-checkbox-inner').at(0).simulate('click');
    wrapper.find('.gio-popover-inner-footer').at(0).find('.gio-btn').simulate('click');
    expect(updateFilterStates).toBeCalled();
    expect(onTriggerStateUpdate).toBeCalled();
    wrapper.setProps({ sorterState: undefined, filterState: undefined });
    expect(wrapper.exists('.gio-table-column-sorter')).toBe(false);
    expect(wrapper.exists('.gio-table-column-filter')).toBe(false);
  });
});
