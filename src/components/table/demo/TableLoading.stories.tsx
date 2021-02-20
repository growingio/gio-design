/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import Table from '../index';

const dataSource: any[] = [
  {
    key: '1',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
  },
  {
    key: '2',
    name: '列表文本',
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
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
  },
];

// eslint-disable-next-line import/prefer-default-export
export const TableLoading: Story<TableProps<any>> = (args) => <Table {...args} />;

TableLoading.args = {
  columns,
  dataSource,
  pagination: false,
  title: '列表加载',
  loading: true,
};
