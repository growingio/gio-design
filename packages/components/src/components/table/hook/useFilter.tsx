import { useMemo, useCallback, useState } from 'react';
import { get, isUndefined } from 'lodash';
import { ColumnsType, ColumnGroupType, FilterState } from '../interface';

const collectFilterStates = <RecordType, >(columns: ColumnsType<RecordType> = []): FilterState<RecordType>[] => {
  const filterStates: FilterState<RecordType>[] = [];
  columns.forEach((column) => {
    if ((column as ColumnGroupType<RecordType>).children) {
      filterStates.push(...collectFilterStates((column as ColumnGroupType<RecordType>).children));
    } else if (column.filters || column.filterDropdown) {
      const { key, filters = [], onFilter } = column;
      filterStates.push({
        column,
        key,
        filteredKeys: filters,
        onFilter,
        filters,
      });
    }
  });
  return filterStates;
};

const useFilter = <RecordType, >(
  columns: ColumnsType<RecordType>,
  data: RecordType[],
): [FilterState<RecordType>[], (filterState: FilterState<RecordType>) => void, RecordType[]] => {
  // record all filter states
  const [filterStates, setFilterStates] = useState<FilterState<RecordType>[]>(
    useMemo(() => collectFilterStates(columns), [columns]),
  );

  // update filter states action
  const updateFilterStates = useCallback(
    (filterState: FilterState<RecordType>) => {
      setFilterStates([...filterStates.filter(({ key }) => key !== filterState.key), filterState]);
    },
    [filterStates],
  );

  // 过滤出生效的状态
  const activeFilterStates = useMemo(() => filterStates.filter((state) => state.filteredKeys.length > 0), [
    filterStates,
  ]);

  // 根据生效的状态过滤出数据
  const filtedData = useMemo(
    () => activeFilterStates.reduce((accumulatorData, currentState) => {
      const { key: currentStateKey, filteredKeys, onFilter } = currentState;
      return accumulatorData.filter((record: RecordType) => {
        if (isUndefined(onFilter)) {
          return filteredKeys.includes(get(record, currentStateKey));
        }
        // eslint-disable-next-line max-nested-callbacks
        return filteredKeys.some((_key) => onFilter(_key, record));
      });
    }, data),
    [data, activeFilterStates],
  );

  return [filterStates, updateFilterStates, filtedData];
};

export default useFilter;
