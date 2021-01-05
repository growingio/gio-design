import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React, { useState } from 'react';

import { Form, FormLayout, Input, Radio } from '@gio-design/components';
import { FormLabelAlign } from '@gio-design/components/es/components/form/context';
import { IRadioChangeEvent } from '@gio-design/components/es/components/radio/interface';

const { Item } = Form;
const { Group } = Radio;

const layouts = [
  { label: '水平', value: 'horizontal' },
  { label: '垂直', value: 'vertical' },
  { label: '行内', value: 'inline' },
];

export default (): JSX.Element => {
  const [layout, setLayout] = useState(layouts[0].value);
  const [labelAlign, setLabelAlign] = useState<FormLabelAlign>('right');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const onFinish = (a: unknown) => {
    console.log(a);
  };
  const onChange = (e: IRadioChangeEvent) => {
    setLayout(e.target.value as FormLabelAlign);
  };

  return (
    <div>
      <Form name="control-form" labelWidth={100}>
        <Item name="layout" label="布局方式" initialValue={layout}>
          <Group value={layout} onChange={onChange}>
            {layouts.map((l) => (
              <Radio key={l.value} value={l.value}>
                {l.label}
              </Radio>
            ))}
          </Group>
        </Item>
      </Form>

      <Form name="demo-form" layout={layout as FormLayout} onFinish={onFinish} labelAlign={labelAlign} labelWidth={100}>
        <Item name="labelAlign" label="标签对齐方式" initialValue={labelAlign}>
          <Group value={labelAlign} onChange={(e) => setLabelAlign(e.target.value)} disabled={layout !== 'horizontal'}>
            <Radio value="left">left</Radio>
            <Radio value="right">right</Radio>
          </Group>
        </Item>

        <Item label="用户名" required>
          <Input name="username" value={name} onChange={(e) => setName(e.target.value)} />
        </Item>
        <Item label="密码" required>
          <Input.Password name="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        </Item>
      </Form>
    </div>
  );
};
