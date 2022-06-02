/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Table } from '..';
import { sleep } from '../../utils/test';
import usePagination from '../hook/usePagination';
import { ColumnType, TableProps } from '../interface';

describe('Testing Table Pagination', () => {
  interface DataType extends Record<string, any> {
    key: number;
    name: string;
    age?: number;
    gender?: 'female' | 'male';
  }
  const data: DataType[] = [
    { key: 1, name: 'Jack', age: 10, gender: 'male' },
    { key: 2, name: 'Tom', age: 15, gender: 'male' },
    { key: 3, name: 'Jerry', age: 16, gender: 'male' },
    { key: 4, name: 'Rose', age: 11, gender: 'female' },
  ];
  const column: ColumnType<DataType> = {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  };

  const pagination: TableProps<DataType>['pagination'] = { className: 'my-page', pageSize: 2 };

  function createTable(tableProps: TableProps<DataType> = {}, columns = [column]) {
    return <Table<DataType> columns={columns} dataSource={data} pagination={pagination} {...tableProps} />;
  }
  const getNames = (container: Element) =>
    Array.from(container.querySelectorAll('tbody.gio-table-tbody td:nth-of-type(1)')).map((node) => node.textContent);
  it('should render pagination element', () => {
    const { container } = render(createTable());
    expect(container.querySelector('.gio-pagination')).toBeTruthy();
    expect(container.querySelectorAll('.gio-pagination__page__button-text').length).toBe(2);
    expect(container.querySelector('[data-testid="pagination-item__1"]')).toHaveClass('gio-button_active');

    // screen.debug();
  });
  it('controlled page.current', async () => {
    const handlePageSizeChanged = jest.fn();
    const Demo = () => {
      const [page, setPage] = React.useState(2);
      return (
        <Table<DataType>
          columns={[column]}
          dataSource={data}
          pagination={{
            pageSize: 2,
            showSizeChanger: true,
            pageSizeOptions: [1, 2, 10],
            onPageSizeChange: handlePageSizeChanged,
            current: page,
            showQuickJumper: false,
            onChange: (current) => {
              setPage(current);
            },
          }}
        />
      );
    };
    const { container } = render(<Demo />);
    expect(getNames(container)).toEqual(['Jerry', 'Rose']);
    fireEvent.click(container.querySelector('[data-testid="pagination-item__1"]'));
    expect(getNames(container)).toEqual(['Jack', 'Tom']);

    fireEvent.click(screen.getByTestId('pagination-item__rows-selector').querySelector('input'));
    await sleep(10);
    fireEvent.click(container.querySelector('.gio-select--list li:nth-child(1)'));
    await sleep(10);
    expect(handlePageSizeChanged).toHaveBeenCalled();
  });
  it('should fires change event when page changed', async () => {
    const handleChange = jest.fn();
    const { container } = render(createTable({ onChange: handleChange }));
    expect(getNames(container)).toEqual(['Jack', 'Tom']);

    fireEvent.click(container.querySelector('[data-testid="pagination-item__2"]'));
    expect(getNames(container)).toEqual(['Jerry', 'Rose']);
    const pageState1 = handleChange.mock.calls[0][0];
    expect(pageState1).toStrictEqual({ current: 2, pageSize: 2 });

    fireEvent.click(container.querySelector('[data-testid="pagination-item__1"]'));
    expect(getNames(container)).toEqual(['Jack', 'Tom']);
    const pageState2 = handleChange.mock.calls[1][0];
    expect(pageState2).toStrictEqual({ current: 1, pageSize: 2 });

    expect(handleChange).toHaveBeenCalledTimes(2);
  });
  it('usePagination', () => {
    const { result, rerender } = renderHook(({ pageSize }) => usePagination(data, { total: 8, pageSize }, 'pages'), {
      initialProps: { pageSize: 2 },
    });
    expect(result.current[1]).toStrictEqual({ current: 1, pageSize: 2 });
    expect(result.current[2].length).toBe(2);
    rerender({ pageSize: 10 });
    expect(result.current[2].length).toBe(4);
  });
});
