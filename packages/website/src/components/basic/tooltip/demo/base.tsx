import React from 'react';
import { Tooltip } from '@gio-design/components';
import '@gio-design/components/es/components/tooltip/style/index.css';
import './index.less';

export default () => (
  <>
    <div className="tooltip-top">
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="topLeft"
      >
        <span className="tooltipSpan">TopLeft</span>
      </Tooltip>
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="top"
      >
        <span className="tooltipSpan">Top</span>
      </Tooltip>
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="topRight"
      >
        <span className="tooltipSpan">TopRight</span>
      </Tooltip>
    </div>

    <div className="tooltip-left">
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="leftTop"
      >
        <span className="tooltipSpan">LeftTop</span>
      </Tooltip>
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="left"
      >
        <span className="tooltipSpan">Left</span>
      </Tooltip>
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="leftBottom"
      >
        <span className="tooltipSpan">LeftBottom</span>
      </Tooltip>
    </div>
    <div className="tooltip-right">
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="rightTop"
      >
        <span className="tooltipSpan">RightTop</span>
      </Tooltip>
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="right"
      >
        <span className="tooltipSpan">Right</span>
      </Tooltip>
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="rightBottom"
      >
        <span className="tooltipSpan">RightBottom</span>
      </Tooltip>
    </div>
    <div className="tooltip-buttom">
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="bottomLeft"
      >
        <span className="tooltipSpan">BottomLeft</span>
      </Tooltip>
      <Tooltip title="这里是提示文案。" placement="bottom">
        <span className="tooltipSpan">Bottom</span>
      </Tooltip>
      <Tooltip
        title="这里是提示文案。"
        tooltipLink={{ name: '点击这里', link: 'www.growingio.com' }}
        placement="bottomRight"
      >
        <span className="tooltipSpan">BottomRight</span>
      </Tooltip>
    </div>
  </>
);
