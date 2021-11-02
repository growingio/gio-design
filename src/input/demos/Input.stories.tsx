import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { InputProps } from '../interface';
import Input from '../Input';
import '../style';
import InputNumber from '../InputNumber';
import Password from '../Password';
import TextArea from '../TextArea';
import Docs from './InputPage';

export default {
  title: 'Upgraded/Input',
  component: Input,
  argTypes: {
    prefix: {
      control: { type: 'text' }, // 不约束react_node会传入对象导致报错
    },
    suffix: {
      control: { type: 'text' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4066%3A42547',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const colspan: any = { colspan: 2 };

const Template: Story<InputProps> = (args) => (
  <>
    <h3>Type & State</h3>
    <table>
      <tr>
        <th>Input Type</th>
        <th>Normal</th>
        <th>Hover/Active</th>
        <th>Error</th>
        <th>Disabled</th>
      </tr>
      <tr>
        <td>Text</td>
        <td>
          <Input {...args} />
        </td>
        <td>
          <Input {...args} />
        </td>
        <td>
          <Input {...args} />
        </td>
        <td>
          <Input {...args} value="数据可视化" disabled />
        </td>
      </tr>
      <tr>
        <td>Number</td>
        <td>
          <InputNumber {...args} defaultValue={12} value={15} />
        </td>
        <td>
          <InputNumber {...args} />
        </td>
        <td>
          <InputNumber {...args} />
        </td>
        <td>
          <InputNumber {...args} value={365} disabled />
        </td>
      </tr>
      <tr>
        <td>Password</td>
        <td>
          <Password {...args} />
        </td>
        <td>
          <Password {...args} size="small" />
        </td>
        <td>
          <Password {...args} />
        </td>
        <td>
          <Password {...args} value="密码无法输入" disabled />
        </td>
      </tr>
      <tr>
        <td>TextArea</td>
        <td>
          <TextArea {...(args as any)} />
        </td>
        <td>
          <TextArea {...(args as any)} />
        </td>
        <td>
          <TextArea {...(args as any)} />
        </td>
        <td>
          <TextArea {...(args as any)} disabled />
        </td>
      </tr>
    </table>

    <h3>Control</h3>
    <table>
      <tr>
        <th>Control</th>
        <th>Description</th>
        <th {...colspan}>Example</th>
      </tr>
      <tr>
        <td>Size</td>
        <td>拥有两种尺寸：大号为高度36px，小号为高度30px</td>
        <td>
          <Input {...args} />
        </td>
        <td>
          <Input {...args} size="small" />
        </td>
      </tr>
      <tr>
        <td>Disabled</td>
        <td>disabled状态的样式，可配置是否hover有tooltip</td>
        <td>
          <Input {...args} value="数据可视化" disabled />
        </td>
        <td>
          <Input {...args} value="数据可视化" disabled size="small" />
        </td>
      </tr>
    </table>
  </>
);

export const Demo = Template.bind({});
Demo.args = {
  style: { width: '200px' },
  onChange: () => action('action'),
};

const TextTemplate = (args: InputProps) => <Input {...args} />;

export const Text = TextTemplate.bind({});
Text.args = {
  style: { width: '200px' },
  onChange: () => action('action'),
};

const InputNumberTemplate = (args: InputProps) => <InputNumber {...args} value="请输入..." />;

export const InputNumberDemo = InputNumberTemplate.bind({});
InputNumberDemo.args = {
  style: { width: '200px' },
  onChange: () => action('action'),
};
const PasswordTemplate = (args: InputProps) => <Password {...args} value="password" />;

export const PasswordDemo = PasswordTemplate.bind({});
PasswordDemo.args = {
  style: { width: '200px' },
  onChange: () => action('action'),
};

const TextareaTemplate = (args: InputProps) => <TextArea {...(args as any)} />;

export const TextareaDemo = TextareaTemplate.bind({});
TextareaDemo.args = {
  col: { width: '200px' },
  value: 'you can write here',
  onChange: () => action('action'),
};
