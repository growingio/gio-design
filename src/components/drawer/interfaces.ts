import React from 'react';
import { tuple } from '../../utils/interfaces';

type getContainerFunc = () => HTMLElement;

const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
export type placementType = typeof PlacementTypes[number];

export interface PushState {
  distance: string | number;
}
export interface DrawerProps {
  /**
   * 是否显示右上角的关闭按钮
   * @default true
   */
  closable?: boolean;
  /**
   * 自定义关闭图标
   */
  closeIcon?: React.ReactNode;
  /**
   * 关闭时销毁 Drawer 里的子元素
   * @default false
   */
  destroyOnClose?: boolean;
  /**
   * 预渲染 Drawer 内元素
   * @default false
   */
  forceRender?: boolean;
  /**
   * 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom
   */
  getContainer?: string | HTMLElement | getContainerFunc | false;
  /**
   * 点击蒙层是否允许关闭
   */
  maskClosable?: boolean;
  /**
   * 是否展示遮罩
   * @default true
   */
  mask?: boolean;
  /**
   * 遮罩样式
   */
  maskStyle?: React.CSSProperties;
  /**
   * 可用于设置 Drawer 最外层容器的样式，和 `drawerStyle` 的区别是作用节点包括 `mask`
   */
  style?: React.CSSProperties;
  /**
   * 用于设置 Drawer 弹出层的样式
   */
  drawerStyle?: React.CSSProperties;
  /**
   * 用于设置 Drawer 头部的样式
   */
  headerStyle?: React.CSSProperties;
  /**
   * 可用于设置 Drawer 内容部分的样式
   */
  bodyStyle?: React.CSSProperties;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * Drawer 是否可见
   */
  visible?: boolean;
  /**
   * 宽度
   */
  width?: number | string;
  /**
   * 高度, 在 `placement` 为 `top` 或 `bottom` 时使用
   * @default 256
   */
  height?: number | string;
  /**
   * 设置 Drawer 的 `z-index`
   * @default 10000
   */
  zIndex?: number;
  prefixCls?: string;
  /**
   * 用于设置多层 Drawer 的推动行为
   * @default { distance: 180 }
   */
  push?: boolean | PushState;
  /**
   * 抽屉的方向
   * @default 'right'
   */
  placement?: placementType;
  /**
   * 点击遮罩层或右上角叉或取消按钮的回调
   */
  onClose?: React.MouseEventHandler<HTMLElement>;
  /**
   * 切换抽屉时动画结束后的回调
   */
  afterVisibleChange?: (visible: boolean) => void;
  className?: string;
  handler?: React.ReactNode;
  /**
   * 是否支持键盘 esc 关闭
   * @default true
   */
  keyboard?: boolean;
  /**
   * 抽屉的页脚
   */
  footer?: React.ReactNode;
  /**
   * 抽屉页脚部件的样式
   */
  footerStyle?: React.CSSProperties;
  direction?: string;

  onPrev?: () => void;
  prevDisabled?: boolean;
  onNext?: () => void;
  nextDisabled?: boolean;
  loading?: boolean;
}

export interface IDrawerState {
  push?: boolean;
}
