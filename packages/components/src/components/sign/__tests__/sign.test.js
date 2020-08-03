import React from 'react';
import { shallow, mount } from 'enzyme';
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

  it('should hide.', () => {
    const wrapper = mount(
      <Sign className='gio-customized-sign' variant='dot' visible={false}>
        <span>Dot</span>
      </Sign>
    );

    expect(wrapper.find('.gio-sign__dot').at(0).hasClass('gio-sign--hide')).toBe(true);
  });

  it('should has error class.', () => {
    const wrapper = mount(
      <Sign className='gio-customized-sign' variant='dot' status='error'>
        <span>Dot</span>
      </Sign>
    );

    expect(wrapper.find('.gio-sign__dot').at(0).hasClass('gio-sign__dot--error')).toBe(true);
  });
});
