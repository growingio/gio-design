/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback, useEffect } from 'react';
import { isUndefined } from 'lodash';
import usePrefixCls from '../../../utils/hooks/use-prefix-cls';
import Pagination, { PaginationProps } from '../../pagination';
import { ColumnType, ColumnsType, PaginationState } from '../interface';
import useControlledState from '../../../utils/hooks/useControlledState';

const usePagination = <RecordType,>(
  data: RecordType[],
  pagination: PaginationProps | false,
  showIndex = false
): [
  (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>,
  PaginationState,
  RecordType[],
  (props: { onTriggerStateUpdate: () => void }) => JSX.Element | null,
  () => void
] => {
  const { current, pageSize, total, onChange, onShowSizeChange, ...rest } = pagination || {};
  const [controlledCurrent, setControlledCurrent] = useControlledState<number>(current, 1);
  const [controlledPageSize, setControlledPageSize] = useControlledState<number>(pageSize, 10);
  const [controlledTotal, setControlledTotal] = useControlledState<number>(total, data.length);
  const prefixCls = usePrefixCls('table');

  // when dataSource update && unControlled, Pagination update.
  const resetPagination = () => {
    if (isUndefined(total)) {
      setControlledTotal(data.length, true);
      if (Math.ceil(data.length / controlledPageSize) < controlledCurrent) {
        setControlledCurrent(1, true);
      }
    }
  };

  useEffect(() => {
    resetPagination();
  }, [data.length]);

  // 通过total字段是否受控判断是否后端分页。
  const paginationData = useMemo(
    () =>
      isUndefined(total)
        ? data.slice((controlledCurrent - 1) * controlledPageSize, controlledCurrent * controlledPageSize)
        : data,
    [data, total, controlledCurrent, controlledPageSize]
  );

  const transformShowIndexPipeline = useCallback(
    (columns: ColumnsType<RecordType>) => {
      const indexColumn: ColumnType<RecordType> = {
        title: '  ',
        key: 'index',
        width: 50,
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

  const PaginationComponent = ({
    onTriggerStateUpdate,
  }: {
    onTriggerStateUpdate: (reset?: boolean, paginationState?: PaginationState) => void;
  }) => (
    <Pagination
      className={`${prefixCls}-pagination`}
      total={controlledTotal}
      current={controlledCurrent}
      pageSize={controlledPageSize}
      onShowSizeChange={(c, p) => {
        setControlledCurrent(c);
        setControlledPageSize(p);
        onShowSizeChange?.(c, p);
      }}
      onChange={(_page, _pageSize) => {
        setControlledCurrent(_page);
        setControlledPageSize(_pageSize);
        onChange?.(_page, _pageSize);
        onTriggerStateUpdate(false, { current: _page, pageSize: _pageSize });
      }}
      {...rest}
    />
  );
  if (pagination === false) {
    return [transformShowIndexPipeline, activePaginationState, data, () => null, resetPagination];
  }
  return [transformShowIndexPipeline, activePaginationState, paginationData, PaginationComponent, resetPagination];
};

export default usePagination;
