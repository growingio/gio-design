import React, { useMemo, forwardRef, createContext, useCallback, useRef } from 'react';
import GioTable from 'rc-table';
import classNames from 'classnames';
import { get, has, isFunction, isNil, isEmpty } from 'lodash';
import { ExpandableConfig } from 'rc-table/lib/interface';
import { compose } from 'lodash/fp';
import { RightOutlined, DownOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import { RenderExpandIcon, RowClassName } from 'rc-table/es/interface';
import useMergeRef from '../utils/hooks/useMergeRef';
import useSorter from './hook/useSorter';
import useFilter from './hook/useFilter';
import usePagination from './hook/usePagination';
import useSelection, { getRowKey } from './hook/useSelection';
import Title from './Title';
import {
  TableProps,
  ColumnsType,
  OnTriggerStateUpdateProps,
  SortState,
  ForwardRefFn,
  PaginationState,
} from './interface';
import Page from '../page';
import { getColumnKey, getColumnPos, TABLE_PREFIX_CLS } from './utils';
import Loading from '../loading';
import useHackOnRow from './hook/useHackOnRow';

declare module 'react' {
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
    columns = [],
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

  const changeEventInfo = useRef<OnTriggerStateUpdateProps<RecordType> & { refreshPagination?: () => void }>(
    {}
  ).current;
  const onTriggerStateUpdate = useCallback(
    (info: OnTriggerStateUpdateProps<RecordType>, isRefreshPage?: boolean): void => {
      const {
        paginationState = {},
        filterStates: _filterStates = {},
        sorterState,
        refreshPagination,
      } = {
        ...changeEventInfo,
        ...info,
      };
      if (isFunction(onChange)) {
        onChange(paginationState as PaginationState, _filterStates, sorterState);
      }
      if (isRefreshPage && isFunction(refreshPagination)) {
        refreshPagination();
      }
    },
    [changeEventInfo, onChange]
  );

  // -------------------------------------------------------------
  // -------------------- 排序 start ------------------------------
  // -------------------------------------------------------------
  const onSorterChange = (sorterState: SortState<RecordType>) => {
    onTriggerStateUpdate({
      sorterState,
    });
  };
  const [sortStates, updateSorterStates, sorter, getSortData] = useSorter(columns, onSorterChange);
  const sortedDataSource = getSortData(dataSource, sortStates);
  changeEventInfo.sorterState = sorter;
  // -------------------------------------------------------------
  // -------------------- 排序 end --------------------------------
  // -------------------------------------------------------------

  // -------------------------------------------------------------
  // -------------------- 过滤 start ------------------------------
  // -------------------------------------------------------------
  const onFilterChange = (changedFilters: Record<string, string[]>) => {
    onTriggerStateUpdate(
      {
        filterStates: changedFilters,
      },
      true
    );
  };
  const [filterStates, updateFilterStates, getFilterData, filters] = useFilter(columns, onFilterChange);
  const filteredDataSource = getFilterData(sortedDataSource, filterStates);
  changeEventInfo.filterStates = filters;
  // -------------------------------------------------------------
  // -------------------- 过滤 end --------------------------------
  // -------------------------------------------------------------

  // -------------------------------------------------------------
  // -------------------- 分页 start ------------------------------
  // -------------------------------------------------------------
  const onPaginationChange = (currentPage: number, currentPageSize: number) => {
    onTriggerStateUpdate({
      paginationState: {
        current: currentPage,
        pageSize: currentPageSize,
      },
    });
  };
  const [transformShowIndexPipeline, activePaginationState, paginationData, paginationComponent, refreshPage] =
    usePagination(filteredDataSource, pagination, prefixCls, showIndex, onPaginationChange);
  changeEventInfo.paginationState = activePaginationState;
  changeEventInfo.refreshPagination = refreshPage;
  // -------------------------------------------------------------
  // -------------------- 过滤 end --------------------------------
  // -------------------------------------------------------------

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
      return _columns.map((column, index) => {
        const columnKey = getColumnKey(column, getColumnPos(index));
        const sortState = sortStates.find(({ key }) => key === columnKey);
        const filterState = filterStates.find(({ key }) => key === columnKey);
        let newColumn = column;
        if (column.sorter || filterState || !isNil(column.info)) {
          newColumn = {
            ...newColumn,
            title: (
              <Title
                sorterState={sortState}
                filterState={filterState}
                prefixCls={prefixCls}
                column={column}
                updateSorterStates={updateSorterStates}
                updateFilterStates={updateFilterStates}
                onTriggerStateUpdate={onTriggerStateUpdate}
                columnKey={columnKey}
              />
            ),
          };
        }
        if (has(newColumn, 'children')) {
          newColumn = {
            ...newColumn,
            children: renderTitle(get(column, 'children')),
          };
        }
        return newColumn;
      });
    }
    return renderTitle(columns);
  }, [columns, sortStates, filterStates, prefixCls, updateSorterStates, updateFilterStates, onTriggerStateUpdate]);

  const composedColumns = compose(transformSelectionPipeline, transformShowIndexPipeline)(transformColumnTitle);

  const emptyElement = (
    <div className={`${prefixCls}-empty`}>
      <Page description={emptyText} size="small" type="noData" {...empty} />
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

  const titleFn = (data: RecordType[]) => {
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
          [`${prefixCls}-is-empty`]: isEmpty(paginationData),
        })}
        style={{ ...style, '--table-cell-padding': padding }}
        ref={mergedRef}
        data-testid="table"
      >
        <Loading loading={loading}>
          <>
            <GioTable<RecordType>
              tableLayout="fixed"
              title={isNil(title) ? undefined : titleFn}
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
          </>
        </Loading>
      </div>
    </TableContext.Provider>
  );
}

export default forwardRef(Table) as ForwardRefFn;
