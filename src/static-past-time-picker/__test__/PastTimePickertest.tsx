import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { differenceInDays, startOfDay } from 'date-fns';
import startOfToday from 'date-fns/startOfToday';
import StaticPastTimePicker from '../StaticPastTimePicker';
import { Relative, Since, Modes } from '../demos/PastTimePicker.stories';

describe('StaticPastTimePicker', () => {
  const handleOnSelect = jest.fn();
  const defaultComponent = () => <StaticPastTimePicker onSelect={handleOnSelect} />;

  beforeAll(() => {
    // mock now is 2021/05/20 00:00:00.000
    jest.useFakeTimers('modern');
    jest.setSystemTime(1621468800000);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders shortcut mode', () => {
    render(defaultComponent());
    expect(screen.getAllByText(/过去 \d+ 天/)).toHaveLength(6);

    fireEvent.click(screen.getByText(/过去 14 天/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:15,1');
  });

  it('renders shortcut mode and with shortcutFilter', () => {
    render(<StaticPastTimePicker quickOptionsFilter={(s) => s.value !== 'day:1,0'} />);
    expect(screen.queryByText('今日')).toBeNull();
  });

  it('renders since mode', () => {
    const { rerender } = render(defaultComponent());
    fireEvent.click(screen.getByText('自某天以后'));
    fireEvent.click(screen.getByTitle('2021-05-01'));
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('since:1619798400000');

    rerender(<StaticPastTimePicker {...Since.args} experimental={false} />);
    fireEvent.click(screen.getByText(/确 定/));
  });

  it('renders relative mode', () => {
    const { rerender } = render(defaultComponent());
    fireEvent.click(screen.getByText('过去动态时段'));
    fireEvent.click(screen.getByTitle('2021-05-01'));
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:19,1');

    fireEvent.change(screen.getByTestId('duration').firstElementChild.firstElementChild, { target: { value: '10' } });
    fireEvent.change(screen.getByTestId('duration').firstElementChild.firstElementChild, {
      target: { value: '10001' },
    });
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:11,1');

    fireEvent.click(screen.getByText('结束日期'));
    fireEvent.click(screen.getByTitle('2021-04-19'));
    fireEvent.click(screen.getByTitle('2021-05-19'));
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:31,1');

    const startDaysElement = screen.getByTestId('start-days').firstElementChild.firstElementChild;
    const endDaysElement = screen.getByTestId('end-days').firstElementChild.firstElementChild;
    fireEvent.change(startDaysElement, { target: { value: '20' } });
    fireEvent.change(endDaysElement, { target: { value: '2' } });
    fireEvent.change(startDaysElement, { target: { value: '1' } });
    fireEvent.change(endDaysElement, { target: { value: '21' } });
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:20,2');

    rerender(<StaticPastTimePicker {...Relative.args} />);
    fireEvent.click(screen.getByText(/确 定/));
  });

  it('renders relative mode with end date', () => {
    render(defaultComponent());
    fireEvent.click(screen.getByText('过去动态时段'));
    fireEvent.click(screen.getByText('结束日期'));
    fireEvent.click(screen.getByTitle('2021-04-19'));
    fireEvent.click(screen.getByTitle('2021-05-19'));
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('day:31,1');
  });

  it('renders absolute mode', () => {
    render(defaultComponent());
    fireEvent.click(screen.getByText('过去固定时段'));
    fireEvent.click(screen.getByTitle('2021-04-19'));
    fireEvent.click(screen.getByTitle('2021-05-19'));
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('abs:1618761600000,1621439999999');
  });

  it('renders with experimental features', () => {
    render(<StaticPastTimePicker experimental onSelect={handleOnSelect} />);
    expect(screen.queryAllByText(/小时/)).toHaveLength(3);

    fireEvent.click(screen.getByText('自某天以后'));
    expect(screen.queryByText('至昨日')).toBeDefined();

    fireEvent.click(screen.getByText('至昨日'));
    fireEvent.click(screen.getByTitle('2021-05-01'));
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalledWith('since:1619798400000,1');
  });

  it('has default mode', () => {
    render(<StaticPastTimePicker timeRange="hour:2,1" />);
    expect(screen.getAllByText(/过去 \d+ 天/)).toHaveLength(6);
  });

  it('can be customize modes', () => {
    render(<Modes {...Modes.args} />);
    expect(screen.queryByText('过去固定时段')).toBeNull();
  });

  it('can be disabled some dates', () => {
    render(<StaticPastTimePicker disabledDate={(date) => differenceInDays(startOfToday(), startOfDay(date)) > 5} />);
    const clickedDateString = '2021-05-10';
    fireEvent.click(screen.getByText('自某天以后'));
    fireEvent.click(screen.getByTitle(clickedDateString));
    expect(screen.queryByText('开始日期')).toBeDefined();

    fireEvent.click(screen.getByText('过去动态时段'));
    fireEvent.click(screen.getByTitle(clickedDateString));
    expect(screen.getByTestId('duration').firstElementChild.firstElementChild.getAttribute('value')).toEqual('1');

    fireEvent.click(screen.getByText('过去固定时段'));
    fireEvent.click(screen.getByTitle(clickedDateString));
    expect(screen.queryByText('开始日期')).toBeDefined();
  });
});
