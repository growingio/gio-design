import { fireEvent, render, screen } from '@testing-library/react';
import { addDays, getTime, startOfDay } from 'date-fns';
import React from 'react';
import { parseFnsTimeZone } from '../../utils/timeHelper';
import AbsoluteRangePicker from '../AbsoluteRangePicker';

describe('Test AbsoluteRangePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-06-29'));
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders', () => {
    const onSelect = jest.fn();
    const startDay = startOfDay(addDays(new Date(), -10));
    const endDay = startOfDay(addDays(new Date(), -5));
    render(<AbsoluteRangePicker timeRange="day:2,1" onSelect={onSelect} />);
    fireEvent.click(screen.getByTitle(parseFnsTimeZone(startDay, 'yyyy-MM-dd')));
    fireEvent.click(screen.getByTitle(parseFnsTimeZone(endDay, 'yyyy-MM-dd')));
    fireEvent.click(screen.getByText('确定'));
    expect(onSelect).toHaveBeenCalledWith('abs:1655596800000,1656115199999');
  });

  it('AbsoluteRangePicker onRangeSelect ', () => {
    const onSelect = jest.fn();
    const onRangeSelect = jest.fn();
    const startDay = startOfDay(addDays(new Date(), -10));
    const endDay = startOfDay(addDays(new Date(), -5));
    render(
      <AbsoluteRangePicker
        disabledDate={(d) => getTime(d) < getTime(startDay)}
        onRangeSelect={onRangeSelect}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByTitle(parseFnsTimeZone(startDay, 'yyyy-MM-dd')));
    fireEvent.click(screen.getByTitle(parseFnsTimeZone(endDay, 'yyyy-MM-dd')));
    fireEvent.click(screen.getByText('确定'));
    expect(onRangeSelect).toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith('abs:1655596800000,1656115199999');
  });
});
