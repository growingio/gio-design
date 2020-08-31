import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

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
];

const columns: any[] = [
  {
    key: 'first',
    title: '列标题',
    dataIndex: 'first',
    align: 'left',
    filters: ['列表文本'],
  },
  {
    key: 'second',
    title: '列标题',
    dataIndex: 'second',
    align: 'left',
    filters: ['列表文本'],
  },
  {
    key: 'third',
    title: '列标题',
    dataIndex: 'third',
    align: 'left',
    filters: ['列表文本'],
  },
];

export default () => <Table title="过滤" dataSource={dataSource} columns={columns} pagination={false} />;
