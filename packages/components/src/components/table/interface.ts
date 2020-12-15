import React from 'react';
import { PaginationProps } from '../pagination/interface';
import { CheckboxProps } from '../checkbox/interface';

export type AlignType = 'left' | 'center' | 'right';
export type SortOrder = 'descend' | 'ascend' | null;

export type GetComponentProps<DataType> = (data: DataType, index?: number) => React.HTMLAttributes<HTMLElement>;

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
  onTriggerStateUpdate: (reset?: boolean) => void;
}

export interface RowSelection<RecordType> {
  selectedRowKeys?: string[];
  columnWidth?: number | string;
  fixed?: 'left' | 'right' | boolean;
  onChange?: (selectedRowKeys: string[], selectedRows: RecordType[]) => void;
  getCheckboxProps?: (record: RecordType) => CheckboxProps;
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
  emptyText?: React.ReactNode;
  onChange?: (pagination: PaginationState, sorter: SortState<RecordType>[], filters: FilterState<RecordType>[]) => void;
  showHover?: boolean;
  showHeader?: boolean;
  loading?: boolean;
}
