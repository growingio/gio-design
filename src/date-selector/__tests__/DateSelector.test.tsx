import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Basic, DisabledDate } from '../DateSelector.stories';

describe('DateSelector', () => {
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
    render(<Basic {...Basic.args} placeholder="Select Date" onSelect={handleOnSelect} />);
    const trigger = screen.getByText(/Select/);
    expect(trigger).toBeDefined();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByText(20));
    expect(handleOnSelect).toHaveBeenCalledWith(new Date(), '2021/05/20');

    fireEvent.mouseEnter(trigger.parentElement);
    const clearIcon = screen.getByLabelText('close-circle-filled');
    expect(clearIcon).toBeDefined();
    fireEvent.click(clearIcon);
    expect(screen.getByText(/Select/)).toBeDefined();
  });

  it('change placeholder when hovering date cell', () => {
    render(<Basic {...Basic.args} placeholder="select" />);
    const trigger = screen.getByText(/select/);
    fireEvent.click(trigger);

    const dateCell = screen.getByText(19);
    expect(dateCell).toBeDefined();

    fireEvent.mouseEnter(dateCell);
    expect(screen.getByText('2021/05/19'));
    fireEvent.mouseLeave(dateCell);
    expect(screen.getByText(/select/)).toBeDefined();
  });

  it('can format date', () => {
    render(<Basic {...Basic.args} placeholder="select" format="yyyy-MM-dd" />);
    const trigger = screen.getByText(/select/);
    fireEvent.click(trigger);
    fireEvent.click(screen.getByText(20));
    expect(screen.getByText('2021-05-20')).toBeDefined();
  });

  it('render with disabled date', () => {
    const handleOnSelect = jest.fn();
    render(<DisabledDate {...DisabledDate.args} placeholder="Select Date" onSelect={handleOnSelect} />);
    const trigger = screen.getByText(/Select/);
    expect(trigger).toBeDefined();
    fireEvent.click(trigger);
    expect(screen.getAllByText(19)).toHaveLength(1);
    fireEvent.click(screen.getByText(19));
    expect(handleOnSelect).not.toHaveBeenCalled();
  });
});
