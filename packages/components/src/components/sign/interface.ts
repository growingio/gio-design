import { CSSProperties } from 'react';

export type TSignVariant = 'number' | 'dot';

export type TDotSignStatus = 'default' | 'normal' | 'warning' | 'error' | 'disabled';

export type TDotSignSize = 'middle' | 'small';

export type TMagnitude = 10 | 100;

export interface ISignCommonProps {
  prefixCls?: string;
  style?: CSSProperties;
  visible?: boolean;
}

export interface ISignNumberProps extends ISignCommonProps {
  // 显示的数字
  count?: number;
  // count 为 0 时是否显示
  showZero?: boolean;
  // 最大显示数量级
  magnitude?: TMagnitude;
}

export interface ISignDotProps extends ISignCommonProps {
  // 状态
  status?: TDotSignStatus;
  // 尺寸
  size?: TDotSignSize;
}

export interface ISignProps extends ISignNumberProps, ISignDotProps {
  // 设置 Sign 的变体类型，默认 number
  variant?: TSignVariant;
  className?: string;
}
