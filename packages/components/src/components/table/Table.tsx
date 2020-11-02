import React, { useContext, useMemo } from 'react';
import RcTable from 'rc-table';
import classNames from 'classnames';
import { cloneDeep, isUndefined, get, has, set } from 'lodash';
import { compose } from 'lodash/fp';
import { ConfigContext } from '../config-provider';
import useSorter from './hook/useSorter';
import useFilter from './hook/useFilter';
import usePagination from './hook/usePagination';
import useSelection from './hook/useSelection';
import useEllipsisTooltip from './hook/useEllipsisTooltip';
import Title from './Title';
import { TableProps, ColumnsType } from './interface';
import Empty from './Empty';
import { translateInnerColumns } from './utils';

const Table = <RecordType,>(props: TableProps<RecordType>): React.ReactElement => {
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
    showHover = true,
    rowKey,
    ...rest
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', customizePrefixCls);

  const innerColumns = useMemo(() => translateInnerColumns(columns), [columns]);
  const [activeSorterStates, updateSorterStates, sortedData] = useSorter(innerColumns, dataSource);
  const [activeFilterStates, updateFilterStates, filtedData] = useFilter(innerColumns, sortedData);
  const [
    transformShowIndexPipeline,
    activePaginationedState,
    paginationedData,
    PaginationComponent,
    resetPagination,
  ] = usePagination(filtedData, pagination, showIndex);

  const [transformSelectionPipeline] = useSelection(paginationedData, rowSelection, {
    rowKey,
  });
  const [transformEllipsisTooltipPipeline] = useEllipsisTooltip();

  const onTriggerStateUpdate = (reset: boolean = false) => {
    if (reset) {
      resetPagination();
    }
    onChange?.(activePaginationedState, activeSorterStates, activeFilterStates);
  };

  const renderTitle = (_columns: ColumnsType<RecordType>) =>
    cloneDeep(_columns).map((column) => {
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
      if (has(column, 'children')) {
        set(column, 'children', renderTitle(get(column, 'children')));
      }
      return column;
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transformColumns = useMemo(() => renderTitle(innerColumns), [
    activeSorterStates,
    activeFilterStates,
    innerColumns,
    prefixCls,
  ]);

  const composedColumns = compose(
    transformEllipsisTooltipPipeline,
    transformSelectionPipeline,
    transformShowIndexPipeline
  )(transformColumns);

  const emptyElement = emptyText || (
    <div className={`${prefixCls}-empty`}>
      <Empty />
      <p>无搜索结果</p>
    </div>
  );

  return (
    <div
      className={classNames(`${prefixCls}-wrapper`, {
        [`${prefixCls}-showHover`]: showHover,
      })}
    >
      <RcTable
        title={title ? () => title : undefined}
        prefixCls={prefixCls}
        columns={composedColumns}
        data={paginationedData}
        emptyText={emptyElement}
        rowKey={rowKey}
        {...rest}
      />
      <PaginationComponent onTriggerStateUpdate={onTriggerStateUpdate} />
    </div>
  );
};

export default Table;
