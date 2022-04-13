import { FunnelAnalysisOutlined, UserOutlined } from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useRef, useState } from 'react';
import { InputProps } from '../..';
import { Button, Tooltip } from '../../..';
import Input from '../../Input';
import InputPage from './InputPage';

export default {
  title: 'Upgraded/Input/Input',
  component: Input,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42547',
      allowFullscreen: true,
    },
    docs: {
      page: InputPage,
    },
  },
} as Meta<InputProps>;

export const Default: Story<InputProps> = (args) => <Input {...args} />;
Default.args = {
  placeholder: 'Enter or search content',
  onChange: action('InputChange'),
  onBlur: action('InputBlur'),
  onFocus: action('InputFocus'),
  onPressEnter: action('InputPressEnter'),
  'aria-label': 'Default Input',
  size: 'normal',
  autoFocus: false,
  autoComplete: 'off',
  disabled: false,
};

export const IconsInput = () => (
  <Input placeholder="Enter or search content" prefix={<UserOutlined />} suffix={<FunnelAnalysisOutlined />} />
);

export const InputRef = () => {
  const inputRef = useRef<HTMLInputElement>();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 400 }}>
      <Input inputRef={inputRef} placeholder="Enter or search content" />
      <Tooltip title="Click here to focus input" trigger="hover">
        <Button
          type="secondary"
          style={{ margin: '16px 0 0' }}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          Focus Input
        </Button>
      </Tooltip>
      <Tooltip title="Click here to clear input text" trigger="hover">
        <Button
          type="secondary"
          style={{ margin: '16px 0 0' }}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = '';
            }
          }}
        >
          Clear Input Text
        </Button>
      </Tooltip>
    </div>
  );
};

export const InputSize = () => (
  <>
    <Input placeholder="Normal Size" size="normal" style={{ marginRight: 8 }} />
    <Input placeholder="Small Size" size="small" />
  </>
);

export const EnterEvent = () => {
  const [text, setText] = useState('');
  return (
    <>
      <Input
        placeholder="Enter or search content"
        onPressEnter={(event) => {
          setText(event.currentTarget.value);
        }}
      />
      <br />
      {text && <code style={{ display: 'inline-block', margin: '8px 0 0' }}>{text}</code>}
    </>
  );
};
