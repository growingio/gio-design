import { useCallback, useState, useEffect } from 'react';
import { get, isUndefined, has, clone, isFunction } from 'lodash';
import { ColumnsType, FilterState } from '../interface';
import { getColumnPos, getColumnKey } from '../utils';

const collectFilterStates = <RecordType,>(
  columns: ColumnsType<RecordType>,
  position?: string
): FilterState<RecordType>[] => {
  const filterStates: FilterState<RecordType>[] = [];
  columns.forEach((column, index) => {
    const { filters, onFilter, defaultFilteredValue = [], filteredValue } = column;
    const columnPosition = getColumnPos(index, position);
    const columnKey = getColumnKey(column, columnPosition);
    if (has(column, 'children')) {
      filterStates.push(...collectFilterStates(get(column, 'children'), columnPosition));
    } else if (filters) {
      filterStates.push(
        clone({
          column,
          key: columnKey,
          filteredKeys: filteredValue ?? defaultFilteredValue,
          onFilter,
          filters,
          isControlled: !isUndefined(filteredValue),
        })
      );
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
      const { key: currentStateKey, filteredKeys, onFilter } = currentState;
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
  const [filterStates, setFilterStates] = useState<FilterState<RecordType>[]>(collectFilterStates(columns));
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  useEffect(() => {
    const collectedFilterStates = collectFilterStates(columns);

    const allIsControlled = collectedFilterStates.every(({ isControlled }) => isControlled);

    if (allIsControlled) {
      setFilterStates(collectedFilterStates);
    }
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
