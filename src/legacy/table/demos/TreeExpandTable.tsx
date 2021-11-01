import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import Table from '../index';

// eslint-disable-next-line import/prefer-default-export
export const TreeExpandTable: Story<TableProps<ExampleData>> = (args) => <Table {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: number;
  address: string;
}

const dataSource = [
  {
    key: '1',
    name: '列表文本',
    age: 56,
    address: '列表文本',
    children: [
      {
        key: '11',
        name: '列表文本expanded',
        age: 34,
        address: '列表文本expanded',
        children: [
          {
            key: '21',
            name: '列表文本expanded',
            age: 12,
            address: '列表文本expanded',
          },
          {
            key: '22',
            name: '列表文本expanded',
            age: 14,
            address: '列表文本expanded',
          },
          {
            key: '23',
            name: '列表文本expanded',
            age: 16,
            address: '列表文本expanded',
          },
        ],
      },
      {
        key: '12',
        name: '列表文本expanded',
        age: 32,
        address: '列表文本expanded',
      },
      {
        key: '13',
        name: '列表文本expanded',
        age: 23,
        address: '列表文本expanded',
      },
    ],
  },
  {
    key: '2',
    name: '列表文本2',
    age: 78,
    address: '列表文本',
  },
  {
    key: '3',
    name: '列表文本',
    age: 65,
    address: '列表文本',
  },
];

const columns = [
  {
    title: '列标题1',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
    width: 400,
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
    width: 200,
    ellipsis: true,
  },
];

TreeExpandTable.args = {
  columns,
  dataSource,
  pagination: false,
  rowSelection: {
    onChange: (keys) => keys,
  },
};
