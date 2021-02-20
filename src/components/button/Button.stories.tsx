import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FilterOutlined, PlusCircleFilled } from '@gio-design/icons';
import { withDesign } from 'storybook-addon-designs';
import Docs from './Button.mdx';
import Button from './index';
import { ButtonProps } from './interfaces';
import './style';

export default {
  title: 'Basic Components/Button',
  component: Button,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1%3A1097',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
  args: {
    type: 'primary',
    size: 'middle',
  },
} as Meta;

const Wrapper = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return <section style={{ backgroundColor: '#cecece80', boxSizing: 'border-box', padding: 30 }}>{children}</section>;
};

const Template: Story<ButtonProps> = (args) => (
  <Wrapper>
    <Button {...args}>按钮</Button>
    <Button {...args} disabled>
      禁用
    </Button>
    <Button {...args} loading>
      加载中
    </Button>
    <Button {...args} icon={<PlusCircleFilled />}>
      图标
    </Button>
    <Button {...args} ghost>
      幽灵按钮
    </Button>
  </Wrapper>
);

const IconTemplate: Story<ButtonProps> = (args) => (
  <Wrapper>
    <Button {...args} icon={<FilterOutlined />} />
    <Button {...args} disabled icon={<FilterOutlined />} />
    <Button {...args} loading icon={<FilterOutlined />} />
    <Button {...args} ghost icon={<FilterOutlined />} />
  </Wrapper>
);

export const Default = Template.bind({});
export const IconButton = IconTemplate.bind({});
export const TextButton = Template.bind({});
export const BlockButton = Template.bind({});
Default.args = {
  style: {
    margin: '0 20px 0 0',
  },
};

IconButton.args = {
  mini: false,
  style: {
    margin: '0 20px 0 0',
  },
};
IconButton.parameters = {
  design: {
    url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=151%3A33',
  },
};

TextButton.args = {
  type: 'text',
  style: {
    margin: '0 20px 0 0',
  },
};
TextButton.parameters = {
  design: {
    url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1%3A1280',
  },
};

BlockButton.args = {
  block: true,
  style: {
    margin: '0 0 20px 0',
  },
};
