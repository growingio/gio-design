import React, { useState } from 'react';
import useControlledState from '../../hooks/useControlledState';
import Docs from './useControl.mdx';

interface IProps {
  value?: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
}

export const Counter = ({ value, onChange, defaultValue }: IProps) => {
  const [state, setState] = useControlledState(value, defaultValue, onChange);
  return (
    <>
      <button type="button" onClick={() => setState(state - 1)}>
        -
      </button>
      <span>{state}</span>
      <button type="button" onClick={() => setState(state + 1)}>
        +
      </button>
    </>
  );
};

export const UnControlledDemo = () => <Counter defaultValue={0} />;

export const ControlledDemo = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <input type="number" onChange={(e) => setValue(parseInt(e.target.value, 10))} value={value} />
      <Counter value={value} onChange={setValue} />
    </div>
  );
};

export const WatchUnControlled = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <input type="number" onChange={(e) => setValue(parseInt(e.target.value, 10))} value={value} />
      <Counter defaultValue={0} onChange={setValue} />
    </div>
  );
};

export const IgnoreControlledChange = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <input type="number" onChange={(e) => setValue(parseInt(e.target.value, 10))} value={value} />
      <Counter value={value} />
    </div>
  );
};

export default {
  title: 'Hooks/useContrlledState',
  component: Counter,
  parameters: {
    docs: {
      page: Docs,
    },
  },
};
