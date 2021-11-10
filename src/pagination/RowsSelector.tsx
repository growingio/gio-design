import React, { useContext, useRef } from 'react';
import Select from '../legacy/select';
import { PaginationContext } from './Pagination';

const RowsSelector: React.FC<{
  /**
   * 每页行数改变的回调
   * @param rows 改变后的行数
   */
  onRowsChange?: (rows: number) => void;

  'aria-label'?: string;
}> = (props) => {
  const { 'aria-label': ariaLabel, onRowsChange } = props;

  const { defaultPageSize, onPageSizeChange, pageSize, pageSizeOptions, prefixCls } = useContext(PaginationContext);

  const previousPageSizeRef = useRef<number>(pageSize || defaultPageSize);

  return (
    <div aria-label={ariaLabel} className={`${prefixCls}__rows`}>
      <p>每页展示</p>
      <Select
        defaultValue={defaultPageSize}
        value={pageSize}
        size="small"
        className={`${prefixCls}__rows__select`}
        getContainer={(node) => node.parentElement || document.body}
        autoWidth
        options={pageSizeOptions.map((rowSize) => {
          const value = Number.parseInt(`${rowSize}`, 10);
          return {
            label: value,
            value,
          };
        })}
        onSelect={(value) => {
          const currentPageSize = Number.parseInt(`${value}`, 10);
          onRowsChange?.(currentPageSize);
          onPageSizeChange?.(currentPageSize, previousPageSizeRef.current);
          previousPageSizeRef.current = currentPageSize;
        }}
      />
      <p>条</p>
    </div>
  );
};

export default RowsSelector;
