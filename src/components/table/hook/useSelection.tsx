/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback } from 'react';
import { get, intersection, isUndefined, difference, union, isFunction, isString, compact } from 'lodash';
import { ColumnsType, RowSelection, ColumnType } from '../interface';
import Checkbox from '../../checkbox';
import Tooltip from '../../tooltip';
import useControlledState from '../../../utils/hooks/useControlledState';

export const getRowKey = <RecordType,>(row: RecordType, rowKey?: string | ((record: RecordType) => string)): string => {
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
): [(columns: ColumnsType<RecordType>) => ColumnsType<RecordType>, string[]] => {
  const { onChange, selectedRowKeys, columnWidth = 52, fixed, getCheckboxProps } = rowSelection || {};
  const { rowKey } = config;

  const [localSelectedRowKeys, setLocalSelectedRowKeys] = useControlledState<string[]>(selectedRowKeys, []);
  const currentPageRowKeys = useMemo(() => data.map((item) => getRowKey(item, rowKey)), [data]);
  const isAllChecked = useMemo(
    () => intersection(localSelectedRowKeys, currentPageRowKeys).length === currentPageRowKeys.length,
    [currentPageRowKeys, localSelectedRowKeys]
  );
  const atLeastOneChecked = useMemo(() => intersection(currentPageRowKeys, localSelectedRowKeys).length > 0, [
    currentPageRowKeys,
    localSelectedRowKeys,
  ]);
  const isPartChecked = useMemo(() => !isAllChecked && atLeastOneChecked, [isAllChecked, atLeastOneChecked]);
  const isAllDisabled = useMemo(() => data.every((item) => getCheckboxProps?.(item)?.disabled), [
    data,
    getCheckboxProps,
  ]);
  const disabledRowKey = useMemo(
    () =>
      compact(
        data.map((item) => {
          if (isFunction(getCheckboxProps) && getCheckboxProps(item).disabled) {
            return getRowKey(item, rowKey);
          }
          return null;
        })
      ),
    [data, getCheckboxProps]
  );

  const getSelectRows = useCallback(
    (_selectedRowKeys) => data.filter((item) => _selectedRowKeys.includes(getRowKey(item, rowKey))),
    [data]
  );

  const selectionColumn: ColumnType<RecordType> = {
    title: (
      <Checkbox
        checked={atLeastOneChecked}
        indeterminate={isPartChecked}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          const latestLocalSelectedRowKeys = e.target.checked
            ? difference(union(localSelectedRowKeys, currentPageRowKeys), disabledRowKey)
            : difference(localSelectedRowKeys, currentPageRowKeys, disabledRowKey);
          setLocalSelectedRowKeys(latestLocalSelectedRowKeys);
          onChange?.(latestLocalSelectedRowKeys, getSelectRows(latestLocalSelectedRowKeys));
        }}
        disabled={isAllDisabled}
      />
    ),
    fixed,
    key: 'selection',
    align: 'center',
    width: columnWidth,
    render: (...rest) => {
      const key = getRowKey(rest[1], rowKey);
      const thisCheckboxProps = getCheckboxProps?.(rest[1]) || {};
      const { tooltipProps, disabled, ...restCheckboxProps } = thisCheckboxProps;
      return (
        <Tooltip placement='topLeft' arrowPointAtCenter disabled={!disabled} {...tooltipProps}>
          <div>
            <Checkbox
              {...restCheckboxProps}
              disabled={disabled}
              checked={localSelectedRowKeys.includes(key)}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const latestLocalSelectedRowKeys = e.target.checked
                  ? union(localSelectedRowKeys, [key])
                  : difference(localSelectedRowKeys, [key]);
                setLocalSelectedRowKeys(latestLocalSelectedRowKeys);
                onChange?.(latestLocalSelectedRowKeys, getSelectRows(latestLocalSelectedRowKeys));
              }}
            >{disabled ? null : undefined}</Checkbox>
          </div>
        </Tooltip>
      );
    },
  };

  const transformSelectionPipeline = useCallback(
    (columns: ColumnsType<RecordType>) => (!isUndefined(rowSelection) ? [selectionColumn, ...columns] : columns),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectionColumn, rowSelection]
  );

  return [transformSelectionPipeline, localSelectedRowKeys];
};

export default useSelection;
