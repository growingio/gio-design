import React, { useMemo, useCallback } from 'react';
import { isUndefined } from 'lodash';
import Pagination, { PaginationProps } from '../../pagination';
import { ColumnType, ColumnsType, PaginationState } from '../interface';
import useControlledState from '../../../utils/hooks/useControlledState';

const usePagination = <RecordType, >(
  data: RecordType[],
  pagination: PaginationProps | false,
  showIndex = false,
): [
  (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>,
  PaginationState,
  RecordType[],
  (props: { onTriggerStateUpdate: () => void }) => JSX.Element | null
] => {
  const {
    current, pageSize, total, ...rest
  } = pagination || {};
  const [localCurrent, setLocalCurrent] = useControlledState<number>(current, 1);
  const [localPageSize] = useControlledState<number>(pageSize, 10);
  const [controlledTotal] = useControlledState<number>(total, data.length);

  // 通过total字段是否受控判断是否后端分页。
  const paginationData = useMemo(
    () => (isUndefined(total) ? data.slice((localCurrent - 1) * localPageSize, localCurrent * localPageSize) : data),
    [data, total, localCurrent, localPageSize],
  );

  const transformShowIndexPipeline = useCallback(
    (columns: ColumnsType<RecordType>) => {
      const indexColumn: ColumnType<RecordType> = {
        title: '  ',
        key: 'index',
        width: 50,
        align: 'center',
        render() {
          return (localCurrent - 1) * localPageSize + arguments[2] + 1;
        },
      };
      return showIndex ? [indexColumn, ...columns] : columns;
    },
    [showIndex, localCurrent, localPageSize],
  );

  const activePaginationState: PaginationState = useMemo(
    () => ({
      current: localCurrent,
      pageSize: localPageSize,
    }),
    [localCurrent, localPageSize],
  );

  const PaginationComponent = ({ onTriggerStateUpdate }: { onTriggerStateUpdate: () => void }) => (
    <Pagination
      className="gio-table-pagination"
      total={controlledTotal}
      current={localCurrent}
      pageSize={localPageSize}
      onChange={(c) => {
        setLocalCurrent(c);
        onTriggerStateUpdate();
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
