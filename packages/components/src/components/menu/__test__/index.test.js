import React from 'react';
import { render } from 'enzyme';
import Menu from '../index';

const { SubMenu, MenuItemGroup, Item } = Menu;

describe('Menu', () => {
  it('renders correctly', () => {
    const testUnit = render(
      <div>
        <Menu
          onClick={() => {}}
          style={{ width: 240 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
          <SubMenu key='sub2' title={<span>Navigation Two</span>}>
            <Menu.Item key='5'>Option 5</Menu.Item>
            <Menu.Item key='6'>Option 6</Menu.Item>
            <SubMenu key='sub3' title='Submenu'>
              <Menu.Item key='7'>Option 7</Menu.Item>
              <Menu.Item key='8'>Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key='sub4' title={<span>Navigation Three</span>}>
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <Menu.Item key='11'>Option 11</Menu.Item>
            <Menu.Item key='12'>Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
    expect(testUnit).toMatchSnapshot();
  });
});
