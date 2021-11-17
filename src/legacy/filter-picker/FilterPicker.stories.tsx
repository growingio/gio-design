import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FilterPicker from '.';
import { FilterPickerProps } from './interfaces';
import { PropertyValue } from '../property-selector';
import './style';

export default {
  title: 'Pro/FilterPicker',
  component: FilterPicker,
} as Meta;

const Template: Story<FilterPickerProps> = (args) => <FilterPicker {...args} />;

const dimissionValue = [
  'www.growingio.com',
  'N/A',
  'accounts.growingio.com',
  'wx51cba5e78d4ef4d8',
  'docs.growingio.com',
  'demo1.growingio.com',
  'wx9d29e4385408f222',
  'www.test.sdk.com',
  'www.meiyu.sdk.com',
  'www.xiaomei.sdk.com',
  'growingio.kf5.com',
  'demo.growingio.com',
  'messages.growingio.com',
  'help.growingio.com',
  'growing.kf5.com',
  'release-www.growingio.cn',
  'www.zeding.net',
  'fep0.growingio.com',
  'liu-huaqing.gitbooks.io',
  '117.50.63.183',
  'sishen.gitbooks.io',
  'com.zqm.test0219',
  'release-deeplink.growingio.cn',
  'www.huanqiujindun.com',
  'www.xinonggaoke.com',
  'com.growingio.gtouch',
  'www.mljsj.net',
  'www.kinglysoft.com',
  'dev.lyajt.com',
  'release-api.growingio.cn:9091',
  'translate.googleusercontent.com',
  'www.schoolso.net',
  'gio.jx139.com',
  '39.106.230.138',
  '10.20.20.23:8086',
  '39.103.31.137',
  'zs.ttylink.com',
  'erp.ttylink.com',
  '10.20.20.23:8080',
];

export const Default = Template.bind({});
Default.args = {
  propertyOptions: [
    {
      id: 'd',
      name: '域名',
      groupId: 'normal',
      groupName: '常用维度',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'p',
      name: '页面',
      groupId: 'normal',
      groupName: '常用维度',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'rp',
      name: '页面来源',
      groupId: 'normal',
      groupName: '常用维度',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'b',
      name: '应用平台',
      groupId: 'normal',
      groupName: '常用维度',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'cv',
      name: 'App 版本',
      groupId: 'normal',
      groupName: '常用维度',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'usr_test_1126_2',
      name: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'int',
      __typename: 'Dimension',
    },
    {
      id: 'usr_isPayed_ppl',
      name: '是否付费（用户变量）',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'string',
      __typename: 'Dimension',
    },
    {
      id: 'usr_userVIP',
      name: '是否是超级用户',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'string',
      __typename: 'Dimension',
    },
    {
      id: 'usr_IfUserBuy_ppl',
      name: '用户是否购买',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'string',
      __typename: 'Dimension',
    },
    {
      id: 'usr_createdat',
      name: '用户注册日期',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'date',
      __typename: 'Dimension',
    },
    {
      id: 'usr_testkey',
      name: 'bbbbbb',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'int',
      __typename: 'Dimension',
    },
    {
      id: 'usr_test_1117_date',
      name: 'test_1117_date',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'date',
      __typename: 'Dimension',
    },
    {
      id: 'usr_test_1117_int',
      name: 'test_1117_int',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'int',
      __typename: 'Dimension',
    },
    {
      id: 'usr_test_1117_string',
      name: 'test_1117_string',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'string',
      __typename: 'Dimension',
    },
    {
      id: 'usr_test_1126_1',
      name: 'test_1126_1_update',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'date',
      __typename: 'Dimension',
    },
    {
      id: 'usr_test_1217_date',
      name: 'test_1217_date',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'date',
      __typename: 'Dimension',
    },
    {
      id: 'usr_test_1217_int',
      name: 'test_1217_int',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'int',
      __typename: 'Dimension',
    },
    {
      id: 'usr_test_1217_string',
      name: 'test_1217_string',
      groupId: 'user',
      groupName: '用户属性',
      type: 'usr',
      valueType: 'string',
      __typename: 'Dimension',
    },
    {
      id: 'rd',
      name: '访问来源',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'rt',
      name: '一级访问来源',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'kw',
      name: '搜索词',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'utm_source',
      name: '广告来源',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'utm_campaign',
      name: '广告名称',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'utm_content',
      name: '广告内容',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'utm_term',
      name: '广告关键字',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'utm_medium',
      name: '广告媒介',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'ch',
      name: '自定义 App 渠道',
      groupId: 'origin',
      groupName: '用户来源',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'city',
      name: '城市',
      groupId: 'geo',
      groupName: '地域信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'region',
      name: '地区',
      groupId: 'geo',
      groupName: '地域信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'countryCode',
      name: '国家代码',
      groupId: 'geo',
      groupName: '地域信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'countryName',
      name: '国家名称',
      groupId: 'geo',
      groupName: '地域信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'bw',
      name: '浏览器',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'bwv',
      name: '浏览器版本',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'os',
      name: '操作系统',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'osv',
      name: '操作系统版本',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'shw',
      name: '屏幕大小（高*宽）',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'l',
      name: '操作系统语言',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'db',
      name: '设备品牌',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'dm',
      name: '设备型号',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
    {
      id: 'o',
      name: '设备方向',
      groupId: 'device',
      groupName: '设备信息',
      type: 'global',
      valueType: null,
      __typename: 'Dimension',
    },
  ],
  filter: { op: 'and', exprs: [], __typename: 'directivesFilterrR2q' },
  recentlyStorePrefix: 'currentUserId',
  timeRange: 'day:31,1',
  measurements: [
    {
      id: 'vv',
      type: 'prepared',
      attribute: 'count',
      __typename: 'Measurement265f',
    },
  ],
  dimensionValueRequest: () =>
    new Promise((resolve) => {
      resolve(dimissionValue);
    }),
  fetchDetailData: (node: PropertyValue) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(node), 500);
    }),
};
