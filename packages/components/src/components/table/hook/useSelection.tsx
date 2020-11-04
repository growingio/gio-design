import React, { useMemo, useCallback } from 'react';
import { get, intersection, isUndefined, difference, union, isFunction, isString } from 'lodash';
import { ColumnsType, RowSelection, ColumnType } from '../interface';
import Checkbox from '../../checkbox';
import useControlledState from '../../../utils/hooks/useControlledState';

export const getRowKey = <RecordType,>(row: RecordType, rowKey?: string | ((record: RecordType) => string)) => {
  if (rowKey) {
    if (isFunction(rowKey)) {
      return rowKey(row);
    }
    if (isString(rowKey)) {
      if (isString(get(row, rowKey))) {
        return get(row, rowKey);
      }
    }
  }
  return get(row, 'key');
};

const useSelection = <RecordType,>(
  data: RecordType[],
  rowSelection: RowSelection<RecordType> | undefined,
  config: {
    rowKey?: string | ((record: RecordType) => string);
  }
): [(columns: ColumnsType<RecordType>) => ColumnsType<RecordType>] => {
  const { onChange, selectedRowKeys, columnWidth = 50, fixed } = rowSelection || {};
  const { rowKey } = config;

  const [localSelectedRowKeys, setLocalSelectedRowKeys] = useControlledState<string[]>(selectedRowKeys, []);
  const currentPageRowKeys = useMemo(() => data.map((item) => getRowKey(item, rowKey)), [data]);
  const allChecked = useMemo(
    () => intersection(localSelectedRowKeys, currentPageRowKeys).length === currentPageRowKeys.length,
    [currentPageRowKeys, localSelectedRowKeys]
  );
  const atLeastOneChecked = useMemo(() => intersection(currentPageRowKeys, localSelectedRowKeys).length > 0, [
    currentPageRowKeys,
    localSelectedRowKeys,
  ]);
  const partChecked = useMemo(() => !allChecked && atLeastOneChecked, [allChecked, atLeastOneChecked]);
  const getSelectRows = useCallback(
    (_selectedRowKeys) => data.filter((item) => _selectedRowKeys.includes(getRowKey(item, rowKey))),
    [data]
  );

  const selectionColumn: ColumnType<RecordType> = {
    title: (
      <Checkbox
        checked={atLeastOneChecked}
        indeterminate={partChecked}
        onChange={(e) => {
          const latestLocalSelectedRowKeys = e.target.checked
            ? union(localSelectedRowKeys, currentPageRowKeys)
            : difference(localSelectedRowKeys, currentPageRowKeys);
          setLocalSelectedRowKeys(latestLocalSelectedRowKeys);
          onChange?.(latestLocalSelectedRowKeys, getSelectRows(latestLocalSelectedRowKeys));
        }}
      />
    ),
    fixed,
    key: 'selection',
    align: 'center',
    width: columnWidth,
    render: (...rest) => {
      const key = getRowKey(rest[1], rowKey);
      return (
        <Checkbox
          checked={localSelectedRowKeys.includes(key)}
          onChange={(e) => {
            const latestLocalSelectedRowKeys = e.target.checked
              ? union(localSelectedRowKeys, [key])
              : difference(localSelectedRowKeys, [key]);
            setLocalSelectedRowKeys(latestLocalSelectedRowKeys);
            onChange?.(latestLocalSelectedRowKeys, getSelectRows(latestLocalSelectedRowKeys));
          }}
        />
      );
    },
  };

  const transformSelectionPipeline = useCallback(
    (columns: ColumnsType<RecordType>) => (!isUndefined(rowSelection) ? [selectionColumn, ...columns] : columns),
    [selectionColumn, rowSelection]
  );

  return [transformSelectionPipeline];
};

export default useSelection;
