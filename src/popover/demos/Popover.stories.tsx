import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Popover from '../Popover';
import { PopoverProps } from '../interface';
import Input from '../../input';
import { Button } from '../../button';
import '../style';
import './demo.stories.less';

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
  <>
    这是提示文案。
    <br />
    需要有足够的长宽！
  </>
);
export const Placement = Template.bind({});
Placement.args = {
  arrowPointAtCenter: true,
  content,
};

const TriggerTemplate: Story<PopoverProps> = (args) => (
  <div style={{ margin: '150px 200px' }}>
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

const ControlTemplate: Story<PopoverProps> = (args) => {
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
          <Popover {...args} visible={visible} placement="top" onVisibleChange={onVisibleChange}>
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
          <Popover {...args} visible={visible2} placement="top" onVisibleChange={onVisibleChange2}>
            <Input value="Show Popover Me!" />
          </Popover>
        </div>
      </fieldset>
    </>
  );
};

export const Controlled = ControlTemplate.bind({});
Controlled.args = { content };

const DefaultTemplate: Story<PopoverProps> = (args) => (
  <>
    <Popover {...args}>
      <Input value="Show Popover with allowed Arrow" style={{ width: 280 }} />
    </Popover>
    <span>|</span>
    <Popover {...args} allowArrow={false}>
      <Input value="Show Popover with rejected Arrow" style={{ width: 280 }} />
    </Popover>
  </>
);
export const DefaultVisible = DefaultTemplate.bind({});
DefaultVisible.args = {
  defaultVisible: true,
  content,
};

const EnterableTemplate: Story<PopoverProps> = (args) => (
  <>
    <Popover {...args}>
      <Input value="Popover supports mouse enter!" style={{ width: 280 }} />
    </Popover>
    <span>|</span>
    <Popover {...args} enterable={false}>
      <Input value="Popover does't support mouse enter!" style={{ width: 280 }} />
    </Popover>
  </>
);

export const Enterable = EnterableTemplate.bind({});
Enterable.args = {
  content,
};
