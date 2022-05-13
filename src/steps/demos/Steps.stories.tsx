/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './StepsPage';
import Steps, { StepsProps } from '../index';
import '../style';
import Button from '../../button';

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
const templateArr = new Array(6).fill(0);

// default
export const Default: Story<StepsProps> = (args) => (
  <Steps {...args}>
    {new Array(6).fill(0).map((item, index) => (
      <Steps.Step label={`Step ${index + 1}`} value={index} prefix={item} />
    ))}
  </Steps>
);

// onChange
export const OnChange: Story<StepsProps> = () => (
  <Steps
    onChange={(e) => {
      console.log(e, 'onChange');
      action('onchange');
    }}
    current={6}
  >
    {new Array(6).fill(0).map((item, index) => (
      <Steps.Step label={`Step ${index + 1}`} value={index} prefix={item} />
    ))}
  </Steps>
);

// size
export const Size: Story<StepsProps> = () => (
  <>
    <Steps size="normal" onChange={() => action('onchange')} current={6}>
      {new Array(6).fill(0).map((item, index) => (
        <Steps.Step label={`Step ${index + 1}`} value={index} prefix={item} />
      ))}
    </Steps>
    <Steps size="small" onChange={() => action('onchange')} current={6}>
      {new Array(6).fill(0).map((item, index) => (
        <Steps.Step label={`Step ${index + 1}`} value={index} prefix={item} />
      ))}
    </Steps>
  </>
);

// value
export const Value: Story<StepsProps> = () => {
  const [value, setValue] = useState(3);
  return (
    <div>
      <Steps value={value} current={4} onChange={(e) => setValue(e)}>
        {new Array(6).fill(0).map((item, index) => (
          <Steps.Step label={`Step ${index + 1}`} value={index} prefix={item} />
        ))}
      </Steps>
    </div>
  );
};

// have children
export const HaveChildren = () => (
  <div>
    <Steps className="steps" defaultValue={1} onChange={action('onchange')} current={4}>
      {new Array(6).fill(0).map((item, index) => (
        <Steps.Step label={`Step${index + 1}`} value={index} key={index}>
          <div
            style={{
              backgroundColor: '#f7f8fc',
              textAlign: 'center',
              height: 150,
              fontSize: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {`Step${index + 1}`}
          </div>
        </Steps.Step>
      ))}
    </Steps>
  </div>
);
// have step button
export const HaveStepButton: Story<StepsProps> = () => {
  const [current, setCurrent] = useState(3);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const complete = () => {
    setCurrent(templateArr.length + 1);
  };
  const reset = () => {
    setCurrent(1);
  };
  return (
    <div>
      <Steps current={current}>
        {new Array(6).fill(0).map((item, index) => (
          <Steps.Step label={`Step ${index + 1}`} value={index} prefix={item} />
        ))}
      </Steps>
      <div className="steps-action" style={{ padding: '30px 0 0 0' }}>
        {current > 1 && current < templateArr.length && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current < templateArr.length && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === templateArr.length && (
          <Button type="primary" onClick={() => complete()}>
            完成
          </Button>
        )}
        {current > templateArr.length && (
          <Button type="primary" onClick={() => reset()}>
            重置
          </Button>
        )}
      </div>
    </div>
  );
};
