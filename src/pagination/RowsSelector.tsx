import React, { useContext, useEffect, useState } from 'react';
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

  const [previousPageSize, setPreviousPageSize] = useState<number>(pageSize || defaultPageSize);
  useEffect(() => {
    if (pageSize) {
      setPreviousPageSize(pageSize);
    }
  }, [pageSize]);
  return (
    <div aria-label={ariaLabel} className={`${prefixCls}__rows`} data-testid="pagination-item__rows-selector">
      {textObject.rowsPerPage(
        <Select
          defaultValue={defaultPageSize}
          value={pageSize}
          size="small"
          getContainer={(node) => node?.parentElement || document.body}
          options={pageSizeOptions.map((rowSize) => {
            const value = Number.parseInt(`${rowSize}`, 10);
            return {
              label: rowSize?.toString(),
              value,
            };
          })}
          onChange={(value: number) => {
            const currentPageSize = value;
            onRowsChange?.(currentPageSize);
            onPageSizeChange?.(currentPageSize, previousPageSize);
            setPreviousPageSize(currentPageSize);
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
