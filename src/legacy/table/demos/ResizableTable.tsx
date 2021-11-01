import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import ResizableTable from '../ResizableTable';

// eslint-disable-next-line import/prefer-default-export
export const ResizableWithTable: Story<TableProps<ExampleData>> = (args) => <ResizableTable {...args} />;

interface ExampleData {
  key: string;
  name: string;
  age: string;
  address: string;
  sex: string;
  phone: number;
  attr1: string;
  attr2: string;
  attr3: string;
  attr4: string;
  attr5: string;
  attr6: string;
  attr7: string;
  attr8: string;
}

const dataSource = [
  {
    key: '1',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
    sex: 'man',
    phone: 1234,
    attr1: '123',
    attr2: '123',
    attr3: '123',
    attr4: '123',
    attr5: '123',
    attr6: '123',
    attr7: '123',
    attr8: '123',
  },
  {
    key: '2',
    name: '列表文本2',
    age: '列表文本',
    address: '列表文本',
    sex: 'man',
    phone: 1234,
    attr1: '123',
    attr2: '123',
    attr3: '123',
    attr4: '123',
    attr5: '123',
    attr6: '123',
    attr7: '123',
    attr8: '123',
  },
  {
    key: '3',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
    sex: 'man',
    phone: 1234,
    attr1: '123',
    attr2: '123',
    attr3: '123',
    attr4: '123',
    attr5: '123',
    attr6: '123',
    attr7: '123',
    attr8: '123',
  },
];

const columns = [
  {
    title: '列标题1',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    info: '这里是用户的姓名',
    width: 300,
    filters: [
      { label: '名字四个字', value: '4' },
      { label: '名字不是四个字', value: '3' },
    ],
    onFilter: (value: string, record: ExampleData) => {
      if (value === '4') {
        return record.name.length === 4;
      }
      if (value === '3') {
        return record.name.length !== 4;
      }
      return false;
    },
    fixed: 'left',
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题4',
    dataIndex: 'sex',
    key: 'sex',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题5',
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题6',
    dataIndex: 'attr1',
    key: 'attr1',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题7',
    dataIndex: 'attr2',
    key: 'attr2',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题8',
    dataIndex: 'attr3',
    key: 'attr3',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题9',
    dataIndex: 'attr4',
    key: 'attr4',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题10',
    dataIndex: 'attr5',
    key: 'attr5',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题11',
    dataIndex: 'attr6',
    key: 'attr6',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题12',
    dataIndex: 'attr7',
    key: 'attr7',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题13',
    dataIndex: 'attr8',
    key: 'attr8',
    width: 200,
    ellipsis: true,
    fixed: 'right',
  },
];

ResizableWithTable.args = {
  columns: columns as any,
  dataSource,
  pagination: false,
  rowSelection: {
    getCheckboxProps: (record: any) => ({
      disabled: record.name === '列表文本2',
    }),
    onChange: (e: any) => {
      console.log(e);
    },
  },
  scroll: {
    x: 1200,
  },
};
