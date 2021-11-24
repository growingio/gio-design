import * as React from 'react';
import RcTree, { TreeNode, TreeProps as RcTreeProps } from 'rc-tree';
import classNames from 'classnames';
import { DataNode, Key } from 'rc-tree/lib/interface';
import { usePrefixCls } from '@gio-design/utils';
import { ConfigContext } from '../config-provider';
import renderSwitcherIcon from './iconUtil';

export interface GioTreeNodeAttribute {
  eventKey: string;
  prefixCls: string;
  className: string;
  expanded: boolean;
  selected: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
  pos: string;
  isLeaf: boolean;
  selectable: boolean;
  disabled: boolean;
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
  icon?: ((treeNode: GioTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  children?: React.ReactNode;
  [customProp: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type GioTreeNode = React.Component<GioTreeNodeProps, {}>;

export interface GioTreeNodeBaseEvent {
  node: GioTreeNode;
  nativeEvent: MouseEvent;
}

export interface GioTreeNodeSelectedEvent extends GioTreeNodeBaseEvent {
  event: 'select';
  selected?: boolean;
  selectedNodes?: DataNode[];
}

export interface GioTreeNodeExpandedEvent extends GioTreeNodeBaseEvent {
  expanded?: boolean;
}

export interface GioTreeNodeMouseEvent {
  node: GioTreeNode;
  event: React.DragEvent<HTMLElement>;
}

export interface GioTreeNodeDragEnterEvent extends GioTreeNodeMouseEvent {
  expandedKeys: Key[];
}

export type TreeNodeNormal = DataNode;

export interface TreeProps extends Omit<RcTreeProps, 'prefixCls'> {
  className?: string;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** 是否禁用树 */
  disabled?: boolean;
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开对应树节点 */
  defaultExpandParent?: boolean;
  /** 默认展开指定的树节点 */
  defaultExpandedKeys?: Key[];
  /** （受控）展开指定的树节点 */
  expandedKeys?: Key[];
  /** （受控）设置选中的树节点 */
  selectedKeys?: Key[];
  /** 默认选中的树节点 */
  defaultSelectedKeys?: Key[];
  selectable?: boolean;
  loadedKeys?: Key[];
  style?: React.CSSProperties;
  showIcon?: boolean;
  icon?: ((nodeProps: GioTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
  switcherIcon?: React.ReactElement<unknown>;
  prefixCls?: string;
  children?: React.ReactNode;
}

interface CompoundedComponent extends React.ForwardRefExoticComponent<TreeProps & React.RefAttributes<RcTree>> {
  TreeNode: typeof TreeNode;
}

const Tree = React.forwardRef<RcTree, TreeProps>((props: TreeProps, ref) => {
  const { virtual } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className, showIcon, children, switcherIcon } = props;

  const newProps = { ...props };
  const prefixCls = usePrefixCls('tree', customizePrefixCls);

  return (
    <RcTree
      ref={ref}
      virtual={virtual}
      {...newProps}
      prefixCls={prefixCls}
      className={classNames(className, {
        [`${prefixCls}-icon-hide`]: !showIcon,
      })}
      switcherIcon={(nodeProps: GioTreeNodeProps) => renderSwitcherIcon(prefixCls, switcherIcon, nodeProps)}
    >
      {children}
    </RcTree>
  );
}) as CompoundedComponent;

Tree.TreeNode = TreeNode;

Tree.defaultProps = {
  showIcon: false,
};

export default Tree;
