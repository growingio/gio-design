import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './Link.mdx';
import Link from './index';
import { ILinkProps } from './interface';
import './style';

export default {
  title: 'Basic Components/Link',
  component: Link,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1%3A1310',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<ILinkProps> = (args) => <Link {...args}>GrowingIO</Link>;

export const Default = Template.bind({});
Default.args = {
  to: 'https://www.growingio.com',
};

export const Disabled = Template.bind({});
Disabled.args = {
  to: 'https://www.growingio.com',
  disabled: true,
};
export const CustomComponent = Template.bind({});
CustomComponent.args = {
  to: 'https://www.growingio.com',
  component: 'span',
};
