import { useState, useMemo } from 'react';

type IState = string | number | boolean | undefined;

export interface Actions<T = IState> {
  setLeft: () => void;
  setRight: () => void;
  toggle: (value?: T) => void;
}

function useToggle<D extends IState = IState, R extends IState = IState>(
  defaultValue: D = false as D,
  reverseValue?: R
) {
  const [state, setState] = useState<D | R>(defaultValue);
  const resetValue = useMemo(() => (reverseValue === undefined ? !defaultValue : reverseValue) as D | R, [
    reverseValue,
  ]);

  const actions = useMemo(() => {
    const toggle = (value?: D | R) => {
      if (value !== undefined) {
        setState(value);
        return;
      }
      setState((s) => (s === defaultValue ? resetValue : defaultValue));
    };
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(resetValue);
    return {
      toggle,
      setLeft,
      setRight,
    };
  }, [setState]);
  return [state, actions];
}

export default useToggle;
