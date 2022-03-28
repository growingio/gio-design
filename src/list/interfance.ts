import React from 'react';
import { ListContextProps } from './context';

export type ModelType = 'cascader' | 'multiple' | 'single';
export type MaybeArray<T> = T | T[];
export interface SelectionProps extends ListProps {
  className?: string;
  style?: React.CSSProperties;
  options?: SelectionItemProps[] | OptionProps[];
  children?: ((context: ListContextProps) => JSX.Element | React.ReactNode) | React.ReactNode;
  // ['data-testid']?: string;
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
  value?: MaybeArray<string | number>;
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
   * 多选时最多选择多少个
   */
  max?: number;
  /**
   *
   */
  collapse?: number;
  /**
   *
   */
  onClick?: (value?: string | number, event?: React.MouseEvent<HTMLLIElement | HTMLInputElement>) => void;
  /**
   *
   */
  onChange?: (value?: MaybeArray<string | number>, options?: OptionProps | OptionProps[]) => void;
  /**
   * 仅支持options 形式。自定义 item render 自定义render时会劫持onClick方法提供给List来使用
   */
  renderItem?: (option: OptionProps) => React.ReactElement;
  itemStrategy?: 'fixed' | 'absolute';
  empty?: React.ReactNode;
  needEmpty?: boolean;
  /**
   * value解析连接符 默认为'.'
   */
  valueSeparator?: string;
}

export interface DragListProps extends Omit<ListProps, 'model' | 'onChange' | 'value' | 'children'> {
  options: OptionProps[];
  onChange?: (value: OptionProps[]) => void;
}

export interface OptionProps {
  label?: string | React.ReactNode;
  value: string | number;
  disabled?: boolean;
  disabledTooltip?: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  /**
   * @deprecated 未来版本迭代后会弃用 1.x.x -> 2.x.x
   */
  wrapper?: (element: React.ReactNode) => React.ReactElement;
  onClick?: (v?: string, event?: React.MouseEvent<HTMLLIElement | HTMLInputElement>) => void;
  [key: string]: unknown;
}

export interface DragItemProps extends ItemProps {
  onMoved?: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

export interface CascaderItemProps extends BaseItemProps {
  label: string;
  value: string | number;
  strategy?: 'fixed' | 'absolute';
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
    | 'onMouseLeave'
    | 'onMouseEnter'
  > {
  selectValue?: string | string[];
  strategy?: 'fixed' | 'absolute';
}

export interface BaseItemProps extends Pick<OptionProps, 'value' | 'disabled' | 'prefix' | 'suffix' | 'wrapper'> {
  className?: string;
  style?: React.CSSProperties;
  label?: string | React.ReactNode;
  contentRender?: (element: React.ReactNode) => React.ReactElement;
  children?: React.ReactNode;
  disabledTooltip?: string;
  selected?: boolean;
  hovered?: boolean;
  onClick?: (value?: string | number, event?: React.MouseEvent<HTMLLIElement | HTMLInputElement>) => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLLIElement | HTMLInputElement>) => void;
  onMouseLeave?: (event?: React.MouseEvent<HTMLLIElement | HTMLInputElement>) => void;
}

export interface TriggerProps {
  disabled?: boolean;
  value?: string | number | React.ReactNode;
  separator?: string;
  children?: React.ReactNode;
  placeholder?: string;
  size?: 'small' | 'normal';
  onClear?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
}
