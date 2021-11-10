import { ColumnType as GioColumnType, GetComponentProps, AlignType, Key } from '@gio-design/table/es/interface';
import { TableProps as GioTableProps } from '@gio-design/table/es/Table';
import { PaginationProps } from '../pagination';
import { CheckboxProps } from '../checkbox';
import { TooltipProps } from '../tooltip';
import { PageProps } from '../page';

type SortOrder = 'descend' | 'ascend' | null;
type ExpandType = null | 'row' | 'nest';
type FilterType = string | { label: string; value: string };
type ColumnsType<RecordType = unknown> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];
type PaginationState = {
  current: number;
  pageSize: number;
};
type OnTriggerStateUpdateProps<RecordType> = {
  paginationState?: PaginationState;
  filterStates?: Record<string, string[]>;
  sorterState?: SortState<RecordType>;
};
// 支持 ForwardRef 传入泛型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ForwardRefFn = <RecordType = any>(
  props: React.PropsWithChildren<TableProps<RecordType>> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement;

interface ColumnType<RecordType> extends GioColumnType<RecordType> {
  /**
   * 标题列的描述信息
   */
  info?: string;

  /**
   * 排序函数，本地排序使用一个函数(参考 Array.sort)
   */
  sorter?: ((a: RecordType, b: RecordType) => number) | boolean;

  /**
   * 支持的排序方式
   */
  sortDirections?: SortOrder[];

  /**
   * 排序优先级
   */
  sortPriorityOrder?: number;

  /**
   * 默认排序顺序
   */
  defaultSortOrder?: SortOrder;

  /**
   * 排序的受控属性，外界可用此控制列的排序，可设置为 ascend descend false
   */
  sortOrder?: SortOrder;
  /**
   * 默认筛选值
   */
  defaultFilteredValue?: string[];

  /**
   * 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组
   */
  filteredValue?: string[];

  /**
   * 筛选菜单项
   */
  filters?: FilterType[];

  /**
   * 自定义过滤方法，Array.filter()
   * @param value filters 元素中的 value
   * @param record 表格行数据
   */
  onFilter?: (value: string, record: RecordType) => boolean;

  /**
   * 过滤器中搜索框的占位符
   * @default `搜索过滤条件`
   */
  filterSearchPlaceHolder?: string;
}

interface ColumnGroupType<RecordType> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  children: ColumnsType<RecordType>;
}

interface SortState<RecordType> {
  column: ColumnType<RecordType>;
  key: Key;
  sortPriorityOrder: number | undefined;
  sortDirections: SortOrder[];
  sortOrder: SortOrder;
  isControlled: boolean;
}

interface FilterState<RecordType> {
  column: ColumnType<RecordType>;
  key: Key;
  filteredKeys: Key[];
  onFilter?: (value: Key, record: RecordType) => boolean;
  filters?: FilterType[];
  isControlled: boolean;
}

interface TitleProps<RecordType> {
  prefixCls: string;
  sorterState?: SortState<RecordType>;
  filterState?: FilterState<RecordType>;
  column: ColumnType<RecordType>;
  updateSorterStates: (sortState: SortState<RecordType>) => SortState<RecordType>;
  updateFilterStates: (filterState: FilterState<RecordType>) => Record<string, string[]>;
  onTriggerStateUpdate: (onTriggerStateUpdateProps?: OnTriggerStateUpdateProps<RecordType>) => void;
}

interface RowSelection<RecordType> {
  selectedRowKeys?: Key[];
  columnWidth?: number | string;
  fixed?: 'left' | 'right' | boolean;
  onChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void;
  getCheckboxProps?: (record: RecordType) => CheckboxProps & { tooltipProps?: Omit<TooltipProps, 'children'> };
}

interface TableProps<RecordType> extends Omit<GioTableProps<RecordType>, 'title' | 'columns' | 'data'> {
  /**
   * 表格数据源
   */
  dataSource?: RecordType[];

  /**
   * 表格标题
   * @param currentPageData 当前页的数据列表
   */
  title?: string | ((currentPageData: ReadonlyArray<RecordType>) => string);

  /**
   * 单元格的 padding 值
   * @default `12px 16px`
   */
  padding?: React.CSSProperties['padding'];

  /**
   * 表格列的配置详情
   */
  columns?: ColumnsType<RecordType>;

  /**
   * 行鼠标事件是否受控
   */
  hackRowEvent?: boolean;

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
   * @deprecated
   * 表格数据为空时的占位内容
   */
  emptyText?: React.ReactNode;
  empty?: PageProps;
  /**
   * 分页/排序/筛选变化时触发
   */
  onChange?: (pagination?: PaginationState, filters?: Record<string, string[]>, sorter?: SortState<RecordType>) => void;
  showHover?: boolean;

  /**
   * 是否加载中
   */
  loading?: boolean;
}

export {
  GetComponentProps,
  AlignType,
  SortOrder,
  ExpandType,
  FilterType,
  ColumnType,
  ColumnGroupType,
  ColumnsType,
  Key,
  SortState,
  FilterState,
  PaginationState,
  OnTriggerStateUpdateProps,
  TitleProps,
  RowSelection,
  TableProps,
  ForwardRefFn,
};
