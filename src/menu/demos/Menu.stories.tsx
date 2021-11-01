import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { AppOutlined, MapChartOutlined, CalendarOutlined } from '@gio-design/icons';
import Menu, { MenuItem, SubMenu } from '../index';
import { IMenuProps, IMenuItemProps, ISubMenuProps } from '../interface';
import Docs from './MenuPage';
import '../style';
import '../style/demo.stories.less';

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: { MenuItem, SubMenu },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Vertical: Story<IMenuProps & ISubMenuProps & IMenuItemProps> = (args) => {
  const { disabled, inlineCollapsed, title, expandIcon } = args;
  const [selectedKey, setSelectedKey] = useState('sub-menu-1-1');
  const handleClick = (e: any) => {
    setSelectedKey(e.key);
  };

  return (
    <div style={{ width: 240 }}>
      <Menu
        title={title}
        mode="vertical"
        selectedKey={selectedKey}
        inlineCollapsed={inlineCollapsed}
        onClick={handleClick}
        defaultOpenKeys={['sub-1']}
        style={{ height: 300 }}
      >
        <SubMenu disabled={disabled} key="sub-1" title="功能名称-1" icon={<AppOutlined />} expandIcon={expandIcon}>
          <MenuItem key="sub-menu-1-1">功能名称-1-1</MenuItem>
          <MenuItem key="sub-menu-1-2">功能名称-1-2</MenuItem>
        </SubMenu>
        <SubMenu key="sub-2" title="功能名称-2" icon={<MapChartOutlined />}>
          <MenuItem key="sub-menu-2-1">功能名称-2-1</MenuItem>
          <MenuItem key="sub-menu-2-2">功能名称-2-2</MenuItem>
        </SubMenu>
        <SubMenu key="sub-3" title="功能名称-3" icon={<AppOutlined />}>
          <MenuItem key="sub-menu-3-1">功能名称-3-1</MenuItem>
          <MenuItem key="sub-menu-3-2">功能名称-3-2</MenuItem>
        </SubMenu>
        <SubMenu key="sub-4" title="功能名称-4" icon={<AppOutlined />}>
          <MenuItem key="sub-menu-4-1">功能名称-4-1</MenuItem>
          <MenuItem key="sub-menu-4-2">功能名称-4-2</MenuItem>
        </SubMenu>
        <MenuItem disabled={disabled} key="sub-5" icon={<CalendarOutlined />}>
          功能名称-5
        </MenuItem>
      </Menu>
    </div>
  );
};

Vertical.args = {
  disabled: true,
  inlineCollapsed: false,
  title: '标题',
  expandIcon: () => null,
};

export const Horizontal: Story<IMenuProps & ISubMenuProps & IMenuItemProps> = (args) => {
  const { disabled } = args;
  const [selectedKey, setSelectedKey] = useState('menu-1');
  const handleClick = (e: any) => {
    setSelectedKey(e.key);
  };

  return (
    <Menu mode="horizontal" selectedKey={selectedKey} onClick={handleClick}>
      <MenuItem key="menu-1">看板</MenuItem>
      <MenuItem disabled={disabled} key="menu-2">
        分析
      </MenuItem>
      <MenuItem key="menu-3">运营</MenuItem>
      <MenuItem key="menu-4">用户</MenuItem>
      <MenuItem key="menu-5">标签</MenuItem>
    </Menu>
  );
};

Horizontal.args = {
  disabled: false,
};
