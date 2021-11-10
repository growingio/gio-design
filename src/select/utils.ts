import { isNil } from 'lodash';
import { useCallback, useRef } from 'react';
import { OptionProps } from './interface';

const optionSet = (map: Map<string | number, OptionProps>, key: string | number, value: OptionProps) =>
  map.set(key, value);

export const useCacheOptions = () => {
  const cacheOptions = useRef<Map<string | number, OptionProps>>(new Map());
  const cacheOptionsMap = cacheOptions.current;

  const setCacheOptions = (options?: OptionProps[]) => {
    options?.forEach((option: OptionProps) => optionSet(cacheOptionsMap, option.value, option));
  };
  // value to option || options
  const getOptionByValue = useCallback(
    (optValue?: string | number): OptionProps | undefined => {
      if (!isNil(optValue)) {
        return cacheOptionsMap.get(optValue);
      }
      return undefined;
    },
    [cacheOptionsMap]
  );

  return {
    setCacheOptions,
    getOptionByValue,
    cacheOptionsMap,
  };
};

export default {
  useCacheOptions,
};
