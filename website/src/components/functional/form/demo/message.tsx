import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React from 'react';

import { Form, Input } from '@gio-design/components';
import { FormItemFeedbackType } from '@gio-design/components/es/components/form';

const { Item } = Form;

const messageTypes: FormItemFeedbackType[] = ['error', 'validating', 'warning', 'success'];

export default (): JSX.Element => {
  return (
    <Form name="message" labelWidth={120} layout="vertical">
      {messageTypes.map((msg) => (
        <Item
          key={msg}
          name={msg}
          label={msg}
          feedbackIcon
          feedback={`这是一个 ${msg} 类型的提示信息`}
          feedbackType={msg}
        >
          <Input placeholder={`${msg} 类型的提示信息`} name="name" id={msg} />
        </Item>
      ))}
    </Form>
  );
};
