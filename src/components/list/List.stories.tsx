import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import * as Icons from '@gio-design/icons';
import List, { DragList } from './index'
import Option from './option'
import { IBaseListProps } from './interface'
import './style'

export default {
    title: 'Components/Functional/List',
    component: List,
    subcomponents: { Option },
} as Meta;

const options = [
    { value: 'a', label: '选择事件a' },
    { value: 'b', label: '选择事件b', tooltip: 'test', disabled: true },
    { value: 'c', label: '选择事件c' },
    { value: 'd', label: '选择事件d', disabled: true },
];
const WrapperStyle = {
    display: 'inline-block',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 14px 1px rgba(223,226,237,0.8)',
};

const Template : Story<IBaseListProps> = (args) => (
  <div style={WrapperStyle}>
    <List {...args} />
  </div>
);
export const Default = Template.bind({});
Default.args = {
    dataSource: options,
    width: 170,
    height: 176,
}


const DragTemplate : Story<IBaseListProps> = (args) => (
  <div style={WrapperStyle}>
    <DragList {...args} />
  </div>
)
const labelRenderer = (option: any) => (
      <>
        <Icons.AppOutlined />
        &nbsp;&nbsp;
        {option.label}
      </>
    );
export const DragLists = DragTemplate.bind({});
DragLists.args = {
    dataSource: options,
    width: 260,
    height: 166,
    labelRenderer: {labelRenderer},
}