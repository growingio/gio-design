/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import _ from 'lodash';
import PropertySelector from './PropertySelector';
import { PropertySelectorProps } from './interfaces';
import { dimensionToPropertyItem } from './util';
import { Dimension } from './types';
// eslint-disable-next-line import/prefer-default-export
const insightDimensions = [
  {
    key: 'event-properties',
    title: '事件属性',
    subgroups: [
      {
        key: 'custom-event-properties',
        title: '自定义事件属性',
        items: [
          {
            key: 'custom-event-property-1',
            children: '是否使用优惠券',
          },
          {
            key: 'custom-event-property-2',

            children: '优惠券名称',
          },
          {
            key: 'custom-event-property-3',
            children: '站内消息',
          },
        ],
      },
      {
        key: 'area-properties',
        title: '地域信息',
        items: [
          {
            key: 'area-property-1',
            children: '城市',
          },
          {
            key: 'area-property-2',
            children: '地区',
          },
          {
            key: 'area-property-3',
            children: '国家代码',
          },
          {
            key: 'area-property-4',
            children: '国家名称',
          },
        ],
      },
    ],
  },
  {
    key: 'user-properties',
    title: '用户属性',
    items: [
      {
        key: 'user-property-1',
        children: '用户 ID',
      },
      {
        key: 'user-property-2',
        children: '触达推送通道',
      },
      {
        key: 'user-property-3',
        children: '触达登录用户手机号',
      },
      {
        key: 'user-property-4',
        children: '触达注册日期',
      },
      {
        key: 'user-property-5',
        children: '新老用户',
      },
      {
        key: 'user-property-6',
        children: '用户创建时间',
      },
      {
        key: 'user-property-7',
        children: '用户注册日期',
      },
      {
        key: 'user-property-8',
        children: '用户是否购买',
      },
      {
        key: 'user-property-9',
        children: '是否是超级用户',
      },
      {
        key: 'user-property-10',
        children: '高价值用户',
      },
      {
        key: 'user-property-11',
        children: '用户 ID',
      },
      {
        key: 'user-property-12',
        children: '触达推送通道',
      },
      {
        key: 'user-property-13',
        children: '触达登录用户手机号',
      },
      {
        key: 'user-property-14',
        children: '触达注册日期',
      },
      {
        key: 'user-property-15',
        children: '新老用户',
      },
      {
        key: 'user-property-16',
        children: '用户创建时间',
      },
      {
        key: 'user-property-17',
        children: '用户注册日期',
      },
      {
        key: 'user-property-18',
        children: '用户是否购买',
      },
      {
        key: 'user-property-19',
        children: '是否是超级用户',
      },
      {
        key: 'user-property-20',
        children: '高价值用户',
      },
    ],
  },
  {
    key: 'product-property',
    title: '物品属性',
    items: [
      {
        key: 'product-property-1',
        children: '商品 01',
      },
      {
        key: 'product-property-2',
        children: '商品 02',
      },
      {
        key: 'product-property-3',
        children: '商品 03',
      },
      {
        key: 'product-property-4',
        children: '商品 04',
      },
      {
        key: 'product-property-5',
        children: '商品 05',
      },
      {
        key: 'product-property-6',
        children: '商品 06',
      },
      {
        key: 'product-property-7',
        children: '商品 07',
      },
      {
        key: 'product-property-8',
        children: '商品 08',
      },
      {
        key: 'product-property-9',
        children: '商品 09',
      },
      {
        key: 'product-property-10',
        children: '商品 10',
      },
      {
        key: 'product-property-11',
        children: '商品 11',
      },
      {
        key: 'product-property-12',
        children: '商品 12',
      },
      {
        key: 'product-property-13',
        children: '商品 13',
      },
      {
        key: 'product-property-14',
        children: '商品 14',
      },
      {
        key: 'product-property-15',
        children: '商品 15',
      },
      {
        key: 'product-property-16',
        children: '商品 16',
      },
    ],
  },
];

const dataSource = insightDimensions.map((v: any) => dimensionToPropertyItem(v as Dimension));

export default {
  title: 'Pro/PropertySelector',
  component: PropertySelector,
} as Meta;

const Template: Story<PropertySelectorProps> = (args) => (
  <div
    style={{
      width: '410px',
      height: '500px',
      padding: '16px',
      boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
    }}
  >
    <PropertySelector {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  dataSource,
  fetchDetailData: (node: any) =>
    // eslint-disable-next-line no-return-await
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            ...node,
            description: '这里是描述描述这里是描述描述这里是描述描述这里是描述描述这里是描述描述',
          }),
        500
      );
    }),
  // placeholder: '请选择...',
  onChange: (v: any) => {
    console.log('onchange', v);
  },
};
