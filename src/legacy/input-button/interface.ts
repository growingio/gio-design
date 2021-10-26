import { InputProps } from '../input/interface';

export interface InputButtonProps extends InputProps {
  hidePrefix?: boolean;
  prefix?: React.ReactNode;
  prefixCls?: string;
  /**
   * 是否显示清楚按钮，默认为true
   */
  removable?: boolean;
  onInputChange?: (value: string) => void;
}
