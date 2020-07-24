import React from 'react';
import Popover from '../index';
import '@gio-design/components/es/components/Tabs/style/index.css';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';

async function waitForComponentToPaint(wrapper, amount = 500) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => wrapper.update()));
}

describe('Testing Popover', () => {
  const getPopover = () => (
    <Popover contentArea='content' footerArea='footer'>
      <span>Test</span>
    </Popover>
  );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be stable', () => {
    const wrapper = render(getPopover());
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(getPopover());
      wrapper.setProps({ contentArea: 'content update' });
      wrapper.setProps({ visible: 'true' });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('prop contentArea', () => {
    const wrapper = mount(getPopover());
    wrapper.setProps({ contentArea: 'new text', footerArea: null });
    wrapper.setProps({ trigger: 'click' });
    wrapper.find('span').at(0).simulate('click');
    expect(wrapper.find('.gio-popover-inner').exists('.gio-popover-inner-content')).toBe(true);
    expect(wrapper.find('.gio-popover-inner-content').text()).toBe('new text');
    expect(wrapper.find('.gio-popover-inner').exists('.gio-popover-inner-footer')).toBe(false);
  });

  test('prop footerArea', () => {
    const wrapper = mount(getPopover());
    wrapper.setProps({ trigger: 'click' });
    wrapper.find('span').at(0).simulate('click');
    wrapper.setProps({ contentArea: 0, footerArea: 'only footer' });
    expect(wrapper.find('.gio-popover-inner').exists('.gio-popover-inner-footer')).toBe(true);
    expect(wrapper.find('.gio-popover-inner-footer').text()).toBe('only footer');
    expect(wrapper.find('.gio-popover-inner').exists('.gio-popover-inner-content')).toBe(false);
  });

  it('should be render rightly', () => {
    const wrapper = mount(getPopover());
    wrapper.setProps({ trigger: 'click' });
    wrapper.setProps({ placement: 'topLeft' });
    wrapper.setProps({ overlayClassName: 'overlayClassName' });
    wrapper.find('span').at(0).simulate('click');
    expect(wrapper.exists('.gio-popover-inner')).toBe(true);
    expect(wrapper.find('.gio-popover-inner').exists('.gio-popover-inner-content')).toBe(true);
    expect(wrapper.find('.gio-popover-inner').exists('.gio-popover-inner-footer')).toBe(true);
    expect(wrapper.exists('.overlayClassName')).toBe(true);
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.exists('.gio-popover-placement-topLeft')).toBe(true);
    });
  });
});
