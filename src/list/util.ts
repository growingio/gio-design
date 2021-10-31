import { isArray, isNil, isNumber, isString } from 'lodash';

const selectedStatus = (value?: string | number, values?: string | number | (string | number)[]) => {
  if (!isNil(value)) {
    return isArray(values) ? (values as (string | number)[])?.indexOf(value) !== -1 : values === value;
  }
  return undefined;
};
const initValue = (isMultiple: boolean, value?: string | number | (string | number)[]) => {
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
export default {
  selectedStatus,
  initValue,
};
