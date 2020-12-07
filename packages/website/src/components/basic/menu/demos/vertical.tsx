import React, { useState } from 'react';
import Menu, { MenuItem, SubMenu } from '@gio-design/components/es/components/menu';
import '@gio-design/components/es/components/menu/style/css.js';
import { AppOutlined, MapChartOutlined } from '@gio-design/icons';
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
        <SubMenu key="sub-1" title="功能名称-1" icon={<AppOutlined />}>
          <MenuItem key="sub-menu-1-1">功能名称-1-1</MenuItem>
          <MenuItem key="sub-menu-1-2" icon={<MapChartOutlined />}>
            功能名称-1-2
          </MenuItem>
        </SubMenu>
        <SubMenu key="sub-2" title="功能名称-2">
          <MenuItem key="sub-menu-2-1">功能名称-2-1</MenuItem>
          <MenuItem key="sub-menu-2-2" icon={<MapChartOutlined />}>
            功能名称-2-2
          </MenuItem>
        </SubMenu>
        <SubMenu key="sub-3" title="功能名称-3" icon={<AppOutlined />}>
          <MenuItem key="sub-menu-3-1">功能名称-3-1</MenuItem>
          <MenuItem key="sub-menu-3-2" icon={<MapChartOutlined />}>
            功能名称-3-2
          </MenuItem>
        </SubMenu>
        <SubMenu key="sub-4" title="功能名称-4" icon={<AppOutlined />}>
          <MenuItem key="sub-menu-4-1">功能名称-4-1</MenuItem>
          <MenuItem key="sub-menu-4-2" icon={<MapChartOutlined />}>
            功能名称-4-2
          </MenuItem>
        </SubMenu>
      </Menu>
      <hr />
      <Menu className="demo-menu-vertical" mode="vertical" selectedKey={selectedKey} onClick={handleClick}>
        <MenuItem key="menu-item-1">功能名称-1</MenuItem>
        <MenuItem key="menu-item-2">功能名称-2</MenuItem>
        <MenuItem key="menu-item-3" icon={<MapChartOutlined />}>
          功能名称-3
        </MenuItem>
        <MenuItem key="menu-item-4" icon={<MapChartOutlined />}>
          功能名称-4
        </MenuItem>
      </Menu>
    </div>
  );
};
