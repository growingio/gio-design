import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Button from '../../button';
import Docs from './ToastPage';
import Toast from '../index';
import { ArgsProps } from '../interface';
import '../style';
import { Link } from '../..';

export default {
  title: 'upgraded/Toast',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45841',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Default: Story<ArgsProps> = (args) => {
  const handleSuccess = () => {
    Toast.success(args);
  };
  const handleFail = () => {
    Toast.error(args);
  };
  const handleWarn = () => {
    Toast.warning(args);
  };
  const handleInfo = () => {
    Toast.info(args);
  };
  return (
    <div>
      <Button data-testid="toast" style={{ marginRight: 10 }} onClick={handleSuccess}>
        成功
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleFail}>
        失败
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleWarn}>
        警告
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleInfo}>
        提示
      </Button>
    </div>
  );
};
Default.args = {
  content: '提示文案！',
  duration: 5,
  key: '',
};

export const NextStep: Story<ArgsProps> = (args) => {
  const handleSuccess = () => {
    Toast.success(args);
  };
  const handleInfo = () => {
    Toast.info(args);
  };
  const handleFail = () => {
    Toast.error(args);
  };
  const handleWarn = () => {
    Toast.warning(args);
  };
  return (
    <div>
      <Button style={{ marginRight: 10 }} onClick={handleSuccess}>
        成功
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleFail}>
        失败
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleWarn}>
        警告
      </Button>
      <Button style={{ marginRight: 10 }} onClick={handleInfo}>
        提示
      </Button>
    </div>
  );
};
NextStep.args = {
  content: (
    <span>
      文案
      <Link style={{ color: '#3867f4', marginLeft: '8px' }} href="https://www.growingio.com">
        去看看
      </Link>
    </span>
  ),
  duration: 5,
  key: '',
};
