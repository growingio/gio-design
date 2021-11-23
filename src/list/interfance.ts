import React from 'react';

export type ModelType = 'cascader' | 'multiple' | 'single';

export interface SelectionProps extends ListProps {
  className?: string;
  style?: React.CSSProperties;
  options?: SelectionItemProps[] | OptionProps[];
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
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void;
  /**
   * 仅支持options 形式。自定义 item render 自定义render时会劫持onClick方法提供给List来使用
   */
  renderItem?: (option: OptionProps) => React.ReactElement;
  /**
   * 是否显示preview 弹出面板 目前仅支持了options参数形式
   */
  showPreview?: boolean;
  previewRender?: (option: OptionProps) => React.ReactNode;
  previewRenderContainer?: (node: HTMLElement) => HTMLElement;
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
