import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

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
    fixed: 'right',
    width: 200,
  },
];

export default () => <Table title="搜索无结果" dataSource={dataSource} columns={columns} pagination={false} />;
