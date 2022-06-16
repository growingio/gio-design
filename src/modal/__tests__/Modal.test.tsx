import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import Modal from '..';
import { sleep } from '../../utils/test';

describe('Test Modal', () => {
  afterEach(async () => {
    jest.clearAllMocks();
    jest.useRealTimers();
    Modal.destroyAll();
    await sleep();
    document.body.innerHTML = '';
  });
  it('renders corrrectly', () => {
    render(
      <Modal visible>
        <div>
          <h1>Modal</h1>
        </div>
      </Modal>
    );
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
  it('controlls visible', () => {
    const Demo = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <button type="button" onClick={() => setVisible(true)}>
            open
          </button>
          <Modal
            visible={visible}
            onOk={() => {
              setVisible(false);
            }}
            okText="ok"
            cancelText="取消"
            maskClosable
            destroyOnClose
            onClose={() => setVisible(false)}
          >
            <div>
              <h1>Modal Content</h1>
            </div>
          </Modal>
        </div>
      );
    };
    render(<Demo />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('open'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('取消'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByText('ok'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
  it('can set prop size', () => {
    render(
      <Modal visible size="full">
        <div>
          <h1>Modal</h1>
        </div>
      </Modal>
    );
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(within(screen.getByTestId('modal')).getByRole('document')).toHaveClass('gio-modal-full');
  });
  it('render with  prop okButtonProps and closeButtonProps', () => {
    const onCloseClick = jest.fn();
    render(
      <Modal
        visible
        okText="ok"
        cancelText="cancel"
        closeButtonProps={{ className: 'custom-close', onClick: onCloseClick }}
        okButtonProps={{ className: 'custom-ok', style: { backgroundColor: 'red' } }}
      >
        <div>
          <h1>Modal</h1>
        </div>
      </Modal>
    );
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('ok')).toHaveClass('custom-ok');
    expect(screen.getByText('ok')).toHaveStyle({ backgroundColor: 'red' });
    fireEvent.click(screen.getByText('ok'));
    expect(screen.getByText('cancel')).toHaveClass('custom-close');
    fireEvent.click(screen.getByText('cancel'));
    expect(onCloseClick).toHaveBeenCalled();
  });
  it('support custom onClick event when click okButton', () => {
    const onOKClick = jest.fn();
    render(
      <Modal
        visible
        okText="ok"
        cancelText="cancel"
        okButtonProps={{ className: 'custom-ok', style: { backgroundColor: 'red' }, onClick: onOKClick }}
      >
        <div>
          <h1>Modal</h1>
        </div>
      </Modal>
    );
    fireEvent.click(screen.getByText('ok'));
    expect(onOKClick).toHaveBeenCalled();
  });
  it('render with  prop confirmLoading', () => {
    const onOKClick = jest.fn();
    render(
      <Modal
        visible
        okText="ok"
        cancelText="cancel"
        confirmLoading
        closeButtonProps={{ className: 'custom-close' }}
        okButtonProps={{ style: { backgroundColor: 'red' }, onClick: onOKClick }}
      >
        <div>
          <h1>Modal</h1>
        </div>
      </Modal>
    );
    expect(screen.getByText('ok')).toHaveClass('gio-button_loading');
    fireEvent.click(screen.getByText('cancel'));
  });
});
