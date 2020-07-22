import React from 'react';
import { Popover, Checkbox, CheckboxGroup, Link } from '@gio-design/components';
import '@gio-design/components/es/components/popover/style/index.css';
import './index.less';

export default () => (
  <>
    <Popover
      placement="top"
      contentArea={
        <>
          <p style={{ color: '#313e75', fontSize: '14px' }}>广告阶段</p>
          <CheckboxGroup>
            <Checkbox value="1">点击</Checkbox>
            <Checkbox value="2">到站访问</Checkbox>
            <Checkbox value="3">到站访问率</Checkbox>
          </CheckboxGroup>
          <p style={{ color: '#313e75', fontSize: '14px' }}>用户量</p>
          <CheckboxGroup>
            <Checkbox value="1">用户总量</Checkbox>
            <Checkbox value="2">新增</Checkbox>
            <Checkbox value="3">回访</Checkbox>
          </CheckboxGroup>
        </>
      }
    >
      <span className="popoverSpan">hover me</span>
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
    >
      <Link to="https://www.growingio.com" disabled>
        hover me
      </Link>
    </Popover>
  </>
);
