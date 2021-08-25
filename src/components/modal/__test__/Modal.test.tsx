/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '..';

describe('Modal Testing', () => {
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
          console.log('after close');
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
          console.log('after close');
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
          console.log('after close');
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
          console.log('after close');
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
          console.log('after close');
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
          console.log('after close');
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
          console.log('after close');
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
    expect(container.getElementsByClassName('.gio-modal__btn-ok')).toBeTruthy();
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
    screen.logTestingPlaygroundURL();
    fireEvent.click(screen.getByText('确 定'));
    // screen.debug(screen.getByText('确 定'));
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('useModal', () => {
  it('confirm', () => {
    jest.useFakeTimers();

    const Context = React.createContext('content');
    let instance = null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ConfigModal = () => {
      const [modal, hookModal] = Modal.useModal();

      const onClick = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    render(<ConfigModal />);
    screen.logTestingPlaygroundURL();
    fireEvent.click(screen.getByRole('button'));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance.update({
      content: <div id="modal-hook-test-content">update content</div>,
    });
  });
});
