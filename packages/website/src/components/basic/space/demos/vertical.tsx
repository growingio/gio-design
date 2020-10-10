import React from 'react';
import { Space, Button } from '@gio-design/components';
import '@gio-design/components/es/components/space/style/index.css';

const Vertical = () => {
  return (
    <Space direction="vertical">
      <Button>Button</Button>
      <Button>Button</Button>
    </Space>
  );
};

export default Vertical;
