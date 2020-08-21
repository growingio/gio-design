import React, { useMemo, useState, useCallback } from 'react';
import { ColumnsType, RowSelection } from '../interface';
import Checkbox from '../../checkbox';
import { get, isEqual, intersection, isUndefined, difference, union } from 'lodash';

const useSelection = <RecordType,>(
  columns: ColumnsType<RecordType>,
  data: RecordType[],
  rowSelection: RowSelection<RecordType> | undefined
): [ColumnsType<RecordType>] => {
  const { onChange } = rowSelection || {};
  const [localSelectedRowKeys, setLocalSelectedRowKeys] = useState<string[]>([]);
  const currentPageRowKeys = useMemo(() => data.map((item) => get(item, 'key')), [data]);
  const allChecked = useMemo(() => isEqual(localSelectedRowKeys, currentPageRowKeys), [
    currentPageRowKeys,
    localSelectedRowKeys,
  ]);
  const atLeastOneChecked = useMemo(() => intersection(currentPageRowKeys, localSelectedRowKeys).length > 0, [
    currentPageRowKeys,
    localSelectedRowKeys,
  ]);
  const partChecked = useMemo(() => !allChecked && atLeastOneChecked, [allChecked, atLeastOneChecked]);
  const getSelectRows = useCallback(
    (_selectedRowKeys) => data.filter((item) => _selectedRowKeys.includes(get(item, 'key'))),
    [data]
  );

  const selectionColumn = {
    title: (
      <Checkbox
        checked={atLeastOneChecked}
        indeterminate={partChecked}
        onChange={(e) => {
          const latestLocalSelectedRowKeys = e.target.checked ? currentPageRowKeys : [];
          setLocalSelectedRowKeys(latestLocalSelectedRowKeys);
          onChange?.(latestLocalSelectedRowKeys, getSelectRows(latestLocalSelectedRowKeys));
        }}
      />
    ),
    key: 'selection',
    width: 48,
    render: (value: string) => {
      const key = get(value, 'key');
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

  const transitionColumn = useMemo(() => [selectionColumn, ...columns], [columns, selectionColumn]);
  if (isUndefined(rowSelection)) {
    return [columns];
  }
  return [transitionColumn];
};

export default useSelection;
