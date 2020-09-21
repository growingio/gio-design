import '@gio-design/components/es/components/form/style/index.css';

import React from 'react';

import { Form, Input } from '@gio-design/components';
import { FormItemFeedbackType } from '@gio-design/components/es/components/form';

const { Item } = Form;

const messageTypes: FormItemFeedbackType[] = ['validating', 'warning', 'error', 'success'];

export default (): JSX.Element => {
  return (
    <Form name="message" layout="horizon">
      <Item name="help" label="help" help="这是一个 help 类型的提示信息">
        <Input />
      </Item>
      {messageTypes.map((msg) => (
        <Item key={msg} name={msg} label={msg} feedback={`这是一个 ${msg} 类型的提示信息`} feedbackType={msg}>
          <Input placeholder={`${msg} 类型的提示信息`} name="name" id={msg} />
        </Item>
      ))}
    </Form>
  );
};
