import { CommonProps, SizeType } from '@gio-design/utils';
import React from 'react';
import { EmptyLocale } from '../empty/interfaces';

export type ListPickerLocale = {
  /**
   * 空态组件的国际化
   */
  empty: EmptyLocale;
  /**
   * 展开项文本
   */
  expandText: string;
};

interface ExpandableProps {
  /**
   * 是否可展开，当列表项超过 10 个，收起后续列表项
   */
  expandable?: boolean;
  /**
   * 展开项的文案
   */
  expandText?: string;
}

interface ValueableProps {
  /**
   * 默认选择值
   */
  defaultValue?: string;
  /**
   * 选择某一项时的回调
   */
  onSelect?: (value: string) => void;
  /**
   * 选择值
   */
  value: string;
}

export interface ListPickerProps extends CommonProps, Pick<ExpandableProps, 'expandable'>, Partial<ValueableProps> {
  children?: React.ReactNode;
  /**
   * 列表项
   */
  items?: (GroupProps | ItemProps)[];
  /**
   * 空状态时显示的图片
   */
  emptyImage?: 'no-data' | 'no-result';
  /**
   * 国际化设置
   */
  locale?: Partial<ListPickerLocale>;
  /**
   * 列表项的尺寸
   */
  size?: SizeType;
}

export interface ItemProps extends CommonProps, ExpandableProps, Pick<ValueableProps, 'value'> {
  children: React.ReactNode;
  /**
   * 是否被选中
   */
  selected?: boolean;
  /**
   * 鼠标点击时的回调
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 鼠标进入元素时的回调
   */
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  /**
   * 鼠标离开元素时的回调
   */
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

export interface GroupProps extends CommonProps, ExpandableProps, Partial<Pick<ValueableProps, 'value' | 'onSelect'>> {
  children?: React.ReactNode;
  /**
   * 分组的唯一 key
   */
  key?: string;
  /**
   * 分组名称
   */
  title?: React.ReactNode;
  /**
   * 当前分组的列表项
   */
  items?: ItemProps[];
  /**
   * 当前分组的子分组
   */
  subgroups?: SubgroupProps[];
}

export interface SubgroupProps
  extends CommonProps,
    ExpandableProps,
    Partial<Pick<ValueableProps, 'value' | 'onSelect'>> {
  children?: React.ReactNode;
  /**
   * 子分组的唯一 key
   */
  key?: string;
  /**
   * 子分组名称
   */
  title?: React.ReactNode;
  /**
   * 当前子分组的列表项
   */
  items?: ItemProps[];
}

export interface ExpandItemProps extends CommonProps {
  /**
   * 鼠标点击时的回调
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * 按键时的回调
   */
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * 展示的文本
   */
  text?: string;
}

export type DividerProps = CommonProps;
