import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ListPickerPage from './ListPickerPage';
import ListPicker from '../ListPicker';
import { ListPickerProps } from '../interfaces';
import Typography from '../../typograhy';

import '../style';
import '../../typograhy/style';
import './ListPicker.stories.less';

const defaultItems = [
  {
    value: `item-1`,
    children: `Item 1`,
  },
  {
    value: `item-2`,
    children: `Item 2`,
  },
  {
    key: 'group-3',
    title: 'Group 3',
    items: [
      {
        value: `group-3-item-1`,
        children: `Item 1`,
      },
      {
        value: `group-3-item-2`,
        children: `Item 2`,
      },
    ],
  },
  {
    key: 'group-2',
    title: 'Group 2',
    items: Array.from({ length: 15 }, (_, index) => index).map((i) => ({
      value: `group-2-item-${i}`,
      children: `Item ${i}`,
    })),
  },
];
const Wrapper = ({ children }: { children?: React.ReactNode }) => <div className="demo-list-wrapper">{children}</div>;
const Template: Story<ListPickerProps> = (args) => (
  <Wrapper>
    <ListPicker items={defaultItems} {...args} />
  </Wrapper>
);

export const Basic = Template.bind({});
Basic.args = {};

const itemsWithSubgroup = [
  ...defaultItems,
  {
    key: 'group-1',
    title: 'Group 1',
    subgroups: Array.from({ length: 5 }, (_, index) => index).map((i) => ({
      key: `group-1-subgroup-${i}`,
      title: `Subgroup ${i}`,
      items: Array.from({ length: 20 }, (_, index) => index).map((j) => ({
        value: `group-1-subgroup-${i}-item-${j}`,
        children: `Item ${j}`,
      })),
    })),
  },
];
export const Groups = Template.bind({});
Groups.args = {
  items: itemsWithSubgroup,
  expandable: true,
};

export const Empty = Template.bind({});
Empty.args = {
  items: undefined,
};

export const Size = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <Wrapper>
      <ListPicker items={defaultItems} />
    </Wrapper>
    <Wrapper>
      <ListPicker items={defaultItems} size="small" />
    </Wrapper>
  </div>
);

export const JSX = Template.bind({});
JSX.args = {
  items: undefined,
  children: (
    <ListPicker.Group title="Group 1">
      <ListPicker.Item value="first">first</ListPicker.Item>
      <ListPicker.Item value="second">second</ListPicker.Item>
      <ListPicker.Divider />
      <ListPicker.Subgroup title="Subgroup 1-1">
        <ListPicker.Item value="third">third</ListPicker.Item>
        <ListPicker.Item value="forth">forth</ListPicker.Item>
      </ListPicker.Subgroup>
    </ListPicker.Group>
  ),
};

export const Ellipsis = () => (
  <Wrapper>
    <ListPicker>
      <ListPicker.Item value="1">文本</ListPicker.Item>
      <ListPicker.Item value="2">文本</ListPicker.Item>
      <ListPicker.Item value="3">
        <Typography.Text>超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本</Typography.Text>
      </ListPicker.Item>
      <ListPicker.Item value="4">文本</ListPicker.Item>
      <ListPicker.Item value="5">文本</ListPicker.Item>
    </ListPicker>
  </Wrapper>
);

export default {
  title: 'Internal Components/ListPicker',
  component: ListPicker,
  subcomponents: {
    Divider: ListPicker.Divider,
    Item: ListPicker.Item,
    Group: ListPicker.Group,
    Subgroup: ListPicker.Subgroup,
  },
  parameters: {
    docs: {
      page: ListPickerPage,
    },
  },
} as Meta;
