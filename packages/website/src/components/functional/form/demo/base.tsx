import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React from 'react';

import { Form, Input, Button } from '@gio-design/components';

const { Item, useForm } = Form;

interface Props {
  name: string;
}

export default ({ name = 'base' }): JSX.Element => {
  const [form] = useForm();
  const onFinish = (formData: any) => {
    console.log(formData);
    console.log(form);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form name={name} onFinish={onFinish} form={form}>
      <Item
        name="username"
        label="用户名"
        required
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="请输入用户名" />
      </Item>
      <Item name="password" label="密码" required rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input type="password" placeholder="请输入密码" />
      </Item>

      <Item>
        <div>
          <Button htmlType="submit">提交</Button>
          <Button htmlType="reset" type="secondary" onClick={onReset}>
            重置
          </Button>
        </div>
      </Item>
    </Form>
  );
};
