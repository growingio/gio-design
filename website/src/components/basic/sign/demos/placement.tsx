import React, { useState } from 'react';
import Sign, { TPlacement } from '@gio-design/components/es/components/sign';
import '@gio-design/components/es/components/sign/style/css.js';
import Checkbox from '@gio-design/components/es/components/checkbox';
import '@gio-design/components/es/components/checkbox/style/css.js';

import './demo.less';

const placements: TPlacement[] = [
  'top',
  'right',
  'bottom',
  'left',
  'rightTop',
  'rightBottom',
  'leftTop',
  'leftBottom',
];

export default () => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="demo">
      <div className="demo-line">
        <Checkbox
          checked={visible}
          onChange={(e: any) => setVisible(e.target.checked)}
        >
          toggle visible
        </Checkbox>
      </div>
      <div className="demo-line">
        {placements.map((p, index) => (
          <div key={p} className="demo-quarter-line">
            <Sign count={4} placement={p} visible={visible}>
              <span className="demo-placeholder" />
            </Sign>
            <Sign variant="dot" placement={p} visible={visible}>
              <span className="demo-placeholder" />
            </Sign>
          </div>
        ))}
      </div>
    </div>
  );
};
