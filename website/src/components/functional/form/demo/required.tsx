import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React from 'react';

import { Form, Input, Button } from '@gio-design/components';

const { Item } = Form;

export default (): JSX.Element => {
  return (
    <Form name="required" requiredMark>
      <Item name="name1" label="必填" required>
        <Input placeholder="请输入用户名" />
      </Item>

      <Item name="name2" label="非必填">
        <Input placeholder="请输入用户名" />
      </Item>
      <Item name="name3" label="非必填">
        <Input placeholder="请输入密码" />
      </Item>

      <Item name="name4" label="非必填">
        <Input placeholder="请输入密码" />
      </Item>

      <Item name="name5" label="非必填">
        <Input placeholder="请输入密码" />
      </Item>

      <Item name="name6" label="非必填">
        <Input placeholder="请输入密码" />
      </Item>

      <Item name="name7" label="非必填">
        <Input placeholder="请输入密码" />
      </Item>

      <Item>
        <Button>提交</Button>
        <Button type="secondary">取消</Button>
      </Item>
    </Form>
  );
};
