import { useState, useEffect, useRef, useDebugValue } from 'react';
import { isUndefined } from 'lodash';

function format<T>([innerState, outterState]: [T, T]) {
  const isControlled = isUndefined(outterState) ? 'uncontrolled' : 'controlled';
  const value = isUndefined(outterState) ? innerState : outterState;
  return `State is ${isControlled} | Value is ${value}`;
}

const useControlledState = <T>(
  outterState: T | (() => T) | undefined,
  defaultOutterState: T,
  callback?: (state: T | (() => T)) => void
): [T, (state: T | (() => T), force?: boolean) => void] => {
  // if (outterState === undefined && defaultOutterState === undefined) {
  //   throw new TypeError('Either "value" or "defaultValue" variable must be set. Now both are undefined');
  // }
  const [innerState, setInnerState] = useState<T>(isUndefined(outterState) ? defaultOutterState : outterState);

  const setState = useRef((state: T | (() => T), force = false) => {
    if (isUndefined(outterState) || force) {
      setInnerState(state);
    }

    callback?.(state);
  }).current;

  useDebugValue([innerState, outterState], format);

  useEffect(() => {
    if (!isUndefined(outterState)) {
      setInnerState(outterState);
    }
  }, [outterState]);

  return [innerState, setState];
};

export default useControlledState;
