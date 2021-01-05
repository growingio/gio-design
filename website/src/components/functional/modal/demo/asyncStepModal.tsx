/**
 * title: 异步的 StepModal
 * desc: StepModal 的 `onNext`, `onBack`, `onOk`, `onClose`  都可以返回一个 `Promise`。<br/>当该 `Promise` 状态为 `pending` 时 `StepModal` 也会进入 `pending` 状态。<br/>当该 `Promise` 被 `reject` 时 `StepModal` 不会执行下一步。
 */
import React, { useState } from 'react';
import { StepModal, IStep, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

const steps: IStep[] = [
  {
    key: '1',
    return: null,
    title: '步骤 1',
    content: '点击「下一步」三秒 pending 后进入下一步',
    onNext: () => {
      console.log('step 1 onNext.');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    },
    onBack: () => console.log('step 1 onBack.'),
  },
  {
    key: '2',
    return: '1',
    title: '步骤 2',
    content: '点击「下一步」三秒 pending 后将被 reject',
    onNext: () => {
      console.log('step 2 onNext.');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 3000);
      });
    },
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
