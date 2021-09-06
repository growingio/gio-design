import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import Table from '../index';

// eslint-disable-next-line import/prefer-default-export
export const Base: Story<TableProps<ExampleData>> = (args) => <Table {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: string;
  address: string;
}

const dataSource = [
  {
    key: '1',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
  },
  {
    key: '2',
    name: '列表文本2',
    age: '列表文本',
    address: '列表文本',
  },
  {
    key: '3',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
  },
];

const columns = [
  {
    title: '列标题1',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    info: '这里是用户的姓名',
    filters: [
      { label: '名字四个字', value: '4' },
      { label: '名字不是四个字', value: '3' },
    ],
    onFilter: (value: string, record: ExampleData) => {
      if (value === '4') {
        return record.name.length === 4;
      }
      if (value === '3') {
        return record.name.length !== 4;
      }
      return false;
    },
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
];

Base.args = {
  columns,
  dataSource,
  pagination: false,
  rowSelection: {
    getCheckboxProps: (record: any) => ({
      disabled: record.name === '列表文本2',
    }),
    onChange: (e: any) => {
      console.log(e);
    },
  },
  size: 'default',
};
