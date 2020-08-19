import React from 'react';
import { Upload } from '@gio-design/components';
import '@gio-design/components/es/components/upload/style/css.js';
import { props, action } from './commonSets';

export default () => (
  <div>
    <div>
      <Upload type="drag" accept="image/*" style={{ margin: '10px 0' }} action={action} {...props} />
    </div>
    <div>
      <Upload type="drag" style={{ margin: '10px 0' }} action={action} {...props} />
    </div>
  </div>
);
