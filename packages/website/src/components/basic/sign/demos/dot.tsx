import React from 'react';
import Sign from '@gio-design/components/es/components/sign';
import '@gio-design/components/es/components/sign/style/css.js';

export default () => (
  <>
    <div className="demo-line">
      <Sign variant="dot" />
      <span className="demo-label">默认</span>
    </div>
    <div className="demo-line">
      <span className="demo-half-line">
        <Sign variant="dot" status="normal" />
        <span className="demo-label">正常</span>
      </span>
      <span className="demo-half-line">
        <Sign variant="dot" status="warning" />
        <span className="demo-label">警告</span>
      </span>
      <span className="demo-half-line">
        <Sign variant="dot" status="error" />
        <span className="demo-label">错误</span>
      </span>
      <span className="demo-half-line">
        <Sign variant="dot" status="disabled" />
        <span className="demo-label">禁用</span>
      </span>
    </div>
  </>
);
