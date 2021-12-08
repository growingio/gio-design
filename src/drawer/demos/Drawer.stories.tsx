import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Drawer from '../index';
import Button from '../../button';
import { DrawerProps } from '../interfaces';
import Docs from './DrawerPage';
import '../style';

export default {
  title: 'Upgraded/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A44793',
      allowFullscreen: true,
    },
  },
} as Meta;

const Template: Story<DrawerProps> = (args) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Drawer</Button>
      <Drawer
        {...args}
        data-testid="drawer"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        <>宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开</>
      </Drawer>
    </div>
  );
};
export const AdaptiveWidthDemo = Template.bind({});
AdaptiveWidthDemo.args = {
  title: '标题',
  size: 'normal',
};

const FixedTemplate: Story<DrawerProps> = (args) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Drawer</Button>
      <Drawer
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500
      </Drawer>
    </div>
  );
};

export const fixedWidthDemo = FixedTemplate.bind({});
fixedWidthDemo.args = {
  title: '标题',
  size: 'fixed',
};
