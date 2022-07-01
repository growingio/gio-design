import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-test-renderer';
import { format, getTime, startOfDay, addDays } from 'date-fns';
import { TimeMode } from '../interfaces';
import StaticPastTimePicker from '../StaticPastTimePicker';

describe('Test StaticPastTimePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-06-29'));
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('render', () => {
    const { container } = render(<StaticPastTimePicker />);
    expect(container.querySelector('.gio-static-past-time-picker')).toBeInTheDocument();
    expect(container.querySelector('.gio-static-past-time-picker__time-mode')).toBeInTheDocument();
    expect(container.querySelector('.gio-static-past-time-picker__time-mode .gio-list--item--actived')).toHaveAttribute(
      'title',
      '常用时间'
    );
    expect(
      Array.from(container.querySelectorAll('.gio-static-past-time-picker__time-mode .gio-list--item--text')).map(
        (e) => e.textContent
      )
    ).toStrictEqual(['常用时间', '自某天以后', '过去动态时段', '过去固定时段']);
  });
  it('supports timeRange', () => {
    const { container } = render(
      <StaticPastTimePicker timeRange={`abs:${getTime(addDays(new Date(), -3))},${getTime(addDays(new Date(), -3))}`} />
    );
    expect(container.querySelector('.gio-static-past-time-picker__time-mode .gio-list--item--actived')).toHaveAttribute(
      'title',
      '过去固定时段'
    );
    fireEvent.click(screen.getByText('确定'));
  });
  it('supports TimeMode', () => {
    const { container } = render(<StaticPastTimePicker modes={[TimeMode.Since]} />);
    expect(
      Array.from(container.querySelectorAll('.gio-static-past-time-picker__time-mode .gio-list--item--text')).map(
        (e) => e.textContent
      )
    ).toStrictEqual(['常用时间', '自某天以后']);
  });
  it('supports experimental', () => {
    const onSelect = jest.fn();
    render(<StaticPastTimePicker experimental onSelect={onSelect} />);
    expect(screen.queryByText('过去 24 小时')).toBeTruthy();
    expect(screen.queryByText('过去 72 小时')).toBeTruthy();
    expect(screen.queryByText('过去 48 小时')).toBeTruthy();
    act(() => {
      fireEvent.click(screen.getByText('自某天以后'));
    });
    jest.runAllTimers();
    expect(
      Array.from(screen.getByTestId('inner-range-panel').querySelectorAll('input[data-testid="switch-item"]')).map(
        (e) => e.getAttribute('value')
      )
    ).toStrictEqual(['today', 'yesterday']);
    expect(screen.getByTestId('inner-range-panel').querySelector('input[value="yesterday"]')).toHaveAttribute(
      'checked'
    );
    const startDay = startOfDay(addDays(new Date(), -5));
    const clickDay = format(startDay, 'yyyy-MM-dd');

    act(() => {
      fireEvent.click(screen.getByTitle(clickDay));
      fireEvent.click(screen.getByText('确定'));
    });
    expect(onSelect).toHaveBeenCalledWith(`since-lt-today:${getTime(startDay)}`);
    act(() => {
      fireEvent.click(screen.getByText('至今日'));
    });
    act(() => {
      fireEvent.click(screen.getByTitle(clickDay));
      fireEvent.click(screen.getByText('确定'));
    });
    expect(onSelect).toHaveBeenCalledWith(`since:${getTime(startDay)}`);
    jest.useRealTimers();
  });
  it('should swich mode  when click left mode tabs ', () => {
    jest.useFakeTimers('modern');
    const { container } = render(<StaticPastTimePicker />);
    act(() => {
      fireEvent.click(screen.getByText('自某天以后'));
    });
    jest.runAllTimers();
    expect(
      container.querySelector('.gio-static-past-time-picker__panel .gio-range-panel__header__text')
    ).toHaveTextContent('从 开始日期');
    jest.useRealTimers();
  });
  it('can fire event onSelect ', () => {
    const onSelect = jest.fn();
    render(<StaticPastTimePicker onSelect={onSelect} />);
    act(() => {
      fireEvent.click(screen.getByText('过去7天'));
      fireEvent.click(screen.getByText('确定'));
    });

    expect(onSelect).toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith('day:8,1');
  });
  it('support Relative mode', () => {
    jest.useFakeTimers();
    const onSelect = jest.fn();
    render(<StaticPastTimePicker onSelect={onSelect} />);
    act(() => {
      fireEvent.click(screen.getByText('过去动态时段'));
    });
    jest.runAllTimers();
    act(() => {
      fireEvent.change(screen.getByTestId('relative-range-picker').querySelector('input'), { target: { value: 5 } });
      fireEvent.click(screen.getByText('确定'));
    });
    jest.runAllTimers();
    expect(onSelect).toHaveBeenCalledWith('day:6,1');
    jest.useRealTimers();
  });
});
