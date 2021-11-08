import { InputButtonProps } from '../input';
import { BaseItemProps, ListProps } from '../list/interfance';
import { Placement } from '../popover/interface';

export interface CascaderProps extends Omit<ListProps, 'options' | 'onChange' | 'value'> {
  value?: string;
  defaultValue?: string;
  options: CascaderItemProps[];
  size?: 'small' | 'normal';
  /**
     多级文本的连接字符
     */
  separator?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  prefixCls?: string;
  triggerProps: Omit<TriggerProps, 'prefixCls' | 'onInputChange' | 'disabled' | 'getOptionByValue' | 'separator'>;
  onChange?: (value?: string) => void;
  getContainer?: (node: HTMLElement) => HTMLElement;
  overlayStyle?: React.CSSProperties;
  placement?: Placement;
}

export interface TriggerProps extends Omit<InputButtonProps, 'value' | 'active'> {
  value?: string;
  separator?: string;
  getOptionByValue: (optValue?: string) => CascaderItemProps | undefined;
}

export interface CascaderItemProps extends BaseItemProps {
  label: string;
  value: string;
  selectValue?: string;
  selectedParent?: string[];
  onChange?: (value: string) => void;
  childrens?: CascaderItemProps[];
}
