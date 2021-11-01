/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { TableProps } from '../interface';
import { PaginationProps } from '../../legacy/pagination/interface';
import Table from '../index';

const dataSource = Array.from({ length: 1000 }, (_, key) => ({ a: key, b: key, c: key, d: key }));

const columns = [
  {
    title: 'A',
    dataIndex: 'a',
    key: 'a',
    sorter: (a: any, b: any) => a.a - b.a,
  },
  {
    title: 'B',
    dataIndex: 'b',
    key: 'b',
  },
  {
    title: 'C',
    dataIndex: 'c',
    key: 'c',
  },
];

// eslint-disable-next-line import/prefer-default-export
export const TablePagination: Story<TableProps<any> & PaginationProps> = (args) => {
  const { showSizeChanger, showQuickJumper, ...rest } = args;
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record: any) => record.a.toString()}
      onRow={() => ({
        onClick: () => {
          // Click Checkbox will not be called
          // eslint-disable-next-line no-console
          console.log('on row click');
        },
      })}
      onChange={(p, s, f) => {
        // eslint-disable-next-line no-console
        console.log(p, s, f);
      }}
      pagination={{
        showSizeChanger,
        showQuickJumper,
      }}
      rowSelection={{
        getCheckboxProps: (record: any) => ({
          disabled: record.a === 1,
          title: record.a,
        }),
      }}
      {...rest}
    />
  );
};

TablePagination.args = {
  showSizeChanger: true,
  showQuickJumper: true,
};
