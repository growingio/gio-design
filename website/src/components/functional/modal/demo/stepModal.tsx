import React, { useState } from 'react';
import { StepModal, IStep, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

const steps: IStep[] = [
  {
    key: '1',
    return: null,
    title: '步骤 1',
    content: 'Step One',
    onNext: () => console.log('step 1 onNext.'),
    onBack: () => console.log('step 1 onBack.'),
  },
  {
    key: '2',
    return: '1',
    title: '步骤 2',
    content: 'Step Two',
    onNext: () => console.log('step 2 onNext.'),
  },
  {
    key: '3',
    return: '2',
    title: '步骤 3',
    content: 'Step Three',
    onNext: () => console.log('step 3 onNext.'),
    onBack: () => console.log('step 3 onBack.'),
  },
];

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <StepModal
        visible={visible}
        title="Modal Title"
        onClose={() => {
          console.log('close');
          setVisible(false);
        }}
        onOk={() => {
          console.log('ok start');
          return new Promise((resolve) => {
            console.log('ok pending');
            setTimeout(() => {
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
