import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Default } from '../Pagination.stories';
import Pagination from '..';
import { generatePageArray } from '../until';

describe('Testing pagination', () => {
  it('basic pagination', () => {
    render(<Default {...Default.args} />);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('turn to select page', () => {
    const { container } = render(<Pagination total={1100} showQuickJumper showSizeChanger disabled />);
    fireEvent.click(container.getElementsByClassName('gio-pagination-item')[3]);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('props showTotal', () => {
    const { rerender, container } = render(
      <Pagination
        total={1100}
        showTotal={(total, range) => `总共 ${Number(total).toLocaleString()} 条, 范围${range[0]}-${range[1]}`}
      />
    );
    expect(container.getElementsByClassName('gio-pagination-total-text')[0]).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rerender(<Pagination total={1100} showTotal={false} />);
    expect(container.getElementsByClassName('gio-pagination-total-text')).toHaveLength(0);
  });

  it('jump to undefined page', () => {
    const changeMcok = jest.fn();
    render(<Pagination onChange={changeMcok} showQuickJumper total={500} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 0 } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 51 } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(changeMcok).toBeCalledTimes(0);
  });

  it('props hideOnSinglePage', () => {
    render(<Pagination hideOnSinglePage total={10} />);
    expect(screen.queryByText(/^./)).toBeNull();
  });

  it('prev and next', () => {
    const changeMcok = jest.fn();
    const { container } = render(<Pagination onChange={changeMcok} total={110} />);
    fireEvent.click(container.getElementsByClassName('gio-pagination-jump-next')[0]);
    expect(changeMcok).toBeCalledWith(6, 10);
    fireEvent.click(container.getElementsByClassName('gio-pagination-jump-next')[0]);
    expect(changeMcok).toBeCalledWith(11, 10);

    fireEvent.click(container.getElementsByClassName('gio-pagination-jump-prev')[0]);
    fireEvent.click(container.getElementsByClassName('gio-pagination-next')[0]);
    fireEvent.click(container.getElementsByClassName('gio-pagination-jump-next')[0]);
    expect(changeMcok).toBeCalledWith(11, 10);

    fireEvent.click(container.getElementsByClassName('gio-pagination-next')[0]);
    expect(changeMcok).toBeCalledWith(11, 10);

    fireEvent.click(container.getElementsByClassName('gio-pagination-jump-prev')[0]);
    expect(changeMcok).toBeCalledWith(6, 10);

    fireEvent.click(container.getElementsByClassName('gio-pagination-jump-prev')[0]);
    expect(changeMcok).toBeCalledWith(1, 10);

    fireEvent.click(container.getElementsByClassName('gio-pagination-jump-next')[0]);
    fireEvent.click(container.getElementsByClassName('gio-pagination-prev')[0]);
    fireEvent.click(container.getElementsByClassName('gio-pagination-jump-prev')[0]);
    expect(changeMcok).toBeCalledWith(1, 10);

    fireEvent.click(container.getElementsByClassName('gio-pagination-prev')[0]);
    expect(changeMcok).toBeCalledWith(1, 10);
  });

  it('generatePageArray function', () => {
    const prevSymbol = { current: Symbol('prev') };
    const nextSymbol = { current: Symbol('next') };
    const result1 = generatePageArray(8, 11, 5, prevSymbol, nextSymbol);
    expect(result1).toEqual([1, prevSymbol.current, 6, 7, 8, 9, 10, 11]);
    const result2 = generatePageArray(4, 11, 5, prevSymbol, nextSymbol);
    expect(result2).toEqual([1, 2, 3, 4, 5, 6, nextSymbol.current, 11]);
    const result3 = generatePageArray(7, 11, 5, prevSymbol, nextSymbol);
    expect(result3).toEqual([1, prevSymbol.current, 5, 6, 7, 8, 9, nextSymbol.current, 11]);
    const result4 = generatePageArray(9, 11, 5, prevSymbol, nextSymbol);
    expect(result4).toEqual([1, prevSymbol.current, 7, 8, 9, 10, 11]);
    const result5 = generatePageArray(3, 11, 5, prevSymbol, nextSymbol);
    expect(result5).toEqual([1, 2, 3, 4, 5, nextSymbol.current, 11]);
    const result6 = generatePageArray(3, 10, 5, prevSymbol, nextSymbol);
    expect(result6).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('size changer', () => {
    const changeMock = jest.fn();
    const showSizeChangeMock = jest.fn();
    const { container } = render(
      <Pagination
        onChange={changeMock}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={showSizeChangeMock}
        total={1100}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 110 } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    fireEvent.click(screen.getByRole('combobox', { hidden: true }));
    fireEvent.click(container.getElementsByClassName('gio-select-list-option')[1]);
    expect(showSizeChangeMock).toBeCalledWith(55, 20);
  });
});
