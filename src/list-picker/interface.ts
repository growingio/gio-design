import React from 'react';
import { InputButtonProps } from '../input';
import { OptionProps } from '../list/interface';
import { Placement, TriggerAction } from '../popover/interface';
import { ListProps } from '../list';

export interface ListPickerProps
  extends Pick<
    ListProps,
    'model' | 'empty' | 'needEmpty' | 'max' | 'valueSeparator' | 'onMultipleOverflow' | 'onMultipleChange'
  > {
  size?: 'small' | 'normal';
  /**
   * 触发方式
   */
  disabled?: boolean;
  trigger?: TriggerAction | TriggerAction[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void;
  prefixCls?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  getContainer?: (node: HTMLElement) => HTMLElement;
  needConfirm?: boolean;
  confirmText?: string;
  onConfirm?: (value: string | string[] | undefined, options?: OptionProps | OptionProps[]) => void;

  placement?: Placement;
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
  /**
   * InputButton 触发器的 loading prop
   */
  triggerLoading?: InputButtonProps['loading'];
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
  customTrigger?: () => React.ReactElement;
  /**
   * recentId Recent取值
   */
  recentId?: string;
  /**
   * 是否跟随trigger宽度
   */
  autoWidth?: boolean;
  strategy?: 'fixed' | 'absolute';
  ['data-testid']?: string;
}

// export interface StaticListPickerProps extends Omit<ListProps, 'options'> {
//   options: SelectionProps[] | OptionProps[];
//   isSelection?: boolean;
// }

export interface TriggerProps extends Omit<InputButtonProps, 'value' | 'active'> {
  disabled?: boolean;
  value?: string | React.ReactNode;
  separator?: string;
  [key: string]: any;
}
