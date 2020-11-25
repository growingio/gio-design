import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'
import { AppOutlined } from '@gio-design/icons';
import Menu, { MenuItem, SubMenu } from './index'
import { IMenuProps, IMenuItemProps, ISubMenuProps, } from './interface'
import './style'
import './style/demo.less'

export default {
    title: 'Components/Basic/Menu',
    component: Menu,
    subcomponents: { MenuItem, SubMenu },
} as Meta;

const getSubMenu = (args : any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedKey, setSelectedKey] = useState('sub-menu-1-1');
  const handleClick = (e: any) => {
    setSelectedKey(e.key);
  };
  return (
    <div style={{ width: 240 }}>
      <Menu className="demo-menu-vertical" mode="vertical" selectedKey={selectedKey} onClick={handleClick}>
        <SubMenu {...args} key="sub-1" title="功能名称-1">
          <MenuItem key="sub-menu-1-1">功能名称-1-1</MenuItem>
          <MenuItem key="sub-menu-1-2">功能名称-1-2</MenuItem>
        </SubMenu>
        <SubMenu {...args} key="sub-2" title="功能名称-2">
          <MenuItem key="sub-menu-2-1">功能名称-2-1</MenuItem>
          <MenuItem key="sub-menu-2-2">功能名称-2-2</MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
};

const TemplateItem : Story<IMenuItemProps> = (args) => <MenuItem {...args} />
const MenuItems = TemplateItem.bind({});
MenuItems.args = {};

const Template : Story<IMenuProps> = (args) => (
  <Menu {...args}>
    <MenuItem {...MenuItems.args}>1</MenuItem>
    <MenuItem {...MenuItems.args}>2</MenuItem>
    <MenuItem {...MenuItems.args}>3</MenuItem>
    <MenuItem {...MenuItems.args}>4</MenuItem>
  </Menu>
)
export const Default = Template.bind({});
Default.args = {
    className: 'demo-menu-horizontal',
}

const SubTemplate : Story<ISubMenuProps> = (args) => <>{getSubMenu(args)}</>
export const SubMenus = SubTemplate.bind({});
SubMenus.args = {
    icon: <AppOutlined />,
}