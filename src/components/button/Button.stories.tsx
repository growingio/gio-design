import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from './index';
import { ButtonProps } from './interfaces';
import './style';

export default {
  title: 'Components/Basic/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};
