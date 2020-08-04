import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Sign from '..';

describe('Testing Sign', () => {
  it('should mount and unmount Sign with no error.', () => {
    const wrapper = mount(<Sign count={12} />);
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should render number sign correctly', () => {
    const domTree = renderer
      .create(
        <Sign className='gio-customized-sign' count={100} magnitude={100}>
          <span>Number</span>
        </Sign>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('should render dot sign correctly', () => {
    const domTree = renderer
      .create(
        <Sign className='gio-customized-sign' variant='dot'>
          <span>Dot</span>
        </Sign>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('should toggle hide correctly.', () => {
    const wrapper = mount(
      <Sign className='gio-customized-sign' variant='dot' visible={true}>
        <span>Dot</span>
      </Sign>
    );
    expect(wrapper.exists('.gio-sign--hide')).toBe(false);
    wrapper.setProps({ visible: false });
    expect(wrapper.exists('.gio-sign--hide')).toBe(true);
    wrapper.setProps({ visible: true });
    expect(wrapper.exists('.gio-sign--hide')).toBe(false);
  });

  it('should switch status correctly.', () => {
    const wrapper = mount(
      <Sign className='gio-customized-sign' variant='dot'>
        <span>Dot</span>
      </Sign>
    );

    expect(wrapper.exists('.gio-sign__dot--default')).toBe(true);
    wrapper.setProps({ status: 'normal' });
    expect(wrapper.exists('.gio-sign__dot--normal')).toBe(true);
    expect(wrapper.exists('.gio-sign__dot--default')).toBe(false);
    wrapper.setProps({ status: 'error' });
    expect(wrapper.exists('.gio-sign__dot--error')).toBe(true);
    expect(wrapper.exists('.gio-sign__dot--default')).toBe(false);
    wrapper.setProps({ status: 'warning' });
    expect(wrapper.exists('.gio-sign__dot--warning')).toBe(true);
    expect(wrapper.exists('.gio-sign__dot--default')).toBe(false);
    wrapper.setProps({ status: 'disabled' });
    expect(wrapper.exists('.gio-sign__dot--disabled')).toBe(true);
    expect(wrapper.exists('.gio-sign__dot--default')).toBe(false);
  });
});
