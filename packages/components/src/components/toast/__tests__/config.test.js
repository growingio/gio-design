import sleep from '../../../utils/sleep';
import Toast from '..';

describe('Toast.config', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    Toast.destroy();
    jest.useRealTimers();
  });

  it('should be able to config top', () => {
    Toast.config({
      top: 100,
    });
    Toast.info('whatever');
    expect(document.querySelectorAll('.gio-toast')[0].style.top).toBe('100px');
  });

  it('should be able to config rtl', () => {
    Toast.config({
      rtl: true,
    });
    Toast.info('whatever');
    expect(document.querySelectorAll('.gio-toast-rtl').length).toBe(1);
  });

  it('should be able to config getContainer', () => {
    Toast.config({
      getContainer: () => {
        const div = document.createElement('div');
        div.className = 'custom-container';
        document.body.appendChild(div);
        return div;
      },
    });
    Toast.info('whatever');
    expect(document.querySelectorAll('.custom-container').length).toBe(1);
  });

  it('should be able to config maxCount', () => {
    Toast.config({
      maxCount: 5,
    });
    for (let i = 0; i < 10; i += 1) {
      Toast.info('test');
    }
    Toast.info('last');
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(5);
    expect(document.querySelectorAll('.gio-toast-notice')[4].textContent).toBe('last');
    jest.runAllTimers();
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
  });

  it('should be able to config duration', (done) => {
    jest.useRealTimers();
    Toast.config({
      duration: 0.5,
    });
    Toast.info('last');
    sleep(600).then(() => {
      expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
      Toast.config({
        duration: 2,
      });
      done();
    });
  });

  it('should be able to config prefixCls', () => {
    Toast.config({
      prefixCls: 'prefix-test',
    });
    Toast.info('last');
    expect(document.querySelectorAll('.gio-toast-notice').length).toBe(0);
    expect(document.querySelectorAll('.prefix-test-notice').length).toBe(1);
    Toast.config({
      prefixCls: 'gio-toast',
    });
  });

  it('should be able to config transitionName', () => {
    Toast.config({
      transitionName: '',
    });
    Toast.info('last');
    expect(document.querySelectorAll('.move-up-enter').length).toBe(0);
    Toast.config({
      transitionName: 'move-up',
    });
  });
});
