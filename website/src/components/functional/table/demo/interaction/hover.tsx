import React from 'react';
import { Table, Button } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';
import { concat } from 'lodash';
import { MoreOutlined } from '@gio-design/icons';

const dataSource = [
  {
    key: '1',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
  },
  {
    key: '2',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
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
];

export default () => {
  const secondColumns = concat(columns, {
    title: '操作',
    key: 'operate',
    align: 'center',
    render: () => <Button type="text" icon={<MoreOutlined />} />,
  });
  return (
    <>
      <Table title="Hover" dataSource={dataSource} columns={columns} pagination={false} />
      <Table dataSource={dataSource} columns={secondColumns} pagination={false} />
    </>
  );
};
