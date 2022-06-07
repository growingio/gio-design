import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import TimePicker from '../TimePicker';
import defaultLocale from '../locales/zh-CN';

describe('<TimePicker />', () => {
  it('Allows to select the time', async () => {
    const handleSelect = jest.fn();
    const { getByTestId, getAllByText } = render(<TimePicker onSelect={handleSelect} />);
    const trigger = getByTestId('time-picker-trigger');
    await act(async () => {
      fireEvent.click(trigger);
    });
    const panel = document.querySelector('.gio-static-time-picker-panel');
    expect(panel).not.toBeNull();
    const [hour, minute] = getAllByText('00');
    hour.click();
    minute.click();
    const [submit] = getAllByText('确定');
    expect(submit).not.toBeDisabled();
    submit.click();
    expect(handleSelect).toHaveBeenCalledTimes(1);
    const returnedDate = handleSelect.mock.calls[0][0];
    const returnedTimeString = handleSelect.mock.calls[0][1];
    expect(returnedDate).toBeInstanceOf(Date);
    expect(returnedTimeString).toBe('00:00');
    expect(returnedDate.getHours()).toBe(0);
    expect(returnedDate.getMinutes()).toBe(0);
  });

  it('Allows to select now time', async () => {
    jest.useFakeTimers('modern');
    const now = new Date(2020, 1, 1, 0, 0, 0);
    jest.setSystemTime(now);
    const handleSelect = jest.fn();
    const { getByText, getAllByText } = render(<TimePicker visible onSelect={handleSelect} />);
    const nowButton = getByText('此刻');
    const submitButton = getAllByText('确定')[0];
    await act(async () => {
      nowButton.click();
    });
    expect(submitButton).not.toBeDisabled();
    submitButton.click();
    const returnedDate = handleSelect.mock.calls[0][0];
    expect(returnedDate.getHours()).toBe(now.getHours());
    expect(returnedDate.getMinutes()).toBe(now.getMinutes());
    jest.useRealTimers();
  });

  it('Should allow to set custom trigger', () => {
    const handleSelect = jest.fn();
    const { getByTestId } = render(
      <TimePicker onSelect={handleSelect} trigger={<span data-testid="custom-trigger">Custom Trigger</span>} />
    );
    const trigger = getByTestId('custom-trigger');
    expect(trigger).not.toBeNull();
  });

  it('Should render a placeholder when no value is provided', () => {
    let placeholder: string;
    const { getByDisplayValue, rerender } = render(<TimePicker placeholder={placeholder} />);
    expect(getByDisplayValue('选择时间')).not.toBeNull();
    placeholder = 'Custom Placeholder';
    rerender(<TimePicker placeholder={placeholder} />);
    expect(getByDisplayValue(placeholder)).not.toBeNull();
  });

  it('Can set a custom locale', async () => {
    await act(async () => {
      render(<TimePicker visible locale={{ ...defaultLocale, now: 'Now' }} />);
    });
    expect(screen.getByText('Now').tagName.toLocaleLowerCase()).toBe('button');
  });

  it('Should render a TimePicker with second panel', async () => {
    await act(async () => {
      render(<TimePicker showSecond visible />);
    });
    expect(document.querySelectorAll('.gio-static-time-picker-time-panel-column')).toHaveLength(3);
  });

  it('Can set custom data-testid', async () => {
    await act(async () => {
      render(<TimePicker data-testid="custom-id" />);
    });
    expect(screen.getByTestId('custom-id-trigger')).not.toBeNull();
  });
});
