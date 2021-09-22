import { ExpandableConfig } from '@gio-design/table/lib/interface';
import { TableComponents } from '@gio-design/table/es/interface';
import { PaginationProps } from '../components/pagination/interface';
import { CheckboxProps } from '../checkbox/interface';
import { TooltipProps } from '../components/tooltip/interface';
import { EmptyProps } from '../components/empty/interfaces';

export type AlignType = 'left' | 'center' | 'right';
export type SortOrder = 'descend' | 'ascend' | null;

export type ExpandType = null | 'row' | 'nest';

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
  /**
   * 自定义className前缀
   */
  prefixCls?: string;
  /**
   * 自定义className
   */
  className?: string;
  /**
   * 表格标题
   */
  title?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 数据源
   */
  dataSource?: RecordType[];
  /**
   * 配置列
   */
  columns?: ColumnsType<RecordType>;
  /**
   * 滚动配置，超出滚动
   */
  scroll?: {
    x?: number;
    y?: number;
  };
  /**
   * 每行的key，替换默认的 ‘key’
   */
  rowKey?: string | ((record: RecordType) => string);
  /**
   * 自定义每行的className
   */
  rowClassName?: string | ((record: RecordType, index: number, indent: number) => string);
  /**
   * 行鼠标事件是否受控
   */
  hackRowEvent?: boolean;
  /**
   * 设置行属性
   */
  onRow?: GetComponentProps<RecordType>;
  /**
   * 设置头部行属性
   */
  onHeaderRow?: GetComponentProps<ColumnType<RecordType>[]>;
  /**
   * 分页配置（参考Pagination组件）
   */
  pagination?: PaginationProps | false;
  /**
   * 配置表格行是否可选择
   */
  rowSelection?: RowSelection<RecordType>;
  /**
   * 每行是否显示序号
   */
  showIndex?: boolean;
  /**
    @deprecated
    * 表格数据为空时的占位内容
  */
  emptyText?: React.ReactNode;
  empty?: EmptyProps;
  /**
   * 分页/排序/筛选变化时触发
   */
  onChange?: (
    pagination: PaginationState,
    filters: Record<string, string[]>,
    sorter: SortState<RecordType> | undefined
  ) => void;
  showHover?: boolean;
  /**
   * 是否显示表头
   */
  showHeader?: boolean;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 宽度适应内容
   */
  size?: 'default' | 'small';
  /**
   * 扩展配置
   */
  expandable?: ExpandableConfig<RecordType>;
  /**
   * 自定义渲染table
   */
  components?: TableComponents<RecordType>;
}
