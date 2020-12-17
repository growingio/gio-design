import React from 'react';
import { TabNav, Sign } from '@gio-design/components';
import '@gio-design/components/es/components/tab-nav/style/index.css';
import './index.less';

const { Item } = TabNav;

const renderItem = () => (
  <>
    <Item>
      <Sign count={4} magnitude={100} offset={[15, 0]}>
        我的
      </Sign>
    </Item>
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
