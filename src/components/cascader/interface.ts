import { DropdownProps } from '../dropdown/interface';
import { SizeType } from '../config-provider/SizeContext';

export type Value = string | number;
export type KeyMapping = {
  label?: string;
  value?: string;
};

export type NodeData = {
  label?: string;
  value?: Value;
  disabled?: boolean;
  children?: NodeData[];
  groupId?: Value;
  groupName?: string;
  [key: string]: unknown;
};

export interface MenuItemProps {
  className?: string;
  style?: React.CSSProperties;
  dataSource: NodeData;
  keyMapping?: KeyMapping;
  value?: Value;
  keyword?: string;
  expanded?: boolean;
  ignoreCase?: boolean;
  deepSearch?: boolean;
  parentsData?: NodeData[];
  selectedParents?: NodeData[];
  onClick?: (event: React.MouseEvent, nodeData: NodeData) => void;
  onMouseEnter?: (event: React.MouseEvent, nodeData: NodeData) => void;
  trigger?: 'click' | 'hover';
  selectAny?: boolean;
  onTrigger?: (event: React.MouseEvent | React.KeyboardEvent, nodeData: NodeData) => void;
  beforeSelect?: (
    event: React.MouseEvent | React.KeyboardEvent,
    nodeData: NodeData
  ) => void | NodeData[] | Promise<NodeData[]>;
  onSelect?: (nodeData: NodeData, parentsData: NodeData[], event: React.MouseEvent | React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onRender?: (nodeData: NodeData, parentsData: NodeData[]) => React.ReactElement;
  afterInner?: (nodeData: NodeData, parentsData: NodeData[]) => React.ReactNode;
}

export type MaybeElementOrFn = React.ReactNode | ((dataSource: NodeData[]) => React.ReactNode);

export interface MenuProps extends Omit<MenuItemProps, 'dataSource' | 'hasChild' | 'expanded'> {
  dataSource?: NodeData[];
  onRender?: (nodeData: NodeData) => React.ReactElement;
  open?: boolean;
  depth?: number;
  header?: MaybeElementOrFn;
  footer?: MaybeElementOrFn;
  offsetLeft?: number;
  offsetTop?: number;
  getEmpty?: (keyword?: string) => React.ReactElement;
  groupName?: boolean | MaybeElementOrFn;
  parentMenu?: HTMLDivElement;
  expandedId?: NodeData['value'];
  autoFocus?: boolean;
  autoInit?: boolean;
}

export interface Props extends Omit<MenuProps, 'parentsData' | 'initParentsData'> {
  /**
     自定义 `CSS` 类前缀
     */
  prefixCls?: string;
  /**
     控件尺寸
     */
  size?: SizeType;
  /**
     禁用
     */
  disabled?: boolean;
  /**
     显示的文本
     */
  title?: string;
  /**
     多级文本的连接字符
     */
  separator?: string;
  /**
     文本点位符
     */
  placeholder?: string;
  /**
     文本控件
     */
  input?: React.ReactElement;

  // search-bar
  /**
     搜索框点位符
     */
  searchPlaceholder?: string;
  /**
     懒搜索，回车触发
     */
  lazySearch?: boolean;
  /**
     搜索事件的回调
     */
  onSearch?: (keyword: string) => void;

  // dropdown props
  /**
     下拉面板显示与否
     */
  visible?: boolean;
  /**
     下拉面板显示位置
     */
  placement?: DropdownProps['placement'];
  /**
     下拉面板的 `className`
     */
  overlayClassName?: string;
  /**
     下拉面板的样式
     */
  overlayStyle?: React.CSSProperties;
  /**
     下拉面板的显隐回调
     */
  onVisibleChange?: DropdownProps['onVisibleChange'];
  /**
     触发下拉面板的方式
     */
  dropdownTrigger?: DropdownProps['trigger'];
  /**
     获取下拉面板渲染到的 `DOM` 节点
     */
  getDropdownContainer?: DropdownProps['getTooltipContainer'];

  /**
   * 关闭下拉面板后是否销毁 Menu 元素
   */
  destroyTooltipOnHide?: boolean;
}
