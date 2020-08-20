import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
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
    info: '这是列标题1',
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
    info: '这是列标题2',
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
    info: '这是列标题3',
  },
];

export default () => <Table title="列表标题-提示" dataSource={dataSource} columns={columns} pagination={false} />;
