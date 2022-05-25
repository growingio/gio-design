/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { Table } from ".."
import { ColumnType, SortOrder, TableProps } from "../interface";

describe('Testing Table Sorter', () => {
  interface DataType extends Record<string, any> {
    key: number, name: string
  }
  const column: ColumnType<DataType> =
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)
  }

  const data = [{ key: 1, name: 'John', }, { key: 2, name: 'Tom' }, { key: 3, name: 'Jerry' }, { key: 4, name: 'Lucy' }];

  function createTable(tableProps: TableProps<DataType> = {}, columnProps = {}) {
    return (
      <Table<DataType>
        columns={[
          {
            ...column,
            ...columnProps,
          },
        ]}
        dataSource={data}
        pagination={false}
        {...tableProps}
      />
    );
  }
  const getNames = (container: Element) => Array.from(container.querySelectorAll('tbody td')).map(node => node.textContent);
  it('should render sort button', () => {
    const { container } = render(createTable());
    expect(container.querySelector('.gio-table-sorter-button')).toBeTruthy();
    expect(container.querySelector('[aria-label="up-filled"]')).toBeTruthy();
    expect(container.querySelector('[aria-label="down-filled"]')).toBeTruthy();
  });
  it('default sort order ascend', () => {
    const { container } = render(
      createTable(
        {},
        {
          defaultSortOrder: 'ascend',
        },
      ),
    );
    expect(getNames(container)).toStrictEqual(['John', 'Jerry', 'Lucy', 'Tom']);
  });
  it('default sort order descend', () => {
    const { container } = render(
      createTable(
        {},
        {
          defaultSortOrder: 'descend',
        },
      ),
    );
    expect(getNames(container)).toStrictEqual(['Tom', 'Lucy', 'John', 'Jerry']);
  });

  it('fires change event', () => {
    const handleChange = jest.fn();
    const { container } = render(createTable({ onChange: handleChange }));
    // ascent
    fireEvent.click(container.querySelector('.gio-table-sorter-button'));
    const sorter1 = handleChange.mock.calls[0][2];
    expect(sorter1.sortOrder).toBe('ascend');
    expect(sorter1.key).toBe('name');
    expect(container.querySelector('.gio-table-sorter-button-up')).toHaveClass('active');
    expect(getNames(container)).toStrictEqual(['John', 'Jerry', 'Lucy', 'Tom']);

    // desc
    fireEvent.click(container.querySelector('.gio-table-sorter-button'));
    const sorter2 = handleChange.mock.calls[1][2];
    expect(sorter2.sortOrder).toBe('descend');
    expect(container.querySelector('.gio-table-sorter-button-down')).toHaveClass('active')
    expect(sorter2.key).toBe('name');
    expect(getNames(container)).toStrictEqual(['Tom', 'Lucy', 'John', 'Jerry']);

    // null
    fireEvent.click(container.querySelector('.gio-table-sorter-button'));
    expect(container.querySelector('.gio-table-sorter-button-down')).not.toHaveClass('active');
    expect(container.querySelector('.gio-table-sorter-button-up')).not.toHaveClass('active')
    const sorter3 = handleChange.mock.calls[2][2];

    expect(sorter3.sortOrder).toBe(undefined);
    expect(sorter3.key).toBe('name');
    expect(getNames(container)).toStrictEqual(['John', 'Tom', 'Jerry', 'Lucy']);
  });
  it('controlled sorter', () => {
    const handleChange = jest.fn().mockImplementation((...args) => console.log(args));
    const Demo = () => {
      const [order, setOrder] = React.useState<SortOrder>('descend');


      return <Table<DataType>
        columns={[
          {
            ...column,
            sortOrder: order,
          },
        ]}
        dataSource={data}
        pagination={false}
        onChange={(_page, _filter, sortState) => {
          const { sortOrder } = sortState
          setOrder(sortOrder);
          handleChange(_page, _filter, sortState)
        }}
      />
    }
    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('.gio-table-sorter-button'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    // const sorter1 = handleChange.mock.calls[0];
    // expect(sorter1.sortOrder).toBe(undefined);

    fireEvent.click(container.querySelector('.gio-table-sorter-button'));

    console.log(handleChange.mock.calls)
    // const sorter2 = handleChange.mock.calls[1];
    // expect(sorter2.sortOrder).toBe('ascend')

    fireEvent.click(container.querySelector('.gio-table-sorter-button'));
    // const sorter3 = handleChange.mock.calls[2];
    // expect(sorter3.sortOrder).toBe('descend')


  })
})