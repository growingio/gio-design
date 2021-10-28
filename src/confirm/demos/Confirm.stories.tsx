import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Confirm from '../Confirm';
import { ConfirmProps } from '../interface';
import Input from '../../input';
import { Button } from '../../button';
import '../../popover/demos/demo.stories.less';

export default {
  title: 'Upgraded/Conform',
  component: Confirm,
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

const Template: Story<ConfirmProps> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '610px', margin: '70px 0px' }}>
      <div className="tooltip-top">
        <span className="popover-wrapper">
          <Confirm {...args} placement="topLeft">
            <span className="popover-span">TopLeft</span>
          </Confirm>
        </span>
        <span className="popover-wrapper">
          <Confirm {...args} placement="top">
            <span className="popover-span">Top</span>
          </Confirm>
        </span>
        <span className="popover-wrapper">
          <Confirm {...args} placement="topRight">
            <span className="popover-span">TopRight</span>
          </Confirm>
        </span>
      </div>
      <div className="tooltip-left" style={{ marginLeft: '40px' }}>
        <span className="popover-wrapper">
          <Confirm {...args} placement="leftTop">
            <span className="popover-span">LeftTop</span>
          </Confirm>
        </span>
        <span className="popover-wrapper">
          <Confirm {...args} placement="left">
            <span className="popover-span">Left</span>
          </Confirm>
        </span>
        <span className="popover-wrapper">
          <Confirm {...args} placement="leftBottom">
            <span className="popover-span">LeftBottom</span>
          </Confirm>
        </span>
      </div>
      <div className="tooltip-right" style={{ marginLeft: '455px' }}>
        <span className="popover-wrapper">
          <Confirm {...args} placement="rightTop">
            <span className="popover-span">RightTop</span>
          </Confirm>
        </span>
        <span className="popover-wrapper">
          <Confirm {...args} placement="right">
            <span className="popover-span">Right</span>
          </Confirm>
        </span>
        <span className="popover-wrapper">
          <Confirm {...args} placement="rightBottom">
            <span className="popover-span">RightBottom</span>
          </Confirm>
        </span>
      </div>
      <div className="tooltip-buttom">
        <span className="popover-wrapper">
          <Confirm {...args} placement="bottomLeft">
            <span className="popover-span">BottomLeft</span>
          </Confirm>
        </span>
        <span className="popover-wrapper">
          <Confirm {...args} placement="bottom">
            <span className="popover-span">Bottom</span>
          </Confirm>
        </span>
        <span className="popover-wrapper">
          <Confirm {...args} placement="bottomRight">
            <span className="popover-span">BottomRight</span>
          </Confirm>
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

const TriggerTemplate: Story<ConfirmProps> = (args) => (
  <div style={{ margin: '150px 200px' }}>
    <span style={{ marginRight: 20 }}>
      <Confirm {...args} trigger="hover" placement="top">
        <Input value="Touch Me!" style={{ width: 100 }} />
      </Confirm>
    </span>
    <span style={{ marginRight: 20 }}>
      <Confirm {...args} trigger="focus" placement="top">
        <Input value="Focus Me!" style={{ width: 100 }} />
      </Confirm>
    </span>
    <span style={{ marginRight: 20 }}>
      <Confirm {...args} trigger={['focus', 'click']} placement="top">
        <Input value="Focus or Click Me!" style={{ width: 150 }} />
      </Confirm>
    </span>
    <span style={{ marginRight: 20 }}>
      <Confirm {...args} trigger="click" placement="top">
        <Input value="Click Me!" style={{ width: 100 }} />
      </Confirm>
    </span>
  </div>
);

export const Trigger = TriggerTemplate.bind({});
Trigger.args = {
  content,
};

const ControlTemplate: Story<ConfirmProps> = (args) => {
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
          <Confirm {...args} visible={visible} placement="top" onVisibleChange={onVisibleChange}>
            <Input value="Show Popover Me!" />
          </Confirm>
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
          <Confirm {...args} visible={visible2} placement="top" onVisibleChange={onVisibleChange2}>
            <Input value="Show Popover Me!" />
          </Confirm>
        </div>
      </fieldset>
    </>
  );
};

export const Controlled = ControlTemplate.bind({});
Controlled.args = { content };

const DefaultTemplate: Story<ConfirmProps> = (args) => (
  <>
    <Confirm {...args}>
      <Input value="Show Popover with allowed Arrow" style={{ width: 280 }} />
    </Confirm>
    <span>|</span>
    <Confirm {...args} allowArrow={false}>
      <Input value="Show Popover with rejected Arrow" style={{ width: 280 }} />
    </Confirm>
  </>
);
export const DefaultVisible = DefaultTemplate.bind({});
DefaultVisible.args = {
  defaultVisible: true,
  content,
};

const EnterableTemplate: Story<ConfirmProps> = (args) => (
  <>
    <Confirm {...args}>
      <Input value="Popover supports mouse enter!" style={{ width: 280 }} />
    </Confirm>
    <span>|</span>
    <Confirm {...args} enterable={false}>
      <Input value="Popover does't support mouse enter!" style={{ width: 280 }} />
    </Confirm>
  </>
);

export const Enterable = EnterableTemplate.bind({});
Enterable.args = {
  content,
};
