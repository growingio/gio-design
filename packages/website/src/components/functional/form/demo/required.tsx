import '@gio-design/components/es/components/form/style/index.css';

import React, { useRef, useState } from 'react';

import { Form, Input, Button } from '@gio-design/components';
import { FormInstance } from '@gio-design/components/es/components/form';

const { Item, useForm } = Form;

export default (): JSX.Element => {
  const [form] = useForm();
  const ref = useRef();
  const onFinish = (formData: any) => {
    console.log(formData);
    console.log(form);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form name="required" onFinish={onFinish} form={form}>
      <Item name="name" label="必填" required rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="请输入用户名" />
      </Item>
      <Item name="name2" label="非必填">
        <Input placeholder="请输入用户名" />
      </Item>
      <Item name="name3" label="选填" required="option">
        <Input placeholder="请输入密码" />
      </Item>
      <Item name="name4" label="选填" required="option" requireMarker="（自定提示）">
        <Input placeholder="请输入密码" />
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
