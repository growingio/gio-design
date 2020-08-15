import React from 'react';
import TabNav from '../index';
import { act } from 'react-dom/test-utils';
import { mount, render, shallow } from 'enzyme';

async function waitForComponentToPaint(wrapper, amount = 500) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => wrapper.update()));
}

describe('Testing TabNav', () => {
  const getTabNav = () => (
    <TabNav>
      <TabNav.Item>111</TabNav.Item>
      <TabNav.Item>222</TabNav.Item>
      <TabNav.Item>333</TabNav.Item>
      <TabNav.Item disabled>444</TabNav.Item>
    </TabNav>
  );

  it('should be stable', () => {
    const wrapper = render(getTabNav());
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(getTabNav());
      wrapper.setProps({ type: 'line' });
      wrapper.setProps({ type: 'small' });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props type', () => {
    const wrapper = shallow(getTabNav());
    expect(wrapper.exists('.gio-tabnav-block')).toBe(true);
    wrapper.setProps({ type: 'line' });
    expect(wrapper.exists('.gio-tabnav-line')).toBe(true);
  });

  test('props size', () => {
    const wrapper = shallow(getTabNav());
    expect(wrapper.exists('.gio-tabnav-lg')).toBe(true);
    wrapper.setProps({ size: 'middle' });
    expect(wrapper.exists('.gio-tabnav-md')).toBe(true);
    wrapper.setProps({ size: 'small' });
    expect(wrapper.exists('.gio-tabnav-sm')).toBe(true);
  });

  it('should be render rightly', (done) => {
    const wrapper = mount(getTabNav());
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.find('.gio-tabnav').children()).toHaveLength(5);
      expect(wrapper.find('.gio-tabnav').childAt(0).exists('.gio-tabnav-item-active')).toBe(true);
      expect(wrapper.find('.gio-tabnav').childAt(3).exists('.gio-tabnav-item-disabled')).toBe(true);
      done();
    });
  });

  it('should be render content rightly', (done) => {
    const wrapper = mount(getTabNav());
    expect(wrapper.find('.gio-tabnav-item-active').at(0).text()).toBe('111');
    wrapper.find('.gio-tabnav').childAt(1).simulate('click');
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.find('.gio-tabnav-item-active').at(0).text()).toBe('222');
      done();
    });
  });
});
