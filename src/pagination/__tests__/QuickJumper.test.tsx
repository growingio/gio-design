import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { PaginationContext } from '../Pagination';
import QuickJumper from '../QuickJumper';
import defaultLocaleTextObject from '../locales/zh-CN';

describe('Quickjumper', () => {
  it('render without prop onQuickGo', () => {
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
        <QuickJumper />
      </PaginationContext.Provider>
    );
    fireEvent.change(container.querySelector('.gio-pagination__jumper__input input'), { target: { value: '2' } });
    fireEvent.keyDown(container.querySelector('.gio-pagination__jumper__input input'), { key: 'Enter' });
  });
});
