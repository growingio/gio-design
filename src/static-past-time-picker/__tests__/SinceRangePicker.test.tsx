import { render, screen } from '@testing-library/react';
import { addDays, format, getTime, startOfDay } from 'date-fns';
import React from 'react';
import SinceRangePicker from '../SinceRangePicker';

describe('SinceRangePicker test', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-06-29'));
  });
  it('render', () => {
    const startDay = startOfDay(addDays(new Date(), -5));
    const timeRange = `since:${getTime(startDay)}`;
    render(<SinceRangePicker experimental timeRange={timeRange} onSelect={jest.fn()} />);
    expect(screen.queryByDisplayValue('today')).toHaveAttribute('checked');
  });
  it('supports disabledDate', () => {
    const startDay = startOfDay(addDays(new Date(), -5));
    render(
      <SinceRangePicker
        experimental
        disabledDate={(date) => date.getTime() <= startDay.getTime()}
        onSelect={jest.fn()}
      />
    );
    expect(screen.getByTitle(format(addDays(startDay, -1), 'yyyy-MM-dd'))).toHaveClass('gio-picker-cell-disabled');
  });
});
