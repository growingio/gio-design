import { isNil } from 'lodash';
import React from 'react';
import Input from '../input';
import WithRef from '../utils/withRef';
import { TriggerProps } from './interface';

const Trigger: React.ForwardRefRenderFunction<HTMLInputElement, TriggerProps> = (props, ref) => {
  const { value, ...rest } = props;
  return <Input.Button ref={ref} value={isNil(value) ? undefined : value.toString()} {...rest} />;
};

export default WithRef(Trigger);
