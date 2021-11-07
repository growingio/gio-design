import { useState, useMemo, useCallback, useEffect } from 'react';
import { get, isUndefined, clone, has, isFunction } from 'lodash';
import { ColumnsType, SortState } from '../interface';

export const collectSortStates = <RecordType,>(columns: ColumnsType<RecordType> = []): SortState<RecordType>[] => {
  const sortStates: SortState<RecordType>[] = [];
  columns.forEach((column) => {
    if (has(column, 'children')) {
      sortStates.push(...collectSortStates(get(column, 'children')));
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
        key,
        sortPriorityOrder,
        sortDirections,
        sortOrder: sortOrder || defaultSortOrder || null,
        isControlled: !isUndefined(sortOrder),
      });
    }
  });
  return sortStates;
};

const useSorter = <RecordType,>(
  columns: ColumnsType<RecordType>,
  data: RecordType[],
  onChange?: (sorterState: SortState<RecordType>) => void
): [
  SortState<RecordType>[],
  (sortState: SortState<RecordType>) => SortState<RecordType>,
  RecordType[],
  SortState<RecordType> | undefined
] => {
  // record all sorter states
  const [sortStates, setSortStates] = useState<SortState<RecordType>[]>(collectSortStates(columns));
  const [_sorter, setSorter] = useState<SortState<RecordType>>();

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
            (isUndefined(incomingSortState.sortPriorityOrder) || isUndefined(innerSortState.sortPriorityOrder)) &&
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
    const cloneSortStates = clone(activeSortStates).sort((a, b) => b.sortPriorityOrder - a.sortPriorityOrder);

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
