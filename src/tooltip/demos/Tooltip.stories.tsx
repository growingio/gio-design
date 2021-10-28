import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Tooltip from '../Tooltip';
import { TooltipProps } from '../interface';
import Input from '../../input';
import { Button } from '../../button';
import '../../popover/demos/demo.stories.less';

export default {
  title: 'Upgraded/Tooltip',
  component: Tooltip,
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

const Template: Story<TooltipProps> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyoverlay: 'center' }}>
    <div style={{ width: '610px', margin: '70px 0px' }}>
      <div className="tooltip-top">
        <span className="popover-wrapper">
          <Tooltip {...args} placement="topLeft">
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
      <div className="tooltip-left" style={{ marginLeft: '40px' }}>
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
      <div className="tooltip-right" style={{ marginLeft: '455px' }}>
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
      <div className="tooltip-buttom">
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
};

const TriggerTemplate: Story<TooltipProps> = (args) => (
  <div style={{ margin: '150px 200px' }}>
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

const DefaultTemplate: Story<TooltipProps> = (args) => (
  <>
    <Tooltip {...args}>
      <Input value="Show Popover with allowed Arrow" style={{ width: 280 }} />
    </Tooltip>
    <span>|</span>
    <Tooltip {...args} allowArrow={false}>
      <Input value="Show Popover with rejected Arrow" style={{ width: 280 }} />
    </Tooltip>
  </>
);
export const DefaultVisible = DefaultTemplate.bind({});
DefaultVisible.args = {
  defaultVisible: true,
  overlay,
};

const EnterableTemplate: Story<TooltipProps> = (args) => (
  <>
    <Tooltip {...args}>
      <Input value="Popover supports mouse enter!" style={{ width: 280 }} />
    </Tooltip>
    <span>|</span>
    <Tooltip {...args} enterable={false}>
      <Input value="Popover does't support mouse enter!" style={{ width: 280 }} />
    </Tooltip>
  </>
);

export const Enterable = EnterableTemplate.bind({});
Enterable.args = {
  overlay,
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
  trigger: 'click',
};
