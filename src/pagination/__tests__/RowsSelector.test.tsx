import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { PaginationContext } from '../Pagination';
import RowsSelector from '../RowsSelector';
import defaultLocaleTextObject from '../locales/zh-CN';

describe('RowsSelector', () => {
  it('render RowsSelector', () => {
    const { container } = render(
      <PaginationContext.Provider
        value={{
          total: 21,
          defaultPageSize: 10,
          pageSizeOptions: [10, 20, 50],
          maxPages: 2,
          prefixCls: 'gio-pagination',
          textObject: { ...defaultLocaleTextObject },
        }}
      >
        <RowsSelector />
      </PaginationContext.Provider>
    );
    act(() => {
      fireEvent.click(screen.getByTestId('select'));
    });
    act(() => {
      fireEvent.click(container.querySelector('li.gio-list--item[title="50"]'));
    });
    expect(container.querySelector('input')).toHaveValue('50');
  });
  it('should not crash when pageSizeOptions item is not valid number string', () => {
    const { container } = render(
      <PaginationContext.Provider
        value={{
          total: 21,
          defaultPageSize: 10,
          pageSizeOptions: [null, 'xx', undefined],
          maxPages: 2,
          prefixCls: 'gio-pagination',
          textObject: { ...defaultLocaleTextObject },
        }}
      >
        <RowsSelector />
      </PaginationContext.Provider>
    );
    act(() => {
      fireEvent.click(screen.getByTestId('select'));
    });
    expect(container.querySelectorAll('li.gio-list--item')).toHaveLength(3);
  });
});
