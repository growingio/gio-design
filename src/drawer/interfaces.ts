import React from 'react';

type getContainerFunc = () => HTMLElement;

export interface DrawerProps {
  /** 对话框是否可见 */
  visible?: boolean;
  /** 标题 */
  title?: React.ReactNode | string;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  /** 点击右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  afterClose?: () => void;
  /** 宽度 */
  width?: string | number;
  /** 底部内容 */
  footer?: React.ReactNode;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 强制渲染  */
  forceRender?: boolean;
  /**
   * @deprecated 未来移除，替换成fixed
   */
  size?: 'normal' | 'fixed';
  /**
   * 是否固定，否则自动撑开
   */
  fixed?: boolean;
  /** 关闭时销毁 */
  destroyOnClose?: boolean;
  /** dialog 根元素 style */
  style?: React.CSSProperties;
  /**
   * mask 蒙版动画className
   */
  maskTransitionName?: string;
   /**
   * dialog 蒙版动画className
   */
  transitionName?: string;
  /**
   * 根元素ClassName
   */
  className?: string;
  wrapClassName?: string;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  /**
   * dialog style
   */
  bodyStyle?: React.CSSProperties;
  /**
   * mask style
   */
  maskStyle?: React.CSSProperties;
  /**
   * 蒙版开启
   */
  mask?: boolean;
  /**
   * ESC关闭
   */
  keyboard?: boolean;
  prefixCls?: string;
  /**
   * closeIcon 自定义
   */
  closeIcon?: React.ReactNode;
  /**
   * 关闭后焦点移动到trigger
   */
  focusTriggerAfterClose?: boolean;
}
