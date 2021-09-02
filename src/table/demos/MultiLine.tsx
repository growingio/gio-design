import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import Table from '../index';

// eslint-disable-next-line import/prefer-default-export
export const MultiLine: Story<TableProps<ExampleData>> = (args) => <Table {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: number;
  address: string;
  depart: string;
}

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    depart: '设计',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园2号',
    depart: '设计',
  },
  {
    key: '3',
    name: '航航',
    age: 18,
    address: '西湖区湖底公园3号',
    depart: '开发',
  },
  {
    key: '4',
    name: '屁屁',
    age: 22,
    address: '西湖区湖底公园4号',
    depart: '开发',
  },
];

const columns = [
  {
    title: '个人信息',
    children: [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
    ],
  },
  {
    title: '社会信息',
    children: [
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '部门',
        dataIndex: 'depart',
        key: 'depart',
      },
    ],
  },
];

MultiLine.args = {
  columns,
  dataSource,
  pagination: false,
};
