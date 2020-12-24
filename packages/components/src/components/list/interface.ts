import { ReactNode, CSSProperties } from 'react';

type ListValueType = string | string[];

export interface IBaseListProps {
  /**
   `list` 数据源
   */
  dataSource: Option[];
  /**
   是否多选
   */
  isMultiple?: boolean;
  /**
   是否保存选中状态, 多选模式下失效
   */
  stateless?: boolean;
  /**
   选中触发的回调
   */
  onChange?: (value: any) => void;
  /**
   选中的值
   */
  value?: any;
  /**
      列表宽度
   */
  width?: number | string;
  /**
      列表高度
   */
  height?: number | string;
  /**
   包裹样式
   */
  wrapStyle?: CSSProperties;
  /**
   前缀 `className` 样式类名
   */
  prefixCls?: string;
  /**
   渲染列表项
   */
  labelRenderer?: (option: Option, isGruop: false) => ReactNode;
  /**
      自定义行高
   */
  rowHeight?: number | ((option: Option) => number);
  /**
   选中的回调
   */
  onSelect?: (selectedValue: string, value: ListValueType, option: Option) => void;
  /**
      取消选中的回调
   */
  onDeselect?: (selectedValue: string, value: ListValueType, option: Option) => void;
  /**
      点击触发的回调
   */
  onClick?: (value: any) => void;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  placement?: string;
  /**
   * 必选一个
   */
  required?: boolean;
}

export interface Option {
  /**
   列表单项主要文字
   */
  label: string;
  /**
      作为列表的 `key` 来使用
   */
  value: string;
  /**
      列表次要文字
   */
  description?: string;
  /**
      是否禁用
   */
  disabled?: boolean;
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
}

export interface SelectCoreProps {
  value?: string | string[];
  onChange: (value: any) => void;
  options: any[];
  disabledOptions?: any[];
  valueKey?: string;
  renderKey?: string;
  isMultiple: boolean;
  stateless?: boolean;
  allowDuplicate?: boolean;
  max?: number;
  height?: number | string;
  rowHeight?: number | ((option: any) => number);
  isLoading?: boolean;
  required?: boolean;
  showSearch?: boolean;
  searchableFields?: string[];
  searchPlaceholder?: string;
  emptyPlaceholder?: React.ReactNode;
  onSearch?: (keyword: string) => void;
  renderFetchButton?: () => React.ReactNode;
  getGroupIcon?: (group: string) => React.ReactNode;
  onSelect?: IBaseListProps['onSelect'];
  onDeselect?: IBaseListProps['onDeselect'];
  onClick?: IBaseListProps['onClick'];
  labelRenderer?: (option: any, isGroup?: boolean) => any;
  showCheckAllBox?: boolean;
  prefixCls?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  placement?: string;
}

export interface SelectListProps {
  options: Option[];
  disabledOptions: Option[];
  value: any | any[];
  valueKey?: string;
  renderKey?: string;
  isMultiple: boolean;
  allowDuplicate?: boolean;
  required?: boolean;
  max?: number;
  height: number | string;
  rowHeight: number | ((option: any) => number);
  onSelect?: (value: any, selectedValue?: any | any[], option?: any) => void;
  onDeselect?: (value: any, selectedValue?: any | any[], option?: any) => void;
  onChange?: (value: any) => void;
  onClick?: (value: any) => void;
  getSelected?: (option: any, value: any) => boolean;
  getGroupIcon?: (group: string) => React.ReactNode;
  labelRenderer?: (option: any, isGroup?: boolean) => any;
  prefixCls?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  placement?: string;
}

export interface GroupProps {
  name: string;
  id?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  isMultiple: boolean;
  isSelected?: boolean;
  indeterminate?: boolean;
  showGroupCheckBox?: boolean;
  onSelect?: (option: any) => void;
  onClick?: (option: any) => void;
  option?: any;
  labelRenderer?: (option: any, isGroup?: boolean) => Element;
  prefixCls?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  placement?: string;
}

export interface OptionProps {
  option: Option;
  style: React.CSSProperties;
  title?: string;
  isSelected?: boolean;
  disabled?: boolean;
  className?: string;
  isMultiple?: boolean;
  allowDuplicate?: boolean;
  hasGroupIcon?: boolean;
  onSelect?: (option: any) => void;
  onClick?: (option: any) => void;
  showGroupCheckBox?: boolean;
  children?: ReactNode;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  placement?: string;
}
