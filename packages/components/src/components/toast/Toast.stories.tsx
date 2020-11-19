import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from '../button';

import Toast, { ArgsProps } from './index';
import './style';

export default {
  title: 'Components/Basic/Toast',
} as Meta;

const SuccessMessage = () => (
  <span>
    操作成功！
    <a style={{ color: '#3867f4', textDecoration: 'underline' }} href="https://www.growingio.com">
      去看看
    </a>
  </span>
);

export const Default: Story<ArgsProps> = (args) => {
  const handleSuccess = () => {
    Toast.success(args);
  };
  return (
    <div>
      <Button onClick={handleSuccess}>成功</Button>
    </div>
  );
};

Default.args = {
  content: <SuccessMessage />,
};
