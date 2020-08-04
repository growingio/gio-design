export interface LoadingProps {
  loading?: boolean;
  titlePosition?: 'right' | 'bottom';
  title?: false | string;
  delay?: number;
  prefixCls?: string;
  children?: React.ReactDOM;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'middle' | 'large';
  indicator?: React.ReactElement;
  rotate?: boolean;
}
