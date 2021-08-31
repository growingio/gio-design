import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import locale from 'rc-picker/lib/locale/zh_CN';
import { Basic, ShowSecond } from '../demos/TimeSelector.stories';
import TimeSelector from '../TimeSelector';

describe('TimeSelector', () => {
  it('renders with default', () => {
    const handleOnSelect = jest.fn();
    render(<Basic onSelect={handleOnSelect} />);
    fireEvent.click(screen.getByText(/选择时间/));
    expect(screen.getAllByText('00')).toHaveLength(2);
    expect(screen.getAllByText('59')).toHaveLength(1);

    fireEvent.click(screen.getAllByText('05')[0]);
    fireEvent.click(screen.getByText(/确 定/));
    expect(handleOnSelect).toHaveBeenCalled();

    const item = screen.getByText('05:00');
    fireEvent.mouseEnter(item.parentElement);
    fireEvent.click(screen.getByLabelText('close-circle-filled'));
    fireEvent.mouseLeave(item.parentElement);
  });

  it('renders with second', () => {
    render(<ShowSecond {...ShowSecond.args} placeholder="select time" onSelect={undefined} />);
    fireEvent.click(screen.getByText(/select/));
    expect(screen.getAllByText('00')).toHaveLength(3);
    expect(screen.getAllByText('59')).toHaveLength(2);

    fireEvent.click(screen.getByText(/此 刻/));
    fireEvent.click(screen.getByText(/确 定/));
  });

  it('locale test', () => {
    render(<TimeSelector locale={locale} />);
    fireEvent.click(screen.getByText(/选择时间/));
  });
});
