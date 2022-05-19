import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { startOfToday, subMonths } from 'date-fns';
import StaticDateRangePicker from '../StaticDateRangePicker';

describe('Testing StaticDatePicker ', () => {
  it('without params', () => {
    const { container } = render(<StaticDateRangePicker />);
    expect(container.querySelector('div[class="gio-date-range-picker"]')).toBeTruthy();
  });

  it('onPanelChange has onPanelChange', () => {
    const { container } = render(
      <StaticDateRangePicker
        disabledDate={(current: Date) => current.getTime() > new Date().getTime()}
        defaultViewDates={[subMonths(startOfToday(), 1), startOfToday()]}
      />
    );

    fireEvent.click(
      container.querySelector('.gio-date-range-picker__left button[class="gio-picker-header-super-prev-btn"]')
    );

    expect(container.querySelector('div[class="gio-picker-cell-inner"]')).toBeTruthy();

    fireEvent.click(
      container.querySelector('.gio-date-range-picker__right button[class="gio-picker-header-super-next-btn"]')
    );

    expect(container.querySelector('div[class="gio-picker-cell-inner"]')).toBeTruthy();
  });

  it('left right', () => {
    const { container } = render(
      <StaticDateRangePicker defaultValue={[new Date('2022-03-01'), new Date('2022-04-01')]} />
    );

    fireEvent.click(container.querySelector('td[title="2022-04-02"] .gio-picker-cell-inner'));

    fireEvent.click(container.querySelector('td[title="2022-04-11"] .gio-picker-cell-inner'));

    expect(container.querySelector('div[class="gio-picker-cell-inner"]')).toBeTruthy();
  });

  it('has function', () => {
    const { container } = render(
      <StaticDateRangePicker
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onDateMouseEnter={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onDateMouseLeave={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSelect={() => {}}
        defaultValue={[new Date('2022-03-01'), new Date('2022-04-01')]}
      />
    );

    fireEvent.click(container.querySelector('td[title="2022-04-02"] .gio-picker-cell-inner'));

    fireEvent.mouseEnter(container.querySelector('td[title="2022-04-10"] .gio-picker-cell-inner'));

    fireEvent.mouseLeave(container.querySelector('td[title="2022-04-10"] .gio-picker-cell-inner'));

    fireEvent.click(container.querySelector('td[title="2022-04-11"] .gio-picker-cell-inner'));

    expect(container.querySelector('div[class="gio-picker-cell-inner"]')).toBeTruthy();
  });

  it('not function', () => {
    const { container } = render(
      <StaticDateRangePicker defaultValue={[new Date('2022-03-01'), new Date('2022-04-01')]} />
    );

    fireEvent.mouseEnter(container.querySelector('td[title="2022-04-10"] .gio-picker-cell-inner'));

    fireEvent.mouseLeave(container.querySelector('td[title="2022-04-10"] .gio-picker-cell-inner'));

    expect(container.querySelector('div[class="gio-picker-cell-inner"]')).toBeTruthy();
  });

  it('has defaultViewDates', () => {
    const { container } = render(
      <StaticDateRangePicker defaultValue={[new Date('2022-03-01'), new Date('2022-04-01')]} />
    );

    fireEvent.mouseEnter(container.querySelector('td[title="2022-04-10"] .gio-picker-cell-inner'));

    fireEvent.mouseLeave(container.querySelector('td[title="2022-04-10"] .gio-picker-cell-inner'));

    expect(container.querySelector('div[class="gio-picker-cell-inner"]')).toBeTruthy();
  });
});
