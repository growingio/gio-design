import { useContext, useMemo } from 'react';
import { listFormat } from '../../../..';
import { FilterPickerContext } from '../../../../FilterPicker';
import { ListValue, selectOption } from '../../../../interfaces';

export enum AttributeMap {
  string = 'string',
  int = 'int',
  date = 'date',
  double = 'double',
  list = 'list',
}

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

export type attributeValue = 'string' | 'int' | 'date' | 'double' | 'list';

export type FilterValueType = {
  op: StringValue | NumberValue | DateValue | ListValue;
  values: string[] | number[];
  key?: string;
  name?: string;
  valueType?: attributeValue;
};

export type FilterValue = {
  op: string;
  exprs: FilterValueType[];
};

export const useSelectOptions = () => {
  const { textObject: t } = useContext(FilterPickerContext);
  return useMemo<selectOption>(
    () => ({
      string: [
        {
          value: '=',
          label: t['='],
        },
        {
          value: '!=',
          label: t['!='],
        },
        {
          value: 'in',
          label: t.in('...'),
        },
        {
          value: 'not in',
          label: t.notIn('...'),
        },
        {
          value: 'like',
          label: t.like,
        },
        {
          value: 'not like',
          label: t.notLike,
        },
        {
          value: 'hasValue',
          label: t.hasValue,
        },
        {
          value: 'noValue',
          label: t.noValue,
        },
      ],
      int: [
        {
          value: '=',
          label: t['='],
        },
        {
          value: '!=',
          label: t['!='],
        },
        {
          value: '>',
          label: t['>'],
        },
        {
          value: '>=',
          label: t['>='],
        },
        {
          value: '<',
          label: t['<'],
        },
        {
          value: '<=',
          label: t['<='],
        },
        {
          value: 'between',
          label: t.between(listFormat(['...', '...'], t.code)),
        },
        {
          value: 'not between',
          label: t.notBetween(listFormat(['...', '...'], t.code)),
        },
        {
          value: 'hasValue',
          label: t.hasValue,
        },
        {
          value: 'noValue',
          label: t.noValue,
        },
      ],
      double: [
        {
          value: '=',
          label: t['='],
        },
        {
          value: '!=',
          label: t['!='],
        },
        {
          value: '>',
          label: t['>'],
        },
        {
          value: '>=',
          label: t['>='],
        },
        {
          value: '<',
          label: t['<'],
        },
        {
          value: '<=',
          label: t['<='],
        },
        {
          value: 'between',
          label: t.between(listFormat(['...', '...'], t.code)),
        },
        {
          value: 'not between',
          label: t.notBetween(listFormat(['...', '...'], t.code)),
        },
        {
          value: 'hasValue',
          label: t.hasValue,
        },
        {
          value: 'noValue',
          label: t.noValue,
        },
      ],
      date: [
        {
          value: '=',
          label: t['='],
        },
        {
          value: '!=',
          label: t['!='],
        },
        {
          value: '<',
          label: t.somedayAgo(t.someday),
        },
        {
          value: '>',
          label: t.somedayAfter(t.someday),
        },
        {
          value: 'between',
          label: t.between(listFormat(['...', '...'], t.code)),
        },
        {
          value: 'not between',
          label: t.notBetween(listFormat(['...', '...'], t.code)),
        },
        {
          value: 'relativeCurrent',
          label: t.relativeCurrent,
        },
        {
          value: 'relativeBetween',
          label: t.relativeBetween,
        },
        {
          value: 'hasValue',
          label: t.hasValue,
        },
        {
          value: 'noValue',
          label: t.noValue,
        },
      ],
      list: [
        {
          value: 'hasAll',
          label: t.allLike,
        },
        {
          value: 'not hasAll',
          label: t.notAllLike,
        },
        {
          value: 'empty',
          label: t.empty,
        },
        {
          value: 'not empty',
          label: t.notEmpty,
        },
      ],
    }),
    [t]
  );
};
