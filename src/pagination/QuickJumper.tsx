import React, { useContext } from 'react';
import { Input } from '..';
import { PaginationContext } from './Pagination';

const QuickJumper: React.FC<{
  'aria-label'?: string;
  /**
   * 快速跳转的回调（按下回车会触发）
   * @param page 跳转的页码
   */
  onQuickGo?: (page: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = (props) => {
  const { 'aria-label': ariaLabel, onQuickGo } = props;
  const { prefixCls, maxPages, textObject } = useContext(PaginationContext);

  return (
    <div aria-label={ariaLabel} className={`${prefixCls}__jumper`} data-testid="pagination-item__jumper">
      {textObject.jumpTo(
        <Input.InputNumber
          min={1}
          max={maxPages}
          size="small"
          className={`${prefixCls}__jumper__input`}
          onKeyDown={(event) => {
            const { key, currentTarget } = event;
            if (key === 'Enter') {
              onQuickGo?.(Number.parseInt(`${currentTarget.value}`, 10), event);
            }
          }}
        />
      )}
    </div>
  );
};

export default QuickJumper;
