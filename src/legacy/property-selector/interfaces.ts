/* eslint-disable prettier/prettier */
// import { NodeData } from '@gio-design/components/es/components/cascader/interface';
import React from 'react';
import { BasePickerProps } from '../base-picker';
import { Dimension } from './types';
import { SelectorProps } from '../selector-pro/interfaces';
/**
 * 属性详情组件的参数
 */
export interface PropertyInfo {
  id?: string;
  name?: string;
  key?: string;
  type?: string;
  description?: string;
  valueType?: string;
  subType?: string;
}
interface Iterable {
  [key: string]: any;
}
/**
 * 获取属性详情的回调
 */
// eslint-disable-next-line @typescript-eslint/ban-types
type FetchData<T extends {}> = (node: PropertyValue) => T | Promise<T>;
/**
 * picker选中后回调值类型
 */
export interface PropertyValue extends Iterable {
  id: string;
  name?: string;
  label?: string;
  value?: string;
  valueType?: string;
  groupId?: string;
  isSystem?: boolean;
}

/**
 *属性选择器参数
 */
export interface PropertyPickerProps
  extends Omit<BasePickerProps, 'footer' | 'renderItems' | 'renderDetail' | 'tabNav' | ''> {
  /**
   * 选中值
   */
  value?: PropertyValue;
  // multiple?: boolean;
  /**
   * 属性选择器的选项列表
   */
  dataSource: Array<PropertyItem | Dimension>;
  /**
   * 鼠标hover列表项详情面板延迟显示的毫秒数
   */
  detailVisibleDelay?: number;
  /**
   * 获取属性详情的方法
   */
  fetchDetailData?: FetchData<PropertyInfo>;
  /**
   * 已选值改变时的回调
   */
  onChange?: (value: PropertyValue) => void;
  /**
   * 选中值时的回调
   */
  onSelect?: (value: PropertyValue) => void;
  /**
   * 列表项点击的回调
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * 本地存储最近使用的属性 key值，用于区分不同用户的最近使用
   */
  recentlyStorePrefix?: string;
  /**
   * 禁用的选项 id数组
   */
  disabledValues?: string[];
  /**
   * 是否重新从localstorage加载最近使用选项,最近使用选项会在点选时自动存储到localstorage,
   * 需要在picker重新渲染或者shouldUpdateRecentlyUsed属性值从false->true时重新加载
   */
  shouldUpdateRecentlyUsed?: boolean;

  className?: string;
}
/**
 * 属性的类型 event|avar|usr
 */
export const PropertyTypes: { [key: string]: string } = {
  event: '事件属性',
  avar: '访问属性',
  usr: '用户属性',
  itm: '维度表',
};

// export type ItemValueType = 'int' | 'string' | 'double' | 'date' | 'list' | 'boolean';
/**
 * 属性选择器选项列表item 类型
 */
export interface PropertyItem extends PropertyValue {
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   *  Dimension.name
   */
  name: string;
  /**
   * type
   */
  type: string;
  typeName?: string;
  /**
   * type 分组展示的排序值 ,值越大位置越靠后
   */
  typeOrder?: number;
  // children?: NodeData[];

  groupName?: string;
  groupOrder?: number;
  /**
   * 列表项的 icon
   */
  itemIcon?: () => React.ReactNode; // (() => React.ReactElement);
  key?: string;
  pinyinName?: string;
}

export interface PropertySelectorProps
  extends Omit<PropertyPickerProps, 'className' | 'style' | 'shouldUpdateRecentlyUsed'>,
    Omit<SelectorProps, 'dropdownRender' | 'valueRender'> {}
export interface PropertyCardProps {
  // nodeData: NodeData;
  // fetchData?: (nodeData: NodeData) => Promise<PropertyInfo> | PropertyInfo;
  // data?: PropertyItem;
  // loading?: boolean;
  nodeData: PropertyValue;
  fetchData: (nodeData: PropertyValue) => Promise<PropertyInfo>;
}
