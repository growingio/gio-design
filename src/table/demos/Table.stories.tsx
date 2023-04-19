import React, { useMemo } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Table from '../index';
import { Table as TableWithoutRef } from '../Table';
import { ColumnsType, TableProps } from '../interface';
import '../style';
import Docs from './TablePage';
import genDataSource, { DataSourceType } from './genDataSource';
import Toggle from '../../toggle';
import Divider from '../../divider';

export default {
  title: 'Upgraded/Table',
  component: TableWithoutRef,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42548',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

// ----------------------- Basic -----------------------//

export const Basic: Story<TableProps<DataSourceType>> = (args) => <Table<DataSourceType> {...args} />;
Basic.args = {
  columns: [
    {
      dataIndex: 'id',
      title: 'Id',
      info: 'description',
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ],
  dataSource: genDataSource(),
  rowKey: 'id',
  onRow: (data) => ({ onClick: () => action('onRowClick')(data) }),
};

// ----------------------- Basic -----------------------//

// ----------------------- Selection -----------------------//

export const Selection = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];
  const rowSelection: TableProps<DataSourceType>['rowSelection'] = {
    onChange: (selectedKeys) => {
      // eslint-disable-next-line no-console
      console.log(`🚀 selectedKeys: `, selectedKeys);
      action(`rowSelection onChange`)(selectedKeys);
    },
    columnWidth: 60,
    fixed: false,
    // selectedRowKeys: [], // Controlled
    getCheckboxProps: (record) => ({ disabled: record.age % 2 === 0 }),
  };
  return (
    <Table<DataSourceType> columns={columns} rowKey="id" rowSelection={rowSelection} dataSource={genDataSource(100)} />
  );
};

// ----------------------- Selection -----------------------//

// ----------------------- Filtering -----------------------//

export const Filtering = () => {
  const dataSource = useMemo(() => genDataSource(1000), []);
  const columns = useMemo<ColumnsType<DataSourceType>>(
    () => [
      {
        dataIndex: 'id',
        title: 'Id',
        filters: [
          {
            label: 'ID < 1100',
            value: '<1100',
          },
          {
            label: 'ID >= 1100',
            value: '>=1100',
          },
        ],
        onFilter: (value: '<1100' | '>=1100', record) =>
          value === '<1100' ? Number(record.id) < 1100 : Number(record.id) >= 1100,
      },
      {
        dataIndex: 'name',
        title: 'Name',
      },
      {
        dataIndex: 'age',
        title: 'Age',
        singleSelect: true,
        filterSearchEnable: false,
        filters: [
          { label: 'All', value: 'all' },
          { label: 'Age < 5 years old', value: '<5' },
          { label: 'Age >= 5 years old', value: '>=5' },
        ],
        onFilter: (value: '<5' | '>=5' | 'all', record) => {
          if (value === '<5') {
            return record.age < 5;
          }
          if (value === '>=5') {
            return record.age >= 5;
          }
          return value === 'all';
        },
        singleSelectDefaultValue: 'all',
        filterSearchPlaceHolder: 'Search Text',
      },
      {
        dataIndex: 'address',
        title: 'Address',
      },
    ],
    []
  );

  return <Table<DataSourceType> columns={columns} rowKey="id" onChange={action('filter')} dataSource={dataSource} />;
};

// ----------------------- Filtering -----------------------//

// ----------------------- Collapsible -----------------------//

export const Collapsible = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];
  const expandable: TableProps<DataSourceType>['expandable'] = {
    expandedRowRender: ({ id, name, age, address }) => (
      <p style={{ margin: 0, padding: 0 }}>{[id, name, age, address].join()}</p>
    ),
    rowExpandable: (record) => record.age !== 3,
  };
  return (
    <Table<DataSourceType>
      pagination={false}
      dataSource={genDataSource()}
      columns={columns}
      expandable={expandable}
      rowKey="id"
    />
  );
};

// ----------------------- Collapsible -----------------------//

// ----------------------- Tree Data -----------------------//

export const TreeData = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  const dataSource: DataSourceType[] = [
    {
      id: 'id-1',
      name: 'Jerry',
      age: 30,
      address: 'address',
      children: [
        {
          id: '1-1',
          age: 13,
          address: 'child address',
          name: 'child name',
        },
        {
          id: '1-2',
          age: 13,
          address: 'child address',
          name: 'child name',
        },
      ],
    },
    {
      id: 'id-2',
      name: 'Tom',
      age: 28,
      address: 'address',
      children: [
        {
          id: '2-1',
          age: 13,
          address: 'child address',
          name: 'child name',
        },
        {
          id: '2-2',
          age: 13,
          address: 'child address',
          name: 'child name',
        },
      ],
    },
    {
      id: 'id-3',
      name: 'Tom',
      age: 28,
      address: 'address',
      children: [
        {
          id: '3-1',
          age: 13,
          address: 'child address',
          name: 'child name',
          children: [
            {
              id: '3-1-1',
              age: 13,
              address: 'child address',
              name: 'child name',
            },
          ],
        },
      ],
    },
    ...genDataSource(50),
  ];
  const [selectedKeys, setSelectedKeys] = React.useState([]);
  return (
    <Table<DataSourceType>
      rowSelection={{
        selectedRowKeys: selectedKeys,
        onChange: (keys) => setSelectedKeys(keys),
        getCheckboxProps: (record) => ({ disabled: record.id === '2-2' || record.age < 5 }),
      }}
      rowKey={(r) => `#${r.id}`}
      expandable={{ defaultExpandAllRows: true }}
      pagination={{ pageSize: 10, showQuickJumper: false, showSizeChanger: false }}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

// ----------------------- Tree Data -----------------------//

// ----------------------- Fixed -----------------------//

export const Fixed = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
      width: 300,
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
      fixed: 'right',
      width: 300,
    },
  ];

  return (
    <div style={{ maxWidth: 1320, minWidth: 1000 }}>
      <Table<DataSourceType>
        style={{ width: '100%' }}
        scroll={{ x: 1600, y: 600 }}
        columns={columns}
        pagination={false}
        dataSource={genDataSource(30)}
        rowKey="id"
      />
    </div>
  );
};

// ----------------------- Fixed -----------------------//

// ----------------------- Column Grouping -----------------------//

export const ColumnGrouping = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      title: 'Id and Name',
      align: 'center',
      children: [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
      ],
    },
    {
      title: 'Age and Address',
      align: 'center',
      children: [
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ],
    },
  ];

  return <Table<DataSourceType> pagination={false} columns={columns} dataSource={genDataSource()} rowKey="id" />;
};

// ----------------------- Column Grouping -----------------------//

// ----------------------- Ellipsis -----------------------//

export const Ellipsis = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
      width: 100,
      ellipsis: {
        // 设置 `false` 可以取消浏览器默认 title
        showTitle: true,
      },
    },
  ];

  return <Table<DataSourceType> pagination={false} columns={columns} dataSource={genDataSource()} rowKey="id" />;
};

// ----------------------- Ellipsis -----------------------//

// ----------------------- Resizable Column -----------------------//

export const ResizableColumn = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
      width: 200,
    },
    {
      dataIndex: 'name',
      title: 'Name',
      width: 200,
    },
    {
      dataIndex: 'age',
      title: 'Age',
      width: 200,
    },
    {
      dataIndex: 'address',
      title: 'Address',
      width: 300,
    },
  ];

  return (
    <Table.ResizableTable<DataSourceType>
      title="宽度可调整的列，必须给每个列设置固定宽度"
      columns={columns}
      dataSource={genDataSource()}
      rowKey="id"
      pagination={false}
    />
  );
};

// ----------------------- Resizable Column -----------------------//

// ----------------------- Custom Thead -----------------------//

export const CustomThead = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  const HeaderCell = ({ children }: { children: React.ReactNode }) => (
    <th style={{ background: 'skyblue' }}>{children}</th>
  );

  const Cell = ({ children }: { children: React.ReactNode }) => <th style={{ backgroundColor: 'pink' }}>{children}</th>;

  return (
    <Table<DataSourceType>
      title="自定义表格"
      columns={columns}
      dataSource={genDataSource()}
      pagination={false}
      components={{
        // table: Table,
        header: {
          cell: HeaderCell,
          // row: Row,
          // wrapper: Wrapper,
        },
        body: {
          cell: Cell,
        },
      }}
      rowKey="id"
    />
  );
};

// ----------------------- Custom Thead -----------------------//

// ----------------------- Pagination Table -----------------------//

export const PaginationTable = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
      ellipsis: true,
    },
    {
      dataIndex: 'name',
      title: 'Name',
      ellipsis: true,
    },
    {
      dataIndex: 'age',
      title: 'Age',
      sorter: (first, second) => first.age + second.age,
      ellipsis: true,
      filters: [
        { label: 'Age < 5 years old', value: '<5' },
        { label: 'Age >= 5 years old', value: '>=5' },
      ],
      onFilter: (value: '<5' | '>=5', record) => (value === '<5' ? record.age < 5 : record.age >= 5),
    },
    {
      dataIndex: 'address',
      title: 'Address',
      ellipsis: true,
    },
  ];

  return (
    <Table<DataSourceType>
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        onChange: action('table pagination change'),
      }}
      columns={columns}
      dataSource={genDataSource(100)}
      rowKey="id"
    />
  );
};

// ----------------------- Pagination Table -----------------------//

// ----------------------- Loading -----------------------//

export const Loading = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <Toggle
        on={loading}
        onChange={(event) => setLoading(event.target.checked)}
        checkedChildren="Loading"
        uncheckedChildren="Unloading"
      />
      <Divider />
      <Table<DataSourceType>
        loading={loading}
        columns={columns}
        pagination={false}
        dataSource={genDataSource()}
        rowKey="id"
      />
    </>
  );
};

// ----------------------- Loading -----------------------//

// ----------------------- Empty -----------------------//

export const Empty = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  return (
    <Table<DataSourceType>
      columns={columns}
      rowKey="id"
      pagination={false}
      empty={{
        description: '无数据',
        type: 'empty-data',
      }}
    />
  );
};

// ----------------------- Empty -----------------------//
