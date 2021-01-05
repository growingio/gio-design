import React, { useState } from 'react';

import { Modal, Button, Form, Input } from '@gio-design/components';

const { Item, useForm } = Form;

export default (): JSX.Element => {
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
    setTimeout(() => {
      form.resetFields();
    }, 500);
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>click me</Button>

      <Modal visible={visible} title="新建看板" onClose={onClose} onOk={onClose} style={{ width: 360 }}>
        <Form form={form} layout="vertical">
          <Item
            name="username"
            label="名字"
            required
            rules={[
              {
                validator(rule, value) {
                  if (value?.length > 1) {
                    return Promise.reject(new Error('看板名称重复'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="请输入看板的名称" />
          </Item>
          <Item label="描述" name="desc">
            <Input.TextArea />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};
