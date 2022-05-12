import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import InputButton from '../InputButton';

describe('testing InputButton', () => {
  it('should render an element input[type="button"]', () => {
    const { container } = render(<InputButton defaultValue='111' />);
    expect(container.querySelector('input[type="button"]')).toBeTruthy()
  });
  it('allowClear', () => {
    let changedValue;
    const mockChange = jest.fn(e => {
      changedValue = e;
    });
    const { container } = render(<InputButton defaultValue='111' allowClear onChange={mockChange} />);

    expect(container.querySelector('span[aria-label="error-filled"]')).toBeTruthy();
    fireEvent.click(container.querySelector('span[aria-label="error-filled"]'));
    expect(mockChange).toHaveBeenCalled();
    expect(changedValue).toEqual('');
  });
  it('should has active class when set active=true ', () => {
    const { container } = render(<InputButton defaultValue='111' active />);
    expect(container.querySelector('.gio-input-btn__active')).toBeTruthy();
  })
  it('diabled should not allowClear', () => {
    const { container } = render(<InputButton defaultValue='111' allowClear disabled />);
    expect(container.querySelector('.gio-input__suffix-disabled')).toBeTruthy();
    expect(container.querySelector('span[aria-label="error-filled"]')).toBeFalsy();
    expect(container.querySelector('span[aria-label="down-filled"]')).toBeTruthy();

  });
  it('trigger event when click clear icon', () => {
    const mockClear = jest.fn();
    const mockInputChange = jest.fn()
    const { container } = render(<InputButton defaultValue='111' allowClear onClear={mockClear} onInputChange={mockInputChange} />);
    fireEvent.click(container.querySelector('span[aria-label="error-filled"]'));
    expect(mockClear).toHaveBeenCalled();
    expect(mockInputChange).toHaveBeenCalledWith('');
  });
  it('custom style and maxWidth', () => {
    const { container } = render(<InputButton defaultValue='111' style={{ color: 'red' }} allowClear maxWidth={200} />);
    expect(container).toMatchSnapshot();
    expect(container.querySelector('.gio-input-btn__input')).toHaveStyle({ color: 'red', maxWidth: '200px' });
  })
})