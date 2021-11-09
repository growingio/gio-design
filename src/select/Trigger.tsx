import { isNil } from 'lodash';
import React from 'react';
import Input from '../input';
import { TriggerProps } from './interfance';

const Trigger: React.FC<TriggerProps> = (props) => {
  const { value, ...rest } = props;
  return <Input.Button value={isNil(value) ? undefined : value.toString()} {...rest} />;
};

export default Trigger;
