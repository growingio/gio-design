import React from 'react';
import { Tooltip } from '@gio-design/components';
import '@gio-design/components/es/components/tooltip/style/index.css';

export default () => (
  <>
    <Tooltip title="这里是提示文案。" tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}>
      <span className="tooltipSpan" style={{ margin: '0 10px' }}>
        TopLeft
      </span>
    </Tooltip>
    <Tooltip title="这里是提示文案。" tooltipLink={{ link: 'www.growingio.com' }}>
      <span className="tooltipSpan" style={{ margin: '0 10px' }}>
        TopLeft
      </span>
    </Tooltip>
    <Tooltip title="这里是提示文案。" tooltipLink={{ name: '点击这里' }}>
      <span className="tooltipSpan" style={{ margin: '0 10px' }}>
        TopLeft
      </span>
    </Tooltip>
  </>
);
