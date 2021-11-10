import React from 'react';
import { CommonProps } from '@gio-design/utils';
import { DropdownProps } from '../components/dropdown';

export interface InputTriggerProps extends CommonProps {
  /**
   * 是否为 `active` 状态
   */
  actived?: boolean;
  /**
   * 是否为无边框模式
   */
  borderless?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 宽度适应内容
   */
  fitContent?: boolean;
  /**
   * 自定义展示内容
   */
  itemRender?: () => React.ReactNode;
  /**
   * 选择框提示文字
   */
  placeholder?: string;
  /**
   * 组件输入框的尺寸
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * 带有图标后缀的 `InputTrigger`
   */
  suffix?: React.ReactNode;
}

export interface SelectorProps
  extends CommonProps,
    Omit<InputTriggerProps, 'className' | 'style'>,
    Omit<DropdownProps, 'trigger' | 'placement' | 'prefixCls' | 'children'> {
  /**
   * 支持清除
   */
  allowClear?: boolean;
  /**
   * 触发器自定义的 `className`
   */
  triggerClassName?: string;
  /**
   * 触发器的自定义样式
   */
  triggerStyle?: React.CSSProperties;
  /**
   * 点击清除 icon 时的回调
   */
  onClear?: () => void;
  /**
   * 自定义的触发器
   */
  trigger?: React.ReactNode;
}
