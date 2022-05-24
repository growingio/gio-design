import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Tooltip from '../Tooltip';
import { TooltipProps } from '../interface';
import Input from '../../input';
import Button from '../../button';
import '../style';
import '../../popover/demos/demo.stories.less';
import Docs from './TooltipPage';

export default {
  title: 'Upgraded/Tooltip',
  component: Tooltip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45835',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<TooltipProps> = (args) => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      height: '400px',
      minWidth: '600px',
      maxWidth: '900px',
    }}
  >
    <div
      className="tooltip-top"
      style={{
        position: 'absolute',
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        height: '400px',
        width: '100%',
      }}
    >
      <span className="popover-wrapper">
        <Tooltip {...args} data-testid="tooltip" placement="topLeft">
          <span className="popover-span">TopLeft</span>
        </Tooltip>
      </span>
      <span className="popover-wrapper">
        <Tooltip {...args} placement="top">
          <span className="popover-span">Top</span>
        </Tooltip>
      </span>
      <span className="popover-wrapper">
        <Tooltip {...args} placement="topRight">
          <span className="popover-span">TopRight</span>
        </Tooltip>
      </span>
    </div>
    <div
      className="tooltip-left"
      style={{
        marginTop: 120,
        position: 'absolute',
        left: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span className="popover-wrapper">
        <Tooltip {...args} placement="leftTop">
          <span className="popover-span">LeftTop</span>
        </Tooltip>
      </span>
      <span className="popover-wrapper">
        <Tooltip {...args} placement="left">
          <span className="popover-span">Left</span>
        </Tooltip>
      </span>
      <span className="popover-wrapper">
        <Tooltip {...args} placement="leftBottom">
          <span className="popover-span">LeftBottom</span>
        </Tooltip>
      </span>
    </div>
    <div
      className="tooltip-right"
      style={{
        marginTop: 120,
        position: 'absolute',
        display: 'flex',
        right: 0,
        flexDirection: 'column',
      }}
    >
      <span className="popover-wrapper">
        <Tooltip {...args} placement="rightTop">
          <span className="popover-span">RightTop</span>
        </Tooltip>
      </span>
      <span className="popover-wrapper">
        <Tooltip {...args} placement="right">
          <span className="popover-span">Right</span>
        </Tooltip>
      </span>
      <span className="popover-wrapper">
        <Tooltip {...args} placement="rightBottom">
          <span className="popover-span">RightBottom</span>
        </Tooltip>
      </span>
    </div>
    <div
      className="tooltip-buttom"
      style={{
        position: 'absolute',
        bottom: 0,
      }}
    >
      <span className="popover-wrapper">
        <Tooltip {...args} placement="bottomLeft">
          <span className="popover-span">BottomLeft</span>
        </Tooltip>
      </span>
      <span className="popover-wrapper">
        <Tooltip {...args} placement="bottom">
          <span className="popover-span">Bottom</span>
        </Tooltip>
      </span>
      <span className="popover-wrapper">
        <Tooltip {...args} placement="bottomRight">
          <span className="popover-span">BottomRight</span>
        </Tooltip>
      </span>
    </div>
  </div>
);

const overlay = (
  <>
    这是提示文案。
    <br />
    需要有足够的长宽！
  </>
);
export const Placement = Template.bind({});
Placement.args = {
  arrowPointAtCenter: true,
  overlay,
  trigger: 'hover',
};

const TriggerTemplate: Story<TooltipProps> = (args) => (
  <div>
    <span style={{ marginRight: 20 }}>
      <Tooltip {...args} trigger="hover" placement="top">
        <Input value="Touch Me!" style={{ width: 100 }} />
      </Tooltip>
    </span>
    <span style={{ marginRight: 20 }}>
      <Tooltip {...args} trigger="focus" placement="top">
        <Input value="Focus Me!" style={{ width: 100 }} />
      </Tooltip>
    </span>
    <span style={{ marginRight: 20 }}>
      <Tooltip {...args} trigger={['focus', 'click']} placement="top">
        <Input value="Focus or Click Me!" style={{ width: 150 }} />
      </Tooltip>
    </span>
    <span style={{ marginRight: 20 }}>
      <Tooltip {...args} trigger="click" placement="top">
        <Input value="Click Me!" style={{ width: 100 }} />
      </Tooltip>
    </span>
  </div>
);

export const Trigger = TriggerTemplate.bind({});
Trigger.args = {
  overlay,
};

const ControlTemplate: Story<TooltipProps> = (args) => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const onVisibleChange = (resetVisible: boolean) => {
    console.log(resetVisible);
  };

  const [visible2, setVisible2] = useState(false);
  const show2 = () => setVisible2(true);
  const hide2 = () => setVisible2(false);
  const onVisibleChange2 = (resetVisible: boolean) => {
    setVisible2(resetVisible);
  };
  return (
    <>
      <fieldset style={{ border: '1px solid var(--gray-2, #dfe4ee)', marginBottom: 100, padding: '50px 20px' }}>
        <legend>Controlled</legend>
        <div style={{ marginRight: 20 }}>
          <Button onClick={show} style={{ marginRight: 10 }}>
            Show Popover
          </Button>
          <Button onClick={hide} style={{ marginRight: 50 }}>
            Hide Popover
          </Button>
          <Tooltip {...args} visible={visible} placement="top" onVisibleChange={onVisibleChange}>
            <Input value="Show Popover Me!" />
          </Tooltip>
        </div>
      </fieldset>
      <fieldset style={{ border: '1px solid var(--gray-2, #dfe4ee)', padding: '50px 20px' }}>
        <legend>Controlled by onVisibleChange</legend>
        <div style={{ marginRight: 20 }}>
          <Button onClick={show2} style={{ marginRight: 10 }}>
            Show Popover
          </Button>
          <Button onClick={hide2} style={{ marginRight: 50 }}>
            Hide Popover
          </Button>
          <Tooltip {...args} visible={visible2} placement="top" onVisibleChange={onVisibleChange2}>
            <Input value="Show Popover Me!" />
          </Tooltip>
        </div>
      </fieldset>
    </>
  );
};

export const Controlled = ControlTemplate.bind({});
Controlled.args = { overlay };

const MultiLineTemplate: Story<TooltipProps> = (args) => (
  <div style={{ margin: '0 10px' }}>
    <Tooltip {...args} placement="right">
      <span className="tooltipSpan">多行展示</span>
    </Tooltip>
  </div>
);
export const MultiLine = MultiLineTemplate.bind({});
MultiLine.args = {
  title: '这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。',
  placement: 'right',
  trigger: 'hover',
};

export const Disabled = () => (
  <div>
    <Tooltip title="Button 被禁用了" placement="right">
      <Button disabled>Disabled Button (Tooltip未设置disabled)</Button>
    </Tooltip>
  </div>
);

export const Default = () => (
  <>
    <Tooltip overlay={<span>overlay</span>}>
      <Button> Button </Button>
    </Tooltip>
  </>
);

export const Title = () => (
  <>
    <Tooltip title={<span>title</span>}>
      <span> Title </span>
    </Tooltip>
  </>
);

export const TooltipLink = () => (
  <>
    <Tooltip title={<span>overlay</span>} tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}>
      <span> TooltipLink </span>
    </Tooltip>
  </>
);

export const Delay = () => (
  <>
    <Tooltip overlay={<span>overlay</span>} delay={1500}>
      <span> Delay 1.5s </span>
    </Tooltip>
  </>
);

export const HideDelay = () => (
  <>
    <Tooltip overlay={<span>overlay</span>} hideDelay={2000}>
      <span> hideDelay 2s</span>
    </Tooltip>
  </>
);

export const Offset = () => (
  <>
    <Tooltip overlay={<span>overlay</span>} offset={[10, 10]}>
      <span> Offset </span>
    </Tooltip>
  </>
);

export const DestroyOnHide = () => (
  <>
    <Tooltip overlay={<span>overlay</span>} destroyOnHide={false}>
      <span> destroyOnHide </span>
    </Tooltip>
  </>
);
