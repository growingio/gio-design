import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Alert from './index';
import { AlertProps } from './interfaces';
import './style';

export default {
  title: 'Components/Basic/Alert',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'success',
  message: 'Success Alert',
};
