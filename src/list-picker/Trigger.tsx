import React from 'react';
import Input from '../input';
import { TriggerProps } from './interfance';

const Trigger: React.FC<TriggerProps> = (props) => {
  const { value, placeholder, onClear, ...rest } = props;
  const handleClear = (e: React.MouseEvent<Element, MouseEvent>) => {
    onClear?.(e);
    e.stopPropagation();
  };
  return <Input.Button placeholder={placeholder} value={(value as string) ?? ''} onClear={handleClear} {...rest} />;
};

export default Trigger;
