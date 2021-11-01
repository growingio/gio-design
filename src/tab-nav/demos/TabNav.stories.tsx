import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './TabNavPage';
import { TabNavProps } from '../interface';
import TabNav from '../index';
import '../style';
import '../style/demo.stories.less';

export default {
  title: 'Components/TabNav',
  component: TabNav,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const { Item } = TabNav;

const renderItem = () => (
  <>
    <Item>我的</Item>
    <Item>全部</Item>
    <Item>共享</Item>
    <Item disabled>预置</Item>
  </>
);

export const Block: Story<TabNavProps> = (args) => (
  <div className="tabNav-display">
    <TabNav size="large" {...args}>
      {renderItem()}
    </TabNav>
    <hr />
    <TabNav size="middle" {...args}>
      {renderItem()}
    </TabNav>
    <hr />
    <TabNav size="small" {...args}>
      {renderItem()}
    </TabNav>
    <hr />
    <TabNav size="xs" {...args}>
      <Item>次</Item>
      <Item>人</Item>
      <Item>人均</Item>
      <Item disabled>人次</Item>
    </TabNav>
  </div>
);

Block.args = {
  type: 'block',
};

export const Line: Story<TabNavProps> = (args) => (
  <div className="tabNav-display">
    <TabNav size="large" {...args}>
      {renderItem()}
    </TabNav>
    <hr />
    <TabNav size="middle" {...args}>
      {renderItem()}
    </TabNav>
    <hr />
    <TabNav size="small" {...args}>
      {renderItem()}
    </TabNav>
    <hr />
    <TabNav size="xs" {...args}>
      <Item>次</Item>
      <Item>人</Item>
      <Item>人均</Item>
      <Item disabled>人次</Item>
    </TabNav>
  </div>
);

Line.args = {
  type: 'line',
};
