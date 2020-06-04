import React from 'react';
import { render, mount } from 'enzyme';
import TimePicker from '..';

describe('Testing TimePicker', () => {
  it('renders correctly', () => {
    const wrapper = render(<TimePicker />);
    expect(wrapper).toMatchSnapshot();
  });

  it('can be triggered', () => {
    const wrapper = mount(<TimePicker />);
    wrapper.find('.ant-time-picker').simulate('click');
    expect(document.querySelectorAll('.ant-time-picker-panel').length).toBe(1);
  });
});
