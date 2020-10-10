import '@gio-design/components/es/components/space/style/index.css';

import React, { useState } from 'react';

import { Space, Radio, Button, Link } from '@gio-design/components';
import { SpaceAlign } from '@gio-design/components/es/components/space/interface';

const { Group } = Radio;

const alignMap: SpaceAlign[] = ['start', 'center', 'end', 'baseline'];

export default () => {
  const [align, setAlign] = useState(alignMap[0]);
  return (
    <Space direction="vertical" size="large">
      <Group value={align} onChange={(e) => setAlign(e.target.value)}>
        {alignMap.map((s) => (
          <Radio key={s} value={s}>
            {s}
          </Radio>
        ))}
      </Group>

      <Space align={align} style={{ border: '1px solid #eee' }}>
        <Button>Button</Button>
        <Button>Button</Button>
        <Link component="div">Button</Link>

        <div style={{ height: 100, background: 'gray' }}>block</div>
      </Space>
    </Space>
  );
};
