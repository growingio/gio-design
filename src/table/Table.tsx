import React, { useMemo, forwardRef, createContext, useCallback, useRef } from 'react';
import GioTable from '@gio-design/table';
import classNames from 'classnames';
import { cloneDeep, isUndefined, get, has, set, isFunction } from 'lodash';
import { ExpandableConfig } from '@gio-design/table/lib/interface';
import { compose } from 'lodash/fp';
import { RightOutlined, DownOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import { RenderExpandIcon, RowClassName } from '@gio-design/table/es/interface';
import useMergeRef from '../utils/hooks/useMergeRef';
import useSorter from './hook/useSorter';
import useFilter from './hook/useFilter';
import usePagination from './hook/usePagination';
import useSelection, { getRowKey } from './hook/useSelection';
import Title from './Title';
import { TableProps, ColumnsType, OnTriggerStateUpdateProps, SortState, ForwardRefFn } from './interface';
import Empty from '../components/empty';
import { TABLE_PREFIX_CLS, translateInnerColumns } from './utils';
import Loading from '../loading';
import useHackOnRow from './hook/useHackOnRow';

declare module 'React' {
  interface CSSProperties {
    '--table-cell-padding'?: React.CSSProperties['padding'];
  }
}

interface TableContextType {
  tableRef: React.ForwardedRef<HTMLDivElement>;
}
export const TableContext = createContext<TableContextType>({ tableRef: null });

function Table<RecordType>(props: TableProps<RecordType>, ref: React.ForwardedRef<HTMLDivElement>): React.ReactElement {
  const {
    title,
    columns,
    dataSource = [],
    pagination = {},
    rowSelection,
    showIndex = false,
    padding = '12px 16px',
    emptyText,
    empty,
    onChange,
    showHover = true,
    rowKey = 'key',
    loading = false,
    onRow,
    hackRowEvent = false,
    className,
    style,
    rowClassName = '',
    expandable,
    ...rest
  } = props;
  const mergedRef = useMergeRef(ref);
  const prefixCls = usePrefixCls(TABLE_PREFIX_CLS);
  const onHackRow = useHackOnRow(onRow, hackRowEvent);
  const innerColumns = useMemo(() => translateInnerColumns(columns), [columns]);

  const changeEventInfo = useRef<OnTriggerStateUpdateProps<RecordType> & { refreshPagination?: () => void }>(
    {}
  ).current;
  const onTriggerStateUpdate = useCallback(
    (info: OnTriggerStateUpdateProps<RecordType>, isRefreshPage?: boolean): void => {
      const { paginationState, filterStates, sorterState, refreshPagination } = {
        ...changeEventInfo,
        ...info,
      };
      if (isFunction(onChange)) {
        onChange(paginationState, filterStates, sorterState);
      }
      if (isRefreshPage && isFunction(refreshPagination)) {
        refreshPagination();
      }
    },
    [changeEventInfo, onChange]
  );

  const onSorterChange = (sorterState: SortState<RecordType>) => {
    onTriggerStateUpdate({
      sorterState,
    });
  };
  const [activeSorterStates, updateSorterStates, sortedData, sorter] = useSorter(
    innerColumns,
    dataSource,
    onSorterChange,
    rowKey
  );
  changeEventInfo.sorterState = sorter;

  const onFilterChange = (changedFilters: Record<string, string[]>) => {
    onTriggerStateUpdate(
      {
        filterStates: changedFilters,
      },
      true
    );
  };
  const [activeFilterStates, updateFilterStates, filteredData, filters] = useFilter(
    innerColumns,
    sortedData,
    onFilterChange,
    rowKey
  );
  changeEventInfo.filterStates = filters;

  const onPaginationChange = (currentPage: number, currentPageSize: number) => {
    onTriggerStateUpdate({
      paginationState: {
        current: currentPage,
        pageSize: currentPageSize,
      },
    });
  };
  const [transformShowIndexPipeline, activePaginationState, paginationData, paginationComponent, refreshPage] =
    usePagination(filteredData, pagination, prefixCls, showIndex, onPaginationChange);
  changeEventInfo.paginationState = activePaginationState;
  changeEventInfo.refreshPagination = refreshPage;

  const expandIcon: RenderExpandIcon<RecordType> = (expandProps) => {
    const { expanded, onExpand, record, expandable: expandableProp } = expandProps;
    if (expandableProp) {
      return expanded ? (
        <DownOutlined
          size="12px"
          className={`${prefixCls}-expanded-icon`}
          onClick={(event) => {
            isFunction(onExpand) && onExpand(record, event as React.MouseEvent<HTMLElement, MouseEvent>);
          }}
        />
      ) : (
        <RightOutlined
          size="12px"
          className={`${prefixCls}-to_expand-icon`}
          onClick={(event) => {
            isFunction(onExpand) && onExpand(record, event as React.MouseEvent<HTMLElement, MouseEvent>);
          }}
        />
      );
    }
    return <div className={`${prefixCls}-expanded-placeholder`} />;
  };

  const mergeExpandable: ExpandableConfig<RecordType> = {
    childrenColumnName: 'children',
    expandIcon,
    indentSize: 24,
    expandIconColumnIndex: rowSelection ? 1 : 0,
    ...expandable,
  };

  const [transformSelectionPipeline, selectedRowKeys] = useSelection<RecordType>(paginationData, rowSelection, {
    rowKey,
  });

  const transformColumnTitle = useMemo(() => {
    function renderTitle(_columns: ColumnsType<RecordType>): ColumnsType<RecordType> {
      return cloneDeep(_columns).map((column) => {
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
    }
    return renderTitle(innerColumns);
  }, [
    innerColumns,
    activeSorterStates,
    activeFilterStates,
    prefixCls,
    updateSorterStates,
    updateFilterStates,
    onTriggerStateUpdate,
  ]);

  const composedColumns = compose(transformSelectionPipeline, transformShowIndexPipeline)(transformColumnTitle);

  const emptyElement = (
    <div className={`${prefixCls}-empty`}>
      <Empty description={emptyText} size="small" {...empty} />
    </div>
  );

  const rowClassNameCallback = useCallback<RowClassName<RecordType>>(
    (record, index, indent) => {
      const rowClassNameFromOutset = isFunction(rowClassName) ? rowClassName(record, index, indent) : rowClassName;
      return selectedRowKeys.includes(getRowKey(record, rowKey))
        ? classNames(`${prefixCls}-row-selected`, rowClassNameFromOutset)
        : rowClassNameFromOutset;
    },
    [rowClassName, selectedRowKeys, rowKey, prefixCls]
  );

  const titleFn: TableProps<RecordType>['title'] = (data) => {
    if (isFunction(title)) {
      return title(data);
    }
    return title;
  };

  return (
    <TableContext.Provider value={{ tableRef: mergedRef }}>
      <div
        className={classNames(`${prefixCls}-wrapper`, className, {
          [`${prefixCls}-showHover`]: showHover,
        })}
        style={{ ...style, '--table-cell-padding': padding }}
        ref={mergedRef}
        data-testid="table"
      >
        <Loading loading={loading}>
          <GioTable<RecordType>
            tableLayout="fixed"
            title={isUndefined(title) ? undefined : titleFn}
            prefixCls={prefixCls}
            columns={composedColumns}
            data={paginationData}
            emptyText={emptyElement}
            rowKey={rowKey}
            onRow={onHackRow}
            className={`${prefixCls}-normal`}
            rowClassName={rowClassNameCallback}
            expandable={mergeExpandable}
            {...rest}
          />
          {paginationComponent}
        </Loading>
      </div>
    </TableContext.Provider>
  );
}

export default forwardRef(Table) as ForwardRefFn;
