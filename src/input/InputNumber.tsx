import React from 'react';
import Input from './Input';
import { InputNumberProps } from './interface';

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => (
  <Input data-testid="input-number" {...props} type="number" ref={ref} />
));

InputNumber.displayName = 'InputNumber';

export default InputNumber;
