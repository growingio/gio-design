/**
 * title: 具有分支路径的 StepModal
 * desc: 在每一步都可以提供分支路径进行下一步的跳转
 */

import React, { useState } from 'react';
import { StepModal, IStep, TStepChange, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

const StepOneContent: React.FC<{
  step: IStep;
  push: TStepChange;
  pop: () => void;
}> = ({ children, step, push, pop }) => {
  console.log('===Log Start===');
  console.log(step);
  console.log('---Log End---');
  const handleNext1 = () => {
    push('2-1');
  };

  const handleNext2 = () => {
    push('2-2');
  };

  return (
    <div>
      {children}
      <Button type="text" size="small" style={{ marginLeft: 5 }} onClick={handleNext1}>
        go 2-1
      </Button>
      <Button type="text" size="small" style={{ marginLeft: 5 }} onClick={handleNext2}>
        go 2-2
      </Button>
    </div>
  );
};

const StepThreeContent: React.FC<{
  step: IStep;
  push: TStepChange;
  pop: () => void;
}> = ({ children, step, push, pop }) => {
  const back = () => {
    pop();
  };

  return (
    <div>
      {children}
      <Button type="text" size="small" style={{ marginLeft: 5 }} onClick={back}>
        Back to 2-2
      </Button>
    </div>
  );
};

const steps: IStep[] = [
  {
    key: '1',
    return: null,
    title: '步骤 1',
    content: ({ step, push, pop }) => (
      <StepOneContent step={step} push={push} pop={pop}>
        Step One
      </StepOneContent>
    ),
    onNext: () => console.log('step 1 onNext.'),
    onBack: () => console.log('step 1 onBack.'),
  },
  {
    key: '2-1',
    return: '1',
    title: '步骤 2-1',
    content: '步骤 2 - 1',
    onNext: () => console.log('step 2-1 onNext.'),
  },
  {
    key: '2-2',
    return: '1',
    firstNextInTier: true,
    title: '步骤 2-2',
    content: '步骤 2 - 2',
    onNext: () => console.log('step 2-2 onNext.'),
  },
  {
    key: '3',
    return: '2-2',
    title: '步骤 3',
    content: ({ step, push, pop }) => (
      <StepThreeContent step={step} push={push} pop={pop}>
        Step Three
      </StepThreeContent>
    ),
    onNext: () => console.log('step 3 onNext.'),
    onBack: () => console.log('step 3 onBack.'),
  },
];

export default () => {
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <StepModal
        pending={pending}
        visible={visible}
        title="Modal Title"
        onClose={() => {
          console.log('close');
          setVisible(false);
        }}
        onOk={() => {
          console.log('ok start');
          setPending(true);
          return new Promise((resolve) => {
            console.log('ok pending');
            setTimeout(() => {
              setPending(false);
              console.log('ok resolve');
              resolve();
            }, 2000);
          });
        }}
        afterClose={() => console.log('after close')}
        steps={steps}
        closeAfterOk
      >
        Modal Body
      </StepModal>
    </>
  );
};
