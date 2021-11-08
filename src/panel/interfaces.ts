import React, { PropsWithChildren } from 'react';
import { CommonProps } from '../utils/interfaces';

export interface PanelProps extends PropsWithChildren<CommonProps> {
  title?: React.ReactNode;
  /**
   * 描述
   * type string 默认最多显示3行
   * type React.ReactNode 自定义
   */
  description?: React.ReactNode | string;
  descriptionClamp?: number;
  tabType?: 'line' | 'block';
  tabSize?: 'small' | 'middle' | 'large';
  onTabClick?: (key: string) => void;
  onChange?: (key: string) => void;
  activeKey?: string;
  defaultActiveKey?: string;
  footer?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  bordered?: boolean;
}

export interface TabPaneProps extends PropsWithChildren<CommonProps> {
  name?: React.ReactNode;
  disabled?: boolean;
}

export interface ToolBarProps extends PropsWithChildren<CommonProps> {
  float?: 'left' | 'right' | 'none' | string;
}

export interface BatchActionProps extends PropsWithChildren<CommonProps> {
  onClose?: () => void;
  count?: number;
}
