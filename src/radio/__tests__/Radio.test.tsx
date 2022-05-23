import { fireEvent, render, screen, act } from "@testing-library/react"
import React from "react"
import Radio from ".."

describe('testing Radio', () => {
  afterEach(() => {
    jest.useRealTimers()
  })
  test('render radio element', () => {
    const { container } = render(<Radio />);
    expect(container.querySelector('.gio-radio')).toBeTruthy();
    expect(screen.getByTestId('radio')).toBeTruthy();
    expect(container.querySelector('input[type="radio"]')).toBeTruthy();
  })
  test('render radio element checked', () => {
    const { container } = render(<Radio checked />);
    expect(container.querySelector('.gio-radio')).toBeTruthy();
    expect(screen.getByTestId('radio')).toBeTruthy();
    expect(container.querySelector('input[checked]')).toBeTruthy();
  })
  test('render radio element disbaled', () => {
    const { container } = render(<Radio disabled defaultChecked className="custom-cls">disabled radio</Radio>);
    expect(container.querySelector('.gio-radio-disabled')).toBeTruthy();
    expect(container.querySelector('.custom-cls')).toBeTruthy();
    expect(screen.getByText('disabled radio')).toBeTruthy();
  })

  test('should trigger change when click element ', () => {
    jest.useFakeTimers()
    const mockChange = jest.fn();
    const { container } = render(<Radio onChange={mockChange} value={1}  >radio</Radio>);
    expect(container.querySelector('label')).toBeTruthy();
    act(() => {
      fireEvent.click(container.querySelector('label'));
    })
    jest.runOnlyPendingTimers();
    expect(mockChange).toHaveBeenCalled();
  })
})