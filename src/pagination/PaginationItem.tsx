import { LeftDoubleOutlined, LeftOutlined, RightDoubleOutlined, RightOutlined } from '@gio-design/icons';
import React, { useContext, useRef } from 'react';
import { IconButton, Select, InputNumber } from '..';
import { PaginationItemProps, PaginationItemType } from './interface';
import { PaginationContext } from './Pagination';

const PaginationItem: React.FC<PaginationItemProps> = (props) => {
  const {
    'aria-current': ariaCurrent,
    'aria-label': ariaLabel,
    disabled,
    onClick,
    onQuickGo,
    onRowsChange,
    page,
    type,
    selected,
  } = props;

  // prettier-ignore
  const {
    defaultPageSize,
    onPageSizeChange,
    pageSize,
    pageSizeOptions,
    totalTextRender,
    prefixCls,
    total,
    maxPages
  } = useContext(PaginationContext);

  const previousPageSizeRef = useRef<number>(pageSize ?? defaultPageSize);

  const icon = {
    [PaginationItemType.First]: <LeftDoubleOutlined />,
    [PaginationItemType.Previous]: <LeftOutlined />,
    [PaginationItemType.Next]: <RightOutlined />,
    [PaginationItemType.Last]: <RightDoubleOutlined />,
  };

  if (type === PaginationItemType.RowsPerPage) {
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
            pageSize ?? onRowsChange?.(currentPageSize);
            onPageSizeChange?.(currentPageSize, previousPageSizeRef.current);
            previousPageSizeRef.current = currentPageSize;
          }}
        />
        <p>条</p>
      </div>
    );
  }

  if (type === PaginationItemType.DisplayTotal) {
    const totalText = totalTextRender?.(total);
    // prettier-ignore
    return (
      <p aria-label={ariaLabel} className={`${prefixCls}__total`}>
        {totalText ?? `总共 ${total.toLocaleString('zh-CN')} 条`}
      </p>
    );
  }

  if (
    type === PaginationItemType.First ||
    type === PaginationItemType.Previous ||
    type === PaginationItemType.Next ||
    type === PaginationItemType.Last
  ) {
    return (
      <IconButton aria-label={ariaLabel} disabled={disabled} type="secondary" size="small" onClick={onClick}>
        {icon[type]}
      </IconButton>
    );
  }

  if (type === PaginationItemType.Page) {
    return (
      <IconButton
        className={`${prefixCls}__page__button`}
        disabled={disabled}
        type="secondary"
        size="small"
        active={selected}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
      >
        <span className={`${prefixCls}__page__button-text`}>{page}</span>
      </IconButton>
    );
  }

  if (type === PaginationItemType.Jumper) {
    return (
      <div aria-label={ariaLabel} className={`${prefixCls}__jumper`}>
        <p>跳至第</p>
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
        <p>页</p>
      </div>
    );
  }

  return null;
};

export default PaginationItem;
