import React from 'react';
import Dropdown from '../index';
import Button from '../../button';
import { waitForComponentToPaint } from '../../../utils/test';
import { mount, render } from 'enzyme';

describe('Testing dropdown', () => {
  const getDropdown = () => (
    <Dropdown overlay={<div id="overlay-content">Dropdown 内容主体</div>}>
      <Button>Test</Button>
    </Dropdown>
  );

  it('should be stable', () => {
    const wrapper = render(getDropdown());
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(getDropdown());
      wrapper.setProps({ overlay: <div>overlay update</div> });
      wrapper.setProps({ trigger: 'hover' });
      wrapper.setProps({ visible: 'true' });
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should be render rightly', (done) => {
    const wrapper = mount(getDropdown());
    wrapper.setProps({ trigger: 'click' });
    wrapper.setProps({ placement: 'topLeft' });
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.exists('.gio-dropdown-inner')).toBe(true);
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.exists('.gio-dropdown-placement-topLeft')).toBe(true);
      done();
    });
  });

  it('will be close after click', () => {
    const wrapper = mount(getDropdown());
    wrapper.setProps({ destroyTooltipOnHide: true });
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('#overlay-content').simulate('click');
    expect(wrapper.exists('.gio-dropdown-inner')).toBe(false);
  });
});
