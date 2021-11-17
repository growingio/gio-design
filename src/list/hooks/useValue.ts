import { isNil, isString } from 'lodash';
import { OptionProps } from '..';

const formatValue = (isMultiple: boolean, value?: string | string[]) => {
  if (isMultiple) {
    if (isNil(value)) {
      return [];
    }
    if (isString(value)) {
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
  value?: string | string[],
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void,
  contextValue?: string | string[],
  contextOnChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void,
  isMultiple = false
) => ({
  value: formatValue(isMultiple, value ?? contextValue),
  onChange: onChange ?? contextOnChange,
});

export default useValue;
