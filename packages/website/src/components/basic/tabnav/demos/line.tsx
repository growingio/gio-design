import React from 'react';
import { TabNav } from '@gio-design/components';
import '@gio-design/components/es/components/tabnav/style/index.css';
import './index.less';
const Item = TabNav.Item;

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
    <TabNav size="large" type="line">
      {renderItem()}
    </TabNav>
    <hr />
    <TabNav size="middle" type="line">
      {renderItem()}
    </TabNav>
    <hr />
    <TabNav size="small" type="line">
      {renderItem()}
    </TabNav>
  </div>
);
