import React from 'react';
import { Popover, Checkbox, CheckboxGroup, Link } from '@gio-design/components';
import '@gio-design/components/es/components/popover/style/index.css';
import './index.less';
import image from './2vcode.png';

export default () => (
  <>
    <Popover
      placement="topLeft"
      contentArea={<img width={120} height={120} src={image} />}
      footerArea={<span className="centerButton">下载二维码</span>}
      arrowPointAtCenter={true}
    >
      <span className="popoverSpanInLine">
        Arrow points to center / 箭头指向中心
      </span>
    </Popover>
    <Popover
      placement="topLeft"
      contentArea={<img width={120} height={120} src={image} />}
      footerArea={<span className="centerButton">下载二维码</span>}
    >
      <span className="popoverSpanInLine">Align edge / 边缘对齐</span>
    </Popover>
  </>
);
