import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './Input.mdx';
import { InputProps, InputNumberProps, TextAreaProps } from './interfaces';
import Input from './index';
import InputNumber from './InputNumber';
import Password from './Password';
import TextArea from './TextArea';
// import './style';

export default {
  title: 'Legacy/Input',
  component: Input,
  subcomponents: { InputNumber, Password, TextArea }, // 子组件
  decorators: [withDesign],
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A266',
      allowFullscreen: true,
    },
  },
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

const InputNumberTemplate = (args: InputNumberProps) => {
  const [inputValue, setInputValue] = React.useState<any>(0);
  return <Input.InputNumber {...args} value={inputValue} onChange={setInputValue} />;
};

export const InputNumberCase: Story<InputNumberProps> = (args) => InputNumberTemplate(args);

const PasswordTemplate = (args: InputProps) => {
  const [inputValue, setInputValue] = React.useState('x');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return <Input.Password {...args} value={inputValue} onChange={onChange} />;
};
export const PasswordCase: Story<InputProps> = (args) => PasswordTemplate(args);

const TextAreaTemplate = (args: TextAreaProps) => {
  const [inputValue, setInputValue] = React.useState('hello');
  return <Input.TextArea {...args} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />;
};
export const TextAreaCase: Story<TextAreaProps> = (args) => TextAreaTemplate(args);
