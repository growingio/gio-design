import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
  {
    key: '1',
    first: '列表文本最大字符字符字符的示例',
    second: '列表文本',
    third: '列表文本',
    fourth: '列表文本',
  },
  {
    key: '2',
    first: '列表文本最大字符字符字符的示例',
    second: '列表文本',
    third: '列表文本',
    fourth: '列表文本',
  },
];

const columns: any[] = [
  {
    title: '列标题',
    dataIndex: 'first',
    align: 'left',
    width: 200,
    ellipsis: true,
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
    title: '列标题',
    dataIndex: 'fourth',
    align: 'left',
  },
];

export default () => (
  <Table title="列表体-展示不全文案" dataSource={dataSource} columns={columns} pagination={false} rowSelection={{}} />
);
