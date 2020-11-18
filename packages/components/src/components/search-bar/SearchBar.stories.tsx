import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SearchBar from './index';
import { SearchBarProps } from './interfaces';
import './style';

export default {
  title: 'Components/Functional/SearchBar',
  component: SearchBar,
} as Meta;

const Template: Story<SearchBarProps> = (args) => {
  const [value, setValue] = React.useState('');

  return (
    <SearchBar
      value={args.value ? args.value : value}
      onChange={args.onChange ? args.onChange : setValue}
      id={args.id ? args.id : 'demo'}
      {...args}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  size: 'middle',
  showStorage: true,
  showClear: true,
  allowClearStorage: true,
};
