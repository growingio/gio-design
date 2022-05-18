import { fireEvent, render, screen, act } from "@testing-library/react"
import React from "react"
import Checkbox from ".."

describe('testing Checkbox', () => {
  afterEach(() => {
    jest.useRealTimers()
  })
  test('render checkbox correctly', () => {
    const { container } = render(<Checkbox checked={false} indeterminate={false} />);
    expect(container.querySelector('.gio-checkbox')).toBeTruthy();
    expect(screen.getByTestId('checkbox')).toBeTruthy();
    expect(container.querySelector('input[type="checkbox"]')).toBeTruthy();
  })
  test('render Checkbox  checked', () => {
    const { container } = render(<Checkbox checked />);
    expect(container.querySelector('.gio-checkbox')).toBeTruthy();
    expect(screen.getByTestId('checkbox')).toBeTruthy();
    expect(container.querySelector('input[checked]')).toBeTruthy();
  })
  test('render checkbox element disbaled', () => {
    const { container } = render(<Checkbox disabled defaultChecked className="custom-cls">disabled option</Checkbox>);
    expect(container.querySelector('.gio-checkbox-disabled')).toBeTruthy();
    expect(container.querySelector('.custom-cls')).toBeTruthy();

  })
  test('support indeterminate ', () => {
    const { container } = render(<Checkbox indeterminate />);
    expect(container.querySelector('.gio-checkbox-indeterminate')).toBeTruthy();
  })
  test('toggle checked when click ', () => {
    jest.useFakeTimers()
    const { container } = render(<Checkbox />);
    const ele = container.querySelector('input');
    act(() => {
      fireEvent.click(ele)

    })
    jest.runOnlyPendingTimers()
    expect(container.querySelector('.gio-checkbox-checked')).toBeTruthy();

    act(() => {
      fireEvent.click(ele)

    })
    expect(container.querySelector('.gio-checkbox-checked')).toBeFalsy();
  })
  test('should fire change when click element ', () => {
    jest.useFakeTimers()
    const mockChange = jest.fn();
    const Demo = () => {
      const [val, setVal] = React.useState(1);
      return <Checkbox onChange={(e) => {
        setVal(2);
        mockChange(e);
      }
      } value={val} > A</Checkbox>
    }
    const { container } = render(<Demo />);
    expect(container.querySelector('label')).toBeTruthy();
    act(() => {
      fireEvent.click(container.querySelector('label'));
    })
    jest.runOnlyPendingTimers();
    expect(mockChange).toHaveBeenCalled();
  });

  test('contolled value ', () => {
    jest.useFakeTimers()
    const mockChange = jest.fn();
    const Demo = () => {
      // const [val, setVal] = React.useState<(number | string)[]>([1]);
      const [optionVal, setOptionVal] = React.useState(1);
      return <Checkbox.Group>
        <Checkbox value={optionVal} onChange={mockChange} onClick={() => setOptionVal(2)}>A</Checkbox>
      </Checkbox.Group>
    }
    const { container } = render(<Demo />);
    expect(container.querySelector('label')).toBeTruthy();
    act(() => {
      fireEvent.click(container.querySelector('label'));
    })
    jest.runOnlyPendingTimers();
    expect(mockChange).toHaveBeenCalled();
  })
})