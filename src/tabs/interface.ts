import React from 'react';
import { SizeType } from '@gio-design/utils';

export interface TabsProps {
  /**
   	初始化选中面板的 `key`
  */
  defaultValue?: React.Key;
  /**
   开启受控模式，当前激活 `tab` 面板的 `key`
   */
  value?: React.Key;
  /**
   切换面板的回调
   */
  onChange?: (key: React.Key) => void;
  /**
   * 组件大小
   */
  size?: 'small' | 'normal';
}

export interface TabProps {
  /**
   key
   */
  value?: React.Key;
  /**
   选项卡头显示文字
   */
  label?: React.ReactNode;
  /**
   选项卡头显示文字
   */
  prefix?: React.ReactNode;
}
