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
  size?: 'small' | 'normal';
  defaultValue?: string;
  value?: string;
  onChange?: (val?: string, options?: OptionProps) => void;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;

  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  placement?: Placement;
  getContainer?: (node: HTMLElement) => HTMLElement;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;

  /** ================ trigger 相关的属性 ============== */
  /**
   * trigger className
   */
  className?: string;
  /**
   * trigger style
   */
  style?: React.CSSProperties;
  /**
   * 自定义title
   */
  title?: string;
  placeholder?: string;
  /**
   * 自定义前缀icon
   */
  triggerPrefix?: React.ReactNode;
  /**
   * 自定义后缀的icon
   */
  triggerSuffix?: React.ReactNode;
  maxWidth?: number;
  hidePrefix?: boolean;
  /**
   * 是否允许clear
   */
  allowClear?: boolean;
  onClear?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
  /**
   * custom trigger render
   */
  renderTrigger?: () => React.ReactElement;
  /**
   * content 跟随 trigger宽度
   */
  autoWidth?: boolean;
}

export interface TriggerProps extends Omit<InputButtonProps, 'value' | 'active'> {
  value?: string | React.ReactNode;
}
