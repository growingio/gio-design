import React, { useState } from 'react';
import Radio from '@gio-design/components/es/components/radio';
import '@gio-design/components/es/components/radio/style/css.js';

export default () => {
  const [radio, setRadio] = useState('a');

  const handleChange = e => {
    console.log('===Log Start===');
    console.log(e.target.value);
    console.log('---Log End---');
    setRadio(e.target.value);
  };

  return (
    <Radio.Group
      value={radio}
      onChange={handleChange}
      options={[
        {
          label: 'validOptionA',
          value: 'validOptionA',
        },
        {
          label: 'validOptionDisabled',
          value: 'validOptionDisabled',
          disabled: true,
        },
        null,
        undefined,
      ]}
    >
      <Radio value="childA">validChildA</Radio>
      <Radio value="childDisabled" disabled>
        validChildDisabled
      </Radio>
      <div>This will be dropped.</div>
    </Radio.Group>
  );
};
