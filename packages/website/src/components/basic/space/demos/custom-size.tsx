import '@gio-design/components/es/components/space/style/index.css';

import React, { useState } from 'react';

import { Space, Button, Link } from '@gio-design/components';
import { SpaceSize } from '@gio-design/components/es/components/space/interface';

export default () => {
  const [size, setSize] = useState(8);
  return (
    <Space direction="vertical" size="large">
      <input
        value={size}
        type="range"
        min="0"
        max="100"
        onChange={(e) => setSize(+e.target.value)}
        style={{ width: 300 }}
      />

      <Space size={size}>
        <Button>Button</Button>
        <Button>Button</Button>
        <Link component="div">Button</Link>
      </Space>
    </Space>
  );
};
