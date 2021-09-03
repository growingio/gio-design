import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import EmptyPage from './EmptyPage';
import Empty, { EmptyProps } from '../index';
import DashboardImage from './DashboardImage';

import '../style';

export default {
  title: 'Data Display/Empty',
  component: Empty,
  parameters: {
    docs: {
      page: EmptyPage,
    },
  },
} as Meta;

const Template: Story<EmptyProps> = (args) => <Empty {...args} />;

export const Customize = Template.bind({});
Customize.args = {
  image: <DashboardImage />,
  description: '你还没有属于自己的看板，快去新建一个吧',
  cta: {
    text: '新建看板',
    onClick: action('Call to Action'),
  },
};

export const NoData = () => <Empty description="暂无数据" />;

export const NoResult = () => <Empty image="no-result" description="没有找到相关结果" />;
