/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import _ from 'lodash';
import PropertySelector from '../PropertySelector';
import { PropertySelectorProps } from '../interfaces';
import insightDimensions from './insightDimensions';
import '../style/index';

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
  dataSource: insightDimensions,
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
