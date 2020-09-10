/* eslint-disable no-console */
import { stepArray2Map, clarifyRender } from '../utils';

const stepsArray = [
  {
    key: '1',
    return: null,
    title: '步骤 1',
    content: '1',
  },
  {
    key: '2-1',
    return: '1',
    title: '步骤 2-1',
    content: '步骤 2 - 1',
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
  },
  {
    key: '3',
    return: '2-2',
    title: '步骤 3',
    content: '3',
  },
];

const stepsMap = {
  stepMap: {
    '1': {
      key: '1',
      return: null,
      title: '步骤 1',
      content: '1',
      next: ['2-2', '2-1'],
    },
    '3': {
      key: '3',
      return: '2-2',
      title: '步骤 3',
      content: '3',
    },
    '2-1': {
      key: '2-1',
      return: '1',
      title: '步骤 2-1',
      content: '步骤 2 - 1',
    },
    '2-2': {
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
      next: ['3'],
    },
  },
  firstStep: '1',
};

describe('Test Modal utils.', () => {
  it('should convert steps from Array to Map, and find the first step.', () => {
    const steps = stepArray2Map(stepsArray);
    expect(steps).toEqual(stepsMap);
  });

  it('should get the fallback-render.', () => {
    const render = clarifyRender(null, {}, 'fallback-render');
    expect(render).toEqual('fallback-render');
  });

  it('should get the fn-render.', () => {
    const render = clarifyRender(() => 'fn-render', {});
    expect(render).toEqual('fn-render');
  });

  it('should get the React Node Render.', () => {
    const render = clarifyRender('ReactNode', {});
    expect(render).toEqual('ReactNode');
  });
});
