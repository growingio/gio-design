import React from 'react';
import { mount } from 'enzyme';
import Modal from '..';

describe('Modal snapshot match', () => {
  it('should match basic Modal snapshot.', () => {
    const wrapper = mount(
      <Modal
        visible
        title="title"
        content="content"
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should match mask close Modal snapshot.', () => {
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should match Modal with additional Footer snapshot.', () => {
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should match Modal with custom Footer snapshot.', () => {
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should be a small Modal.', () => {
    const wrapper = mount(
      <Modal
        visible
        size="small"
        title="title"
        content="content"
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should be a middle Modal.', () => {
    const wrapper = mount(
      <Modal
        visible
        size="middle"
        title="title"
        content="content"
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should be a fullscreen Modal.', () => {
    const wrapper = mount(
      <Modal
        visible
        size="full"
        title="title"
        content="content"
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
    expect(wrapper.render()).toMatchSnapshot();
  });
});

describe('Modal Test.', () => {
  it('should trigger onOk', () => {
    const onOk = jest.fn();
    const wrapper = mount(
      <Modal visible title="title" content="content" onOk={onOk}>
        OnOk
      </Modal>
    );
    wrapper.find('.gio-modal__btn-ok').at(0).simulate('click');
    expect(onOk).toHaveBeenCalled();
  });

  it('should trigger onClose.', () => {
    const onClose = jest.fn();
    const onOk = jest.fn();
    const wrapper = mount(
      <Modal visible title="title" content="content" onClose={onClose} onOk={onOk} closeAfterOk>
        OnClose
      </Modal>
    );
    wrapper.find('.gio-modal__btn-close').at(0).simulate('click');
    expect(onClose).toHaveBeenCalled();
    wrapper.find('.gio-modal__btn-ok').at(0).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should stop call onClose.', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Modal visible title="title" content="content" onClose={onClose} onOk={() => Promise.reject('reject')}>
        Default Modal
      </Modal>
    );
    wrapper.find('.gio-modal__btn-ok').at(0).simulate('click');
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('useModal', () => {
  it('confirm', () => {
    jest.useFakeTimers();

    const Context = React.createContext('content');
    let instance = null;
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

    const wrapper = mount(<ConfigModal />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.gio-modal').length).toBeTruthy();
    expect(wrapper.find('.gio-modal-content').length).toBeTruthy();
    expect(wrapper.find('#modal-hook-test-content').text()).toEqual('content');

    instance.update({
      content: <div id="modal-hook-test-content">update content</div>,
    });
    wrapper.update();
    expect(wrapper.find('#modal-hook-test-content').text()).toEqual('update content');

    instance.destroy();
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.gio-modal')).toHaveLength(0);

    jest.useRealTimers();
  });
});
