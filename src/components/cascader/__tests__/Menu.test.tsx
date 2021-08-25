import { act } from 'react-dom/test-utils';
import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import Menu from '../menu';

describe('<Menu />', () => {
  it('should render menu-item', () => {
    const menu = [{ label: 'a', value: 1 }];
    const { container } = render(<Menu dataSource={menu} />);

    expect(container.getElementsByClassName('cascader-menu-item')).toHaveLength(1);
  });

  it('should ignore empty node data', () => {
    const menu: any[] = [];
    const { container } = render(<Menu depth={1} dataSource={menu} />);

    expect(container.getElementsByClassName('cascader-menu')).toHaveLength(0);
  });

  it('can not select a disabled node', async () => {
    const menu = [
      { label: '1', value: 1, disabled: true },
      { label: '2', value: 2, disabled: false },
    ];
    const fn = jest.fn();
    render(<Menu dataSource={menu} onSelect={fn} trigger="click" />);

    act(() => {
      fireEvent.click(screen.getAllByRole('button')[0]);
    });

    await waitFor(() => {
      expect(fn).not.toBeCalled();
    });

    act(() => {
      fireEvent.click(screen.getAllByRole('button')[1]);
    });

    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });

  it('can navigate by arrow keys', async () => {
    const menu = [
      { label: 'a', value: 1 },
      {
        label: 'b',
        value: 2,
        children: [
          { label: 'b1', value: 21 },
          { label: 'b2', value: 22 },
        ],
      },
    ];

    render(<Menu dataSource={menu} />);
    const children = screen.getAllByRole('button');
    const firstNode = children[0];
    const secondNode = children[1];

    // set up
    act(() => {
      fireEvent.focus(firstNode);
    });

    // ArrowDown
    act(() => {
      fireEvent.keyDown(firstNode, { bubbles: true, key: 'ArrowDown' });
    });

    // up
    act(() => {
      fireEvent.keyDown(secondNode, { bubbles: true, key: 'ArrowUp' });
    });

    // right
    act(() => {
      fireEvent.keyUp(secondNode, { bubbles: true, key: 'ArrowRight' });
    });
    await waitFor(() => {
      expect(document.activeElement.textContent).toEqual('b1');
    });

    // left
    act(() => {
      const event = new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft' });
      document.activeElement.dispatchEvent(event);
    });
    await waitFor(() => {
      expect(document.activeElement.textContent).toEqual('b');
    });

    // others
    act(() => {
      const event = new KeyboardEvent('keydown', { bubbles: true, key: '[' });
      document.activeElement.dispatchEvent(event);
    });
    await waitFor(() => {
      expect(document.activeElement.textContent).toEqual('b');
    });

    // other event target
    act(() => {
      fireEvent.keyDown(secondNode.parentNode, { bubbles: true, key: '|' });
    });
    await waitFor(() => {
      expect(document.activeElement.textContent).toEqual('b');
    });
  });

  it('should catch beforeSelect error', async () => {
    const menu = [{ label: 'a', value: 1 }];
    const beforeSelect = jest.fn(() => Promise.reject(Error('1')));
    let value: any;
    const onSelect = jest.fn((data) => {
      value = data.value;
    });
    render(<Menu dataSource={menu} beforeSelect={beforeSelect} onSelect={onSelect} />);

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(onSelect).toBeCalled();
      expect(value).toEqual(1);
    });
  });

  it('should catch onSelect error', async () => {
    const menu = [{ label: 'a', value: 1 }];
    const beforeSelect = jest.fn(() => Promise.reject(Error('1')));
    let value: any;
    const onSelect = jest.fn((data) => {
      value = data.value;
      throw Error('2');
    });
    render(<Menu dataSource={menu} beforeSelect={beforeSelect} onSelect={onSelect} />);

    act(() => {
      fireEvent.keyUp(screen.getByRole('button'), { key: ' ' });
    });

    await waitFor(() => {
      expect(onSelect).toBeCalled();
      expect(value).toEqual(1);
    });
  });

  it('should render sub-menu', async () => {
    const dataSource = [{ label: 'a', value: 1, children: [{ label: 'b', value: 2 }] }];
    render(<Menu dataSource={dataSource} trigger="click" />);

    act(() => {
      fireEvent.click(screen.getAllByRole('button')[0], { currentTarget: {} });
    });

    act(() => {
      const event = new MouseEvent('click', { bubbles: true });
      document.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(screen.getByText('a')).toBeTruthy();
    });
  });

  it('should bypass keyup event', async () => {
    const menu = [{ label: 'a', value: 1 }];
    const fn = jest.fn();
    render(<Menu dataSource={menu} onKeyUp={fn} />);

    act(() => {
      fireEvent.keyUp(screen.getByRole('button'), { key: 'ArrowLeft' });
      fireEvent.keyUp(screen.getByRole('button'), { key: '[' });
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
  });
});
