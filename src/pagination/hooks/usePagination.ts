import { isFunction, range } from 'lodash';
import { useEffect } from 'react';
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
  goToPage: (value: number) => void;
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

  useEffect(() => {
    if (currentPage > maxPages) {
      setCurrentPage(1);
    }
  }, [maxPages, currentPage, setCurrentPage]);

  const goToPage = (value: number) => {
    if (value) {
      setCurrentPage(value);
    }
    if (isFunction(onChange)) {
      onChange(value, pageSize);
    }
  };

  const computePage = (type: PaginationItemType): number => {
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
        return 0;
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
        onClick: () => goToPage(computePage(type)),
      };
    }

    return {
      type: PaginationItemType.Page,
      page: type,
      'aria-current': type === currentPage,
      active: type === currentPage,
      onClick: () => goToPage(type),
    };
  });

  return {
    maxPages,
    goToPage,
    items,
  };
};

export default usePagination;
