import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    weight: 70,
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    weight: 60,
  },
  {
    key: '3',
    name: '航航',
    age: 18,
    weight: 70,
  },
  {
    key: '4',
    name: '屁屁',
    age: 22,
    weight: 60,
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    info: '这里是用户的姓名',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    info: '这里是用户的年龄',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '体重',
    dataIndex: 'weight',
    key: 'weight',
    info: '这里是用户的体重',
    sorter: (a, b) => a.weight - b.weight,
    sortPriorityOrder: 2,
  },
];

const columns2 = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    info: '这里是用户的姓名',
    filters: ['名字俩字', '名字仨字'],
    onFilter: (value, record) => {
      if (value === '名字俩字') {
        return record.name.length === 2;
      }
      if (value === '名字仨字') {
        return record.name.length === 3;
      }
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    ellipsis: true,
    info: '这里是用户的年龄',
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
    title: '体重',
    dataIndex: 'weight',
    key: 'weight',
    info: '这里是用户的体重',
    sortPriorityOrder: 2,
    filters: [60, 70],
    onFilter: (value, record) => {
      if (value === 60) {
        return record.weight === 60;
      }
      if (value === 70) {
        return record.weight === 70;
      }
    },
  },
];

const columns3 = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    info: '这里是用户的姓名',
    sorter: (a, b) => a.name.length - b.name.length,
    filters: ['名字俩字', '名字仨字'],
    onFilter: (value, record) => {
      if (value === '名字俩字') {
        return record.name.length === 2;
      }
      if (value === '名字仨字') {
        return record.name.length === 3;
      }
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    info: '这里是用户的年龄',
    sorter: (a, b) => a.age - b.age,
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
    title: '体重',
    dataIndex: 'weight',
    key: 'weight',
    sorter: (a, b) => a.weight - b.weight,
    info: '这里是用户的体重',
    sortPriorityOrder: 2,
    filters: [60, 70],
    onFilter: (value, record) => {
      if (value === 60) {
        return record.weight === 60;
      }
      if (value === 70) {
        return record.weight === 70;
      }
    },
  },
];

export default () => (
  <>
    <Table title="列表标题-多辅助控件" dataSource={dataSource} columns={columns} pagination={false} />
    <Table dataSource={dataSource} columns={columns2} pagination={false} />
    <Table dataSource={dataSource} columns={columns3} pagination={false} />
  </>
);
