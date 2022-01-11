import { useCallback, useState, useEffect } from 'react';
import { get, isUndefined, isFunction } from 'lodash';
import { ColumnsType, FilterState } from '../interface';
import { getColumnPos, getColumnKey } from '../utils';

const collectFilterStates = <RecordType,>(
  columns: ColumnsType<RecordType>,
  init: boolean,
  position?: string
): FilterState<RecordType>[] => {
  let filterStates: FilterState<RecordType>[] = [];

  columns.forEach((column, index) => {
    const { filters, onFilter, defaultFilteredValue = [], filteredValue } = column;

    const columnPosition = getColumnPos(index, position);
    const columnKey = getColumnKey(column, columnPosition);

    if (filters && onFilter) {
      if (filteredValue) {
        filterStates.push({
          column,
          key: columnKey,
          filteredKeys: filteredValue,
          onFilter,
          isControlled: true,
          filters,
        });
      } else {
        filterStates.push({
          column,
          key: columnKey,
          filteredKeys: init ? defaultFilteredValue : [],
          onFilter,
          isControlled: false,
          filters,
        });
      }
    }

    if ('children' in column) {
      filterStates = [...filterStates, ...collectFilterStates(column.children, init, columnPosition)];
    }
  });
  return filterStates;
};

const getFilteredData = <RecordType,>(
  dataSource: readonly RecordType[],
  filterStates: readonly FilterState<RecordType>[]
): RecordType[] =>
  filterStates
    .filter((state) => state.filteredKeys?.length > 0)
    .reduce((accumulatorData, currentState) => {
      const { key: currentStateKey, filteredKeys = [], onFilter } = currentState;
      return accumulatorData.filter((record: RecordType) => {
        const filterFunction = (_key: string) =>
          isUndefined(onFilter) ? _key === get(record, currentStateKey) : onFilter(_key, record);
        return filteredKeys.some(filterFunction);
      });
    }, dataSource) as RecordType[];

const useFilter = <RecordType,>(
  columns: ColumnsType<RecordType>,
  onFilterChange: (filters: Record<string, string[]>) => void
): [
  FilterState<RecordType>[],
  (filterState: FilterState<RecordType>) => Record<string, string[]>,
  typeof getFilteredData,
  Record<string, string[]>
] => {
  // record all filter states
  const [filterStates, setFilterStates] = useState<FilterState<RecordType>[]>(collectFilterStates(columns, true));
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  useEffect(() => {
    const collectedFilterStates = collectFilterStates(columns, false);

    setFilterStates((oldStates) => {
      const active = oldStates.filter((state) => state.filteredKeys?.length > 0);

      if (active.length > 0) {
        return collectedFilterStates.map((state) => {
          const { key, isControlled } = state;
          if (isControlled) return state;

          const found = active.find((item) => item.key === key);

          if (found && found.filteredKeys?.length > 0) {
            return {
              ...state,
              filteredKeys: found.filteredKeys,
            };
          }

          return state;
        });
      }

      return collectedFilterStates;
    });
  }, [columns]);

  // update filter states action
  const updateFilterStates = useCallback(
    (filterState: FilterState<RecordType>) => {
      const newFilterStates = filterState.isControlled
        ? filterStates
        : [...filterStates.filter(({ key }) => key !== filterState.key), filterState];
      const newFilters = [...filterStates.filter(({ key }) => key !== filterState.key), filterState].reduce(
        (prev, curr) => Object.assign(prev, { [curr.key]: curr.filteredKeys }),
        {} as Record<string, string[]>
      );

      setFilterStates(newFilterStates);
      setFilters(newFilters);
      if (isFunction(onFilterChange)) {
        onFilterChange(newFilters);
      }
      return newFilters;
    },
    [filterStates, onFilterChange]
  );

  return [filterStates, updateFilterStates, getFilteredData, filters];
};

export default useFilter;
