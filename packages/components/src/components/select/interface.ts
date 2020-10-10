import _ from 'lodash';
import { Option } from '../list/interface';

export interface SelectProps<VT = Option> {
  size?: 'small' | 'medium' | 'large';
  options: VT[];
  multiple?: boolean;
  placeholder?: string;
  defaultSelection?: string | string[];
  searchable?: boolean;
  searchPredicate?: (input: string) => _.ListIterateeCustom<VT, boolean>;
  labelRenderer?: (input: string) => (option: Option, isGroup: boolean) => React.ReactNode;
  onChange?: (option: VT[] | VT) => void;
  customizePrefixCls?: string;
  width?: number;
  listHeight?: number;
  listRowHeight?: number;
  getContainer?: (node: HTMLElement) => HTMLElement;
}

export { Option };
