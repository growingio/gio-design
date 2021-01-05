import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React, { useState } from 'react';

import { Form, Input, Radio } from '@gio-design/components';

const { Item } = Form;
const { Group } = Radio;

export default (): JSX.Element => {
  const [requiredMark, setRequiredMark] = useState(true);

  return (
    <Form name="required_all" requiredMark={requiredMark}>
      <Item name="name1" label="必填" required>
        <Group onChange={(e) => setRequiredMark(e.target.value)} value={requiredMark}>
          <Radio value>Required</Radio>
          <Radio value="optional">Optional</Radio>
          <Radio value={false}>Hidden</Radio>
        </Group>
      </Item>

      <Item name="name2" label="必填" required>
        <Input placeholder="请输入用户名" />
      </Item>
      <Item name="name3" label="非必填">
        <Input placeholder="请输入密码" />
      </Item>
    </Form>
  );
};
