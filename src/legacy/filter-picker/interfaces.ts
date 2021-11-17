import { PropertyPickerProps } from '../property-selector';

export interface FilterPickerProps extends Pick<PropertyPickerProps, 'fetchDetailData'> {
  children?: any;
  getTooltipContainer: (node: HTMLElement) => HTMLElement;
  filter: FilterValue;
  propertyOptions: any[];
  measurements: any[];
  timeRange: string;
  onConfirm: (v: FilterValue) => void;
  dimensionValueRequest?: (data: any) => Promise<any>;
  recentlyStorePrefix: string;
  operationsOption?: operationsOptionType;
  hasVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (v: boolean) => void;
  placement?: 'bottomLeft' | 'bottom' | 'bottomRight';
  disabled?: boolean;
}
export type attributeValue = 'string' | 'int' | 'date';

export type FilterValueType = {
  op: StringValue | NumberValue | DateValue;
  values: string[];
  key?: string;
  name?: string;
  valueType?: attributeValue;
  groupId?: string;
};

export type FilterValue = {
  op: string;
  exprs: FilterValueType[];
};

export type StringValue = '=' | '!=' | '<' | '>';
export type NumberValue = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'hasValue';
export type DateValue = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'relativeTime';

export type opStringType = '=' | '!=' | 'in' | 'not in' | 'like' | 'not like' | 'hasValue' | 'noValue';
export type opNumberType = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'not between' | 'hasValue' | 'noValue';
export type opDateType =
  | '='
  | '!='
  | '>'
  | '<'
  | 'relativeBetween'
  | 'relativeCurrent'
  | 'between'
  | 'not between'
  | 'hasValue'
  | 'noValue';

type opSTRINGType = '=' | '!=' | 'in' | 'not in' | 'like' | 'not like';

export interface titleGroup {
  string: string;
  int: string;
  date: string;
  STRING: string;
}

type selectItem = {
  value: string;
  label: string;
};

export interface selectOption {
  string: selectItem[];
  STRING: selectItem[];
  int: selectItem[];
  date: selectItem[];
}

export interface operationsOptionType {
  string: opStringType[];
  int: opNumberType[];
  date: opDateType[];
  STRING: opSTRINGType[];
}
