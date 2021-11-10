import { isEmpty } from 'lodash';
import React from 'react';
import Input from '../input';
import { TriggerProps } from './interfance';

const Trigger: React.FC<TriggerProps> = (props) => {
  const { value, placeholder, getOptionByValue, separator, ...rest } = props;
  const name = value
    ?.split('.')
    ?.map((val) => getOptionByValue?.(val)?.label)
    ?.join(separator);
  return <Input.Button placeholder={placeholder} value={isEmpty(value) ? undefined : name?.toString()} {...rest} />;
};

export default Trigger;
