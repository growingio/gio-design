import { CSSProperties } from 'react';


export type TMagnitude = 10 | 100;

export type TPlacement = 'top' | 'right' | 'bottom' | 'left' | 'rightTop' | 'rightBottom' | 'leftTop' | 'leftBottom';

export interface ISignCommonProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  visible?: boolean;
  children?: React.ReactNode;
}

export interface ISignNumberProps extends ISignCommonProps {
  // 显示的数字
  count: number;
  // count 为 0 时是否显示
  showZero?: boolean;
  // 最大显示数量级
  magnitude: TMagnitude;
  /**
   * 设置状态点的位置偏移
   */
  offset?: [number, number];
  /**
   *放置位置
   */
  placement?: TPlacement;
}

