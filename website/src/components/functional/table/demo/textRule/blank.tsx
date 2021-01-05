import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';
import { cloneDeep } from 'lodash';

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
  {
    title: '金额（元）',
    dataIndex: 'fourth',
    align: 'right',
  },
];

export default () => {
  const firstData = cloneDeep(dataSource).map((item: any) => {
    item.fourth = 35.34;
    return item;
  });
  const secondData = cloneDeep(dataSource).map((item: any) => {
    item.fourth = 0;
    return item;
  });
  const thirdData = cloneDeep(dataSource).map((item: any) => {
    item.fourth = '-';
    return item;
  });

  return (
    <>
      <Table title="列表体-空白格内容" dataSource={firstData} columns={columns} pagination={false} rowSelection={{}} />
      <Table dataSource={secondData} columns={columns} pagination={false} />
      <Table dataSource={thirdData} columns={columns} pagination={false} />
    </>
  );
};
