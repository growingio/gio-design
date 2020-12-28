import React, { useState, createRef } from 'react';
import { Select, Radio } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';
import '@gio-design/components/es/components/radio/style/css.js';

import { SizeType } from '@gio-design/components/es/components/config-provider/SizeContext';
import options, { optionsWithoutGroup } from './options';

const Basics = (): React.ReactNode => {
  const [size, setSize] = useState<SizeType>('middle');
  const selectRef = createRef<HTMLElement>();
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          <Radio value="large">大</Radio>
          <Radio value="middle">中</Radio>
          <Radio value="small">小</Radio>
        </Radio.Group>
      </div>
      <div>
        <Select options={optionsWithoutGroup} allowClear size={size} style={{ width: 190 }} placeholder="请选择" />
      </div>
    </>
  );
};

export default Basics;
