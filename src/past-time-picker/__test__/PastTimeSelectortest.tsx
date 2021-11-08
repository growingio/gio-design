import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Quick } from '../demos/PastTimePicker.stories';
import PastTimePicker from '../PastTimePicker';

describe('PastTimePicker', () => {
  it('should to be selected', () => {
    const handleOnSelect = jest.fn();
    render(<Quick {...Quick.args} onSelect={handleOnSelect} />);
    expect(screen.getByText(/过去 7 天/)).toBeDefined();
    fireEvent.click(screen.getByText(/过去 7 天/));
    fireEvent.click(screen.getByText('今日'));
    expect(handleOnSelect).toHaveBeenCalledWith('day:1,0');
  });

  it('should to be canceled', () => {
    const handleOnCancel = jest.fn();
    render(<PastTimePicker value="since:1620662400000" onCancel={handleOnCancel} />);
    fireEvent.click(screen.getByText('自 2021/05/11 至今日'));
    fireEvent.click(screen.getByText('取 消'));
    expect(handleOnCancel).toHaveBeenCalled();
  });

  it('can be cleared', () => {
    render(<PastTimePicker placeholder="select" />);
    fireEvent.click(screen.getByText('select'));
    fireEvent.click(screen.getByText(/过去 7 天/));
    fireEvent.mouseEnter(screen.getAllByText(/过去 7 天/)[0].parentElement);
    fireEvent.click(screen.getByLabelText('close-circle-filled'));
    fireEvent.click(screen.getByText('select'));
    fireEvent.click(screen.getByText('自某天以后'));
    fireEvent.click(screen.getByText('取 消'));
  });
});
