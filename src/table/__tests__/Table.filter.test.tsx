/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { Table } from ".."
import { sleep } from "../../utils/test";
import { ColumnType, TableProps } from "../interface";

describe('Testing Table Sorter', () => {
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
    filters: ["male", "female"],
    onFilter: (val, record) => record.gender === val
  }



  function createTable(tableProps: TableProps<DataType> = {}, columns = [column]) {
    return (
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={false}
        {...tableProps}
      />
    );
  }
  const getNames = (container: Element) => Array.from(container.querySelectorAll('tbody.gio-table-tbody td:nth-of-type(1)')).map(node => node.textContent);
  it('should render filter button', () => {
    const { container } = render(createTable());
    expect(container.querySelector('.gio-table-filter-button')).toBeTruthy();
  });
  it('should not render filter button when filters is undefined', () => {
    const noFilterColumn: ColumnType<DataType> = { ...column, filters: undefined };
    const { container } = render(createTable({}, [noFilterColumn]));
    expect(container.querySelector('.gio-table-filter-button')).not.toBeTruthy()
  });
  it('should not render filter button when onFilter is undefined', () => {
    const noFilterColumn: ColumnType<DataType> = { ...column, filters: undefined };
    delete noFilterColumn.onFilter;
    const { container } = render(createTable({}, [noFilterColumn]));
    expect(container.querySelector('.gio-table-filter-button')).not.toBeTruthy();
  });
  it('should show filter popover when click filter icon', async () => {
    const { container } = render(createTable());
    expect(container.querySelector('.gio-table-filter-button')).toBeTruthy();

    fireEvent.click(container.querySelector('.gio-table-filter-button'));
    await sleep(50);
    expect(container.querySelector('.gio-table-filter-popover')).toBeTruthy();
    expect(container.querySelectorAll('.gio-table-filter-list li input[type="checkbox"]').length).toBe(2);
  })

  it('fires change event', async () => {
    const handleChange = jest.fn();
    const { container } = render(createTable({ onChange: handleChange }));


    expect(container.querySelector('.gio-table-filter-button')).toBeTruthy();

    fireEvent.click(container.querySelector('.gio-table-filter-button'));
    await sleep(50);
    // 勾选female条件 点击确定按钮
    fireEvent.click(container.querySelector('.gio-table-filter-list li input[value="female"]'));
    fireEvent.click(screen.getByText('确定'));
    expect(container.querySelector('.gio-table-filter-popover')).toBeFalsy();
    expect(container.querySelector('.gio-table-filter-button')).toHaveClass('gio-button_active');
    expect(getNames(container)).toStrictEqual(['Rose']);
    const filter1 = handleChange.mock.calls[0][1];
    expect(filter1).toStrictEqual({ name: ['female'] })

    // open filter panel again, 
    fireEvent.click(container.querySelector('.gio-table-filter-button'));
    await sleep(50);
    expect(container.querySelector('.gio-table-filter-list li input[value="female"]')).toHaveAttribute('checked')
    fireEvent.click(screen.getByText('清除'));
    await sleep(1);
    fireEvent.click(screen.getByText('确定'));
    expect(container.querySelector('.gio-table-filter-button')).not.toHaveClass('gio-button_active');
    expect(getNames(container)).toStrictEqual(['Jack', 'Tom', 'Jerry', 'Rose']);

    const filter2 = handleChange.mock.calls[1][2];

    expect(filter2).toStrictEqual({ name: [] });
    expect(handleChange).toHaveBeenCalledTimes(2);


  });

})