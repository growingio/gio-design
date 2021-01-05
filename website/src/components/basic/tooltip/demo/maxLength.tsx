import React from 'react';
import { Tooltip } from '@gio-design/components';
import '@gio-design/components/es/components/tooltip/style/index.css';
import './index.less';

export default () => (
  <Tooltip
    title="这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。这是一个很长的描述。"
    tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
  >
    <span className="tooltipSpan">多行</span>
  </Tooltip>
);
