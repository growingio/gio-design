/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../button';

const StepOneContent = ({ children, step, push, pop }) => {
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

const StepThreeContent = ({ children, step, push, pop }) => {
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

export const multiBranchSteps = [
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
    backButtonProps: {
      disabled: true,
    },
    nextButtonProps: {
      disabled: true,
    },
    nextText: '自定义下一步',
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

export const steps = [
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

export const mixedSteps = [
  {
    key: '1',
    return: null,
    title: '步骤 1',
    content: 'Step One',
    onNext: () => console.log('step 1 onNext.'),
    onBack: () =>
      new Promise((resolve) => {
        console.log('step 1 onBack.');
        resolve('next step in step 1.');
      }),
  },
  {
    key: '2',
    return: '1',
    title: '步骤 2',
    content: 'Step Two',
    onNext: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('next step in step 2.');
        }, 2000);
      }),
  },
  {
    key: '3',
    return: '2',
    title: '步骤 3',
    content: 'Step Three',
  },
];

export const stepsOne = [
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
];

export const stepsTwo = [
  {
    key: 'one',
    return: null,
    title: '步骤 1',
    content: 'Step One',
    onNext: () => console.log('step 1 onNext.'),
    onBack: () => console.log('step 1 onBack.'),
  },
  {
    key: 'two',
    return: 'one',
    title: '步骤 2',
    content: 'Step Two',
    onNext: () => console.log('step 2 onNext.'),
  },
];
