import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Steps, { StepsProps, Step } from '.';
import Docs from './Steps.mdx';
import './style';
import './style/steps.stories.less';
import { Button, Toast } from '../..';

export default {
  title: 'Functional Components/Steps',
  component: Steps,
  subcomponents: { Step },
  decorators: [withDesign],
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1289%3A4680',
      allowFullscreen: true,
    },
  },
} as Meta;



const steps = Array.from({ length: 4 }, (_, i) => ({
  key: i,
  title: `Title ${i}`,
  description: `Description ${i}`,
}));


interface ActionProps {
  previous: () => void
  next: () => void
  done: () => void
  current: number
}

const Action: React.FC<ActionProps> = (props) => {
  const { previous, next, done, current } = props
  return (
    <div className="steps-demo-action">
      {current > 0 && (
        <Button type="secondary" className="previous-btn" onClick={previous}>
          上一步
        </Button>
      )}
      {current < steps.length - 1 && (
        <Button type="primary" className="next-btn" onClick={next}>
          下一步
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button className="done-btn" type="primary" onClick={done}>
          完成
        </Button>
      )}
    </div>
  )
}

const Content: React.FC<Pick<ActionProps, 'current'>> = (props) => {
  const { current } = props
  return (
    <div className="steps-demo-content">{`Content ${current + 1}`}</div>
  )
}

const DefaultStepsTemplate: Story<StepsProps> = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const previous = () => {
    setCurrent(current - 1);
  };
  const done = () => {
    Toast.success('操作成功！');
  };
  return (
    <div>
      <Steps current={current}>
        {steps.map((step) => (
          <Step key={step.key} title={step.title} description={step.description} />
        ))}
      </Steps>
      <Content current={current} />
      <Action previous={previous} next={next} done={done} current={current} />
    </div>
  );
};
export const DefaultSteps = DefaultStepsTemplate.bind({});

/**
 * 可点击的 Steps
 */
const ClickableStepsTemplate: Story<StepsProps> = (args) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div>
      <Steps
        {...args}
        current={current}
        onClick={(stepNumber) => {
          setCurrent(stepNumber);
        }}
      >
        {steps.map((step) => (
          <Step key={step.key} title={step.title} description={step.description} />
        ))}
      </Steps>
      <Content current={current} />
    </div>
  );
};
export const ClickableSteps = ClickableStepsTemplate.bind({});

/**
 * 没有 description 的 Steps
 */
const NotDescStepsTemplate: Story<StepsProps> = (args) => {
  const [current, setCurrent] = React.useState(0);

  return (
    <div>
      <Steps
        {...args}
        current={current}
        onClick={(stepNumber) => {
          setCurrent(stepNumber);
        }}
      >
        {steps.map((step) => (
          <Step key={step.key} title={step.title} />
        ))}
      </Steps>
      <Content current={current} />
    </div>
  );
};
export const NotDescSteps = NotDescStepsTemplate.bind({});

/**
 * 自定义 Steps 状态
 */
const CustomStateStepsTemplate: Story<StepsProps> = () => {
  const [current, setCurrent] = React.useState(0);
  const [finished, setFinished] = React.useState<boolean[]>(Array.from({ length: steps.length }, () => false));

  const setFinishedFunc = (value: boolean[]) => {
    const newFinished = [...value];
    newFinished[current] = true;
    return newFinished;
  }

  const next = () => {
    setFinished(setFinishedFunc);
    setCurrent(current + 1);
  };
  const previous = () => {
    setFinished(setFinishedFunc);
    setCurrent(current - 1);
  };
  const done = () => {
    Toast.success('操作成功！');
  };
  return (
    <div>
      <Steps current={current}>
        {steps.map((step, index) => (
          <Step key={step.key} title={step.title} finished={finished[index]} />
        ))}
      </Steps>
      <Content current={current} />
      <Action previous={previous} next={next} done={done} current={current} />
    </div>
  );
};
export const CustomStateSteps = CustomStateStepsTemplate.bind({});
