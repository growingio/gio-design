import React, { useState } from 'react';
import Menu, { MenuItem } from '@gio-design/components/es/components/menu';
import '@gio-design/components/es/components/menu/style/css.js';

export default () => {
  const [selectedKey, setSelectedKey] = useState('menu-1');

  const handleClick = (e: any) => {
    console.log('===Log Start===');
    console.log(e);
    console.log('---Log End---');
    setSelectedKey(e.key);
  };

  return (
    <Menu selectedKey={selectedKey} onClick={handleClick}>
      <MenuItem key="menu-1">看板</MenuItem>
      <MenuItem key="menu-2">分析</MenuItem>
      <MenuItem key="menu-3">运营</MenuItem>
      <MenuItem key="menu-4">用户</MenuItem>
      <MenuItem key="menu-5">标签</MenuItem>
    </Menu>
  );
};
