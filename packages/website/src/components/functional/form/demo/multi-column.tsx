import React from 'react';
import { Form, Input } from '@gio-design/components';

const { Item } = Form;

const items = [...new Array(6)];

const MultiColumn: React.FC = (props) => {
  return (
    <Form layout="inline">
      {items.map((_, i) => (
        <Item key={i} label={`label-${i}`}>
          <Input />
        </Item>
      ))}
    </Form>
  );
};

export default MultiColumn;
