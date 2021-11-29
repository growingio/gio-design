import _ from 'lodash';
import React from 'react';
import { SizeType } from '../config-provider/SizeContext';

export type MaybeArray<T> = T | T[];

export type modeType = 'string' | 'tags' | undefined;
export type searchType = 'normal' | 'inner' | 'no-search';
export interface Option {
  /**
   列表单项主要文字
   */
  label: string | React.ReactNode;
  /**
      作为列表的 `key` 来使用
   */
  value: string | number;
  /**
      列表次要文字
   */
  description?: string;
  /**
      是否禁用
   */
  disabled?: boolean;
  /**
   * 选中该 Option 后，Select 的 title
   */
  title?: string;
  /**
      `tooltip` 描述
   */
  tooltip?: string;
  /**
   分组的 `key` ，与 `groupLabel` 一起使用
   */
  groupValue?: string;
  /**
      分组的标题
   */
  groupLabel?: string;

  options?: Map<string | number, Option>;
}

export interface OptGroupProps {
  children?: React.ReactNode;
  label: string | React.ReactNode;
  value: string | number;
}

export interface OptionProps {
  children?: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  title?: string;
  [prop: string]: any;
}

export interface SelectProps {
  /**
   * select 的大小
   */
  size?: SizeType;
  /**
   * classname 前缀
   */
  customizePrefixCls?: string;
  /**
   * 多选模式
   */
  multiple?: boolean;
  /**
   * 多选模式下选中的展示模式(仅在多选开启下生效)
   */
  mode?: modeType;
  /**
   * 多选模式下开启全选(仅在多选开启下生效)
   */
  useAll?: boolean;
  /**
   * 是否使用footer(仅在多选开启下生效)
   */
  useFooter?: boolean;
  /**
   * 搜索模式下占位符
   */
  placeholder?: string;
  /**
   * inner搜索模式下占位符
   */
  innerInputPlaceHolder?: string;
  /**
   * 搜索的方式
   */
  searchType?: searchType;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否有边框
   */
  bordered?: boolean;
  /**
   * classname
   */
  className?: string;
  /**
   * dropDown classname
   */
  dropDownClassName?: string;
  /**
   * 自定义select样式
   */
  style?: React.CSSProperties;
  /**
   * 自定义group样式
   */
  groupStyle?: React.CSSProperties;
  /**
   * 自定义option样式
   */
  optionStyle?: React.CSSProperties;
  /**
   * 自定义dropDown样式
   */
  dropDownStyle?: React.CSSProperties;
  /**
   * 默认值
   */
  defaultValue?: MaybeArray<string | number> | null;
  /**
   * 选中值
   */
  value?: MaybeArray<string | number> | null;
  /**
   * option
   */
  options?: Option[];

  /**
   * 多选模式下 是否允许通过搜索自定义插入 option
   */
  allowCustomOption?: boolean;
  /**
   * 被包裹的元素
   */
  triggerComponent?: React.ReactElement;
  /**
   * 自定义无搜索内容
   */
  notFoundContent?: React.ReactElement;

  /**
   * 自定义下拉icon
   */
  arrowComponent?: React.ReactElement;
  /**
   * 自定义清除icon
   */
  closeComponent?: React.ReactElement;
  /**
   * 下拉框是否与选择框宽度一致
   */
  autoWidth?: boolean;
  /**
   * 滚动容器高度
   */
  listHeight?: number;
  /**
   * 虚拟滚动默认选项高度为 32px，如果你的选项高度小于该值,则需要调整
   */
  listRowHeight?: number;
  /**
   * Item 的自定义渲染方法， 默认实现搜索高亮
   */
  labelRenderer?: (input: string) => (option: Option, isGroup: boolean) => React.ReactNode;
  /**
   * 搜索过滤的方法
   */
  searchPredicate?: (input: string) => _.ListIterateeCustom<Option, boolean>;
  /**
   * 决定是否为完全匹配的方法
   */
  matchPredicate?: (input: string) => _.ListIterateeCustom<Option, boolean>;
  /**
   * 自定义 option label 的方法
   */
  optionLabelRenderer?: (value: string | number, option?: Option) => React.ReactNode;
  /**
   * 选中值改变时的回调
   */
  onChange?: (value: MaybeArray<string | number> | null, options?: MaybeArray<Option> | null) => void;
  /**
   * 搜索输入改变时的回调
   */
  onSearch?: (input: string) => void;
  /**
   * 被选中时调用，参数为选中项的 value
   */
  onSelect?: (value: string | number, option: Option) => void;
  /**
   * 默认情况下不开启返选(multiple下该参数无效，开启后不执行 onDeselect)
   */
  allowDeselect?: boolean;
  /**
   * 反选的回调
   */
  onDeselect?: (value: string | number, option: Option) => void;
  /** 开启清除功能 */
  allowClear?: boolean;
  /**
   * 清除的回调
   */
  onClear?: () => void;
  /**
   * 浮层渲染父节点，默认渲染到 body 上
   */
  getContainer?: (node: HTMLElement) => HTMLElement;
  /**
   * 是否显示 dropdown
   */
  dropDownVisible?: boolean;
  /**
   * dropdown visible 值改变时的回调
   */
  onDropDownVisibleChange?: (visible: boolean) => void;
  children?: React.ReactNode[] | React.ReactNode;
}

export interface SelectorProps {
  input: string;
  disabled: boolean;
  prefix: string;
  size: string;
  multiple: boolean;
  bordered: boolean;
  isFocused: boolean;
  className?: string | undefined;
  visible: boolean;
  style?: React.CSSProperties | undefined;
  allowClear: boolean;
  mode?: modeType;
  value?: MaybeArray<string | number> | undefined | null;
  searchType: searchType;
  placeholder?: string;
  innerInputPlaceHolder?: string;
  optionLabelRenderer: (value: string | number, option?: Option) => React.ReactNode;
  getOptionByValue: (optValue: string | number) => Option;
  onInputChange: (value: string) => void;
  onAllowClear: () => void;
  deleteValue: (value: React.ReactText[], v: string | number) => void;
  arrowComponent?: React.ReactElement | undefined;
  closeComponent?: React.ReactElement | undefined;
  [key: string]: any;
}

export interface VirtualListProps {
  itemHeight?: number;
  height?: number;
  prefixCls?: string;
  children: any;
  data: Option[];
  virtual?: boolean;
  itemKey: string | number | ((item: never) => React.ReactText);
}

export interface OptionsListProps {
  style: React.CSSProperties;
  input: string;
  prefixCls: string;
  groupStyle: React.CSSProperties | undefined;
  optionStyle: React.CSSProperties | undefined;
  selected?: MaybeArray<React.ReactText> | undefined | null;
  multiple: boolean;
  isMode?: boolean;
  isUseAll?: boolean;
  data: Option[];
  hasGroup: boolean;
  searchType: searchType;
  placeholder?: string;
  notFoundContent?: React.ReactElement;
  onTempValueChange: (tempValue: React.ReactText[]) => void;
  setTempValue: (values: React.ReactText[]) => void;
  value?: MaybeArray<React.ReactText> | null;
  tempValue: React.ReactText[];
  isFooter?: boolean;
  labelRenderer: (option: Option, isGruop: false) => React.ReactNode;
  onOptionClick: (selectedValue: string | number) => void;
  getContainer?: (node: HTMLElement) => HTMLElement;
  onValueChange?: (optionValues: MaybeArray<string | number> | null) => void;
  onInputChange: (value: string) => void;
  height?: number | undefined;
  itemHeight?: number | undefined;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  onOptionListKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}
