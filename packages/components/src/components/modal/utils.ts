import { IStep, IStepMap, IStepInner, TModalNodeRender, IStepModalNodeRenderProps } from './interface';

export const stepArray2Map = (steps: IStep[]): { stepMap: IStepMap; firstStep: string } => {
  const stepsInnerArray: IStepInner[] = [];
  const stepIndexMap = steps.reduce<{ [key: string]: number }>((acc, cur, index) => {
    acc[cur.key] = index;
    stepsInnerArray.push(cur);
    return acc;
  }, {});

  const stepMap: IStepMap = {};
  let firstStep = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const step of stepsInnerArray) {
    stepMap[step.key] = step;
    if (step.return === null || step.return === undefined) {
      firstStep = step.key;
    } else {
      const prevStep = stepsInnerArray[stepIndexMap[step.return]];
      const prevStepNext = prevStep.next ?? [];
      prevStep.next = step.firstNextInTier ? [step.key, ...prevStepNext] : [...prevStepNext, step.key];
    }
  }

  return { stepMap, firstStep };
};

export const clarifyRender = (
  render: TModalNodeRender,
  renderProps: IStepModalNodeRenderProps,
  fallback: React.ReactNode = ''
): React.ReactNode => {
  if (render === undefined || render === null) {
    return fallback;
  }

  if (typeof render === 'function') {
    return render(renderProps);
  }

  return render;
};
