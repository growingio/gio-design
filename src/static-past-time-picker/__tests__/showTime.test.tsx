import React, { useState } from 'react';
import { fireEvent, render, screen, cleanup, within } from '@testing-library/react';
import moment from 'moment-timezone';
import { DesignContext, DefaultContextProps } from '@gio-design/utils';
import AbsoluteRangePicker from '../AbsoluteRangePicker';
import PastTimePicker from '../../past-time-picker/PastTimePicker';
import StaticPastTimePicker from '../StaticPastTimePicker';
import enUS from '../../locales/en-US';

const stamp = (text: string, zone = 'Asia/Shanghai') => moment.tz(text, zone).valueOf();
const range = (start: string, end: string) => `abs:${stamp(start)},${stamp(end)}`;
const existing = range('2026-10-20 08:30:45.000', '2026-10-20 09:15:30.999');
const select = jest.fn();
const change = (label: string, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const confirm = () =>
  fireEvent.click(within(screen.queryByTestId('inner-range-panel') || document.body).getByText('确定'));
const panel = (value = existing) =>
  render(<AbsoluteRangePicker showTime timeRange={value} onSelect={select} allowReset={false} />);

let originalTimezone: string | null = null;
beforeEach(() => {
  originalTimezone = localStorage.getItem('timezone');
  localStorage.setItem('timezone', 'Asia/Shanghai');
  jest.useFakeTimers('modern').setSystemTime(new Date('2026-10-27T12:00:00Z'));
  select.mockClear();
});
afterEach(() => {
  cleanup();
  if (originalTimezone === null) localStorage.removeItem('timezone');
  else localStorage.setItem('timezone', originalTimezone);
  jest.clearAllTimers();
  jest.useRealTimers();
});

test('default and explicit false keep date-only inputs and callback', () => {
  const { rerender } = render(
    <AbsoluteRangePicker
      timeRange={range('2026-10-20 00:00:00', '2026-10-20 00:00:00')}
      onSelect={select}
      allowReset={false}
    />
  );
  expect(screen.queryByLabelText('开始时间')).toBeNull();
  rerender(
    <AbsoluteRangePicker
      showTime={false}
      timeRange={range('2026-10-20 00:00:00', '2026-10-20 00:00:00')}
      onSelect={select}
      allowReset={false}
    />
  );
  confirm();
  expect(select).toHaveBeenLastCalledWith(range('2026-10-20 00:00:00.000', '2026-10-20 23:59:59.999'));
});
test('seconds display, confirmation and reopening keep exact value without adding a day', () => {
  panel();
  expect(screen.getByLabelText('开始时间')).toHaveValue('08:30:45');
  expect(screen.getByLabelText('结束时间')).toHaveValue('09:15:30');
  expect(screen.getByText('从 2026/10/20 08:30:45 至 2026/10/20 09:15:30')).toBeInTheDocument();
  confirm();
  expect(select).toHaveBeenLastCalledWith(existing);
  cleanup();
  panel(select.mock.calls[0][0]);
  confirm();
  expect(select).toHaveBeenLastCalledWith(existing);
});
test('first fixed dates default to whole-day times', () => {
  panel('day:8,1');
  expect(screen.getByLabelText('开始时间')).toHaveValue('00:00:00');
  expect(screen.getByLabelText('结束时间')).toHaveValue('23:59:59');
});
test.each([
  ['', '', '00:00:00.000', '23:59:59.999'],
  ['10:20:30', '', '10:20:30.000', '23:59:59.999'],
  ['', '12:34:56', '00:00:00.000', '12:34:56.999'],
  ['08:30:45', '09:15:30', '08:30:45.000', '09:15:30.999'],
])('empty or explicit ends %s / %s preserve selected day', (a, b, start, end) => {
  panel();
  change('开始时间', a);
  change('结束时间', b);
  confirm();
  expect(select).toHaveBeenCalledWith(range(`2026-10-20 ${start}`, `2026-10-20 ${end}`));
});
test.each(['24:00:00', '12:60:00', '12:00:60', '8:30:00', '12:00', '12:00:00x', ' '])(
  'invalid input %s blocks confirmation and recovers after correction',
  (bad) => {
    panel();
    change('开始时间', bad);
    expect(screen.getByRole('alert')).toHaveTextContent('请输入有效时间');
    expect(screen.getByText('确定').closest('button')).toBeDisabled();
    confirm();
    expect(select).not.toHaveBeenCalled();
    change('开始时间', '08:30:45');
    confirm();
    expect(select).toHaveBeenCalledWith(existing);
  }
);
test('same day reversed timestamps blocked, cross-day overnight allowed', () => {
  const { rerender } = panel();
  change('开始时间', '20:00:00');
  change('结束时间', '08:00:00');
  expect(screen.getByRole('alert')).toHaveTextContent('开始日期时间不能晚于结束日期时间');
  expect(screen.getByText('确定').closest('button')).toBeDisabled();
  rerender(
    <AbsoluteRangePicker
      showTime
      timeRange={range('2026-10-20 20:00:00', '2026-10-21 08:00:00.999')}
      onSelect={select}
      allowReset={false}
    />
  );
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-20 20:00:00', '2026-10-21 08:00:00.999'));
});
test('same second is valid and includes its last millisecond', () => {
  panel();
  change('开始时间', '09:00:00');
  change('结束时间', '09:00:00');
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-20 09:00:00.000', '2026-10-20 09:00:00.999'));
});
test('cancel restores draft without publishing', () => {
  panel();
  change('开始时间', '08:00:00');
  fireEvent.click(screen.getByText('取消'));
  expect(select).not.toHaveBeenCalled();
  expect(screen.getByLabelText('开始时间')).toHaveValue('08:30:45');
});
test('calendar edits date without losing explicit time', () => {
  panel();
  fireEvent.click(screen.getByTitle('2026-10-18'));
  fireEvent.click(screen.getByTitle('2026-10-19'));
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-18 08:30:45.000', '2026-10-19 09:15:30.999'));
});
test('new fixed selection gets complete defaults and range callback', () => {
  const onRangeSelect = jest.fn();
  render(<AbsoluteRangePicker showTime onSelect={select} onRangeSelect={onRangeSelect} allowReset={false} />);
  fireEvent.click(screen.getByTitle('2026-10-18'));
  fireEvent.click(screen.getByTitle('2026-10-19'));
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-18 00:00:00.000', '2026-10-19 23:59:59.999'));
  expect(onRangeSelect).toHaveBeenCalledTimes(2);
});
test('static controlled range updates complete inputs', () => {
  const { rerender } = render(
    <StaticPastTimePicker
      showTime
      timeRange={existing}
      onSelect={select}
      allowReset={false}
      NotAvailableToday={false}
      earliestApprove={false}
    />
  );
  rerender(
    <StaticPastTimePicker
      showTime
      timeRange={range('2026-10-21 11:22:33', '2026-10-22 12:23:34.999')}
      onSelect={select}
      allowReset={false}
      NotAvailableToday={false}
      earliestApprove={false}
    />
  );
  expect(screen.getByLabelText('开始时间')).toHaveValue('11:22:33');
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-21 11:22:33', '2026-10-22 12:23:34.999'));
});
test('trigger complete range and cancel / outside close discard drafts even with destroyOnHide false', () => {
  function Demo() {
    const [value, setValue] = useState(existing);
    return <PastTimePicker showTime destroyOnHide={false} value={value} onSelect={setValue} />;
  }
  render(<Demo />);
  expect(screen.getByTestId('past-time-picker')).toHaveValue('从 2026/10/20 08:30:45 至 2026/10/20 09:15:30');
  fireEvent.click(screen.getByTestId('past-time-picker'));
  change('开始时间', '08:00:00');
  fireEvent.click(screen.getByText('取消'));
  fireEvent.click(screen.getByTestId('past-time-picker'));
  expect(screen.getByLabelText('开始时间')).toHaveValue('08:30:45');
  change('开始时间', '08:00:01');
  fireEvent.click(screen.getByTestId('past-time-picker'));
  fireEvent.click(screen.getByTestId('past-time-picker'));
  expect(screen.getByLabelText('开始时间')).toHaveValue('08:30:45');
});
test('English locale provides accessible labels and validation', () => {
  render(
    <DesignContext.Provider value={{ ...DefaultContextProps, locale: enUS }}>
      <AbsoluteRangePicker showTime timeRange={existing} onSelect={select} allowReset={false} />
    </DesignContext.Provider>
  );
  change('Start time', 'invalid');
  expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid time (HH:mm:ss)');
});
test('month-start midnight range opens correct month in configured timezone', () => {
  panel(range('2026-10-01 00:00:00', '2026-10-01 23:59:59.999'));
  expect(screen.getByTitle('2026-10-01')).toBeInTheDocument();
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-01 00:00:00', '2026-10-01 23:59:59.999'));
});
test('disabled picker cannot open seconds inputs', () => {
  render(<PastTimePicker showTime disabled value={existing} onSelect={select} />);
  expect(screen.getByTestId('past-time-picker')).toBeDisabled();
  fireEvent.click(screen.getByTestId('past-time-picker'));
  expect(screen.queryByLabelText('开始时间')).toBeNull();
});
test('quick mode remains date-only when showTime enabled', () => {
  render(
    <StaticPastTimePicker
      showTime
      timeRange="day:8,1"
      onSelect={select}
      allowReset={false}
      NotAvailableToday={false}
      earliestApprove={false}
    />
  );
  expect(screen.queryByLabelText('开始时间')).toBeNull();
  confirm();
  expect(select).toHaveBeenCalledWith('day:8,1');
});
test('click hour minute second columns changes draft only and confirms once', () => {
  panel();
  fireEvent.click(screen.getByLabelText('开始时间'));
  const dialog = screen.getByRole('dialog', { name: '开始时间 - 时分秒选择' });
  const columns = dialog.querySelectorAll<HTMLElement>('.gio-static-time-picker-time-panel-column');
  expect(columns).toHaveLength(3);
  ['07', '24', '12'].forEach((text, index) => {
    fireEvent.mouseDown(within(columns[index]).getByText(text));
    fireEvent.click(within(columns[index]).getByText(text));
  });
  expect(screen.getByLabelText('开始时间')).toHaveValue('07:24:12');
  expect(select).not.toHaveBeenCalled();
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-20 07:24:12.000', '2026-10-20 09:15:30.999'));
});
test('keyboard opens and closes selection panel without changing value', () => {
  panel();
  const input = screen.getByLabelText('结束时间');
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  expect(screen.getByRole('dialog', { name: '结束时间 - 时分秒选择' })).toBeInTheDocument();
  fireEvent.keyDown(input, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(input).toHaveValue('09:15:30');
});
test('nested picker clicks keep outer range open and cancel discards draft', () => {
  render(<PastTimePicker showTime value={existing} onSelect={select} />);
  fireEvent.click(screen.getByTestId('past-time-picker'));
  fireEvent.click(screen.getByLabelText('开始时间'));
  const option = within(screen.getByRole('dialog')).getAllByText('06')[0];
  fireEvent.mouseDown(option);
  fireEvent.click(option);
  expect(screen.getByLabelText('开始时间')).toHaveValue('06:30:45');
  expect(screen.getByText('取消')).toBeInTheDocument();
  fireEvent.click(screen.getByText('取消'));
  expect(select).not.toHaveBeenCalled();
  fireEvent.click(screen.getByTestId('past-time-picker'));
  expect(screen.getByLabelText('开始时间')).toHaveValue('08:30:45');
});

test('visible per-end clear buttons retain dates, use day defaults and remain draft', () => {
  panel();
  const clearStart = screen.getByRole('button', { name: '清空开始时间' });
  fireEvent.click(clearStart);
  expect(screen.getByLabelText('开始时间')).toHaveValue('');
  expect(screen.queryByRole('button', { name: '清空开始时间' })).toBeNull();
  expect(screen.getByLabelText('结束时间')).toHaveValue('09:15:30');
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(select).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: '清空结束时间' }));
  expect(screen.getByLabelText('结束时间')).toHaveValue('');
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-20 00:00:00.000', '2026-10-20 23:59:59.999'));
});

test('open controlled picker updates to a new absolute range without stale draft', () => {
  const { rerender } = render(<PastTimePicker showTime value={existing} onSelect={select} />);
  fireEvent.click(screen.getByTestId('past-time-picker'));
  change('开始时间', '07:00:00');
  const next = range('2026-10-21 11:22:33', '2026-10-22 12:23:34.999');
  rerender(<PastTimePicker showTime value={next} onSelect={select} />);
  expect(screen.getByLabelText('开始时间')).toHaveValue('11:22:33');
  expect(screen.getByLabelText('结束时间')).toHaveValue('12:23:34');
  confirm();
  expect(select).toHaveBeenCalledTimes(1);
  expect(select).toHaveBeenCalledWith(next);
});
test('switching showTime on and off keeps legacy dates and exact seconds separate', () => {
  const { rerender } = render(<PastTimePicker value={existing} onSelect={select} />);
  expect(screen.getByTestId('past-time-picker')).toHaveValue('从 2026/10/20 至 2026/10/20');
  rerender(<PastTimePicker showTime value={existing} onSelect={select} />);
  expect(screen.getByTestId('past-time-picker')).toHaveValue('从 2026/10/20 08:30:45 至 2026/10/20 09:15:30');
  fireEvent.click(screen.getByTestId('past-time-picker'));
  expect(screen.getByLabelText('开始时间')).toHaveValue('08:30:45');
  rerender(<PastTimePicker showTime={false} value={existing} onSelect={select} />);
  expect(screen.queryByLabelText('开始时间')).toBeNull();
});
test('time edits and clear never invoke the date-selection callback', () => {
  const selectedDates = jest.fn();
  render(
    <AbsoluteRangePicker
      showTime
      timeRange={existing}
      onSelect={select}
      onRangeSelect={selectedDates}
      allowReset={false}
    />
  );
  change('开始时间', '07:00:00');
  fireEvent.click(screen.getByRole('button', { name: '清空结束时间' }));
  expect(selectedDates).not.toHaveBeenCalled();
  expect(select).not.toHaveBeenCalled();
  confirm();
  expect(select).toHaveBeenCalledWith(range('2026-10-20 07:00:00.000', '2026-10-20 23:59:59.999'));
});
test('reset returns the provided expression once and dismisses the popup', () => {
  render(<PastTimePicker showTime value={existing} onSelect={select} allowReset defaultTimeRange="day:8,1" />);
  fireEvent.click(screen.getByTestId('past-time-picker'));
  fireEvent.click(screen.getByText('重置'));
  expect(select).toHaveBeenCalledTimes(1);
  expect(select).toHaveBeenCalledWith('day:8,1');
  expect(screen.queryByLabelText('开始时间')).toBeNull();
});
test('English clear buttons are labelled, independent and reset on cancel', () => {
  render(
    <DesignContext.Provider value={{ ...DefaultContextProps, locale: enUS }}>
      <AbsoluteRangePicker showTime timeRange={existing} onSelect={select} allowReset={false} />
    </DesignContext.Provider>
  );
  fireEvent.click(screen.getByRole('button', { name: 'Clear Start time' }));
  expect(screen.getByLabelText('Start time')).toHaveValue('');
  expect(screen.getByLabelText('End time')).toHaveValue('09:15:30');
  fireEvent.click(screen.getByText('Cancel'));
  expect(screen.getByLabelText('Start time')).toHaveValue('08:30:45');
  expect(select).not.toHaveBeenCalled();
});
test('clearing time while its popup is open does not close outer picker or commit', () => {
  render(<PastTimePicker showTime value={existing} onSelect={select} />);
  fireEvent.click(screen.getByTestId('past-time-picker'));
  fireEvent.click(screen.getByLabelText('开始时间'));
  const clear = screen.getByRole('button', { name: '清空开始时间' });
  fireEvent.mouseDown(clear);
  fireEvent.click(clear);
  expect(screen.getByLabelText('开始时间')).toHaveValue('');
  expect(screen.getByRole('dialog', { name: '开始时间 - 时分秒选择' })).toBeInTheDocument();
  expect(screen.getByText('取消')).toBeInTheDocument();
  expect(select).not.toHaveBeenCalled();
});

test('custom clear text can be a literal string without crashing', () => {
  const locale = {
    ...enUS,
    StaticPastTimePicker: { ...enUS.StaticPastTimePicker, clearTimeText: 'Clear selected time' },
  };
  render(
    <DesignContext.Provider value={{ ...DefaultContextProps, locale }}>
      <AbsoluteRangePicker showTime timeRange={existing} onSelect={select} allowReset={false} />
    </DesignContext.Provider>
  );
  const clearButtons = screen.getAllByRole('button', { name: 'Clear selected time' });
  expect(clearButtons).toHaveLength(2);
  fireEvent.click(clearButtons[0]);
  expect(screen.getByLabelText('Start time')).toHaveValue('');
  expect(screen.getByLabelText('End time')).toHaveValue('09:15:30');
  expect(select).not.toHaveBeenCalled();
});
