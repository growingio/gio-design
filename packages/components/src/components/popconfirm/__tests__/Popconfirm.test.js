import React from 'react';
import Popconfirm from '../index';
import '@gio-design/components/es/components/Tabs/style/index.css';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';

async function waitForComponentToPaint(wrapper, amount = 500) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => wrapper.update()));
}

describe('Testing popconfirm', () => {
  const getPopconfirm = () => (
    <Popconfirm title="确定要删除……吗？" desc="删除物品属性后，相关数据将停止计算，历史数据保留。">
      <span>Test</span>
    </Popconfirm>
  );

  it('should be stable', () => {
    const wrapper = render(getPopconfirm());
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(getPopconfirm());
      wrapper.setProps({ title: 'title update' });
      wrapper.setProps({ desc: 'desc update' });
      wrapper.setProps({ visible: 'true' });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('prop title', () => {
    const wrapper = mount(getPopconfirm());
    wrapper.setProps({ title: 'title text', desc: null });
    wrapper.setProps({ trigger: 'click' });
    wrapper.find('span').at(0).simulate('click');
    expect(wrapper.find('.gio-popconfirm-inner').exists('.gio-popconfirm-inner-title')).toBe(true);
    expect(wrapper.find('.gio-popconfirm-inner-title').text()).toBe('title text');
    expect(wrapper.find('.gio-popconfirm-inner').exists('.gio-popconfirm-inner-desc')).toBe(false);
    expect(wrapper.find('.gio-popconfirm-inner').prop('style').width).toBe(260);
  });

  test('prop desc', () => {
    const wrapper = mount(getPopconfirm());
    wrapper.setProps({ trigger: 'click' });
    wrapper.find('span').at(0).simulate('click');
    wrapper.setProps({ title: 'title text', desc: 'desc text' });
    expect(wrapper.find('.gio-popconfirm-inner').exists('.gio-popconfirm-inner-desc')).toBe(true);
    expect(wrapper.find('.gio-popconfirm-inner-desc').text()).toBe('desc text');
    expect(wrapper.find('.gio-popconfirm-inner').prop('style').width).toBe(400);
  });

  test('prop disabled', (done) => {
    const wrapper = mount(getPopconfirm());
    wrapper.setProps({ title: 'title text', desc: 'desc text' });
    wrapper.setProps({ disabled: true, visible: true });
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.exists('.gio-popconfirm')).toBe(false);
      done();
    });
  });

  test('prop okText and cancelText', (done) => {
    const wrapper = mount(getPopconfirm());
    wrapper.setProps({ title: 'title text', okText: 'ok', cancelText: 'cancel', visible: true });
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.find('.gio-popconfirm-inner-btns').childAt(0).childAt(0).text()).toBe('cancel');
      expect(wrapper.find('.gio-popconfirm-inner-btns').childAt(1).childAt(0).text()).toBe('ok');
      done();
    });
  });

  test('prop onConfirm and onCancel', (done) => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const wrapper = mount(getPopconfirm());
    wrapper.setProps({ title: 'title text', onConfirm, onCancel, visible: true });
    waitForComponentToPaint(wrapper).then(() => {
      wrapper.find('.gio-popconfirm-inner-btns').childAt(0).simulate('click');
      expect(onCancel).toHaveBeenCalled();
      wrapper.find('.gio-popconfirm-inner-btns').childAt(1).simulate('click');
      expect(onConfirm).toHaveBeenCalled();
      done();
    });
  });

  it('should be render rightly', (done) => {
    const wrapper = mount(getPopconfirm());
    wrapper.setProps({ trigger: 'click' });
    wrapper.setProps({ placement: 'topLeft' });
    wrapper.find('span').at(0).simulate('click');
    expect(wrapper.exists('.gio-popconfirm-inner')).toBe(true);
    expect(wrapper.find('.gio-popconfirm-inner').exists('.gio-popconfirm-inner-title')).toBe(true);
    expect(wrapper.find('.gio-popconfirm-inner').exists('.gio-popconfirm-inner-desc')).toBe(true);
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.exists('.gio-popconfirm-placement-topLeft')).toBe(true);
      done();
    });
  });
});
