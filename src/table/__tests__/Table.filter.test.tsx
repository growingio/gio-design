/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks";
import React from "react"
import { Table } from ".."
import { sleep } from "../../utils/test";
import FilterPopover from "../FilterPopover";
import useFilter from "../hook/useFilter";
import { ColumnType, TableProps } from "../interface";
import { TableContext } from "../Table";

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

    // open filter panel again, clear filters
    fireEvent.click(container.querySelector('.gio-table-filter-button'));
    await sleep(50);
    expect(container.querySelector('.gio-table-filter-list li input[value="female"]')).toHaveAttribute('checked')
    fireEvent.click(screen.getByText('清除'));
    await sleep(1);
    fireEvent.click(screen.getByText('确定'));
    expect(container.querySelector('.gio-table-filter-button')).not.toHaveClass('gio-button_active');
    expect(getNames(container)).toStrictEqual(['Jack', 'Tom', 'Jerry', 'Rose']);
    expect(handleChange).toHaveBeenCalledTimes(2);

    const filter2 = handleChange.mock.calls[1][1];

    expect(filter2).toStrictEqual({ name: [] });

  });
  it('search filter conditions', async () => {
    const { container } = render(createTable({}, [{ ...column, filters: ["male", "female", { label: 'girl', value: 'female' }, { label: 'boy', value: 'male' }], filterSearchPlaceHolder: '输入搜索条件' }]));
    expect(container.querySelector('.gio-table-filter-button')).toBeTruthy();

    fireEvent.click(container.querySelector('.gio-table-filter-button'));
    await sleep(50);
    expect(screen.queryByPlaceholderText('输入搜索条件')).toBeTruthy();
    // search 
    fireEvent.change(screen.queryByPlaceholderText('输入搜索条件'), { target: { value: 'female' } })
    expect(container.querySelectorAll('.gio-table-filter-list li input[type="checkbox"]').length).toBe(1);

    fireEvent.click(screen.getByText('清除'));
    expect(screen.queryByPlaceholderText('输入搜索条件')).toHaveValue('');
    fireEvent.change(screen.queryByPlaceholderText('输入搜索条件'), { target: { value: 'female111' } });
    // close filter panel
    fireEvent.click(container.querySelector('.gio-table-filter-button'));
    expect(container.querySelector('.gio-table-filter-popover')).toBeFalsy();
    // open filter again
    fireEvent.click(container.querySelector('.gio-table-filter-button'));
    await sleep(50);
    expect(screen.queryByPlaceholderText('输入搜索条件')).toHaveValue('');

  });
  it('default filtered', () => {
    const { container } = render(createTable({}, [{
      ...column,
      filters: ["male", "female", { label: 'girl', value: 'female' }, { label: 'boy', value: 'male' }],
      filteredValue: ['female']
    }]));
    expect(container.querySelector('.gio-table-filter-button')).toBeTruthy();
    expect(getNames(container)).toStrictEqual(['Rose']);
  })

  it('should not crash when trigger is not a valid ReactElement ', () => {

    render(<FilterPopover values={[]} prefixCls="gio-filter-popover" onClick={(v) => v}>{('aa' as unknown as React.ReactElement)}</FilterPopover>)
  });
  it('table ref', async () => {
    const ref = React.createRef<HTMLDivElement>();


    render(<TableContext.Provider value={{ tableRef: ref }}>
      <FilterPopover values={[]} prefixCls="gio-filter-popover" onClick={(v) => v}><span>filter</span></FilterPopover>)
    </TableContext.Provider>)
  });

  it('useFilter', () => {
    const { result } = renderHook(() => useFilter<DataType>([{
      dataIndex: 'name', title: 'user', children: [
        {
          title: 'Age',
          dataIndex: 'age',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          filters: ['<15', '>=15'], onFilter: (_v, _r) => true,
          defaultFilteredValue: ['<=15']
        },
        {
          title: 'Id',
          dataIndex: 'key',
        },
      ],
      filters: ['male', 'female'],
      onFilter: (v, r) => r.gender === v
    }], () => {/** nothing */ }));
    expect(result.current[0][1].filteredKeys).toStrictEqual(['<=15']);
    const getFilteredData = result.current[2];
    const filteredData = getFilteredData(data, [{ column: { dataIndex: 'name' }, key: 'name', filteredKeys: undefined, isControlled: false }]);
    expect(filteredData).toHaveLength(4)
    const filteredData2 = getFilteredData(data, [{ column: { dataIndex: 'age' }, key: 'age', filteredKeys: [15], isControlled: false }]);
    expect(filteredData2).toHaveLength(1)
  })
})