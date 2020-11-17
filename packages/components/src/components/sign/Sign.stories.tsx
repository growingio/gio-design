import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { ISignProps } from './interface';
import Sign from './index';
import './style';

export default {
  title: 'Components/Basic/Sign',
  component: Sign,
} as Meta;

const style1 = {
  display: 'inline-block',
  width: '50%',
  marginBottom: '15px',
};

const style2 = {
  display: 'inline-block',
  width: '32px',
  height: '32px',
  verticalAlign: 'middle',
  backgroundColor: '#ebedf5',
  bordeRadius: '4PX',
};

const Template: Story<ISignProps> = (args) => (
  <div style={style1}>
    <Sign {...args}>
      <span style={style2} />
    </Sign>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  count: 4,
  magnitude: 10,
};
