import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Switch from '..';

describe('Testing Select', () => {
  it('should be able to render component', () => {
    const wrapper = mount(<Switch />);
    expect(wrapper.find('.ant-switch').length).toBe(1);
  });

  it('can be changed', () => {
    const wrapper = mount(<Switch />);
    wrapper.find('.ant-switch').simulate('click');
    expect(wrapper.find('.ant-switch.ant-switch-checked').length).toBe(1);
  });
});
