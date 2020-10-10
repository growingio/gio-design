import '@gio-design/components/es/components/space/style/index.css';

import React, { useState } from 'react';

import { Space, Radio, Button, Link } from '@gio-design/components';
import { SpaceSize } from '@gio-design/components/es/components/space/interface';

const { Group } = Radio;

const sizeMap: SpaceSize[] = ['small', 'middle', 'large'];

export default () => {
  const [size, setSize] = useState(sizeMap[0]);
  return (
    <Space direction="vertical" size="large">
      <Group value={size} onChange={(e) => setSize(e.target.value)}>
        {sizeMap.map((s) => (
          <Radio key={s} value={s}>
            {s}
          </Radio>
        ))}
      </Group>

      <Space size={size}>
        <Button>Button</Button>
        <Button>Button</Button>
        <Link component="div">Button</Link>
      </Space>
    </Space>
  );
};
