import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import Table from '../index';

// eslint-disable-next-line import/prefer-default-export
export const RowExpandTable: Story<TableProps<ExampleData>> = (args) => <Table {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: string;
  address: string;
  description: string;
}

const dataSource = [
  {
    key: '1',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
    description: '我是一个例子我是一个例子我是一个例子我是一个例子',
  },
  {
    key: '2',
    name: '列表文本2',
    age: '列表文本',
    address: '列表文本',
    description: '',
  },
  {
    key: '3',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
    description: '',
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

RowExpandTable.args = {
  columns,
  dataSource,
  pagination: false,
  expandable: {
    expandedRowRender: (record) => record.description,
    rowExpandable: (record: any) => record.description,
  },
};
