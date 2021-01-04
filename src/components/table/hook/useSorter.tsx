/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useCallback } from 'react';
import { useShallowCompareEffect } from 'react-use';
import { get, isUndefined, clone, has } from 'lodash';
import { InnerColumnsType, SortState } from '../interface';

export const collectSortStates = <RecordType,>(columns: InnerColumnsType<RecordType> = []): SortState<RecordType>[] => {
  const sortStates: SortState<RecordType>[] = [];
  columns.forEach((column) => {
    if (has(column, 'children')) {
      sortStates.push(...collectSortStates(get(column, 'children')));
    } else if (column.sorter) {
      const { key, sortPriorityOrder, sortDirections = ['ascend', 'descend', null] } = column;
      sortStates.push({
        column,
        key,
        sortPriorityOrder,
        sortDirections,
        sortOrder: column.defaultSortOrder || null,
      });
    }
  });
  return sortStates;
};

const useSorter = <RecordType,>(
  columns: InnerColumnsType<RecordType>,
  data: RecordType[]
): [SortState<RecordType>[], (sortState: SortState<RecordType>) => void, RecordType[]] => {
  // record all sorter states
  const [sortStates, setSortStates] = useState<SortState<RecordType>[]>(collectSortStates(columns));

  useShallowCompareEffect(() => {
    setSortStates(collectSortStates(columns));
  }, [columns]);

  // update sorter states action
  const updateSorterStates = useCallback(
    (incomingSortState: SortState<RecordType>) => {
      setSortStates(
        sortStates.map((_sortState) => {
          const innerSortState = _sortState;
          // if updata cloumn have not sortPriorityOrder, clear all active sortOrder state.
          if (isUndefined(incomingSortState.sortPriorityOrder)) {
            innerSortState.sortOrder = null;
            // only update sortOrder which cloumn have not sortPriorityOrder.
          } else if (isUndefined(innerSortState.sortPriorityOrder)) {
            innerSortState.sortOrder = null;
          }
          if (innerSortState.key === incomingSortState.key) {
            innerSortState.sortOrder = incomingSortState.sortOrder;
          }
          return innerSortState;
        })
      );
    },
    [sortStates]
  );

  // filter active sorter states
  const activeSortStates = useMemo(() => sortStates.filter((state: SortState<RecordType>) => !!state.sortOrder), [
    sortStates,
  ]);

  // sortted data
  const sortedData: RecordType[] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cloneSortStates = clone(activeSortStates).sort((a, b) => b.sortPriorityOrder! - a.sortPriorityOrder!);

    const cloneData = clone(data);
    if (cloneSortStates.length === 0) {
      return cloneData;
    }
    return cloneData.sort((record1, record2) => {
      // eslint-disable-next-line no-restricted-syntax
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
  }, [activeSortStates, data]);

  return [sortStates, updateSorterStates, sortedData];
};

export default useSorter;
