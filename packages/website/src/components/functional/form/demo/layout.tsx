import React, { useState } from 'react';
import { Form, FormLayout, Input, Radio } from '@gio-design/components';

const { Item } = Form;
const { Group } = Radio;

const layouts = ['horizon', 'vertical', 'inline'];

export default (): JSX.Element => {
  const [layout, setLayout] = useState(layouts[0]);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const onFinish = (a: unknown) => {
    console.log(a);
  };
  const onChange = (e: any) => {
    setLayout(e.target.value);
  };

  return (
    <Form layout={layout as FormLayout} onFinish={onFinish}>
      <Item name="layout" label="布局方式">
        <Group value={layout} onChange={onChange}>
          {layouts.map((l) => (
            <Radio key={l} value={l}>
              {l}
            </Radio>
          ))}
        </Group>
      </Item>
      <Item label="用户名" required>
        <Input name="username" value={name} onChange={setName} />
      </Item>
      <Item label="密码" required>
        <Input name="password" value={pass} onChange={setPass} />
      </Item>
    </Form>
  );
};
