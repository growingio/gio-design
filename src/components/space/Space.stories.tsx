import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PlusCircleFilled } from '@gio-design/icons';
import Space, { SpaceProps } from './index';
import { Button } from '../..';

export default {
    title: 'Components/Basic/Space',
    component: Space,
} as Meta;

const Template : Story<SpaceProps> = (args) => (
  <Space {...args}>
    <Button>主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="secondary" icon={<PlusCircleFilled />}>次要按钮</Button>
  </Space>
);

export const Default = Template.bind({});
Default.args = {}

