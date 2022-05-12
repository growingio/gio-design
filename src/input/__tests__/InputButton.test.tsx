import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import InputButton from '../InputButton';

describe('testing InputButton', () => {
  it('should render an element input[type="button"]', () => {
    const { container } = render(<InputButton value='111' />);
    expect(container.querySelector('input[type="button"]')).toBeTruthy()
  })
})