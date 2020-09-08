import { useState, useEffect } from 'react';

const useControlledState = <T>(controlledState: T | undefined, empty: T): [T, (_state: T) => void] => {
  const [_controlledState, setControlledState] = useState<T>(controlledState === undefined ? empty : controlledState);

  useEffect(() => {
    if (controlledState !== undefined) {
      setControlledState(controlledState);
    }
  }, [controlledState]);

  const setState = (_state: T) => {
    if (controlledState === undefined) {
      setControlledState(_state);
    }
  };
  return [_controlledState, setState];
};

export default useControlledState;
