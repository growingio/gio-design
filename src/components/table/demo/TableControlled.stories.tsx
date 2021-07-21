/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { SortOrder } from '../interface';
import Table from '../index';

const dataSource = Array.from({ length: 1000 }, (_, key) => ({ a: key, b: key, c: key, d: key }));

const ControlledTable = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [sortOrder2, setSortOrder2] = useState<SortOrder>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const columns = [
    {
      title: 'A',
      dataIndex: 'a',
      key: 'a',
      sorter: (a: any, b: any) => a.a - b.a,
      sortOrder,
    },
    {
      title: 'B',
      dataIndex: 'b',
      key: 'b',
      sorter: (a: any, b: any) => a.a - b.a,
      sortOrder: sortOrder2,
    },
    {
      title: 'C',
      dataIndex: 'c',
      key: 'c',
      filteredValue: filters,
      filters: ['奇数', '偶数'],
      onFilter: (value: any, record: any) => {
        if (value === '奇数') {
          return record.c % 2 === 1;
        }
        if (value === '偶数') {
          return record.c % 2 === 0;
        }
        return false;
      },
    },
    {
      title: 'D',
      dataIndex: 'd',
      key: 'd',
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={(p, s, f) => {
        // @ts-ignore
        if (s?.key === 'a') {
          // @ts-ignore
          setSortOrder(s.sortOrder);
        }
        // @ts-ignore
        if (s?.key === 'b') {
          // @ts-ignore
          setSortOrder2(s.sortOrder);
        }
        // @ts-ignore
        if (f.c) {
          // @ts-ignore
          setFilters(f.c);
        }
      }}
    />
  );
};

// eslint-disable-next-line import/prefer-default-export
export { ControlledTable };
