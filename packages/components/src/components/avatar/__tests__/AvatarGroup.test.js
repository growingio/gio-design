import React from 'react';
import AvatarGroup from '../AvatarGroup';
import '@gio-design/components/es/components/avatar/style/index.css';
import renderer from 'react-test-renderer';
import { waitForComponentToPaint } from '../../../utils/test';
import { mount } from 'enzyme';
import image from './icon.jpeg';

describe('Testing AvatarGroup', () => {
  const users = [
    {
      name: 'li',
      src: image,
    },
    {
      name: 'pan',
    },
    {
      name: 'leng',
      src: image,
    },
    {
      name: 'liu',
    },
    {
      name: 'wang',
      src: image,
    },
    {
      name: 'tong',
      src: image,
    },
  ];

  it('should be stable', () => {
    const wrapper = renderer.create(<AvatarGroup users={users} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should be render rightly', () => {
    let wrapper = mount(<AvatarGroup users={users} />);
    expect(wrapper.exists('.gio-avatar-group')).toBe(true);
    wrapper = wrapper.find('.gio-avatar');
    expect(wrapper.at(0).childAt(0).type()).toBe('img');
    expect(wrapper.at(1).childAt(0).type()).toBe('span');
    expect(wrapper.at(1).childAt(0).text()).toBe('p');
    expect(wrapper.at(2).childAt(0).type()).toBe('img');
    expect(wrapper.at(3).childAt(0).type()).toBe('span');
    expect(wrapper.at(3).childAt(0).text()).toBe('l');
    expect(wrapper.at(4).childAt(0).text()).toBe(`+${users.length - 4}`);
  });

  it('should have two character avatars', () => {
    const wrapper = mount(<AvatarGroup users={users} />);
    expect(
      wrapper
        .childAt(0)
        .children()
        .filterWhere((n) => n.find('.gio-avatar').childAt(0).type() === 'img')
    ).toHaveLength(2);
  });

  test('props number', () => {
    const wrapper = mount(<AvatarGroup users={users} number={4} />).childAt(0);
    expect(wrapper.find('.gio-avatar')).toHaveLength(4);
    expect(wrapper.last().exists('.gio-avatar-rest')).toBe(true);
  });

  test('props placement', (done) => {
    const wrapper = mount(<AvatarGroup users={users} number={4} />);
    wrapper.setProps({ placement: 'top' });
    wrapper.find('.gio-avatar').at(0).simulate('mouseenter');
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.exists('.gio-tooltip-placement-top')).toBe(true);
      done();
    });
  });

  test('props users', () => {
    expect(mount(<AvatarGroup users={[]} number={4} />).exists('.gio-avatar-group')).toBe(false);
    expect(mount(<AvatarGroup users={users.slice(0, 3)} number={4} />).find('.gio-avatar')).toHaveLength(3);
  });
});
