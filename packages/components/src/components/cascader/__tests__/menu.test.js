import { mount } from 'enzyme';
import React from 'react';

import Menu from '../menu';

describe('<Menu />', () => {
  it('should render menu-item', async () => {
    const menu = [{ label: 'a', value: 1 }];
    const wrapper = mount(<Menu dataSource={menu} />);

    expect(wrapper.find('.cascader-menu .cascader-menu-item')).toHaveLength(1);
  });

  it('should ignore empty node data', async () => {
    const menu = [];
    const wrapper = mount(<Menu depth={1} dataSource={menu} />);

    expect(wrapper.find('.cascader-menu')).toHaveLength(0);
  });
});
