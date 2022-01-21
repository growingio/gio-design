import { isFunction, range } from 'lodash';
import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (currentPage > maxPages) {
      setCurrentPage(1);
    }
  }, [maxPages, currentPage, setCurrentPage]);

  const goToPage: ReturnType<typeof usePagination>['goToPage'] = (value, event) => {
    if (value) {
      setCurrentPage(value);
    }
    if (isFunction(onChange)) {
      onChange(value, pageSize, event);
    }
  };

  /**
   * 原始的总数
   */
  const originTotal = useRef(total);

  // 总数改变跳回首页，
  useEffect(() => {
    // 保证首次渲染不跳转
    if (originTotal.current !== total) {
      goToPage(1, null);
    }
    // 没必要监听 goToPage 依赖变化
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

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
