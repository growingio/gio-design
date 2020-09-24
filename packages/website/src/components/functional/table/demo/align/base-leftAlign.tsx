import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';

const dataSource = [
  {
    key: '1',
    name: '用户量',
    desc: '对网站、App、小程序有过访问的独立用户数量',
  },
  {
    key: '2',
    name: '胡彦祖',
    desc: '用户实际浏览过的网页数量，简称 PV',
  },
];

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    width: 200,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    align: 'left',
    width: 300,
  },
];

export default () => <Table title="列表体-常规-左对齐" dataSource={dataSource} columns={columns} pagination={false} />;
