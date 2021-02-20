/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import Table from '../index';

const dataSource: any[] = [];

const columns = [
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 300,
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    width: 300,
  },
  {
    title: '部门',
    dataIndex: 'depart',
    key: 'depart',
    fixed: 'right' as const,
    width: 200,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const TableEmpty: Story<TableProps<any>> = (args) => <Table {...args} />;

TableEmpty.args = {
  columns,
  dataSource,
  pagination: false,
  title: '搜索无结果',
  emptyText: '自定义内容，可以是ReactNode',
};
