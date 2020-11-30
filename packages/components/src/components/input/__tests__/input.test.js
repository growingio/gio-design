import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Input from '..';

describe('Input', () => {
  it('should support maxLength', () => {
    const wrapper = mount(<Input maxLength={3} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support prefix and suffix element', () => {
    const wrapper = mount(
      <Input
        value="www.growingio.com"
        prefix={<span className="prefix-path">http://</span>}
        prefixWidth={100}
        suffix={<span className="suffix-path">/index.html</span>}
        suffixWidth={60}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find('.gio-input-container-prefix span').hasClass('prefix-path')).toBe(true);
    expect(wrapper.find('.gio-input-container-suffix span').hasClass('suffix-path')).toBe(true);
    expect(wrapper.find('input').prop('style').paddingLeft).toBe(100);
    expect(wrapper.find('input').prop('style').paddingRight).toBe(60);
    expect(
      wrapper.find('.gio-input-container-prefix').text() +
        wrapper.find('.gio-input-content').prop('value') +
        wrapper.find('.gio-input-container-suffix').text()
    ).toBe('http://www.growingio.com/index.html');
  });

  it('should run onChange when input accept change event', () => {
    let val = '';
    const wrapper = mount(
      <Input
        onChange={(e) => {
          val = e.target.value;
        }}
        onPressEnter={() => {
          val = 'press enter';
        }}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('input').simulate('change', { target: { value: '123' } });
    expect(wrapper.render()).toMatchSnapshot();
    expect(val).toBe('123');
    wrapper.find('input').simulate('keydown', { key: 'Enter' });
    expect(wrapper.render()).toMatchSnapshot();
    expect(val).toBe('press enter');
  });

  it('should warn when legacy props "wrapStyle" or "inputStyle" passed in', () => {
    const wrapper = mount(<Input wrapStyle={{ width: 100 }} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support size', () => {
    const wrapper = mount(<Input size="large" />);
    expect(wrapper.exists('.gio-input-container-large')).toBe(true);
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
    const wrapper = mount(
      <Input.InputNumber
        onChange={() => {
          /* ... */
        }}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('input').simulate('change', { target: { value: 1 } });
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.gio-input-container-suffix-iconGroup-top').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.gio-input-container-suffix-iconGroup-bottom').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should not change if the value is not between min and max, or the value is not a number', () => {
    let val = '';
    const wrapper = mount(
      <Input.InputNumber
        max={5}
        min={1}
        value={val}
        onChange={(n) => {
          val = n;
        }}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();

    wrapper.find('input').simulate('change', { target: { value: '5' } });
    expect(val).toBe('5');
    wrapper.setProps({ value: val });

    wrapper.find('input').simulate('change', { target: { value: '6' } });
    expect(val).toBe('6');
    wrapper.setProps({ value: val });

    wrapper.find('input').simulate('blur');
    expect(val).toBe('5');
    wrapper.setProps({ value: val });

    expect(wrapper.render()).toMatchSnapshot();

    wrapper.find('input').simulate('change', { target: { value: '0' } });
    expect(val).toBe('0');
    wrapper.setProps({ value: val });

    wrapper.find('input').simulate('blur');
    expect(val).toBe('1');
    wrapper.setProps({ value: val });

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

  it('should warn when legacy props "wrapStyle" or "inputStyle" passed in', () => {
    const wrapper = mount(<Input.TextArea wrapStyle={{ width: 100 }} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should trigger onChange when input event happens', () => {
    let val = '';
    const wrapper = mount(
      <Input.TextArea
        onChange={(e) => {
          val = e.target.value;
        }}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', { target: { value: '123' } });
    expect(wrapper.render()).toMatchSnapshot();
    expect(val).toBe('123');
  });

  it('should change the height when input many characters in the textarea', () => {
    const val = '';
    const wrapper = mount(<Input.TextArea value={val} autosize />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setProps({ value: 'abc'.repeat(100) });
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find('textarea').prop('value')).toBe('abc'.repeat(100));
    act(() => {
      /* ... */
    });
  });
});
