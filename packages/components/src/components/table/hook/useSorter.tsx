import React, { useMemo, useCallback } from 'react';
import { ColumnsType, ColumnGroupType, ColumnType, SortOrder, SortState } from '../interface';
import { get, isUndefined, clone } from 'lodash';

const collectSortStates = <RecordType,>(columns: ColumnsType<RecordType> = []): SortState<RecordType>[] => {
  const sortStates: SortState<RecordType>[] = [];

  const pushState = (column: ColumnType<RecordType>, sortOrder: SortOrder) => {
    const { key, sortPriorityOrder, sortDirections = ['ascend', 'descend', null] } = column;
    sortStates.push({
      column,
      key,
      sortPriorityOrder,
      sortDirections,
      sortOrder,
    });
  };

  columns.forEach((column) => {
    if ((column as ColumnGroupType<RecordType>).children) {
      sortStates.push(...collectSortStates(get(column, 'children')));
    } else if (column.sorter) {
      pushState(column, column.defaultSortOrder || null);
    }
  });
  return sortStates;
};

const useSorter = <RecordType,>(
  columns: ColumnsType<RecordType>,
  data: RecordType[]
): [SortState<RecordType>[], (sortState: SortState<RecordType>) => void, RecordType[]] => {
  // record all sorter states
  const [sortStates, setSortStates] = React.useState<SortState<RecordType>[]>(
    useMemo(() => collectSortStates(columns), [columns])
  );

  // update sorter states action
  const updateSorterStates = useCallback(
    (sortState: SortState<RecordType>) => {
      setSortStates(
        sortStates.map((_sortState) => {
          // if updata cloumn have not sortPriorityOrder, clear all active sortOrder state.
          if (isUndefined(sortState.sortPriorityOrder)) {
            _sortState.sortOrder = null;
          } else {
            // only update sortOrder which cloumn have not sortPriorityOrder.
            if (isUndefined(_sortState.sortPriorityOrder)) {
              _sortState.sortOrder = null;
            }
          }
          if (_sortState.key === sortState.key) {
            _sortState.sortOrder = sortState.sortOrder;
          }
          return _sortState;
        })
      );
    },
    [sortStates]
  );

  // filter active sorter states
  const activeSortStates = useMemo(() => sortStates.filter((state: SortState<RecordType>) => state.sortOrder), [
    sortStates,
  ]);

  // sortted data
  const sortedData: RecordType[] = useMemo(() => {
    const cloneSortStates = clone(activeSortStates).sort((a, b) => b.sortPriorityOrder! - a.sortPriorityOrder!);

    const cloneData = clone(data);
    if (cloneSortStates.length === 0) {
      return cloneData;
    }
    return cloneData.sort((record1, record2) => {
      for (const sorterState of cloneSortStates) {
        const {
          column: { sorter },
          sortOrder,
        } = sorterState;

        if (sortOrder && sorter) {
          const compareResult = sorter(record1, record2);

          if (compareResult !== 0) {
            return sortOrder === 'ascend' ? compareResult : -compareResult;
          }
        }
      }
      return 0;
    });
  }, [columns, activeSortStates, data]);

  return [sortStates, updateSorterStates, sortedData];
};

export default useSorter;
