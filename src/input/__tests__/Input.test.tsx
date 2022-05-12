import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Input from '../Input';

describe('testing input', () => {
  it('should render input', async () => {
    const { container } = render(<Input defaultValue="1111" />);
    expect(screen.getByTestId('input')).toBeTruthy();
    expect(container.querySelector('input[value="1111"]')).toBeTruthy();
  });
  it('trigger event when press enter key', async () => {
    const mockEnterPress = jest.fn();
    const ref = React.createRef<HTMLInputElement>();
    render(<Input inputRef={ref} defaultValue="1111" onPressEnter={mockEnterPress} />);
    const inputElem = screen.getByTestId('input');
    ref.current?.focus();
    fireEvent.keyPress(inputElem, { key: "Enter", keyCode: 13 });
    expect(mockEnterPress).toHaveBeenCalledTimes(1);
  });
  it('trigger event when press key', async () => {
    const mockKeyPress = jest.fn();
    const ref = React.createRef<HTMLInputElement>();
    render(<Input inputRef={ref} defaultValue="1111" onKeyPress={mockKeyPress} />);
    const inputElem = screen.getByTestId('input');
    ref.current?.focus();
    fireEvent.keyPress(inputElem, { key: "Enter", charCode: 13 });
    fireEvent.keyPress(inputElem, { charCode: 65 });
    expect(mockKeyPress).toHaveBeenCalledTimes(2);

  });
  it('trigger change event', async () => {
    let changedValue = '';
    const mockChange = jest.fn((e) => {
      changedValue = e.target.value
    });
    const ref = React.createRef<HTMLInputElement>();
    render(<Input inputRef={ref} defaultValue="1111" onChange={mockChange} />);
    const inputElem = screen.getByTestId('input');
    fireEvent.change(inputElem, { target: { value: "2222" } });

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(changedValue).toBe('2222');
  })
  it('should support custom placeholder', () => {
    const { container } = render(<Input placeholder='hi' />);
    expect(container.querySelector('input[placeholder="hi"]')).toBeTruthy();
  });
  it('should support size', () => {
    const { container } = render(<Input size='small' />);
    expect(container.querySelector('.gio-input__small')).toBeTruthy();
  });
  it('select()', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input inputRef={ref} />);
    ref.current?.select();
    ref.current?.focus();
    expect(document.activeElement).toBe(screen.getByTestId('input'));
  });
  it('should support custom className ', () => {
    const { container } = render(<Input className="my-class-name" />);
    expect((container.firstChild as Element).className.includes('my-class-name')).toBe(true);
    expect(container.querySelector('input')?.className.includes('my-class-name')).toBe(false);
  });
  it('trigger focus/hover style', async () => {
    const { container } = render(<Input />);
    const inputEle = container.querySelector('.gio-input__hover');
    expect(inputEle).toBeTruthy();
  });
  it('can not trigger focus/hover style when disabled', async () => {
    const { container } = render(<Input disabled />);
    const inputEle = container.querySelector('.gio-input__hover');
    expect(inputEle).toBeFalsy();
  });
  it('should support maxLength', () => {
    const { container } = render(<Input maxLength={3} />);
    expect(container.querySelector('input[maxlength="3"]')).toBeTruthy();
  });
  describe('prefix and suffix', () => {
    it('set prefix testing', () => {
      const { container } = render(<Input prefix="hello" />);
      expect(container.querySelector('.gio-input__prefix').textContent).toBe('hello')

    })
    it('set suffix testing', () => {
      const { container } = render(<Input suffix="hello" />);
      expect(container.querySelector('.gio-input__suffix').textContent).toBe('hello')

    })
  })
})