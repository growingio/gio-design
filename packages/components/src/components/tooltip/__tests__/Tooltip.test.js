import React from 'react';
import { mount, render } from 'enzyme';
import { isEqual } from 'lodash';
import Tooltip from '../index';
import getPlacements, { getOverflowOptions } from '../placements';
import { waitForComponentToPaint } from '../../../utils/test';

describe('Testing Tooltip', () => {
  const getTooltip = () => (
    <Tooltip title="This is a test" tooltipLink={{ name: '点击这里', link: 'https://www.growingio.com' }}>
      <span>Test</span>
    </Tooltip>
  );

  it('should be stable', () => {
    const wrapper = render(getTooltip());
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(getTooltip());
      wrapper.setProps({ title: 'set props' });
      wrapper.setProps({ visible: 'true' });
      wrapper.setProps({ tooltipLink: { name: '点击这里', link: 'https://www.growingio.com/about' } });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props title', () => {
    const wrapper = mount(getTooltip());
    wrapper.setProps({ visible: true });
    wrapper.setProps({ title: '更换文字' });
    expect(wrapper.find('.gio-tooltip-inner').find('span').text()).toBe('更换文字');
  });

  test('props tooltipLink', () => {
    const wrapper = mount(getTooltip());
    wrapper.setProps({ visible: true });
    wrapper.setProps({ tooltipLink: { name: '点击这里', link: 'https://www.growingio.com/about' } });
    expect(
      wrapper
        .find('.gio-tooltip-inner')
        .find('a')
        .filterWhere((item) => item.prop('href') === 'https://www.growingio.com/about')
    ).toHaveLength(1);
  });

  test('props disabled', async () => {
    const wrapper = mount(getTooltip());
    wrapper.setProps({ disabled: true, title: '测试disabled' });
    wrapper.find('span').at(0).simulate('mouseenter');
    await waitForComponentToPaint(wrapper);
    expect(wrapper.exists('.gio-tooltip')).toBe(false);
    // 重新触发才应该显示
    wrapper.setProps({ disabled: false });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.exists('.gio-tooltip')).toBe(false);
    // 重新触发
    wrapper.find('span').at(0).simulate('mouseenter');
    await waitForComponentToPaint(wrapper);
    expect(wrapper.exists('.gio-tooltip')).toBe(true);
  });

  test('title content should be render', async () => {
    const wrapper = mount(getTooltip());
    wrapper.setProps({ visible: true });
    wrapper.setProps({ title: '' });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.exists('.gio-tooltip')).toBe(false);
    wrapper.setProps({ title: null });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.exists('.gio-tooltip')).toBe(false);
  });

  test('props trigger', () => {
    const wrapper = mount(getTooltip());
    wrapper.setProps({ trigger: 'click' });
    wrapper.find('span').at(0).simulate('click');
    expect(wrapper.exists('.gio-tooltip-inner')).toBe(true);
  });

  test('props placement', async () => {
    const wrapper = mount(getTooltip());
    wrapper.setProps({ visible: true, placement: 'topLeft' });
    await waitForComponentToPaint(wrapper, 2000);
    expect(wrapper.exists('.gio-tooltip-placement-topLeft')).toBe(true);
  });

  test('props overlayClassName', () => {
    const wrapper = mount(getTooltip());
    wrapper.setProps({ visible: true });
    wrapper.setProps({ overlayClassName: 'overlayClassName' });
    expect(wrapper.exists('.overlayClassName')).toBe(true);
  });

  test('props onVisibleChange', () => {
    let called = false;
    const wrapper = mount(getTooltip());
    wrapper.setProps({
      onVisibleChange: () => {
        called = true;
      },
    });
    wrapper.setProps({ trigger: 'click' });
    wrapper.find('span').at(0).simulate('click');
    expect(called).toBe(true);
  });

  it('should be render rightly', async () => {
    const wrapper = mount(getTooltip());
    wrapper.setProps({ trigger: 'click' });
    wrapper.setProps({ placement: 'topLeft' });
    wrapper.setProps({ overlayClassName: 'overlayClassName' });
    wrapper.find('span').at(0).simulate('click');
    expect(wrapper.exists('.gio-tooltip-inner')).toBe(true);
    expect(wrapper.find('.gio-tooltip-inner').find('span').text()).toBe('This is a test');
    expect(
      wrapper
        .find('.gio-tooltip-inner')
        .find('a')
        .filterWhere((item) => item.prop('href') === 'https://www.growingio.com')
    ).toHaveLength(1);
    expect(wrapper.exists('.overlayClassName')).toBe(true);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.exists('.gio-tooltip-placement-topLeft')).toBe(true);
  });

  test('getOverflowOptions function', () => {
    const result1 = getOverflowOptions({ adjustX: 1 });
    expect(result1.adjustX).toBe(1);
    expect(result1.adjustY).toBe(0);
    const result2 = getOverflowOptions(true);
    expect(result2.adjustX).toBe(1);
    expect(result2.adjustY).toBe(1);
    const result3 = getOverflowOptions(false);
    expect(result3.adjustX).toBe(0);
    expect(result3.adjustY).toBe(0);
  });

  test('getPlacements function', () => {
    const placements = getPlacements({ arrowPointAtCenter: true });
    expect(placements.top.points).not.toBeUndefined();
    expect(placements.top.offset).not.toBeUndefined();
    expect(placements.top.overflow).not.toBeUndefined();
    expect(placements.top.targetOffset).not.toBeUndefined();
    expect(isEqual(getPlacements({ arrowPointAtCenter: false }).topLeft.offset, placements.topLeft.offset)).toBe(false);
  });
});
