import { isArray } from 'lodash';
import { SelectionProps, OptionProps } from './interfance';

export const getLabelByValue = (
  val?: string | string[],
  opts?: OptionProps | OptionProps[],
  separator = '',
  getOptionByValue?: (optValue?: string) => OptionProps | undefined
) => {
  if (val === '' || typeof val === 'undefined') {
    return '';
  }
  if (val?.includes('.')) {
    return (val as any)
      ?.split('.')
      ?.reduce((prev: string[], curr: string) => [...prev, getOptionByValue?.(curr)?.label], [])
      ?.join(separator);
  }
  if (isArray(val)) {
    return val?.reduce((prev, curr: string) => [...prev, getOptionByValue?.(curr)?.label], [])?.join(',');
  }
  return isArray(opts) ? (opts as OptionProps[])?.find((o) => o.value === val)?.label : opts?.label;
};

export const getFlattenOptions = (data: OptionProps[], isSelection = false): SelectionProps[] | OptionProps[] => {
  const groupMap = new Map();
  if (!isSelection) {
    return data;
  }
  data?.map((cur: OptionProps) => {
    const gValue = groupMap.get(cur.selectionValue);
    if (gValue) {
      const { options, ...rest } = gValue;
      return groupMap.set(cur.selectionValue, {
        options: [...options, cur],
        ...rest,
      });
    }
    return groupMap.set(cur.selectionValue, {
      label: cur.selectionTitle,
      value: cur.selectionValue,
      options: [cur],
    });
  });
  const flattenOption: SelectionProps[] = [];
  groupMap.forEach((value) => {
    flattenOption.push({
      selectionTitle: value.label,
      selectionValue: value.value,
      options: value.options ?? [],
    });
  });
  return flattenOption;
};

export default {
  getLabelByValue,
};
