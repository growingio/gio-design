import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { waitFor } from '@testing-library/react';
import Item from '../Item';
import Form from '..';

describe('<Item />', () => {
  it('render correctly', () => {
    const wrapper = mount(
      <Item>
        <input type="text" />
      </Item>
    );

    expect(wrapper.find('.gio-field input')).toHaveLength(1);
  });

  it('render a label tag', () => {
    const wrapper = mount(
      <Item name="username">
        <input type="text" />
      </Item>
    );
    expect(wrapper.find('label')).toHaveLength(0);

    wrapper.setProps({ label: 'username' });
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('label').getElement().props.htmlFor).toEqual('username');

    wrapper.setProps({ htmlFor: 'password' });
    expect(wrapper.find('label').getElement().props.htmlFor).toEqual('password');
  });

  it('should render a colon', () => {
    const wrapper = mount(
      <Item name="username" label="username" colon>
        <input type="number" />
      </Item>
    );

    expect(wrapper.find('label').text()).toBe('username：');

    wrapper.setProps({ required: true });
    expect(wrapper.find('label').text()).toBe('username：*');
  });

  it('accept accept a function as children', () => {
    const wrapper = mount(<Item>{() => <input type="text" />}</Item>);

    expect(wrapper.find('.gio-field input')).toHaveLength(1);
  });

  it('should accept text as children', () => {
    const wrapper = mount(<Item name="text">abc</Item>);

    expect(wrapper.find('.gio-field').text()).toBe('abc');
  });

  it('should pass custom trigger', () => {
    const wrapper = mount(
      <Form>
        <Item name="username" validateTrigger="onFocus" rules={[{ required: true, message: 'validate message' }]}>
          <input type="text" />
        </Item>
      </Form>
    );

    act(() => {
      wrapper.find('input').simulate('focus');
    });

    waitFor(() => {
      expect(wrapper.find('.gio-field-message').text()).toBe('validate message');
    });
  });

  it('should accept custom help msg', () => {
    const wrapper = mount(<Item help="help msg" />);

    expect(wrapper.find('.gio-field-help').text()).toBe('help msg');
  });

  it('should accept custom feedback msg', () => {
    const wrapper = mount(<Item feedback="feedback msg" feedbackType="warning" />);

    expect(wrapper.find('.gio-field-message').text()).toBe('feedback msg');
  });
});
