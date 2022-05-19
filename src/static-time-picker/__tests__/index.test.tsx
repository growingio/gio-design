import { render, screen } from '@testing-library/react';
import React from 'react';
import StaticTimePicker from '../StaticTimePicker';

describe('Testing StaticTimePicker ', () => {
  it('without params', () => {
    render(<StaticTimePicker />);
    expect(screen.getByText('59')).toBeTruthy();
  });

  it('showSecond', () => {
    render(<StaticTimePicker showSecond />);
    expect(screen.getAllByText('59').length).toBe(2);
  });
});
