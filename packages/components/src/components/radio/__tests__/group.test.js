import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import Radio from '..';

describe('Testing Radio', () => {
  function createRadioGroupMixed(props) {
    return (
      <Radio.Group
        options={[{ label: 'opA', value: 'opA', disabled: true }, { label: 'opB', value: 'opB' }, 'opC', 'opD']}
        {...props}
      >
        <Radio value="a">A</Radio>
        <Radio value="b" disabled>
          B
        </Radio>
      </Radio.Group>
    );
  }

  it('should mount and unmount Radio with no error.', () => {
    const wrapper = mount(createRadioGroupMixed());
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should render correctly.', () => {
    const domTree = create(createRadioGroupMixed({ defaultValue: 'opA' })).toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('should only render valid options.', () => {
    const wrapper = mount(
      <Radio.Group options={[{ label: 'opA', value: 'opA' }, 'opC', null, undefined]}>
        <Radio value="a">A</Radio>
        <Radio>B</Radio>
        <div>div</div>
        {false}
      </Radio.Group>
    );

    expect(wrapper.find('.gio-radio-input').length).toBe(3);
  });

  it('should all have name "gioRadio".', () => {
    const wrapper = mount(
      createRadioGroupMixed({
        name: 'gioRadio',
      })
    );

    wrapper.find('input[type="radio"]').forEach((el) => {
      expect(el.props().name).toEqual('gioRadio');
    });
  });

  it('should render vertically.', () => {
    const wrapper = mount(
      createRadioGroupMixed({
        direction: 'vertical',
      })
    );

    expect(wrapper.find('.gio-radio__group').at(0).hasClass('gio-radio__group--vertical')).toBe(true);
  });

  it('should work basically.', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      createRadioGroupMixed({
        onChange,
      })
    );

    wrapper.find('.gio-radio-input').at(0).simulate('change');
    expect(onChange).toHaveBeenCalledTimes(0);

    wrapper.find('.gio-radio-input').at(1).simulate('change');
    expect(onChange.mock.calls[0][0].target.value).toBe('opB');

    wrapper.find('.gio-radio-input').at(2).simulate('change');
    expect(onChange.mock.calls[1][0].target.value).toBe('opC');

    wrapper.find('.gio-radio-input').at(3).simulate('change');
    expect(onChange.mock.calls[2][0].target.value).toBe('opD');

    wrapper.find('.gio-radio-input').at(4).simulate('change');
    expect(onChange.mock.calls[3][0].target.value).toBe('a');

    wrapper.find('.gio-radio-input').at(5).simulate('change');
    expect(onChange).toHaveBeenCalledTimes(4);

    wrapper.find('.gio-radio-input').at(1).simulate('change');
    expect(onChange.mock.calls[4][0].target.value).toBe('opB');
  });

  it('should render disabled Radios and response nothing.', () => {
    const onGroupChange = jest.fn();
    const wrapper = mount(
      <Radio.Group disabled onChange={onGroupChange}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
      </Radio.Group>
    );

    wrapper.find('.gio-radio-input').at(0).simulate('change');
    expect(onGroupChange).not.toHaveBeenCalled();
  });

  it('both of radio and radioGroup will trigger onchange event when they exists', () => {
    const onChange = jest.fn();
    const onGroupChange = jest.fn();

    const wrapper = mount(
      <Radio.Group onChange={onGroupChange}>
        <Radio value="A" onChange={onChange}>
          A
        </Radio>
        <Radio value="B" onChange={onChange}>
          B
        </Radio>
        <Radio value="C" onChange={onChange}>
          C
        </Radio>
      </Radio.Group>
    );
    const radios = wrapper.find('.gio-radio-input');

    wrapper.setProps({ value: 'A' });
    radios.at(1).simulate('change');
    expect(onChange.mock.calls.length).toBe(1);
  });
});
