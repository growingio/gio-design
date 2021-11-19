import { InputButtonProps } from '../input';
// import { OptionProps as CascaderOptionProps } from '../cascader/interfance';
import { OptionProps as ListOptionProps } from '../list/interfance';
import { Placement, TriggerAction } from '../popover/interface';
import { ListProps } from '../list';

export interface ListPickerProps extends Omit<ListProps, 'title' | 'id'> {
  size?: 'small' | 'normal';
  /**
   * 触发方式
   */
  trigger?: TriggerAction | TriggerAction[];
  value?: string | string[];
  defaultValue?: string | string[];
  prefixCls?: string;
  placeholder?: string;
  /**
   * cascader 级联文本连接符
   */
  separator?: string;
  onClear?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
  /**
   * 触发器样式
   */
  triggerProps?: Pick<
    InputButtonProps,
    'disabled' | 'className' | 'style' | 'allowClear' | 'maxWidth' | 'value' | 'prefix' | 'suffix'
  >;
  /**
   * custom trigger render
   */
  renderTrigger?: () => React.ReactElement;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  getContainer?: (node: HTMLElement) => HTMLElement;
  needConfim?: boolean;
  confimText?: string;
  onConfim?: (value: string | string[] | undefined, options?: OptionProps | OptionProps[]) => void;
  placement?: Placement;
  overlayStyle?: React.CSSProperties;
  empty?: () => React.ReactNode;
}
export interface OptionProps extends ListOptionProps {
  selectionValue?: string;
  selectionTitle?: string;
}

export interface SelectionProps {
  selectionValue?: string;
  selectionTitle?: string;
  options: OptionProps[];
}

export interface StaticListPickerProps extends Omit<ListProps, 'options'> {
  options: SelectionProps[] | OptionProps[];
  isSelection?: boolean;
}

export interface TriggerProps extends Omit<InputButtonProps, 'value' | 'active'> {
  value?: string;
  separator?: string;
}
