import { isArray, isEmpty, isNil, isString } from 'lodash';
import { useCallback, useRef } from 'react';
import { CascaderItemProps } from '.';
import { ModelType, OptionProps } from './interfance';

export const isMultipe = (model: ModelType) => model === 'multiple';
export const isCascader = (model: ModelType) => model === 'cascader';

const selectedStatus = (value?: string, values?: string | string[]) => {
  if (!isNil(value)) {
    return isArray(values) ? (values as string[])?.indexOf(value) !== -1 : values === value;
  }
  return undefined;
};
const initValue = (isMultiple: boolean, value?: string | string[]) => {
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

const optionSet = (map: Map<string, OptionProps>, key: string, value: OptionProps) => map.set(key, value);

export const useCacheOptions = () => {
  const cacheOptions = useRef<Map<string, OptionProps>>(new Map());
  const cacheOptionsMap = cacheOptions.current;

  const setCacheOptions = (options?: OptionProps[] | CascaderItemProps[]) => {
    options?.forEach((option: OptionProps) => {
      optionSet(cacheOptionsMap, option.value, option);
      if (!isEmpty(option?.childrens)) {
        setCacheOptions(option?.childrens as OptionProps[]);
      }
    });
  };
  // value to option || options
  const getOptionByValue = useCallback(
    (optValue?: string): OptionProps | undefined => {
      if (!isNil(optValue)) {
        return cacheOptionsMap.get(optValue);
      }
      return undefined;
    },
    [cacheOptionsMap]
  );
  const getOptionsByValue = (optValue?: string | string[]): OptionProps | OptionProps[] | undefined =>
    Array.isArray(optValue)
      ? optValue.reduce((prev: OptionProps[], v) => {
          const op = getOptionByValue(v);
          if (op) {
            prev.push(op);
          }
          return prev;
        }, [] as any)
      : getOptionByValue(optValue);

  return {
    setCacheOptions,
    getOptionByValue,
    getOptionsByValue,
    cacheOptionsMap,
  };
};

export default {
  selectedStatus,
  initValue,
};
