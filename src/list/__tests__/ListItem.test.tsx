import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import List, { Item } from '..';
import BaseItem from '../inner/baseItem';
import CascaderItem from '../inner/CascaderItem';
import CheckboxItem from '../inner/CheckboxItem';

describe('testing list item', () => {
  afterEach(() => {
    jest.useRealTimers();
  });
  it('baseItem', () => {
    const { container } = render(<BaseItem value={1} label="1" selected />);

    expect(screen.queryByTestId('item-base')).toBeTruthy();
    expect(container.querySelector('.gio-list--item--actived')).toBeTruthy();
  });
  it('baseItem with children', () => {
    const { container } = render(
      <BaseItem label="item2" value={1}>
        item1
      </BaseItem>
    );

    expect(screen.queryByTestId('item-base')).toBeTruthy();
    expect(screen.queryByText('item2')).toBeTruthy();
    expect(container.querySelector('.gio-list--item')).toBeTruthy();
  });
  it('baseItem fire events', () => {
    jest.useFakeTimers('modern');
    const mockMouseEnter = jest.fn();
    const mockMouseLeave = jest.fn();
    const mockClick = jest.fn();
    const { container } = render(
      <BaseItem value={1} label="1" onClick={mockClick} onMouseEnter={mockMouseEnter} onMouseLeave={mockMouseLeave} />
    );
    const ele = screen.queryByTestId('item-base');

    expect(ele).toBeTruthy();
    act(() => {
      fireEvent.mouseEnter(ele);
    });
    jest.runAllTimers();
    expect(container.querySelector('.gio-list--item--hovered')).toBeTruthy();
    expect(mockMouseEnter).toHaveBeenCalled();

    fireEvent.click(ele);
    expect(mockClick).toHaveBeenCalled();

    act(() => {
      fireEvent.mouseLeave(ele);
    });
    jest.runAllTimers();
    expect(container.querySelector('.gio-list--item--hovered')).toBeFalsy();
  });
});

describe('cascader item testing', () => {
  it('render cascaderItem', () => {
    const { container } = render(<CascaderItem label="1" value={1} />);
    expect(container.querySelector('.gio-cascader--item')).toBeTruthy();
  });
  it('render', () => {
    const { container } = render(<CascaderItem label="1" value={1} items={null} />);
    expect(container.querySelector('.gio-cascader--item')).toBeTruthy();
  });

  it('should not fire click when disabled', () => {
    const mockClick = jest.fn();
    render(
      <CascaderItem disabled onClick={mockClick} label="1" value={1} items={[{ value: 2, label: '2' }, undefined]} />
    );
    expect(screen.queryByTestId('item-base')).toBeTruthy();

    const clickEle = screen.getByText('1');
    fireEvent.click(clickEle);
    expect(mockClick).not.toHaveBeenCalled();
  });
  it('fire list click when click item', () => {
    const mockClick = jest.fn();
    const itemClick = jest.fn();
    render(
      <List onClick={mockClick}>
        <CascaderItem onClick={itemClick} label="1" value={1} />
      </List>
    );
    const clickEle = screen.getByText('1');
    fireEvent.click(clickEle);
    expect(mockClick).toHaveBeenCalled();
  });
  it('should trigger events ', () => {
    jest.useFakeTimers();

    const mockClick = jest.fn();
    const Render = () => (
      <CascaderItem onClick={mockClick} label="1" value={1}>
        <List>
          <BaseItem value={1.1} label="1.1" />
        </List>
      </CascaderItem>
    );
    render(<Render />);
    expect(screen.queryByTestId('item-base')).toBeTruthy();

    const clickEle = screen.getByText('1');

    act(() => {
      fireEvent.mouseEnter(clickEle);
    });
    jest.runOnlyPendingTimers();
    fireEvent.click(clickEle);
    expect(mockClick).toHaveBeenCalled();
  });
});

describe('CheckboxItem', () => {
  it('trigger click event when click item', () => {
    const mockClick = jest.fn();
    render(
      <List model="multiple">
        <Item onClick={mockClick} value="1">
          List Item 1
        </Item>
      </List>
    );
    const items = screen.queryAllByTestId('checkbox');
    fireEvent.click(items[0]);

    expect(mockClick).toHaveBeenCalled();
  });
  it('fire click ', () => {
    const mockClick = jest.fn();
    render(<CheckboxItem value={1} onClick={mockClick} />);
    const items = screen.queryAllByTestId('checkbox');
    fireEvent.click(items[0]);

    expect(mockClick).toHaveBeenCalled();
  });
  it('prefix suffix', () => {
    const { container } = render(<CheckboxItem value={1} prefix={<span>$</span>} suffix={<span>%</span>} />);
    expect(container.querySelector('.gio-list--item-prefix-icon')).toBeTruthy();
    expect(container.querySelector('.gio-list--item-suffix-icon')).toBeTruthy();
  });
});
