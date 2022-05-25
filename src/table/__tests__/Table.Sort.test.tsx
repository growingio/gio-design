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

  const data = [
    { key: 1, name: 'John', age: 10 },
    { key: 2, name: 'Tom', age: 15 },
    { key: 3, name: 'Jerry', age: 16 },
    { key: 4, name: 'Lucy', age: 11 }];

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
  const getNames = (container: Element) => Array.from(container.querySelectorAll('tbody.gio-table-tbody td:nth-of-type(1)')).map(node => node.textContent);
  const getAges = (container: Element) => Array.from(container.querySelectorAll('tbody.gio-table-tbody td:nth-of-type(2)')).map(node => node.textContent);
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

    expect(sorter3.sortOrder).toBe(null);
    expect(sorter3.key).toBe('name');
    expect(getNames(container)).toStrictEqual(['John', 'Tom', 'Jerry', 'Lucy']);
  });
  it('controlled sorter', () => {
    const handleChange = jest.fn();
    const Demo = () => {
      const [order, setOrder] = React.useState<SortOrder>('descend');


      return <Table<DataType>
        columns={[
          {
            ...column,
            sortOrder: order,
            sortDirections: ['ascend', 'descend', 'ascend'],
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
    const sorter1 = handleChange.mock.calls[0][2];
    expect(sorter1.sortOrder).toBe('ascend');
    expect(sorter1.isControlled).toBe(true);

    fireEvent.click(container.querySelector('.gio-table-sorter-button'));
    const sorter2 = handleChange.mock.calls[1][2];
    expect(sorter2.sortOrder).toBe('descend')

    fireEvent.click(container.querySelector('.gio-table-sorter-button'));
    const sorter3 = handleChange.mock.calls[2][2];
    expect(sorter3.sortOrder).toBe('ascend')


  });

  it('multiple columns sorter,sortPriorityOrder', () => {
    const handleChange = jest.fn();
    const { container } = render(<Table<DataType>
      columns={[
        {
          title: 'Name',
          key: 'name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0),
          sortPriorityOrder: 1,
          sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
          title: 'Age',
          key: 'age',
          dataIndex: 'age',
          sorter: (a, b) => a.age - b.age,
          sortPriorityOrder: 2,
          sortDirections: ['ascend', 'descend', 'ascend'],
        },
      ]}
      dataSource={data}
      pagination={false}
      onChange={handleChange}
    />);

    const nameSorterButton = container.querySelector('.gio-table-thead th:nth-of-type(1) button');
    const ageSorterButton = container.querySelector('.gio-table-thead th:nth-of-type(2) button');

    const nameSorterIcon = (icon: string) => nameSorterButton.querySelector(`.gio-table-sorter-button-${icon}`);
    const ageSorterIcon = (icon: string) => ageSorterButton.querySelector(`.gio-table-sorter-button-${icon}`);

    // sort name
    fireEvent.click(nameSorterButton);
    const sorter1 = handleChange.mock.calls[0][2];
    expect(sorter1.sortOrder).toBe('ascend');
    expect(sorter1.key).toBe('name');
    expect(sorter1.sortPriorityOrder).toBe(1);
    expect(nameSorterIcon('up')).toHaveClass('active');
    expect(getNames(container)).toStrictEqual(['John', 'Jerry', 'Lucy', 'Tom']);
    expect(getAges(container)).toStrictEqual(['10', '16', '11', '15']);
    // sort age
    fireEvent.click(ageSorterButton);
    const sorter2 = handleChange.mock.calls[1][2];
    expect(sorter2.sortOrder).toBe('ascend');
    expect(sorter2.key).toBe('age');
    expect(sorter2.sortPriorityOrder).toBe(2);
    expect(nameSorterIcon('up')).toHaveClass('active');
    expect(ageSorterIcon('up')).toHaveClass('active');
    expect(getAges(container)).toStrictEqual(['10', '11', '15', '16']);
    expect(getNames(container)).toStrictEqual(['John', 'Lucy', 'Tom', 'Jerry']);

    // sort name again
    fireEvent.click(nameSorterButton);
    const sorter3 = handleChange.mock.calls[2][2];
    expect(sorter3.sortOrder).toBe('descend');
    expect(sorter3.key).toBe('name');
    expect(sorter3.sortPriorityOrder).toBe(1);
    expect(nameSorterIcon('down')).toHaveClass('active');
    expect(ageSorterIcon('up')).toHaveClass('active');
    expect(getAges(container)).toStrictEqual(['10', '11', '15', '16']);
    expect(getNames(container)).toStrictEqual(['John', 'Lucy', 'Tom', 'Jerry']);

    expect(handleChange).toHaveBeenCalledTimes(3);
  });
})