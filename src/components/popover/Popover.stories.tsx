import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Popover from './index'
import { PopoverProps } from './interface'
import './style'
import './style/demo.less'
import { Checkbox, CheckboxGroup } from '../..';

export default {
    title: 'Components/Functional/Popover',
    component: Popover,
} as Meta;

const content = () => (
  <>
    <p className="title">广告阶段</p>
    <CheckboxGroup>
      <Checkbox value="1">点击</Checkbox>
      <Checkbox value="2">到站访问</Checkbox>
      <Checkbox value="3">到站访问率</Checkbox>
    </CheckboxGroup>
    <p className="title" style={{ marginTop: 32 }}>
      用户量
    </p>
    <CheckboxGroup>
      <Checkbox value="1">用户总量</Checkbox>
      <Checkbox value="2">新增</Checkbox>
      <Checkbox value="3">回访</Checkbox>
    </CheckboxGroup>
  </>
)
const text = () => (
  <>
    <input className="displayInput" />
    <p className="desc">*此链接用于统计渠道点击数据，请用此链接替换点击跳转地址。</p>
  </>

)

const Template : Story<PopoverProps> = (args) => (
  <Popover {...args}>
    <span className="popoverSpan">hover me</span>
  </Popover>
)
export const Default = Template.bind({});
Default.args = {
    contentArea: content(),
}


export const ClickPopover = Template.bind({});
ClickPopover.args = {
    contentArea: text(),
    footerArea: <span className="rightButton">复制链接</span>,
    trigger: 'click',
}