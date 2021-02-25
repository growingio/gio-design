import React from 'react';
import { render, screen } from '@testing-library/react';
import Divider from '../Divider';

describe('Divider', () => {
  it('render without props', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeTruthy();
  });
});
