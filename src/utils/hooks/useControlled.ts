import { useState, useEffect, useDebugValue, Dispatch, SetStateAction } from 'react';
import { isUndefined } from 'lodash';

function format<T>([localValue, inputValue]: [T, T]) {
  const isControlled = isUndefined(inputValue) ? 'uncontrolled' : 'controlled';
  const value = isUndefined(inputValue) ? localValue : inputValue;
  return `State is ${isControlled} | Value is ${value}`;
}

const useControlledState = <T>(
  value?: T,
  onChange?: (value?: T) => void,
  defaultValue?: T
): [T | undefined, Dispatch<SetStateAction<T>>] => {
  const [localValue, setLocalValue] = useState(() => (isUndefined(value) ? defaultValue : value));

  useDebugValue([localValue, value], format);

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(localValue);
    }
  }, [localValue, onChange]);

  return [isUndefined(value) ? localValue : value, setLocalValue];
};

export default useControlledState;
