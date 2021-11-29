import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './SignPage';
import { ISignNumberProps } from '../interface';
import Sign from '../index';
import '../style';

export default {
  title: 'Upgraded/Sign',
  component: Sign,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41172',
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

const Template: Story<ISignNumberProps> = (args) => (
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
