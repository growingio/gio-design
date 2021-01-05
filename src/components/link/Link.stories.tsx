import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'

import Link from './index'
import { ILinkProps } from './interface'
import './style'

export default {
    title: 'Components/Basic/Link',
    component: Link,
} as Meta;

const Template : Story<ILinkProps> = (args) => <Link {...args}>GrowingIO</Link>

export const Default = Template.bind({});
Default.args = {
    to: "https://www.growingio.com",
}