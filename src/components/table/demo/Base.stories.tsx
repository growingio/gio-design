import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import Table from '../index';
import Avatar from '../../avatar';

// eslint-disable-next-line import/prefer-default-export
export const Base: Story<TableProps<ExampleData>> = (args) => <Table {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: string;
  address: string;
}

const dataSource: ExampleData[] = [
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
    render: (text) => {
      return <Avatar>{text}</Avatar>;
    }
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
    filters: ['名字四个字', '名字不是四个字'],
    ellipsis: true,
    onFilter: (value: string, record: ExampleData) => {
      if (value === '名字四个字') {
        return record.name.length === 4;
      }
      if (value === '名字不是四个字') {
        return record.name.length !== 4;
      }
      return false;
    },
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
  },
];

Base.args = {
  columns,
  dataSource,
  pagination: false,
  title: '列表标题',
};
