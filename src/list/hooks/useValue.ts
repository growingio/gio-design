import { isNil, isNumber, isString } from 'lodash';
import { OptionProps } from '..';
import { MaybeArray } from '../interface';

const formatValue = (isMultiple: boolean, value?: MaybeArray<string | number>) => {
  if (isMultiple) {
    if (isNil(value)) {
      return [];
    }
    if (isString(value) || isNumber(value)) {
      return [value];
    }
    return value;
  }
  if (isNil(value)) {
    return '';
  }
  return value;
};

const useValue = (
  value?: MaybeArray<string | number>,
  onChange?: (value?: MaybeArray<string | number>, options?: OptionProps | OptionProps[]) => void,
  contextValue?: MaybeArray<string | number>,
  contextOnChange?: (value?: MaybeArray<string | number>, options?: OptionProps | OptionProps[]) => void,
  isMultiple = false
) => ({
  value: formatValue(isMultiple, value ?? contextValue),
  onChange: onChange ?? contextOnChange,
});

export default useValue;
