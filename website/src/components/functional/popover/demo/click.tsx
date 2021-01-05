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
      trigger="click"
    >
      <span className="popoverSpan">click me</span>
    </Popover>
    <Popover
      placement="bottomLeft"
      contentArea={
        <>
          <input className="displayInput" />
          <p className="desc">*此链接用于统计渠道点击数据，请用此链接替换点击跳转地址。</p>
        </>
      }
      footerArea={<span className="rightButton">复制链接</span>}
      trigger="click"
    >
      <span className="popoverSpan">click me</span>
    </Popover>
  </>
);
