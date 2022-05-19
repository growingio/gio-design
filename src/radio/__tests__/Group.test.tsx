import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import Radio from ".."
import { IRadioGroupProps } from "../interface";

describe('RadioGroup', () => {
  test('render radio.group', () => {
    const Render = () => <Radio.Group value={1}>
      <Radio value={1}>option1</Radio>
      <Radio value={2}>option2</Radio>
    </Radio.Group>;
    const { container } = render(<Render />);
    // screen.debug()

    expect(container.querySelector('.gio-radio__group')).toBeTruthy();
    expect(screen.getByDisplayValue('1')).toHaveAttribute('checked');
    expect(screen.getByDisplayValue('2')).not.toHaveAttribute('checked');
  });
  test('support layout horizontal | vertical', () => {
    const Render = (props: Pick<IRadioGroupProps, 'layout'>) => {
      const { layout } = props;
      return <Radio.Group layout={layout} value={1}>
        <Radio value={1}>option1</Radio>
        <Radio value={2}>option2</Radio>
      </Radio.Group>
    };
    const { container, rerender } = render(<Render layout="horizontal" />);
    // screen.debug()

    expect(container.querySelector('.gio-radio__group__horizontal')).toBeTruthy();
    rerender(<Render layout="vertical" />);
    expect(container.querySelector('.gio-radio__group__vertical')).toBeTruthy();
  });
  test('render radio.group correctly with options prop', () => {
    const Render = () => <Radio.Group value={1} options={[{ value: 1, label: 1 }, { value: 2, label: 2 }, '3']} />;
    const { container } = render(<Render />);

    expect(container.querySelector('.gio-radio__group')).toBeTruthy();
    expect(container.querySelectorAll('input').length).toBe(3)
    expect(screen.getByDisplayValue('1')).toBeTruthy();
    expect(screen.getByDisplayValue('2')).toBeTruthy();
  });
  test('should fire change when click  radio', () => {
    const mockChange = jest.fn()
    const Render = () => <Radio.Group onChange={mockChange}>
      <Radio value={1} onChange={mockChange}>option1</Radio>
      <Radio value={2} onChange={mockChange}>option2</Radio>
    </Radio.Group>;
    const { container } = render(<Render />);

    expect(container.querySelector('.gio-radio__group')).toBeTruthy();
    fireEvent.click(screen.getByDisplayValue('1'));
    fireEvent.click(screen.getByDisplayValue('2'));
    expect(mockChange).toHaveBeenCalledTimes(4);
  });


});

describe('trigger warning', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /** nothing */ });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });
  test('trigger warning when children type is not Radio', () => {
    render(<Radio.Group>
      <span>A</span>
      <span>B</span>
    </Radio.Group>);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Children wrapped by RadioGroup component should be a Radio. Please check the Radio Component in your RadioGroup.',
    );
  });

  test('trigger warning when child not include value prop', () => {
    render(<Radio.Group>
      <Radio>A</Radio>
      <Radio>B</Radio>
    </Radio.Group>);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Radio wrapped by RadioGroup component which has no "value" prop will not be rendered. Please check the Radio Component in your RadioGroup.',
    );
  });

  test('render incorrect', () => {
    const { container } = render(<Radio.Group>
      A
    </Radio.Group>);
    expect(container.querySelector('input[type="radio"]')).toBeFalsy()
  })
});