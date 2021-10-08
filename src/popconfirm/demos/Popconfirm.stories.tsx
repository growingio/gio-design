import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './PopconfirmPage';
import Popconfirm, { PopconfirmProps } from '../index';
import '../style';
import { Button } from '../..';
import '../style/demo.stories.less';

export default {
  title: 'Feedback/Popconfirm',
  component: Popconfirm,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<PopconfirmProps> = (args) => (
  <Popconfirm {...args}>
    <Button>Click Me</Button>
  </Popconfirm>
);
export const Default = Template.bind({});

Default.args = {
  title: '确定要删除。。。。吗？',
  desc: '删除物品属性后，相关数据将停止计算，历史数据保留。',
  placement: 'bottom',
};

const ControlledTemplate: Story<PopconfirmProps> = (args) => {
  const { visible: argsVisible, ...rest } = args;
  const [visible, setVisible] = useState<boolean>(!!argsVisible);
  return (
    <Popconfirm visible={visible} onVisibleChange={setVisible} {...rest}>
      <Button>click me</Button>
    </Popconfirm>
  );
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
  title: '删除物品属性后，相关数据将停止计算，历史数据保留。',
  placement: 'bottom',
  visible: false,
};

const PlacementTemplate: Story<PopconfirmProps> = (props) => (
  <div className="popconfirmDisplay">
    <div className="popconfirm-top">
      <Popconfirm placement="topLeft" {...props}>
        <Button type="secondary">TopLeft</Button>
      </Popconfirm>
      <Popconfirm placement="top" {...props}>
        <Button type="secondary">Top</Button>
      </Popconfirm>
      <Popconfirm placement="topRight" {...props}>
        <Button type="secondary">TopRight</Button>
      </Popconfirm>
    </div>
    <div className="popconfirm-left">
      <Popconfirm placement="leftTop" {...props}>
        <Button type="secondary">LeftTop</Button>
      </Popconfirm>
      <Popconfirm placement="left" {...props}>
        <Button type="secondary">Left</Button>
      </Popconfirm>
      <Popconfirm placement="leftBottom" {...props}>
        <Button type="secondary">LeftBottom</Button>
      </Popconfirm>
    </div>
    <div className="popconfirm-right">
      <Popconfirm placement="rightTop" {...props}>
        <Button type="secondary">RightTop</Button>
      </Popconfirm>
      <Popconfirm placement="right" {...props}>
        <Button type="secondary">Right</Button>
      </Popconfirm>
      <Popconfirm placement="rightBottom" {...props}>
        <Button type="secondary">RightBottom</Button>
      </Popconfirm>
    </div>
    <div className="popconfirm-buttom">
      <Popconfirm placement="bottomLeft" {...props}>
        <Button type="secondary">BottomLeft</Button>
      </Popconfirm>
      <Popconfirm placement="bottom" {...props}>
        <Button type="secondary">Bottom</Button>
      </Popconfirm>
      <Popconfirm placement="bottomRight" {...props}>
        <Button type="secondary">BottomRight</Button>
      </Popconfirm>
    </div>
  </div>
);

export const Placement = PlacementTemplate.bind({});

Placement.args = {
  title: '确定要删除……吗？',
  desc: '删除物品属性后，相关数据将停止计算，历史数据保留。',
  trigger: 'click',
  arrowPointAtCenter: true,
};
