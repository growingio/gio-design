import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlusCircleFilled } from '@gio-design/icons';
// import renderer from 'react-test-renderer';
import Avatar from '../index';
import AvatarGroup from '../AvatarGroup';
import { Default } from '../Avatar.stories';

describe('Testing Avatar', () => {
  const users = [
    {
      name: 'li',
    },
    {
      name: 'pan',
    },
    {
      name: 'liu',
    },
    {
      name: 'wang',
    },
    {
      name: 'tong',
    },
    {
      name: 'leng',
    },
  ];

  it('Default', () => {
    render(<Default {...Default.args} />);
    expect(screen.queryByText('这', { exact: false })).not.toBeNull();
  });

  it('props src', () => {
    const { container } = render(<Avatar>li</Avatar>);
    expect(container.getElementsByClassName('img')).toBeTruthy();
  });

  it('props size', () => {
    const { container } = render(<Avatar size="small" />);
    expect(container.getElementsByClassName('.gio-avatar-sm')).toBeTruthy();
  });

  it('props icon', () => {
    const { container } = render(<PlusCircleFilled />);
    expect(container.getElementsByClassName('.gio-avatar-icon')).toBeTruthy();
  });

  it('prop droppable', () => {
    const { container } = render(<Avatar size="small" droppable />);
    expect(container.getElementsByClassName('.gio-avatar-droppable')).toBeTruthy();
  });

  it('prop circle', () => {
    const { container } = render(<Avatar mode="circle" />);
    expect(container.getElementsByClassName('.gio-avatar-circle')).toBeTruthy();
  });

  it('not string', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line react/no-children-prop
    const { rerender } = render(<Avatar children={1} />);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line react/no-children-prop
    rerender(<Avatar children={1} />);
    screen.logTestingPlaygroundURL();
    expect(screen).toBeTruthy();
  });

  it('props users', () => {
    const { container } = render(<AvatarGroup users={[]} number={4} placement="bottom" displayTooltip />);
    expect(container.getElementsByClassName('gio-avatar-group')).toBeTruthy();
  });

  it('should be stable', () => {
    const { rerender } = render(<AvatarGroup users={users} />);
    rerender(<AvatarGroup users={users} />);
  });

  it('should be render rightly', () => {
    const { container } = render(<AvatarGroup users={users} />);
    expect(container.getElementsByClassName('gio-avatar-group')).toBeTruthy();
  });

  it('props number', () => {
    const { container } = render(<AvatarGroup users={users} number={4} />);
    expect(container.getElementsByClassName('gio-avatar-rest')).toBeTruthy();
  });

  test('props placement', () => {
    const { rerender } = render(<AvatarGroup users={users} number={4} placement="top" />);
    rerender(<AvatarGroup users={users} number={4} placement="top" />);
  });

  it('props users', () => {
    const { container } = render(<AvatarGroup users={users.slice(0, 3)} number={4} />);
    expect(container.getElementsByClassName('gio-avata')).toBeTruthy();
  });
});
