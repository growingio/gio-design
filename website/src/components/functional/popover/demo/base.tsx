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
          <p className="title">广告阶段</p>
          <CheckboxGroup>
            <Checkbox value="1">点击</Checkbox>
            <Checkbox value="2">到站访问</Checkbox>
            <Checkbox value="3">到站访问率</Checkbox>
          </CheckboxGroup>
          <p className="title" style={{ marginTop: 32 }}>
            用户量
          </p>
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
          <p className="desc">*此链接用于统计渠道点击数据，请用此链接替换点击跳转地址。</p>
        </>
      }
      footerArea={<span className="rightButton">复制链接</span>}
    >
      <Link to="https://www.growingio.com" disabled>
        hover me
      </Link>
    </Popover>
  </>
);
