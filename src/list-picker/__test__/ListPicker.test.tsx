import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Basic } from '../ListPicker.stories';

describe('ListPicker', () => {
  it('renders options', () => {
    const { rerender } = render(<Basic options={Basic.args.options} />);
    const options = screen.getAllByText(/Option/);
    expect(options).toHaveLength(4);
    fireEvent.click(options[0]);

    const handleOnSelect = jest.fn();
    rerender(<Basic options={Basic.args.options} onSelect={handleOnSelect} />);
    fireEvent.click(options[0]);
    expect(handleOnSelect).toHaveBeenCalledWith(Basic.args.options[0].value);
  });
});
