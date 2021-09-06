import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ListPage from './ListPage';
import List from '../List';
import { ListProps } from '../interfaces';
import Typography from '../../typograhy';

import '../style';
import '../../typograhy/style';
import './List.stories.less';

const defaultItems = [
  {
    key: `item-1`,
    children: `Item 1`,
  },
  {
    key: `item-2`,
    children: `Item 2`,
  },
  {
    key: 'group-3',
    title: 'Group 3',
    items: [
      {
        key: `group-3-item-1`,
        children: `Item 1`,
      },
      {
        key: `group-3-item-2`,
        children: `Item 2`,
      },
    ],
  },
  {
    key: 'group-2',
    title: 'Group 2',
    items: Array.from({ length: 15 }, (_, index) => index).map((i) => ({
      key: `group-2-item-${i}`,
      children: `Item ${i}`,
    })),
  },
];
const Wrapper = ({ children }: { children?: React.ReactNode }) => <div className="demo-list-wrapper">{children}</div>;
const Template: Story<ListProps> = (args) => (
  <Wrapper>
    <List items={defaultItems} {...args} />
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
        key: `group-1-subgroup-${i}-item-${j}`,
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

export const JSX = Template.bind({});
JSX.args = {
  items: undefined,
  children: (
    <List.ItemGroup title="Group 1">
      <List.Item>first</List.Item>
      <List.Item>second</List.Item>
      <List.Divider />
      <List.ItemSubgroup title="Subgroup 1-1">
        <List.Item>third</List.Item>
        <List.Item>forth</List.Item>
      </List.ItemSubgroup>
    </List.ItemGroup>
  ),
};

export const Ellipsis = () => (
  <Wrapper>
    <List>
      <List.Item>文本</List.Item>
      <List.Item>文本</List.Item>
      <List.Item>
        <Typography.Text>超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本</Typography.Text>
      </List.Item>
      <List.Item>文本</List.Item>
      <List.Item>文本</List.Item>
    </List>
  </Wrapper>
);

export default {
  title: 'Data Display/List',
  component: List,
  subcomponents: {
    Divider: List.Divider,
    Item: List.Item,
    ItemGroup: List.ItemGroup,
    ItemSubgroup: List.ItemSubgroup,
  },
  parameters: {
    docs: {
      page: ListPage,
    },
  },
} as Meta;
