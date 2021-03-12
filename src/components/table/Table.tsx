import React, { useMemo, forwardRef, createContext } from 'react';
import RcTable from 'rc-table';
import classNames from 'classnames';
import { cloneDeep, isUndefined, get, has, set } from 'lodash';
import { compose } from 'lodash/fp';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import useMergeRef from '../../utils/hooks/useMergeRef';
import useSorter from './hook/useSorter';
import useFilter from './hook/useFilter';
import usePagination from './hook/usePagination';
import useSelection from './hook/useSelection';
import useEllipsisTooltip from './hook/useEllipsisTooltip';
import useCustomRules from './hook/useCustomRules';
import Title from './Title';
import { TableProps, ColumnsType } from './interface';
import Empty from '../empty';
import { translateInnerColumns } from './utils';
import Loading from '../loading';
import useDebounceLoading from '../../utils/hooks/useDebounceLoading';
import useHackOnRow from './hook/useHackOnRow';

interface TableContextType {
  tableRef: null | React.MutableRefObject<HTMLDivElement>;
}
export const TableContext = createContext({ tableRef: null } as TableContextType);

const Table = <RecordType,>(
  props: TableProps<RecordType>,
  ref: React.MutableRefObject<HTMLDivElement>
): React.ReactElement => {
  const {
    prefixCls: customizePrefixCls,
    title,
    columns = [],
    dataSource = [],
    pagination = {},
    rowSelection,
    showIndex = false,
    emptyText,
    empty,
    onChange,
    showHover = true,
    rowKey,
    loading = false,
    onRow,
    hackRowEvent = false,
    className,
    style,
    ...rest
  } = props;
  const mergedRef = useMergeRef(ref);
  const prefixCls = usePrefixCls('table', customizePrefixCls);
  const debounceLoading = useDebounceLoading(loading, 1000);
  const onHackRow = useHackOnRow(onRow, hackRowEvent);
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
  const [transformCustomRules] = useCustomRules(prefixCls);

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
    transformCustomRules,
    transformEllipsisTooltipPipeline,
    transformSelectionPipeline,
    transformShowIndexPipeline
  )(transformColumns);

  const emptyElement = (
    <div className={`${prefixCls}-empty`}>
      <Empty description={emptyText} size='small' {...empty} />
    </div>
  );

  return (
    <TableContext.Provider value={{ tableRef: mergedRef }}>
      <div
        className={classNames(`${prefixCls}-wrapper`, className, {
          [`${prefixCls}-showHover`]: showHover,
        })}
        style={style}
        ref={mergedRef}
      >
        <Loading loading={debounceLoading}>
          <RcTable
            title={title ? () => title : undefined}
            prefixCls={prefixCls}
            columns={composedColumns}
            data={paginationedData}
            emptyText={emptyElement}
            rowKey={rowKey}
            onRow={onHackRow}
            {...rest}
          />
          <PaginationComponent onTriggerStateUpdate={onTriggerStateUpdate} />
        </Loading>
      </div>
    </TableContext.Provider>
  );
};

export default forwardRef(Table);
