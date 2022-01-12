import React, { createContext, useMemo } from 'react';
import classNames from 'classnames';
import { useLocale, useControlledState, usePrefixCls } from '@gio-design/utils';
import PaginationProps, { PaginationItemType } from './interface';
import WithRef from '../utils/withRef';
import usePagination from './hooks/usePagination';
import PaginationItem from './PaginationItem';
import RowsSelector from './RowsSelector';
import QuickJumper from './QuickJumper';
import defaultLocaleTextObject from './locales/zh-CN';

type PaginationContextType = Required<Pick<PaginationProps, 'pageSizeOptions' | 'defaultPageSize' | 'total'>> &
  Partial<Pick<PaginationProps, 'onPageSizeChange' | 'totalTextRender' | 'pageSize'>> & {
    prefixCls: string;
    maxPages: number;
    textObject: typeof defaultLocaleTextObject;
  };

export const PaginationContext = createContext<PaginationContextType>({
  prefixCls: 'gio-pagination',
  maxPages: 0,
  pageSizeOptions: [10, 20, 50],
  defaultPageSize: 10,
  total: 0,
  textObject: defaultLocaleTextObject,
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

  const localeTextObject: typeof defaultLocaleTextObject = useLocale('Pagination');
  const textObject = useMemo(() => ({ ...defaultLocaleTextObject, ...localeTextObject }), [localeTextObject]);

  const prefixCls = usePrefixCls('pagination');
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
      rows: textObject.ariaLabelRows,
      total: textObject.ariaLabelTotal,
      [PaginationItemType.First]: textObject.ariaLabelFirst,
      [PaginationItemType.Previous]: textObject.ariaLabelPrevious,
      [PaginationItemType.Page]: active ? '' : textObject.ariaLabelPage(page),
      [PaginationItemType.Next]: textObject.ariaLabelNext,
      [PaginationItemType.Last]: textObject.ariaLabelLast,
      jumper: textObject.ariaLabelJumper,
      nav: textObject.ariaLabelNav,
    }[type]);

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
      textObject,
    }),
    [
      onPageSizeChange,
      pageSize,
      defaultPageSize,
      pageSizeOptions,
      totalTextRender,
      prefixCls,
      total,
      maxPages,
      textObject,
    ]
  );

  if (hideOnSinglePage && maxPages <= 1) return null;

  return (
    <div ref={ref} data-testid="pagination" className={classNames([className, prefixCls])} {...otherProps}>
      <PaginationContext.Provider value={paginationProviderValue}>
        {showSizeChanger && (
          <RowsSelector onRowsChange={(rows) => setPageSize(rows)} aria-label={getAriaLabel('rows')} />
        )}
        <p aria-label={getAriaLabel('total')} className={`${prefixCls}__total`} data-testid="pagination-item__total">
          {totalTextRender?.(total) ?? textObject.total(total)}
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
            onQuickGo={(page, event) => {
              let arrivedPage = page;
              if (page < 1) arrivedPage = 1;
              if (page > maxPages) arrivedPage = maxPages;
              goToPage(arrivedPage, event);
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
