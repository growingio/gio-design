import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Avatar from './index';
import { AvatarProps } from './interfaces';
import './style';

export default {
  title: 'Components/Functional/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'li',
};
