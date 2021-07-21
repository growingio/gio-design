import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Base, TableHeader, MultiLine, TableEmpty, TableLoading, TablePagination } from '../Table.stories';
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

  it('pagination table', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<TablePagination {...TablePagination} />);
    fireEvent.click(container.getElementsByClassName('gio-pagination-item')[3]);
    expect(screen.getByText(6)).toBeTruthy();
  });

  it('testing table title filter', () => {
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
    fireEvent.click(getByText('trigger'));
    fireEvent.click(getAllByRole('option')[0]);
    fireEvent.click(getByText('确 定'));
    expect(onClick).toBeCalledWith(['1']);

    fireEvent.click(getByText('trigger'));
    fireEvent.click(getAllByRole('option')[0]);
    fireEvent.click(getAllByRole('option')[0]);
    // 不点确定 并关掉 Filter
    fireEvent.click(getByText('trigger'));
    // 再打开
    fireEvent.click(getByText('trigger'));
    expect(container.getElementsByClassName('gio-checkbox-checked')).toBeTruthy();
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

  it('rowClassName should be function', () => {
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
    fireEvent.click(screen.getAllByRole('checkbox')[1]);
    expect(container.getElementsByClassName('gio-checkbox-checked')).toBeTruthy();
  });

  it('table header sorter = null', () => {
    const { container } = render(<Table dataSource={dataSource} columns={columns} />);
    fireEvent.click(screen.getAllByRole('img')[0]);
    fireEvent.click(screen.getAllByRole('img')[0]);
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(container.getElementsByClassName('gio-table')).toBeTruthy();
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
