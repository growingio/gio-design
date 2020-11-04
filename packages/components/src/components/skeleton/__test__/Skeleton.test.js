import React from 'react';
import { mount, render } from 'enzyme';
import { waitForComponentToPaint } from '../../../utils/test';
import Skeleton from '../index';

describe('Testing Skeleton', () => {
  it('should be stable', () => {
    const wrapper = render(<Skeleton avatar>children</Skeleton>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(<Skeleton avatar>children</Skeleton>);
      wrapper.setProps({ delay: 1000 });
      wrapper.setProps({ loading: false });
      wrapper.setProps({ title: '加载中' });
      wrapper.setProps({ avatar: { size: 'small' } });
      wrapper.setProps({ paragraph: { row: 5 } });
      wrapper.setProps({ active: false });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props delay and loading', (done) => {
    const wrapper = mount(
      <Skeleton avatar loading={false}>
        children
      </Skeleton>
    );
    wrapper.setProps({ delay: 1000, loading: true });
    expect(wrapper.exists('.gio-skeleton')).toBe(false);
    waitForComponentToPaint(wrapper, 1000).then(() => {
      expect(wrapper.exists('.gio-skeleton')).toBe(true);
      done();
    });
  });

  test('props title', () => {
    const wrapper = mount(<Skeleton avatar>children</Skeleton>);
    wrapper.setProps({ title: false });
    expect(wrapper.exists('.gio-skeleton-title')).toBe(false);
  });

  test('props avatar', () => {
    const wrapper = mount(<Skeleton>children</Skeleton>);
    wrapper.setProps({ avatar: { size: 'small' } });
    expect(wrapper.exists('.gio-skeleton-header')).toBe(true);
    expect(wrapper.exists('.gio-skeleton-content')).toBe(true);
  });

  test('props paragraph', () => {
    const wrapper = mount(<Skeleton>children</Skeleton>);
    wrapper.setProps({ paragraph: { row: 5 } });
    expect(wrapper.find('.gio-skeleton-paragraph').children()).toHaveLength(5);
    wrapper.setProps({ paragraph: false, title: false });
    expect(wrapper.exists('.gio-skeleton-paragraph')).toBe(false);
    expect(wrapper.exists('.gio-skeleton-title')).toBe(false);
    expect(wrapper.exists('.gio-skeleton-content')).toBe(false);
  });

  test('props active', () => {
    const wrapper = mount(<Skeleton active>children</Skeleton>);
    expect(wrapper.exists('.gio-skeleton-active')).toBe(true);
  });

  test('Skeleton Image', (done) => {
    const wrapper = mount(<Skeleton.Image loading>children</Skeleton.Image>);
    expect(wrapper.exists('.gio-skeleton-image')).toBe(true);
    wrapper.setProps({ loading: false });
    waitForComponentToPaint(wrapper, 1000).then(() => {
      expect(wrapper.exists('.gio-skeleton-image')).toBe(false);
      done();
    });
  });
});
