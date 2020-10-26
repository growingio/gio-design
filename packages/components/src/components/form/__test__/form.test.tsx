import { act } from 'react-dom/test-utils';
import React from 'react';

import { mount } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { FormProvider } from '../context';
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
      <Form colon>
        <Item label="username">
          <input type="text" />
        </Item>
      </Form>
    );
    expect(wrapper.find('.gio-field input')).toHaveLength(1);
    expect(wrapper.find('.gio-field label').text()).toBe('username：');
  });

  it('can validate form field', async function testfn() {
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

  it('can wrapped in FormProvider', (done) => {
    const onFormChange = (name: string) => {
      expect(name).toEqual('form1');
      done();
    };
    const wrapper = mount(
      <FormProvider onFormChange={onFormChange}>
        <Form name="form1">
          <Item name="name">
            <input type="text" />
          </Item>
        </Form>
        <Form name="form2">
          <Item name="name">
            <input type="text" />
          </Item>
        </Form>
      </FormProvider>
    );

    wrapper.find('#form1 input').simulate('change', { target: { value: '123' } });

    expect(wrapper.find('#form1 input').prop('value')).toBe('123');
  });

  it('should transparent colon and requiredMark to Form.Item', () => {
    const wrapper = mount(
      <Form colon requiredMark>
        <Item colon className="test1" label="label1" required />
        <Item colon className="test2" label="label2" required />
        <Item colon className="test3" label="label3" />
      </Form>
    );

    expect(wrapper.find('.test1 label').text()).toBe('label1：*');
    expect(wrapper.find('.test2 label').text()).toBe('label2：*');
    expect(wrapper.find('.test3 label').text()).toBe('label3：');
  });
});
