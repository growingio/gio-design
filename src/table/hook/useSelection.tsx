/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback } from 'react';
import { get, intersection, isUndefined, difference, union, isFunction, isString, flatten, flattenDeep } from 'lodash';
import { ColumnsType, RowSelection, ColumnType, TableProps, Key } from '../interface';
import Checkbox from '../../checkbox';
import Tooltip from '../../tooltip';
import useControlledState from '../../utils/hooks/useControlledState';

// 拿到row及其children 所有的key
export const getRowAllKeys = (row: any, rowKey: any) => {
  if (row.children) {
    return flattenDeep([get(row, rowKey), ...row.children.map((item: any) => getRowAllKeys(item, rowKey))]);
  }
  return get(row, rowKey);
};

export const getRowKey = <RecordType,>(row: RecordType, rowKey?: TableProps<RecordType>['rowKey']): Key => {
  if (rowKey) {
    if (isFunction(rowKey)) {
      return rowKey(row);
    }
    if (isString(rowKey)) {
      if (isString(get(row, rowKey))) {
        return getRowAllKeys(row, rowKey);
      }
    }
  }
  return getRowAllKeys(row, 'key');
};

const useSelection = <RecordType,>(
  data: RecordType[],
  rowSelection: RowSelection<RecordType> | undefined,
  config: {
    rowKey?: TableProps<RecordType>['rowKey'];
  }
): [(columns: ColumnsType<RecordType>) => ColumnsType<RecordType>, Key[]] => {
  const { onChange, selectedRowKeys, columnWidth = 52, fixed, getCheckboxProps } = rowSelection || {};
  const { rowKey } = config;

  const [localSelectedRowKeys, setLocalSelectedRowKeys] = useControlledState<Key[]>(selectedRowKeys, []);

  // 获取当前页所有row的key
  const currentPageRowKeys = useMemo(() => flatten(data.map((item) => getRowKey(item, rowKey))), [data]);

  const isAllChecked = useMemo(
    () => intersection(localSelectedRowKeys, currentPageRowKeys).length === currentPageRowKeys.length,
    [currentPageRowKeys, localSelectedRowKeys]
  );
  const atLeastOneChecked = useMemo(
    () => intersection(currentPageRowKeys, localSelectedRowKeys).length > 0,
    [currentPageRowKeys, localSelectedRowKeys]
  );
  const isPartChecked = useMemo(() => !isAllChecked && atLeastOneChecked, [isAllChecked, atLeastOneChecked]);
  const isAllDisabled = useMemo(
    () => data.every((item) => getCheckboxProps?.(item)?.disabled),
    [data, getCheckboxProps]
  );

  const isRowAllSelected = (keys: any) => {
    const childrenKeys = Array.isArray(keys) ? keys.slice(1, keys.length) : [keys];

    return childrenKeys.every((keyItem) => localSelectedRowKeys.includes(keyItem));
  };

  const isRowPartSelected = (keys: any) =>
    Array.isArray(keys) ? keys.slice(1, keys.length).some((keyItem) => localSelectedRowKeys.includes(keyItem)) : false;

  const allDisabledKey: string[] = [];
  // 获取所有的disabled选项的key
  const getAllDisabledKey = (dataTree: any) => {
    dataTree.forEach((item: any) => {
      if (isFunction(getCheckboxProps) && getCheckboxProps(item).disabled) {
        Array.isArray(getRowKey(item, rowKey))
          ? allDisabledKey.push(...(getRowKey(item, rowKey) as any))
          : allDisabledKey.push(getRowKey(item, rowKey) as any);
      } else if (item.children) {
        getAllDisabledKey(item.children);
      }
    });
  };

  // 所有的子元素全部disabled
  const isParentDisabled = (keys: Key | Key[]) =>
    Array.isArray(keys) ? keys.slice(1).every((key) => allDisabledKey.includes(`${key}`)) : false;

  // 父元素disabled
  const isChildDisabled = (keys: Key | Key[]) => (Array.isArray(keys) ? false : allDisabledKey.includes(`${keys}`));

  const getSelectRows = useCallback(
    (_selectedRowKeys) => data.filter((item) => _selectedRowKeys.includes(getRowKey(item, rowKey))),
    [data]
  );

  // 获取父节点的keys
  const getParentKeys = (dataTree: any, keys: Key | Key[]): Key[] => {
    if (!Array.isArray(keys)) {
      if (data.some((item: any) => item.key === keys)) {
        return [];
      }

      // eslint-disable-next-line no-restricted-syntax
      for (let item of dataTree) {
        if (item.children) {
          if (item.children.some((child: any) => child.key === keys)) {
            return getRowKey(item, rowKey) as any;
          }

          return getParentKeys(item.children, keys);
        }
      }
    }

    return [];
  };

  // 更新parent的check状态
  const updateParentCheck = (selectedKeys: Key[], childKey: Key | Key[]): any => {
    const parentKeys = getParentKeys(data, childKey);
    if (parentKeys.length) {
      if (parentKeys.slice(1).every((key) => selectedKeys.includes(key))) {
        // 向上递归更新状态，直至根结点
        return updateParentCheck(flattenDeep(union(selectedKeys, flattenDeep(parentKeys))), parentKeys[0]);
      }
      return selectedKeys.filter((key) => key !== parentKeys[0]);
    }
    return selectedKeys;
  };

  const selectionColumn: ColumnType<RecordType> = {
    title: (
      <Checkbox
        checked={atLeastOneChecked}
        indeterminate={isPartChecked}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          getAllDisabledKey(data);
          const latestLocalSelectedRowKeys = e.target.checked
            ? flattenDeep(difference(union(localSelectedRowKeys, currentPageRowKeys), allDisabledKey))
            : flattenDeep(difference(localSelectedRowKeys, currentPageRowKeys, allDisabledKey));
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
      getAllDisabledKey(data);
      const key = getRowKey(rest[1], rowKey);
      const thisCheckboxProps = getCheckboxProps?.(rest[1]) || {};
      const { tooltipProps, disabled, ...restCheckboxProps } = thisCheckboxProps;
      const contentNode = (
        <div>
          <Checkbox
            {...restCheckboxProps}
            disabled={disabled || isParentDisabled(key) || isChildDisabled(key)}
            indeterminate={!isRowAllSelected(key) && isRowPartSelected(key)}
            checked={
              Array.isArray(key)
                ? key.some((keyItem) => localSelectedRowKeys.includes(keyItem))
                : localSelectedRowKeys.includes(key)
            }
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              getAllDisabledKey(data);
              const latestLocalSelectedRowKeys = e.target.checked
                ? flattenDeep(difference(union(localSelectedRowKeys, flattenDeep([key])), allDisabledKey))
                : flattenDeep(difference(localSelectedRowKeys, flattenDeep([key]), allDisabledKey));
              setLocalSelectedRowKeys(latestLocalSelectedRowKeys);

              const updatedSelectedRowKeys = updateParentCheck(latestLocalSelectedRowKeys, key);
              setLocalSelectedRowKeys(updatedSelectedRowKeys);

              onChange?.(updatedSelectedRowKeys, getSelectRows(updatedSelectedRowKeys));
            }}
          >
            {disabled ? null : undefined}
          </Checkbox>
        </div>
      );
      return disabled ? (
        <Tooltip placement="topLeft" arrowPointAtCenter {...tooltipProps}>
          <span>{contentNode}</span>
        </Tooltip>
      ) : (
        <Tooltip placement="topLeft" arrowPointAtCenter {...tooltipProps}>
          {contentNode}
        </Tooltip>
      );
    },
  };

  const transformSelectionPipeline = useCallback(
    (columns: ColumnsType<RecordType>) => (!isUndefined(rowSelection) ? [selectionColumn, ...columns] : columns),
    [selectionColumn, rowSelection]
  );

  return [transformSelectionPipeline, localSelectedRowKeys];
};

export default useSelection;
