import React, { useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Popover from '../Popover';
import { PopoverProps } from '../interface';
import Input from '../../input';
import { Button } from '../../button';
import '../style';
import './demo.stories.less';
import Docs from './PopoverPage';

export default {
  title: 'Upgraded/Popover',
  component: Popover,
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

const Template: Story<PopoverProps> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '610px', margin: '70px 0px' }}>
      <div className="tooltip-top">
        <span className="popover-wrapper">
          <Popover {...args} placement="topLeft">
            <span className="popover-span">TopLeft</span>
          </Popover>
        </span>
        <span className="popover-wrapper">
          <Popover {...args} placement="top">
            <span className="popover-span">Top</span>
          </Popover>
        </span>
        <span className="popover-wrapper">
          <Popover {...args} placement="topRight">
            <span className="popover-span">TopRight</span>
          </Popover>
        </span>
      </div>
      <div className="tooltip-left" style={{ marginLeft: '40px' }}>
        <span className="popover-wrapper">
          <Popover {...args} placement="leftTop">
            <span className="popover-span">LeftTop</span>
          </Popover>
        </span>
        <span className="popover-wrapper">
          <Popover {...args} placement="left">
            <span className="popover-span">Left</span>
          </Popover>
        </span>
        <span className="popover-wrapper">
          <Popover {...args} placement="leftBottom">
            <span className="popover-span">LeftBottom</span>
          </Popover>
        </span>
      </div>
      <div className="tooltip-right" style={{ marginLeft: '455px' }}>
        <span className="popover-wrapper">
          <Popover {...args} placement="rightTop">
            <span className="popover-span">RightTop</span>
          </Popover>
        </span>
        <span className="popover-wrapper">
          <Popover {...args} placement="right">
            <span className="popover-span">Right</span>
          </Popover>
        </span>
        <span className="popover-wrapper">
          <Popover {...args} placement="rightBottom">
            <span className="popover-span">RightBottom</span>
          </Popover>
        </span>
      </div>
      <div className="tooltip-buttom">
        <span className="popover-wrapper">
          <Popover {...args} placement="bottomLeft">
            <span className="popover-span">BottomLeft</span>
          </Popover>
        </span>
        <span className="popover-wrapper">
          <Popover {...args} placement="bottom">
            <span className="popover-span">Bottom</span>
          </Popover>
        </span>
        <span className="popover-wrapper">
          <Popover {...args} placement="bottomRight">
            <span className="popover-span">BottomRight</span>
          </Popover>
        </span>
      </div>
    </div>
  </div>
);

const content = (
  <div className="popover-default-inner" style={{ border: '1px solid black' }}>
    这是提示文案。
    <br />
    这是提示文案。
  </div>
);
export const Placement = Template.bind({});
Placement.args = {
  arrowPointAtCenter: true,
  content,
};

const TriggerTemplate: Story<PopoverProps> = (args) => (
  <div style={{ margin: '100px 150px' }}>
    <span style={{ marginRight: 20 }}>
      <Popover {...args} trigger="hover" placement="top">
        <Input value="Touch Me!" style={{ width: 100 }} />
      </Popover>
    </span>
    <span style={{ marginRight: 20 }}>
      <Popover {...args} trigger="focus" placement="top">
        <Input value="Focus Me!" style={{ width: 100 }} />
      </Popover>
    </span>
    <span style={{ marginRight: 20 }}>
      <Popover {...args} trigger={['focus', 'click']} placement="top">
        <Input value="Focus or Click Me!" style={{ width: 150 }} />
      </Popover>
    </span>
    <span style={{ marginRight: 20 }}>
      <Popover {...args} trigger="click" placement="top">
        <Input value="Click Me!" style={{ width: 100 }} />
      </Popover>
    </span>
  </div>
);

export const Trigger = TriggerTemplate.bind({});
Trigger.args = {
  content,
};

const ControlTemplate: Story<PopoverProps> = () => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const [visible2, setVisible2] = useState(false);
  const show2 = () => setVisible2(true);
  const hide2 = () => setVisible2(false);
  const onVisibleChange2 = (resetVisible: boolean) => {
    setVisible2(resetVisible);
  };

  const popContent = (
    <div style={{ border: '1px solid black' }}>
      这是提示文案。
      <br />
      <button type="button" onClick={hide}>
        隐藏
      </button>
    </div>
  );

  const popContent2 = (
    <div style={{ border: '1px solid black' }}>
      这是提示文案。
      <br />
      <button type="button" onClick={hide2}>
        隐藏
      </button>
    </div>
  );

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
          <Popover content={popContent} visible={visible} placement="top" trigger="click">
            <Input value="Show Popover Me!" />
          </Popover>
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
          <Popover
            content={popContent2}
            trigger="click"
            visible={visible2}
            placement="top"
            onVisibleChange={onVisibleChange2}
          >
            <Input value="Show Popover Me!" />
          </Popover>
        </div>
      </fieldset>
    </>
  );
};

export const Controlled = ControlTemplate.bind({});
Controlled.args = {};

const DefaultTemplate: Story<PopoverProps> = (args) => (
  <>
    <Popover {...args} overlayClassName="popover-default-content">
      <Input value="Show Popover with allowed Arrow" style={{ width: 250 }} />
    </Popover>
    <span style={{ padding: 10 }}>|</span>
    <Popover {...args} allowArrow overlayClassName="popover-default-content">
      <Input value="Show Popover with rejected Arrow" style={{ width: 280 }} />
    </Popover>
  </>
);
export const DefaultVisible = DefaultTemplate.bind({});
DefaultVisible.args = {
  defaultVisible: false,
  content,
  trigger: 'click',
};

const PortalTemplate: Story<PopoverProps> = (args) => {
  const outside = useRef();
  const inside = useRef();
  return (
    <>
      <div style={{ width: '100%', height: 300 }} ref={outside}>
        <div
          style={{
            width: '100%',
            height: 300,
            backgroundColor: '#cccccc30',
            display: 'flex',
            opacity: 0.5,
            alignItems: 'center',
          }}
          ref={inside}
        >
          <Popover {...args} strategy="fixed" getContainer={() => outside.current}>
            <Input value="Set Container on Outside Div!" style={{ width: 300 }} />
          </Popover>
          <Popover {...args} getContainer={() => inside.current}>
            <Input value="Set Container on Inner Div!" style={{ width: 300 }} />
          </Popover>
        </div>
      </div>
    </>
  );
};

export const Portal = PortalTemplate.bind({});
Portal.args = {
  content,
};

const NotSupportRefTemplate: Story<PopoverProps> = (args) => (
  <Popover {...args} strategy="absolute">
    Only String
  </Popover>
);

export const NotSupportRef = NotSupportRefTemplate.bind({});
NotSupportRef.args = {
  content,
};

const SupportRefTemplate: Story<PopoverProps> = (args) => {
  const onClick = () => {
    console.log('Click trigger button!');
  };
  return (
    <>
      <span>margin: 30px</span>
      <br />
      <div style={{ border: '1px solid #3c3c3c', borderRadius: '4px', display: 'inline-block' }}>
        <Popover {...args} strategy="fixed">
          <Button style={{ margin: 30 }} onClick={onClick}>
            Button Trigger
          </Button>
        </Popover>
      </div>
    </>
  );
};

export const SupportRef = SupportRefTemplate.bind({});
SupportRef.args = {
  trigger: 'click',
  content,
};

const DisabledTemplate: Story<PopoverProps> = (args) => (
  <Popover {...args} strategy="fixed" disabled>
    <p style={{ border: '1px solid black' }}>Disabled</p>
  </Popover>
);

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  content,
};

const DelayTemplate: Story<PopoverProps> = (args) => (
  <>
    <Popover {...args} strategy="fixed" delay={600} hideDelay={0}>
      <Input value="Show With Delay" />
    </Popover>
    <br />
    <br />
    <Popover {...args} strategy="fixed" delay={0} hideDelay={600}>
      <Input value="Hide With HideDelay" />
    </Popover>
  </>
);

export const DelayAndHideDelay = DelayTemplate.bind({});
DelayAndHideDelay.args = {
  content,
  placement: 'right',
};

const ScrollTemplate: Story<PopoverProps> = (args) => {
  const divRef = useRef();
  const [divHeight, setDivHeight] = useState(1000);
  const [marginHeight, setMarginHeight] = useState(400);
  return (
    <div>
      <div>
        外框高度
        <Input value={divHeight} style={{ margin: 4 }} onChange={(e) => setDivHeight(Number(e.target.value))} />
        间距高度
        <Input value={marginHeight} style={{ margin: 4 }} onChange={(e) => setMarginHeight(Number(e.target.value))} />
      </div>
      <div ref={divRef} style={{ height: divHeight, width: 400, backgroundColor: '#eeeeee' }}>
        <Popover {...args} strategy="fixed" trigger="click" getContainer={() => divRef.current}>
          <Button style={{ margin: `${marginHeight}px 0 0 100px` }}>Show Popover</Button>
        </Popover>
      </div>
    </div>
  );
};
export const ScrollPopover = ScrollTemplate.bind({});
ScrollPopover.args = {
  content: (
    <div>
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试！
      <br />
      这是一个测试!
    </div>
  ),
};
