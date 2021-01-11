import React from 'react';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { mount, render } from 'enzyme';
import Picker from '../index';

//  format: 'HH:mm:ss',
//   placeholder: '请选择时间',
//     onChange: console.log,
//     clearText: 'clear',
//     defaultOpen: false,
//     inputReadOnly: false,
//     style: {},
//     className: '',
//     inputClassName: '',
//     popupClassName: '',
//     popupStyle: {},
//     allowEmpty: true,
//     showHour: true,
//     showMinute: true,
//     showSecond: true,
//     hideDisabledOptions: false,
//     placement: 'bottomLeft',
//     use12Hours: false,
//     focusOnOpen: false,
// 打印快照
describe('Testing timepicker', () => {
  it('should match alert base snapshot.', () => {
    const wrapper = render(<Picker showMinute />);
    expect(wrapper).toMatchSnapshot();
  });
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
  //   // onchange 应该被调用
  //   it('onchange should be called', () => {
  //     const onClickMock = jest.fn();
  //     const wrapper = mount(<Picker onChange={onClickMock} />);
  //     wrapper.find('.gio-time-picker').simulate('click');
  //     expect(onClickMock).toBeCalled();
  //   });
  //  props test
  it('props test', () => {
    expect(
      mount(<Picker placeholder="我是测试数据" onCurrentSelectPanelChange />).exists('.gio-time-picker-panel-combobox')
    ).toMatchSnapshot();
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
  //   //  测试时间格式
  //   it('time formatte should  active ', () => {
  //     const wrapper = mount(<Picker format="HH" />);

  //     wrapper.find('.gio-time-picker-input').simulate('click');
  //     const lis = wrapper.find('.gio-time-picker-panel-select');
  //     expect(lis.at(0).find('li').length).toBe(24);
  //     expect(lis.at(1).find('li').length).toBe(60);
  //   });
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
