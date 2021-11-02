import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default } from '../demos/Alert.stories';
import Alert from '../Alert';

const props = {
  showIcon: true,
  closeable: true,
  message: '标题',
  description: '提示正文',
};
describe('Testing Alert', () => {
  it('basic', () => {
    render(<Default {...Default.args} />);
  });

  it('no description', () => {
    render(<Alert />);
  });

  it('show icon', () => {
    render(<Alert {...props} type="info" />);
    expect(screen.getByText('提示正文')).toBeTruthy();
  });

  it('showIcon', () => {
    render(<Alert showIcon closeable />);
    fireEvent.click(screen.getByRole('button'));
  });

  it('showIcon', () => {
    render(<Alert showIcon closeable icon={11} />);
    fireEvent.click(screen.getByRole('button'));
  });

  it('can be close', () => {
    const mockClick = jest.fn();
    render(<Alert {...props} onClose={mockClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockClick).toBeCalled();
  });
});
