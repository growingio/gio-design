import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CardOutlined, RelationOutlined, CalendarOutlined } from '@gio-design/icons';
import Menu from '../index';
import { IMenuProps, IMenuItemProps, ISubMenuProps } from '../interface';
import Docs from './MenuPage';
import '../style';
import '../style/demo.stories.less';

export default {
  title: 'upgraded/Menu',
  component: Menu,
  subcomponents: { 'Menu.MenuItem': Menu.MenuItem, 'Menu.SubMenu': Menu.SubMenu, 'Menu.Divider': Menu.Divider },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Vertical: Story<IMenuProps & ISubMenuProps & IMenuItemProps> = (args) => {
  const { disabled, inlineCollapsed, title, expandIcon } = args;
  const [selectedKey, setSelectedKey] = useState('');
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
        defaultOpenKeys={[]}
        style={{ height: 300 }}
      >
        <Menu.SubMenu
          disabled={disabled}
          key="sub-1"
          title="功能名称-1"
          icon={<CardOutlined size="1em" />}
          expandIcon={expandIcon}
        >
          <Menu.MenuItem key="sub-menu-1-1">功能名称-1-1</Menu.MenuItem>
          <Menu.MenuItem key="sub-menu-1-2">功能名称-1-2</Menu.MenuItem>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="sub-2"
          title="功能名称-2功能名称-1-1功能名称-1-1功能名称-1-1功能名称-1-1功能名称-1-1功能名称-1-1"
          icon={<RelationOutlined size="1em" />}
        >
          <Menu.MenuItem key="sub-menu-2-1">
            功能名称-2-1功能名称-1-1功能名称-1-1功能名称-1-1功能名称-1-1功能名称-1-1功能名称-1-1功能名称-1-1
          </Menu.MenuItem>
          <Menu.MenuItem key="sub-menu-2-2">功能名称-2-2</Menu.MenuItem>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub-3" title="功能名称-3" icon={<CardOutlined size="1em" />}>
          <Menu.MenuItem key="sub-menu-3-1">功能名称-3-1</Menu.MenuItem>
          <Menu.MenuItem key="sub-menu-3-2">功能名称-3-2</Menu.MenuItem>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub-4" title="功能名称-4" icon={<CardOutlined size="1em" />}>
          <Menu.MenuItem key="sub-menu-4-1">功能名称-4-1</Menu.MenuItem>
          <Menu.MenuItem key="sub-menu-4-2">功能名称-4-2</Menu.MenuItem>
        </Menu.SubMenu>
        <Menu.MenuItem key="sub-5" icon={<CalendarOutlined size="1em" />}>
          fdlksfdlksfdsffdlksfdsffdlksfdsffdlksfdsffdlksfdsffdsf
        </Menu.MenuItem>
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
      <Menu.MenuItem key="menu-1">看板</Menu.MenuItem>
      <Menu.MenuItem disabled={disabled} key="menu-2">
        分析
      </Menu.MenuItem>
      <Menu.MenuItem key="menu-3">运营</Menu.MenuItem>
      <Menu.MenuItem key="menu-4">用户</Menu.MenuItem>
      <Menu.MenuItem key="menu-5">标签</Menu.MenuItem>
    </Menu>
  );
};

Horizontal.args = {
  disabled: false,
};

export const Demo = () => (
  <>
    <table className="table-demo">
      <tr>
        <th>Controls</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>Vertical</td>
        <td>
          <Vertical key={undefined} />
        </td>
      </tr>
      <tr>
        <td>horizontal</td>
        <td>
          <Horizontal key={undefined} />
        </td>
      </tr>
    </table>
  </>
);
