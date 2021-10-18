import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { FilterOutlined } from '@gio-design/icons';
import Docs from './LinkPage';
import Link from '../index';
import { ILinkProps } from '../interface';
// import '../style';

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

const Template: Story<ILinkProps> = (args) => (
  <div>
    <Link {...args}>GrowingIO</Link>
    <Link {...args} to="https://growingio.com">
      GrowingIO
    </Link>
    <Link {...args} icon={<FilterOutlined />} to="https://growingio.com" onClick={() => window.alert('被点击')}>
      GrowingIO
    </Link>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const CustomComponent = Template.bind({});
CustomComponent.args = {
  component: 'span',
};
