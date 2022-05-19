import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DragList from '../Drag';


const fireMouseEvent = function (
  type: string,
  elem: EventTarget,
  centerX: number,
  centerY: number
) {
  const evt = document.createEvent('MouseEvents');
  evt.initMouseEvent(
    type,
    true,
    true,
    window,
    1,
    1,
    1,
    centerX,
    centerY,
    false,
    false,
    false,
    false,
    0,
    elem
  );
  return elem.dispatchEvent(evt);
};

const dragAndDrop = (elemDrag: HTMLElement, elemDrop: HTMLElement,upOrDown = true) => {
  act(() => {
    // calculate positions
    let pos = elemDrag.getBoundingClientRect();
    const center1X = Math.floor((pos.left + pos.right) / 2);
    const center1Y = Math.floor((pos.top + pos.bottom) / 2);

    pos = elemDrop.getBoundingClientRect();
    const center2X = upOrDown ? Math.floor((pos.left + pos.right) / 2) :Math.floor((pos.left - pos.right) / 2);
    const center2Y = upOrDown ? Math.floor((pos.top + pos.bottom) / 2) : Math.floor((pos.top - pos.bottom) / 2);

    // mouse over dragged element and mousedown
    fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
    fireMouseEvent('mouseenter', elemDrag, center1X, center1Y);
    fireMouseEvent('mouseover', elemDrag, center1X, center1Y);
    fireMouseEvent('mousedown', elemDrag, center1X, center1Y);

    // start dragging process over to drop target
    const dragStarted = fireMouseEvent(
      'dragstart',
      elemDrag,
      center1X,
      center1Y
    );
    if (!dragStarted) {
      return;
    }

    fireMouseEvent('drag', elemDrag, center1X, center1Y);
    fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
    fireMouseEvent('drag', elemDrag, center2X, center2Y);
    fireMouseEvent('mousemove', elemDrop, center2X, center2Y);

    // trigger dragging process on top of drop target
    fireMouseEvent('mouseenter', elemDrop, center2X, center2Y);
    fireMouseEvent('dragenter', elemDrop, center2X, center2Y);
    fireMouseEvent('mouseover', elemDrop, center2X, center2Y);
    fireMouseEvent('dragover', elemDrop, center2X, center2Y);

    // release dragged element on top of drop target
    fireMouseEvent('drop', elemDrop, center2X, center2Y);
    fireMouseEvent('dragend', elemDrag, center2X, center2Y);
    fireMouseEvent('mouseup', elemDrag, center2X, center2Y);
  });
};

describe('tesing drag list', () => {
  const dragOptions = [
    {
      label: `List Item 1`,
      value: 1,
      disabled: false,
    },
    {
      label: `List Item 2`,
      value: 2,
      disabled: false,
    },
    {
      label: `List Item 3`,
      value: 3,
      disabled: true,
    }
  ]
  it('render drag list', () => {
    const { container } = render(<DragList options={dragOptions} />);
    expect(container.querySelector('.gio-list--drag')).toBeTruthy();
    expect(container.querySelectorAll('[draggable="true"]').length).toBe(3)
    expect(screen.queryAllByRole('img', { name: 'drag-outlined' })?.length).toBe(3);

  });

  it('trigger onChange when drag drop a list item', async () => {
    const mockChange = jest.fn();
    const { container } = render(<DragList options={dragOptions} onChange={mockChange} />);
    const draggableNodes = container.querySelectorAll('[draggable="true"]');
    const dragElement = draggableNodes[0];
    const dropZone = draggableNodes[1];
    await fireEvent.dragStart(dragElement);
    await fireEvent.dragOver(dropZone);
    await fireEvent.drop(dropZone);

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith([
      { label: 'List Item 2', value: 2, disabled: false },
      { label: 'List Item 1', value: 1, disabled: false },
      { label: 'List Item 3', value: 3, disabled: true }
    ]);
  });
  it('should not trigger onChange when drag item ==drop item', async () => {
    const mockChange = jest.fn();
    const { container } = render(<DragList options={dragOptions} onChange={mockChange} />);
    const draggableNodes = container.querySelectorAll('[draggable="true"]');
    const dragElement = draggableNodes[0];
    const dropZone = draggableNodes[0];
    await fireEvent.dragStart(dragElement);
    await fireEvent.dragOver(dropZone, { clientX: dropZone.clientLeft, clientY: dropZone.clientTop });
    await fireEvent.drop(dropZone, { clientX: dropZone.clientLeft, clientY: dropZone.clientTop });

    expect(mockChange).toHaveBeenCalledTimes(0);

  });

  it('should not trigger onChange when drop target under drag item and clientY< middle of drop item y', async () => {
    const mockChange = jest.fn();
    render(<DragList options={dragOptions} onChange={mockChange} />);
    const dragElement = screen.getByText('List Item 1');
    const dropZone = screen.getByText('List Item 3');
    dropZone.parentElement.parentElement.getBoundingClientRect = jest.fn(() => ({
        bottom: 300,
        height: 30,
        left: 20,
        right: 500,
        top: 210,
        width: 500,
        x: 20,
        y: 230,
      } as DOMRect))
      dragElement.getBoundingClientRect = jest.fn(() => ({
        bottom: 300,
        height: 30,
        left: 20,
        right: 500,
        top: 200,
        width: 500,
        x: 20,
        y: 230,
      } as DOMRect))

      await userEvent.pointer([
        { keys: '[MouseLeft>]', target: dragElement },
      // move the touch pointer to element2
        { keys: 'MouseLeft', target: dropZone },
      // release the touch pointer at the last position (element2)
        { keys: '[/MouseLeft]' },
      ])
    await userEvent.pointer([
      // touch the screen at element1
        { keys: '[TouchA>]', target: dragElement },
      // move the touch pointer to element2
        { pointerName: 'TouchA', target: dropZone },
      // release the touch pointer at the last position (element2)
        { keys: '[/TouchA]' },
    ])

    dragAndDrop(dragElement, dropZone);
  });
});
