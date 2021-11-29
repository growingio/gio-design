import { useMemo } from 'react';

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

export default usePage;
