import React from 'react';

interface BaseProps {
  /**
   * 自定义样式名
   */
  className?: string;
  /**
   * 自定义样式属性
   */
  style?: React.CSSProperties;
}

export interface ListProps extends BaseProps {
  children?: React.ReactNode;
  /**
   * 列表项
   */
  items?: (ListItemGroupProps | ListItemProps)[];
  /**
   * 是否可展开，当列表项超过 10 个，收起后续列表项
   */
  expandable?: boolean;
}

export interface ListItemProps extends BaseProps {
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
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface ListItemGroupProps extends BaseProps {
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

export interface ListItemSubgroupProps extends BaseProps {
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

export interface ExpandItemProps extends BaseProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  title?: React.ReactNode;
}

export interface DividerProps {
  className?: string;
  style?: React.CSSProperties;
}
