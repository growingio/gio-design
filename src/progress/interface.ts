export enum ProgressStatus {
  active,
  success,
  exception,
}

export type ProgressType = 'circle' | 'default';

export interface ProgressProps {
  /**
   * 百分比
   */
  percent?: number;
  /**
   * 可选 `active`, `success`, `expection`
   */
  status?: keyof typeof ProgressStatus | string;
  /**
   * 内容模版函数
   */
  format?: (percent?: number) => React.ReactNode;
  /**
   * 进度条尺寸
   * @default default
   */
  size?: 'small' | 'default' | 'large';
  customizePrefixCls?: string;
  /**
   * 动画特效开关
   * @default false
   */
  animation?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showInfo?: boolean;
  type?: ProgressType;
  strokeLinecap?: React.SVGProps<SVGElement>['strokeLinecap'];
  /**
   * 圆形进度条的宽度，单位是px
   * 类型 string
   */
  circleWidth?: number;
  /**
   * 圆形进度条线的宽度，单位是进度条画布官渡的百分比
   * 类型 string
   */
  strokeWidth?: number;
  /**
   * 完成的分段的颜色
   * 类型 string
   */
  strokeColor?: string;
  /**
   * 未完成的分段的颜色
   * 类型 string
   */
  trailColor?: string;
  /**
   * 是否显示文字描述，默认为true
   * 类型 boolean
   */
  showText?: boolean;
}
