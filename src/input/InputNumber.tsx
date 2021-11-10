import React from 'react';
import Input from './Input';
import { InputNumberProps } from './interface';

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => (
  <Input {...props} type="number" ref={ref} />
));

export default InputNumber;
