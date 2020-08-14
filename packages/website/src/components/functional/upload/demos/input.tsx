import React from 'react';
import { Upload } from '@gio-design/components';
import '@gio-design/components/es/components/upload/style/css.js';
import { props, action } from './commonSets';

export default () => (
  <div>
    <div style={{ padding: '5px 0' }}>
      返回图片 url：
      <Upload type="input" action={action} {...props} />
    </div>
    <div style={{ padding: '5px 0' }}>
      返回图片 file：
      <Upload type="input" inputUploadType="file" action={action} {...props} />
    </div>
  </div>
);
