import { mount } from 'enzyme';
import React from 'react';

import { NodeData } from '../menu-item';
import Menu from '../menu';

describe('<Menu />', () => {
  it('should ignore empty node data', async () => {
    const menu = [] as NodeData[];
    const wrapper = mount(<Menu depth={1} dataSource={menu} />);

    expect(wrapper.find('.cascader-menu')).toHaveLength(0);
  });
});
