import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { Basic, RangeInputTrigger } from '../DateRangeSelector.stories';

describe('DateRangeSelector', () => {
  const defaultPlaceholder = ['Start date', 'End date'];
  const startDateString = '2021-05-01';
  const endDateString = '2021-05-30';
  const dateFormat = 'yyyy-MM-dd';
  const startDate = parse(startDateString, dateFormat, new Date());
  const endDate = parse(endDateString, dateFormat, new Date());

  beforeAll(() => {
    // mock now is 2021/05/20 00:00:00.000
    jest.useFakeTimers('modern');
    jest.setSystemTime(1621468800000);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('can be select date range', () => {
    const handleOnSelect = jest.fn();
    render(<Basic placeholder={defaultPlaceholder} onSelect={handleOnSelect} format={dateFormat} />);
    fireEvent.click(screen.getByText(defaultPlaceholder[0]));

    // mouse enter start date cell and leave
    const startDateCell = screen.getByTitle(startDateString);
    fireEvent.mouseEnter(startDateCell);
    expect(screen.getByText(startDateString)).toBeDefined();
    fireEvent.mouseLeave(startDateCell);

    // select start date
    fireEvent.click(startDateCell);

    // mouse enter end date cell and leave
    const endDateCell = screen.getByTitle(endDateString);
    fireEvent.mouseEnter(endDateCell);
    expect(screen.getByText(endDateString)).toBeDefined();
    fireEvent.mouseLeave(endDateCell);

    // select end date
    fireEvent.click(endDateCell);
    expect(handleOnSelect).toHaveBeenCalledWith([startDate, endDate], [startDateString, endDateString]);

    const trigger = screen.getByText(startDateString).parentElement;
    fireEvent.mouseEnter(trigger);
    const clearIcon = screen.getByLabelText('close-circle-filled');
    expect(clearIcon).toBeDefined();
    fireEvent.click(clearIcon);
    expect(screen.getByText(defaultPlaceholder[1]));
    fireEvent.mouseLeave(trigger);
  });

  it('renders with default props', () => {
    render(<Basic placeholder={undefined} onSelect={undefined} />);
    fireEvent.click(screen.getByLabelText('calendar-outlined'));

    const startDateCell = screen.getByTitle(startDateString);
    fireEvent.mouseEnter(startDateCell);
    expect(screen.getByText(format(startDate, 'yyyy/MM/dd')));
    fireEvent.mouseLeave(startDateCell);

    fireEvent.click(startDateCell);

    const endDateCell = screen.getByTitle(endDateString);
    fireEvent.mouseEnter(endDateCell);
    fireEvent.mouseLeave(endDateCell);

    fireEvent.click(endDateCell);
  });

  it('has range input trigger', () => {
    const { rerender } = render(<RangeInputTrigger placeholder={undefined} />);
    rerender(<RangeInputTrigger value={[startDateString, endDateString]} />);
    fireEvent.mouseEnter(screen.getByText(startDateString).parentElement);
    fireEvent.click(screen.getByLabelText('close-circle-filled'));
  });
});
