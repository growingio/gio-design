import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
  {
    key: '1',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: 35.34,
  },
  {
    key: '2',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: 23.02,
  },
];

const columns: any[] = [
  {
    title: '列标题',
    dataIndex: 'first',
    align: 'left',
  },
  {
    title: '列标题',
    dataIndex: 'second',
    align: 'left',
  },
  {
    title: '列标题',
    dataIndex: 'third',
    align: 'left',
  },
  {
    title: '金额（元）',
    dataIndex: 'fourth',
    align: 'right',
  },
];

export default () => (
  <Table title="列表表头-可比较字符-右对齐" dataSource={dataSource} columns={columns} pagination={false} />
);
