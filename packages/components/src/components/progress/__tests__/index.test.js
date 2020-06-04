import React from 'react';
import { shallow, mount } from 'enzyme';
import Progress from '..';

describe('Testing Progress', () => {
  it('should be able to render component', () => {
    const wrapper = mount(<Progress percent={30} type='line' />);
    expect(wrapper.find('.ant-progress-line').length).toBe(1);
  });

  it('should be able to render component', () => {
    const wrapper = mount(<Progress percent={30} type='circle' />);
    expect(wrapper.find('.ant-progress-circle').length).toBe(2);
  });
});
