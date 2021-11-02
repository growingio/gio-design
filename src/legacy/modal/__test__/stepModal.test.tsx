/* eslint-disable no-console */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { StepModal } from '..';
import * as Steps from './Steps';

const { steps, mixedSteps, stepsOne, stepsTwo } = Steps;
let container: Element | DocumentFragment = null;

beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement('div');
  document.body.appendChild(container);
});

describe('StepModal Testing', () => {
  it('basic StepModal.', () => {
    act(() => {
      render(
        <StepModal
          visible
          title="Modal Title"
          onClose={() => {
            console.log('close');
          }}
          onOk={() => {
            console.log('ok');
          }}
          afterClose={() => console.log('after close')}
          steps={steps}
          closeAfterOk
        >
          Modal Body
        </StepModal>
      );
    });

    // expect(stepModal).toBeTruthy();
  });

  it('should update when steps and stepKey both change', () => {
    act(() => {
      const { rerender } = render(
        <StepModal visible title="Modal Title" steps={stepsOne}>
          Modal Body
        </StepModal>
      );
      rerender(
        <StepModal visible title="Modal Title" steps={stepsTwo}>
          Modal Body
        </StepModal>
      );
    });
  });

  it('should run ok with normal steps', () => {
    const onClose = jest.fn();
    const onOk = jest.fn();
    const afterClose = jest.fn();
    act(() => {
      render(
        <StepModal
          visible
          title="Modal Title"
          onClose={onClose}
          onOk={onOk}
          afterClose={afterClose}
          steps={steps}
          closeAfterOk
        >
          Modal Body
        </StepModal>,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        container
      );
    });
    const modalContent = document.querySelector('.gio-modal-body');
    const nextBtn = document.querySelector('.gio-modal__btn-ok');
    const cancelBtn = document.querySelector('.gio-modal__btn-close');

    nextBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(modalContent.textContent).toBe('Step Two');
    cancelBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  it('should not run afterClose when onClose reject', () => {
    const afterClose = jest.fn();
    render(
      <StepModal
        visible
        title="Modal Title"
        onClose={() =>
          Promise.reject(new Error('fail')).then((error) => {
            console.error(error);
          })
        }
        onOk={() => {
          console.log('ok');
        }}
        afterClose={afterClose}
        steps={mixedSteps}
        closeAfterOk
      >
        Modal Body
      </StepModal>
    );
    act(() => {
      fireEvent.click(screen.getByText('取 消'));
    });
    expect(afterClose).not.toHaveBeenCalled();
  });

  it('should runs ok with async onNext', () => {
    const onClose = jest.fn();
    const onOk = () =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    act(() => {
      render(
        <StepModal visible title="Modal Title" onClose={onClose} onOk={onOk} steps={mixedSteps} closeAfterOk>
          Modal Body
        </StepModal>,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        container
      );
    });
    const button = document.querySelector('.gio-modal__btn-ok');
    act(() => {
      for (let i = 0; i < 2; i += 1) {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
    expect(document.querySelector('.gio-modal-body').textContent).toBe('Step Two');
  });

  it('onOk', async () => {
    // jest.useFakeTimers();
    const onOk = jest.fn();
    const onClose = jest.fn();
    const option = [
      {
        key: '1',
        return: null,
        title: '步骤 1',
        content: 'Step One',
      },
      {
        key: '2',
        return: '1',
        title: '步骤 2',
        content: 'Step Two',
      },
    ];
    act(() => {
      render(<StepModal closeAfterOk visible steps={option} onOk={onOk} onClose={onClose} />);
    });
    fireEvent.click(screen.getByRole('button', { name: '下一步' }));
    fireEvent.click(screen.getByText('确 定'));
    expect(onOk).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('onClose', async () => {
    const onOk = jest.fn();
    const onClose = jest.fn();
    const options = [
      {
        key: '1',
        return: null,
        title: '步骤 1',
        content: 'Step One',
      },
      {
        key: '2',
        return: '1',
        title: '步骤 2',
        content: 'Step Two',
      },
    ];
    act(() => {
      render(<StepModal closeAfterOk visible steps={options} onOk={onOk} onClose={onClose} />);
    });
    fireEvent.click(screen.getByText('取 消'));
    expect(onClose).toHaveBeenCalled();
  });

  it('onBack', () => {
    const onBack = jest.fn();
    const step = [
      {
        key: '1',
        return: null as any,
        title: '步骤 1',
        content: 'Step One',
      },
      {
        key: '2',
        return: '1',
        title: '步骤 2',
        content: 'Step Two',
        onBack,
      },
    ];

    act(() => {
      render(<StepModal visible steps={step} />);
    });
    fireEvent.click(screen.getByRole('button', { name: '下一步' }));
    fireEvent.click(screen.getByLabelText('left-outlined'));
    expect(onBack).toHaveBeenCalled();
  });
});
describe('ButtonProps Testing', () => {
  it('cancelButtonProps & backButtonProps', () => {
    const options = [
      {
        key: '1',
        return: null,
        title: '步骤 1',
        content: 'Step One',
        cancelButtonProps: {
          disabled: true,
        },
        backButtonProps: {
          disabled: true,
        },
      },
      {
        key: '2',
        return: '1',
        title: '步骤 2',
        content: 'Step Two',
        cancelButtonProps: {
          disabled: true,
        },
        backButtonProps: {
          disabled: true,
        },
      },
    ];
    act(() => {
      render(<StepModal visible steps={options} />);
    });
  });
});
