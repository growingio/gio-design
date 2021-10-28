import { isFunction, isUndefined, range } from 'lodash';
import { useEffect, useMemo } from 'react';
import PaginationProps, { PaginationItemProps, PaginationItemType } from './interface';
import useControlledState from '../utils/hooks/useControlledState';

/**
 * 获取开始页码、结束页码和最大页码
 * @param currentPage 当前页码
 * @param pageSize 页大小
 * @param total 数据总数
 * @returns [开始页码，结束页码，最大页码]
 */
const usePage = (currentPage: number, pageSize: number, total: number) => {
  /**
   * 最多显示多少个页码（为保证当前页总是居中显示，请保证此值为奇数）
   * @default 5
   */
  const maxDisplayPages = 5;
  /**
   * 最大的页码数
   */
  const maxPages = Math.ceil(total / pageSize);

  const startPage = useMemo(() => {
    const value = currentPage - Math.floor(maxDisplayPages / 2);
    const maxStartPage = maxPages - maxDisplayPages + 1;
    if (value < 1 || maxStartPage < 1) return 1;
    if (value > maxStartPage) return maxStartPage;
    return value;
  }, [currentPage, maxPages]);

  const endPage = useMemo(() => {
    const value = currentPage + Math.floor(maxDisplayPages / 2);
    const maxPage = Math.min(maxDisplayPages, maxPages);
    if (value < maxPage) return maxPage;
    if (value > maxPages) return maxPages;
    return value;
  }, [currentPage, maxPages]);

  return [startPage, endPage, maxPages] as const;
};

/**
 * 根据 PaginationProps 组装 PaginationItem 的 props
 * @param { PaginationItemProps } props 分页器的 props
 */
const usePagination = (
  props: PaginationProps
): {
  maxPages: number;
  items: PaginationItemProps[];
} => {
  const {
    onChange,
    defaultCurrent = 1,
    defaultPageSize = 10,
    showQuickJumper = false,
    showSizeChanger = false,
    hideFirstButton = false,
    hideLastButton = false,
    total = 0,
    current: currentProp,
    pageSize: pageSizeProp,
  } = props;

  const [currentPage, setCurrentPage] = useControlledState(currentProp, defaultCurrent);
  const [pageSize, setPageSize] = useControlledState(pageSizeProp, defaultPageSize);

  const [startPage, endPage, maxPages] = usePage(currentPage, pageSize, total);

  useEffect(() => {
    if (currentPage > maxPages) {
      setCurrentPage(1);
    }
  }, [maxPages, currentPage, setCurrentPage]);

  const handleClick = (value: number | undefined) => {
    if (isUndefined(currentProp) && !isUndefined(value)) {
      setCurrentPage(value);
    }
    if (isFunction(onChange) && isUndefined(value)) {
      onChange(currentPage, pageSize);
    }
  };

  const computePage = (type: PaginationItemType): number | undefined => {
    switch (type) {
      case PaginationItemType.First:
        return 1;
      case PaginationItemType.Previous:
        return currentPage - 1;
      case PaginationItemType.Next:
        return currentPage + 1;
      case PaginationItemType.Last:
        return maxPages;
      default:
        return undefined;
    }
  };

  /**
   * 分页器子元素的渲染类型
   * e.g. `itemTypes = ['rows-per-page', 'display-total', 'first', 'previous', 1, 2, 3, 4, 5, 'next', 'last', 'jumper']`
   * @see PaginationItemProps['type']
   */
  const itemTypes: Array<number | PaginationItemType> = [
    // 行数选择器
    ...(showSizeChanger ? [PaginationItemType.RowsPerPage] : []),

    // 总数显示
    PaginationItemType.DisplayTotal,

    // 跳到首页
    ...(hideFirstButton ? [] : [PaginationItemType.First]),

    // 返回上一页
    PaginationItemType.Previous,

    // 页码
    ...range(startPage, endPage + 1),

    // 进入下一页
    PaginationItemType.Next,

    // 跳到尾页
    ...(hideLastButton ? [] : [PaginationItemType.Last]),

    // 页码跳转器
    ...(showQuickJumper ? [PaginationItemType.Jumper] : []),
  ];

  const items = itemTypes.map<PaginationItemProps>((type) => {
    const disabledByStringType = (() => {
      switch (type) {
        case PaginationItemType.First:
        case PaginationItemType.Previous:
          return currentPage <= 1;
        case PaginationItemType.Next:
        case PaginationItemType.Last:
          return currentPage >= maxPages;
        default:
          return false;
      }
    })();

    if (typeof type === 'string') {
      return {
        type,
        disabled: disabledByStringType,
        page: computePage(type),
        onClick: () => {
          handleClick(computePage(type));
        },
        onQuickGo: (page) => {
          let goPage = page;
          if (page < 1) goPage = 1;
          if (page > maxPages) goPage = maxPages;
          handleClick(goPage);
        },
        onRowsChange: (rows) => {
          setPageSize(rows);
        },
      };
    }

    return {
      type: PaginationItemType.Page,
      page: type,
      'aria-current': type === currentPage,
      selected: type === currentPage,
      onClick: () => {
        handleClick(type);
      },
    };
  });

  return {
    maxPages,
    items,
  };
};

export default usePagination;
