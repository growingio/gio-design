import React, { useMemo } from 'react';
import RcTable from 'rc-table';
import classNames from 'classnames';
import { cloneDeep, isUndefined, get, has, set } from 'lodash';
import { compose } from 'lodash/fp';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import useSorter from './hook/useSorter';
import useFilter from './hook/useFilter';
import usePagination from './hook/usePagination';
import useSelection from './hook/useSelection';
import useEllipsisTooltip from './hook/useEllipsisTooltip';
import Title from './Title';
import { TableProps, ColumnsType } from './interface';
import Empty from './Empty';
import { translateInnerColumns } from './utils';
import Loading from '../loading';
import useDebounceLoading from '../../utils/hooks/useDebounceLoading';

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
    loading = false,
    ...rest
  } = props;

  const prefixCls = usePrefixCls('table', customizePrefixCls);
  const debounceLoading = useDebounceLoading(loading, 1000);
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

  const onTriggerStateUpdate = (reset = false, paginationState = activePaginationedState): void => {
    if (reset) {
      resetPagination();
    }
    // 通过 activePaginationedState 拿不到最新的状态
    onChange?.(paginationState, activeSorterStates, activeFilterStates);
  };

  const renderTitle = (_columns: ColumnsType<RecordType>): ColumnsType<RecordType> =>
    cloneDeep(_columns).map((column) => {
      const sortState = activeSorterStates.find(({ key }) => key === column.key);
      const filterState = activeFilterStates.find(({ key }) => key === column.key);
      if (sortState || filterState || !isUndefined(column.info)) {
        const oldColumn = cloneDeep(column);
        set(
          column,
          'title',
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
      <Loading loading={debounceLoading}>
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
      </Loading>
    </div>
  );
};

export default Table;
