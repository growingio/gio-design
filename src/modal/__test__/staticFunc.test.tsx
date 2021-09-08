import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import { WarningCircleFilled } from '@gio-design/icons';
import CalloutModal from '../CalloutModal';
import { withConfirm, withInfo, withSuccess, withWarn, withError, configModal } from '../callout';
import Modal from '..';
import { sleep } from '../../utils/test';
import { defaultRootPrefixCls } from '../../components/config-provider';

const { confirm } = Modal;

describe('<CalloutModal />', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render CalloutModal', () => {
    render(
      <CalloutModal
        visible
        title="CalloutModal Title Snapshot"
        content="CalloutModal Content Snapshot"
        type="confirm"
        icon={<WarningCircleFilled size="20px" />}
        close={() => {
          console.log('close');
        }}
      />
    );
  });
});

describe('get props with type correctly.', () => {
  it('should get confirm props.', () => {
    configModal({ prefixCls: defaultRootPrefixCls });
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
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => null);

  afterEach(() => {
    errorSpy.mockReset();
    document.body.innerHTML = '';
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  function open(args: any) {
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
    fireEvent.click(screen.getByRole('button', { name: '取 消' }));
    expect(onClose).toBeCalled();
    expect(onOk).not.toBeCalled();
  });

  it('trigger onOk once when click on ok button', () => {
    const onClose = jest.fn();
    const onOk = jest.fn();
    open({
      onClose,
      onOk,
    });
    fireEvent.click(screen.getByRole('button', { name: '确 定' }));
    expect(onClose).not.toBeCalled();
    expect(onOk).toBeCalled();
  });

  it('should allow Modal.confirm close without onClose been set', () => {
    open(null);
    fireEvent.click(screen.getByRole('img'));
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should allow Modal.confirm close without onOk been set', () => {
    open(null);
    fireEvent.click(screen.getByRole('button', { name: '确 定' }));
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should emit error when onOk return Promise.reject', async () => {
    const error = new Error('something goes wrong.');
    open({
      onOk: () => Promise.reject(error),
    });
    fireEvent.click(screen.getByRole('button', { name: '确 定' }));

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const instance = Modal[type]({
        title: 'title',
        content: 'content',
      });
      act(() => {
        jest.runAllTimers();
      });
      expect(document.getElementsByClassName(`.gio-modal-callout--${type}`)).toHaveLength(0);
      instance.destroy();
      act(() => {
        jest.runAllTimers();
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      expect(document.getElementsByClassName(`.gio-modal-callout--${type}`)).toHaveLength(0);
    });
    jest.useRealTimers();
  });

  it('should not hide confirm when onOk return Promise.resolve', () => {
    const props = {
      visible: true,
      title: 'CalloutModal Title Snapshot',
      content: 'CalloutModal Content Snapshot',
      type: 'confirm',
      icon: <WarningCircleFilled size="20px" />,
      onClose: false,
      onOk: () => Promise.resolve(''),
      close: (arg: any) => console.log(arg),
    } as any;
    const { container } = render(<CalloutModal {...props} />);

    fireEvent.click(screen.getByRole('button'));
    expect(container.getElementsByClassName('.gio-modal-callout')).toHaveLength(0);
  });

  it('should not hide confirm when onOk return Promise.resolve', () => {
    const props = {
      visible: true,
      title: 'CalloutModal Title Snapshot',
      content: 'CalloutModal Content Snapshot',
      type: 'confirm',
      icon: <WarningCircleFilled size="20px" />,
      onClose: false,
      onOk: () => Promise.resolve(''),
      showClose: true,
      close: (arg: any) => console.log(arg),
    } as any;
    const { container } = render(<CalloutModal {...props} />);

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(container.getElementsByClassName('.gio-modal-callout')).toHaveLength(0);
  });
});
