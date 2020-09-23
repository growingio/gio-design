import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import Form from '..';

const { Item, useForm } = Form;

describe('<Form />', () => {
  it('render a form element', () => {
    const wrapper = mount(<Form name="test-form" />);
    expect(wrapper.find('form#test-form')).toHaveLength(1);
  });

  it('can set custom component', () => {
    const wrapper = mount(<Form component="div" />);
    expect(wrapper.find('div.gio-form')).toHaveLength(1);
    expect(wrapper.find('form.gio-form')).toHaveLength(0);
  });

  it('has different layout', () => {
    const wrapper = mount(<Form />);

    expect(wrapper.find('form.gio-form-horizontal')).toHaveLength(1);

    wrapper.setProps({ layout: 'vertical' });
    expect(wrapper.find('form.gio-form-vertical')).toHaveLength(1);

    wrapper.setProps({ layout: 'inline' });
    expect(wrapper.find('form.gio-form-inline')).toHaveLength(1);
  });

  it('render formItem', () => {
    const wrapper = mount(
      <Form>
        <Item>
          <input type="text" />
        </Item>
      </Form>
    );
    expect(wrapper.find('.gio-field input')).toHaveLength(1);
  });

  it('can validate form field', async function () {
    const { result } = renderHook(() => useForm());
    const [form] = result.current;

    const wrapper = mount(
      <Form form={form}>
        <Item label="username" name="username" rules={[{ required: true, message: 'validate message' }]}>
          <input type="text" />
        </Item>
      </Form>
    );
    expect(form.getFieldError('username')).toHaveLength(0);
    expect(wrapper.find('.gio-field-message').text()).toEqual('');

    act(() => {
      form.submit();
    });
    await waitFor(() => {
      expect(form.getFieldError('username')[0]).toEqual('validate message');
      expect(wrapper.find('.gio-field-message').text()).toEqual('validate message');
    });

    act(() => {
      form.resetFields();
    });
    await waitFor(() => {
      expect(form.getFieldError('username')).toHaveLength(0);
      // expect(wrapper.find('.gio-field-message').text()).toEqual('');
    });
  });
});
