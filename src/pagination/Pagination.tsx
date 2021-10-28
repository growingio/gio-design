import React, { createContext } from 'react';
import classNames from 'classnames';
import PaginationProps, { PaginationItemType } from './interface';
import WithRef from '../utils/withRef';
import { usePrefixCls } from '../index';
import usePagination from './usePagination';
import PaginationItem from './PaginationItem';

type PaginationContextType = Required<Pick<PaginationProps, 'pageSizeOptions' | 'defaultPageSize' | 'total'>> &
  Partial<Pick<PaginationProps, 'onPageSizeChange' | 'totalTextRender' | 'pageSize'>> & {
    prefixCls: string;
    maxPages: number;
  };

export const PaginationContext = createContext<PaginationContextType>({
  prefixCls: 'gio-pagination-new',
  maxPages: 0,
  pageSizeOptions: [10, 20, 50],
  defaultPageSize: 10,
  total: 0,
});

const Pagination = WithRef<HTMLElement, PaginationProps>((props, ref) => {
  const {
    onChange,
    onPageSizeChange,
    totalTextRender,
    total = 0,
    defaultCurrent = 1,
    pageSizeOptions = [10, 20, 50],
    defaultPageSize = Number.parseInt(`${pageSizeOptions?.[0]}`, 10) || 10,
    showQuickJumper = false,
    showSizeChanger = false,
    hideOnSinglePage = false,
    hideFirstButton = false,
    hideLastButton = false,
    className,
    current,
    pageSize,
    ...otherProps
  } = props;

  const prefixCls = usePrefixCls('pagination-new');
  const classes = classNames([className, prefixCls]);
  const { maxPages, items: itemsProps } = usePagination({
    onChange,
    defaultCurrent,
    defaultPageSize,
    showQuickJumper,
    showSizeChanger,
    hideLastButton,
    hideFirstButton,
    current,
    pageSize,
    total,
  });

  const getAriaLabel = (type: PaginationItemType, selected = false, page = 0) =>
    ({
      [PaginationItemType.RowsPerPage]: '行数选择器',
      [PaginationItemType.DisplayTotal]: '数据总数',
      [PaginationItemType.First]: '转到第一页',
      [PaginationItemType.Previous]: '转到上一页',
      [PaginationItemType.Page]: selected ? '' : `转到第 ${page} 页`,
      [PaginationItemType.Next]: '转到下一页',
      [PaginationItemType.Last]: '转到最后一页',
      [PaginationItemType.Jumper]: '页码跳转器',
    }[type]);

  if (hideOnSinglePage && maxPages <= 1) return null;

  return (
    <nav ref={ref} data-testid="pagination" className={classes} aria-label="分页导航" {...otherProps}>
      <ul className={`${prefixCls}__ul`}>
        <PaginationContext.Provider
          value={{
            onPageSizeChange,
            pageSize,
            defaultPageSize,
            pageSizeOptions,
            totalTextRender,
            prefixCls,
            total,
            maxPages,
          }}
        >
          {itemsProps.map(({ type, page, selected, ...otherItemProps }) => {
            // type 不是 'page' 时的 key 不应该改变，否则会 remount
            const key = type === PaginationItemType.Page ? `${type}-${page}` : type;
            return (
              <li key={key} className={`${prefixCls}__li ${type}`}>
                <PaginationItem
                  type={type}
                  page={page}
                  selected={selected}
                  aria-label={getAriaLabel(type, selected, page)}
                  {...otherItemProps}
                />
              </li>
            );
          })}
        </PaginationContext.Provider>
      </ul>
    </nav>
  );
});

Pagination.displayName = 'Pagination';

Pagination.defaultProps = {
  total: 0,
  defaultCurrent: 1,
  pageSizeOptions: [10, 20, 50],
  defaultPageSize: 10,
  showQuickJumper: false,
  showSizeChanger: false,
  hideOnSinglePage: false,
  hideFirstButton: false,
  hideLastButton: false,
};

export default Pagination;
