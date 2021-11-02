import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './SignPage';
import { ISignProps } from '../interface';
import Sign from '../index';
import '../style';

export default {
  title: 'Legacy/Sign',
  component: Sign,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1285%3A4670',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const style1 = {
  display: 'inline-block',
  width: '50%',
  marginBottom: '15px',
};

const style2 = {
  marginRight: '50px',
};

const style3 = {
  display: 'inline-block',
  width: '32px',
  height: '32px',
  verticalAlign: 'middle',
  backgroundColor: '#ebedf5',
  bordeRadius: '4PX',
};
const style4 = {
  display: 'inline-block',
  width: '25%',
  marginBottom: '15px',
};

const style5 = {
  display: 'inline-block',
  padding: '0 12px',
};

const Template: Story<ISignProps> = (args) => (
  <>
    <div style={style1}>
      <span style={style2}>
        <Sign {...args}>
          <span style={style3} />
        </Sign>
      </span>
      <span style={style2}>
        <Sign count={10} magnitude={10}>
          <span style={style3} />
        </Sign>
      </span>
      <br />
      <br />
      <span style={style2}>
        <Sign count={55} magnitude={100}>
          <span style={style3} />
        </Sign>
      </span>
      <span style={style2}>
        <Sign count={100} magnitude={100}>
          <span style={style3} />
        </Sign>
      </span>
    </div>
  </>
);

export const Default = Template.bind({});
Default.args = {
  count: 5,
  magnitude: 10,
  showZero: false,
  offset: [32, 32],
  placement: 'leftBottom',
};

const DotTemplate: Story<ISignProps> = (args) => (
  <div style={{ marginBottom: '15px' }}>
    <span style={style4}>
      <Sign {...args}>
        <span style={style5}>正常</span>
      </Sign>
    </span>
    <span style={style4}>
      <Sign {...args} status="warning">
        <span style={style5}>已禁用</span>
      </Sign>
    </span>
    <span style={style4}>
      <Sign {...args} status="error">
        <span style={style5}>异常</span>
      </Sign>
    </span>
    <span style={style4}>
      <Sign {...args} status="disabled">
        <span style={style5}>未检测到数据</span>
      </Sign>
    </span>
  </div>
);

export const DotSign = DotTemplate.bind({});
DotSign.args = {
  variant: 'dot',
  placement: 'left',
  status: 'normal',
};
