import React from 'react';
import { CommonProps, DefaultSizeType } from '../utils/interfaces';

export interface StepsProps {
  /**
  非受控的Step index 默认0
  */
  defaultCurrent?: number;
  /**
  受控Step index ，从1开始
  */
  current?: number;
  /**
   step current 发生变化的时候触发
   */
  onChange?: (index: number) => void;
  /**
   * 组件大小
   */
  size?: DefaultSizeType;
}
export interface StepProps extends CommonProps {
  /**
   * 步骤条状态
   */
  status?: 'finish' | 'process' | 'pending';

  /**
   * 步骤条标题
   */
  title?: React.ReactNode;
  /**
   * 不可选状态
   */
  disabled?: boolean;
  /**
   * 自定义前缀图标
   */
  prefix?: React.ReactNode;

  /**
   * 点击事件的回调
   */
  onClick?: (stepIndex: number) => void;
  // stepIndex?: number;
}
