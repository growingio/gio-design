import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PopConfirm from '../PopConfirm';
import { PopConfirmProps } from '../interface';
import Input from '../../input';
import Button from '../../button';
import '../style';
import '../../popover/demos/demo.stories.less';
import Docs from './PopConfirmPage';

export default {
  title: 'Upgraded/PopConfirm',
  component: PopConfirm,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6392%3A67234',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<PopConfirmProps> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', width: '1500px' }}>
    <div style={{ margin: '200px 300px' }}>
      <div className="tooltip-top">
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="topLeft">
            <span className="popover-span">TopLeft</span>
          </PopConfirm>
        </span>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="top">
            <span className="popover-span">Top</span>
          </PopConfirm>
        </span>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="topRight">
            <span className="popover-span">TopRight</span>
          </PopConfirm>
        </span>
      </div>
      <div className="tooltip-left" style={{ marginLeft: '40px' }}>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="leftTop">
            <span className="popover-span">LeftTop</span>
          </PopConfirm>
        </span>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="left">
            <span className="popover-span">Left</span>
          </PopConfirm>
        </span>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="leftBottom">
            <span className="popover-span">LeftBottom</span>
          </PopConfirm>
        </span>
      </div>
      <div className="tooltip-right" style={{ marginLeft: '455px' }}>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="rightTop">
            <span className="popover-span">RightTop</span>
          </PopConfirm>
        </span>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="right">
            <span className="popover-span">Right</span>
          </PopConfirm>
        </span>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="rightBottom">
            <span className="popover-span">RightBottom</span>
          </PopConfirm>
        </span>
      </div>
      <div className="tooltip-buttom">
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="bottomLeft">
            <span className="popover-span">BottomLeft</span>
          </PopConfirm>
        </span>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="bottom">
            <span className="popover-span">Bottom</span>
          </PopConfirm>
        </span>
        <span className="popover-wrapper">
          <PopConfirm {...args} placement="bottomRight">
            <span className="popover-span">BottomRight</span>
          </PopConfirm>
        </span>
      </div>
    </div>
  </div>
);
const content = {
  title: '确定要删除……吗？',
  desc: '删除物品属性后，相关数据将停止计算，历史数据将会被保留。',
};
export const Placement = Template.bind({});
Placement.args = {
  arrowPointAtCenter: true,
  ...content,
};

const TriggerTemplate: Story<PopConfirmProps> = (args) => (
  <div style={{ margin: '200px 150px' }}>
    <span style={{ marginRight: 20 }}>
      <PopConfirm {...args} trigger="hover" placement="top">
        <Input value="Touch Me!" style={{ width: 100 }} />
      </PopConfirm>
    </span>
    <span style={{ marginRight: 20 }}>
      <PopConfirm {...args} trigger="focus" placement="top">
        <Input value="Focus Me!" style={{ width: 100 }} />
      </PopConfirm>
    </span>
    <span style={{ marginRight: 20 }}>
      <PopConfirm {...args} trigger={['focus', 'click']} placement="top">
        <Input value="Focus or Click Me!" style={{ width: 150 }} />
      </PopConfirm>
    </span>
    <span style={{ marginRight: 20 }}>
      <PopConfirm {...args} trigger="click" placement="top">
        <Input value="Click Me!" style={{ width: 100 }} />
      </PopConfirm>
    </span>
  </div>
);

export const Trigger = TriggerTemplate.bind({});
Trigger.args = {
  ...content,
};

const ControlTemplate: Story<PopConfirmProps> = (args) => {
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
            Show Confirm
          </Button>
          <Button onClick={hide} style={{ marginRight: 50 }}>
            Hide Confirm
          </Button>
          <PopConfirm
            {...args}
            visible={visible}
            placement="top"
            onVisibleChange={onVisibleChange}
            onCancel={hide}
            onConfirm={hide}
          >
            <Input value="Show Confirm Me!" />
          </PopConfirm>
        </div>
      </fieldset>
      <fieldset style={{ border: '1px solid var(--gray-2, #dfe4ee)', padding: '50px 20px' }}>
        <legend>Controlled by onVisibleChange</legend>
        <div style={{ marginRight: 20 }}>
          <Button onClick={show2} style={{ marginRight: 10 }}>
            Show Confirm
          </Button>
          <Button onClick={hide2} style={{ marginRight: 50 }}>
            Hide Confirm
          </Button>
          <PopConfirm
            {...args}
            visible={visible2}
            placement="top"
            onVisibleChange={onVisibleChange2}
            onCancel={hide2}
            onConfirm={hide2}
          >
            <Input value="Show Confirm Me!" />
          </PopConfirm>
        </div>
      </fieldset>
    </>
  );
};

export const Controlled = ControlTemplate.bind({});
Controlled.args = { ...content };

const DescTemplate: Story<PopConfirmProps> = (args) => (
  <>
    <PopConfirm {...args}>
      <Input value="Show Confirm with desc" style={{ width: 280 }} />
    </PopConfirm>
    <span>|</span>
    <PopConfirm {...args} desc="">
      <Input value="Show Confirm without desc" style={{ width: 280 }} />
    </PopConfirm>
  </>
);
export const Description = DescTemplate.bind({});
Description.args = {
  ...content,
  placement: 'topLeft',
};

const DisabledTemplate: Story<PopConfirmProps> = (args) => (
  <>
    <PopConfirm {...args}>
      <Input value="Disabled PopConfirm (未设置disabled)" style={{ width: 280 }} />
    </PopConfirm>
    <br />
    <br />
    <PopConfirm {...args} disabled>
      <Input value="Disabled PopConfirm （设置disabled={true}）" style={{ width: 320 }} />
    </PopConfirm>
  </>
);
export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  ...content,
};
