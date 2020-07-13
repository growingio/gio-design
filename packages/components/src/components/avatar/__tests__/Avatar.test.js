import React from 'react';
import Avatar from '../Avatar';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './icon.jpeg';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('Testing Avatar', () => {
  it('should be stable', () => {
    const wrapper = renderer.create(<Avatar>快照</Avatar>).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(<Avatar />);
      wrapper.setProps({
        size: 'small',
        src: '123',
        omit: false,
      });
      wrapper.setProps({
        size: 'large',
        omit: true,
      });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props src', () => {
    const wrapper = mount(<Avatar src={image}>li</Avatar>).children();
    expect(wrapper.childAt(0).type()).toBe('img');
    expect(wrapper.childAt(0).text()).not.toBe('l');
    const noSrcWrapper = mount(<Avatar size='small'>li</Avatar>).children();
    expect(noSrcWrapper.childAt(0).type()).toBe('span');
    expect(noSrcWrapper.childAt(0).text()).toBe('l');
  });

  test('props size', () => {
    expect(mount(<Avatar size='small' />).exists('.gio-avatar-sm')).toBe(true);
    expect(mount(<Avatar />).exists('.gio-avatar-df')).toBe(true);
    expect(mount(<Avatar size='large' />).exists('.gio-avatar-lg')).toBe(true);
    expect(mount(<Avatar size='huge' />).exists('.gio-avatar-hg')).toBe(true);
  });

  test('props omit', () => {
    const wrapper = mount(<Avatar>这是一个很长的文字</Avatar>);
    expect(wrapper.childAt(0).text()).toBe('这');
    wrapper.setProps({ omit: false });
    expect(wrapper.childAt(0).text()).toBe('这是一个很长的文字');
  });
});
