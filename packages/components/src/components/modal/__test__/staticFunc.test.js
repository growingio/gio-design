import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { WarningFilled } from '@gio-design/icons';
import CalloutModal from '../CalloutModal';
import { withConfirm, withInfo, withSuccess, withWarn, withError } from '../callout';
import Modal from '..';

const { confirm } = Modal;

const globalTimeout = global.setTimeout;

const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise((resolve) => globalTimeout(resolve, timeout));
  });
};

describe('<CalloutModal />', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should match CalloutModal snapshot.', () => {
    const wrapper = mount(
      <CalloutModal
        visible
        title="CalloutModal Title Snapshot"
        content="CalloutModal Content Snapshot"
        type="confirm"
        icon={<WarningFilled size="20px" />}
        close={() => {
          console.log('close');
        }}
      />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});

describe('get props with type correctly.', () => {
  it('should get confirm props.', () => {
    const props = withConfirm({ title: 'confirm', content: 'confirm' });
    expect(props.type).toEqual('confirm');
    expect(props.showClose).toBe(true);
  });

  it('should get info props.', () => {
    const props = withInfo({ title: 'info', content: 'info' });
    expect(props.type).toEqual('info');
    expect(props.showClose).toBe(false);
  });

  it('should get success props.', () => {
    const props = withSuccess({ title: 'success', content: 'success' });
    expect(props.type).toEqual('success');
    expect(props.showClose).toBe(false);
  });

  it('should get warn props.', () => {
    const props = withWarn({ title: 'warn', content: 'warn' });
    expect(props.type).toEqual('warn');
    expect(props.showClose).toBe(false);
  });

  it('should get error props.', () => {
    const props = withError({ title: 'error', content: 'error' });
    expect(props.type).toEqual('error');
    expect(props.showClose).toBe(false);
  });
});

describe('Modal.staticFunc triggers correctly.', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
    document.body.innerHTML = '';
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  function open(args) {
    jest.useFakeTimers();
    const modal = confirm({
      title: 'Confirm Modal',
      content: 'descriptions',
      ...args,
    });
    jest.runAllTimers();
    jest.useRealTimers();
    return modal;
  }

  it('should not render title when title not defined', () => {
    jest.useFakeTimers();
    confirm({
      content: 'some descriptions',
    });
    jest.runAllTimers();
    expect(document.querySelector('.gio-modal-callout__title')).toBe(null);
    jest.useRealTimers();
  });

  it('trigger onClose once when click on cancel button', () => {
    const onClose = jest.fn();
    const onOk = jest.fn();
    open({
      onClose,
      onOk,
    });
    $$('.gio-btn')[0].click();
    expect(onClose.mock.calls.length).toBe(1);
    expect(onOk.mock.calls.length).toBe(0);
  });

  it('trigger onOk once when click on ok button', () => {
    const onClose = jest.fn();
    const onOk = jest.fn();
    open({
      onClose,
      onOk,
    });
    $$('.gio-btn-primary')[0].click();
    expect(onClose.mock.calls.length).toBe(0);
    expect(onOk.mock.calls.length).toBe(1);
  });

  it('should allow Modal.confirm close without onClose been set', () => {
    open();
    $$('.gio-btn')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should allow Modal.confirm close without onOk been set', () => {
    open();
    $$('.gio-btn-primary')[0].click();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should not hide confirm when onOk return Promise.resolve', () => {
    open({
      onOk: () => Promise.resolve(''),
    });
    $$('.gio-btn-primary')[0].click();
    expect($$('.gio-modal-callout')).toHaveLength(1);
  });

  it('should emit error when onOk return Promise.reject', async () => {
    const error = new Error('something goes wrong.');
    open({
      onOk: () => {
        return Promise.reject(error);
      },
    });
    $$('.gio-btn-primary')[0].click();

    await sleep();

    expect(errorSpy).toHaveBeenCalledWith(error);
  });

  it('should update Modal title', async () => {
    const modal = open({
      title: 'init title',
    });
    modal.update({
      title: 'new title',
    });
    await sleep();
    expect(document.querySelector('.gio-modal-callout__title').textContent).toBe('new title');
  });

  it('could be destroy', async () => {
    jest.useFakeTimers();
    ['info', 'success', 'warn', 'error'].forEach(async (type) => {
      const instance = Modal[type]({
        title: 'title',
        content: 'content',
      });
      act(() => {
        jest.runAllTimers();
      });
      expect($$(`.gio-modal-callout--${type}`)).toHaveLength(1);
      instance.destroy();
      act(() => {
        jest.runAllTimers();
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      expect($$(`.gio-modal-callout--${type}`)).toHaveLength(0);
    });
    jest.useRealTimers();
  });
});
