import React, { useMemo, forwardRef, createContext } from 'react';
import RcTable from '@gio-design/table';
import classNames from 'classnames';
import { cloneDeep, isUndefined, get, has, set, isFunction } from 'lodash';
import { compose } from 'lodash/fp';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import useMergeRef from '../../utils/hooks/useMergeRef';
import useSorter from './hook/useSorter';
import useFilter from './hook/useFilter';
import usePagination from './hook/usePagination';
import useSelection, { getRowKey } from './hook/useSelection';
import useEllipsisTooltip from './hook/useEllipsisTooltip';
import Title from './Title';
import { TableProps, ColumnsType, OnTriggerStateUpdateProps } from './interface';
import Empty from '../empty';
import { translateInnerColumns } from './utils';
import Loading from '../loading';
import useDebounceLoading from '../../utils/hooks/useDebounceLoading';
import useHackOnRow from './hook/useHackOnRow';

interface TableContextType {
  tableRef: null | React.MutableRefObject<HTMLDivElement>;
}
export const TableContext = createContext({ tableRef: null } as TableContextType);

function Table<RecordType>(
  props: TableProps<RecordType>,
  ref: React.MutableRefObject<HTMLDivElement>
): React.ReactElement {
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
    rowClassName = '',
    ...rest
  } = props;
  const mergedRef = useMergeRef(ref);
  const prefixCls = usePrefixCls('table', customizePrefixCls);
  const debounceLoading = useDebounceLoading(loading, 1000);
  const onHackRow = useHackOnRow(onRow, hackRowEvent);
  const innerColumns = useMemo(() => translateInnerColumns(columns), [columns]);
  const [activeSorterStates, updateSorterStates, sortedData, sorter] = useSorter(innerColumns, dataSource);
  const [activeFilterStates, updateFilterStates, filtedData, filters] = useFilter(innerColumns, sortedData);
  const [transformShowIndexPipeline, activePaginationedState, paginationedData, PaginationComponent] = usePagination(
    filtedData,
    pagination,
    showIndex
  );

  const [transformSelectionPipeline, selectedRowKeys] = useSelection(paginationedData, rowSelection, {
    rowKey,
  });
  const [transformEllipsisTooltipPipeline] = useEllipsisTooltip();

  const onTriggerStateUpdate = ({
    paginationState = activePaginationedState,
    sorterState = sorter,
    filterStates = filters,
  }: OnTriggerStateUpdateProps<RecordType>): void => {
    onChange?.(paginationState, filterStates, sorterState);
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
  const transformColumns = useMemo(
    () => renderTitle(innerColumns),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeSorterStates, activeFilterStates, innerColumns, prefixCls]
  );

  const composedColumns = compose(
    transformEllipsisTooltipPipeline,
    transformSelectionPipeline,
    transformShowIndexPipeline
  )(transformColumns);

  const emptyElement = (
    <div className={`${prefixCls}-empty`}>
      <Empty description={emptyText} size="small" {...empty} />
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
          <RcTable<RecordType>
            tableLayout="fixed"
            title={title ? () => title : undefined}
            prefixCls={prefixCls}
            columns={composedColumns}
            data={paginationedData}
            emptyText={emptyElement}
            rowKey={rowKey}
            onRow={onHackRow}
            rowClassName={(record, index, indent) => {
              const rowClassNameFromOutset = isFunction(rowClassName)
                ? rowClassName(record, index, indent)
                : rowClassName;
              return selectedRowKeys.includes(getRowKey(record, rowKey))
                ? classNames(`${prefixCls}-row-selected`, rowClassNameFromOutset)
                : rowClassNameFromOutset;
            }}
            {...rest}
          />
          <PaginationComponent onTriggerStateUpdate={onTriggerStateUpdate} />
        </Loading>
      </div>
    </TableContext.Provider>
  );
}

export default forwardRef(Table);
