import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Password from '../Password';

describe('testing password', () => {
  it('render input type=password', () => {
    const { container } = render(<Password defaultValue="111" />);
    expect(screen.getByTestId('input-password')).toBeTruthy();
    expect(container.querySelector('input[type="password"]')).toBeTruthy();
    expect(container.querySelector('input[type="password"]').getAttribute('value')).toBe('111')
  });
  it('should change type when click password Suffix icon ', () => {
    const { container } = render(<Password defaultValue="111" />);
    expect(container.querySelector('span[aria-label="eye-outlined"]')).toBeTruthy();
    expect(container.querySelector('span[aria-label="eye-slash-outlined"]')).toBeFalsy();
    expect(container.querySelector('input[type="password"]')).toBeTruthy();
    fireEvent.click(container.querySelector('span[aria-label="eye-outlined"]'));
    expect(container.querySelector('input[type="password"]')).toBeFalsy();
    expect(container.querySelector('span[aria-label="eye-outlined"]')).toBeFalsy();
    expect(container.querySelector('span[aria-label="eye-slash-outlined"]')).toBeTruthy();
  });
  it('should not change type when  password set disabled ', () => {
    const { container } = render(<Password defaultValue="111" disabled />);

    fireEvent.click(container.querySelector('span[aria-label="eye-outlined"]'));
    expect(container.querySelector('input[type="password"]')).toBeTruthy();

  })
})