import React, { useState } from 'react';
import Menu, { MenuItem, SubMenu } from '@gio-design/components/es/components/menu';
import '@gio-design/components/es/components/menu/style/css.js';
import { App } from '@gio-design/icons';
import './demo.less';

export default () => {
  const [selectedKey, setSelectedKey] = useState('sub-menu-1-1');

  const handleClick = (e: any) => {
    console.log('===Log Start===');
    console.log(e);
    console.log('---Log End---');
    setSelectedKey(e.key);
  };

  return (
    <div style={{ width: 240 }}>
      <Menu className="demo-menu-vertical" mode="vertical" selectedKey={selectedKey} onClick={handleClick}>
        <SubMenu key="sub-1" title="功能名称-1" icon={<App />}>
          <MenuItem key="sub-menu-1-1">功能名称-1-1</MenuItem>
          <MenuItem key="sub-menu-1-2">功能名称-1-2</MenuItem>
        </SubMenu>
        <SubMenu key="sub-2" title="功能名称-2" icon={<App />}>
          <MenuItem key="sub-menu-2-1">功能名称-2-1</MenuItem>
          <MenuItem key="sub-menu-2-2">功能名称-2-2</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
};
