import '@gio-design/components/es/components/form/style/index.css';

import React, { useRef, useState } from 'react';

import { Form, Input, Button, Radio } from '@gio-design/components';
import { FormInstance } from '@gio-design/components/es/components/form';

const { Item, useForm } = Form;
const { Group } = Radio;

export default (): JSX.Element => {
  const [requiredMark, setRequiredMark] = useState(true);
  const onChange = (e: any) => {
    setRequiredMark(e.target.value);
  };

  return (
    <Form name="required" requiredMark={requiredMark} initialValues={{ requiredMark }}>
      <Item name="requiredMark" label="requiredMark">
        <Group onChange={onChange}>
          <Radio value={true}>required</Radio>
          <Radio value="optional">optional</Radio>
          <Radio value={false}>hidden</Radio>
        </Group>
      </Item>

      <Item name="name1" label="非必填" required>
        <Input placeholder="请输入用户名" />
      </Item>
      <Item name="name2" label="选填">
        <Input placeholder="请输入密码" />
      </Item>
    </Form>
  );
};
