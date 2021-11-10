import { isEmpty, isNil } from 'lodash';
import { useCallback, useRef } from 'react';
import { CascaderItemProps } from './interfance';

const optionSet = (map: Map<string, CascaderItemProps>, key: string, value: CascaderItemProps) => map.set(key, value);

export const useCacheOptions = () => {
  const cacheOptions = useRef<Map<string, CascaderItemProps>>(new Map());
  const cacheOptionsMap = cacheOptions.current;

  const setCacheOptions = (options?: CascaderItemProps[]) => {
    options?.forEach((option: CascaderItemProps) => {
      if (isNil(cacheOptionsMap.get(option?.value))) {
        optionSet(cacheOptionsMap, option.value, option);
      }
      if (!isEmpty(option.childrens)) {
        setCacheOptions(option.childrens);
      }
    });
  };
  // value to option || options
  const getOptionByValue = useCallback(
    (optValue?: string): CascaderItemProps | undefined => {
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
