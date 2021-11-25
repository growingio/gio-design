/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './StepsPage';
import Steps, { Step, StepProps } from '../index';
import '../style';
import Button from '../../button';

export default {
  title: 'Upgraded/Steps',
  component: Steps,
  subcomponents: { Step },
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
const templateArr = [
  { lable: '第一步' },
  { lable: '第二步' },
  { lable: '第三步' },
  { lable: '第四步' },
  { lable: '第五步' },
  { lable: '第六步' },
];
const renderItems = () =>
  templateArr.map((item, index) => <Step label={`Step ${index + 1}`} value={index} prefix={item} />);
const Template: Story<StepProps> = (args) => {
  const [current, setCurrent] = useState(3);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const complate = () => {
    setCurrent(templateArr.length + 1);
  };
  const reset = () => {
    setCurrent(1);
  };
  return (
    <div>
      <Steps {...args} current={current}>
        {renderItems()}
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
          <Button type="primary" onClick={() => complate()}>
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
const haveChildrenItems = () =>
  templateArr.map((item, index) => (
    <Step label={`Step${index + 1}`} value={index}>
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
    </Step>
  ));
const childrenTemplate: Story<StepProps> = (args) => (
  <div>
    <Steps {...args} current={4}>
      {haveChildrenItems()}
    </Steps>
  </div>
);
const DemoTemplate: Story<StepProps> = (args) => (
  <>
    <table
      style={{
        marginBottom: 5,
      }}
      className="table-demo"
    >
      <tbody>
        <tr>
          <th>Steps control</th>
          <th>描述</th>
          <th>Example</th>
        </tr>
        <tr>
          <td>size</td>
          <td>组件高度,normal,small</td>
          <td>
            <Steps style={{ marginBottom: 10 }} {...args} current={3}>
              {templateArr.map((item, index) => (
                <Step label={`Step${index + 1}`} value={index} />
              ))}
            </Steps>
            <Steps size="small" {...args} current={3}>
              {templateArr.map((item, index) => (
                <Step label={`Step${index + 1}`} value={index} />
              ))}
            </Steps>
          </td>
        </tr>
        <tr>
          <td>外层小于内容宽度时</td>
          <td>横向滚动不换行</td>
          <td style={{ width: 500 }}>
            <Steps {...args} current={4}>
              {[...Array(10)].map((item, index) => (
                <Step label={`Step${index + 1}`} value={index} />
              ))}
            </Steps>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>children</td>
          <td>有内容联动</td>
          <td>
            <Steps
              {...args}
              current={4}
              onChange={() => {
                action('onchange');
              }}
            >
              {templateArr.map((item, index) => (
                <Step label={`Step${index + 1}`} value={index}>
                  <div
                    style={{
                      backgroundColor: '#f7f8fc',
                      textAlign: 'center',
                      height: 150,
                      fontSize: 100,
                    }}
                  >
                    {`Step${index + 1}`}
                  </div>
                </Step>
              ))}
            </Steps>
          </td>
        </tr>
      </tbody>
    </table>
  </>
);
// Demo
export const Demo = DemoTemplate.bind({});
Demo.args = {
  defaultValue: 0,
  onChange: action('onchange'),
};
// default
export const Default = Template.bind({});
Default.args = {
  className: 'cc',
  defaultValue: 3,
  onChange: action('onchange'),
};
// have children
export const HaveChildren = childrenTemplate.bind({});
HaveChildren.args = {
  className: 'cc',
  defaultValue: 1,
  onChange: action('onchange'),
};
