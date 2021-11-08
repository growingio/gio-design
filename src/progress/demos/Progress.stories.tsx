import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './ProgressPage';
import { ProgressProps } from '../interface';
import Progress from '../index';
import '../style';

export default {
  title: 'Upgraded/Progress',
  component: Progress,
  decorators: [withDesign],
  argTypes: {
    animation: {
      defaultValue: false,
    },
    showInfo: {
      defaultValue: true,
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45838',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;
const arr: any = ['active', 'success', 'exception'];

const demoTemplate: Story<ProgressProps> = (args) => (
  <table className="table-demo">
    <tr>
      <th>Control</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>size</td>
      <td>
        <div>
          {arr.map((item: ProgressProps['status']) => (
            <Progress {...args} percent={Math.floor(Math.random() * 101)} status={item} />
          ))}
          {arr.map((item: ProgressProps['status']) => (
            <Progress {...args} percent={[30, 100][Math.round(Math.random())]} status={item} size="small" />
          ))}
        </div>
      </td>
    </tr>
    <tr>
      <td>animation</td>
      <td>
        {arr.map((item: ProgressProps['status']) => (
          <Progress {...args} percent={Math.floor(Math.random() * 101)} status={item} animation />
        ))}
      </td>
    </tr>
    <tr>
      <td>showInfo</td>
      <td>
        {arr.map((item: ProgressProps['status']) => (
          <Progress {...args} percent={Math.floor(Math.random() * 101)} status={item} showInfo={false} />
        ))}
      </td>
    </tr>
    <tr>
      <td>format</td>
      <td>
        {arr.map((item: ProgressProps['status']) => (
          <Progress
            {...args}
            percent={Math.floor(Math.random() * 101)}
            status={item}
            format={(e: number) => `${e}🌟`}
          />
        ))}
      </td>
    </tr>
  </table>
);

export const Demo = demoTemplate.bind({});
Demo.args = {
  style: { width: '500px', margin: 10 },
};

const Template: Story<ProgressProps> = (args) => (
  <div>
    {arr.map((item: ProgressProps['status']) => (
      <Progress {...args} status={item} />
    ))}
    {arr.map((item: ProgressProps['status']) => (
      <Progress {...args} status={item} size="small" />
    ))}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  percent: 60,
  status: 'active',
};
export const format = Template.bind({});
format.args = {
  percent: 60,
  status: 'active',
  format: (e: number) => `${e}🌟`,
};
