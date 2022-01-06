import { useState, useMemo, useCallback, useEffect } from 'react';
import { get, isNil, has, isFunction } from 'lodash';
import { GetRowKey } from '@gio-design/table/es/interface';
import { ColumnsType, SortState } from '../interface';
import { getRowKey } from './useSelection';

export const collectSortStates = <RecordType,>(
  columns: ColumnsType<RecordType> = [],
  rowKey: string | GetRowKey<RecordType>
): SortState<RecordType>[] => {
  const sortStates: SortState<RecordType>[] = [];
  columns.forEach((column) => {
    if (has(column, 'children')) {
      sortStates.push(...collectSortStates(get(column, 'children'), rowKey));
    } else if (column.sorter) {
      const {
        key,
        sortPriorityOrder,
        sortDirections = ['ascend', 'descend', null],
        sortOrder,
        defaultSortOrder,
      } = column;
      sortStates.push({
        column,
        key: key || getRowKey(column, rowKey),
        sortPriorityOrder,
        sortDirections,
        sortOrder: sortOrder || defaultSortOrder || null,
        isControlled: !isNil(sortOrder),
      });
    }
  });
  return sortStates;
};

const useSorter = <RecordType,>(
  columns: ColumnsType<RecordType>,
  data: RecordType[],
  onChange: (sorterState: SortState<RecordType>) => void,
  rowKey: string | GetRowKey<RecordType>
): [
  SortState<RecordType>[],
  (sortState: SortState<RecordType>) => SortState<RecordType>,
  RecordType[],
  SortState<RecordType> | undefined
] => {
  // record all sorter states
  const [sortStates, setSortStates] = useState<SortState<RecordType>[]>(collectSortStates(columns, rowKey));
  const [_sorter, setSorter] = useState<SortState<RecordType>>();

  useEffect(() => {
    const collectedData = collectSortStates(columns, rowKey);

    const allIsControlled = collectedData.every(({ isControlled }) => isControlled);

    if (allIsControlled) {
      setSortStates(collectedData);
    }
  }, [columns, rowKey]);

  // update sorter states action
  const updateSorterStates = useCallback(
    (incomingSortState: SortState<RecordType>) => {
      setSorter(incomingSortState);
      setSortStates((oldSortStates) =>
        oldSortStates.map((_sortState) => {
          const innerSortState = _sortState;
          // if update column haven't sortPriorityOrder, clear all active sortOrder state.
          // if update column haven sortPriorityOrder, only update sortOrder which column haven't sortPriorityOrder.
          if (
            (isNil(incomingSortState.sortPriorityOrder) || isNil(innerSortState.sortPriorityOrder)) &&
            !innerSortState.isControlled
          ) {
            innerSortState.sortOrder = null;
          }
          if (innerSortState.key === incomingSortState.key) {
            if (incomingSortState.isControlled) {
              return innerSortState;
            }
            innerSortState.sortOrder = incomingSortState.sortOrder;
          }
          return innerSortState;
        })
      );
      if (isFunction(onChange)) {
        onChange(incomingSortState);
      }
      return incomingSortState;
    },
    [onChange]
  );

  // filter active sorter states
  const activeSortStates = useMemo(
    () => sortStates.filter((state: SortState<RecordType>) => !!state.sortOrder),
    [sortStates]
  );

  // sorted data
  const sortedData: RecordType[] = useMemo(() => {
    const cloneSortStates = [...activeSortStates].sort((a, b) => {
      if (isNil(a) || isNil(b)) return 0;
      if (isNil(a.sortPriorityOrder) || isNil(b.sortPriorityOrder)) return 0;
      return b.sortPriorityOrder - a.sortPriorityOrder;
    });

    if (cloneSortStates.length === 0) {
      return data;
    }
    return data.sort((record1, record2) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const sorterState of cloneSortStates) {
        const {
          column: { sorter },
          sortOrder,
        } = sorterState;

        if (sortOrder && sorter) {
          // server sort
          if (sorter === true) {
            return 0;
          }
          const compareResult = sorter(record1, record2);

          if (compareResult !== 0) {
            return sortOrder === 'ascend' ? compareResult : -compareResult;
          }
        }
      }
      return 0;
    });
  }, [activeSortStates, data]);

  return [sortStates, updateSorterStates, sortedData, _sorter];
};

export default useSorter;
