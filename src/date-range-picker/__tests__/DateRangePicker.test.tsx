import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import startOfToday from 'date-fns/startOfToday';
import add from 'date-fns/add';
import startOfMonth from 'date-fns/startOfMonth';
import { Basic, DisabledDate } from '../DateRangePicker.stories';

describe('DateRangePicker', () => {
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
    render(<Basic {...Basic.args} onSelect={handleOnSelect} />);
    fireEvent.click(screen.getAllByLabelText('right-outlined')[1].parentElement);
    fireEvent.click(screen.getAllByLabelText('left-outlined')[0].parentElement);
    const tempDateCell = screen.getByTitle('2021-05-03');
    expect(tempDateCell).toBeDefined();
    fireEvent.mouseEnter(tempDateCell);
    fireEvent.mouseLeave(tempDateCell);

    fireEvent.click(screen.getByTitle('2021-05-20'));
    fireEvent.click(screen.getByTitle('2021-06-20'));
    expect(handleOnSelect).toHaveBeenCalledWith([startOfToday(), add(startOfToday(), { months: 1 })]);
  });

  it('render with disabled date', () => {
    const handleOnSelect = jest.fn();
    render(<DisabledDate {...DisabledDate.args} onSelect={handleOnSelect} />);
    expect(screen.getAllByTitle('2021-05-19')).toHaveLength(1);
    fireEvent.click(screen.getByTitle('2021-05-19'));
    expect(handleOnSelect).not.toHaveBeenCalled();
  });

  it('have mouse events for date cells', () => {
    const handleOnDateMouseEvent = jest.fn();
    render(
      <Basic
        {...Basic.args}
        onSelect={undefined}
        onDateMouseEnter={handleOnDateMouseEvent}
        onDateMouseLeave={handleOnDateMouseEvent}
      />
    );

    const startDateCell = screen.getByTitle('2021-05-01');
    const endDateCell = screen.getByTitle('2021-05-30');
    fireEvent.mouseEnter(startDateCell);
    expect(handleOnDateMouseEvent).toHaveBeenCalledWith(startOfMonth(Date.now()), 0);

    fireEvent.mouseLeave(startDateCell);
    expect(handleOnDateMouseEvent).toHaveBeenCalledWith(0);

    fireEvent.click(startDateCell);
    fireEvent.mouseEnter(endDateCell);
    expect(handleOnDateMouseEvent).toHaveBeenCalledTimes(3);
    fireEvent.mouseLeave(endDateCell);
    expect(handleOnDateMouseEvent).toHaveBeenCalledTimes(4);

    fireEvent.click(endDateCell);
  });
});
