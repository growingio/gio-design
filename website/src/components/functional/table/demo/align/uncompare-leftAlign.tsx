import React from 'react';
import { Table, Link } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';
import '@gio-design/components/es/components/link/style/css.js';

const dataSource = [
  {
    key: '1',
    name: '928119384',
    creator: '李某某',
  },
  {
    key: '2',
    name: '8361',
    creator: '王某某',
  },
];

const columns = [
  {
    title: '分群名称',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    width: 200,
    render: (text: string) => <Link to="/">{text}</Link>,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    align: 'left',
    width: 300,
  },
];

export default () => (
  <Table title="列表表头-非比较型-左对齐" dataSource={dataSource} columns={columns} pagination={false} />
);
