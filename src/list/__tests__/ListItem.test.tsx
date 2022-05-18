import { act, fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import List from "..";
import BaseItem from "../inner/baseItem"
import CascaderItem from "../inner/CascaderItem";

describe('testing list item', () => {
  afterEach(() => {
    jest.useRealTimers()
  })
  it('baseItem', () => {
    const { container } = render(<BaseItem value={1} label="1" selected />);

    expect(screen.queryByTestId('item-base')).toBeTruthy();
    expect(container.querySelector('.gio-list--item--actived')).toBeTruthy()
  });

  it('baseItem', () => {
    jest.useFakeTimers()
    const mockMouseEnter = jest.fn();
    const mockMouseLeave = jest.fn();
    const mockClick = jest.fn();
    const { container } = render(<BaseItem value={1} label="1" onClick={mockClick} onMouseEnter={mockMouseEnter} onMouseLeave={mockMouseLeave} />);
    const ele = screen.queryByTestId('item-base')

    expect(ele).toBeTruthy();
    act(() => {
      fireEvent.mouseEnter(ele);

    })
    jest.runAllTimers();
    expect(container.querySelector('.gio-list--item--hovered')).toBeTruthy();
    expect(mockMouseEnter).toHaveBeenCalled();

    fireEvent.click(ele);
    expect(mockClick).toHaveBeenCalled();

    act(() => {
      fireEvent.mouseLeave(ele);

    })
    jest.runAllTimers();
    expect(container.querySelector('.gio-list--item--hovered')).toBeFalsy();

  });
});

describe('cascader item testing', () => {
  it('render cascaderItem', () => {
    const { container } = render(<CascaderItem label="1" value={1} />);
    expect(container.querySelector('.gio-cascader--item')).toBeTruthy();
  });

  it('should trigger events ', () => {
    jest.useFakeTimers()

    const mockClick = jest.fn();
    const Render = () => <CascaderItem onClick={mockClick} label="1" value={1} >
      <List>
        <BaseItem value={1.1} label="1.1" />
      </List>
    </CascaderItem>
    render(<Render />);
    expect(screen.queryByTestId('item-base')).toBeTruthy();

    const clickEle = screen.getByText('1')


    act(() => {
      fireEvent.mouseEnter(clickEle);
    })
    jest.runOnlyPendingTimers();
    fireEvent.click(clickEle);
    expect(mockClick).toHaveBeenCalled();
  })
})