import React from 'react';
import { mount } from 'enzyme';
import Table from '../index';
import Title, { getNextSortDirection } from '../Title';
import { collectSortStates } from '../hook/useSorter';
import { collectFilterStates } from '../hook/useFilter';

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
];

describe('Testing Table Title', () => {
  // For List use AutoSizer.
  // AutoSizer uses offsetWidth and offsetHeight.
  // Jest runs in JSDom which doesn't support measurements APIs.
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 320 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 160 });
  });

  test('getNextSortDirection function', () => {
    expect(getNextSortDirection(['1', '2', null], '1')).toBe('2');
    expect(getNextSortDirection(['1', '2', null], '2')).toBe(null);
    expect(getNextSortDirection(['1', '2', null], null)).toBe('1');
  });

  test('Title component', async () => {
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

    // clear btn
    wrapper.find('.gio-select-option').at(0).simulate('click');
    expect(wrapper.find('.gio-checkbox-checked')).toHaveLength(1);
    wrapper.find('.filter-popover-footer').find('.gio-btn').at(0).simulate('click');
    expect(wrapper.find('.gio-checkbox-checked')).toHaveLength(0);

    // ok btn
    wrapper.find('.filter-popover-footer').find('.gio-btn').at(1).simulate('click');
    expect(updateFilterStates).toBeCalled();
    expect(onTriggerStateUpdate).toBeCalled();
    wrapper.setProps({ sorterState: undefined, filterState: undefined });
    expect(wrapper.exists('.gio-table-column-sorter')).toBe(false);
    expect(wrapper.exists('.gio-table-column-filter')).toBe(false);
  });

  it('should be reset after filter state update', () => {
    const dataSource = Array.from({ length: 100 }, (_, key) => ({ key }));
    const _columns = [
      {
        title: '数字',
        dataIndex: 'key',
        filters: ['奇数', '偶数'],
        onFilter: (value, record) => {
          if (value === '奇数') {
            return record.key % 2 === 1;
          }
          if (value === '偶数') {
            return record.key % 2 === 0;
          }
          return false;
        },
      },
    ];
    const wrapper = mount(<Table title="列表标题" dataSource={dataSource} columns={_columns} />);
    wrapper.find('.gio-pagination-item').at(5).simulate('click');
    expect(wrapper.find('.gio-pagination-item-active').text()).toBe('6');
    wrapper.find('.gio-table-column-filter-inner-btn').at(0).simulate('click');
    wrapper.find('.gio-select-option').at(0).simulate('click');
    wrapper.find('.filter-popover-footer').find('.gio-btn').at(1).simulate('click');
    expect(wrapper.find('.gio-pagination-item-active').text()).toBe('1');
  });
});
