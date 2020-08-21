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
  dataIndex?: string;
  width?: number | string;
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

export interface RowSelection<RecordType> {
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
}
