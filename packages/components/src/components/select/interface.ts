import _ from 'lodash';
import { Option } from '../list/interface';
import { SizeType } from '../config-provider/SizeContext';

export type MaybeArray<T> = T | T[];

export interface SelectProps {
  // removed
  // defaultSelection?: MaybeArray<string>;
  // width?: number;

  size?: SizeType;
  options: Option[];
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

  autoWidth?: boolean;
  listHeight?: number;
  listRowHeight?: number;
  labelRenderer?: (input: string) => (option: Option, isGroup: boolean) => React.ReactNode;
  searchPredicate?: (input: string) => _.ListIterateeCustom<Option, boolean>;
  matchPredicate?: (input: string) => _.ListIterateeCustom<Option, boolean>;
  optionLabelRenderer?: (value: string, option?: Option) => React.ReactNode;

  defaultValue?: MaybeArray<string>;
  value?: MaybeArray<string>;
  onChange?: (value: MaybeArray<string>, options?: MaybeArray<Option>) => void;
  onSearch?: (input: string) => void;
  onSelect?: (value: string, option: Option) => void;
  onDeselect?: (value: string, option: Option) => void;

  getContainer?: (node: HTMLElement) => HTMLElement;
  dropDownVisible?: boolean;
  onDropDownVisibleChange?: (visible: boolean) => void;
}

export { Option };
