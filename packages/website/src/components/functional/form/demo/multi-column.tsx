import React from 'react';
import { Form, Input } from '@gio-design/components';

const { Item } = Form;

const items = [...new Array(6)];

const MultiColumn: React.FC = () => {
  return (
    <Form layout="inline">
      {items.map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Item key={i} label={`label-${i}`} name={`inline-${i}`}>
          <Input />
        </Item>
      ))}
    </Form>
  );
};

export default MultiColumn;
