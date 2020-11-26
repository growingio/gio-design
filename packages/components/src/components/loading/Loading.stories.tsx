import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'

import Loading from './index'
import { LoadingProps } from './interface'
import './style'

export default {
    title: 'Components/Basic/Loading',
    component: Loading,
} as Meta;

const Template : Story<LoadingProps> = (args) => <Loading {...args} />

export const Default = Template.bind({});
Default.args = {
    loading: true,
    titlePosition: 'right',
}
