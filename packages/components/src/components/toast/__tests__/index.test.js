/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import React from 'react';
import { mount } from 'enzyme';
import Icon from '@gio-design/icon';
import Toast from '..';

describe('toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    Toast.destroy();
    jest.useRealTimers();
  });

  it('should be able to hide manually', () => {
    const hide1 = Toast.info('whatever', 0);
    const hide2 = Toast.info('whatever', 0);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(2);
    hide1();
    jest.runAllTimers();
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(1);
    hide2();
    jest.runAllTimers();
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
  });

  it('should be able to destroy globally', () => {
    Toast.info('whatever', 0);
    Toast.info('whatever', 0);
    expect(document.querySelectorAll('.gio-toast').length).toBe(1);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(2);
    Toast.destroy();
    expect(document.querySelectorAll('.gio-toast').length).toBe(0);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
  });

  it('should not need to use duration argument when using the onClose arguments', () => {
    Toast.info('whatever', () => {});
  });

  it('should have the default duration when using the onClose arguments', (done) => {
    jest.useRealTimers();
    const defaultDuration = 2;
    const now = Date.now();
    Toast.info('whatever', () => {
      // calculate the approximately duration value
      const aboutDuration = parseInt((Date.now() - now) / 1000, 10);
      expect(aboutDuration).toBe(defaultDuration);
      done();
    });
  });

  it('should be called like promise', (done) => {
    jest.useRealTimers();
    const defaultDuration = 2;
    const now = Date.now();
    Toast.info('whatever').then(() => {
      // calculate the approximately duration value
      const aboutDuration = parseInt((Date.now() - now) / 1000, 10);
      expect(aboutDuration).toBe(defaultDuration);
      done();
    });
  });

  // https://github.com/ant-design/ant-design/issues/8201
  it('should hide message correctly', () => {
    let hide;
    class Test extends React.Component {
      componentDidMount() {
        hide = Toast.info('Action in progress..', 0);
      }

      render() {
        return <div>test</div>;
      }
    }
    mount(<Test />);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(1);
    hide();
    jest.runAllTimers();
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
  });

  it('should allow custom icon', () => {
    Toast.open({ content: 'Message', icon: <Icon type='check-circle' /> });
    expect(document.querySelectorAll('.cls-check-circle-2').length).toBe(1);
  });

  it('should have no icon', () => {
    Toast.open({ content: 'Message', icon: <span /> });
    expect(document.querySelectorAll('.gio-toast-icon').length).toBe(0);
  });
  it('should have no icon when not pass icon props', () => {
    Toast.open({ content: 'Message' });
    expect(document.querySelectorAll('.gio-toast-icon').length).toBe(0);
  });

  // https://github.com/ant-design/ant-design/issues/8201
  it('should destroy messages correctly', () => {
    class Test extends React.Component {
      componentDidMount() {
        Toast.info('Action in progress1..', 0);
        Toast.info('Action in progress2..', 0);
        setTimeout(() => Toast.destroy(), 1000);
      }

      render() {
        return <div>test</div>;
      }
    }
    mount(<Test />);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(2);
    jest.runAllTimers();
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
  });

  it('should support update message content with a unique key', () => {
    const key = 'updatable';
    class Test extends React.Component {
      componentDidMount() {
        Toast.info({ content: 'Loading...', key });
        // Testing that content of the message should be updated.
        setTimeout(() => Toast.success({ content: 'Loaded', key }), 1000);
        setTimeout(() => Toast.destroy(), 3000);
      }

      render() {
        return <div>test</div>;
      }
    }

    mount(<Test />);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(1);
    jest.advanceTimersByTime(1500);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(1);
    jest.runAllTimers();
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
  });

  it('update message content with a unique key and cancel manually', () => {
    const key = 'updatable';
    class Test extends React.Component {
      componentDidMount() {
        const hideLoading = Toast.info({ content: 'Loading...', key, duration: 0 });
        // Testing that content of the message should be cancel manually.
        setTimeout(hideLoading, 1000);
      }

      render() {
        return <div>test</div>;
      }
    }

    mount(<Test />);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(1);
    jest.advanceTimersByTime(1500);
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
  });

  it('should not throw error when pass null', () => {
    Toast.error(null);
  });
});
