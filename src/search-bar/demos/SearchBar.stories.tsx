import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './SearchBarPage';
import SearchBar from '../index';
import { SearchBarProps } from '../interfaces';
import '../style';

export default {
  title: 'Data Input/SearchBar',
  component: SearchBar,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A6824',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<SearchBarProps> = (args) => {
  const [currentValue, setCurrentValue] = React.useState('');
  const { id, value, onChange } = args;
  return (
    <SearchBar
      style={{ width: '300px' }}
      {...args}
      value={value || currentValue}
      onChange={onChange || setCurrentValue}
      id={id || 'demo'}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  size: 'middle',
  placeholder: '请搜索...',
  storageNum: 5,
  disabled: false,
  showStorage: true,
  showClear: true,
  allowClearStorage: true,
};
