import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = Array.from({ length: 1000 }, (_, key) => ({ key, a: key, b: key, c: key, d: key }));

const columns = [
  {
    title: 'A',
    dataIndex: 'a',
    key: 'a',
    width: 200,
  },
  {
    title: 'B',
    dataIndex: 'b',
    key: 'b',
    width: 200,
  },
  {
    title: 'C',
    dataIndex: 'c',
    key: 'c',
    width: 200,
  },
  {
    title: 'D',
    dataIndex: 'd',
    key: 'd',
    width: 200,
  },
];

export default () => <Table dataSource={dataSource} columns={columns} />;
