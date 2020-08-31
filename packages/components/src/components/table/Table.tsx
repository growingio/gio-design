import React, { useContext, useMemo } from 'react';
import RcTable from 'rc-table';
import { ConfigContext } from '../config-provider';
import useSorter from './hook/useSorter';
import useFilter from './hook/useFilter';
import usePagination from './hook/usePagination';
import useSelection from './hook/useSelection';
import useEllipsisTooltip from './hook/useEllipsisTooltip';
import Title from './Title';
import { TableProps, ColumnsType, ColumnGroupType } from './interface';
import { cloneDeep, isUndefined, get } from 'lodash';
import { compose } from 'lodash/fp';
import Empty from './Empty';

const Table = <RecordType,>(props: TableProps<RecordType>) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    columns = [],
    dataSource = [],
    pagination = {},
    rowSelection,
    showIndex = false,
    emptyText = null,
    onChange,
    ...rest
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', customizePrefixCls);
  const [activeSorterStates, updateSorterStates, sortedData] = useSorter(columns, dataSource);
  const [activeFilterStates, updateFilterStates, filtedData] = useFilter(columns, sortedData);
  const [transformShowIndexPipeline, activePaginationedState, paginationedData, PaginationComponent] = usePagination(
    filtedData,
    pagination,
    showIndex
  );
  const [transformSelectionPipeline] = useSelection(paginationedData, rowSelection);
  const [transformEllipsisTooltipPipeline] = useEllipsisTooltip();

  const onTriggerStateUpdate = () => onChange?.(activePaginationedState, activeSorterStates, activeFilterStates);

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
            onTriggerStateUpdate={onTriggerStateUpdate}
          />
        );
      }
      if (get(column, 'children')) {
        (column as ColumnGroupType<RecordType>).children = renderTitle(get(column, 'children'));
      }
      return column;
    });

  const transformColumns = useMemo(() => renderTitle(cloneDeep(columns)), [
    activeSorterStates,
    activeFilterStates,
    columns,
  ]);

  const composedColumns = compose(
    transformEllipsisTooltipPipeline,
    transformSelectionPipeline,
    transformShowIndexPipeline
  )(transformColumns);

  const emptyElement = emptyText || (
    <div className={`${prefixCls}-empty`}>
      <Empty />
      <p>无搜素结果</p>
    </div>
  );

  return (
    <div className={`${prefixCls}-wrapper`}>
      <RcTable
        title={title ? () => title : undefined}
        prefixCls={prefixCls}
        columns={composedColumns}
        data={paginationedData}
        emptyText={emptyElement}
        {...rest}
      />
      <PaginationComponent onTriggerStateUpdate={onTriggerStateUpdate} />
    </div>
  );
};

export default Table;
