import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined } from '@gio-design/icons';
import { LinkProps } from '../interface';
import Link from '../Link';
import '../style';

export default {
  title: 'Upgraded/Link',
  component: Link,
} as Meta;

const Template: Story<LinkProps> = (args) => (
  <Link prefix={<PlusOutlined />} {...args}>
    Test Link
  </Link>
);

export const Default = Template.bind({});
Default.args = {
  href: 'https://www.growingio.com',
};
