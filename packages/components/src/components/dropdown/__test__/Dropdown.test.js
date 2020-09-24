import React from 'react';
import Dropdown from '../index';
import Button from '../../button';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';

async function waitForComponentToPaint(wrapper, amount = 500) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => wrapper.update()));
}

describe('Testing dropdown', () => {
  const getDropdown = () => (
    <Dropdown overlay="Dropdown 内容主体">
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
      wrapper.setProps({ overlay: 'overlay update' });
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
});
