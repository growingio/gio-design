import React, { Key } from 'react';
import { BaseItemProps } from '../list';

export interface TreeProps extends TreeListProps {
  /**
   *
   */
  value?: string;
  /**
   * 自动展开 父节点
   */
  autoExpandParent?: boolean;
  /**
   *
   */
  options?: TreeItemProps[];
  /**
   *
   */
  prefixCls?: string;
  /**
   *
   */
  className?: string;
  style?: React.CSSProperties;
  /**
   * defaultExpandAll
   */
  defaultExpandAll?: boolean;
  /**
   *
   */
  expandedKeys?: string[];
  /**
   *
   */
  defaultExpandedKeys?: string[];
  /**
   *
   */
  selectedKeys?: string[];
  /**
   *
   */
  defaultSelectedKeys?: string[];
  /**
   *
   */
  disabled?: boolean;
  /**
   *
   */
  filterTreeNode?: (node: TreeItem) => boolean;
  /**
   * multiple
   */
  multiple?: boolean;
  /**
   * onExpand
   */
  onExpand?: (
    optkey: string[],
    option?: { expanded: boolean; node: TreeItemProps; expandNodes?: TreeItemProps[] }
  ) => void;
  /**
   * onSelect
   */
  onSelect?: (
    optKeys: string[],
    option?: { selected: boolean; node: TreeItemProps; selectedNodes?: TreeItemProps[] }
  ) => void;
  /**
   * level prefix < option.prefix
   */
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /**
   *
   */
  onClick?: (value?: string | number, event?: React.MouseEvent<HTMLLIElement | HTMLInputElement, MouseEvent>) => void;
  /**
   * selectable => isSelect
   */
  isSelect?: boolean;
  /**
   * 目前仅能支持TreeNode嵌套
   * example:
   *
   * <Tree.TreeNode>
   *  <Tree.TreeNode />
   * </Tree.TreeNode>
   *
   * 暂不支持以下这种形式
   * example:
   * <Popover>
   * <Tree.TreeNode />
   * </Popover>
   */
  children?: React.ReactNode;
}
export interface TreeListProps {
  virtual?: boolean;
  options?: TreeItemProps[];
  height?: number;
  itemHeight?: number;
  /** If not match virtual scroll condition, Set List still use height of container. */
  fullHeight?: boolean;
  expandedKeys?: string[] | boolean;
}
export type TreeItem = TreeItemProps;
export interface TreeItemProps extends Omit<BaseItemProps, 'value'> {
  level?: number;
  isLeaf?: boolean;
  onExpand?: (node: TreeItem) => void;
  isOpen?: boolean;
  childs?: TreeItemProps[];
  value: string;
  connectKey?: string;
  children?: React.ReactNode;
  /**
   * control node checkable if Tree is checkable
   */
  checkable?: boolean;
  disabled?: boolean;
}

export interface GioTreeNodeProps {
  className?: string;
  disabled?: boolean;
  title?: string | React.ReactNode;
  key?: Key;
  eventKey?: string;
  isLeaf?: boolean;
  checked?: boolean;
  expanded?: boolean;
  selected?: boolean;
  selectable?: boolean;
  icon?: ((treeNode: any) => React.ReactNode) | React.ReactNode;
  children?: React.ReactNode;
  [customProp: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type GioTreeNode = React.Component<GioTreeNodeProps, {}>;
