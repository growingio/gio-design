import _ from 'lodash';
import { Option } from '../list/interface';
import { SizeType } from '../config-provider/SizeContext';

export type MaybeArray<T> = T | T[];

export interface SelectProps {
  // removed
  // defaultSelection?: MaybeArray<string>;
  // width?: number;
  allowClear?: boolean;
  size?: SizeType;
  options?: Option[];
  multiple?: boolean;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  allowCustomOption?: boolean;
  notFoundContent?: React.ReactElement;
  customizePrefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  dropDownClassName?: string;
  dropDownStyle?: React.CSSProperties;
  bordered?: boolean;
  arrowComponent?: React.ReactElement;
  allowDeselect?: boolean;
  autoWidth?: boolean;
  listHeight?: number;
  listRowHeight?: number;
  labelRenderer?: (input: string) => (option: OptionProps, isGroup: boolean) => React.ReactNode;
  searchPredicate?: (input: string) => _.ListIterateeCustom<OptionProps, boolean>;
  matchPredicate?: (input: string) => _.ListIterateeCustom<OptionProps, boolean>;
  optionLabelRenderer?: (value: string | number, option?: OptionProps) => React.ReactNode;

  defaultValue?: MaybeArray<string | number>;
  value?: MaybeArray<string | number>;
  onChange?: (value: MaybeArray<string | number>, options?: MaybeArray<OptionProps>) => void;
  onSearch?: (input: string) => void;
  onSelect?: (value: string | number, option: OptionProps) => void;
  onDeselect?: (value: string | number, option: OptionProps) => void;
  onClear?: () => void;
  getContainer?: (node: HTMLElement) => HTMLElement;
  dropDownVisible?: boolean;
  onDropDownVisibleChange?: (visible: boolean) => void;
  children?: React.ReactNode[] | React.ReactNode;
}

export interface OptGroupProps {
  children?: React.ReactNode;
  label?: string;
  value: string | number;
}

export interface OptionProps {
  children?: React.ReactNode;
  [prop: string]: any;
}

export { Option };
