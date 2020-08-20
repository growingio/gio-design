import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = Array.from({ length: 10 }, (_, key) => ({
  key,
  a: '列表文本',
  b: '列表文本',
  c: '列表文本',
  d: '列表文本',
  e: '列表文本',
}));

const columns = [
  {
    title: '列表标题',
    dataIndex: 'a',
    key: 'a',
  },
  {
    title: '列表标题',
    dataIndex: 'b',
    key: 'b',
  },
  {
    title: '列表标题',
    dataIndex: 'c',
    key: 'c',
  },
  {
    title: '列表标题',
    dataIndex: 'd',
    key: 'd',
  },
];

export default () => (
  <Table title="固定高度" scroll={{ y: 200 }} dataSource={dataSource} columns={columns} pagination={false} />
);
