import { isFunction, range } from 'lodash';
import { useCallback, useEffect } from 'react';
import PaginationProps, { PaginationItemProps, PaginationItemType } from '../interface';
import useControlledState from '../../utils/hooks/useControlledState';
import usePage from './usePage';

/**
 * 根据 PaginationProps 组装 PaginationItem 的 props
 */
const usePagination = (
  props: Omit<PaginationProps, 'pageSize'> & Required<Pick<PaginationProps, 'pageSize'>>
): {
  maxPages: number;
  goToPage: (
    value: number,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement> | null
  ) => void;
  items: PaginationItemProps[];
} => {
  const {
    onChange,
    defaultCurrent = 1,
    hideFirstButton = false,
    hideLastButton = false,
    total = 0,
    current: currentProp,
    pageSize,
  } = props;

  const [currentPage, setCurrentPage] = useControlledState(currentProp, defaultCurrent);

  const [startPage, endPage, maxPages] = usePage(currentPage, pageSize, total);

  const goToPage: ReturnType<typeof usePagination>['goToPage'] = useCallback(
    (page, event) => {
      if (page > 0) {
        setCurrentPage(Math.min(page, maxPages));
        if (isFunction(onChange)) {
          onChange(page, pageSize, event);
        }
      }
    },
    [maxPages, onChange, pageSize, setCurrentPage]
  );

  useEffect(() => {
    if (currentPage > maxPages && maxPages > 0) {
      goToPage(maxPages, null);
    }
  }, [maxPages, currentPage, setCurrentPage, goToPage]);

  const computePage = (type: PaginationItemType): number => {
    switch (type) {
      case PaginationItemType.Previous:
        return currentPage - 1;
      case PaginationItemType.Next:
        return currentPage + 1;
      case PaginationItemType.Last:
        return maxPages;
      case PaginationItemType.First:
      default:
        return 1;
    }
  };

  /**
   * 分页器子元素的渲染类型
   * e.g. `itemTypes = ['first', 'previous', 1, 2, 3, 4, 5, 'next', 'last']`
   * @see PaginationItemType
   */
  const itemTypes: Array<number | PaginationItemType> = [
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
        onClick: (event) => goToPage(computePage(type), event),
      };
    }

    const page = type;

    return {
      type: PaginationItemType.Page,
      page,
      'aria-current': page === currentPage,
      active: page === currentPage,
      onClick: (event) => goToPage(page, event),
    };
  });

  return {
    maxPages,
    goToPage,
    items,
  };
};

export default usePagination;
