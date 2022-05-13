import { render, screen } from '@testing-library/react';
import React from 'react';
import InputNumber from '../InputNumber';

describe('Testing InputNumber ', () => {
  it('render a input type=number', () => {
    const { container } = render(<InputNumber defaultValue='111' />);
    expect(screen.getByTestId('input-number')).toBeTruthy();
    expect(container.querySelector('input[type="number"]')).toBeTruthy();
    expect(container.querySelector('input[type="number"]').getAttribute('value')).toBe('111')
  })
})