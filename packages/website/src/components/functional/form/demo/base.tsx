import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React from 'react';

import { Form, Button, Input } from '@gio-design/components';

const { Item, useForm } = Form;

interface Props {
  name: string;
}

export default ({ name = 'base' }: Props): JSX.Element => {
  const [form] = useForm();
  const onFinish = (formData: any) => {
    console.log(formData);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form name={name} form={form} layout="vertical" onFinish={onFinish}>
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
