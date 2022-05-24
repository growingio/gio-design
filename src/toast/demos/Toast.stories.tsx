import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { PlusCircleFilled } from '@gio-design/icons';
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
  return (
    <Button data-testid="toast" style={{ marginRight: 10 }} onClick={handleSuccess}>
      成功
    </Button>
  );
};
Default.args = {
  content: '提示文案！',
  duration: 5,
  key: '',
  onClose: () => console.log('onClose'),
  icon: null,
};

export const Type: Story<ArgsProps> = () => {
  const handleSuccess = () => {
    Toast.success({
      content: '提示文案！',
      duration: 5,
      key: '',
      onClose: () => console.log('onClose'),
      icon: null,
    });
  };
  const handleFail = () => {
    Toast.error({
      content: '提示文案！',
      duration: 5,
      key: '',
      onClose: () => console.log('onClose'),
      icon: null,
    });
  };
  const handleWarn = () => {
    Toast.warning({
      content: '提示文案！',
      duration: 5,
      key: '',
      onClose: () => console.log('onClose'),
      icon: null,
    });
  };
  const handleInfo = () => {
    Toast.info({
      content: '提示文案！',
      duration: 5,
      key: '',
      onClose: () => console.log('onClose'),
      icon: null,
    });
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

export const NextStep: Story<ArgsProps> = () => {
  const handleSuccess = () => {
    Toast.success({
      content: (
        <span>
          文案
          <Link style={{ color: '#3867f4', marginLeft: '8px' }} href="https://www.growingio.com">
            去看看
          </Link>
        </span>
      ),
      duration: 5,
    });
  };

  return (
    <Button style={{ marginRight: 10 }} onClick={handleSuccess}>
      content包含跳转的案例
    </Button>
  );
};

export const Content = () => {
  const handleSuccess = () => {
    Toast.success({
      content: 'content layout',
    });
  };
  return (
    <Button style={{ marginRight: 10 }} onClick={handleSuccess}>
      content
    </Button>
  );
};

export const Duration = () => {
  const handleSuccess = () => {
    Toast.success({
      content: 'content duration 5s',
      duration: 5,
    });
  };
  return (
    <Button style={{ marginRight: 10 }} onClick={handleSuccess}>
      Duration 5s
    </Button>
  );
};

export const OnClose = () => {
  const handleSuccess = () => {
    Toast.success({
      content: 'console print onClose',
      onClose: () => console.log('onClose'),
    });
  };
  return (
    <Button style={{ marginRight: 10 }} onClick={handleSuccess}>
      OnClose
    </Button>
  );
};

export const Icon = () => {
  const handleSuccess = () => {
    Toast.success({
      content: 'custom icon',
      icon: <PlusCircleFilled />,
    });
  };
  return (
    <Button style={{ marginRight: 10 }} onClick={handleSuccess}>
      Icon
    </Button>
  );
};
