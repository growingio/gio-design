import React, { useState } from 'react';
import { Table, Button } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';
import './index.less';

const dataSource: any[] = [
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
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
  },
];

export default () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Table loading={loading} title="列表加载" dataSource={dataSource} columns={columns} pagination={false} />
      <Button onClick={() => setLoading(!loading)}>click me</Button>
    </>
  );
};
