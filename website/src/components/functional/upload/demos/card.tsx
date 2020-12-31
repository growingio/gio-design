import React from 'react';
import { Upload } from '@gio-design/components';
import '@gio-design/components/es/components/upload/style/css.js';
import { props, action } from './commonSets';
import img from './fallback.png';

export default () => (
  <div>
    <Upload type="card" style={{ margin: '0 5px' }} action={action} {...props} successBorder />
    <Upload type="card" style={{ margin: '0 5px' }} {...props} successBorder file={{ dataUrl: img }}>
      GIO
    </Upload>
    <Upload type="card" style={{ margin: '0 5px' }} {...props} placeholderImg={img}>
      GIO
    </Upload>
  </div>
);
