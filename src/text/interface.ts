import React from 'react';
import { TooltipProps } from '../tooltip';

export interface TextProps extends Pick<TooltipProps, 'placement'> {
  /**
   自定义className
   */
  className?: string;
  /**
   自定义样式
   */
  style?: React.CSSProperties;
  /**
   要显示的行数
   */
  lines?: number;
  /**
   要显示的宽度
   */
  width?: number;
  /**
   超出部分省略显示，默认为...
   */
  ellipsis?: string;
  children?: React.ReactNode;
  /**
   是否去除文字最后省略号之前的空格
   */
  trimwhitespace?: boolean;
}
