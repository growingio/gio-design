import React from 'react';
import moment, { Moment } from 'moment';
import { mount, render } from 'enzyme';
import { noop } from 'lodash';
import ReactDOM from 'react-dom';
import Picker from '../index';
import TimePicker from '../TimePicker';
import { clickInput, clickSelectItem, matchValue } from './util';

// 打印快照
describe('Testing timepicker', () => {
  it('should match alert base snapshot.', () => {
    // const wrapper = render(<Picker showMinute />);
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

describe('TimePicker', () => {
  let container;

  function renderPicker(props, options) {
    const showSecond = true;
    const format = 'HH:mm:ss';

    return mount(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('12:57:58', format)}
        {...props}
      />,
      options,
    );
  }

  function renderPickerWithoutSeconds(props) {
    const showSecond = false;
    const format = 'HH:mm';

    return mount(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('08:24', format)}
        {...props}
      />,
    );
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  describe('render panel to body', () => {
    it('popup correctly', async () => {
      const onChange = jest.fn();
      const picker = renderPicker({
        onChange,
      });
      expect(picker.state().open).toBeFalsy();
      matchValue(picker, '12:57:58');
      clickInput(picker);

      expect(picker.state().open).toBeTruthy();
      clickSelectItem(picker, 0, 1);

      expect(onChange).toBeCalled();
      expect(onChange.mock.calls[0][0].hour()).toBe(1);
      expect(onChange.mock.calls[0][0].minute()).toBe(57);
      expect(onChange.mock.calls[0][0].second()).toBe(58);
      matchValue(picker, '01:57:58');
      expect(picker.state().open).toBeTruthy();
    });

    it('destroy correctly', async () => {
      const picker = renderPicker({}, { attachTo: container });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      expect(document.querySelectorAll('.gio-time-picker').length).not.toBe(0);
      expect(picker.find('Panel li').length).toBeTruthy();
      picker.detach();

      expect(document.querySelectorAll('.gio-time-picker').length).toBe(0);
      expect(picker.instance().panelInstance).toBeFalsy();
    });

    it('support name', () => {
      const picker = renderPicker({
        name: 'time-picker-form-name',
      });
      expect(picker.find('.gio-time-picker-input').instance().name).toBe('time-picker-form-name');
    });

    it('support focus', () => {
      const picker = renderPicker({
        name: 'time-picker-form-name',
      });
      expect(typeof picker.instance().focus).toBe('function');
    });

    it('should be controlled by open', () => {
      const picker = renderPicker({
        open: false,
      });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeFalsy();
    });

    it('support custom icon', () => {
      const picker = renderPicker({
        inputIcon: 'test-select',
      });
      expect(picker.find('.gio-time-picker').text()).toBe('test-select');
    });
  });

  describe('render panel to body (without seconds)', () => {
    it('popup correctly', async () => {
      const onChange = jest.fn();
      const picker = renderPickerWithoutSeconds({
        onChange,
      });
      expect(picker.state().open).toBeFalsy();
      matchValue(picker, '08:24');
      clickInput(picker);

      expect(picker.find('.gio-time-picker-panel-inner').length).toBeTruthy();
      expect(picker.state().open).toBeTruthy();
      clickSelectItem(picker, 0, 1);

      expect(onChange).toBeCalled();
      expect(onChange.mock.calls[0][0].hour()).toBe(1);
      expect(onChange.mock.calls[0][0].minute()).toBe(24);
      matchValue(picker, '01:24');
      expect(picker.state().open).toBeTruthy();
    });
  });

  describe('render panel to body 12pm mode', () => {
    it('popup correctly', async () => {
      const onChange = jest.fn();
      const picker = renderPickerWithoutSeconds({
        use12Hours: true,
        value: null,
        onChange,
      });
      expect(picker.state().open).toBeFalsy();
      matchValue(picker, '');
      clickInput(picker);

      expect(picker.find('.gio-time-picker-panel-inner').length).toBeTruthy();
      expect(picker.state().open).toBeTruthy();
      clickSelectItem(picker, 0, 1);

      expect(onChange).toBeCalled();
      expect(picker.state().open).toBeTruthy();
    });
  });

  describe('other operations', () => {
    it('focus/blur correctly', async () => {
      let focus = false;
      let blur = false;

      const picker = renderPicker({
        onFocus: () => {
          focus = true;
        },
        onBlur: () => {
          blur = true;
        },
      });
      expect(picker.state().open).toBeFalsy();
      picker.find('.gio-time-picker-input').simulate('focus');
      expect(picker.state().open).toBeFalsy();
      picker.find('.gio-time-picker-input').simulate('blur');

      expect(focus).toBeTruthy();
      expect(blur).toBeTruthy();
    });
  });

  describe('allowEmpty', () => {
    it('should allow clear', async () => {
      const picker = renderPicker({
        allowEmpty: true,
      });
      expect(picker.render()).toMatchSnapshot();
    });

    it('cannot allow clear when disabled', async () => {
      const picker = renderPicker({
        allowEmpty: true,
        disabled: true,
      });
      expect(picker.render()).toMatchSnapshot();
    });
  });
});