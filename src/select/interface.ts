import { ListProps, OptionProps } from '../list';
import { InputButtonProps } from '../input/interface';
import { Placement } from '../popover/interface';
// 无group 无 multiple
export interface SelectProps extends Omit<ListProps, 'isMultiple' | 'onChange' | 'options'> {
  prefixCls?: string;
  /**
   * dataSource 数据源
   */
  options?: OptionProps[];
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'normal';
  defaultValue?: string;
  value?: string;
  /**
   * 触发器参数
   */
  triggerProps?: Omit<TriggerProps, 'value' | 'size' | 'prefixCls' | 'onInputChange' | 'disabled'>;
  onChange?: (val?: string, options?: OptionProps) => void;
  /**
   * 卡片类名
   */
  overlayClassName?: string;
  /**
   * 卡片样式
   */
  overlayStyle?: React.CSSProperties;
  /**
   * contentClassName?:string;
   */
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  /**
   * popover 位置
   */
  placement?: Placement;
  getContainer?: (node: HTMLElement) => HTMLElement;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export interface TriggerProps extends Omit<InputButtonProps, 'value' | 'active'> {
  value?: string | React.ReactNode;
}
