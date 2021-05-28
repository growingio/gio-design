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
      const { key, sortPriorityOrder, sortDirections = ['ascend', 'descend', null], sortOrder, defaultSortOrder } = column;
      sortStates.push({
        column,
        key,
        sortPriorityOrder,
        sortDirections,
        sortOrder: sortOrder || defaultSortOrder || null,
        isControlled: !isUndefined(sortOrder)
      });
    }
  });
  return sortStates;
};

const useSorter = <RecordType,>(
  columns: InnerColumnsType<RecordType>,
  data: RecordType[]
): [SortState<RecordType>[], (sortState: SortState<RecordType>) => SortState<RecordType>, RecordType[], SortState<RecordType> | undefined] => {
  // record all sorter states
  const [sortStates, setSortStates] = useState<SortState<RecordType>[]>(collectSortStates(columns));
  const [_sorter, setSorter] = useState<SortState<RecordType>>();

  useShallowCompareEffect(() => {
    setSortStates(collectSortStates(columns));
  }, [columns]);

  // update sorter states action
  const updateSorterStates = useCallback(
    (incomingSortState: SortState<RecordType>) => {
      setSorter(incomingSortState);
      setSortStates(
        sortStates.map((_sortState) => {
          const innerSortState = _sortState;
          // if update cloumn haven't sortPriorityOrder, clear all active sortOrder state.
          // if update cloumn haven sortPriorityOrder, only update sortOrder which cloumn haven't sortPriorityOrder.
          if ((isUndefined(incomingSortState.sortPriorityOrder) || isUndefined(innerSortState.sortPriorityOrder)) && !innerSortState.isControlled) {
            innerSortState.sortOrder = null;
          }
          if(innerSortState.key === incomingSortState.key) {
            if(incomingSortState.isControlled) {
              return innerSortState;
            }
            innerSortState.sortOrder = incomingSortState.sortOrder;
          }
          return innerSortState;
        })
      );
      return incomingSortState;
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
          // server sort
          if(sorter === true) {
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
