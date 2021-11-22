import { isArray, isEmpty, isNil } from 'lodash';
import { useCallback, useRef } from 'react';
import { OptionProps } from '../interfance';

const useCacheOptions = () => {
  const options = useRef<Map<string, OptionProps>>(new Map());
  const optionsMap = options.current;
  const updateOptions = (opts?: OptionProps[]) => {
    opts?.forEach((o: OptionProps) => {
      optionsMap.set(o.value, o);
      if (!isEmpty(o?.childrens)) {
        updateOptions(o?.childrens as OptionProps[]);
      }
    });
  };
  const getOptionByValue = useCallback(
    (optValue?: string): OptionProps | undefined => {
      if (!isNil(optValue)) {
        return optionsMap.get(optValue);
      }
      return undefined;
    },
    [optionsMap]
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

  const getLabelByValue = (val?: string | string[], separator = '') => {
    if (val === '' || typeof val === 'undefined') {
      return undefined;
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
    return getOptionByValue(val)?.label;
  };
  return {
    options: options.current,
    setOptions: updateOptions,
    getOptionByValue,
    getOptionsByValue,
    getLabelByValue,
  };
};

export default useCacheOptions;
