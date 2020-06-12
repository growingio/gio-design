import React, { useState } from 'react';
import Radio from '@gio-design/components/es/components/radio';
import '@gio-design/components/es/components/radio/style/css.js';

export default () => {
  const [checked, setChecked] = useState(false);

  const handleChange = e => {
    console.log('===Log Start===');
    console.log(e.target.checked);
    console.log('---Log End---');
    setChecked(e.target.checked);
  };
  return (
    <>
      <Radio checked={checked} onChange={handleChange}>
        Normal
      </Radio>
      <Radio defaultChecked onChange={handleChange}>
        Default Checked
      </Radio>
    </>
  );
};
