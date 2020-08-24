import React, { useState } from 'react';
import Modal from './Modal';
import { IStepModalProps, IStep } from './interface';

const StepModal: React.FC<IStepModalProps> = ({
  steps = [],
  okText,
  closeText,
  onOk,
  onClose,
  closeAfterOk,
  title,
  children,
  ...modalProps
}) => {
  const [curStepAt, setCurStepAt] = useState(0);
  const curStep: IStep = steps[curStepAt];
  const { onNext, onBack } = curStep;
  const isLastStep: boolean = curStepAt === steps.length - 1;
  const isFirstStep: boolean = curStepAt === 0;

  const textOk = isLastStep ? okText ?? '确定' : '下一步';
  const textClose = isFirstStep ? closeText ?? '取消' : '上一步';

  const handleBack = async () => {
    await Promise.resolve(onBack?.());
    setCurStepAt(curStepAt - 1);
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isLastStep) {
      await Promise.resolve(onOk?.(e));
      // 这里不交给 Modal 进行处理，自行处理
      // 因为 handleClose 在 afterClose 执行时无法很好判断触发点，导致出错
      if (closeAfterOk) {
        onClose?.(e);
      }
    } else {
      await Promise.resolve(onNext?.());
      setCurStepAt(curStepAt + 1);
    }
  };

  const handleClose = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const targetClassList = (e.target as HTMLElement).classList.value;
    const isCloseIcon = /^gio\-modal(\_\_|\-)close$/.test(targetClassList);

    if (isFirstStep || isCloseIcon) {
      onClose?.(e);
    } else {
      await handleBack();
    }
  };

  return (
    <Modal
      {...modalProps}
      closeAfterOk={false}
      title={curStep.title ?? title}
      footer={curStep.footer}
      useBack={!isFirstStep}
      onBack={handleBack}
      okText={textOk}
      closeText={textClose}
      onOk={handleOk}
      onClose={handleClose}
    >
      {curStep.content ?? children}
    </Modal>
  );
};

export default StepModal;
