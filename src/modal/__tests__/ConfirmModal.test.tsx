import { fireEvent, render, screen, within, act } from '@testing-library/react';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Button } from '../..';
import Modal from '..';
import { sleep } from '../../utils/test';
import { IModalStaticFuncConfig } from '../interface';

describe('Test ConfirmModal', () => {
  afterEach(async () => {
    jest.clearAllMocks();
    jest.useRealTimers();
    Modal.destroyAll();
    await sleep();
    document.body.innerHTML = '';
  });

  it('render by static method Modal.open', () => {
    const onModalClose = jest.fn();
    jest.useFakeTimers('modern');
    const { container } = render(
      <Button
        type="secondary"
        onClick={() =>
          Modal.open({
            title: '弹窗标题',
            content: 'Modal.open content',
            onClose: onModalClose,
          })
        }
      >
        Open Modal
      </Button>
    );
    fireEvent.click(container.querySelector('button'));
    jest.runOnlyPendingTimers();
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(screen.queryByText('弹窗标题')).toBeInTheDocument();
    expect(screen.queryByText('Modal.open content')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    jest.runOnlyPendingTimers();
    expect(onModalClose).toHaveBeenCalled();
    expect(screen.queryByText('Modal.open content')).not.toBeInTheDocument();
    fireEvent.click(container.querySelector('button'));
    jest.runOnlyPendingTimers();
    act(() => {
      fireEvent.click(screen.getByText('确定'));
      jest.runOnlyPendingTimers();
    });
    expect(screen.queryByText('Modal.open content')).not.toBeInTheDocument();
  });
  it(' Modal.useModal', () => {
    const { result } = renderHook(() => Modal.useModal());
    expect(result.current[0].open).toBeInstanceOf(Function);
  });
  it('render by hook Modal.useModal', () => {
    const Demo = () => {
      const [modalFuncs, hookModal] = Modal.useModal();
      const handleConfirm = () => {
        modalFuncs.open({
          title: 'useModal',
          content: 'useModal content',
        });
      };

      return (
        <>
          <Button type="secondary" onClick={() => handleConfirm()}>
            Open Modal Hook
          </Button>
          {hookModal}
        </>
      );
    };
    const { container } = render(<Demo />);

    fireEvent.click(container.querySelector('button'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
  it('should close when click OkButton', () => {
    jest.useFakeTimers('modern');
    const onOk = jest.fn();
    const openModal = () => {
      Modal.open({
        title: 'title',
        content: 'content',
        okText: '确定',
        onOk,
      });
    };
    const { container } = render(
      <Button type="secondary" onClick={openModal}>
        Open Modal
      </Button>
    );
    fireEvent.click(container.querySelector('button'));
    jest.runOnlyPendingTimers();
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByText('确定'));
      jest.runOnlyPendingTimers();
    });
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(onOk).toHaveBeenCalled();
  });
  it('manual close and update', () => {
    jest.useFakeTimers('modern');
    const afterModalClose = jest.fn();
    const openModal = () => {
      const modal = Modal.open({
        title: 'title',
        content: (
          <div>
            <Button
              onClick={() => {
                modal.destroy();
              }}
            >
              destroy
            </Button>
            <Button
              onClick={() => modal.update((pre: IModalStaticFuncConfig) => ({ ...pre, title: 'updated_title1' }))}
            >
              update1
            </Button>
            <Button onClick={() => modal.update({ title: 'updated_title2' })}>update2</Button>
          </div>
        ),
        afterClose: () => {
          afterModalClose();
        },
      });
    };
    const { container } = render(
      <Button type="secondary" onClick={openModal}>
        Open Modal
      </Button>
    );
    fireEvent.click(container.querySelector('button'));
    jest.runOnlyPendingTimers();
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(within(screen.queryByTestId('modal')).queryByText('title')).toBeInTheDocument();
    fireEvent.click(screen.getByText('update1'));
    jest.runOnlyPendingTimers();
    expect(within(screen.queryByTestId('modal')).queryByText('title')).not.toBeInTheDocument();
    expect(within(screen.queryByTestId('modal')).queryByText('updated_title1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('update2'));
    jest.runOnlyPendingTimers();
    expect(within(screen.queryByTestId('modal')).queryByText('updated_title2')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByText('destroy'));
      jest.runOnlyPendingTimers();
    });

    expect(afterModalClose).toHaveBeenCalled();
  });
});
