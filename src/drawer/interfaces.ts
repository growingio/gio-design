import React from 'react';

type getContainerFunc = () => HTMLElement;

export interface DrawerProps {
  /** 对话框是否可见 */
  visible?: boolean;
  /** 标题 */
  title?: React.ReactNode | string;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  /** 点击确定回调 */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 点击右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  afterClose?: () => void;
  /** 宽度 */
  width?: string | number;
  /** 底部内容 */
  footer?: React.ReactNode;
  /** 确认按钮文字 */
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 强制渲染  */
  forceRender?: boolean;
  /** 大小 */
  size?: 'normal' | 'fixed';
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  keyboard?: boolean;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
  focusTriggerAfterClose?: boolean;
}
