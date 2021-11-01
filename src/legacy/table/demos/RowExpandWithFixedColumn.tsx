import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { MoreOutlined } from '@gio-design/icons';
import { TableProps } from '../interface';
import Table from '../index';

// eslint-disable-next-line import/prefer-default-export
export const RowExpandWithFixedColumn: Story<TableProps<ExampleData>> = (args) => <Table {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: string;
  address: string;
  description: string;
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
}

const dataSource = [
  {
    key: '1',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
    description: '我是一个例子我是一个例子我是一个例子我是一个例子',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: '列表文本',
    fifth: '列表文本',
  },
  {
    key: '2',
    name: '列表文本2',
    age: '列表文本',
    address: '列表文本',
    description: '我是一个例子我是一个例子我是一个例子我是一个例子',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: '列表文本',
    fifth: '列表文本',
  },
  {
    key: '3',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
    description: '我是一个例子我是一个例子我是一个例子我是一个例子',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: '列表文本',
    fifth: '列表文本',
  },
];

const columns = [
  {
    title: '列标题1',
    dataIndex: 'name',
    key: 'name',
    width: 300,
    fixed: 'left',
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
  {
    title: '列标题',
    dataIndex: 'first',
    key: 'first',
    width: 300,
  },
  {
    title: '列标题',
    dataIndex: 'second',
    key: 'second',
    width: 400,
  },
  {
    title: '列标题',
    dataIndex: 'third',
    key: 'third',
    width: 300,
  },
  {
    title: '列标题',
    dataIndex: 'fourth',
    key: 'fourth',
    width: 400,
  },
  {
    title: '列标题',
    dataIndex: 'fifth',
    key: 'fifth',
    width: 300,
  },
  {
    title: '操作',
    key: 'operate',
    align: 'center',
    fixed: 'right',
    width: 100,
    render: () => <MoreOutlined />,
  },
];

RowExpandWithFixedColumn.args = {
  columns: columns as any,
  dataSource,
  scroll: {
    x: 1200,
  },
  pagination: false,
  expandable: {
    expandedRowRender: (record) => record.description,
    rowExpandable: (record: any) => record.description,
  },
};
