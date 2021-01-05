import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
  {
    key: '1',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: '2020/12/12',
  },
  {
    key: '2',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    fourth: '2020/12/12',
  },
];

const columns: any[] = [
  {
    title: '列标题',
    dataIndex: 'first',
    align: 'left',
  },
  {
    title: '列标题',
    dataIndex: 'second',
    align: 'left',
  },
  {
    title: '列标题',
    dataIndex: 'third',
    align: 'left',
  },
  {
    title: '日期',
    dataIndex: 'fourth',
    align: 'center',
  },
];

export default () => (
  <>
    <Table title="列表表头-固定长度字符串-居中对齐" dataSource={dataSource} columns={columns} pagination={false} />
    <Table dataSource={dataSource} columns={columns} pagination={false} showIndex />
  </>
);
