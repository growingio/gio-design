import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Base, TableHeader, MultiLine, TableEmpty, TableLoading, TablePagination } from '../Table.stories';
import FilterPopover from '../FilterPopover';
import { translateInnerColumns } from '../utils';

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
});
