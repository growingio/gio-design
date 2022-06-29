import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Button, Toast } from '../..';
import { sleep } from '../../utils/test';

type ToastType = 'success' | 'info' | 'warning' | 'error';
describe('test toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();

    act(() => {
      Toast.destroy();
    });
  });
  it('render correctly', async () => {
    jest.useFakeTimers();
    const Demo = () => {
      const handleSuccess = () => {
        Toast.success({ content: 'toast content', duration: 0 });
      };
      return (
        <Button data-testid="show-toast" onClick={handleSuccess}>
          click
        </Button>
      );
    };
    render(<Demo />);
    act(() => {
      fireEvent.click(screen.getByTestId('show-toast'));
    });
    await sleep();
    jest.runAllTimers();
    expect(document.querySelector('.gio-toast')).toBeInTheDocument();
  });

  it('support Icon', () => {
    act(() => {
      Toast.open({
        type: 'info',
        content: 'Notification',
        duration: 0,
        icon: <span className="test-customize-icon" />,
      });
    });

    expect(document.querySelectorAll('.test-customize-icon').length).toBe(1);
  });

  it('should trigger onClose event', async () => {
    const handleClose = jest.fn();
    act(() => {
      Toast.open({
        content: 'Notification Title 1',
        duration: 1,
        key: '1',
        type: 'success',
        onClose: handleClose,
      });
      jest.runAllTimers();
    });
    await act(async () => {
      await Promise.resolve();
    });
    jest.runAllTimers();
    expect(handleClose).toHaveBeenCalled();
  });

  it('should be able to add parent class for different notification types', async () => {
    const openToastWithIcon = async (type: ToastType) => {
      act(() => {
        Toast[type]({
          content: 'Notification Title',
          duration: 0,
        });
        jest.runAllTimers();
      });
    };

    const list = ['success', 'info', 'warning', 'error'];
    const promises = list.map((type: ToastType) => openToastWithIcon(type));

    await act(async () => {
      await Promise.all(promises);
    });

    list.forEach((type: ToastType) => {
      expect(document.querySelectorAll(`.gio-toast-${type}`).length).toBe(1);
    });
  });
});
