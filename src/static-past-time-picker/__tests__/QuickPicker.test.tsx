import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import StaticPastTimePicker from '../StaticPastTimePicker';

describe('Test StaticPastTimePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2022-06-29'));
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('quickerPicker filter', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <StaticPastTimePicker
        experimental
        timeRange="day:2,1"
        quickOptionsFilter={(opt) => ['day:2,1'].includes(opt.value)}
        onSelect={onSelect}
      />
    );
    expect(
      Array.from(container.querySelectorAll('.gio-quick-picker .gio-list--item--text')).map((e) => e.textContent)
    ).toStrictEqual(['昨日']);
  });
  it('change checkbox toToday', () => {
    const onSelect = jest.fn();
    const onCancel = jest.fn();
    const { container } = render(
      <StaticPastTimePicker onCancel={onCancel} experimental timeRange="week:1,0" onSelect={onSelect} />
    );
    expect(container.querySelector('.gio-quick-picker__bottom input[type="checkbox"]')).toBeInTheDocument();
    expect(container.querySelector('.gio-quick-picker__bottom input[type="checkbox"]')).toHaveClass(
      'gio-checkbox-checked'
    );
    fireEvent.click(screen.getByText('确定'));
    expect(onSelect).toHaveBeenCalledWith('week:1,0');
    act(() => {
      fireEvent.click(screen.getByText('至今日'));
    });
    jest.runAllTimers();
    expect(container.querySelector('.gio-quick-picker__bottom input[type="checkbox"]')).not.toHaveClass(
      'gio-checkbox-checked'
    );

    fireEvent.click(screen.getByText('确定'));
    expect(onSelect).toHaveBeenLastCalledWith('week-lt-today:1,0');

    fireEvent.click(screen.getByText('取消'));
    expect(onSelect).toHaveBeenCalled();
  });
});
