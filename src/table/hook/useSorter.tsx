import { useState, useCallback, useMemo } from 'react';
import { isNil, isFunction } from 'lodash';
import { ColumnsType, SortState } from '../interface';
import { getColumnKey, getColumnPos } from '../utils';

type OnSortChange<RecordType> = (sortState: SortState<RecordType>) => void;
type UpdateSortState<RecordType> = (sortState: SortState<RecordType>) => SortState<RecordType>;

const collectSortStates = <RecordType,>(
  columns: ColumnsType<RecordType>,
  init: boolean,
  position?: string
): SortState<RecordType>[] => {
  let sortStates: SortState<RecordType>[] = [];

  const push = (column: ColumnsType<RecordType>[number], key: React.Key, state?: Partial<SortState<RecordType>>) => {
    const { sortPriorityOrder, sortDirections = ['ascend', 'descend', null], sortOrder } = column;
    sortStates.push({
      column,
      key,
      sortPriorityOrder,
      sortDirections,
      sortOrder,
      isControlled: true,
      ...state,
    });
  };

  columns.forEach((column, index) => {
    const columnPosition = getColumnPos(index, position);
    const columnKey = getColumnKey(column, columnPosition);
    const { defaultSortOrder = null } = column;

    if ('children' in column) {
      if ('sortOrder' in column) {
        push(column, columnKey);
      }
      sortStates = [...sortStates, ...collectSortStates(column.children, init, columnPosition)];
    } else if ('sorter' in column) {
      if ('sortOrder' in column) {
        push(column, columnKey);
      } else if (init && defaultSortOrder) {
        push(column, columnKey, {
          sortOrder: defaultSortOrder,
          isControlled: false,
        });
      }
    }
  });
  return sortStates;
};

const getSortedData = <RecordType,>(
  dataSource: readonly RecordType[],
  sortStates: readonly SortState<RecordType>[]
): RecordType[] => {
  const activeSortStates = [...sortStates];
  // 处理排序优先级
  activeSortStates.sort((a, b) => {
    if (isNil(a) || isNil(b)) return 0;
    if (isNil(a.sortPriorityOrder) || isNil(b.sortPriorityOrder)) return 0;
    return b.sortPriorityOrder - a.sortPriorityOrder;
  });

  if (activeSortStates.length === 0) {
    return dataSource as RecordType[];
  }

  return dataSource.slice().sort((record1, record2) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const sorterState of activeSortStates) {
      const {
        column: { sorter },
        sortOrder,
      } = sorterState;

      if (sortOrder && sorter) {
        // 服务端排序
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
};

const useSorter = <RecordType,>(
  columns: ColumnsType<RecordType>,
  onChange: OnSortChange<RecordType>
): [SortState<RecordType>[], UpdateSortState<RecordType>, SortState<RecordType>, typeof getSortedData] => {
  // record all sorter states
  const [sortStates, setSortStates] = useState<SortState<RecordType>[]>(collectSortStates(columns, true));
  const [_sorter, setSorter] = useState<SortState<RecordType>>({} as SortState<RecordType>);

  const mergeStates = useMemo(() => {
    const collectedData = collectSortStates(columns, false);

    if (!collectedData.length) {
      return sortStates;
    }

    return collectedData;
  }, [columns, sortStates]);

  // update sorter states action
  const updateSorterStates = useCallback(
    (incomingSortState: SortState<RecordType>) => {
      setSorter(incomingSortState);
      setSortStates((oldSortStates) => {
        const keys: React.Key[] = [];
        const states = oldSortStates.map((_sortState) => {
          const innerSortState = _sortState;
          keys.push(innerSortState.key);
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
        });
        if (keys.indexOf(incomingSortState.key) === -1) {
          return [...states, incomingSortState];
        }
        return states;
      });
      if (isFunction(onChange)) {
        onChange(incomingSortState);
      }
      return incomingSortState;
    },
    [onChange]
  );

  return [mergeStates, updateSorterStates, _sorter, getSortedData];
};

export default useSorter;
