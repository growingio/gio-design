import React from 'react';
import { mount, render, shallow } from 'enzyme';
import TabNav from '../index';

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

  test('prop defaultActiveKey', () => {
    const wrapper = mount(
      <TabNav defaultActiveKey="1">
        <TabNav.Item>111</TabNav.Item>
        <TabNav.Item>222</TabNav.Item>
        <TabNav.Item>333</TabNav.Item>
        <TabNav.Item disabled>444</TabNav.Item>
      </TabNav>
    );
    expect(wrapper.find('.gio-tabnav').childAt(1).exists('.gio-tabnav-item-active')).toBe(true);
  });

  test('prop activeKey', () => {
    const wrapper = mount(getTabNav());
    wrapper.setProps({ activeKey: '1' });
    expect(wrapper.find('.gio-tabnav').childAt(0).exists('.gio-tabnav-item-active')).toBe(true);
    wrapper.setProps({ activeKey: '2' });
    expect(wrapper.find('.gio-tabnav').childAt(1).exists('.gio-tabnav-item-active')).toBe(true);
    wrapper.find('.gio-tabnav-item').at(1).simulate('click');
    expect(wrapper.find('.gio-tabnav-item').at(1).exists('.gio-tabnav-item-active')).toBe(false);
  });

  test('prop onChange and onTabClick', () => {
    const onChange = jest.fn();
    const onTabClick = jest.fn();
    const wrapper = mount(getTabNav());
    wrapper.setProps({ onChange, onTabClick });
    wrapper.find('.gio-tabnav-item').at(1).simulate('click');
    expect(onChange).not.toHaveBeenCalled();
    expect(onTabClick).toHaveBeenCalled();
    wrapper.find('.gio-tabnav-item').at(2).simulate('click');
    expect(onChange).toHaveBeenCalled();
  });

  it('should be render rightly', () => {
    const wrapper = mount(getTabNav());
    expect(wrapper.find('.gio-tabnav').children()).toHaveLength(5);
    expect(wrapper.find('.gio-tabnav').childAt(0).exists('.gio-tabnav-item-active')).toBe(true);
    expect(wrapper.find('.gio-tabnav').childAt(3).exists('.gio-tabnav-item-disabled')).toBe(true);
  });

  it('should be render content rightly', () => {
    const wrapper = mount(getTabNav());
    expect(wrapper.find('.gio-tabnav-item-active').at(0).text()).toBe('111');
    wrapper.find('.gio-tabnav').childAt(1).simulate('click');
    expect(wrapper.find('.gio-tabnav-item-active').at(0).text()).toBe('222');
  });

  it('only render TabNav.Item', () => {
    const wrapper = mount(
      <TabNav defaultActiveKey="1">
        <TabNav.Item>111</TabNav.Item>
        <TabNav.Item>222</TabNav.Item>
        <TabNav.Item>333</TabNav.Item>
        <TabNav.Item disabled>444</TabNav.Item>
        <div className="norender-div">我不会被渲染</div>
      </TabNav>
    );
    expect(wrapper.exists('.norender-div')).toBe(false);
  });
});
