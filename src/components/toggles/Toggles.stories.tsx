import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Toggles from './index'
import { TogglesProps } from './interface'
import './style'

export default {
    title: 'Components/Basic/Toggles',
    component: Toggles,
} as Meta;

const Template : Story<TogglesProps> = (args) => <Toggles {...args} />;
export const Default = Template.bind({});
Default.args = {
    suffixContent: true,
}