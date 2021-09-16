import React from 'react';
import { render, screen } from '@testing-library/react';
import { PlusCircleFilled } from '@gio-design/icons';
import Avatar from '../index';
import Dropdown from '../../components/dropdown';
import AvatarGroup from '../AvatarGroup';
import { Default } from '../demos/Avatar.stories';

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

  it('props icon', () => {
    const { container } = render(<PlusCircleFilled />);
    expect(container.getElementsByClassName('gio-avatar-icon')).toBeTruthy();
  });

  it('prop size and droppable', () => {
    const { container } = render(<Avatar size="small" mode="circle" droppable displayTooltip />);
    expect(container.getElementsByClassName('gio-avatar-droppable')).toBeTruthy();
  });

  it('not string', () => {
    const { rerender } = render(<Avatar>1</Avatar>);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line react/no-children-prop
    rerender(<Avatar children={1} />);
    expect(screen).toBeTruthy();
  });

  it('not omit', () => {
    render(<Avatar omit={false}>1</Avatar>);
  });

  it('children trim', () => {
    render(<Avatar omit>asdfg</Avatar>);
  });
  it('children trim', () => {
    render(<Avatar omit> </Avatar>);
  });

  it('props users', () => {
    render(<AvatarGroup users={[]} placement="bottom" displayTooltip />);
  });

  it('no props', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<AvatarGroup />);
  });

  it('should be render rightly', () => {
    const { container } = render(<AvatarGroup users={users} />);
    expect(container.getElementsByClassName('gio-avatar-group')).toBeTruthy();
  });

  it('props users', () => {
    const { container } = render(<AvatarGroup users={users.slice(0, 3)} number={4} />);
    expect(container.getElementsByClassName('gio-avatar')).toBeTruthy();
  });

  it('can accept dropdown trigger Mouse Event', () => {
    const { container } = render(
      <Dropdown overlay={<div>11</div>}>
        <Avatar>li</Avatar>
      </Dropdown>
    );
    expect(container.getElementsByClassName('gio-dropdown')).toBeTruthy();
  });
});
