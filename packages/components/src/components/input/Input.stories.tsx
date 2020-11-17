import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { InputProps, InputNumberProps, TextAreaProps } from './interfaces';
import Input from './index';
import InputNumber from './InputNumber';
import Password from './Password';
import TextArea from './TextArea';
import './style';

export default {
  title: 'Components/Basic/Input',
  component: Input,
  subcomponents: { InputNumber, Password, TextArea },
} as Meta;

export const Default: Story<InputProps> = (args) => {
  const [inputValue, setInputValue] = React.useState('333');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return <Input {...args} onChange={onChange} value={inputValue} />;
};
Default.args = {
  placeholder: '请输入…',
};

export const inputNumber: Story<InputNumberProps> = (args) => {
  const [inputValue, setInputValue] = React.useState('0');
  return <Input.InputNumber {...args} value={inputValue} onChange={setInputValue} />;
};

export const password: Story<InputProps> = (args) => {
  const [inputValue, setInputValue] = React.useState('x');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return <Input.Password {...args} value={inputValue} onChange={onChange} />;
};

export const textArea: Story<TextAreaProps> = (args) => {
  const [inputValue, setInputValue] = React.useState('hello');
  return <Input.TextArea {...args} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />;
};
