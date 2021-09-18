import React from 'react';
import { render } from '@testing-library/react';
import { CheckOutlined } from '@gio-design/icons';
import Toast from '..';

describe('Testing Toast', () => {
  it('should be able to hide manually', () => {
    const hide1 = Toast.info('whatever', 0);
    const hide2 = Toast.info('whatever', 0);
    hide1();
    hide2();
    expect(document.querySelectorAll('.gio-toast').length).toBe(1);
  });

  it('should be able to destroy globally', () => {
    Toast.info('whatever', 0);
    Toast.info('whatever', 0);
    expect(document.querySelectorAll('.gio-toast')).toBeTruthy();
    Toast.destroy();
  });

  it('should not need to use duration argument when using the onClose arguments', () => {
    Toast.info('whatever', () => {
      /* ... */
    });
  });

  it('should hide message correctly', () => {
    class Test extends React.Component {
      componentDidMount() {
        Toast.info('Action in progress..', 0);
      }

      render() {
        return <div>test</div>;
      }
    }
    render(<Test />);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(2);
  });

  it('should allow custom icon', () => {
    Toast.open({ content: 'Message', type: 'success', icon: <CheckOutlined /> });
    expect(document.querySelectorAll('svg').length).toBe(3);
  });

  it('should have no icon', () => {
    Toast.open({ content: 'Message', type: 'success', icon: <span /> });
    expect(document.querySelectorAll('.gio-toast-icon').length).toBe(2);
  });

  it('should have no icon when not pass icon props', () => {
    Toast.open({ content: 'Message', type: 'success' });
    expect(document.querySelectorAll('.gio-toast-icon').length).toBe(3);
  });

  it('should destroy messages correctly', () => {
    Toast.info('Action in progress1..', 0);
    Toast.info('Action in progress2..', 0);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(7);
  });

  it('should not throw error when pass null', () => {
    Toast.error(null);
  });
});
