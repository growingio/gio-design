import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '北京市朝阳区望京1号',
    depart: '开发',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '北京市朝阳区望京2号',
    depart: '设计',
  },
  {
    key: '3',
    name: '航航',
    age: 18,
    address: '北京市朝阳区望京3号',
    depart: '开发',
  },
  {
    key: '4',
    name: '屁屁',
    age: 22,
    address: '北京市朝阳区望京4号',
    depart: '设计',
  },
];

const columns = [
  {
    title: '姓名（右对齐）',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'right',
    width: 200,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
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

export default () => (
  <Table scroll={{ x: 1100, y: 200 }} dataSource={dataSource} columns={columns} pagination={false} />
);
