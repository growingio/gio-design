import React from 'react';
import Sign from '@gio-design/components/es/components/sign';
import '@gio-design/components/es/components/sign/style/css.js';

export default () => (
  <div className="demo-line">
    <span className="demo-quarter-line">
      <Sign variant="dot" status="normal" placement="left">
        <span className="demo-label">正常</span>
      </Sign>
    </span>
    <span className="demo-quarter-line">
      <Sign variant="dot" status="warning" placement="left">
        <span className="demo-label">警告</span>
      </Sign>
    </span>
    <span className="demo-quarter-line">
      <Sign variant="dot" status="error" placement="left">
        <span className="demo-label">错误</span>
      </Sign>
    </span>
    <span className="demo-quarter-line">
      <Sign variant="dot" status="disabled" placement="left">
        <span className="demo-label">禁用</span>
      </Sign>
    </span>
  </div>
);
