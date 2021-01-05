import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Tooltip, { TooltipProps } from './index'
import './style'
import './style/demo.less'

export default {
    title: 'Components/Basic/Tooltip',
    component: Tooltip,
} as Meta;

const Template : Story<TooltipProps> = (args) => (
  <div style={{width:"100%",textAlign:"center",marginTop:"70px"}}>
    <Tooltip {...args}>
      <span className="tooltipSpan">多行</span>
    </Tooltip>
  </div>
)
export const Default = Template.bind({});
Default.args = {
    title: "这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。",
    tooltipLink: { name: '点击这里', link: 'www.growingio.com' },
    placement: 'top',
}

