import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import Table from '../index';

const expandedRowRender = () => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      key: 'state',
      render: () => <span>Finished</span>,
    },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  ];

  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

// eslint-disable-next-line import/prefer-default-export
export const ExpandWithTable: Story<TableProps<ExampleData>> = (args) => <Table {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: string;
  address: string;
}

const dataSource = [
  {
    key: '1',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
  },
  {
    key: '2',
    name: '列表文本2',
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
    ellipsis: true,
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
    width: 400,
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
    width: 200,
    ellipsis: true,
  },
];

ExpandWithTable.args = {
  columns,
  dataSource,
  pagination: false,
  expandable: {
    expandedRowRender,
    rowExpandable: (record: any) => record.key === '1',
  },
};
