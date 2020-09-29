import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React, { useState } from 'react';

import { Form, Input, Button } from '@gio-design/components';

const { Item } = Form;

export default (): JSX.Element => {
  const [formData, setFormData] = useState<any>({});
  const onValuesChange = (values: any, allValues: any) => {
    setFormData(allValues);
  };
  let pswFeedbackType: any = '';
  if (formData.password) {
    if (formData.password.length >= 8) {
      pswFeedbackType = 'success';
    } else {
      pswFeedbackType = 'warning';
    }
  }

  return (
    <Form name="validating-form" layout="vertical" onValuesChange={onValuesChange}>
      <Item
        name="username"
        label="用户名"
        required
        feedbackType={formData.username === '' ? 'error' : 'warning'}
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 4, message: '用户名太短' },
        ]}
      >
        <Input placeholder="Content" />
      </Item>
      <Item
        name="password"
        label="密码"
        required
        feedbackType={pswFeedbackType}
        rules={[
          {
            validator(rule, value) {
              const errors = [];
              const len = value.length;
              if (len === 0) {
                errors.push('请输入密码');
              } else if (len > 0 && len < 6) {
                errors.push('密码强度：低');
              } else if (len >= 6 && len < 8) {
                errors.push('密码强度：中');
              } else if (len >= 8) {
                return Promise.resolve();
              }

              return Promise.reject(errors);
            },
          },
        ]}
      >
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
