/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useCallback, useState } from 'react';
import { get, isUndefined, has, clone } from 'lodash';
import { useShallowCompareEffect } from 'react-use';
import { InnerColumnsType, FilterState } from '../interface';

export const collectFilterStates = <RecordType,>(
  columns: InnerColumnsType<RecordType> = []
): FilterState<RecordType>[] => {
  const filterStates: FilterState<RecordType>[] = [];
  columns.forEach((column) => {
    if (has(column, 'children')) {
      filterStates.push(...collectFilterStates(get(column, 'children')));
    } else if (column.filters) {
      const { key, filters, onFilter, defaultFilteredValue = [], filteredValue } = column;
      filterStates.push(
        clone({
          column,
          key,
          filteredKeys: filteredValue ?? defaultFilteredValue,
          onFilter,
          filters,
          isControlled: !isUndefined(filteredValue)
        })
      );
    }
  });
  return filterStates;
};

const useFilter = <RecordType,>(
  columns: InnerColumnsType<RecordType>,
  data: RecordType[]
): [FilterState<RecordType>[], (filterState: FilterState<RecordType>) => Record<string, string[]>, RecordType[], Record<string, string[]>] => {
  // record all filter states
  const [filterStates, setFilterStates] = useState<FilterState<RecordType>[]>(collectFilterStates(columns));
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  useShallowCompareEffect(() => {
    setFilterStates(collectFilterStates(columns));
  }, [columns]);

  // update filter states action
  const updateFilterStates = useCallback(
    (filterState: FilterState<RecordType>) => {
      const newFilterStates = filterState.isControlled ? filterStates : [...filterStates.filter(({ key }) => key !== filterState.key), filterState];
      const newfilters =
        [...filterStates.filter(({ key }) => key !== filterState.key), filterState]
        .reduce((prev, curr) => Object.assign(prev, { [curr.key]: curr.filteredKeys }), {} as Record<string, string[]>);
      setFilterStates(newFilterStates);
      setFilters(newfilters);
      return newfilters;
    },
    [filterStates]
  );

  // 过滤出生效的状态
  const activeFilterStates = useMemo(() => filterStates.filter((state) => state.filteredKeys.length > 0), [
    filterStates,
  ]);

  // 根据生效的状态过滤出数据
  const filtedData = useMemo(
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

  return [filterStates, updateFilterStates, filtedData, filters];
};

export default useFilter;
