import { ListProps, OptionProps as ListOptionProps } from '../list';
import { InputButtonProps } from '../input/interface';
import { Placement } from '../popover/interface';
// 无group 无 multiple
export interface SelectProps extends Omit<ListProps, 'isMultiple' | 'onChange' | 'options'> {
  prefixCls?: string;
  options?: OptionProps[];
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'normal';
  defaultValue?: string | number;
  value?: string | number;
  triggerOption?: Omit<TriggerProps, 'value' | 'size' | 'prefixCls' | 'onInputChange' | 'disabled'>;
  onChange?: (value?: string | number, option?: OptionProps) => void;
  /**
   * 卡片类名
   */
  overlayClassName?: string;
  /**
   * 卡片样式
   */
  overlayStyle?: React.CSSProperties;
  placement?: Placement;
  getContainer?: (node: HTMLElement) => HTMLElement;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}
// may be other attributes
export interface OptionProps extends ListOptionProps {
  [key: string]: any;
}

export interface TriggerProps extends Omit<InputButtonProps, 'value' | 'active'> {
  value?: string | number;
}
