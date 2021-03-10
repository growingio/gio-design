import { useCallback, useRef } from 'react';
import { MaybeArray, Option } from '../interface';

const optionSet = (map: Map<string | number, any>, key: string | number, value: Option) => {
  map.set(key, value)
};
const groupOptionSet = (map: Map<string | number, any>, key: string | number, option: Option) => {
  if (map.get(key)) {
    const { options: groupOptions = new Map(), ...rest } = map.get(key);
    map.set(key, {
      options: groupOptions.set(option.value, option),
      ...rest,
    });
  } else {
    map.set(key, {
      label: option.groupLabel,
      value: option.groupValue,
      isSelectOptGroup: true,
      options: new Map([[option.value, option]]),
    });
  }
  map.set(option.value, option);
};

export default function useCacheOptions() {
  const cacheOptions = useRef(new Map());
  const cacheOptionsMap = cacheOptions.current;
  const isGroup = useRef(false);
  const hasGroup = isGroup.current;
  const setCacheOptions = (options: Option[]) => {
    if (!hasGroup) {
      options.forEach((option: Option) => optionSet(cacheOptionsMap, option.value, option));
    } else {
      options.forEach((option: Option) =>
        groupOptionSet(cacheOptionsMap, option.groupValue as string | number, option)
      );
    }
  };

  const updateGroup = (value: boolean) => {
    isGroup.current = value;
  };
  // value to option || options
  const getOptionByValue = useCallback(
    (optValue: string | number): Option => {
      return cacheOptionsMap.get(optValue);
    },
    [cacheOptionsMap]
  );

  const getOptionsByValue = (optValue: MaybeArray<string | number>): MaybeArray<Option> => {
    return Array.isArray(optValue)
      ? optValue.reduce((prev: Option[], v) => {
        const op = getOptionByValue(v);
        if (op) {
          prev.push(op);
        }
        return prev;
      }, [])
      : getOptionByValue(optValue);
  };
  return {
    setCacheOptions,
    getOptionByValue,
    getOptionsByValue,
    updateGroup,
    cacheOptionsMap,
    hasGroup,
  };
}
