import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import StaticDatePicker from '../StaticDatePicker';

describe('Testing StaticDatePicker ', () => {
  it('without params', () => {
    render(<StaticDatePicker />);
    expect(screen.getByText('12')).toBeTruthy();
  });

  it('disabledDate is function', () => {
    render(<StaticDatePicker disabledDate={(current: Date) => current.getTime() > new Date().getTime()} />);
    expect(screen.getByText('12')).toBeTruthy();
  });

  it('onPanelChange has onPanelChange', () => {
    const { container } = render(
      <StaticDatePicker
        disabledDate={(current: Date) => current.getTime() > new Date().getTime()}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onPanelChange={() => {}}
      />
    );

    fireEvent.click(container.querySelector('button[class="gio-picker-header-super-prev-btn"]'));

    expect(screen.getByText('12')).toBeTruthy();

    fireEvent.click(container.querySelector('button[class="gio-picker-header-prev-btn"]'));

    expect(screen.getByText('12')).toBeTruthy();

    fireEvent.click(screen.getByText('12'));

    expect(screen.getByText('12')).toBeTruthy();
  });

  it('onPanelChange not onPanelChange', () => {
    const { container } = render(
      <StaticDatePicker disabledDate={(current: Date) => current.getTime() > new Date().getTime()} />
    );

    fireEvent.click(container.querySelector('button[class="gio-picker-header-super-prev-btn"]'));

    expect(screen.getByText('12')).toBeTruthy();
  });
});
