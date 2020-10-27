/**
 * title: 填满底色的 Radio.Button
 * desc: 选中时被实色填底的单选按钮样式的 Radio.Button
 */

import React, { useState } from 'react';
import Radio from '@gio-design/components/es/components/radio';
import '@gio-design/components/es/components/radio/style/css.js';

export default () => {
  const [radio1, setRadio1] = useState('beijing');
  const [radio2, setRadio2] = useState('hangzhou');

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group buttonStyle="filled" value={radio1} onChange={(e) => setRadio1(e.target.value)}>
          <Radio.Button value="beijing">Beijing</Radio.Button>
          <Radio.Button value="hangzhou">Hangzhou</Radio.Button>
          <Radio.Button value="shanghai">Shanghai</Radio.Button>
          <Radio.Button value="shenzhen">ShenZhen</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group
          buttonStyle="filled"
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
    </>
  );
};
