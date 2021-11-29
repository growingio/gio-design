import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ListSelector from '../ListSelector';
import ListSelectorPage from './ListSelectorPage';
import { ListSelectorProps } from '../interfaces';
import { Basic as BasicList, Groups as GroupList } from '../../list-picker/demos/ListPicker.stories';

import '../style';

const Template: Story<ListSelectorProps> = (args) => (
  <div style={{ width: 240 }}>
    <ListSelector {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  items: BasicList.args.items,
};

export const Group = Template.bind({});
Group.args = {
  groups: GroupList.args.groups,
};

export const Empty = Template.bind({});
Empty.args = {};

export default {
  title: 'Legacy/ListSelector',
  component: ListSelector,
  parameters: {
    docs: {
      page: ListSelectorPage,
    },
  },
} as Meta;
