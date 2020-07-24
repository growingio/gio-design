import React from 'react';
import { Popover } from '@gio-design/components';
import '@gio-design/components/es/components/popover/style/index.css';
import './index.less';
import image from './2vcode.png';

const props = {
  contentArea: <img width={120} height={120} src={image} />,
  footerArea: <span className="centerButton">下载二维码</span>,
  trigger: 'click',
  arrowPointAtCenter: true,
};

export default () => (
  <>
    <div className="popover-top">
      <Popover placement="topLeft" {...props} arrowPointAtCenter={false}>
        <span className="popoverSpan">TopLeft</span>
      </Popover>
      <Popover placement="top" {...props}>
        <span className="popoverSpan">Top</span>
      </Popover>
      <Popover placement="topRight" {...props} arrowPointAtCenter={false}>
        <span className="popoverSpan">TopRight</span>
      </Popover>
    </div>

    <div className="popover-left">
      <Popover placement="leftTop" {...props}>
        <span className="popoverSpan">LeftTop</span>
      </Popover>
      <Popover placement="left" {...props}>
        <span className="popoverSpan">Left</span>
      </Popover>
      <Popover placement="leftBottom" {...props}>
        <span className="popoverSpan">LeftBottom</span>
      </Popover>
    </div>
    <div className="popover-right">
      <Popover placement="rightTop" {...props}>
        <span className="popoverSpan">RightTop</span>
      </Popover>
      <Popover placement="right" {...props}>
        <span className="popoverSpan">Right</span>
      </Popover>
      <Popover placement="rightBottom" {...props}>
        <span className="popoverSpan">RightBottom</span>
      </Popover>
    </div>
    <div className="popover-buttom">
      <Popover placement="bottomLeft" {...props} arrowPointAtCenter={false}>
        <span className="popoverSpan">BottomLeft</span>
      </Popover>
      <Popover placement="bottom" {...props}>
        <span className="popoverSpan">Bottom</span>
      </Popover>
      <Popover placement="bottomRight" {...props} arrowPointAtCenter={false}>
        <span className="popoverSpan">BottomRight</span>
      </Popover>
    </div>
  </>
);
