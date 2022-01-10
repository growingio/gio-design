import React, { useMemo, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Table from '../index';
import { ColumnsType, SortOrder, TableProps } from '../interface';
import '../style';
import { Divider } from '../..';
import Docs from './TablePage';

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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4066%3A42548',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

// ----------------------- Basic -----------------------//

export const Basic = () => {
  const columns: ColumnsType<DataSourceType> = [
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
      action(`rowSelection onChange`)(selectedKeys);
    },
    columnWidth: 60,
    fixed: false,
    // selectedRowKeys: [], // Controlled
    getCheckboxProps: (record) => ({ disabled: record.age % 2 === 0 }),
  };
  return (
    <Table<DataSourceType>
      title="可选择的"
      columns={columns}
      dataSource={genDataSource(100).map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            children: [
              {
                id: 'id1',
                name: 'name1',
                address: 'address1',
                age: 19,
              },
              {
                id: 'id2',
                name: 'name2',
                address: 'address2',
                age: 19,
              },
              {
                id: 'id3',
                name: 'name3',
                address: 'address3',
                age: 19,
              },
              {
                id: 'id4',
                name: 'name4',
                address: 'address4',
                age: 19,
              },
            ],
          };
        }
        return item;
      })}
      rowKey="id"
      rowSelection={rowSelection}
    />
  );
};

// ----------------------- Selectable -----------------------//

// ----------------------- Filterable -----------------------//

export const Filterable = () => {
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
    ],
    []
  );

  return <Table<DataSourceType> title="可过滤的" columns={columns} rowKey="id" dataSource={dataSource} />;
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

// ----------------------- Controlled Sortable -----------------------//

export const ControlledSortable = () => {
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
      sorter: (first, second) => parseInt(first.id, 10) + parseInt(second.id, 10),
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
      sorter: (first, second) => first.age + second.age,
    },
    {
      dataIndex: 'address',
      title: 'Address',
    },
  ];

  return (
    <Table<DataSourceType>
      title="受控的排序，设置 `sorter = true` 开启服务端排序"
      dataSource={genDataSource(10000)}
      columns={columns}
      rowKey="id"
      onChange={handleTableChange}
    />
  );
};

// ----------------------- Controlled Sortable -----------------------//

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
    <>
      <h4>可固定表头和列</h4>
      <p>对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 scroll.x 配合使用。</p>
      <ol style={{ fontSize: '.9em', color: 'rgb(161, 157, 157)', lineHeight: '2' }}>
        <li>若列头与内容不对齐或出现列重复，请指定固定列的宽度 width。</li>
        <li>
          如果指定 width
          不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。
        </li>
        <li>建议指定 scroll.x 为大于表格宽度的固定值或百分比。</li>
        <li>注意，且非固定列宽度之和不要超过 scroll.x。</li>
      </ol>
      <Divider style={{ width: '100%' }} />
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
    </>
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

export const Ellipsis = (props: any) => {
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

  return (
    <Table<DataSourceType>
      pagination={false}
      title="内容"
      columns={columns}
      dataSource={genDataSource()}
      rowKey="id"
      {...props}
    />
  );
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
      title="表格无数据时的展示页面，请参考 Page 组件"
      columns={columns}
      rowKey="id"
      pagination={false}
      empty={{
        description: '无数据',
        type: 'noData',
      }}
    />
  );
};

// ----------------------- Empty -----------------------//
