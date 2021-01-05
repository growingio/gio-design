import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { StepModal } from '..';
import * as Steps from './steps';

const { multiBranchSteps, steps, mixedSteps, stepsOne, stepsTwo } = Steps;

jest.useFakeTimers();
let container = null;

beforeEach(() => {
  // 创建一个 DOM 元素作为渲染目标
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // 退出时进行清理
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('StepModal snapshot match', () => {
  it('should match basic StepModal snapshot.', () => {
    const stepModal = mount(
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
    expect(stepModal.render()).toMatchSnapshot();
  });

  it('should match multi branches StepModal snapshot.', () => {
    const stepModal = mount(
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
        steps={multiBranchSteps}
        closeAfterOk
      >
        Modal Body
      </StepModal>
    );
    expect(stepModal.render()).toMatchSnapshot();
  });

  it('should update when steps and stepKey both change', () => {
    const stepModal = mount(
      <StepModal visible title="Modal Title" steps={stepsOne}>
        Modal Body
      </StepModal>
    );
    stepModal.find('.gio-modal__btn-ok').at(0).simulate('click');
    expect(stepModal.find('.gio-modal-body').at(0).text()).toBe('Step Two');
    stepModal.setProps({ steps: stepsTwo });
    stepModal.update();
    expect(stepModal.find('.gio-modal-body').at(0).text()).toBe('Step One');
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
        container
      );
    });
    const modalContent = document.querySelector('.gio-modal-body');
    const nextBtn = document.querySelector('.gio-modal__btn-ok');
    const backBtn = document.querySelector('.gio-modal__btn-close');

    nextBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(modalContent.textContent).toBe('Step Two');
    backBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(modalContent.textContent).toBe('Step One');
    nextBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    nextBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    // act(() => {
    //   expect(afterClose).toHaveBeenCalled();
    // });
  });

  it('should not run afterClose when onClose reject', () => {
    const afterClose = jest.fn();
    const stepModal = mount(
      <StepModal
        visible
        title="Modal Title"
        onClose={() =>
          new Promise((resolve, reject) => {
            reject('reject');
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

    const closeBtn = stepModal.find('.gio-modal__btn-close').at(0);
    closeBtn.simulate('click');
    expect(afterClose).not.toHaveBeenCalled();
  });

  it('should runs ok with async onNext', () => {
    const onClose = jest.fn();
    const onOk = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    act(() => {
      render(
        <StepModal visible title="Modal Title" onClose={onClose} onOk={onOk} steps={mixedSteps} closeAfterOk>
          Modal Body
        </StepModal>,
        container
      );
    });
    const button = document.querySelector('.gio-modal__btn-ok');
    act(() => {
      for (let i = 0; i < 2; i++) {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
      expect(document.querySelector('.gio-modal-body').textContent).toBe('Step Three');
    });
  });
});
