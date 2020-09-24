import { useState, useEffect } from 'react';

const useControlledState = <T>(
  controlledState: T | (() => T) | undefined,
  empty: T
): [T, (_state: T | (() => T), force?: boolean) => void] => {
  const [_controlledState, setControlledState] = useState<T>(controlledState === undefined ? empty : controlledState);

  useEffect(() => {
    if (controlledState !== undefined) {
      setControlledState(controlledState);
    }
  }, [controlledState]);

  const setState = (_state: T | (() => T), force = false) => {
    if (controlledState === undefined || force) {
      setControlledState(_state);
    }
  };
  return [_controlledState, setState];
};

export default useControlledState;
