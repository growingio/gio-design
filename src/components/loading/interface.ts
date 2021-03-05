export interface LoadingProps {
  /**
   是否为加载中状态
   */
  loading?: boolean;
  /**
   描述文案相对于指示符号的位置
   */
  titlePosition?: 'right' | 'bottom';
  /**
   自定义描述文案
   */
  title?: false | string;
  /**
   延迟显示加载效果的时间（防止闪烁）
   */
  delay?: number;
  /**
   替换`class`类前缀
   */
  prefixCls?: string;
  /**
   设置被包裹的元素
   */
  children?: React.ReactElement[] | React.ReactElement;
  /**
   自定义 `className`
   */
  className?: string;
  /**
   自定义样式
   */
  style?: React.CSSProperties;
  /**
   设置默认指示符号大小
   */
  size?: 'small' | 'middle' | 'large';
  /**
   自定义指示符号
   */
  indicator?: React.ReactElement;
  /**
   设置模糊蒙层颜色
   */
  blurColor?: 'white' | 'black';
}
