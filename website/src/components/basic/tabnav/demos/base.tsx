import React from 'react';
import { TabNav } from '@gio-design/components';
import '@gio-design/components/es/components/tab-nav/style/index.css';
import './index.less';

const { Item } = TabNav;

const renderItem = () => (
  <>
    <Item>我的</Item>
    <Item>全部</Item>
    <Item>共享</Item>
    <Item disabled>预置</Item>
  </>
);
export default () => (
  <div className="tabNav-display">
    <TabNav size="large">{renderItem()}</TabNav>
    <hr />
    <TabNav size="middle">{renderItem()}</TabNav>
    <hr />
    <TabNav size="small">{renderItem()}</TabNav>
    <hr />
    <TabNav size="xs">
      <Item>次</Item>
      <Item>人</Item>
      <Item>人均</Item>
      <Item disabled>人次</Item>
    </TabNav>
  </div>
);
