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
   箭头是否指向目标元素中心
   */
  arrowPointAtCenter?: boolean;
  /**
   气泡被遮挡时自动调整位置
   */
  autoAdjustOverflow?: boolean;
  /**
   被包裹的元素
   */
  children: React.ReactElement;

  placement?: Placement;
  trigger?: TriggerAction | TriggerAction[];
  content?: string | React.ReactNode;

  allowArrow?: boolean;
  enterable?: boolean;

  /**
    @deprecated
   */
  getTooltipContainer?: (node: HTMLElement) => HTMLElement;
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
}
