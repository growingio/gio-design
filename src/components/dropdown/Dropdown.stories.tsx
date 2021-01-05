import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Dropdown, { DropdownProps } from './index'
import './style'
import { Button } from '../..';

export default {
    title: 'Components/Functional/Dropdown',
    component: Dropdown,
} as Meta;

const overlay = (
  <div
    style={{
    width: 120,
    height: 120,
    border: '1px dashed #DCDFED',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  >
    内容区域
  </div>
)

const Template : Story<DropdownProps> = (args) => (
  <Dropdown {...args}>
    <Button>点击下拉</Button>
  </Dropdown>
)
export const Default = Template.bind({});
Default.args = {
    overlay,
}