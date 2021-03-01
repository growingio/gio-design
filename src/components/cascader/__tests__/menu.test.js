import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';

import Menu from '../menu';

describe('<Menu />', () => {
  it('should render menu-item', () => {
    const menu = [{ label: 'a', value: 1 }];
    const wrapper = mount(<Menu dataSource={menu} />);

    expect(wrapper.find('.cascader-menu .cascader-menu-item')).toHaveLength(1);
  });

  it('should ignore empty node data', () => {
    const menu = [];
    const wrapper = mount(<Menu depth={1} dataSource={menu} />);

    expect(wrapper.find('.cascader-menu')).toHaveLength(0);
  });

  it('can not select a disabled node', async () => {
    const menu = [
      { label: '1', value: 1, disabled: true },
      { label: '2', value: 2, disabled: false },
    ];
    const fn = jest.fn();
    const wrapper = mount(<Menu dataSource={menu} onSelect={fn} trigger="click" />);

    act(() => {
      wrapper.find('.cascader-menu-item-inner').at(0).simulate('click');
    });

    await waitFor(() => {
      expect(fn).not.toBeCalled();
    });

    act(() => {
      wrapper.find('.cascader-menu-item-inner').at(1).simulate('click');
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
    const root = document.createElement('div');
    document.body.append(root);
    const wrapper = mount(<Menu dataSource={menu} />, { attachTo: root });
    const children = wrapper.find('.cascader-menu-item-inner');
    const firstNode = children.at(0);
    const secondNode = children.at(1);

    // set up
    act(() => {
      firstNode.instance().focus();
    });

    expect(firstNode.instance().outerHTML).toEqual(document.activeElement.outerHTML);

    // ArrowDown
    act(() => {
      const event = new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' });
      firstNode.instance().dispatchEvent(event);
    });

    expect(secondNode.instance().outerHTML).toEqual(document.activeElement.outerHTML);

    // up
    act(() => {
      const event = new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowUp' });
      secondNode.instance().dispatchEvent(event);
    });

    expect(firstNode.instance().outerHTML).toEqual(document.activeElement.outerHTML);

    // right
    act(() => {
      const event = new KeyboardEvent('keyup', { target: secondNode.instance(), bubbles: true, key: 'ArrowRight' });
      secondNode.instance().dispatchEvent(event);
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

    // other key
    act(() => {
      const event = new KeyboardEvent('keydown', { bubbles: true, key: '[' });
      document.activeElement.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(document.activeElement.textContent).toEqual('b');
    });

    // other event target
    act(() => {
      const event = new KeyboardEvent('keydown', { bubbles: true, key: '[' });
      secondNode.instance().parentNode.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(document.activeElement.textContent).toEqual('b');
    });
  });

  it('should catch beforeSelect error', async () => {
    const menu = [{ label: 'a', value: 1 }];
    const beforeSelect = jest.fn(() => Promise.reject(Error('1')));
    let value;
    const onSelect = jest.fn((data) => {
      value = data.value;
    });
    const wrapper = mount(<Menu dataSource={menu} beforeSelect={beforeSelect} onSelect={onSelect} />);

    act(() => {
      wrapper.find('.cascader-menu-item-inner').simulate('click');
    });

    await waitFor(() => {
      expect(onSelect).toBeCalled();
      expect(value).toEqual(1);
    });
  });

  it('should catch beforeSelect error', async () => {
    const menu = [{ label: 'a', value: 1 }];
    const beforeSelect = jest.fn(() => Promise.reject(Error('1')));
    let value;
    const onSelect = jest.fn((data) => {
      value = data.value;
      throw Error('2');
    });
    const wrapper = mount(<Menu dataSource={menu} beforeSelect={beforeSelect} onSelect={onSelect} />);

    act(() => {
      wrapper.find('.cascader-menu-item-inner').simulate('keyup', { key: ' ' });
    });

    await waitFor(() => {
      expect(onSelect).toBeCalled();
      expect(value).toEqual(1);
    });
  });

  it('should render sub-menu', async () => {
    const dataSource = [{ label: 'a', value: 1, children: [{ label: 'b', value: 2 }] }];
    const wrapper = mount(<Menu dataSource={dataSource} trigger="click" />);

    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(0).simulate('click', { currentTarget: {} });
    });

    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-outer').text()).toEqual('ab');
    });

    act(() => {
      const event = new MouseEvent('click', { bubbles: true });
      document.dispatchEvent(event);
    });
    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-outer').text()).toEqual('a');
    });
  });
});
