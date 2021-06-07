import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Docs from './List.mdx';
import List from '.';
import { ListProps } from './interfaces';
import { properties } from './__tests__/data';
import './style';

export default {
  title: 'Functional Components/List',
  component: List,
  subcomponents: {
    Divider: List.Divider,
    Item: List.Item,
    ItemGroup: List.ItemGroup,
    ItemSubgroup: List.ItemSubgroup,
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Wrapper = ({ children }: { children?: React.ReactNode }) => (
  <div
    style={{
      width: 360,
      border: '0.5px dashed #DCDFED',
      padding: 8,
      borderRadius: 4,
    }}
  >
    {children}
  </div>
);
const Template: Story<ListProps> = (args) => (
  <Wrapper>
    <List {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <List.ItemGroup title="Group 1">
      <List.Item>first</List.Item>
      <List.Item disabled>second</List.Item>
      <List.Divider />
    </List.ItemGroup>
  ),
};

export const Items = Template.bind({});
Items.args = {
  items: properties,
  expandable: true,
};

export const Empty = Template.bind({});
Empty.args = {};

export const Ellipsis = () => (
  <Wrapper>
    <List>
      <List.Item>文本</List.Item>
      <List.Item>文本</List.Item>
      <List.Item>超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本</List.Item>
      <List.Item>文本</List.Item>
      <List.Item>文本</List.Item>
    </List>
  </Wrapper>
);
