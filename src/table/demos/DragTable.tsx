import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import DragTable from '../DragTable';

// eslint-disable-next-line import/prefer-default-export
export const DragColumns: Story<TableProps<ExampleData>> = (args) => <DragTable {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: string;
  address: string;
  phone: string;
}

const dataSource = [
  {
    key: '1',
    name: '列表文本1',
    age: '列表文本2',
    address: '列表文本3',
    phone: '列表文本4',
  },
  {
    key: '2',
    name: '列表文本1',
    age: '列表文本2',
    address: '列表文本3',
    phone: '列表文本4',
  },
  {
    key: '3',
    name: '列表文本1',
    age: '列表文本2',
    address: '列表文本3',
    phone: '列表文本4',
  },
];

const columns = [
  {
    title: '列标题1',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    info: '这里是用户的姓名',
    width: 300,
    fixed: 'left',
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
    width: 400,
    ellipsis: true,
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题4',
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    ellipsis: true,
  },
];

DragColumns.args = {
  columns: columns as any,
  dataSource,
  pagination: false,
  size: 'default',
  rowSelection: {
    getCheckboxProps: (record: any) => ({
      disabled: record.name === '列表文本2',
    }),
  },
};
