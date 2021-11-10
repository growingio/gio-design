import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { PlusCircleFilled } from '@gio-design/icons';
import Space, { SpaceProps } from '../index';
import Docs from './SpacePage';
import { Button } from '../../..';

export default {
  title: 'legacy/Space',
  component: Space,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<SpaceProps> = (args) => (
  <Space {...args}>
    <Button>主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="secondary" prefix={<PlusCircleFilled />}>
      次要按钮
    </Button>
  </Space>
);

export const Default = Template.bind({});
