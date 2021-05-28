import { CommonProps } from '../../utils/interfaces';

export interface ListProps extends CommonProps {
  children?: React.ReactNode;
  /**
   * 列表项
   */
  items?: (ListItemGroupProps | ListItemProps)[];
  /**
   * 是否可展开，当列表项超过 10 个，收起后续列表项
   */
  expandable?: boolean;
  empty?: {
    image?: 'no-data' | 'no-result';
    description?: string;
  };
}

export interface ListItemProps extends CommonProps {
  children: React.ReactNode;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 文本溢出自动省略
   */
  ellipsis?: boolean;
  /**
   * 列表项的唯一 key
   */
  key?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

export interface ListItemGroupProps extends CommonProps {
  /**
   * 分组的唯一 key
   */
  key?: string;
  /**
   * 分组名称
   */
  title?: React.ReactNode;
  children?: React.ReactNode;
  /**
   * 当前分组的列表项
   */
  items?: ListItemProps[];
  /**
   * 当前分组的子分组
   */
  subgroups?: ListItemGroupProps[];
  /**
   * 是否可展开，当列表项超过 10 个，收起后续列表项
   */
  expandable?: boolean;
}

export interface ListItemSubgroupProps extends CommonProps {
  /**
   * 子分组的唯一 key
   */
  key?: string;
  /**
   * 子分组名称
   */
  title?: React.ReactNode;
  children?: React.ReactNode;
  /**
   * 当前子分组的列表项
   */
  items?: ListItemProps[];
  /**
   * 是否可展开，当列表项超过 10 个，收起后续列表项
   */
  expandable?: boolean;
}

export interface ExpandItemProps extends CommonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export interface DividerProps {
  /**
   * 自定义样式名
   */
  className?: string;
  /**
   * 自定义样式属性
   */
  style?: React.CSSProperties;
}
