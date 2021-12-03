import { isArray, isEmpty, isNil, isNumber } from 'lodash';
import { useCallback, useRef } from 'react';
import { MaybeArray, OptionProps } from '../interfance';

const useCacheOptions = () => {
  const options = useRef<Map<string | number, OptionProps>>(new Map());
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
    (optValue?: string | number): OptionProps | undefined => {
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

  const getLabelByValue = (val?: MaybeArray<string | number>, separator = '') => {
    if (val === '' || typeof val === 'undefined' || isNumber(val)) {
      return '';
    }
    if (val?.includes('.')) {
      return (val as any)
        ?.split('.')
        ?.reduce((prev: string[], curr: string | number) => [...prev, getOptionByValue?.(curr)?.label], [])
        ?.join(separator);
    }
    if (isArray(val)) {
      return val?.reduce((prev, curr: string | number) => [...prev, getOptionByValue?.(curr)?.label], [])?.join(',');
    }
    return getOptionByValue(val)?.label ?? '';
  };
  const getOptionTreeByValue = (val?: string | number) => {
    if (val === '' || typeof val === 'undefined' || isNumber(val)) {
      return '';
    }
    if (val?.includes('.')) {
      return (val as any)?.split('.')?.reduceRight((prev: { key: string; value: string }, curr: string) => {
        if (isEmpty(prev)) {
          return { ...getOptionByValue?.(curr) };
        }
        return {
          ...getOptionByValue?.(curr),
          childrens: [{ ...prev }],
        };
      }, {});
    }
    return getOptionByValue(val);
  };
  return {
    options: options.current,
    setOptions: updateOptions,
    getOptionByValue,
    getOptionsByValue,
    getLabelByValue,
    getOptionTreeByValue,
  };
};

export default useCacheOptions;
