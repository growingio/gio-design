import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    depart: '设计',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园2号',
    depart: '设计',
  },
  {
    key: '3',
    name: '航航',
    age: 18,
    address: '西湖区湖底公园3号',
    depart: '开发',
  },
  {
    key: '4',
    name: '屁屁',
    age: 22,
    address: '西湖区湖底公园4号',
    depart: '开发',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    info: '这是一个解释',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '部门',
    dataIndex: 'depart',
    key: 'depart',
  },
];

export default () => (
  <Table
    dataSource={dataSource}
    columns={columns}
    rowSelection={{
      onChange: (localSelectedRowKeys: string[], selectRows: any[]) => {
        console.log(localSelectedRowKeys, selectRows);
      },
    }}
    pagination={false}
  />
);
