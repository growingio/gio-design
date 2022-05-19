import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { format } from 'date-fns';
import Button from '../../button';
import DatePicker from '../DatePicker';

describe('Testing DatePicker ', () => {
  it('render without params', () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector('input[type="button"]')).toBeTruthy();
  });

  it('render has trigger params', () => {
    const { container } = render(
      <DatePicker
        trigger={<Button type="secondary">{format(new Date(), '您的所选时间为 yyyy-MM-dd HH:mm:ss')}</Button>}
      />
    );
    expect(container.querySelectorAll('您的所选时间为')).toBeTruthy();
  });

  it('render has format', () => {
    const { container } = render(<DatePicker format="yyyy/MM/dd hh:mm" />);
    expect(container.querySelector('input[type="button"]')).toBeTruthy();
  });

  it('render has dataTestId', () => {
    const { container } = render(<DatePicker dataTestId="test" />);
    expect(container.querySelector('input[data-testId="test"]')).toBeTruthy();
    expect(container.querySelector('input[data-testId="dataPicker"]')).toBeFalsy();
  });

  it('operation', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<DatePicker format="yyyy/MM/dd hh:mm" onVisibleChange={() => {}} onSelect={() => {}} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('12')).toBeTruthy();

    fireEvent.click(screen.getByText('12'));

    expect(screen.getByTestId('dataPicker').title).toMatch('/12');
  });

  it('operation without params', () => {
    render(<DatePicker format="yyyy/MM/dd hh:mm" />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('12')).toBeTruthy();

    fireEvent.click(screen.getByText('12'));

    expect(screen.getByTestId('dataPicker').title).toMatch('/12');
  });
});
