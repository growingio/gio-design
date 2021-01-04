import '@gio-design/components/es/components/form/style/index.css';

import React, { useState } from 'react';

import { Radio, Form } from '@gio-design/components';
import { SizeType } from '@gio-design/components/es/components/config-provider/SizeContext';

import InputsForm from './inputs';

const { Item } = Form;
const { Group } = Radio;
const sizes: SizeType[] = ['small', 'middle', 'large'];

const Size: React.FC = () => {
  const [size, setSize] = useState('small');
  return (
    <div>
      <Form name="size-control" layout="horizon">
        <Item label="表单尺寸">
          <Group value={size} onChange={(e) => setSize(e.target.value)}>
            {sizes.map((s) => (
              <Radio key={s} value={s}>
                {s}
              </Radio>
            ))}
          </Group>
        </Item>
      </Form>

      <br />

      <InputsForm name="size-form" size={size} />
    </div>
  );
};

export default Size;
