import React from 'react';
import { shallow, mount } from 'enzyme';
import Option from '..';

describe('Testing Option', () => {
  it('should be able to render component', () => {
    const wrapper = mount(<Option />);
    expect(wrapper.find('.gio-option').length).toBe(1);
  });

  it('should be able to render text currently ', () => {
    const content = <div className='contentXX'>contentXX</div>;
    const wrapper = shallow(<Option>{content}</Option>);
    expect(wrapper.find('.contentXX').length).toBe(1);
  });

  it('reacts on click', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Option onClick={onClick} />);
    wrapper.find('.gio-option').simulate('click');
    expect(onClick).toBeCalled();
  });
});
