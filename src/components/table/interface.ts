import React from 'react';
import { PaginationProps } from '../pagination/interface';
import { CheckboxProps } from '../../checkbox/interface';
import { TooltipProps } from '../../tooltip/interface';
import { EmptyProps } from '../empty/interfaces';

export type AlignType = 'left' | 'center' | 'right';
export type SortOrder = 'descend' | 'ascend' | null;

export type GetComponentProps<DataType> = (data: DataType, index?: number) => React.HTMLAttributes<HTMLElement>;

export type filterType = string | { label: string; value: string };

export interface ColumnType<RecordType> {
  key?: string;
  title?: React.ReactNode;
  className?: string;
  fixed?: 'left' | 'right' | boolean;
  align?: AlignType;
  ellipsis?: boolean;
  onHeaderCell?: GetComponentProps<ColumnsType<RecordType>[number]>;

  dataIndex?: string | string[];
  width?: number | string;
  info?: string;
  render?: (value: string, record: RecordType, index: number) => React.ReactNode;
  // Sorter
  // 设定排序函数才开启排序功能
  sorter?: ((a: RecordType, b: RecordType) => number) | boolean;
  sortDirections?: SortOrder[];
  sortPriorityOrder?: number;
  defaultSortOrder?: SortOrder;
  sortOrder?: SortOrder;
  // filter
  defaultFilteredValue?: string[];
  filteredValue?: string[];
  filters?: filterType[];
  onFilter?: (value: string, record: RecordType) => boolean;
  filterSearchPlaceHolder?: string;
}

export interface ColumnGroupType<RecordType> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  children: ColumnsType<RecordType>;
}

export type ColumnsType<RecordType> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];

export interface InnerColumnType<RecordType> extends ColumnType<RecordType> {
  key: string;
}
export interface InnerColumnGroupType<RecordType> extends ColumnGroupType<RecordType> {
  key: string;
  children: InnerColumnsType<RecordType>;
}

export type InnerColumnsType<RecordType> = (InnerColumnType<RecordType> | InnerColumnGroupType<RecordType>)[];

export interface SortState<RecordType> {
  column: ColumnType<RecordType>;
  key: string;
  sortPriorityOrder: number | undefined;
  sortDirections: SortOrder[];
  sortOrder: SortOrder;
  isControlled: boolean;
}

export interface FilterState<RecordType> {
  column: ColumnType<RecordType>;
  key: string;
  filteredKeys: string[];
  onFilter?: (value: string, record: RecordType) => boolean;
  filters?: filterType[];
  isControlled: boolean;
}

export type PaginationState = {
  current: number;
  pageSize: number;
};

export type OnTriggerStateUpdateProps<RecordType> = {
  paginationState?: PaginationState;
  filterStates?: Record<string, string[]>;
  sorterState?: SortState<RecordType>;
};

export interface TitleProps<RecordType> {
  prefixCls: string;
  sorterState?: SortState<RecordType>;
  filterState?: FilterState<RecordType>;
  column: ColumnType<RecordType>;
  updateSorterStates: (sortState: SortState<RecordType>) => SortState<RecordType>;
  updateFilterStates: (filterState: FilterState<RecordType>) => Record<string, string[]>;
  onTriggerStateUpdate: (onTriggerStateUpdateProps?: OnTriggerStateUpdateProps<RecordType>) => void;
}

export interface RowSelection<RecordType> {
  selectedRowKeys?: string[];
  columnWidth?: number | string;
  fixed?: 'left' | 'right' | boolean;
  onChange?: (selectedRowKeys: string[], selectedRows: RecordType[]) => void;
  getCheckboxProps?: (record: RecordType) => CheckboxProps & { tooltipProps?: Omit<TooltipProps, 'children'> };
}

export interface TableProps<RecordType> {
  prefixCls?: string;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
  dataSource?: RecordType[];
  columns?: ColumnsType<RecordType>;
  scroll?: {
    x?: number;
    y?: number;
  };
  rowKey?: string | ((record: RecordType) => string);
  rowClassName?: string | ((record: RecordType, index: number, indent: number) => string);
  hackRowEvent?: boolean;
  onRow?: GetComponentProps<RecordType>;
  onHeaderRow?: GetComponentProps<ColumnType<RecordType>[]>;
  pagination?: PaginationProps | false;
  rowSelection?: RowSelection<RecordType>;
  showIndex?: boolean;
  /**
    @deprecated
  */
  emptyText?: React.ReactNode;
  empty?: EmptyProps;
  onChange?: (
    pagination: PaginationState,
    filters: Record<string, string[]>,
    sorter: SortState<RecordType> | undefined
  ) => void;
  showHover?: boolean;
  showHeader?: boolean;
  loading?: boolean;
}
