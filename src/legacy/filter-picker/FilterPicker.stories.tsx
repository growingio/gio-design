import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import FilterPicker from '.';
import { FilterPickerProps, FilterValue } from './interfaces';
import { PropertyValue } from './components/property-selector';
import './style';
import insightDimensions from './components/property-selector/demos/insightDimensions';

export default {
  title: 'Pro/FilterPicker',
  component: FilterPicker,
} as Meta;

const Template: Story<FilterPickerProps> = (args) => {
  const [value, setValue] = useState<FilterValue>({ op: 'and', exprs: [] });
  return (
    <FilterPicker
      {...args}
      propertyOptions={insightDimensions}
      filter={value}
      onConfirm={(v) => {
        // eslint-disable-next-line no-console
        console.log(`🚀 onConfirm`, v);
        setValue(v);
      }}
    />
  );
};

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
