/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from "@testing-library/react"
import React from "react"
import { Table } from ".."
import { ColumnType, TableProps } from "../interface";

describe('Testing Table rowSelection', () => {
  interface DataType extends Record<string, any> {
    key: number | string, name: string, age?: number, gender?: 'female' | 'male'
  }
  const data: DataType[] = [
    { key: 1, name: 'Jack', age: 10, gender: 'male' },
    { key: 2, name: 'Tom', age: 15, gender: 'male' },
    { key: 3, name: 'Jerry', age: 16, gender: 'male' },
    { key: 4, name: 'Rose', age: 11, gender: 'female' }
  ];
  const column: ColumnType<DataType> =
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  }


  function createTable(tableProps: TableProps<DataType> = {}, columns = [column]) {
    return (
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={{}}
        {...tableProps}
      />
    );
  }
  it('select default row', () => {
    const { container } = render(createTable({ rowSelection: { selectedRowKeys: [1] } }));

    expect(container.querySelectorAll('.gio-table-tbody td:nth-child(1) input[type="checkbox"]')).toHaveLength(4);
    expect(container.querySelectorAll('.gio-table-tbody td:nth-child(1) input[type="checkbox"]')[0]).toHaveAttribute("checked")
  });
  it('controlled rowSelection', () => {
    const handleRowSelectedChange = jest.fn();
    const Demo = () => {
      const [selected, setSelected] = React.useState([]);
      return (
        <Table<DataType>
          columns={[column]}
          dataSource={data}
          pagination={false}
          rowSelection={{
            selectedRowKeys: selected,
            onChange: (rowKeys) => {
              setSelected(rowKeys);
              handleRowSelectedChange(rowKeys)
            }
          }}
        />
      );
    }
    const { container } = render(<Demo />);
    const checkboxes = container.querySelectorAll('.gio-table-tbody td:nth-child(1) input[type="checkbox"]');
    fireEvent.click(checkboxes[0]);

    expect(handleRowSelectedChange).toHaveBeenCalledTimes(1);
    expect(handleRowSelectedChange).toHaveBeenCalledWith([1]);
    expect(checkboxes[0]).toHaveClass("gio-checkbox-checked");
    const checkboxAll = container.querySelector('.gio-table-thead th:nth-child(1) input[type="checkbox"]');
    // deselect all
    fireEvent.click(checkboxAll);
    expect(handleRowSelectedChange).toHaveBeenCalledWith([]);

    // select all
    fireEvent.click(checkboxAll);
    expect(handleRowSelectedChange).toHaveBeenCalledWith([1, 2, 3, 4]);
  })
  it('disable check ', () => {
    const { container } = render(createTable({
      rowSelection: {
        getCheckboxProps: (record) => ({ disabled: record.key === 1 })
      }
    }));
    expect(container.querySelectorAll('.gio-table-tbody td:nth-child(1) input[type="checkbox"]')).toHaveLength(4);
    expect(container.querySelectorAll('.gio-table-tbody td:nth-child(1) input[type="checkbox"]')[0]).toHaveAttribute("disabled")
  })
  it('tree data selection ', () => {
    const columns = [
      {
        title: 'Id',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const treeData = [
      {
        key: '1',
        name: 'Jerry',
        age: 30,
        address: 'address',
        children: [
          {
            key: 'child-id-1',
            age: 13,
            address: 'child address',
            name: 'child name',

          },
          {
            key: 'child-id-1-1',
            age: 13,
            address: 'child address',
            name: 'child name',

          },
        ],
      },
      {
        key: '2',
        name: 'Tom',
        age: 28,
        address: 'address',
        children: [
          {
            key: 'child-id-2',
            age: 13,
            address: 'child address',
            name: 'child name',
          },
          {
            key: 'child-id-2-2',
            age: 13,
            address: 'child address',
            name: 'child name',
          },
        ],
      },
      {
        key: '3',
        name: 'Tom',
        age: 28,
        address: 'address',
        children: [
          {
            key: 'child-id-3',
            age: 13,
            address: 'child address',
            name: 'child name',
            children: [
              {
                key: 'child-child-id-3',
                age: 13,
                address: 'child address',
                name: 'child name',
              }
            ]
          },
        ],
      }
    ]
    const { container } = render(<Table<DataType>
      columns={columns}
      dataSource={treeData}
      pagination={false}
      expandable={{ defaultExpandAllRows: true }}
      rowSelection={{}}
    />);
    const checkboxes = container.querySelectorAll('.gio-table-tbody td:nth-child(1) input[type="checkbox"]');
    fireEvent.click(checkboxes[1]);
    // expect(checkboxes[0]).toHaveClass("gio-checkbox-checked");
    expect(checkboxes[1]).toHaveClass("gio-checkbox-checked");
    fireEvent.click(checkboxes[4]);
    expect(checkboxes[3]).toHaveClass("gio-checkbox-indeterminate");
    expect(checkboxes[4]).toHaveClass("gio-checkbox-checked");
    fireEvent.click(checkboxes[6]);
    expect(checkboxes[7]).toHaveClass("gio-checkbox-checked");
  })

})