import React, { useState } from 'react';
import Radio from '@gio-design/components/es/components/radio';
import '@gio-design/components/es/components/radio/style/css.js';

export default () => {
  const [radio, setRadio] = useState('a');

  const handleChange = (e) => {
    console.log('===Log Start===');
    console.log(e.target.value);
    console.log('---Log End---');
    setRadio(e.target.value);
  };

  return (
    <Radio.Group value={radio} onChange={handleChange}>
      <Radio value="a">A</Radio>
      <Radio value="b">B</Radio>
      <Radio value="c">C</Radio>
    </Radio.Group>
  );
};
