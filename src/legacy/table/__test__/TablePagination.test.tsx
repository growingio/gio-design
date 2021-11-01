/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent, screen } from '@testing-library/react';
import usePagination from '../hook/usePagination';
import Table from '../index';

const dataSource = Array.from({ length: 100 }, (_, key) => ({ key }));

describe('Testing Table Pagination', () => {
  window.requestAnimationFrame = ((callback: any) => {
    window.setTimeout(callback, 16);
  }) as any;
  window.cancelAnimationFrame = (id) => {
    window.clearTimeout(id);
  };
  test('when dataSource update and page count less than current, pagination reset', () => {
    const data10 = Array.from({ length: 10 }, (_, key) => ({ a: key, key }));
    const data20 = Array.from({ length: 20 }, (_, key) => ({ a: key, key }));

    const { container, rerender } = render(
      <Table
        title="列表标题"
        dataSource={data20}
        columns={[
          {
            title: 'a',
            dataIndex: 'a',
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
    );
    // update
    fireEvent.click(container.getElementsByClassName('gio-pagination-item')[3]);
    rerender(<Table dataSource={data10} />);
    expect(screen.getByText('总共 10 条')).toBeTruthy();

    // not update
    fireEvent.click(container.getElementsByClassName('gio-pagination-item')[1]);
    rerender(<Table dataSource={data20} />);
    expect(screen.getByText('总共 20 条')).toBeTruthy();
  });

  test('usePagination hook', () => {
    const onShowSizeChange = jest.fn();
    const { result } = renderHook(({ dataSource, pagination }) => usePagination(dataSource, pagination, true), {
      initialProps: {
        dataSource,
        pagination: {
          onShowSizeChange,
          showSizeChanger: true,
        },
      },
    });
    const transformShowIndexPipeline = result.current[0];
    const PaginationComponent = result.current[3];
    const { container } = render(
      <PaginationComponent
        onTriggerStateUpdate={() => {
          /**/
        }}
      />
    );
    expect(transformShowIndexPipeline([])).toHaveLength(1);
    expect(transformShowIndexPipeline([])[0].render(undefined, undefined, 0)).toBe(1);
    fireEvent.click(container.getElementsByClassName('gio-pagination-item')[1]);
    expect(result.current[1].current).toBe(2);
    expect(result.current[2][0].key).toBe(10);

    fireEvent.click(container.getElementsByClassName('gio-select')[0]);
    fireEvent.click(container.getElementsByClassName('gio-select-list-option')[1]);
    expect(onShowSizeChange).toBeCalled();
  });

  test('usePagination pagination total', () => {
    const dataSource10 = Array.from({ length: 10 }, (_, key) => ({ key }));
    const { result } = renderHook(({ dataSource10, pagination }) => usePagination(dataSource10, pagination, true), {
      initialProps: {
        dataSource10,
        pagination: {
          total: 100,
        },
      },
    });
    const PaginationComponent = result.current[3];
    const { container } = render(
      <PaginationComponent
        onTriggerStateUpdate={() => {
          /**/
        }}
      />
    );
    fireEvent.click(container.getElementsByClassName('gio-pagination-item')[2]);
    expect(result.current[2][0].key).toBe(0);
  });

  it('pagination === false', () => {
    const { container } = render(
      <Table
        dataSource={dataSource}
        pagination={false}
        columns={[
          {
            title: 'a',
            dataIndex: 'a',
          },
        ]}
      />
    );
    expect(container.getElementsByClassName('gio-pagination')).toHaveLength(0);
  });

  it('jump to undefined pages', () => {
    const changeMock = jest.fn();
    render(
      <Table
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
          onChange: changeMock,
          total: 100,
        }}
        columns={[
          {
            title: 'a',
            dataIndex: 'a',
          },
        ]}
        showIndex
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 0 } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 21 } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(changeMock).toBeCalledTimes(0);
  });

  it('totals < page * pagesize', () => {
    const { result } = renderHook(() => usePagination(dataSource, { defaultCurrent: 1, defaultPageSize: 101 }, false));
    expect(result.current[1].pageSize).toEqual(101);
  });

  it('totals = 0', () => {
    const changeMock = jest.fn();
    renderHook(() => usePagination([], { defaultCurrent: 1, defaultPageSize: 100, onChange: changeMock }, false));
    expect(changeMock).toBeCalled();
  });

  it('null', () => {
    const { result } = renderHook(() => usePagination([], {}));
    expect(result.current[2]).toEqual([]);
  });

  it('changePageSize without onShowSizeChange', () => {
    const changeMock = jest.fn();
    const { result } = renderHook(({ dataSource, pagination }) => usePagination(dataSource, pagination, true), {
      initialProps: {
        dataSource,
        pagination: {
          showSizeChanger: true,
          onChange: changeMock,
        },
      },
    });
    const PaginationComponent = result.current[3];
    const { container } = render(
      <PaginationComponent
        onTriggerStateUpdate={() => {
          /**/
        }}
      />
    );
    fireEvent.click(container.getElementsByClassName('gio-pagination-item')[1]);
    fireEvent.click(container.getElementsByClassName('gio-select')[0]);
    fireEvent.click(container.getElementsByClassName('gio-select-list-option')[1]);
    expect(changeMock).toBeCalled();
  });
});
