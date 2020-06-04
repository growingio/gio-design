import React from 'react';
import { shallow, mount } from 'enzyme';
import Radio from '..';

describe('Testing Radio', () => {
  it('should be able to render component', () => {
    const wrapper = mount(<Radio />);
    expect(wrapper.find('.ant-radio-wrapper').length).toBe(1);
  });
});
