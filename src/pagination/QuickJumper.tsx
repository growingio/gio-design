import React, { useContext } from 'react';
import { InputNumber } from '..';
import { PaginationContext } from './Pagination';

const QuickJumper: React.FC<{
  'aria-label'?: string;
  /**
   * 快速跳转的回调（按下回车会触发）
   * @param page 跳转的页码
   */
  onQuickGo?: (page: number) => void;
}> = (props) => {
  const { 'aria-label': ariaLabel, onQuickGo } = props;
  const { prefixCls, maxPages, textObject } = useContext(PaginationContext);

  return (
    <div aria-label={ariaLabel} className={`${prefixCls}__jumper`}>
      {textObject.jumpTo(
        <InputNumber
          min={1}
          max={maxPages}
          size="small"
          className={`${prefixCls}__jumper__input`}
          placeholder=" "
          onKeyDown={({ key, currentTarget }) => {
            if (key === 'Enter') {
              onQuickGo?.(Number.parseInt(`${currentTarget.value}`, 10));
            }
          }}
        />
      )}
    </div>
  );
};

export default QuickJumper;
