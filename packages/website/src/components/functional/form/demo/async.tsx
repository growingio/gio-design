import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React from 'react';

import { Form, Input, Button } from '@gio-design/components';

const { Item } = Form;

export default (): JSX.Element => {
  return (
    <Form name="async-validate" layout="vertical">
      <Item
        name="username"
        label="用户名"
        required
        rules={[
          {
            validator(rule, value) {
              return new Promise((resolve, reject) => {
                if (value === 'lily') {
                  setTimeout(() => {
                    reject(new Error('用户名重复'));
                  }, 1000);
                } else {
                  resolve();
                }
              });
            },
          },
        ]}
      >
        <Input placeholder="请输入lily" />
      </Item>
      <Item name="password" label="密码" required>
        <Input.Password placeholder="Content" />
      </Item>

      <Item>
        <Button type="secondary">取消</Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Item>
    </Form>
  );
};
