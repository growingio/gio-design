import React from 'react';
import { PaginationProps } from '../pagination/interface';

export type AlignType = 'left' | 'center' | 'right';
export type SortOrder = 'descend' | 'ascend' | null;

export interface ColumnType<RecordType> {
  key: string;
  title?: React.ReactNode;
  info?: string;
  fixed?: 'left' | 'right' | boolean;
  align?: AlignType;
  dataIndex?: string | string[];
  width?: number | string;
  ellipsis?: boolean;
  // Sorter
  // 设定排序函数才开启排序功能
  sorter?: (a: RecordType, b: RecordType) => number;
  sortDirections?: SortOrder[];
  sortPriorityOrder?: number;
  defaultSortOrder?: SortOrder;
  // filter
  filters?: string[];
  onFilter?: (value: string, record: RecordType) => boolean;
  filterDropdown?: React.ReactNode;
  render?: (text: string, record: RecordType, index: number) => React.ReactNode;
}

export interface ColumnGroupType<RecordType> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  children: ColumnsType<RecordType>;
}

export type ColumnsType<RecordType> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];

export interface SortState<RecordType> {
  column: ColumnType<RecordType>;
  key: string;
  sortPriorityOrder: number | undefined;
  sortDirections: SortOrder[];
  sortOrder: SortOrder;
}

export interface FilterState<RecordType> {
  column: ColumnType<RecordType>;
  key: string;
  filteredKeys: string[];
  onFilter?: (value: string, record: RecordType) => boolean;
  filters?: string[];
}

export interface PaginationState {
  current: number;
  pageSize: number;
}

export interface TitleProps<RecordType> {
  prefixCls: string;
  sorterState?: SortState<RecordType>;
  filterState?: FilterState<RecordType>;
  column: ColumnType<RecordType>;
  updateSorterStates: (sortState: SortState<RecordType>) => void;
  updateFilterStates: (filterState: FilterState<RecordType>) => void;
  onTriggerStateUpdate: () => void;
}

export interface RowSelection<RecordType> {
  selectedRowKeys?: string[];
  columnWidth?: number | string;
  fixed?: 'left' | 'right' | boolean;
  onChange?: (selectedRowKeys: string[], selectedRows: RecordType[]) => void;
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
  pagination?: PaginationProps | false;
  rowSelection?: RowSelection<RecordType>;
  showIndex?: boolean;
  emptyText?: React.ReactNode;
  onChange?: (pagination: PaginationState, sorter: SortState<RecordType>[], filters: FilterState<RecordType>[]) => void;
}
