import React, { useState } from 'react';
import Sign from '@gio-design/components/es/components/sign';
import '@gio-design/components/es/components/sign/style/css.js';
import Checkbox from '@gio-design/components/es/components/checkbox';
import '@gio-design/components/es/components/checkbox/style/css.js';
import './demo.less';

export default () => {
  const [showZero, setShowZero] = useState(false);
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div className="demo-line">
        <div className="demo-half-line">
          <Sign count={0} showZero={showZero}>
            <span className="demo-placeholder" />
          </Sign>
        </div>
        <div className="demo-half-line">
          <Checkbox
            checked={showZero}
            onChange={(e: any) => setShowZero(e.target.checked)}
          >
            toggle showZero
          </Checkbox>
        </div>
      </div>
      <div className="demo-line">
        <div className="demo-half-line">
          <div className="demo-line">
            <Sign count={12} visible={visible}>
              <span className="demo-placeholder" />
            </Sign>
          </div>
          <div className="demo-line">
            <Sign variant="dot" visible={visible} />
          </div>
        </div>
        <div className="demo-half-line">
          <Checkbox
            checked={visible}
            onChange={(e: any) => setVisible(e.target.checked)}
          >
            toggle visible
          </Checkbox>
        </div>
      </div>
    </>
  );
};
