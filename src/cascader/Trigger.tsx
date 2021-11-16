import React from 'react';
import Input from '../input';
import { TriggerProps } from './interfance';

const Trigger: React.FC<TriggerProps> = (props) => {
  const { value, placeholder, ...rest } = props;
  return <Input.Button placeholder={placeholder} value={value} {...rest} />;
};

export default Trigger;
