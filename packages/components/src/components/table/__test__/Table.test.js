import React from 'react';
import { mount, render } from 'enzyme';
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
    sorter: (a, b) => a.name.length - b.name.length,
    filters: ['名字俩字', '名字仨字'],
    onFilter: (value, record) => {
      if (value === '名字俩字') {
        return record.name.length === 2;
      }
      if (value === '名字仨字') {
        return record.name.length === 3;
      }
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

  test('when dataSource update and page count less than current, pagination reset', () => {
    const data10 = Array.from({ length: 10 }, (_, key) => ({ a: key, key }));
    const data20 = Array.from({ length: 20 }, (_, key) => ({ a: key, key }));

    const wrapper = mount(
      <Table
        title="列表标题"
        dataSource={data20}
        columns={[
          {
            title: 'a',
            dataIndex: 'a',
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
    );
    // update
    wrapper.find('.gio-pagination-item').at(3).simulate('click');
    wrapper.setProps({ dataSource: data10 });
    expect(() => {
      expect(wrapper.find('.gio-pagination-item').first().text()).toBe('1');
      expect(wrapper.find('.gio-pagination-total-text').first().text()).toBe(`总共 ${Number(10).toLocaleString()} 条`);
    });
    // not update
    wrapper.find('.gio-pagination-item').at(1).simulate('click');
    wrapper.setProps({ dataSource: data20 });
    expect(() => {
      expect(wrapper.find('.gio-pagination-item-active').first().text()).toBe('2');
      expect(wrapper.find('.gio-pagination-total-text').first().text()).toBe(`总共 ${Number(20).toLocaleString()} 条`);
    });
  });
});
