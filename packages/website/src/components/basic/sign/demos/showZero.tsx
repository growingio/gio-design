import React, { useState } from 'react';
import Sign from '@gio-design/components/es/components/sign';
import '@gio-design/components/es/components/sign/style/css.js';
import Checkbox from '@gio-design/components/es/components/checkbox';
import '@gio-design/components/es/components/checkbox/style/css.js';
import './demo.less';

export default () => {
  const [showZero, setShowZero] = useState(false);

  return (
    <div className="demo-line">
      <div className="demo-quarter-line">
        <Sign count={0} showZero={showZero}>
          <span className="demo-placeholder" />
        </Sign>
      </div>
      <div className="demo-quarter-line">
        <Checkbox
          checked={showZero}
          onChange={(e: any) => setShowZero(e.target.checked)}
        >
          toggle showZero
        </Checkbox>
      </div>
    </div>
  );
};
