import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'

import Grid from './index'
import { GridProps } from './interface'
import './style/index.less'
import './style/demo.less'

export default {
    title: 'Components/Basic/Grid',
    component: Grid,
} as Meta;

const Template : Story<GridProps> = (args) => (
  <Grid className="demo">
    <Grid {...args} span={12}>Text</Grid>
    <Grid {...args}>Text</Grid>
    <Grid {...args}>Text</Grid>
    <Grid {...args}>Text</Grid>
    <Grid {...args}>Text</Grid>
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
    span: 3,
    className: "box",
}