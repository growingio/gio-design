import React from 'react';
import { render, screen } from '@testing-library/react';
import { Basic, ShowSecond } from '../demos/TimePicker.stories';

describe('TimePicker', () => {
  it('renders with default', () => {
    render(<Basic />);
    expect(screen.getAllByText('00')).toHaveLength(2);
    expect(screen.getAllByText('59')).toHaveLength(1);
  });

  it('renders with second', () => {
    render(<ShowSecond {...ShowSecond.args} />);
    expect(screen.getAllByText('00')).toHaveLength(3);
    expect(screen.getAllByText('59')).toHaveLength(2);
  });
});
