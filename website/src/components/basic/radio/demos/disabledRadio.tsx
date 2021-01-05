import React from 'react';
import Radio from '@gio-design/components/es/components/radio';
import '@gio-design/components/es/components/radio/style/css.js';

export default () => (
  <>
    <Radio disabled>Disabled</Radio>
    <Radio defaultChecked disabled>
      Checked Disabled
    </Radio>
  </>
);
