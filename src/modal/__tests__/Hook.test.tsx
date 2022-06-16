import { fireEvent, render, screen, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import Modal from '..';
import { sleep } from '../../utils/test';

describe('Test Modal.useModal', () => {
  afterEach(async () => {
    jest.clearAllMocks();
    jest.useRealTimers();
    Modal.destroyAll();
    await sleep();
    document.body.innerHTML = '';
  });
  it('should be ok', () => {
    jest.useFakeTimers('modern');
    const { result } = renderHook(() => Modal.useModal());
    expect(result.current[0]?.open).toBeInstanceOf(Function);
  });
  it('render by hook Modal.useModal', () => {
    const onClose = jest.fn();
    const onOk = jest.fn();
    const Demo = () => {
      const [modalFuncs, hookModal] = Modal.useModal();

      return (
        <>
          <button
            type="button"
            onClick={() => modalFuncs.open({ title: 'title', content: 'content', okText: 'OK', onClose, onOk })}
          >
            open
          </button>
          {hookModal}
        </>
      );
    };
    const { container } = render(<Demo />);

    fireEvent.click(container.querySelector('button'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();

    fireEvent.click(screen.getByText('open'));
    act(() => {
      fireEvent.click(screen.getByText('OK'));
    });
    expect(onOk).toHaveBeenCalled();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
  it('should has  update method return', () => {
    jest.useFakeTimers('modern');
    const Demo = () => {
      const [modalFuncs, hookModal] = Modal.useModal();
      const showModal = () => {
        const content = (
          <>
            <button
              type="button"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                modal.update({
                  title: 'title2',
                });
              }}
            >
              update title
            </button>
          </>
        );
        const modal = modalFuncs.open({ title: 'title', content, okText: 'OK' });
      };

      return (
        <>
          <button type="button" onClick={() => showModal()}>
            open
          </button>
          {hookModal}
        </>
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByText('open'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByText('update title'));
      jest.runOnlyPendingTimers();
    });
    expect(screen.queryByText('title2')).toBeInTheDocument();
  });
});
