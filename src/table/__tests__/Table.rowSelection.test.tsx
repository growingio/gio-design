/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from "@testing-library/react"
import React from "react"
import { Table } from ".."
import { ColumnType, TableProps } from "../interface";

describe('Testing Table rowSelection', () => {
  interface DataType extends Record<string, any> {
    key: number, name: string, age?: number, gender?: 'female' | 'male'
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
  const getNames = (container: Element) => Array.from(container.querySelectorAll('tbody.gio-table-tbody td:nth-of-type(2)')).map(node => node.textContent);
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

})