import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react/types-6-0';
import React, { useState } from 'react';
import { Table } from '../..';
import { ColumnsType, SortOrder, TableProps } from '../../interface';
import genDataSource, { DataSourceType } from '../genDataSource';
import SortingPage from './SortingPage';

export default {
  title: 'Upgraded/Table/Sorting',
  parameters: {
    docs: {
      page: SortingPage,
    },
  },
} as Meta;

// ----------------------- Sorting -----------------------//

export const Sorting = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
      sorter: (first, second) => first.name.localeCompare(second.name),
    },
    {
      dataIndex: 'age',
      title: 'Age',
      // sortDirections: ['descend'],
      sorter: (first, second) => first.age - second.age,
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  return <Table<DataSourceType> pagination={false} dataSource={genDataSource()} columns={columns} rowKey="id" onChange={(p, f, s) => action('handleTableChange')(p, f, s)} />;
};

// ----------------------- Sorting -----------------------//

// ----------------------- Multiple Sorting -----------------------//

export const MultipleSorting = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
      sortPriorityOrder: 1,
      sorter: (first, second) => first.name.localeCompare(second.name),
    },
    {
      dataIndex: 'age',
      title: 'Age',
      sortPriorityOrder: 2,
      sorter: (first, second) => first.age - second.age,
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  const data: DataSourceType[] = [
    {
      id: '1',
      name: 'John Brown',
      age: 11,
      address: '北京市朝阳公园',
    },
    {
      id: '2',
      name: 'Jim Green',
      age: 22,
      address: '北京市朝阳公园',
    },
    {
      id: '3',
      name: 'Joe Black',
      age: 33,
      address: '北京市朝阳公园',
    },
    {
      id: '4',
      name: 'Jim Red',
      age: 33,
      address: '北京市朝阳公园',
    },
    {
      id: '5',
      name: 'Jim Red',
      age: 55,
      address: '北京市朝阳公园',
    },
  ];
  return <Table<DataSourceType> pagination={false} dataSource={data} columns={columns} rowKey="id" />;
};

// ----------------------- Multiple Sorting -----------------------//

// ----------------------- Controlled Sorting -----------------------//

export const ControlledSorting = () => {
  const [sortedInfo, setSortedInfo] = useState<{
    sortOrder: SortOrder;
    columnKey: 'age' | 'id';
  }>({
    sortOrder: null,
    columnKey: 'age',
  });

  const handleTableChange: Required<TableProps<DataSourceType>>['onChange'] = (
    changedPaginationState,
    changedFilterState,
    changedSortState
  ) => {
    action('handleTableChange')(changedPaginationState, changedFilterState, changedSortState);

    const { key, sortOrder } = changedSortState;

    setSortedInfo({
      columnKey: key as 'age' | 'id',
      sortOrder,
    });
  };

  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.sortOrder : undefined,
      sorter: (first, second) => parseInt(first.id, 10) - parseInt(second.id, 10),
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
      defaultSortOrder: 'descend',
      info: '您可以通过设置 `sortDirections: ["ascend", "descend", "ascend"]` 来禁止排序恢复到默认状态',
      sortDirections: ['ascend', 'descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.sortOrder : undefined,
      sorter: (first, second) => first.age - second.age,
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  return (
    <Table<DataSourceType>
      dataSource={genDataSource(10000)}
      columns={columns}
      rowKey="id"
      onChange={handleTableChange}
    />
  );
};

// ----------------------- Controlled Sorting -----------------------//
