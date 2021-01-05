import React from 'react';
import { Table } from '@gio-design/components';
import '@gio-design/components/es/components/table/style/index.css';
import { concat } from 'lodash';
import { CheckCircleFilled, CloseCircleFilled } from '@gio-design/icons';

const dataSource = [
  {
    key: '1',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    state: true,
    priority: 'A',
  },
  {
    key: '2',
    first: '列表文本',
    second: '列表文本',
    third: '列表文本',
    state: false,
    priority: 'B',
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
  const firstColumns = concat(columns, {
    dataIndex: 'state',
    title: '状态',
    align: 'center',
    render: (state: boolean) => {
      if (state) {
        return (
          <>
            <CheckCircleFilled color="rgb(19, 148, 88)" /> 成功
          </>
        );
      }
      return (
        <>
          <CloseCircleFilled color="rgb(233, 33, 35)" /> 失败
        </>
      );
    },
  });

  const secondColumns = concat(
    {
      dataIndex: 'priority',
      title: '优先级',
      align: 'center',
      render: (a) => (
        <>
          <CheckCircleFilled color="rgb(19, 148, 88)" /> {a}{' '}
        </>
      ),
    },
    columns
  );

  return (
    <>
      <Table title="列表表头-状态类型-居中对齐" dataSource={dataSource} columns={firstColumns} pagination={false} />
      <Table dataSource={dataSource} columns={secondColumns} pagination={false} />
    </>
  );
};
