import React, { PropsWithChildren } from 'react';
import { TabsProps } from '../tabs';
import { CommonProps } from '../utils/interfaces';

export interface PanelProps extends PropsWithChildren<CommonProps> {
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 标题下面的描述信息，默认最多显示 3 行，超过三行，则会使用 Tooltip 展示。
   */
  description?: React.ReactNode | string;

  /**
   * @default `normal`
   */
  tabSize?: TabsProps['size'];

  /**
   * 点击 tab 时触发
   */
  onTabClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  /**
   * tab 切换时触发
   * @param key 当前 tab 的 key
   */
  onChange?: (key: string) => void;

  /**
   * 当前 tab，受控
   */
  activeKey?: string;

  /**
   * 默认选中的 tab
   */
  defaultActiveKey?: string;

  /**
   * 底部区域
   */
  footer?: React.ReactNode;

  /**
   * 头像区域
   */
  avatar?: React.ReactNode;

  /**
   * 头部右侧的操作按钮
   */
  actions?: React.ReactNode;

  /**
   * 是否有边框
   * @default true
   */
  bordered?: boolean;
}

export interface TabPaneProps extends PropsWithChildren<CommonProps> {
  /**
   * tab 栏名称
   */
  name?: React.ReactNode;
}

export interface ToolBarProps extends PropsWithChildren<CommonProps> {
  /**
   * 浮动
   */
  float?: 'left' | 'right' | 'none' | string;
}

export interface BatchActionProps extends PropsWithChildren<CommonProps> {
  onClose?: () => void;
  count?: number;
}
