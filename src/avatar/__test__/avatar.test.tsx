import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { EditOutlined, UserOutlined } from '@gio-design/icons';
import Avatar from '../Avatar';

describe('<Avatar />', () => {
  test('Should render a span containing an img', () => {
    const { getByTestId } = render(<Avatar src="/fake.jpeg" />);
    const root = getByTestId('avatar');
    const img = root.firstChild;
    expect(root.tagName).toBe('SPAN');
    expect(img).toHaveAttribute('src', '/fake.jpeg');
  });

  test('Should render a null avatar when having tag children', () => {
    const { getByTestId } = render(<Avatar>{(<span>span</span>) as unknown as string}</Avatar>);
    expect(getByTestId('avatar').childElementCount).toEqual(0);
  });

  describe('Should render a span containing children', () => {
    test('Should render only uppercase initials', () => {
      const { getByTestId } = render(<Avatar>jay Chou</Avatar>);
      const root = getByTestId('avatar');
      const child = root.firstChild;
      expect(child).toHaveClass('gio-avatar-string');
      expect(child).toHaveTextContent(/J/);
    });

    test('Should render only uppercase initials with background-color', () => {
      const { getByTestId } = render(<Avatar backgroundColor="skyblue">Jay Chou</Avatar>);
      const root = getByTestId('avatar');
      expect(root).toHaveStyle('background-color: skyblue;');
    });

    test('Should render whole children', () => {
      const { getByTestId } = render(<Avatar omit={false}>Jay</Avatar>);
      const root = getByTestId('avatar');
      expect(root.firstChild).toHaveTextContent(/Jay/);
    });
  });

  describe('Should render the tooltip', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern');
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('Should render the tooltip with children', () => {
      const { getByTestId } = render(<Avatar displayTooltip>Jay Chou</Avatar>);
      const root = getByTestId('avatar');
      act(() => {
        fireEvent.mouseEnter(root);
        jest.runAllTimers();
      });
      expect(document.querySelector('.gio-tooltip')).toHaveTextContent(/Jay Chou/);
      act(() => {
        fireEvent.mouseLeave(root);
        jest.runAllTimers();
      });
      expect(document.querySelector('.gio-tooltip')).toBeNull();
    });

    test('Should render the tooltip with tooltipTitle prop', () => {
      const { getByTestId } = render(<Avatar omit={false} tooltipTitle="Jay Chou" displayTooltip src="/fake.jpeg" />);

      const root = getByTestId('avatar');
      act(() => {
        fireEvent.mouseEnter(root);
        jest.runAllTimers();
      });
      expect(document.querySelector('.gio-tooltip')).toHaveTextContent(/Jay Chou/);
      act(() => {
        fireEvent.mouseLeave(root);
        jest.runAllTimers();
      });
      expect(document.querySelector('.gio-tooltip')).toBeNull();
    });
  });

  test('Should render different size avatar', () => {
    const { getByTestId } = render(
      <>
        <Avatar size="small" data-testid="small-avatar">
          Jay Chou
        </Avatar>
        <Avatar size="medium" data-testid="medium-avatar">
          H
        </Avatar>
        <Avatar size="large" data-testid="large-avatar">
          Jay
        </Avatar>
        <Avatar size="x-large" data-testid="x-large-avatar">
          Jack
        </Avatar>
        <Avatar style={{ width: 120, height: 120 }} data-testid="custom-size-avatar">
          F
        </Avatar>
      </>
    );
    expect(getByTestId('small-avatar')).toHaveClass('gio-avatar-sm');
    expect(getByTestId('medium-avatar')).toHaveClass('gio-avatar-me');
    expect(getByTestId('large-avatar')).toHaveClass('gio-avatar-la');
    expect(getByTestId('x-large-avatar')).toHaveClass('gio-avatar-xl');
    expect(getByTestId('custom-size-avatar')).toHaveStyle({
      width: '120px',
      height: '120px',
    });
  });

  test('Should render a square avatar', () => {
    const { getAllByTestId } = render(
      <>
        <Avatar mode="square" />
        <Avatar mode="square" size="large" />
      </>
    );
    const avatars = getAllByTestId('avatar');
    expect(avatars[0]).toHaveClass('gio-avatar-square-medium');
    expect(avatars[1]).toHaveClass('gio-avatar-square-large');
  });

  test('Should render a avatar with icon', () => {
    const { getByTestId } = render(<Avatar icon={<UserOutlined />} />);
    expect(getByTestId('avatar').firstChild).toHaveClass('gio-avatar-icon');
  });

  /**
   * 如果在加载头像组件时发生错误(提供了无效的 src 属性)，组件将按照如下顺序切换到以下备选方案：
   * 1. 提供的图标
   * 2. 提供的 children 子元素
   * 3. 一个通用头像图标组件
   */
  test('Should have fallback', () => {
    const { getAllByRole, getAllByTestId } = render(
      <>
        <Avatar src="/fake.jpeg" icon={<EditOutlined />}>
          Jay
        </Avatar>
        <Avatar src="/fake.jpeg">Jay</Avatar>
        <Avatar src="/fake.jpeg" />
      </>
    );
    const images = getAllByRole('img');
    const avatars = getAllByTestId('avatar');
    act(() => {
      fireEvent.error(images[0]);
      fireEvent.error(images[1]);
      fireEvent.error(images[2]);
    });
    expect(avatars[0].firstChild).toHaveClass('gio-avatar-icon');
    expect(avatars[1].firstChild).toHaveTextContent('J');
    expect(avatars[2].firstChild).toHaveClass('gio-avatar-icon');
  });

  test('Should render a droppable avatar', () => {
    const { container } = render(<Avatar droppable>Jay</Avatar>);
    expect(container.querySelector('.gio-avatar-droppable')).not.toBeNull();
  });
});

describe('<Avatar.Group />', () => {
  test('Should render correctly', () => {
    const users = [
      { name: 'Jay Chou', backgroundColor: 'purple' },
      { name: 'Michael Jackson', backgroundColor: 'pink' },
      { name: 'JJ Lin', backgroundColor: 'palegoldenrod', icon: <EditOutlined /> },
      { name: 'Jacky Cheung' },
      { name: 'Leon Lai Ming' },
      { name: 'Andy Lau' },
    ];
    const number = 4;
    const { getAllByTestId, getByTestId } = render(<Avatar.Group number={number} users={users} />);
    const avatars = getAllByTestId('avatar');
    expect(getByTestId('avatarGroup')).not.toBeNull();
    expect(avatars).toHaveLength(number);
    expect(avatars[0]).toHaveAttribute('name', 'Jay Chou');
    expect(avatars[1]).toHaveAttribute('name', 'Michael Jackson');
    expect(avatars[2]).toHaveAttribute('name', 'JJ Lin');
    expect(avatars[3]).toHaveClass('gio-avatar-rest');
    expect(avatars[3]).toHaveTextContent(`${users.length - number + 1}`);
  });

  test('Should not render when users is empty', () => {
    const { container } = render(<Avatar.Group users={[]} />);
    expect(container.childElementCount).toEqual(0);
  });

  test('Should not render rest count', () => {
    const { getByTestId } = render(<Avatar.Group users={[{ name: 'Andy Lau' }]} number={1} />);
    expect(getByTestId('avatarGroup').childElementCount).toEqual(1);
    expect(getByTestId('avatar')).toHaveTextContent('A');
  });

  test("Should render children when haven't name", () => {
    const { getByTestId } = render(<Avatar.Group users={[{ name: null, children: 'Andy Lau' }]} />);
    expect(getByTestId('avatar')).toHaveTextContent('A');
  });
});
