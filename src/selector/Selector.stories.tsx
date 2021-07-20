import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { CalendarOutlined, CloseCircleFilled, DownFilled, UpFilled, FolderOutlined } from '@gio-design/icons';
import Docs from './Selector.mdx';
import Button from '../components/button';
import Toast from '../components/toast';
import Selector, { SelectorProps } from '.';
import InputTrigger from './InputTrigger';
import { InputTriggerProps } from './interfaces';

import './style';

export default {
  title: 'Selectors/Selector',
  component: Selector,
  subcomponents: { InputTrigger },
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A7495',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const overlay = <div>Fill with picker</div>;
const itemRender = () => 'Content';
const Template: Story<SelectorProps> = (args) => <Selector overlay={overlay} {...args} />;

export const Content = Template.bind({});
Content.args = {
  itemRender,
  onClear: () => {
    Toast.info('Clear item!');
  },
};

export const IconContent = Template.bind({});
IconContent.args = {
  itemRender: () => (
    <span>
      <FolderOutlined size="14px" />
      <span style={{ marginLeft: 4 }}>Content</span>
    </span>
  ),
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'please select',
};

export const CustomizeSuffix = Template.bind({});
CustomizeSuffix.args = {
  itemRender,
  suffix: <CalendarOutlined />,
};

export const CustomizeTrigger = Template.bind({});
CustomizeTrigger.args = {
  trigger: (
    <Button type="secondary">
      Select <DownFilled size="14px" />
    </Button>
  ),
};

const defaultPlaceholder = 'Select content';
const undefinedItem = (): React.ReactNode => undefined;
const defautItem = () => 'Content';
const InputTriggerTemplate: Story<InputTriggerProps> = (args) => (
  <div>
    <InputTrigger {...args} itemRender={undefinedItem} suffix={<DownFilled />} />
    <br />
    <InputTrigger {...args} actived itemRender={undefinedItem} suffix={<UpFilled />} />
    <br />
    <InputTrigger {...args} disabled itemRender={undefinedItem} suffix={<DownFilled />} />
    <br />
    <InputTrigger {...args} itemRender={defautItem} suffix={<CloseCircleFilled />} />
    <br />
    <InputTrigger {...args} itemRender={defautItem} suffix={<DownFilled />} fitContent />
  </div>
);

export const InputTriggerStyle = InputTriggerTemplate.bind({});
InputTriggerStyle.args = {
  placeholder: defaultPlaceholder,
};

export const InputTriggerBorderless = InputTriggerTemplate.bind({});
InputTriggerBorderless.args = {
  placeholder: defaultPlaceholder,
  borderless: true,
};
