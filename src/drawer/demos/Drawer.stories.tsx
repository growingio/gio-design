import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { EditOutlined } from '@gio-design/icons';
import Drawer from '../index';
import Button from '../../button';
import { DrawerProps } from '../interfaces';
import Docs from './DrawerPage';
import '../style';
import Divider from '../../divider';
import { Card } from '../../card';
import Skeleton from '../../skeleton';

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
        onClose={(e) => {
          setVisible(false);
          action('onClose');
          console.log(e, 'onClose');
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: 'content',
};

export const Adaptive = Template.bind({});
Adaptive.args = {
  title: '标题',
  size: 'normal',
  children: '宽度由内容决定'.repeat(5),
};

export const Fixed = Template.bind({});
Fixed.args = {
  title: '标题',
  size: 'fixed',
  children: '固定宽度'.repeat(10),
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  title: '自定义宽度',
  width: 300,
  size: 'normal',
};

export const OnCloseAndAfterClose = Template.bind({});
OnCloseAndAfterClose.args = {
  title: '关闭后回调',
  afterClose: (e: any) => console.log(e, 'afterClose'),
};

export const Footer = Template.bind({});
Footer.args = {
  title: '带有footer的drawer',
  footer: (
    <>
      <Button style={{ width: '100%' }}>Footer</Button>
    </>
  ),
  afterClose: () => action('afterClose'),
};

export const Mask = Template.bind({});
Mask.args = {
  title: 'mask蒙板去除',
  mask: false,
};

export const Closable = Template.bind({});
Closable.args = {
  title: '无关闭按钮',
  closable: false,
};

export const CloseIcon = Template.bind({});
CloseIcon.args = {
  closeIcon: <EditOutlined />,
};

export const MaskStyleOrBodyStyle = Template.bind({});
MaskStyleOrBodyStyle.args = {
  title: 'maskStyle change',
  maskStyle: {
    background: 'gray',
  },
  bodyStyle: {
    background: 'orange',
  },
};

export const Demo: Story<DrawerProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Drawer</Button>
      <Drawer
        title="抽屉标题"
        size="fixed"
        data-testid="drawer"
        visible={visible}
        onClose={() => {
          setVisible(false);
          action('onClose');
        }}
        footer={
          <div>
            <Button type="secondary">取消</Button>
            &nbsp;
            <Button>确定</Button>
          </div>
        }
      >
        <Card>
          <span
            style={{
              display: 'flex',
              height: 32,
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '24px' }}>标题</span>
            <Button type="secondary" prefix={<EditOutlined />}>
              编辑{' '}
            </Button>
          </span>
          <Divider />
          <Skeleton
            paragraph={{
              row: 5,
            }}
          />
        </Card>
      </Drawer>
    </div>
  );
};
