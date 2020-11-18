import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SearchBar from './index';
import { SearchBarProps } from './interfaces';
import './style';

export default {
  title: 'Components/Functional/SearchBar',
  component: SearchBar,
} as Meta;

export const Default: Story<SearchBarProps> = (args) => {
  const [value, setValue] = React.useState('');

  return <SearchBar value={value} onChange={setValue} id="demo1" {...args} />;
};

Default.args = {
  size: 'middle',
  showStorage: true,
  showClear: true,
  allowClearStorage: true,
};
