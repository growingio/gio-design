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
    fixed: 'left',
    width: 200,
  },
  {
    title: '列表标题',
    dataIndex: 'b',
    key: 'b',
    width: 300,
  },
  {
    title: '列表标题',
    dataIndex: 'c',
    key: 'c',
    width: 300,
  },
  {
    title: '列表标题',
    dataIndex: 'd',
    key: 'd',
    width: 200,
  },
  {
    title: '列表标题',
    dataIndex: 'e',
    key: 'e',
    fixed: 'right',
    width: 200,
  },
];

export default () => (
  <Table title="固定表头" scroll={{ x: 1100 }} dataSource={dataSource} columns={columns} pagination={false} />
);
