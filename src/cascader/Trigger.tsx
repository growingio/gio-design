import React from 'react';
import Input from '../input';
import WithRef from '../utils/withRef';
import { TriggerProps } from './interfance';

const Trigger: React.ForwardRefRenderFunction<HTMLInputElement, TriggerProps> = (props, ref) => {
  const { value, placeholder, ...rest } = props;
  return <Input.Button placeholder={placeholder} ref={ref} value={value} {...rest} />;
};

export default WithRef(Trigger);
