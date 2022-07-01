import { fireEvent, render, screen } from '@testing-library/react';
import { addDays, format, getTime, startOfDay } from 'date-fns';
import React from 'react';
import RelativeRangePicker from '../RelativeRangePicker';

describe('Test RelativeRangePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-06-29'));
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('timeRange', () => {
    const onSelect = jest.fn();

    const { unmount } = render(<RelativeRangePicker timeRange="day:3,0" onSelect={onSelect} />);
    expect(screen.getByTitle(format(new Date(), 'yyyy-MM-dd'))).toHaveClass('gio-picker-cell-range-end');
    unmount();

    render(<RelativeRangePicker timeRange="day:2,1" onSelect={onSelect} />);

    fireEvent.click(screen.getByText('结束日期'));
    expect(screen.getByTestId('start-days').querySelector('input[type="number"]')).toHaveAttribute('value', '2');
  });
  it('disabledDate', () => {
    const startDay = startOfDay(addDays(new Date(), -5));
    render(
      <RelativeRangePicker
        disabledDate={(date) => getTime(date) <= getTime(startDay)}
        timeRange="day:3,1"
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByTitle(format(addDays(startDay, -1), 'yyyy-MM-dd'))).toHaveClass('gio-picker-cell-disabled');
  });
  it('click time picker', () => {
    const onSelect = jest.fn();
    render(<RelativeRangePicker timeRange="day:2,1" onSelect={onSelect} />);
    const startDay = startOfDay(addDays(new Date(), -5));
    fireEvent.click(screen.getByTitle(format(startDay, 'yyyy-MM-dd')));
    fireEvent.click(screen.getByText('确定'));
    expect(onSelect).toHaveBeenCalledWith('day:6,1');
  });
  it('time range change', () => {
    const onSelect = jest.fn();
    render(<RelativeRangePicker timeRange="day:8,3" onSelect={onSelect} />);
    fireEvent.change(screen.getByTestId('end-days').querySelector('input[type="number"]'), { target: { value: 2 } });
    fireEvent.change(screen.getByTestId('start-days').querySelector('input[type="number"]'), { target: { value: 6 } });
    fireEvent.click(screen.getByText('确定'));
    expect(onSelect).toHaveBeenCalledWith('day:6,2');
  });
});
