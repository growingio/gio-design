import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React from 'react';

import { Form, Input, Button, Alert } from '@gio-design/components';

const { Item } = Form;

export default (): JSX.Element => {
  return (
    <Form name="alert" labelWidth={120} style={{ width: 480 }}>
      <Alert
        showIcon
        // prettier-ignore
        message={(
          <div>
            <span>现在定义的是页面 </span>
            <a href="#alert">www.growingio.com/features/</a>
            <span>，查询条件为</span>
            <a href="#alert">id=9785&#x26;campaign=9785</a>
            <span>。</span>
          </div>
        )}
      />

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
          <Button htmlType="reset" type="secondary">
            重置
          </Button>
          <Button htmlType="submit">提交</Button>
        </div>
      </Item>
    </Form>
  );
};
