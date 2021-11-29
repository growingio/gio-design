import React, { useContext, useRef } from 'react';
import Select from '../select';
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

  const { defaultPageSize, onPageSizeChange, pageSize, pageSizeOptions, prefixCls, textObject } =
    useContext(PaginationContext);

  const previousPageSizeRef = useRef<number>(pageSize || defaultPageSize);

  return (
    <div aria-label={ariaLabel} className={`${prefixCls}__rows`}>
      {textObject.rowsPerPage(
        <Select
          defaultValue={defaultPageSize?.toString()}
          value={pageSize?.toString()}
          size="small"
          getContainer={(node) => node?.parentElement || document.body}
          options={pageSizeOptions.map((rowSize) => {
            const value = Number.parseInt(`${rowSize}`, 10)?.toString();
            return {
              label: value,
              value,
            };
          })}
          onChange={(value) => {
            const currentPageSize = Number.parseInt(`${value}`, 10);
            onRowsChange?.(currentPageSize);
            onPageSizeChange?.(currentPageSize, previousPageSizeRef.current);
            previousPageSizeRef.current = currentPageSize;
          }}
          allowClear={false}
          style={{
            width: 85,
            textAlign: 'left',
          }}
        />
      )}
    </div>
  );
};

export default RowsSelector;
