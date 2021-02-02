import React from 'react';
import { mount, render } from 'enzyme';
import { render as tlRender } from '@testing-library/react';
import { AppsFilled } from '@gio-design/icons';
import Menu, { MenuItem, SubMenu, Divider } from '..';

describe('Menu snapshots.', () => {
  it('should match horizontal snapshot.', () => {
    const onClickMock = jest.fn();
    const wrapper = render(
      <Menu className="demo-menu-horizontal" selectedKey="menu-1" onClick={onClickMock}>
        <MenuItem key="menu-1">看板</MenuItem>
        <MenuItem key="menu-2">分析</MenuItem>
        <MenuItem key="menu-3">运营</MenuItem>
        <MenuItem key="menu-4">用户</MenuItem>
        <MenuItem key="menu-5">标签</MenuItem>
      </Menu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match vertical snapshot.', () => {
    const onClickMock = jest.fn();
    const wrapper = render(
      <Menu className="demo-menu-vertical" mode="vertical" selectedKey="sub-1" onClick={onClickMock}>
        <SubMenu key="sub-1" title="功能名称-1">
          <MenuItem key="sub-menu-1-1">功能名称-1-1</MenuItem>
          <MenuItem key="sub-menu-1-2">功能名称-1-2</MenuItem>
        </SubMenu>
        <SubMenu key="sub-2" title="功能名称-2">
          <MenuItem key="sub-menu-2-1">功能名称-2-1</MenuItem>
          <MenuItem key="sub-menu-2-2">功能名称-2-2</MenuItem>
        </SubMenu>
      </Menu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick.', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(
      <Menu className="demo-menu-horizontal" selectedKey="menu-1" onClick={onClickMock}>
        <MenuItem key="menu-1">看板</MenuItem>
        <MenuItem key="menu-2">分析</MenuItem>
        <MenuItem key="menu-3">运营</MenuItem>
        <MenuItem key="menu-4">用户</MenuItem>
        <MenuItem key="menu-5">标签</MenuItem>
      </Menu>
    );
    wrapper.find('.gio-menu-item').at(1).simulate('click');
    expect(onClickMock).toBeCalled();
  });

  it('should change active MenuItem.', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(
      <Menu className="demo-menu-horizontal" onClick={onClickMock}>
        <MenuItem key="menu-1">看板</MenuItem>
        <MenuItem key="menu-2">分析</MenuItem>
        <MenuItem key="menu-3">运营</MenuItem>
        <MenuItem key="menu-4">用户</MenuItem>
        <MenuItem key="menu-5">标签</MenuItem>
      </Menu>
    );
    wrapper.setProps({ selectedKey: 'menu-2' });
    jest.useFakeTimers();
    wrapper.update();
    expect(wrapper.find('.gio-menu-item').at(1).hasClass('gio-menu-item-selected')).toBeTruthy();
  });

  test('title, verticalIndent, expandIcon', () => {
    const { getByText, getByTestId } = tlRender(
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

    expect(getByText('标题').className.includes('gio-menu-title')).toBe(true);
    expect(getByText('功能名称-1-1').parentElement.style.paddingLeft).toBe('48px');
    expect(getByText('功能名称-2-1').parentElement.style.paddingLeft).toBe('20px');
    expect(getByText('功能名称-2').nextSibling).toBe(null);
    expect(getByTestId('menu-divider')).toBeTruthy();
  });
});
