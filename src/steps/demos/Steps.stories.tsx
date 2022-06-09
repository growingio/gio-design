/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { IdOutlined, SuccessOutlined, UserOutlined, YuanOutlined } from '@gio-design/icons';
import Docs from './StepsPage';
import Steps, { StepsProps } from '../index';
import '../style';
import Button from '../../button';
import { Card, Toast } from '../..';
import './demo.less';

export default {
  title: 'Upgraded/Steps',
  component: Steps,
  subcomponents: { 'Steps.Step': Steps.Step },
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41170',
      allowFullscreen: true,
    },
  },
} as Meta;

// default
const Template: Story<StepsProps> = (args) => (
  <Steps {...args}>
    <Steps.Step title="Step 1" />
    <Steps.Step title="Step 2" />
    <Steps.Step title="Step 3" />
  </Steps>
);
export const Default: Story<StepsProps> = Template.bind({});
Default.args = {
  defaultCurrent: 2,
};
// onChange
export const OnChange: Story<StepsProps> = () => {
  const [current, setCurrent] = React.useState(1);
  return (
    <Steps
      onChange={(stepIndex) => {
        action('onchange')(stepIndex);
        setCurrent(stepIndex);
      }}
      current={current}
    >
      <Steps.Step title="Step 1" />
      <Steps.Step title="Step 2" />
      <Steps.Step title="Step 3" />
    </Steps>
  );
};

// size
export const SmallSize: Story<StepsProps> = () => (
  <>
    <Steps size="small" current={2}>
      <Steps.Step title="Step 1" />
      <Steps.Step title="Step 2" />
      <Steps.Step title="Step 3" />
    </Steps>
    <div className="steps-content">Step 2 content</div>
  </>
);

export const IconStep = () => (
  <Steps current={3}>
    <Steps.Step status="finish" title="Login" prefix={<UserOutlined />} />
    <Steps.Step status="finish" title="Verification" prefix={<IdOutlined />} />
    <Steps.Step status="process" title="Pay" prefix={<YuanOutlined />} />
    <Steps.Step status="pending" title="Done" prefix={<SuccessOutlined />} />
  </Steps>
);

export const ControlledCurrent: Story<StepsProps> = () => {
  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];
  const [current, setCurrent] = useState(1);
  const [complete, setCompleted] = useState(false);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const done = () => {
    setCurrent(steps.length);
    Toast.success('Processing complete!');
    setCompleted(true);
  };
  return (
    <div>
      <Steps current={current} onChange={setCurrent}>
        {steps.map((item) => (
          <Steps.Step
            key={item.title}
            title={item.title}
            status={current >= steps.length && complete ? 'finish' : undefined}
          />
        ))}
      </Steps>
      <div className="steps-content">{steps[current - 1]?.content}</div>

      <div className="steps-action">
        {current < steps.length && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length && (
          <Button type="primary" onClick={() => done()}>
            Done
          </Button>
        )}
        {current > 1 && (
          <Button type="secondary" style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export const Scrollable: Story<StepsProps> = () => {
  const [current, setCurrent] = useState(3);
  return (
    <Card style={{ width: '400px' }}>
      <Steps current={current} onChange={setCurrent}>
        {new Array(10).fill(0).map((_, index) => (
          <Steps.Step title={`Step ${index + 1}`} key={index} />
        ))}
      </Steps>
      <div className="steps-content">{`Step ${current} content`}</div>
      <div className="steps-action">
        {current < 10 && (
          <Button type="primary" onClick={() => setCurrent(current + 1)}>
            Next
          </Button>
        )}
        {current > 1 && (
          <Button type="secondary" style={{ margin: '0 8px' }} onClick={() => setCurrent(current - 1)}>
            Previous
          </Button>
        )}
      </div>
    </Card>
  );
};
