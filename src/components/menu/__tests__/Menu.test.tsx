import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppsFilled } from '@gio-design/icons';
import { Vertical, Horizontal } from '../Menu.stories';
import Menu, { MenuItem, SubMenu, Divider } from '..';

describe('Testing Menu', () => {
  it('vertical menu', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<Vertical {...Vertical.args} />);
    expect(screen.getAllByText('功能名称', { exact: false })).toHaveLength(7);
  });

  it('horizontal', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<Horizontal {...Horizontal.args} />);
    expect(screen.getByText('看板')).not.toBeNull();
  });

  it('title, verticalIndent, expandIcon', () => {
    render(
      <Menu
        className="demo-menu-vertical"
        mode="vertical"
        selectedKey="sub-1"
        title="标题"
        defaultOpenKeys={['sub-1', 'sub-2']}
      >
        <SubMenu key="sub-1" title="功能名称-1" icon={<AppsFilled />}>
          <MenuItem key="sub-menu-1-1">功能名称-1-1</MenuItem>
          <MenuItem key="sub-menu-1-2">功能名称-1-2</MenuItem>
        </SubMenu>
        <SubMenu key="sub-2" title="功能名称-2" expandIcon={() => null}>
          <MenuItem key="sub-menu-2-1">功能名称-2-1</MenuItem>
          <MenuItem key="sub-menu-2-2">功能名称-2-2</MenuItem>
        </SubMenu>
        <Divider />
      </Menu>
    );
    expect(screen.getByText('标题').className.includes('gio-menu-title')).toBe(true);
    expect(screen.getByTestId('menu-divider')).toBeTruthy();
  });
});
