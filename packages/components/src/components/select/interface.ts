import _ from 'lodash';
import { Option } from '../list/interface';

export interface SelectProps<VT = Option> {
  size?: 'small' | 'medium' | 'large';
  options: VT[];
  multiple?: boolean;
  placeholder?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  searchable?: boolean;
  searchPredicate?: (input: string) => _.ListIterateeCustom<VT, boolean>;
  labelRenderer?: (input: string, prefix: string) => (option: Option, isGroup: boolean) => React.ReactNode;
  onChange?: (option: VT[] | VT) => void;
  customizePrefixCls?: string;
  width?: number;
  listHeight?: number;
  listRowHeight?: number;
  getContainer?: (node: HTMLElement) => HTMLElement;

  // deprecated
  defaultSelection?: string | string[];
}

export { Option };
