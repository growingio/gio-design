import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './SignPage';
import { ISignNumberProps, TPlacement } from '../interface';
import Sign from '../index';
import '../style';
import Toggle from '../../toggle';

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

const ShadowSpan = () => (
  <div
    style={{
      display: 'inline-block',
      width: '32px',
      height: '32px',
      verticalAlign: 'middle',
      backgroundColor: '#ebedf5',
      borderRadius: '4px',
    }}
  />
);

export const Default = (args: ISignNumberProps) => (
  <>
    <Sign count={10} magnitude={100} {...args}>
      <ShadowSpan />
    </Sign>
  </>
);
Default.args = {};
export const ShowZero = () => (
  <>
    <Sign count={0} magnitude={10} showZero>
      <ShadowSpan />
    </Sign>
  </>
);

export const Magnitude = () => (
  <>
    <Sign count={11} magnitude={10}>
      <ShadowSpan />
    </Sign>
  </>
);

export const Count = () => (
  <>
    <Sign count={99} magnitude={100}>
      <ShadowSpan />
    </Sign>
  </>
);

export const Offset = () => (
  <>
    <Sign count={9} magnitude={10} offset={[10, 10]}>
      <ShadowSpan />
    </Sign>
  </>
);

export const Visible = () => {
  const [vis, setVis] = useState(true);
  return (
    <>
      <Toggle
        onChange={() => setVis(!vis)}
        on={vis}
        checkedChildren={<span>on</span>}
        uncheckedChildren={<span>off</span>}
      />
      <Sign count={9} magnitude={10} visible={vis}>
        <ShadowSpan />
      </Sign>
    </>
  );
};
const placementArr = ['top', 'right', 'bottom', 'left', 'rightTop', 'rightBottom', 'leftTop', 'leftBottom'];
export const Placement = () => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    {placementArr.map((e) => (
      <Sign count={9} magnitude={10} placement={e as TPlacement}>
        <div
          style={{
            display: 'inline-block',
            height: '26px',
            verticalAlign: 'middle',
            backgroundColor: '#ebedf5',
            borderRadius: '4px',
            padding: '5px 10px',
          }}
        >
          {e}
        </div>
      </Sign>
    ))}
  </div>
);
