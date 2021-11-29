export type StringValue = '=' | '!=' | '<' | '>' | 'in' | 'not in' | 'like' | 'not like' | 'hasValue' | 'noValue';
export type NumberValue = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'hasValue';
export type DateValue =
  | '='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'between'
  | 'relativeTime'
  | 'relativeCurrent'
  | 'relativeBetween';

export type attributeValue = 'string' | 'int' | 'date' | 'STRING';

export type FilterValueType = {
  op: StringValue | NumberValue | DateValue;
  values: string[] | number[];
  key?: string;
  name?: string;
  valueType?: attributeValue;
};

export type FilterValue = {
  op: string;
  exprs: FilterValueType[];
};
