import React, { useContext, useMemo } from 'react';
import RcTable from 'rc-table';
import { ConfigContext } from '../config-provider';
import useSorter from './hook/useSorter';
import useFilter from './hook/useFilter';
import useSelection from './hook/useSelection';
import usePagination from './hook/usePagination';
import Title from './Title';
import { TableProps, ColumnsType, ColumnGroupType } from './interface';
import { cloneDeep, isUndefined, get } from 'lodash';

const Table = <RecordType extends {}>(props: TableProps<RecordType>) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    columns = [],
    dataSource = [],
    pagination = {},
    rowSelection,
    ...rest
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', customizePrefixCls);
  const [activeSorterStates, updateSorterStates, sorttedData] = useSorter(columns, dataSource);
  const [activeFilterStates, updateFilterStates, filtedData] = useFilter(columns, sorttedData);
  const [paginationData, PaginationComponent] = usePagination(filtedData, pagination);

  const renderTitle = (columns: ColumnsType<RecordType>) =>
    columns.map((column) => {
      const sortState = activeSorterStates.find(({ key }) => key === column.key);
      const filterState = activeFilterStates.find(({ key }) => key === column.key);
      if (sortState || filterState || !isUndefined(column.info)) {
        const oldColumn = cloneDeep(column);
        column.title = (
          <Title
            sorterState={sortState}
            filterState={filterState}
            prefixCls={prefixCls}
            column={oldColumn}
            updateSorterStates={updateSorterStates}
            updateFilterStates={updateFilterStates}
          />
        );
      }
      if (get(column, 'children')) {
        (column as ColumnGroupType<RecordType>).children = renderTitle(get(column, 'children'));
      }
      return column;
    });

  const transformColumnsTitle = useMemo(() => renderTitle(cloneDeep(columns)), [
    activeSorterStates,
    activeFilterStates,
    columns,
  ]);

  const [transformColumns] = useSelection(transformColumnsTitle, paginationData, rowSelection);

  return (
    <div className={`${prefixCls}-wrapper`}>
      <RcTable title={() => title} prefixCls={prefixCls} columns={transformColumns} data={paginationData} {...rest} />
      {PaginationComponent}
    </div>
  );
};

export default Table;
