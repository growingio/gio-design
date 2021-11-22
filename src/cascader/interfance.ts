import { InputButtonProps } from '../input';
import { ListProps, OptionProps as ListOptionProps } from '../list/interfance';
import { Placement } from '../popover/interface';

export interface CascaderProps extends Omit<ListProps, 'options' | 'onChange' | 'value'> {
  value?: string;
  defaultValue?: string;
  options: OptionProps[];
  size?: 'small' | 'normal';
  /**
     多级文本的连接字符
     */
  separator?: string;

  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  prefixCls?: string;
  triggerProps: Omit<TriggerProps, 'prefixCls' | 'onInputChange' | 'disabled' | 'getOptionByValue' | 'separator'>;
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
}
export interface OptionProps extends ListOptionProps {
  label: string;
  value: string;
  childrens?: OptionProps[];
}
export interface TriggerProps extends Omit<InputButtonProps, 'value' | 'active'> {
  value?: string;
}
