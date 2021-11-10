import { CommonProps } from '@gio-design/utils';
import React from 'react';
import { EmptyLocale } from '../../empty/interfaces';

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

export interface ValueItemMap {
  [key: string]: ItemType;
}

interface ExpandableProps {
  /**
   * 是否可展开，当列表项超过 10 个，收起后续列表项
   */
  expandable: boolean;
  /**
   * 展开项的文案
   */
  expandText: string;
}

interface ValueableProps {
  /**
   * 默认选择值
   */
  defaultValue: string;
  /**
   * 选择值
   */
  value: string;
}

export interface ListPickerProps
  extends CommonProps,
    Partial<Pick<ExpandableProps, 'expandable'>>,
    Partial<ValueableProps> {
  children?: React.ReactNode;
  /**
   * 列表项
   */
  items?: ItemType[];
  /**
   * 列表项分组
   */
  groups?: GroupType[];
  /**
   * 空状态时显示的图片
   */
  emptyImage?: 'no-data' | 'no-result';
  /**
   * 国际化设置
   */
  locale?: Partial<ListPickerLocale>;
  /**
   * 选择某一项时的回调
   */
  onSelect?: (value: string, item?: React.ReactNode) => void;
  /**
   * 列表项的尺寸
   */
  size?: 'small' | 'middle' | 'large';
}

export interface ItemType extends Pick<ValueableProps, 'value'> {
  children: React.ReactNode;
  /**
   * 此项是否禁用
   */
  disabled?: boolean;
}

export interface SubgroupType {
  /**
   * 当前子分组的列表项
   */
  items: ItemType[];
  /**
   * 子分组名称
   */
  title?: React.ReactNode;
}

export interface GroupType {
  /**
   * 当前分组的列表项
   */
  items?: ItemType[];
  /**
   * 子分组
   */
  subgroups?: SubgroupType[];
  /**
   * 分组名称
   */
  title?: React.ReactNode;
}

export interface ItemProps extends CommonProps, ItemType {
  /**
   * 是否被选中
   */
  selected?: boolean;
}

export interface GroupProps extends CommonProps, ExpandableProps, GroupType, Partial<Pick<ValueableProps, 'value'>> {
  /**
   * 是否为最后一个分组
   */
  isLast?: boolean;
}

export interface SubgroupProps
  extends CommonProps,
    ExpandableProps,
    SubgroupType,
    Partial<Pick<ValueableProps, 'value'>> {
  /**
   * 是否为最后一个子分组
   */
  isLast?: boolean;
}

export interface ExpandableItemsProps {
  expandable: boolean;
  expanded: boolean;
  expandText: string;
  onExpand: () => void;
  items: ItemType[];
  value?: string;
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
