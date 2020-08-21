import React, { useState } from 'react';
import { StepModal, IStep, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

const steps: IStep[] = [
  {
    // title: '步骤 1',
    content: 'Step One',
    onNext: () => console.log('step 1 onNext.'),
    onBack: () => console.log('step 1 onBack.'),
  },
  {
    title: '步骤 2',
    content: 'Step Two',
    onNext: () => console.log('step 2 onNext.'),
  },
  {
    title: '步骤 3',
    // content: 'Step Three',
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
