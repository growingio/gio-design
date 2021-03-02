import { useState, useEffect, useRef } from 'react';

const useControlledState = <T>(
  controlledState: T | (() => T) | undefined,
  empty: T
): [T, (_state: T | (() => T), force?: boolean) => void] => {
  const [_controlledState, setControlledState] = useState<T>(controlledState === undefined ? empty : controlledState);
  
  const setState = useRef((_state: T | (() => T), force = false) => {
    if (controlledState === undefined || force) {
      setControlledState(_state);
    }
  }).current;

  useEffect(() => {
    if (controlledState !== undefined) {
      setControlledState(controlledState);
    }
  }, [controlledState]);

  return [_controlledState, setState];
};

export default useControlledState;
