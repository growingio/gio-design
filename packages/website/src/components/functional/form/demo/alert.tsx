import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React from 'react';

import { Form, Input, Button, Alert } from '@gio-design/components';
import { InformationFilled } from '@gio-design/icons';

const { Item } = Form;

export default (): JSX.Element => {
  return (
    <Form name="alert" labelWidth={120} style={{ width: 480 }}>
      <Alert
        // prettier-ignore
        message={(
          <div>
            <InformationFilled />
            <span> 现在定义的是页面 www.growingio.com/features/，查询条件为 id=9785&#x26;campaign=9785。</span>
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
