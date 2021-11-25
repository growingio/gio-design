/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import _ from 'lodash';
import PropertyPicker from './PropertyPicker';
import { PropertyPickerProps } from './interfaces';
import './style/index.less';

export default {
  title: 'Pro/PropertyPicker',
  component: PropertyPicker,
} as Meta;

const Template: Story<PropertyPickerProps> = (args) => (
  <div
    style={{
      width: '366px',
      padding: '16px',
      boxShadow: '0px 0px 2px 1px rgba(0, 0, 0, 0.1)',
    }}
  >
    <PropertyPicker {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  disabledValues: ['b'],
  // placeholder: '请选择...',
  onChange: (v: any) => {
    console.log('onchange', v);
  },
};
