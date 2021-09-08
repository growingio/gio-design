import React, { useState, useEffect } from 'react';
import { isEqual } from 'lodash';
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
  const [stepObj, setStepObj] = useState(() => stepArray2Map(steps));
  const { stepMap, firstStep } = stepObj;
  const [stepStack, setStepStack] = useState<string[]>([firstStep]);
  const [stepMapKey, setStepMapKey] = useState<string[]>(Object.keys(stepMap));
  const [stepPending, setStepPending] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _stepObj = stepArray2Map(steps);
    setStepObj(_stepObj);
    // steps改变但key不变时，不做变更
    if (!isEqual(Object.keys(_stepObj.stepMap), stepMapKey)) {
      // 传入的 steps 发生改变后需要重置 stepStack
      setStepStack([_stepObj.firstStep]);
      setStepMapKey(Object.keys(_stepObj.stepMap));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);
  const curStepOnShow = stepStack[stepStack.length - 1];
  const curStep: IStepInner = stepMap[curStepOnShow];
  const { onNext, onBack } = curStep;
  const isLastStep: boolean = !curStep.next || (curStep.next && curStep.next.length === 0) || !!curStep.wayout;
  const isFirstStep: boolean = curStep.key === firstStep;

  const textOk = isLastStep ? okText ?? '确定' : curStep.nextText ?? '下一步';
  const textClose = (curStep.cancelText || curStep.backText || closeText) ?? '取消';

  const handlePush: TStepChange = (step) => setStepStack((cur) => [...cur, step]);

  const handlePop = () => setStepStack((curStepStack) => curStepStack.slice(0, curStepStack.length - 1));

  const handleReset = () => setStepStack([firstStep]);

  const handleExecResult = (execResult: void | Promise<unknown>, afterExec: () => void) => {
    if (!execResult || !execResult.then) {
      afterExec();
      return;
    }
    setStepPending(true);
    execResult
      // eslint-disable-next-line no-console
      .then(afterExec, console.error)
      .finally(() => {
        setStepPending(false);
      });
  };

  const handleBack = () => {
    const backExecResult = onBack?.();
    handleExecResult(backExecResult, handlePop);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const closeExecResult = onClose?.(e);
    handleExecResult(closeExecResult, () => setTimeout(handleReset, 500));
  };

  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isLastStep) {
      const okExecResult = onOk?.(e);
      handleExecResult(okExecResult, () => {
        // 这里不交给 Modal 进行处理，自行处理
        // 因为 handleClose 在 afterClose 执行时无法很好判断触发点，导致出错
        if (closeAfterOk) {
          onClose?.(e);
        }
        setTimeout(handleReset, 500);
      });
    } else {
      const nextExecResult = onNext?.();
      handleExecResult(nextExecResult, () => {
        const nextStep = curStep?.next?.[0] ?? '';
        handlePush(nextStep);
      });
    }
  };

  const stepProp = {
    step: curStep,
    push: handlePush,
    pop: handlePop,
  };
  const Title = clarifyRender(curStep.title, stepProp, title);
  const Content = clarifyRender(curStep.content, stepProp, children);
  const Footer = clarifyRender(curStep.footer, stepProp, undefined);

  return (
    <Modal
      {...modalProps}
      pending={stepPending}
      additionalFooter={curStep.additionalFooter || additionalFooter}
      okButtonProps={curStep.nextButtonProps || okButtonProps}
      closeButtonProps={curStep.cancelButtonProps || curStep.backButtonProps || closeButtonProps}
      title={Title}
      footer={Footer}
      useBack={
        !isFirstStep && (!curStep.cancelButtonProps?.disabled || !curStep.backButtonProps?.disabled) && !stepPending
      }
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
