import React from 'react';
import Sign from '@gio-design/components/es/components/sign';
import '@gio-design/components/es/components/sign/style/css.js';

import './demo.less';

export default () => (
  <>
    <div className="demo-half-line">
      <Sign count={4} magnitude={10} offset={[10, 10]}>
        <span className="demo-placeholder" />
      </Sign>
    </div>
    <div className="demo-half-line">
      <Sign count={10} magnitude={10}>
        <span className="demo-placeholder" />
      </Sign>
    </div>
    <div className="demo-half-line">
      <Sign count={44}>
        <span className="demo-placeholder" />
      </Sign>
    </div>
    <div className="demo-half-line">
      <Sign count={100}>
        <span className="demo-placeholder" />
      </Sign>
    </div>
  </>
);
