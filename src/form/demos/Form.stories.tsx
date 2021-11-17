import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Form, { useForm } from '../index';
import Item from '../Item';
import Docs from './FormPage';
import { Props, FormItemProps } from '../interface';
import '../style';
import '../../input/style';
import '../../button/style';
import '../style/demo.stories.less';
import { Button, Input } from '../../index';
import Modal from '../../modal';

export default {
  title: 'Upgraded/Form',
  component: Form,
  subcomponents: { Item },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const FormStory = (args: Props): JSX.Element => {
  const [form] = useForm();
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form {...args}>
      <Item
        name="username"
        label="用户名"
        required
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="请输入用户名" />
      </Item>
      <Item name="password" label="密码" required rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="请输入密码" />
      </Item>
      <Item>
        <div>
          <Button htmlType="reset" type="secondary" onClick={onReset}>
            重置
          </Button>
          <Button htmlType="submit">提交</Button>
        </div>
      </Item>
    </Form>
  );
};

// Form Story
const Template: Story<Props> = (args) => <>{FormStory(args)}</>;
export const Default = Template.bind({});
Default.args = {
  name: 'base',
};

// Form.Item Story
const TemplateItem: Story<FormItemProps> = (args) => (
  <Item {...args}>
    <Input placeholder="我是一个Item" />
  </Item>
);
export const FormItems = TemplateItem.bind({});
FormItems.args = {
  label: '用户名:',
  name: 'ok',
};

// Form with Modal Story
export const FormWithModal: Story<Props> = (args: Props) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  return (
    <div>
      <Button onClick={() => setVisible(true)}>click me</Button>
      <Modal
        visible={visible}
        title="新建账号"
        onOk={() => {
          setVisible(false);
        }}
        onClose={() => {
          setVisible(false);
        }}
        afterClose={() => {
          form.resetFields();
        }}
        style={{ width: 380 }}
      >
        <Form {...args} name="modal" form={form} labelWidth={60} layout="vertical">
          <Item label="用户名" name="username">
            <Input />
          </Item>
          <Item label="密码" name="password">
            <Input.Password />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

// Multiple Column Form Story
const items = [...new Array(6)];
export const MultipleForm: Story<Props> = (args) => (
  <Form {...args}>
    {items.map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <Item key={i} label={`label-${i}`} name={`inline-${i}`}>
        <Input />
      </Item>
    ))}
  </Form>
);
