import React, { useState, useEffect, useMemo } from 'react';
import Modal from './Modal';
import { stepArray2Map, clarifyRender } from './utils';
import { IStepModalProps, IStepInner, TStepChange } from './interface';

const StepModal: React.FC<IStepModalProps> = ({
  steps = [],
  onOk,
  onClose,
  closeAfterOk,
  title,
  children,
  okText,
  closeText,
  additionalFooter,
  okButtonProps,
  closeButtonProps,
  ...modalProps
}: IStepModalProps) => {
  const { stepMap, firstStep } = useMemo(() => stepArray2Map(steps), [steps]);
  const [stepStack, setStepStack] = useState<string[]>([firstStep]);

  useEffect(() => {
    // 传入的 steps 发生改变后需要重置 stepStack
    setStepStack([firstStep]);
  }, [stepMap, firstStep]);

  const curStepOnShow = stepStack[stepStack.length - 1];
  const curStep: IStepInner = stepMap[curStepOnShow];
  const { onNext, onBack } = curStep;
  const isLastStep: boolean = !curStep.next || (curStep.next && curStep.next.length === 0);
  const isFirstStep: boolean = curStep.key === firstStep;

  const textOk = isLastStep ? okText ?? '确定' : curStep.nextText ?? '下一步';
  const textClose = isFirstStep ? closeText ?? '取消' : curStep.backText ?? '上一步';

  const handlePush: TStepChange = (step) => setStepStack((cur) => [...cur, step]);

  const handlePop = () => setStepStack((curStepStack) => curStepStack.slice(0, curStepStack.length - 1));

  const handleReset = () => setStepStack([firstStep]);

  const handleBack = async () => {
    await Promise.resolve(onBack?.());
    handlePop();
  };

  const handleOk = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isLastStep) {
      await Promise.resolve(onOk?.(e));
      // 这里不交给 Modal 进行处理，自行处理
      // 因为 handleClose 在 afterClose 执行时无法很好判断触发点，导致出错
      if (closeAfterOk) {
        onClose?.(e);
        handleReset();
      }
    } else {
      await Promise.resolve(onNext?.());
      const nextStep = curStep?.next?.[0] ?? '';
      handlePush(nextStep);
    }
  };

  const handleClose = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const container = document.querySelector('.gio-modal-close');
    const target: HTMLElement = e.target as HTMLElement;
    const isCloseIcon = container?.contains(target) || target.classList.contains('gio-modal-close');

    if (isFirstStep || isCloseIcon) {
      onClose?.(e);
      handleReset();
    } else {
      await handleBack();
    }
  };

  const stepProp = {
    step: curStep,
    push: handlePush,
    pop: handlePop,
  };
  const Title = clarifyRender(curStep.title, stepProp, title);
  const Content = clarifyRender(curStep.content, stepProp, children);
  const Footer = clarifyRender(curStep.footer, stepProp, false);

  return (
    <Modal
      {...modalProps}
      additionalFooter={curStep.additionalFooter || additionalFooter}
      okButtonProps={curStep.nextButtonProps || okButtonProps}
      closeButtonProps={curStep.backButtonProps || closeButtonProps}
      closeAfterOk={false}
      title={Title}
      footer={Footer}
      useBack={!isFirstStep && !curStep.backButtonProps?.disabled}
      onBack={handleBack}
      okText={textOk}
      closeText={textClose}
      onOk={handleOk}
      onClose={handleClose}
    >
      {Content}
    </Modal>
  );
};

export default StepModal;
