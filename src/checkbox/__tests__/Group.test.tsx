import { fireEvent, render, act } from "@testing-library/react"
import React, { useState } from "react"
import Checkbox from ".."
import Button from "../../button";
import { CheckboxGroupProps, CheckboxValueType } from "../interface";

describe('testing CheckboxGroup', () => {
  afterEach(() => {
    jest.useRealTimers()
  })
  test('render group correctly', () => {
    const { container } = render(<Checkbox.Group options={[{ value: '1', label: '1' }, { value: '2', label: '2', disabled: true }]} />);

    expect(container.querySelectorAll('input[type="checkbox"]').length).toBe(2);

  });
  test('render group', () => {
    const { container } = render(<Checkbox.Group options={['A', 'B'] as unknown as CheckboxGroupProps<string>['options']} />);

    expect(container.querySelectorAll('input[type="checkbox"]').length).toBe(2);
  });
  test('controlled value', () => {
    jest.useFakeTimers()
    const Demo = () => {
      const [val, setVal] = useState<(string | number)[]>([])
      return <div><Button onClick={() => setVal([2])}>checkB</Button>
        <Checkbox.Group value={val} options={[{ value: 1, label: 'A' }, { value: 2, label: 'B' }, { value: 3, label: 'C' }]} />
      </div>
    };
    const { container } = render(<Demo />);
    act(() => {
      fireEvent.click(container.querySelector('button'));
    });
    jest.runOnlyPendingTimers();
    expect(container.querySelector('input[value="2"]')).toHaveClass('gio-checkbox-checked', { exact: false })
  })
  test('fire change when click checkbox', () => {
    const mockChange = jest.fn();

    const Demo = () => <Checkbox.Group onChange={(e) => {
      mockChange(e);
    }} options={[{ value: 1, label: 'A' }, { value: 2, label: 'B' }, { value: 3, label: 'C' }]} />
    const { container } = render(<Demo />);
    const checks = container.querySelectorAll('input[type="checkbox"]')

    expect(checks?.length).toBe(3);

    act(() => {
      fireEvent.click(checks[0]);
    })
    expect(mockChange).toHaveBeenCalledWith([1])

    act(() => {
      fireEvent.click(checks[2]);
    })
    expect(mockChange).toHaveBeenCalledWith([1, 3])
    act(() => {
      fireEvent.click(checks[1]);
    })
    expect(mockChange).toHaveBeenLastCalledWith([1, 2, 3])

  })
  test('fire change when click checkbox with contolled value', () => {
    const mockChange = jest.fn();
    const mockCheckboxChange = jest.fn();

    const Demo = () => {
      const [val, setVal] = React.useState<CheckboxValueType[]>([2]);
      return <Checkbox.Group onChange={(e) => {
        mockChange(e);
        setVal(e);
      }} value={val}>
        <Checkbox value={1} onChange={mockCheckboxChange}>A</Checkbox>
        <Checkbox value={2}>B</Checkbox>
        <Checkbox value={3}>C</Checkbox>
      </Checkbox.Group>
    }
    const { container } = render(<Demo />);
    const checks = container.querySelectorAll('input[type="checkbox"]')

    expect(checks?.length).toBe(3);

    act(() => {
      fireEvent.click(checks[0]);
    })
    expect(mockChange).toHaveBeenCalledWith([2, 1])
    expect(mockCheckboxChange).toHaveBeenCalled();

    act(() => {
      fireEvent.click(checks[1]);
    })
    expect(mockChange).toHaveBeenCalledWith([1])

  })
});
