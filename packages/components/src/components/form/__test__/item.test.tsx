import React from 'react';
import { mount } from 'enzyme';
import Item from '../Item';

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

  it('accept render props', () => {
    const wrapper = mount(<Item>{() => <input type="text" />}</Item>);

    expect(wrapper.find('.gio-field input')).toHaveLength(1);
  });
});
