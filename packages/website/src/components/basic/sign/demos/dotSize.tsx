import React from 'react';
import Sign from '@gio-design/components/es/components/sign';
import '@gio-design/components/es/components/sign/style/css.js';

export default () => (
  <>
    <div className="line">
      <Sign variant="dot" />
      <span className="demo-label">Normal</span>
    </div>
    <div className="line">
      <Sign variant="dot" size="small" />
      <span className="demo-label">Small</span>
    </div>
  </>
);
