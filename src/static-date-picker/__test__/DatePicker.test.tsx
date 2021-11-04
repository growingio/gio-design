import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DesignProvider } from '@gio-design/utils';
import { Basic, DisabledDate } from '../demos/DatePicker.stories';
import enUS from '../../locales/en-US';
import zhCN from '../../locales/zh-CN';

describe('DatePicker', () => {
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
    expect(screen.getAllByText(20)).toHaveLength(1);
    fireEvent.click(screen.getByText(20));
    expect(handleOnSelect).toHaveBeenCalledWith(new Date());
  });

  it('render with disabled date', () => {
    const handleOnSelect = jest.fn();
    render(<DisabledDate {...DisabledDate.args} onSelect={handleOnSelect} />);
    expect(screen.getAllByText(21)).toHaveLength(1);
    fireEvent.click(screen.getByText(21));
    expect(handleOnSelect).not.toHaveBeenCalled();
  });

  it('renders with multi languages', () => {
    const { rerender } = render(
      <DesignProvider locale={enUS}>
        <Basic />
      </DesignProvider>
    );
    expect(screen.queryAllByText(/Su|Mo|Tu|We|Th|Fr|Sa/)).toHaveLength(7);

    rerender(
      <DesignProvider locale={zhCN}>
        <Basic />
      </DesignProvider>
    );
    expect(screen.queryAllByText(/一|二|三|四|五|六|日/)).toHaveLength(7);
  });
});
