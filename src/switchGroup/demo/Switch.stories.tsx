import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { ListOutlined } from '@gio-design/icons';
import Switch from '../index';
import { ISwitchGroupProps } from '../interface';
import Docs from './SwitchPage';
import '../style';

export default {
  title: 'Upgraded/Switch',
  component: Switch,
  // subcomponents: { SwitchItem },
  decorators: [withDesign],
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const TemplateIconGroup: Story<ISwitchGroupProps> = (args) => (
  <>
    <Switch {...args} />
  </>
);
export const IconGroup = TemplateIconGroup.bind({});
IconGroup.args = {
  disabled: false,
  defaultValue: 'OptionA',
  size: 'small',
  options: [
    {
      label: <ListOutlined />,
      value: 'OptionA',
    },
    {
      label: <ListOutlined />,
      value: 'OptionB',
    },
    {
      label: <ListOutlined />,
      value: 'OptionCDisabled',
      disabled: true,
    },
    {
      label: <ListOutlined />,
      value: 'OptionD',
    },
    {
      label: <ListOutlined />,
      value: 'OptionE',
    },
    {
      label: <ListOutlined />,
      value: 'OptionF',
    },
  ],
};

const TemplateGroup: Story<ISwitchGroupProps> = (args) => (
  <>
    <Switch {...args} />
  </>
);
export const Group = TemplateGroup.bind({});
Group.args = {
  disabled: false,
  defaultValue: 'OptionA',
  size: 'normal',
  options: [
    {
      label: 'OptionA',
      value: 'OptionA',
    },
    {
      label: 'OptionB',
      value: 'OptionB',
    },
    {
      label: 'OptionCDisabled',
      value: 'OptionCDisabled',
      disabled: true,
    },
    {
      label: 'OptionD',
      value: 'OptionD',
    },
    {
      label: 'OptionE',
      value: 'OptionE',
    },
    {
      label: 'OptionF',
      value: 'OptionF',
    },
  ],
};
