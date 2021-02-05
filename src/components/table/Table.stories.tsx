import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './Table.mdx';
import Table from './index';
import { TableProps } from './interface';
import './style';

export default {
  title: 'Functional Components/Table',
  component: Table,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<TableProps<ExampleData>> = (args) => <Table {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: string;
  address: string;
}

const dataSource: ExampleData[] = [
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
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
    filters: ['名字四个字', '名字不是四个字'],
    ellipsis: true,
    onFilter: (value: string, record: ExampleData) => {
      if (value === '名字四个字') {
        return record.name.length === 4;
      }
      if (value === '名字不是四个字') {
        return record.name.length !== 4;
      }
      return false;
    },
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
  },
];

export const Default = Template.bind({});
Default.args = {
  columns,
  dataSource,
  pagination: false,
};
