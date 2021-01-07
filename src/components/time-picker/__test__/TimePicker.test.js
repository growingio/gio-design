import React from 'react';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import Picker from '../index';

describe('Testing timepicker', () => {
  // 测试组件是否正常渲染
  it('should render a DOM', () => {
    const wrapper = mount(<Picker className="test-cls" />);
    expect(wrapper.find('.gio-time-picker')).toHaveLength(1);
  });
  // 测试点击输入框时是否弹面板框
  it('panel should popup corretly', () => {
    const wrapper = mount(<Picker />);
    wrapper.find('.gio-time-picker-input').simulate('click');
    expect(wrapper.exists('.gio-time-picker-panel')).toBe(true);
  });
  // 测试选择面板数据之前是否为空
  it('before select value is none ', () => {
    const wrapper = mount(<Picker />);
    expect(wrapper.find('.gio-time-picker-input').text()).toBe('');
  });
  // 测试点击输入框后，弹出面板数据是否正确
  it('triggle and value is incurrent ', () => {
    const wrapper = mount(<Picker />);

    wrapper.find('.gio-time-picker-input').simulate('click');
    const lis = wrapper.find('.gio-time-picker-panel-select');
    expect(lis.at(0).find('li').length).toBe(24);
    expect(lis.at(1).find('li').length).toBe(60);
  });

  // 测试选择内容后 内容非空
  //   it(' selected and value is alive ', () => {
  //     act(() => {
  //       const wrapper = mount(<Picker />);
  //       expect(wrapper.find('.gio-time-picker-input').text()).toBe('');

  //       wrapper.find('.gio-time-picker-input').simulate('click');
  //       const liLeft = wrapper.find('.gio-time-picker-panel-select').at(0);
  //       const liRight = wrapper.find('.gio-time-picker-panel-select').at(1);
  //       //   liLeft.find('li').simulate('click');
  //       //   liRight.find('li').simulate('click');
  //       wrapper.find('li').first().simulate('click');
  //       wrapper.find('li').last().simulate('click');
  //     });
  //     waitFor(() => {
  //       expect(wrapper.find('.gio-time-picker-input').text()).toBe('00:00');
  //     });
  //   });
  //   测试删除内容后  内容消失
  //   it('delete content and content disapper', () => {
  //     const wrapper = mount(<Picker />);
  //     wrapper.find('.gio-time-picker-clear').simulate('click');
  //     expect(wrapper.find('.gio-time-picker-input')).toBe('');
  //   });
});
