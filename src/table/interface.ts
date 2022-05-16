import {
  ColumnType as GioColumnType,
  GetComponentProps,
  AlignType,
  Key,
  GetRowKey,
  TableLayout,
  ExpandableConfig,
  RowClassName,
  PanelRender,
  TableComponents,
  TableSticky,
} from 'rc-table/es/interface';
import { TableProps as GioTableProps } from 'rc-table/es/Table';
import { PaginationProps } from '../pagination';
import { CheckboxProps } from '../checkbox';
import { TooltipProps } from '../tooltip';
import { ResultProps } from '../result';

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
   * 排序函数，本地排序使用一个函数(参考 Array.sort)，传入 `true` 开启服务端排序
   */
  sorter?: ((a: RecordType, b: RecordType) => number) | true;

  /**
   * 支持的排序方式
   */
  sortDirections?: SortOrder[];

  /**
   * 排序优先级，数值越大越靠前
   */
  sortPriorityOrder?: number;

  /**
   * 默认的排序类型
   */
  defaultSortOrder?: SortOrder;

  /**
   * 排序的受控属性，外界可用此控制列的排序，可设置为 ascend descend null
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

interface SortState<RecordType>
  extends Pick<ColumnType<RecordType>, 'sortPriorityOrder' | 'sortDirections' | 'sortOrder'> {
  column: ColumnType<RecordType>;
  key: Key;
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
  columnKey: Key;
}

interface RowSelection<RecordType> {
  /**
   * 当前已经选择的行标识符（受控）
   * @default []
   */
  selectedRowKeys?: Key[];
  /**
   * 列表选择框的宽度
   * @default 52px
   */
  columnWidth?: number | string;
  /**
   * 是否固定选择框，或设置固定的方向
   * @default false
   */
  fixed?: 'left' | 'right' | boolean;
  /**
   * 触发行选择后的回调函数
   * @param selectedRowKeys 已经选择的行标识符
   * @param selectedRows 已经选择的行数据
   */
  onChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void;
  /**
   * 选择框的默认属性配置（传递给 Checkbox 组件的 Props）
   * @param record 当前行的数据
   * @returns {CheckboxProps & { tooltipProps?: Omit<TooltipProps, 'children'> }}
   */
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
  title?: string | ((currentPageData: ReadonlyArray<RecordType>) => React.ReactNode);

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

  /**
   * 自定义表格数据为空时的页面，请参考 Result 组件
   */
  empty?: ResultProps;
  /**
   * 分页/排序/筛选变化时触发
   */
  onChange?: (pagination?: PaginationState, filters?: Record<string, string[]>, sorter?: SortState<RecordType>) => void;
  showHover?: boolean;

  /**
   * 是否加载中
   */
  loading?: boolean;

  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;

  /**
   * 指定一个字段名，Table Row 会使用 dataSource[index][rowKey] 来当作 key
   * @default key
   */
  rowKey?: string | GetRowKey<RecordType>;

  /**
   * 表格元素的 [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) 属性
   */
  tableLayout?: TableLayout;
  /**
   * 表格是否可滚动，也可以指定滚动区域的宽、高
   */
  scroll?: {
    x?: number | true | string;
    y?: number | string;
  };
  /**
   * 配置展开属性
   */
  expandable?: ExpandableConfig<RecordType>;

  /**
   * 表格行的类名
   */
  rowClassName?: string | RowClassName<RecordType>;
  /**
   * 表格尾部
   */
  footer?: PanelRender<RecordType>;
  /**
   * 总结栏
   */
  summary?: (data: readonly RecordType[]) => React.ReactNode;
  /**
   * 传递给 Table 的原生 id 属性
   */
  id?: string;
  /**
   * 是否显示表头
   * @default true
   */
  showHeader?: boolean;
  /**
   * 覆盖默认的 table 元素
   */
  components?: TableComponents<RecordType>;
  /**
   * 设置每一行的 tr 标签的属性
   */
  onRow?: GetComponentProps<RecordType>;

  /**
   * 设置粘性头部和滚动条
   */
  sticky?: boolean | TableSticky;
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
