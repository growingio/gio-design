import React, { useMemo, useCallback, useEffect } from 'react';
import { isUndefined } from 'lodash';
import Pagination, { PaginationProps } from '../../pagination';
import { ColumnType, ColumnsType, PaginationState } from '../interface';
import useControlledState from '../../utils/hooks/useControlledState';

const usePagination = <RecordType,>(
  data: RecordType[],
  pagination: PaginationProps | false,
  prefixCls: string,
  showIndex = false,
  onPaginationChange?: (currentPage: number, currentPageSize: number) => void
): [
  (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>,
  PaginationState,
  RecordType[],
  JSX.Element | null,
  () => void
] => {
  const {
    current,
    pageSize,
    total,
    onChange,
    onPageSizeChange,
    defaultCurrent = 1,
    defaultPageSize = 10,
    ...rest
  } = pagination || {};
  const [controlledCurrent, setControlledCurrent] = useControlledState<number>(current, defaultCurrent);
  const [controlledPageSize, setControlledPageSize] = useControlledState<number>(pageSize, defaultPageSize);

  const totalMemo = useMemo<number>(() => {
    if (isUndefined(total)) {
      return data.length;
    }
    return total;
  }, [total, data.length]);

  useEffect(() => {
    if (controlledCurrent * controlledPageSize > totalMemo) {
      onChange?.(Math.ceil(totalMemo / controlledPageSize) || 1, controlledPageSize);
    }
    // 不应该检测 onChange 依赖
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledCurrent, controlledPageSize, totalMemo]);

  const paginationData = useMemo(() => {
    if (pagination === false || !controlledPageSize) {
      return data;
    }
    if (data.length < totalMemo) {
      if (data.length > controlledPageSize) {
        return data.slice((controlledCurrent - 1) * controlledPageSize, controlledCurrent * controlledPageSize);
      }
      return data;
    }
    return data.slice((controlledCurrent - 1) * controlledPageSize, controlledCurrent * controlledPageSize);
  }, [data, totalMemo, controlledCurrent, controlledPageSize, pagination]);

  const transformShowIndexPipeline = useCallback(
    (columns: ColumnsType<RecordType>) => {
      const indexColumn: ColumnType<RecordType> = {
        title: '  ',
        key: 'index',
        width: 68,
        align: 'center',
        render(...columnRest) {
          return (controlledCurrent - 1) * controlledPageSize + columnRest[2] + 1;
        },
      };
      return showIndex ? [indexColumn, ...columns] : columns;
    },
    [showIndex, controlledCurrent, controlledPageSize]
  );

  const activePaginationState: PaginationState = useMemo(
    () => ({
      current: controlledCurrent,
      pageSize: controlledPageSize,
    }),
    [controlledCurrent, controlledPageSize]
  );

  const refreshPage = () => {
    setControlledCurrent(defaultCurrent);
  };

  const paginationComponent = useMemo(() => {
    if (pagination === false) {
      return null;
    }
    return (
      <Pagination
        className={`${prefixCls}-pagination`}
        total={totalMemo}
        current={controlledCurrent}
        pageSize={controlledPageSize}
        onPageSizeChange={(currentPageSize, previousPageSize) => {
          setControlledPageSize(currentPageSize);
          onPageSizeChange?.(currentPageSize, previousPageSize);
        }}
        onChange={(currentPage, currentPageSize) => {
          setControlledCurrent(currentPage);
          onChange?.(currentPage, currentPageSize);
          onPaginationChange?.(currentPage, currentPageSize);
        }}
        {...rest}
      />
    );
  }, [
    pagination,
    prefixCls,
    totalMemo,
    controlledCurrent,
    controlledPageSize,
    rest,
    setControlledPageSize,
    onPageSizeChange,
    setControlledCurrent,
    onChange,
    onPaginationChange,
  ]);
  return [transformShowIndexPipeline, activePaginationState, paginationData, paginationComponent, refreshPage];
};

export default usePagination;
