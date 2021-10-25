import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import InputButton from '../InputButton';
import '../style';
import { InputButtonProps } from '../interface';

export default {
  title: 'Upgraded/InputButton',
  component: InputButton,
  argTypes: {
    prefix: {
      control: { type: 'text' }, // 不约束react_node会传入对象导致报错
    },
    suffix: {
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: Story<InputButtonProps> = (args) => (
  <>
    <p>In Button 继承 Secondary Button 的样式（但有背景色），通常作为选择器的触发以及选中内容的回显，支持回显Icon</p>
    <br />
    <h3>Type</h3>
    <table>
      <tr>
        <th>State</th>
        <th>Description</th>
        <th>Default</th>
        <th>Hover/Active</th>
        <th>Disabled</th>
      </tr>
      <tr>
        <td>Default</td>
        <td>Select Button的各状态与 Secondary Button 一致</td>
        <td>
          <InputButton {...args} value="集成应用" />
        </td>
        <td>
          <InputButton {...args} disabled />
        </td>
        <td>
          <InputButton {...args} value="数据可视化" disabled />
        </td>
      </tr>
      <tr>
        <td>Filled</td>
        <td>当Select Button有选中值时，右侧的icon变为可以清除选中值的“X”</td>
        <td>
          <InputButton {...args} value="集成应用" />
        </td>
        <td>
          <InputButton {...args} disabled />
        </td>
        <td>
          <InputButton {...args} value="数据可视化" disabled />
        </td>
      </tr>
    </table>

    <h3>Control</h3>
    <table>
      <tr>
        <th>Button Control</th>
        <th>描述</th>
        <th>Secondary</th>
      </tr>
      <tr>
        <td>Size</td>
        <td>拥有两种尺寸：大号为高度36px，小号为高度30px</td>
        <td>
          <InputButton {...args} size="small" />
        </td>
      </tr>
      <tr>
        <td>With Icon</td>
        <td>文案右侧是否有icon</td>
        <td>
          <InputButton {...args} size="small" />
        </td>
      </tr>
      <tr>
        <td>Removable</td>
        <td>是否可以清除选中内容</td>
        <td>
          <InputButton {...args} size="small" />
        </td>
      </tr>
    </table>
  </>
);

export const InputUsage = Template.bind({});
InputUsage.args = {
  style: { width: '200px' },
};
