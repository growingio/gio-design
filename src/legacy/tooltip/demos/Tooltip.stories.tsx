import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './TooltipPage';
import Tooltip, { TooltipProps } from '../index';
import '../style';
import '../style/demo.stories.less';

export default {
  title: 'Legacy/Tooltip',
  component: Tooltip,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A1753',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<TooltipProps> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '610px', margin: '70px 0px' }}>
      <div className="tooltip-top">
        <Tooltip {...args} placement="topLeft">
          <span className="tooltipSpan">TopLeft</span>
        </Tooltip>
        <Tooltip {...args} placement="top">
          <span className="tooltipSpan">Top</span>
        </Tooltip>
        <Tooltip {...args} placement="topRight">
          <span className="tooltipSpan">TopRight</span>
        </Tooltip>
      </div>
      <div className="tooltip-left" style={{ marginLeft: '40px' }}>
        <Tooltip {...args} placement="leftTop">
          <span className="tooltipSpan">LeftTop</span>
        </Tooltip>
        <Tooltip {...args} placement="left">
          <span className="tooltipSpan">Left</span>
        </Tooltip>
        <Tooltip {...args} placement="leftBottom">
          <span className="tooltipSpan">LeftBottom</span>
        </Tooltip>
      </div>
      <div className="tooltip-right" style={{ marginLeft: '455px' }}>
        <Tooltip {...args} placement="rightTop">
          <span className="tooltipSpan">RightTop</span>
        </Tooltip>
        <Tooltip {...args} placement="right">
          <span className="tooltipSpan">Right</span>
        </Tooltip>
        <Tooltip {...args} placement="rightBottom">
          <span className="tooltipSpan">RightBottom</span>
        </Tooltip>
      </div>
      <div className="tooltip-buttom">
        <Tooltip {...args} placement="bottomLeft">
          <span className="tooltipSpan">BottomLeft</span>
        </Tooltip>
        <Tooltip {...args} placement="bottom">
          <span className="tooltipSpan">Bottom</span>
        </Tooltip>
        <Tooltip {...args} placement="bottomRight">
          <span className="tooltipSpan">BottomRight</span>
        </Tooltip>
      </div>
    </div>
  </div>
);
export const Default = Template.bind({});
Default.args = {
  arrowPointAtCenter: true,
  title: '这是提示文案。',
};

const LinkTemplate: Story<TooltipProps> = (args) => (
  <div style={{ margin: '0px 10px' }}>
    <Tooltip {...args}>
      <span className="tooltipSpan">Right</span>
    </Tooltip>
  </div>
);
export const Link = LinkTemplate.bind({});
Link.args = {
  title: '这里是提示文案。',
  tooltipLink: { name: '点击这里', link: 'www.growingio.com' },
  placement: 'right',
};

const MultiLineTemplate: Story<TooltipProps> = (args) => (
  <div style={{ margin: '0px 10px' }}>
    <Tooltip {...args} placement="right">
      <span className="tooltipSpan">多行</span>
    </Tooltip>
  </div>
);
export const MultiLine = MultiLineTemplate.bind({});
MultiLine.args = {
  title: '这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。',
  tooltipLink: { name: '点击这里', link: 'www.growingio.com' },
  placement: 'right',
};
