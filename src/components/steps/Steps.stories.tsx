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
      <div className="steps-demo-content">{`Content ${current + 1}`}</div>
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
      <div className="steps-demo-content">{`Content ${current + 1}`}</div>
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
      <div className="steps-demo-content">{`Content ${current + 1}`}</div>
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

  const next = () => {
    setFinished((oldFinished) => {
      const newFinished = [...oldFinished];
      newFinished[current] = true;
      return newFinished;
    });
    setCurrent(current + 1);
  };
  const previous = () => {
    setFinished((oldFinished) => {
      const newFinished = [...oldFinished];
      newFinished[current] = true;
      return newFinished;
    });
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
      <div className="steps-demo-content">{`Content ${current + 1}`}</div>
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
    </div>
  );
};
export const CustomStateSteps = CustomStateStepsTemplate.bind({});
