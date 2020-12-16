import '@gio-design/components/es/components/form/style/index.css';

import React, { useState } from 'react';

import { DownFilled, UpFilled } from '@gio-design/icons';
import { Modal, Form, Input, Select, Toggles, Button } from '@gio-design/components';

const { Item } = Form;

const options = [
  { label: '普通成员', value: '0' },
  { label: '管理员', value: '1' },
  { label: '超级管理员', value: '2' },
];

const Expand: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [expand, setExpand] = useState(false);
  const onClick = () => {
    setExpand(!expand);
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>click me</Button>

      <Modal
        visible={visible}
        title="新建账号"
        style={{ width: 360 }}
        bodyStyle={{ minHeight: 370 }}
        onClose={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
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
            <Select options={options} style={{ width: 300 }} />
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
        </Form>
      </Modal>
    </div>
  );
};

export default Expand;
