import { Placement as PlacementRepo } from '@popperjs/core';
import React from 'react';

export type TriggerAction = 'click' | 'hover' | 'focus';

export type Placement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export const placements = {
  topLeft: 'top-start',
  top: 'top',
  topRight: 'top-end',
  leftTop: 'left-start',
  left: 'left',
  leftBottom: 'left-end',
  rightTop: 'right-start',
  right: 'right',
  rightBottom: 'right-end',
  bottomLeft: 'bottom-start',
  bottom: 'bottom',
  bottomRight: 'bottom-end',
} as { [key: string]: PlacementRepo };

export interface PopoverProps {
  prefixCls?: string;

  /**
   * 箭头是否指向目标元素中心
   * @default false
   * @deprecated
   */
  arrowPointAtCenter?: boolean;
  /**
   * 气泡被遮挡时自动调整位置
   * @default true
   */
  autoAdjustOverflow?: boolean;
  /**
   被包裹的元素
   */
  children: React.ReactNode;

  placement?: Placement;
  trigger?: TriggerAction | TriggerAction[];
  content?: React.ReactNode;

  onContentClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * 气泡被遮挡时自动调整位置
   * @default false
   */
  allowArrow?: boolean;
  /**
   * 鼠标时候可以放入到气泡中
   * @default false
   */
  enterable?: boolean;
  /**
   * 是否禁用popover
   * @default undefined
   */
  disabled?: boolean;
  /**
   * 卡片类名
   */
  overlayClassName?: string;
  /**
   * 卡片样式
   */
  overlayStyle?: React.CSSProperties;
  /**
   * 卡片内容区域的样式对象
   */
  overlayInnerClassName?: string;
  /**
   * 卡片内容区域的样式对象
   */
  overlayInnerStyle?: React.CSSProperties;
  /**
   * position 布局方式
   * This can be useful if you want to position a tooltip inside an overflow: hidden container that you want to make overflow.
   * Please note that you can also try strategy: 'fixed' to obtain a similar effect with less hassle.
   */
  strategy?: 'fixed' | 'absolute';
  /**
   * 浮动显示的层
   */
  getContainer?: (node: HTMLElement) => HTMLElement;
  /**
   * 手动控制浮动，默认为false
   */
  visible?: boolean;
  /**
   * 默认是否显示，默认为false
   */
  defaultVisible?: boolean;
  /**
   * 显示隐藏的回掉
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   *
   */
  triggerStyle?: React.CSSProperties;

  /**
   * tooltip 与 trigger 之间的距离
   */
  offset?: number[];
  /**
   * delay mouseEnter 延迟
   */
  delay?: number;
  /**
   * hide popup 延迟
   */
  hideDelay?: number;
  triggerClassName?: string;
  distoryOnHide?: boolean;
}
