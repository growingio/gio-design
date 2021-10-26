import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
// import Docs from './TooltipPage';
import Popover from '../Popover';
// import '../style';
// import '../style/demo.stories.less';

export default {
  title: 'Upgraded/Popover',
  component: Popover,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A1753',
      allowFullscreen: true,
    },
    docs: {
      page: null,
    },
  },
} as Meta;

const Template: Story<any> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '610px', margin: '70px 0px' }}>
      <div className="tooltip-top">
        <Popover {...args} placement="topLeft">
          <span className="tooltipSpan">TopLeft</span>
        </Popover>
        <Popover {...args} placement="top">
          <span className="tooltipSpan">Top</span>
        </Popover>
        <Popover {...args} placement="topRight">
          <span className="tooltipSpan">TopRight</span>
        </Popover>
      </div>
      <div className="tooltip-left" style={{ marginLeft: '40px' }}>
        <Popover {...args} placement="leftTop">
          <span className="tooltipSpan">LeftTop</span>
        </Popover>
        <Popover {...args} placement="left">
          <span className="tooltipSpan">Left</span>
        </Popover>
        <Popover {...args} placement="leftBottom">
          <span className="tooltipSpan">LeftBottom</span>
        </Popover>
      </div>
      <div className="tooltip-right" style={{ marginLeft: '455px' }}>
        <Popover {...args} placement="rightTop">
          <span className="tooltipSpan">RightTop</span>
        </Popover>
        <Popover {...args} placement="right">
          <span className="tooltipSpan">Right</span>
        </Popover>
        <Popover {...args} placement="rightBottom">
          <span className="tooltipSpan">RightBottom</span>
        </Popover>
      </div>
      <div className="tooltip-buttom">
        <Popover {...args} placement="bottomLeft">
          <span className="tooltipSpan">BottomLeft</span>
        </Popover>
        <Popover {...args} placement="bottom">
          <span className="tooltipSpan">Bottom</span>
        </Popover>
        <Popover {...args} placement="bottomRight">
          <span className="tooltipSpan">BottomRight</span>
        </Popover>
      </div>
    </div>
  </div>
);
export const Default = Template.bind({});
Default.args = {
  arrowPointAtCenter: true,
  title: '这是提示文案。',
};
