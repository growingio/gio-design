import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';
import { cloneDeep, concat } from 'lodash';
import { More } from '@gio-design/icons';

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
  {
    key: '3',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
  },
  {
    key: '4',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
  },
  {
    key: '5',
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
    width: 300,
  },
  {
    title: '列标题',
    dataIndex: 'second',
    align: 'left',
    width: 300,
  },
  {
    title: '列标题',
    dataIndex: 'third',
    align: 'left',
    width: 400,
  },
];

export default () => {
  const secondColumns = cloneDeep(columns);
  secondColumns[0].fixed = 'left';
  const thirdColumns = concat(secondColumns, {
    title: '操作',
    key: 'operate',
    align: 'center',
    fixed: 'right',
    width: 60,
    render: () => <More />,
  });
  return (
    <>
      <Table scroll={{ y: 200 }} title="滚动" dataSource={dataSource} columns={columns} pagination={false} />
      <Table scroll={{ x: 800 }} dataSource={dataSource} columns={secondColumns} pagination={false} />
      <Table scroll={{ x: 800 }} dataSource={dataSource} columns={thirdColumns} pagination={false} />
    </>
  );
};
