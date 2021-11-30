import { InputButtonProps } from '../input';
import { ListProps, OptionProps as ListOptionProps } from '../list/interfance';
import { Placement } from '../popover/interface';

export interface CascaderProps extends Omit<ListProps, 'options' | 'onChange' | 'value'> {
  value?: string;
  defaultValue?: string;
  options: OptionProps[];
  size?: 'small' | 'normal';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  prefixCls?: string;
  onChange?: (val?: string | string[], options?: OptionProps | OptionProps[]) => void;
  getContainer?: (node: HTMLElement) => HTMLElement;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  /**
   * contentClassName?:string;
   */
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  placement?: Placement;
  strategy?: 'fixed' | 'absolute';
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
   * cascader 级联文本连接符
   */
  separator?: string;
  /**
   * 是否允许clear
   */
  allowClear?: boolean;
  onClear?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
  /**
   * custom trigger render
   */
  renderTrigger?: () => React.ReactElement;
}
export interface OptionProps extends ListOptionProps {
  label: string;
  value: string;
  childrens?: OptionProps[];
}

export interface TriggerProps extends Omit<InputButtonProps, 'value' | 'active'> {
  value?: string;
}
