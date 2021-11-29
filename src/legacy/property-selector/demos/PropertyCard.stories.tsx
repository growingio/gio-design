/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import _ from 'lodash';
import PropertyCard from '../PropertyCard';
import { PropertyCardProps } from '../interfaces';
import '../style/index';

export default {
  title: 'Pro/PropertyCard',
  component: PropertyCard,
} as Meta;

const Template: Story<PropertyCardProps> = (args) => (
  <div style={{ padding: '16px', boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)' }}>
    <h3>属性详情卡片</h3>
    <PropertyCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  nodeData: {
    groupId: 'user',
    groupName: '用户属性',
    id: 'usr_sex002',
    name: 'sex002 用户属性名称用户属性用户属性用户属性用户属性用户',
    type: 'usr',
    valueType: 'string',
    description:
      '为了便于分析，我们将访问来源进行了归类。分为直接访问，搜索引擎，社交媒体，外部链接四大部分。直接访问： 可能是用户直接在浏览器中输入了一个域名或使用书签进行访问；搜索引擎： www.baidu.com，m.baidu.com，so.com，sogou.com 等；社交媒体：weibo.com，zhihu.com，linkedin.com， facebook.com，mp.weixin.qq.com 等；外部链接： 除了社交媒体，搜索⽹站之外的来源',
  },
  // placeholder: '请选择...',
  fetchData: (v: any) => new Promise((resolve) => setTimeout(() => resolve(v), 300)),
};
