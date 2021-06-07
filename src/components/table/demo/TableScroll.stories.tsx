/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { MoreOutlined } from '@gio-design/icons';
import { TableProps } from '../interface';
import Table from '../index';

const dataSource = [
  {
    key: '1',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
  },
  {
    key: '2',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
  },
  {
    key: '3',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
  },
  {
    key: '4',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
  },
  {
    key: '5',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
  },
];

const columns: any[] = [
  {
    title: '列标题',
    dataIndex: 'first',
    align: 'left',
    width: 300,
  },
  {
    title: '列标题',
    dataIndex: 'second',
    align: 'left',
    width: 300,
    ellipsis: true,
  },
  {
    title: '列标题',
    dataIndex: 'third',
    align: 'left',
    width: 400,
  },
  {
    title: '操作',
    key: 'operate',
    align: 'center',
    fixed: 'right',
    width: 60,
    render: () => <MoreOutlined />,
  },
];

// eslint-disable-next-line import/prefer-default-export
export const TableScroll: Story<TableProps<Record<string, unknown>> & { fixed: 'left' | 'right' }> = (args) => {
  const { fixed, columns: argsColumns = [], ...rest } = args;
  argsColumns[0].fixed = fixed;
  argsColumns[1].fixed = fixed;
  return <Table columns={argsColumns} {...rest} />;
};

TableScroll.args = {
  columns,
  dataSource,
  pagination: false,
  scroll: { x: 900, y: 200 },
  fixed: 'left',
  title: '滚动',
  style: { width: 900 },
};
