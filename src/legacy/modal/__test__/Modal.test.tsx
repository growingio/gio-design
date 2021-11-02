/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React from 'react';
import { DesignProvider } from '@gio-design/utils';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Default } from '../demos/Modal.stories';
import Modal from '..';
import { IModalStaticFuncReturn } from '../interface';
import enUS from '../../../locales/en-US';
import zhCN from '../../../locales/zh-CN';

describe('Modal Testing', () => {
  it('renders with multi languages', () => {
    const { rerender } = render(
      <DesignProvider locale={enUS}>
        <Default {...Default.args} />
      </DesignProvider>
    );
    fireEvent.click(screen.getByText('Open Modal'));
    expect(screen.queryByText(/Cancel/)).not.toBeNull();

    rerender(
      <DesignProvider locale={zhCN}>
        <Default {...Default.args} />
      </DesignProvider>
    );
    fireEvent.click(screen.getByText('Open Modal'));
    expect(screen.queryByText(/取 消/)).not.toBeNull();
  });
  it('should match basic Modal snapshot.', () => {
    const wrapper = render(
      <Modal
        visible
        title="title"
        onClose={() => {
          console.log('close');
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('a');
        }}
      >
        Default Modal
      </Modal>
    );
    expect(wrapper).toBeTruthy();
  });

  it('should match mask close Modal snapshot.', () => {
    const wrapper = render(
      <Modal
        dropCloseButton
        visible
        title="title"
        onClose={() => {
          console.log('close');
        }}
        afterClose={() => {
          console.log('f');
        }}
      >
        MaskClose Modal
      </Modal>
    );
    expect(wrapper).toBeTruthy();
  });

  it('should match Modal with additional Footer snapshot.', () => {
    const wrapper = render(
      <Modal
        visible
        title="title"
        onClose={() => {
          console.log('close');
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('t');
        }}
        additionalFooter={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div style={{ textAlign: 'left' }}>
            <span>新建</span>
          </div>
        }
      >
        有额外 Footer 的 Modal
      </Modal>
    );
    expect(wrapper).toBeTruthy();
  });

  it('should match Modal with custom Footer snapshot.', () => {
    const wrapper = render(
      <Modal
        visible
        title="title"
        onClose={() => {
          console.log('close');
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('e');
        }}
        footer={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div style={{ textAlign: 'left' }}>
            <span>新建</span>
          </div>
        }
      >
        有自定义 Footer 的 Modal
      </Modal>
    );
    expect(wrapper).toBeTruthy();
  });

  it('should be a small Modal.', () => {
    const wrapper = render(
      <Modal
        visible
        size="small"
        title="title"
        onClose={() => {
          console.log('close');
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('r');
        }}
      >
        Default Modal
      </Modal>
    );
    expect(wrapper).toBeTruthy();
  });

  it('should be a middle Modal.', () => {
    const wrapper = render(
      <Modal
        visible
        size="middle"
        title="title"
        onClose={() => {
          console.log('close');
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('c');
        }}
      >
        Default Modal
      </Modal>
    );
    expect(wrapper).toBeTruthy();
  });

  it('should be a fullscreen Modal.', () => {
    const wrapper = render(
      <Modal
        visible
        size="full"
        title="title"
        onClose={() => {
          console.log('close');
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('l');
        }}
      >
        Default Modal
      </Modal>
    );
    expect(wrapper).toBeTruthy();
  });
});

describe('Modal Test.', () => {
  it('should trigger onOk', () => {
    const onOk = jest.fn();
    const { container } = render(
      <Modal visible title="title" onOk={onOk}>
        OnOk
      </Modal>
    );
    fireEvent.click(screen.getByText('确 定'));
    expect(container.getElementsByClassName('.gio-modal__btn-ok')).toBeTruthy();
    expect(onOk).toHaveBeenCalled();
  });

  it('should trigger onClose.', () => {
    const onClose = jest.fn();
    const onOk = jest.fn();

    render(
      <Modal visible title="title" onClose={onClose} onOk={onOk} closeAfterOk>
        OnClose
      </Modal>
    );
    fireEvent.click(screen.getByText('取 消'));
    expect(onClose).toHaveBeenCalled();
    fireEvent.click(screen.getByText('确 定'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should stop call onClose.', () => {
    const onClose = jest.fn();
    render(
      // eslint-disable-next-line prefer-promise-reject-errors
      <Modal visible title="title" onClose={onClose} onOk={() => Promise.reject('reject')}>
        Default Modal
      </Modal>
    );
    fireEvent.click(screen.getByText('确 定'));
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('useModal', () => {
  it('confirm', () => {
    jest.useFakeTimers();

    const Context = React.createContext('content');
    let instance: IModalStaticFuncReturn;
    const ConfigModal = () => {
      const [modal, hookModal] = Modal.useModal();

      const onClick = () => {
        instance = modal.confirm({
          title: 'title',
          content: (
            <Context.Consumer>{(content) => <div id="modal-hook-test-content">{content}</div>}</Context.Consumer>
          ),
        });
      };

      return (
        <Context.Provider value="content">
          <button onClick={onClick}>button</button>
          {hookModal}
        </Context.Provider>
      );
    };

    const { container, rerender } = render(<ConfigModal />);
    fireEvent.click(screen.getByRole('button'));
    expect(container.getElementsByClassName('gio-modal')).toHaveLength(0);
    act(() => {
      instance.update({
        content: <div id="modal-hook-test-content">update content</div>,
      });
    });
    rerender(<ConfigModal />);
    act(() => {
      instance.destroy();
    });
    jest.runAllTimers();
    rerender(<ConfigModal />);
    expect(container.getElementsByClassName('gio-modal')).toHaveLength(0);

    jest.useRealTimers();
  });
});
