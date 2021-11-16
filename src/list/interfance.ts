import React from 'react';

export type ModelType = 'cascader' | 'multiple' | 'simple';

export interface SelectionProps extends ListProps {
  className?: string;
  value?: string | string[];
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void;
  style?: React.CSSProperties;
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
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void;
  /**
   * 仅支持options 形式。自定义 item render 自定义render时会劫持onClick方法提供给List来使用
   */
  renderItem?: (option: OptionProps) => React.ReactElement;
  /**
   *
   */
  selectedParent?: string[];
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
  label: string;
  value: string;
  disabled?: boolean;
  disabledTooltip?: string;
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
  selectedParent?: string[];
  onChange?: (value: string) => void;
  childrens?: CascaderItemProps[];
}
export interface ItemProps
  extends Pick<
    BaseItemProps,
    | 'className'
    | 'style'
    | 'label'
    | 'children'
    | 'prefix'
    | 'suffix'
    | 'onClick'
    | 'label'
    | 'value'
    | 'disabled'
    | 'selected'
  > {
  disabledTooltip?: string;
  selectedParent?: string[];
  selectValue?: string | string[];
}

export interface BaseItemProps extends Pick<OptionProps, 'value' | 'disabled'> {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  contentRender?: (element: React.ReactNode) => React.ReactNode | Element;
  children?: React.ReactNode;
  disabledTooltip?: string;
  selected?: boolean;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  onClick?: (value: string) => void;
}
