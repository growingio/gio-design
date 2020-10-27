import React, { useState } from 'react';
import Radio from '@gio-design/components/es/components/radio';
import '@gio-design/components/es/components/radio/style/css.js';

export default () => {
  const [radio1, setRadio1] = useState('a');
  const [radio2, setRadio2] = useState('b');
  const [radio3, setRadio3] = useState('c');

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group size="large" value={radio1} onChange={(e) => setRadio1(e.target.value)}>
          <Radio.Button value="a">A</Radio.Button>
          <Radio.Button value="b">B</Radio.Button>
          <Radio.Button value="c">C</Radio.Button>
          <Radio.Button value="d">D</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group size="middle" value={radio2} onChange={(e) => setRadio2(e.target.value)}>
          <Radio.Button value="a" disabled>
            A
          </Radio.Button>
          <Radio.Button value="b">B</Radio.Button>
          <Radio.Button value="c">C</Radio.Button>
          <Radio.Button value="d">D</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group size="small" value={radio3} onChange={(e) => setRadio3(e.target.value)}>
          <Radio.Button value="a" disabled>
            A
          </Radio.Button>
          <Radio.Button value="b">B</Radio.Button>
          <Radio.Button value="c">C</Radio.Button>
          <Radio.Button value="d">D</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
};
