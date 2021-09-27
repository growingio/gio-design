/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './PopoverPage';
import Popover from '../index';
import { PopoverProps } from '../interface';
import '../style';
import '../style/demo.stories.less';
import { Checkbox, CheckboxGroup, Link } from '../..';

export default {
  title: 'Data Display/Popover',
  component: Popover,
  parameters: {
    docs: {
      page: Docs,
    },
  },
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
);
const text = () => (
  <>
    <input className="displayInput" />
    <p className="desc">*此链接用于统计渠道点击数据，请用此链接替换点击跳转地址。</p>
  </>
);

const Template: Story<PopoverProps> = (args) => {
  const { trigger } = args;
  const triggerText = trigger === 'click' ? 'click me' : 'hover me';

  return (
    <div className="popover-demo-box">
      <Popover {...args}>
        <span className="popoverSpan">{triggerText}</span>
      </Popover>
      <Popover
        {...args}
        contentArea={text()}
        footerArea={<span className="rightButton">复制链接</span>}
        arrowPointAtCenter={false}
      >
        <Link component="span">{triggerText}</Link>
      </Popover>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  contentArea: content(),
};

export const ClickPopover = Template.bind({});
ClickPopover.args = {
  contentArea: text(),
  footerArea: <span className="rightButton">复制链接</span>,
  trigger: 'click',
};

const ArrowTemplate: Story<PopoverProps> = (args) => (
  <div className="popover-demo-box">
    <Popover {...args} arrowPointAtCenter>
      <span className="popoverSpan">Arrow points to center / 箭头指向中心</span>
    </Popover>
    <Popover {...args}>
      <span className="popoverSpan">Align edge / 边缘对齐</span>
    </Popover>
  </div>
);

export const Arrow = ArrowTemplate.bind({});
Arrow.args = {
  contentArea: content(),
  placement: 'topLeft',
};

const PlacementTemplate: Story<PopoverProps> = (props) => (
  <div className="popover-demo-box">
    <div className="popover-top">
      <Popover placement="topLeft" {...props}>
        <span className="popoverSpan">TopLeft</span>
      </Popover>
      <Popover placement="top" {...props}>
        <span className="popoverSpan">Top</span>
      </Popover>
      <Popover placement="topRight" {...props}>
        <span className="popoverSpan">TopRight</span>
      </Popover>
    </div>
    <div className="popover-left">
      <Popover placement="leftTop" {...props}>
        <span className="popoverSpan">LeftTop</span>
      </Popover>
      <Popover placement="left" {...props}>
        <span className="popoverSpan">Left</span>
      </Popover>
      <Popover placement="leftBottom" {...props}>
        <span className="popoverSpan">LeftBottom</span>
      </Popover>
    </div>
    <div className="popover-right">
      <Popover placement="rightTop" {...props}>
        <span className="popoverSpan">RightTop</span>
      </Popover>
      <Popover placement="right" {...props}>
        <span className="popoverSpan">Right</span>
      </Popover>
      <Popover placement="rightBottom" {...props}>
        <span className="popoverSpan">RightBottom</span>
      </Popover>
    </div>
    <div className="popover-buttom">
      <Popover placement="bottomLeft" {...props}>
        <span className="popoverSpan">BottomLeft</span>
      </Popover>
      <Popover placement="bottom" {...props}>
        <span className="popoverSpan">Bottom</span>
      </Popover>
      <Popover placement="bottomRight" {...props}>
        <span className="popoverSpan">BottomRight</span>
      </Popover>
    </div>
  </div>
);

export const Placement = PlacementTemplate.bind({});
Placement.args = {
  contentArea: content(),
  arrowPointAtCenter: true,
};
