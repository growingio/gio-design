import { ReactNode, CSSProperties } from 'react';

type ListValueType = string | string[];

export interface IBaseListProps {
  dataSource: Option[];
  isMultiple?: boolean;
  stateless?: boolean;
  onChange?: (value: any) => void;
  value?: any;
  width?: number | string;
  height?: number;
  wrapStyle?: CSSProperties;
  prefixCls?: string;
  labelRenderer?: (option: Option, isGruop: false) => ReactNode;
  rowHeight?: number | ((option: Option) => number);
  onSelect?: (selectedValue: string, value: ListValueType, option: Option) => void;
  onDeselect?: (selectedValue: string, value: ListValueType, option: Option) => void;
  onClick?: (value: any) => void;
}

export interface Option {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  tooltip?: string;
  groupValue?: string;
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
  height?: number;
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
  height: number;
  rowHeight: number | ((option: any) => number);
  onSelect?: (value: any, selectedValue?: any | any[], option?: any) => void;
  onDeselect?: (value: any, selectedValue?: any | any[], option?: any) => void;
  onChange?: (value: any) => void;
  onClick?: (value: any) => void;
  getSelected?: (option: any, value: any) => boolean;
  getGroupIcon?: (group: string) => React.ReactNode;
  labelRenderer?: (option: any, isGroup?: boolean) => any;
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
  getPopupContainer: (node: HTMLElement) => HTMLElement;
}
