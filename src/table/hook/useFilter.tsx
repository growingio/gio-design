import { useMemo, useCallback, useState, useEffect } from 'react';
import { get, isUndefined, has, clone, isFunction } from 'lodash';
import { GetRowKey } from '@gio-design/table/es/interface';
import { ColumnsType, FilterState } from '../interface';
import { getRowKey } from './useSelection';

export const collectFilterStates = <RecordType,>(
  columns: ColumnsType<RecordType> = [],
  rowKey: string | GetRowKey<RecordType>
): FilterState<RecordType>[] => {
  const filterStates: FilterState<RecordType>[] = [];
  columns.forEach((column) => {
    if (has(column, 'children')) {
      filterStates.push(...collectFilterStates(get(column, 'children'), rowKey));
    } else if (column.filters) {
      const { key, filters, onFilter, defaultFilteredValue = [], filteredValue } = column;
      filterStates.push(
        clone({
          column,
          key: key || getRowKey(column, rowKey),
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

const useFilter = <RecordType,>(
  columns: ColumnsType<RecordType>,
  data: RecordType[],
  onFilterChange: (filters: Record<string, string[]>) => void,
  rowKey: string | GetRowKey<RecordType>
): [
  FilterState<RecordType>[],
  (filterState: FilterState<RecordType>) => Record<string, string[]>,
  RecordType[],
  Record<string, string[]>
] => {
  // record all filter states
  const [filterStates, setFilterStates] = useState<FilterState<RecordType>[]>(collectFilterStates(columns, rowKey));
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  useEffect(() => {
    const collectedFilterStates = collectFilterStates(columns, rowKey);

    const allIsControlled = collectedFilterStates.every(({ isControlled }) => isControlled);

    if (allIsControlled) {
      setFilterStates(collectedFilterStates);
    }
  }, [columns, rowKey]);

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

  // 过滤出生效的状态
  const activeFilterStates = useMemo(
    () => filterStates.filter((state) => state.filteredKeys?.length > 0),
    [filterStates]
  );

  // 根据生效的状态过滤出数据
  const filteredData = useMemo(
    () =>
      activeFilterStates.reduce((accumulatorData, currentState) => {
        const { key: currentStateKey, filteredKeys, onFilter } = currentState;
        return accumulatorData.filter((record: RecordType) => {
          const filterFunction = (_key: string) =>
            isUndefined(onFilter) ? _key === get(record, currentStateKey) : onFilter(_key, record);
          return filteredKeys.some(filterFunction);
        });
      }, data),
    [data, activeFilterStates]
  );

  return [filterStates, updateFilterStates, filteredData, filters];
};

export default useFilter;
