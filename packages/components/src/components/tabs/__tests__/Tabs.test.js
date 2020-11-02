import React from 'react';
import Tabs, { TabPane } from '../index';
import '@gio-design/components/es/components/Tabs/style/index.css';
import { mount, render, shallow } from 'enzyme';

describe('Testing Tabs', () => {
  const getTabs = () => (
    <Tabs ref={React.createRef()}>
      <TabPane tab="我的" key="0">
        111
      </TabPane>
      <TabPane tab="全部" key="1">
        222
      </TabPane>
      <TabPane tab="共享" key="2">
        333
      </TabPane>
      <TabPane disabled tab="预置" key="3">
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

  test('prop defaultActiveKey', () => {
    const wrapper = mount(
      <Tabs defaultActiveKey="1">
        <TabPane tab="我的" key="0">
          111
        </TabPane>
        <TabPane tab="全部" key="1">
          222
        </TabPane>
        <TabPane tab="共享" key="2">
          333
        </TabPane>
        <TabPane disabled tab="预置" key="3">
          444
        </TabPane>
      </Tabs>
    );
    expect(wrapper.find('.gio-tabnav').childAt(1).exists('.gio-tabnav-item-active')).toBe(true);
  });

  test('prop activeKey', () => {
    const wrapper = mount(getTabs());
    wrapper.setProps({ activeKey: '1' });
    expect(wrapper.find('.gio-tabnav').childAt(1).exists('.gio-tabnav-item-active')).toBe(true);
    wrapper.setProps({ activeKey: '2' });
    expect(wrapper.find('.gio-tabnav').childAt(2).exists('.gio-tabnav-item-active')).toBe(true);
    wrapper.find('.gio-tabnav-item').at(1).simulate('click');
    expect(wrapper.find('.gio-tabnav').childAt(0).exists('.gio-tabnav-item-active')).toBe(false);
  });

  test('prop onChange and onTabClick', () => {
    const onChange = jest.fn();
    const onTabClick = jest.fn();
    const wrapper = mount(getTabs());
    wrapper.setProps({ onChange, onTabClick });
    wrapper.find('.gio-tabnav-item').at(1).simulate('click');
    expect(onChange).not.toHaveBeenCalled();
    expect(onTabClick).toHaveBeenCalled();
    wrapper.find('.gio-tabnav-item').at(2).simulate('click');
    expect(onChange).toHaveBeenCalled();
  });

  it('should be render rightly', () => {
    const wrapper = render(getTabs());
    expect(wrapper.find('.gio-tabnav-item')).toHaveLength(4);
    expect(wrapper.find('.gio-tabnav-item').eq(0).hasClass('gio-tabnav-item-active')).toBe(true);
    expect(wrapper.find('.gio-tabnav-item').eq(3).hasClass('gio-tabnav-item-disabled')).toBe(true);
  });

  it('should be render content rightly', () => {
    const wrapper = mount(getTabs());
    expect(wrapper.find('.gio-tabs-tabpane-active').at(0).text()).toBe('111');
    wrapper.find('.gio-tabnav-item').at(2).simulate('click');
    expect(wrapper.find('.gio-tabs-tabpane-active').at(0).text()).toBe('222');
  });

  it('only render TabPane', () => {
    const wrapper = mount(
      <Tabs defaultActiveKey="1">
        <TabPane tab="我的" key="0">
          111
        </TabPane>
        <TabPane tab="全部" key="1">
          222
        </TabPane>
        <TabPane tab="共享" key="2">
          333
        </TabPane>
        <TabPane disabled tab="预置" key="3">
          444
        </TabPane>
        <div className="norender-div">我不会被渲染</div>
      </Tabs>
    );
    expect(wrapper.exists('.norender-div')).toBe(false);
  });
});
