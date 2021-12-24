import React from 'react';

export interface StepsProps {
  /**
  初始化选中面板的 `key`
  */
  defaultValue?: React.Key;
  /**
  初始化选中面板的 `key`，默认从1开始，一定要注意!!!
  */
  current?: number;
  /**
   开启受控模式，当前激活 `tab` 面板的 `key`
   */
  value?: React.Key;
  /**
   切换面板的回调
   */
  onChange?: (key: React.Key) => void;
  /**
   切换面板的回调
   */
  onChangeCurrent?: (key: React.Key) => void;
  /**
   * 组件大小
   */
  size?: 'small' | 'normal';
}
