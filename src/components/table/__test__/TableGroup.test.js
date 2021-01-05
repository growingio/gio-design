import React from 'react';
import { mount } from 'enzyme';
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
    ],
  },
];

describe('Testing columns group', () => {
  const getTable = () => <Table title="列表分组" dataSource={dataSource} columns={columns} pagination={false} />;
  test('colum children', () => {
    const wrapper = mount(getTable());
    expect(wrapper.find('.gio-table-thead').find('tr')).toHaveLength(2);
    expect(wrapper.find('th')).toHaveLength(4);
  });
});
