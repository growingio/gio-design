import React from 'react';
import moment, { Moment } from 'moment';
import { mount, render } from 'enzyme';
import { noop } from 'lodash';
import Picker from '../index';
import TimePicker from '../TimePicker';

// 打印快照
describe('Testing timepicker', () => {
  it('should match alert base snapshot.', () => {
    const wrapper = render(<Picker showMinute />);
    // expect(wrapper).toMatchSnapshot();
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
  // 挂载属性，卸载不报错
  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(<Picker />);
      wrapper.setProps({ inputClassName: 'inputclass' });
      wrapper.setProps({ use12Hours: true });
      wrapper.unmount();
    }).not.toThrow();
  });
  //  props test
  it('props test', async () => {
    const wrapper = mount(<Picker />);
    await wrapper.find('.gio-time-picker-input').simulate('click');
    const onClickMock = jest.fn();

    expect(
      mount(
        <Picker
          format="HH:mm:ss"
          placeholder="请选择时间"
          onChange={onClickMock}
          clearText="clear"
          defaultOpen={false}
          inputReadOnly={false}
          //   style={margin:auto}
          className=""
          inputClassName=""
          popupClassName=""
          //   popupStyle={}
          allowEmpty
          showHour
          showMinute
          showSecond
          hideDisabledOptions={false}
          placement="bottomLeft"
          use12Hours={false}
          focusOnOpen={false}
          //   defaultOpen={false}
          value={Moment}
          onAmPmChange={onClickMock}
          onPanelChange={onClickMock}
          onClear={onClickMock}
          onEsc={onClickMock}
          onKeyDown={onClickMock}
        />
      ).find('.gio-time-picker-panel-select')
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

  it('timepciker match snapshot1', () => {
    expect(
      <TimePicker
        format="HH:mm"
        placeholder="请选择时间"
        showSecond={false}
        onChange={noop}
        value={moment('2011-03-05T00:00:00.000Z')}
        defaultOpenValue={null}
      />
    ).toMatchSnapshot()
  })

  it('timepciker match snapshot2', () => {
    expect(
      <TimePicker
        format="HH:mm:ss"
        placeholder="请选择时间"
        showSecond
        onChange={noop}
        value={moment('2011-03-05T00:00:00.000Z')}
        defaultOpenValue={null}
      />
    ).toMatchSnapshot()
  })
});
