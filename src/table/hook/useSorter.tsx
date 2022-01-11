import { useState, useCallback, useEffect } from 'react';
import { get, isNil, has, isFunction } from 'lodash';
import { ColumnsType, SortState } from '../interface';
import { getColumnKey, getColumnPos } from '../utils';

type OnSortChange<RecordType> = (sortState: SortState<RecordType>) => void;
type UpdateSortState<RecordType> = (sortState: SortState<RecordType>) => SortState<RecordType>;

const collectSortStates = <RecordType,>(
  columns: ColumnsType<RecordType>,
  position?: string
): SortState<RecordType>[] => {
  const sortStates: SortState<RecordType>[] = [];
  columns.forEach((column, index) => {
    const columnPosition = getColumnPos(index, position);
    const columnKey = getColumnKey(column, columnPosition);
    if (has(column, 'children')) {
      sortStates.push(...collectSortStates(get(column, 'children'), columnPosition));
    } else if (column.sorter) {
      const {
        sortPriorityOrder = 0,
        sortDirections = ['ascend', 'descend', null],
        sortOrder,
        defaultSortOrder,
      } = column;
      sortStates.push({
        column,
        key: columnKey,
        sortPriorityOrder,
        sortDirections,
        sortOrder: sortOrder || defaultSortOrder || null,
        isControlled: !isNil(sortOrder),
      });
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
  const [sortStates, setSortStates] = useState<SortState<RecordType>[]>(collectSortStates(columns));
  const [_sorter, setSorter] = useState<SortState<RecordType>>({} as SortState<RecordType>);

  useEffect(() => {
    const collectedData = collectSortStates(columns);

    const allIsControlled = collectedData.every(({ isControlled }) => isControlled);

    if (allIsControlled) {
      setSortStates(collectedData);
    }
  }, [columns]);

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

  return [sortStates, updateSorterStates, _sorter, getSortedData];
};

export default useSorter;
