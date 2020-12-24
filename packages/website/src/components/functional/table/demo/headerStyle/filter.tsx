import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    depart: '开发',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    depart: '设计',
  },
  {
    key: '3',
    name: '航航',
    age: 18,
    depart: '开发',
  },
  {
    key: '4',
    name: '屁屁',
    age: 22,
    depart: '设计',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    filters: ['小孩子', '大人'],
    onFilter: (value, record) => {
      if (value === '小孩子') {
        return record.age <= 22;
      }
      if (value === '大人') {
        return record.age > 22;
      }
    },
  },
  {
    title: '部门',
    dataIndex: 'depart',
    key: 'depart',
    filters: ['设计', '开发'],
    defaultFilteredValue: ['开发'],
  },
];

export default () => <Table title="列表标题-过滤" dataSource={dataSource} columns={columns} pagination={false} />;
