import React, { useState } from 'react';

import { DownFilled, UpFilled } from '@gio-design/icons';
import { Form, Input, Select, Toggles, Button } from '@gio-design/components';

const { Item } = Form;

const options = [
  { label: '普通成员', value: '0' },
  { label: '管理员', value: '1' },
  { label: '超级管理员', value: '2' },
];

const Expand: React.FC = () => {
  const [expand, setExpand] = useState(false);
  const onClick = () => {
    setExpand(!expand);
  };

  return (
    <div style={{ width: 340, boxShadow: '0 0 8px rgba(0,0,0,0.15)', padding: 20 }}>
      <h4 style={{ fontSize: 16, textAlign: 'center' }}>新建账号</h4>
      <Form name="expand" requiredMark="optional" layout="vertical">
        <Item name="username" label="用户名" required>
          <Input placeholder="请输入用户名" />
        </Item>
        <Item name="account" label="账号" required>
          <Input placeholder="例如：xx@mail.com" />
        </Item>
        <Item name="password" label="设置密码" required>
          <Input placeholder="请输入密码" type="password" />
        </Item>
        <Item name="role" label="选择角色" required>
          <Select options={options} width={300} />
        </Item>

        {expand && (
          <div className="expand-fields">
            <Item label="备注" name="note">
              <Input placeholder="请输入备注" />
            </Item>
            <Item name="remember-pass" label="记住密码">
              <Toggles />
            </Item>
          </div>
        )}

        <button type="button" style={{ border: 'none', background: 'none' }} onClick={onClick}>
          <span>
            展示更
            {expand ? '少' : '多'}
          </span>
          {expand ? <UpFilled /> : <DownFilled />}
        </button>

        <Item>
          <div style={{ marginLeft: 'auto' }}>
            <Button type="secondary">取消</Button>
            <Button type="secondary" disabled>
              保存
            </Button>
          </div>
        </Item>
      </Form>
    </div>
  );
};

export default Expand;
