/**
 * title: 按钮 Radio
 * desc: 按钮样式的 RadioGroup。<br />可以使用 `Radio.Button` 或在使用 `option` 时在 `Radio.Group` 中传入 `radioType="button"`
 */

import React, { useState } from 'react';
import Radio from '@gio-design/components/es/components/radio';
import '@gio-design/components/es/components/radio/style/css.js';

export default () => {
  const [radio1, setRadio1] = useState('beijing');
  const [radio2, setRadio2] = useState('hangzhou');
  const [radio3, setRadio3] = useState('beijing');

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group value={radio1} onChange={(e) => setRadio1(e.target.value)}>
          <Radio.Button value="beijing">Beijing</Radio.Button>
          <Radio.Button value="hangzhou">Hangzhou</Radio.Button>
          <Radio.Button value="shanghai">Shanghai</Radio.Button>
          <Radio.Button value="shenzhen">ShenZhen</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group
          value={radio2}
          onChange={(e) => setRadio2(e.target.value)}
          radioType="button"
          options={[
            {
              label: 'Beijing',
              value: 'beijing',
              disabled: true,
            },
            {
              label: 'Hangzhou',
              value: 'hangzhou',
            },
            {
              label: 'Shanghai',
              value: 'shanghai',
            },
            {
              label: 'ShenZhen',
              value: 'shenzhen',
            },
          ]}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group direction="vertical" value={radio3} onChange={(e) => setRadio3(e.target.value)}>
          <Radio.Button value="beijing" disabled>
            Beijing
          </Radio.Button>
          <Radio.Button value="hangzhou">Hangzhou</Radio.Button>
          <Radio.Button value="shanghai">Shanghai</Radio.Button>
          <Radio.Button value="shenzhen">ShenZhen</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
};
