/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback, useEffect } from 'react';
import { isUndefined } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import Pagination, { PaginationProps } from '../../pagination';
import { ColumnType, ColumnsType, PaginationState, OnTriggerStateUpdateProps } from '../interface';
import useControlledState from '../../../utils/hooks/useControlledState';

const usePagination = <RecordType,>(
  data: RecordType[],
  pagination: PaginationProps | false,
  showIndex = false
): [
  (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>,
  PaginationState,
  RecordType[],
  (props: {
    onTriggerStateUpdate: (onTriggerStateUpdateProps: OnTriggerStateUpdateProps<RecordType>) => void;
  }) => JSX.Element | null
] => {
  const {
    current,
    pageSize,
    total,
    onChange,
    onShowSizeChange,
    defaultCurrent = 1,
    defaultPageSize = 10,
    ...rest
  } = pagination || {};
  const [controlledCurrent, setControlledCurrent] = useControlledState<number>(current, defaultCurrent);
  const [controlledPageSize, setControlledPageSize] = useControlledState<number>(pageSize, defaultPageSize);
  const [controlledTotal, setControlledTotal] = useControlledState<number>(total, data.length);
  const prefixCls = usePrefixCls('table');

  useEffect(() => {
    setControlledTotal(data.length);
    setControlledCurrent(defaultCurrent);
    setControlledPageSize(defaultPageSize);
  }, [data]);

  useEffect(() => {
    if (controlledCurrent * controlledPageSize > controlledTotal) {
      onChange?.(Math.ceil(controlledTotal / controlledPageSize) || 1, controlledPageSize);
    }
  }, [controlledTotal]);

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
    onTriggerStateUpdate: (onTriggerStateUpdateProps: OnTriggerStateUpdateProps<RecordType>) => void;
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
        onTriggerStateUpdate({ paginationState: { current: _page, pageSize: _pageSize } });
      }}
      {...rest}
    />
  );
  if (pagination === false) {
    return [transformShowIndexPipeline, activePaginationState, data, () => null];
  }
  return [transformShowIndexPipeline, activePaginationState, paginationData, PaginationComponent];
};

export default usePagination;
