import React from 'react';
import { Popover, Checkbox, CheckboxGroup, Link } from '@gio-design/components';
import '@gio-design/components/es/components/popover/style/index.css';
import './index.less';
import image from './2vcode.svg';

export default () => (
  <>
    <Popover
      placement="topLeft"
      contentArea={<img width={120} height={120} src={image} />}
      footerArea={<span className="button">下载二维码</span>}
      trigger="click"
    >
      <span className="popoverSpan">click me</span>
    </Popover>
    <Popover
      placement="bottomLeft"
      contentArea={
        <>
          <input className="displayInput" />
          <p
            style={{
              color: '#A3ADC8',
              fontSize: '12px',
              width: 220,
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            *此链接用于统计渠道点击数据，请用此链接替换点击跳转地址。
          </p>
        </>
      }
      footerArea={
        <span className="button" style={{ float: 'right' }}>
          复制链接
        </span>
      }
      trigger="click"
    >
      <span className="popoverSpan">click me</span>
    </Popover>
  </>
);
