import React, { useMemo, forwardRef, createContext, useCallback, useRef } from 'react';
import GioTable from '@gio-design/table';
import classNames from 'classnames';
import { get, isFunction, isNil, isEmpty, isArray, has, set, join } from 'lodash';
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
import Page from '../page';
import { TABLE_PREFIX_CLS } from '.';
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

const injectKey = <RecordType,>(columns: ColumnsType<RecordType>): ColumnsType<RecordType> =>
  columns.map((cloneColumn) => {
    if (!has(cloneColumn, 'key')) {
      if (has(cloneColumn, 'dataIndex')) {
        if (Array.isArray(get(cloneColumn, 'dataIndex'))) {
          set(cloneColumn, 'key', join(get(cloneColumn, 'dataIndex'), '-'));
        } else {
          set(cloneColumn, 'key', get(cloneColumn, 'dataIndex'));
        }
      } else {
        // eslint-disable-next-line no-console
        console.warn('gio-design table: column key or dataIndex must have one');
      }
    }
    if (has(cloneColumn, 'children')) {
      set(cloneColumn, 'children', injectKey(get(cloneColumn, 'children')));
    }
    return cloneColumn;
  }) || [];

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
  const innerColumns = useMemo(() => injectKey(columns), [columns]);

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
    const renderTitle = (column: ColumnsType<RecordType>[number]): ColumnsType<RecordType>[number] => {
      const { key, info, sortDirections, align, title: columnTitle } = column;
      const sortState = activeSorterStates.find(({ key: k }) => k === key);
      const filterState = activeFilterStates.find(({ key: k }) => k === key);

      const newColumn = { ...column };
      if (sortState || filterState || !isNil(info)) {
        newColumn.title = (
          <Title
            sorterState={sortState}
            filterState={filterState}
            prefixCls={prefixCls}
            updateSorterStates={updateSorterStates}
            updateFilterStates={updateFilterStates}
            onTriggerStateUpdate={onTriggerStateUpdate}
            sortDirections={sortDirections}
            align={align}
            title={columnTitle}
          />
        );
      }
      const children: ColumnsType<RecordType> = get(column, 'children');
      if ('children' in newColumn && isArray(children)) {
        newColumn.children = children.map((child) => renderTitle(child));
      }
      return newColumn;
    };

    return innerColumns.map((column) => renderTitle(column));
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
