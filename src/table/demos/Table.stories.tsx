import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Table from '../index';
import { ColumnsType, TableProps } from '../interface';
import '../style';
import { Tooltip } from '../..';

type DataSourceType = {
  id: string;
  name: string;
  address: string;
  age: number;
  children?: DataSourceType[];
};
const genDataSource = (length = 5) =>
  Array.from({ length }).map(
    (_, index) =>
      ({
        id: `${index + 1 * 1000}`,
        age: index + 1,
        name: `Name ${index + 1}`,
        address: `北京市朝阳公园`,
      } as DataSourceType)
  );

export default {
  title: 'Upgraded/Table',
  component: Table,
} as Meta;

// ----------------------- Basic -----------------------//

export const Basic = () => {
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
  return <Table<DataSourceType> title="基础表格" columns={columns} dataSource={genDataSource()} rowKey="id" />;
};

// ----------------------- Basic -----------------------//

// ----------------------- Selectable -----------------------//

export const Selectable = () => {
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
    },
    columnWidth: 60,
    fixed: false,
    // selectedRowKeys: [], // Controlled
    getCheckboxProps: (record) => ({ disabled: record.id === '1' }),
  };
  return (
    <Table<DataSourceType>
      title="可选择的"
      columns={columns}
      pagination={false}
      dataSource={genDataSource()}
      rowKey="id"
      rowSelection={rowSelection}
    />
  );
};

// ----------------------- Selectable -----------------------//

// ----------------------- Filterable -----------------------//

export const Filterable = () => {
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
      filters: [
        { label: 'Age < 5 years old', value: '<5' },
        { label: 'Age >= 5 years old', value: '>=5' },
      ],
      onFilter: (value: '<5' | '>=5', record) => (value === '<5' ? record.age < 5 : record.age >= 5),
      filterSearchPlaceHolder: 'Search Text',
      // Controlled
      // filteredValue: [''],
      // defaultFilteredValue: [''],
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  return (
    <Table<DataSourceType>
      pagination={false}
      title="可过滤的"
      columns={columns}
      rowKey="id"
      dataSource={genDataSource(10)}
    />
  );
};

// ----------------------- Filterable -----------------------//

// ----------------------- Sortable -----------------------//

export const Sortable = () => {
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
      // sortDirections: ['descend'],
      sorter: (first, second) => first.age + second.age,
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];
  return (
    <Table<DataSourceType>
      pagination={false}
      title="可排序的"
      dataSource={genDataSource()}
      columns={columns}
      rowKey="id"
    />
  );
};

// ----------------------- Sortable -----------------------//

// ----------------------- Collapsible -----------------------//

export const collapsible = () => {
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
      title="可展开的"
      dataSource={genDataSource()}
      columns={columns}
      expandable={expandable}
      rowKey="id"
    />
  );
};

// ----------------------- Collapsible -----------------------//

// ----------------------- Spanning Table -----------------------//

export const SpanningTable = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      dataIndex: 'id',
      title: 'Id',
      render: (id, _, index) => {
        if (index === 4) {
          return {
            children: id,
            props: {
              colSpan: 2,
            },
          };
        }
        return id;
      },
    },
    {
      dataIndex: 'name',
      title: 'Name',
      render: (name, _, index) => {
        if (index === 2) {
          return {
            children: name,
            props: {
              rowSpan: 2,
            },
          };
        }
        return name;
      },
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
      pagination={false}
      title="跨越表格"
      dataSource={genDataSource()}
      columns={columns}
      rowKey="id"
    />
  );
};

// ----------------------- Spanning Table -----------------------//

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
      id: 'id',
      name: 'name',
      age: 18,
      address: 'address',
      children: [
        {
          id: 'child id',
          age: 13,
          address: 'child address',
          name: 'child name',
        },
      ],
    },
    ...genDataSource(),
  ];
  return (
    <Table<DataSourceType>
      pagination={false}
      title="展示树形数据"
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
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
      width: 300,
    },
    {
      dataIndex: 'age',
      title: 'Age',
      width: 100,
    },
    {
      dataIndex: 'address',
      title: 'Address',
      fixed: 'right',
      width: 300,
    },
  ];

  return (
    <Table<DataSourceType>
      title="可固定表头和列"
      style={{ width: 900 }}
      scroll={{ y: 300 }}
      columns={columns}
      pagination={false}
      dataSource={genDataSource(30)}
      rowKey="id"
    />
  );
};

// ----------------------- Fixed -----------------------//

// ----------------------- Thead Group -----------------------//

export const TheadGroup = () => {
  const columns: ColumnsType<DataSourceType> = [
    {
      title: 'Id and Name',
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
      children: [
        {
          title: 'Age',
          dataIndex: 'Age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ],
    },
  ];

  return (
    <Table<DataSourceType>
      pagination={false}
      title="表头分组"
      columns={columns}
      dataSource={genDataSource()}
      rowKey="id"
    />
  );
};

// ----------------------- Thead Group -----------------------//

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
        // 取消浏览器默认 title
        showTitle: false,
      },
      render: (address) => (
        <Tooltip title={address}>
          <span>{address}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <Table<DataSourceType>
      pagination={false}
      title="内容省略"
      columns={columns}
      dataSource={genDataSource()}
      rowKey="id"
    />
  );
};

// ----------------------- Ellipsis -----------------------//

// ----------------------- Drag Column -----------------------//

export const DragColumn = () => {
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
    <Table.DragTable<DataSourceType>
      pagination={false}
      title="可拖拽的列"
      columns={columns}
      dataSource={genDataSource()}
      rowKey="id"
    />
  );
};

// ----------------------- Drag Column -----------------------//

// ----------------------- Resizable Column -----------------------//

export const ResizableColumn = () => {
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
    <Table.ResizableTable<DataSourceType>
      title="宽度可调整的列"
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
    <Table.ResizableTable<DataSourceType>
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
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      title: 'Age',
      sorter: (first, second) => first.age + second.age,
      filters: [
        { label: 'Age < 5 years old', value: '<5' },
        { label: 'Age >= 5 years old', value: '>=5' },
      ],
      onFilter: (value: '<5' | '>=5', record) => (value === '<5' ? record.age < 5 : record.age >= 5),
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  return (
    <Table.ResizableTable<DataSourceType>
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        onChange: action('table pagination change'),
      }}
      title="分页表格，请参考 Pagination 组件"
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
  const [dataSource, setDataSource] = React.useState<DataSourceType[]>([]);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setDataSource(genDataSource());
    }, 3_000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Table.ResizableTable<DataSourceType>
      title="加载中"
      loading={loading}
      columns={columns}
      pagination={false}
      dataSource={dataSource}
      rowKey="id"
    />
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
    <Table.ResizableTable<DataSourceType>
      title="无数据，参考 Empty 组件"
      columns={columns}
      rowKey="id"
      pagination={false}
      empty={{
        image: 'no-data',
        description: 'description',
      }}
    />
  );
};

// ----------------------- Empty -----------------------//
