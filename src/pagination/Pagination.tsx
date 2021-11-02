import React, { createContext, useMemo } from 'react';
import classNames from 'classnames';
import PaginationProps, { PaginationItemType } from './interface';
import WithRef from '../utils/withRef';
import { usePrefixCls } from '../index';
import usePagination from './hooks/usePagination';
import PaginationItem from './PaginationItem';
import RowsSelector from './RowsSelector';
import { useControlledState } from '..';
import QuickJumper from './QuickJumper';

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

const Pagination = WithRef<HTMLDivElement, PaginationProps>((props, ref) => {
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
    pageSize: pageSizeProp,
    ...otherProps
  } = props;

  const prefixCls = usePrefixCls('pagination-new');
  const [pageSize, setPageSize] = useControlledState(pageSizeProp, defaultPageSize);
  const {
    maxPages,
    goToPage,
    items: itemsProps,
  } = usePagination({
    onChange,
    defaultCurrent,
    hideLastButton,
    hideFirstButton,
    current,
    pageSize,
    total,
  });

  const getAriaLabel = (type: PaginationItemType | 'rows' | 'total' | 'jumper' | 'nav', active = false, page = 0) =>
    ({
      rows: '分页导航的行数选择器',
      total: '分页导航的数据总数',
      [PaginationItemType.First]: '转到第一页',
      [PaginationItemType.Previous]: '转到上一页',
      [PaginationItemType.Page]: active ? '' : `转到第 ${page} 页`,
      [PaginationItemType.Next]: '转到下一页',
      [PaginationItemType.Last]: '转到最后一页',
      jumper: '分页导航的页码跳转器',
      nav: '分页导航',
    }[type]);

  if (hideOnSinglePage && maxPages <= 1) return null;

  const paginationProviderValue = useMemo<PaginationContextType>(
    () => ({
      onPageSizeChange,
      pageSize,
      defaultPageSize,
      pageSizeOptions,
      totalTextRender,
      prefixCls,
      total,
      maxPages,
    }),
    [onPageSizeChange, pageSize, defaultPageSize, pageSizeOptions, totalTextRender, prefixCls, total, maxPages]
  );

  return (
    <div ref={ref} data-testid="pagination" className={classNames([className, prefixCls])} {...otherProps}>
      <PaginationContext.Provider value={paginationProviderValue}>
        {showSizeChanger && (
          <RowsSelector onRowsChange={(rows) => setPageSize(rows)} aria-label={getAriaLabel('rows')} />
        )}
        <p aria-label={getAriaLabel('total')} className={`${prefixCls}__total`}>
          {totalTextRender?.(total) ?? `总共 ${total.toLocaleString('zh-CN')} 条`}
        </p>
        <nav aria-label={getAriaLabel('nav')} className={`${prefixCls}__nav`}>
          <ul className={`${prefixCls}__ul`}>
            {itemsProps.map(({ type, page, active, ...otherItemProps }) => {
              // type 不是 'page' 时的 key 不应该改变，否则会 remount
              const key = type === PaginationItemType.Page ? `${type}-${page}` : type;
              return (
                <li key={key} className={`${prefixCls}__li ${type}`}>
                  <PaginationItem
                    type={type}
                    page={page}
                    active={active}
                    aria-label={getAriaLabel(type, active, page)}
                    {...otherItemProps}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
        {showQuickJumper && (
          <QuickJumper
            aria-label={getAriaLabel('jumper')}
            onQuickGo={(page) => {
              let arrivedPage = page;
              if (page < 1) arrivedPage = 1;
              if (page > maxPages) arrivedPage = maxPages;
              goToPage(arrivedPage);
            }}
          />
        )}
      </PaginationContext.Provider>
    </div>
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
