import React from 'react';
import Tabs, { TabPane } from '../index';
import '@gio-design/components/es/components/Tabs/style/index.css';
import { act } from 'react-dom/test-utils';
import { mount, render, shallow } from 'enzyme';

async function waitForComponentToPaint(wrapper, amount = 500) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => wrapper.update()));
}

describe('Testing Tabs', () => {
  const getTabs = () => (
    <Tabs ref={React.createRef()}>
      <TabPane tab="我的" key="1">
        111
      </TabPane>
      <TabPane tab="全部" key="2">
        222
      </TabPane>
      <TabPane tab="共享" key="3">
        333
      </TabPane>
      <TabPane disabled tab="预置" key="4">
        444
      </TabPane>
    </Tabs>
  );

  it('should be stable', () => {
    const wrapper = render(getTabs());
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(getTabs());
      wrapper.setProps({ type: 'line' });
      wrapper.setProps({ type: 'small' });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props type', () => {
    const wrapper = shallow(getTabs());
    expect(wrapper.exists('.gio-tabs-block')).toBe(true);
    wrapper.setProps({ type: 'line' });
    expect(wrapper.exists('.gio-tabs-line')).toBe(true);
  });

  test('props size', () => {
    const wrapper = shallow(getTabs());
    expect(wrapper.exists('.gio-tabs-lg')).toBe(true);
    wrapper.setProps({ size: 'middle' });
    expect(wrapper.exists('.gio-tabs-md')).toBe(true);
    wrapper.setProps({ size: 'small' });
    expect(wrapper.exists('.gio-tabs-sm')).toBe(true);
  });

  it('should be render rightly', () => {
    const wrapper = render(getTabs());
    expect(wrapper.find('.gio-tabs-tab')).toHaveLength(4);
    expect(wrapper.find('.gio-tabs-tab').eq(0).hasClass('gio-tabs-tab-active')).toBe(true);
    expect(wrapper.find('.gio-tabs-tab').eq(3).hasClass('gio-tabs-tab-disabled')).toBe(true);
  });

  it('should be render content rightly', () => {
    const wrapper = mount(getTabs());
    waitForComponentToPaint(wrapper);
    expect(wrapper.find('.gio-tabs-tabpane-active').text()).toBe('111');
    wrapper.find('.gio-tabs-tab').at(1).simulate('click');
    expect(wrapper.find('.gio-tabs-tabpane-active').text()).toBe('222');
  });
});
