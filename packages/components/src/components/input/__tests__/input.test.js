import React from 'react';
import { mount } from 'enzyme';
import Input from '..';

describe('Input', () => {
  it('should support maxLength', () => {
    const wrapper = mount(<Input maxLength={3} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support size', () => {
    const wrapper = mount(<Input size="large" />);
    expect(wrapper.find('input').hasClass('gio-input-content-large')).toBe(true);
    expect(wrapper.render()).toMatchSnapshot();
  });
});

describe('Input.Password', () => {
  it('should change type when click', () => {
    const wrapper = mount(<Input.Password />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.gio-input-container-suffix-icon').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.gio-input-container-suffix-icon').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });
});

describe('Input.InputNumber', () => {
  it('should change type when click', () => {
    const wrapper = mount(<Input.InputNumber onChange={() => {}} />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('input').simulate('change', { target: { value: 1 } });
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.gio-input-container-suffix-iconGroup-top').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.gio-input-container-suffix-iconGroup-bottom').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });
});

describe('Input.TextArea', () => {
  it('should support disabled', () => {
    const wrapper = mount(<Input.TextArea disabled />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support maxLength', () => {
    const wrapper = mount(<Input.TextArea maxLength={10} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
