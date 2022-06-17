import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { EditOutlined, ErrorOutlined } from '@gio-design/icons';
import Drawer from '../index';
import Button from '../../button';
import { DrawerProps } from '../interfaces';
import Docs from './DrawerPage';
import '../style';
import Divider from '../../divider';
import { Card } from '../../card';
import Skeleton from '../../skeleton';
import { Checkbox, DatePicker, Form, Input, Radio, Select, Toggle } from '../..';

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
          action('onClose');
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: 'content',
};

export const Adaptive = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Drawer</Button>
      <Drawer
        data-testid="drawer"
        title="标题"
        fixed={false}
        visible={visible}
        onClose={() => {
          setVisible(false);
          action('Adaptive')('onClose');
        }}
      >
        <div style={{ width: '640px', padding: '16px', minHeight: '300px', backgroundColor: '#e8e8e8' }}>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
        </div>
      </Drawer>
    </div>
  );
};

export const Fixed = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Drawer
        data-testid="drawer"
        title="抽屉标题抽屉标题抽屉标题抽屉标题抽屉标题抽屉标题抽屉标题抽屉标题抽屉标题"
        fixed
        visible={visible}
        onClose={() => {
          setVisible(false);
          action('Fixed')('onClose');
        }}
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
              编辑
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

export const CustomWidth = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Drawer
        data-testid="drawer"
        title="自定义宽度300px"
        fixed
        width={300}
        visible={visible}
        onClose={() => {
          setVisible(false);
          action('CustomWidth')('onClose');
        }}
      >
        <div style={{ padding: '16px', minHeight: '300px', backgroundColor: '#e8e8e8' }}>
          <p>{'content '.repeat(100)} ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
          <p>content ....</p>
        </div>
      </Drawer>
    </div>
  );
};

export const OnCloseAndAfterClose = Template.bind({});
OnCloseAndAfterClose.args = {
  title: '关闭后回调',
  afterClose: () => action('OnCloseAndAfterClose')('afterClose'),
};

export const Footer = () => {
  const [visible, setVisible] = useState(false);
  const footer = (
    <>
      <Button
        onClick={() => {
          setVisible(false);
        }}
        type="secondary"
      >
        取消
      </Button>
      <Button>确定</Button>
    </>
  );
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Drawer
        data-testid="drawer"
        title="带有footer的drawer"
        fixed
        visible={visible}
        footer={footer}
        onClose={() => {
          setVisible(false);
          action('CustomWidth')('onClose');
        }}
      >
        <Form
          name="form"
          layout="horizontal"
          labelWidth={100}
          initialValues={{
            inputNumber: 3,
            checkboxGroup: ['A', 'B'],
            pastTimePicker: 'day:8,1',
            switch: 1,
          }}
        >
          <Form.Item label="Plain Text">
            <span className="ant-form-text">China</span>
          </Form.Item>
          <Form.Item name="select" label="Select" rules={[{ required: true, message: 'Please select your country!' }]}>
            <Select placeholder="Please select a country">
              <Select.Option value="china">China</Select.Option>
              <Select.Option value="usa">U.S.A</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="InputNumber">
            <Input.InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="toggle" label="Toggle" valuePropName="checked">
            <Toggle />
          </Form.Item>

          <Form.Item name="datePicker" label="DatePicker">
            <DatePicker placeholder="Please..." />
          </Form.Item>
          <Form.Item name="radioGroup" label="Radio.Group">
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="checkboxGroup" label="Checkbox.Group">
            <Checkbox.Group layout="vertical">
              <Checkbox value="A" style={{ lineHeight: '32px' }}>
                A
              </Checkbox>

              <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                B
              </Checkbox>

              <Checkbox value="C" style={{ lineHeight: '32px' }}>
                C
              </Checkbox>

              <Checkbox value="D" style={{ lineHeight: '32px' }}>
                D
              </Checkbox>

              <Checkbox value="E" style={{ lineHeight: '32px' }}>
                E
              </Checkbox>

              <Checkbox value="F" style={{ lineHeight: '32px' }}>
                F
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
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
  closeIcon: <ErrorOutlined />,
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
