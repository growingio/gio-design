import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Popconfirm, { PopconfirmProps } from './index'
import './style'
import { Button } from '../..';

export default {
    title: 'Components/Functional/Popconfirm',
    component: Popconfirm,
} as Meta;

const Template : Story<PopconfirmProps> = (args) => (
  <Popconfirm {...args}>
    <Button>Click Me</Button>
  </Popconfirm>
);
export const Default = Template.bind({});
Default.args = {
    title: '确定要删除。。。。吗？',
    desc: '删除物品属性后，相关数据将停止计算，历史数据保留。',
    placement: 'bottom',
}