import React from 'react';
import Input from '../input';
import WithRef from '../utils/withRef';
import { TriggerProps } from './interfance';

const Trigger: React.ForwardRefRenderFunction<HTMLInputElement, TriggerProps> = (props, ref) => {
  const { value, placeholder, visible, ...rest } = props;
  return <Input.Button placeholder={placeholder} active={visible} ref={ref} value={value?.toString()} {...rest} />;
};

export default WithRef(Trigger);
