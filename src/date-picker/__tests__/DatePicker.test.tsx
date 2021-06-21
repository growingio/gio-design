import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Default, DisabledDate } from '../DatePicker.stories';

describe('DatePicker', () => {
  beforeAll(() => {
    // mock now is 2021/05/20 00:00:00.000
    jest.useFakeTimers('modern');
    jest.setSystemTime(1621468800000);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('render with default', () => {
    const handleOnSelect = jest.fn();
    render(<Default {...Default.args} onSelect={handleOnSelect} />);
    expect(screen.getAllByText(20)).toHaveLength(1);
    fireEvent.click(screen.getByText(20));
    expect(handleOnSelect).toHaveBeenCalledWith(new Date());
  });

  it('render with disabled date', () => {
    const handleOnSelect = jest.fn();
    render(<DisabledDate {...DisabledDate.args} onSelect={handleOnSelect} />);
    expect(screen.getAllByText(21)).toHaveLength(1);
    fireEvent.click(screen.getByText(21));
    expect(handleOnSelect).not.toHaveBeenCalled();
  });
});
