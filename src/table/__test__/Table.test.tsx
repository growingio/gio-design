import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import {
  Base,
  TableHeader,
  MultiLine,
  TableEmpty,
  TableLoading,
  TablePagination,
  ExpandWithTable,
  RowExpandTable,
  TreeExpandTable,
} from '../demos/Table.stories';
import FilterPopover from '../FilterPopover';
import { translateInnerColumns } from '../utils';
import Table from '../index';

const dataSource: any[] = [
  {
    key: '1',
    name: '列表文本',
    age: '列表文本',
    address: '列表文本',
  },
  {
    key: '2',
    name: '列表文本2',
    age: '列表文本',
    address: '列表文本',
  },
  {
    key: '3',
    name: '列表文本123',
    age: '列表文本',
    address: '列表文本',
  },
];

const columns = [
  {
    title: '列标题1',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    ellipsis: true,
    width: 200,
  },
  {
    title: '列标题2',
    dataIndex: 'age',
    key: 'age',
    filters: [
      { label: '名字四个字', value: '4' },
      { label: '名字不是四个字', value: '3' },
    ],
    ellipsis: true,
    onFilter: (value: string, record: any) => {
      if (value === '4') {
        return record.name.length === 4;
      }
      if (value === '3') {
        return record.name.length !== 4;
      }
      return false;
    },
  },
  {
    title: '列标题3',
    dataIndex: 'address',
    key: 'address',
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    sortDirections: [null, null] as any,
  },
];

describe('Testing table', () => {
  it('basic table', () => {
    render(<Base {...Base.args} />);
    expect(screen.getAllByText('列表文本')).toHaveLength(8);
  });

  it('test sort and filter', () => {
    render(<TableHeader {...TableHeader.args} />);
    // 点击排序按钮
    fireEvent.click(screen.getAllByRole('img')[2]);
    // 点击筛选
    fireEvent.click(screen.getAllByRole('img')[3]);
    fireEvent.click(screen.getByText('名字俩字'));
    fireEvent.click(screen.getByRole('button', { name: '清 除' }));
    fireEvent.click(screen.getByText('名字俩字'));
    fireEvent.click(screen.getByRole('button', { name: '确 定' }));
    expect(screen.queryByText('胡彦斌')).toBeNull();
  });

  it('multiple table', () => {
    const { container } = render(<MultiLine {...MultiLine.args} />);
    expect(container.getElementsByClassName('gio-table-thead')).toHaveLength(1);
  });

  it('empty table', () => {
    render(<TableEmpty {...TableEmpty.args} />);
    expect(screen.getByText('自定义内容，可以是ReactNode')).toBeTruthy();
  });

  it('loading table', () => {
    const { container } = render(<TableLoading {...TableLoading.args} />);
    expect(container.getElementsByClassName('gio-loading')).toBeTruthy();
  });

  it('pagination table', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<TablePagination {...TablePagination} />);
    act(() => {
      fireEvent.click(container.getElementsByClassName('gio-pagination-item')[3]);
    });

    await waitFor(() => {
      expect(screen.getByText(6)).toBeTruthy();
    });
  });

  it('rowExpand table', async () => {
    render(<RowExpandTable {...RowExpandTable.args} />);
    act(() => {
      fireEvent.click(screen.getByRole('img'));
    });
    await waitFor(() => {
      expect(screen.queryByText('我是一个例子我是一个例子我是一个例子我是一个例子')).not.toBeNull();
    });
  });

  it('treeExpand table', async () => {
    render(<TreeExpandTable {...TreeExpandTable.args} />);
    act(() => {
      fireEvent.click(screen.getByRole('img', { name: 'right-outlined' }));
    });
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'right-outlined' })).toHaveLength(1);
      expect(screen.getAllByRole('img', { name: 'down-outlined' })).toHaveLength(1);
    });

    act(() => {
      fireEvent.click(screen.getByRole('img', { name: 'down-outlined' }));
    });
    await waitFor(() => {
      expect(screen.queryByRole('img', { name: 'down-outlined' })).toBeNull();
    });
  });

  it('treeExpand with selection', async () => {
    const { container } = render(<TreeExpandTable {...TreeExpandTable.args} />);
    act(() => {
      fireEvent.click(screen.getByRole('img', { name: 'right-outlined' }));
    });
    await fireEvent.click(screen.getByRole('img', { name: 'right-outlined' }));
    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'down-outlined' })).toHaveLength(2);
    });

    act(() => {
      fireEvent.click(screen.getAllByRole('checkbox')[3]);
      fireEvent.click(screen.getAllByRole('checkbox')[4]);
      fireEvent.click(screen.getAllByRole('checkbox')[5]);
    });
    await waitFor(() => {
      expect(container.getElementsByClassName('gio-checkbox-checked')).toHaveLength(4);
    });
  });

  it('select parentNode to checked', async () => {
    const { container } = render(<TreeExpandTable {...TreeExpandTable.args} />);
    fireEvent.click(screen.getByRole('img', { name: 'right-outlined' }));
    act(() => {
      fireEvent.click(screen.getByRole('img', { name: 'right-outlined' }));
      fireEvent.click(screen.getAllByRole('checkbox')[2]);
    });
    await waitFor(() => {
      expect(container.getElementsByClassName('gio-checkbox-icon-indeterminate')).toHaveLength(2);
    });

    act(() => {
      fireEvent.click(screen.getAllByRole('checkbox')[4]);
    });
    await waitFor(() => {
      expect(container.getElementsByClassName('gio-checkbox-icon-indeterminate')).toHaveLength(3);
    });
  });

  it('select one node all checkbox', async () => {
    render(<TreeExpandTable {...TreeExpandTable.args} />);
    act(() => {
      fireEvent.click(screen.getByRole('img', { name: 'right-outlined' }));
    });

    act(() => {
      fireEvent.click(screen.getAllByRole('checkbox')[2]);
    });

    act(() => {
      fireEvent.click(screen.getAllByRole('checkbox')[4]);
    });

    act(() => {
      fireEvent.click(screen.getAllByRole('checkbox')[3]);
    });

    await waitFor(() => {
      expect(screen.getAllByRole('checkbox')).toHaveLength(7);
    });
  });

  it('expand with table', async () => {
    const { container } = render(<ExpandWithTable {...ExpandWithTable.args} />);
    act(() => {
      fireEvent.click(screen.getByRole('img', { name: 'right-outlined' }));
    });

    await waitFor(() => {
      expect(container.getElementsByClassName('gio-table')).toHaveLength(2);
    });
  });

  it('testing table title filter', async () => {
    const onClick = jest.fn();
    const { getByText, getAllByRole, container } = render(
      <FilterPopover
        prefixCls="gio-table"
        values={[]}
        onClick={onClick}
        filters={[
          { label: '第一项', value: '1' },
          { label: '第二项', value: '2' },
        ]}
        placeholder="请输入过滤条件"
      >
        <span>trigger</span>
      </FilterPopover>
    );
    act(() => {
      fireEvent.click(getByText('trigger'));
    });
    act(() => {
      fireEvent.click(getAllByRole('option', { hidden: true })[0]);
    });
    act(() => {
      fireEvent.click(getByText('确 定'));
    });

    await waitFor(() => {
      expect(onClick).toBeCalledTimes(1);
    });

    act(() => {
      fireEvent.click(getByText('trigger'));
      fireEvent.click(getAllByRole('option')[0]);
      fireEvent.click(getAllByRole('option')[0]);
      // 不点确定 并关掉 Filter
      fireEvent.click(getByText('trigger'));
      // 再打开
      fireEvent.click(getByText('trigger'));
    });
    await waitFor(() => {
      expect(container.getElementsByClassName('gio-checkbox-checked')).toBeTruthy();
    });
  });

  it('translateInnerColumns function', () => {
    const translatedColumns = translateInnerColumns([
      {
        title: '测试dataIndex为数组的情况',
        dataIndex: ['a', 'b', 'c'],
      },
      {
        title: '测试dataIndex和key均为空的情况',
      },
      {
        title: '测试有children的情况',
        dataIndex: 'd',
        children: [
          {
            key: 'children',
            title: '我是children',
          },
        ],
      },
    ]);
    expect(translatedColumns[0].key).toBe('a-b-c');
    expect(translatedColumns[1].key).toBeUndefined();
  });

  it('set ref', () => {
    let refs;
    render(
      <Table
        ref={(_ref) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          refs = _ref;
        }}
      />
    );
    expect(screen.getByText('No data'));
  });

  it('empty table', () => {
    const changeMock = jest.fn();
    render(
      <Table
        showIndex
        emptyText="Empty"
        onChange={changeMock}
        showHover={false}
        hackRowEvent
        className="test"
        style={{ color: 'red' }}
        rowClassName="row-test"
      />
    );
    expect(screen.getByText(/empty/i)).toBeTruthy();
  });

  it('rowClassName should be function', async () => {
    const changeMock = jest.fn();
    const { container } = render(
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record: any) => record.key.toString()}
        onRow={() => ({
          onClick: () => {
            // Click Checkbox will not be called
            // eslint-disable-next-line no-console
            console.log('on row click');
          },
        })}
        rowSelection={{
          getCheckboxProps: (record: any) => ({
            disabled: record.age === 1,
            title: record.age,
          }),
        }}
        onChange={changeMock}
        rowClassName={(record, index, indent) => indent.toString()}
      />
    );
    act(() => {
      fireEvent.click(screen.getAllByRole('checkbox')[1]);
    });
    await waitFor(() => {
      expect(container.getElementsByClassName('gio-checkbox-checked')).toBeTruthy();
    });
  });

  it('table header sorter = null', async () => {
    const { container } = render(<Table dataSource={dataSource} columns={columns} />);
    act(() => {
      fireEvent.click(screen.getAllByRole('img')[0]);
      fireEvent.click(screen.getAllByRole('img')[0]);
      fireEvent.click(screen.getAllByRole('img')[0]);
    });
    await waitFor(() => {
      expect(container.getElementsByClassName('gio-table')).toBeTruthy();
    });
  });

  it('without filters', () => {
    const clickMock = jest.fn();
    render(
      <FilterPopover prefixCls="gio-table" values={[]} onClick={clickMock}>
        <span>button</span>
      </FilterPopover>
    );
    expect(screen.getByText('button')).toBeTruthy();
  });
});
