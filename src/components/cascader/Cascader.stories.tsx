import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Cascader from './index';
import { Props } from './interface';
import './style';
import '../input/style'
import '../dropdown/style'
import '../search-bar/style'

export default {
    title: 'Components/Basic/Cascader',
    component: Cascader,
} as Meta;

const dataSource = [
    { label: 'option A', value: 'a' },
    { label: 'option B', value: 'b', children: [{ label: 'B-1', value: 'b-1' }] },
    {
      label: 'option C',
      value: 'c',
      children: [
        { label: 'Option C-1', value: 'c-1' },
        {
          label: 'Option C-2',
          value: 'c-2',
          children: [
            { label: 'Option C-2-1', value: 'c-2-1' },
            { label: 'Option C-2-2', value: 'c-2-2', children: [{ label: 'Option C-2-2-1', value: 'c-2-2-1' }] },
          ],
        },
      ],
    },
];

const Template : Story<Props> = (args) => <Cascader {...args} />;
export const Default = Template.bind({});
Default.args = {
    dataSource,
}