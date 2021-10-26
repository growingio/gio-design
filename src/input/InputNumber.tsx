import React from 'react';
import Input from './Input';
import { InputNumberProps } from './interface';

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  const { placeholder = '请输入数字...' } = props;
  return <Input {...props} type="number" placeholder={placeholder} ref={ref} />;
});

export default InputNumber;
