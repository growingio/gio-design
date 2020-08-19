import React from 'react';
import { Upload } from '@gio-design/components';
import '@gio-design/components/es/components/upload/style/css.js';
import { props, action } from './commonSets';

export default () => (
  <div>
    <Upload style={{ margin: '0 5px' }} action={action} {...props} />
    <Upload style={{ margin: '0 5px' }} triggerProps={{ type: 'secondary' }} {...props} />
  </div>
);
