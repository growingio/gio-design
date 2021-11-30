import React from 'react';
import { ListContextProps } from './context';

export type ModelType = 'cascader' | 'multiple' | 'single';

export interface SelectionProps extends ListProps {
  className?: string;
  style?: React.CSSProperties;
  options?: SelectionItemProps[] | OptionProps[];
  children?: ((context: ListContextProps) => JSX.Element | React.ReactNode) | React.ReactNode;
}

export interface SelectionItemProps extends OptionProps {
  groupId: string;
  groupName: string;
}

export interface ListProps {
  /**
   * group id
   */
  id?: string;
  /**
   * 分组名称 需配合selection使用
   */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * 数据源
   */
  options?: OptionProps[];
  /**
   *
   */
  children?: React.ReactNode | React.ReactNode[];
  /**
   * 值
   */
  value?: string | string[];
  /**
   *
   */
  disabled?: boolean;
  /**
   *
   */
  prefix?: (option?: OptionProps) => string | React.ReactNode;
  suffix?: (option?: OptionProps) => string | React.ReactNode;
  /**
   *
   */
  model?: ModelType;
  /**
   *
   */
  collapse?: number;
  /**
   *
   */
  onClick?: (value: string) => void;
  /**
   *
   */
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void;
  /**
   * 仅支持options 形式。自定义 item render 自定义render时会劫持onClick方法提供给List来使用
   */
  renderItem?: (option: OptionProps) => React.ReactElement;
  /**
   * empty
   */
  empty?: () => React.ReactNode;
}

export interface DragListProps extends Omit<ListProps, 'model' | 'onChange' | 'value' | 'children'> {
  options: OptionProps[];
  onChange?: (value: OptionProps[]) => void;
}

export interface OptionProps {
  label?: string | React.ReactNode;
  value: string;
  disabled?: boolean;
  disabledTooltip?: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  wrapper?: (element: React.ReactNode) => React.ReactElement;
  onClick?: (v: string) => void;
  [key: string]: unknown;
}

export interface DragItemProps extends ItemProps {
  onMoved?: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

export interface CascaderItemProps extends BaseItemProps {
  label: string;
  value: string;
  selectValue?: string;
  selectParent?: OptionProps[];
  onChange?: (value: string, option?: CascaderItemProps) => void;
  childrens?: CascaderItemProps[];
}
export interface ItemProps
  extends Pick<
    BaseItemProps,
    | 'className'
    | 'style'
    | 'label'
    | 'children'
    | 'onClick'
    | 'prefix'
    | 'suffix'
    | 'label'
    | 'value'
    | 'disabled'
    | 'selected'
    | 'disabledTooltip'
    | 'wrapper'
  > {
  selectValue?: string | string[];
}

export interface BaseItemProps extends Pick<OptionProps, 'value' | 'disabled' | 'prefix' | 'suffix' | 'wrapper'> {
  className?: string;
  style?: React.CSSProperties;
  label?: string | React.ReactNode;
  contentRender?: (element: React.ReactNode) => React.ReactElement;
  children?: React.ReactNode;
  disabledTooltip?: string;
  selected?: boolean;
  onClick?: (value: string) => void;
}

export interface TriggerProps {
  disabled?: boolean;
  value?: string | React.ReactNode;
  separator?: string;
  children?: React.ReactNode;
  placeholder?: string;
  size?: 'small' | 'normal';
  onClear?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
}
