import React from 'react';
import Input from '../input';
import WithRef from '../utils/withRef';
import { TriggerProps } from './interfance';

const Trigger: React.ForwardRefRenderFunction<HTMLInputElement, TriggerProps> = (props, ref) => {
  const { value, placeholder, onClear, ...rest } = props;
  const handleClear = (e: React.MouseEvent<Element, MouseEvent>) => {
    onClear?.(e);
    e.stopPropagation();
  };
  return (
    <Input.Button ref={ref} placeholder={placeholder} value={(value as string) ?? ''} onClear={handleClear} {...rest} />
  );
};

export default WithRef(Trigger);
