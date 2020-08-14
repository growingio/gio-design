import React from 'react';
import { Upload } from '@gio-design/components';
import '@gio-design/components/es/components/upload/style/css.js';
import { props, action } from './commonSets';

export default () => (
  <div>
    <Upload type="avatar" style={{ margin: '0 5px' }} action={action} {...props}>
      GIO
    </Upload>
    <Upload type="avatar" style={{ margin: '0 5px' }} {...props}>
      GIO
    </Upload>
  </div>
);
