import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Pagination from '..';

describe('Testing Pagination', () => {
  it('should render correctly', () => {
    const { container } = render(<Pagination />);
    expect(container.querySelector('div.gio-pagination')).toBeInTheDocument();
  });
  it('render with prop current', () => {
    const { container } = render(<Pagination pageSizeOptions={null} current={2} pageSize={5} total={10} />);
    expect(container.querySelectorAll('li.gio-pagination__li')).toHaveLength(6);
    expect(screen.queryByText('总共 10 条')).toBeTruthy();
    expect(container.querySelector('nav.gio-pagination__nav')).toHaveAttribute('aria-label', '分页导航');
    expect(screen.getByTestId('pagination-item__2')).toHaveClass('gio-button_active');
    expect(screen.getByTestId('pagination-item__next')).toHaveClass('gio-button_disabled');
    expect(screen.getByTestId('pagination-item__last')).toHaveClass('gio-button_disabled');
  });
  it('can change pageSize', () => {
    const { container } = render(<Pagination showSizeChanger total={20} />);
    expect(container.querySelectorAll('li.gio-pagination__li')).toHaveLength(6);
    act(() => {
      fireEvent.click(screen.getByTestId('select'));
    });
    act(() => {
      fireEvent.click(container.querySelector('li.gio-list--item[title="50"]'));
    });
    expect(container.querySelectorAll('li.gio-pagination__li')).toHaveLength(5);
  });

  it('should fire onPageSizeChange when change pageSize', () => {
    const onPageSizeChange = jest.fn();
    const Demo = () => {
      const [pageSize, setPageSize] = React.useState(5);
      return (
        <Pagination
          onPageSizeChange={(cur, pre) => {
            onPageSizeChange(cur, pre);
            setPageSize(cur);
          }}
          pageSizeOptions={[10, 20, 50]}
          showSizeChanger
          pageSize={pageSize}
          total={50}
        />
      );
    };
    const { container } = render(<Demo />);
    expect(container.querySelector('.gio-pagination__rows')).toHaveAttribute('aria-label', '分页导航的行数选择器');
    expect(container.querySelectorAll('li.gio-pagination__li')).toHaveLength(9);
    act(() => {
      fireEvent.click(screen.getByTestId('select'));
    });
    act(() => {
      fireEvent.click(container.querySelector('li.gio-list--item[title="50"]'));
    });
    expect(onPageSizeChange).toHaveBeenCalledTimes(1);
    const call1 = onPageSizeChange.mock.calls[0];
    expect(call1[0]).toBe(50);
    expect(container.querySelectorAll('li.gio-pagination__li')).toHaveLength(5);
  });
  it('render with prop defaultCurrent=2,defaultPageSize=12,hideFirstButton=true,hideLastButton=true', () => {
    const { container } = render(
      <Pagination defaultCurrent={2} defaultPageSize={12} hideFirstButton hideLastButton total={50} />
    );
    expect(container.querySelectorAll('li.gio-pagination__li')).toHaveLength(7);
    expect(screen.queryByText('总共 50 条')).toBeTruthy();
    expect(screen.getByTestId('pagination-item__2')).toHaveClass('gio-button_active');
    expect(screen.queryByTestId('pagination-item__last')).toBeFalsy();
    expect(screen.queryByTestId('pagination-item__first')).toBeFalsy();
  });
  it('render with prop hideOnSinglePage', () => {
    const { container } = render(<Pagination hideOnSinglePage pageSize={10} total={5} />);
    expect(container.querySelectorAll('li.gio-pagination__li')).toHaveLength(0);
  });
  it('render with custom totalTextRender', () => {
    render(<Pagination total={10} totalTextRender={(total) => `共 ${total} 条`} />);
    expect(screen.queryByText('共 10 条')).toBeTruthy();
  });
  it('should fire onChange when change page', () => {
    const onChange = jest.fn();
    const Demo = () => {
      const [current, setCurrent] = React.useState(1);
      return (
        <Pagination
          onChange={(cur, size) => {
            onChange(cur, size);
            setCurrent(cur);
          }}
          showSizeChanger={false}
          pageSize={5}
          total={21}
          current={current}
        />
      );
    };
    const { container } = render(<Demo />);
    const allpageNavs = container.querySelectorAll('li.gio-pagination__li');
    expect(allpageNavs).toHaveLength(9);
    act(() => {
      fireEvent.click(screen.getByTestId('pagination-item__2'));
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    const call1 = onChange.mock.calls[0];
    expect(call1[0]).toBe(2);
    expect(call1[1]).toBe(5);

    act(() => {
      fireEvent.click(screen.getByTestId('pagination-item__next'));
    });
    expect(onChange).toHaveBeenCalledTimes(2);
    const call2 = onChange.mock.calls[1];
    expect(call2[0]).toBe(3);
    act(() => {
      fireEvent.click(screen.getByTestId('pagination-item__last'));
    });
    expect(onChange).toHaveBeenCalledTimes(3);
    const call3 = onChange.mock.calls[2];
    expect(call3[0]).toBe(5);
    act(() => {
      fireEvent.click(screen.getByTestId('pagination-item__first'));
    });
    expect(onChange).toHaveBeenCalledTimes(4);
    const call4 = onChange.mock.calls[3];
    expect(call4[0]).toBe(1);
  });
  it('should fire onChange event when change quickJumper', () => {
    const onChange = jest.fn();
    const Demo = () => {
      const [current, setCurrent] = React.useState(1);
      return (
        <Pagination
          onChange={(cur, size) => {
            onChange(cur, size);
            setCurrent(cur);
          }}
          showQuickJumper
          pageSize={5}
          total={21}
          current={current}
        />
      );
    };
    const { container } = render(<Demo />);
    expect(container.querySelector('.gio-pagination__jumper__input')).toBeInTheDocument();
    expect(container.querySelector('.gio-pagination__jumper__input input')).toHaveAttribute('max', '5');
    fireEvent.change(container.querySelector('.gio-pagination__jumper__input input'), { target: { value: '2' } });
    fireEvent.keyDown(container.querySelector('.gio-pagination__jumper__input input'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
    const call1 = onChange.mock.calls[0];
    expect(call1[0]).toBe(2);
    fireEvent.change(container.querySelector('.gio-pagination__jumper__input input'), { target: { value: '0' } });
    fireEvent.keyDown(container.querySelector('.gio-pagination__jumper__input input'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(2);
    const call2 = onChange.mock.calls[1];
    expect(call2[0]).toBe(1);
    fireEvent.change(container.querySelector('.gio-pagination__jumper__input input'), { target: { value: '10' } });
    fireEvent.keyDown(container.querySelector('.gio-pagination__jumper__input input'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(3);
    const call3 = onChange.mock.calls[2];
    expect(call3[0]).toBe(5);
  });
});
