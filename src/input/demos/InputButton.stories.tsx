import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { PlusOutlined, FilterOutlined } from '@gio-design/icons';
import InputButton from '../InputButton';
import '../style';
import { InputButtonProps } from '../interface';
import Docs from './InputButtonPage';

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
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6385%3A69093',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
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
          <InputButton {...args} />
        </td>
        <td>
          <InputButton {...args} />
        </td>
        <td>
          <InputButton {...args} disabled />
        </td>
      </tr>
      <tr>
        <td>Filled</td>
        <td>当Select Button有选中值时，右侧的icon变为可以清除选中值的“X”</td>
        <td>
          <InputButton {...args} value="集成应用" />
        </td>
        <td>
          <InputButton {...args} value="集成应用" />
        </td>
        <td>
          <InputButton {...args} value="集成应用" disabled />
        </td>
      </tr>
    </table>

    <h3>Control</h3>
    <table>
      <tr>
        <th>Button Control</th>
        <th>描述</th>
        <th colSpan={2}>Secondary</th>
      </tr>
      <tr>
        <td>Size</td>
        <td>拥有两种尺寸：大号为高度36px，小号为高度30px</td>
        <td>
          <InputButton {...args} />
        </td>
        <td>
          <InputButton {...args} size="small" />
        </td>
      </tr>
      <tr>
        <td>With Icon</td>
        <td>文案右侧是否有icon</td>
        <td>
          <InputButton {...args} />
        </td>
        <td>
          <InputButton {...args} hidePrefix />
        </td>
      </tr>
      <tr>
        <td>Removable</td>
        <td>是否可以清除选中内容</td>
        <td>
          <InputButton {...args} value="浏览商品详情页" />
        </td>
        <td>
          <InputButton {...args} value="浏览商品详情页" allowClear={false} />
        </td>
      </tr>
    </table>
  </>
);

export const Demo = Template.bind({});
Demo.args = {
  onChange: () => action('onChange'),
  placeholder: '请选择事件',
};

const DefaultTemplate = (args: InputButtonProps) => <InputButton {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
  allowClear: false,
  onChange: () => action('onChange'),
  placeholder: '请选择事件',
};

const HidePrefixTemplate = (args: InputButtonProps) => <InputButton {...args} value="请选择事件" />;
export const HidePrefix = HidePrefixTemplate.bind({});
HidePrefixTemplate.args = {
  hidePrefix: true,
  onChange: () => action('onChange'),
  placeholder: '请选择事件',
};
const customPrefixTemplate = (args: InputButtonProps) => (
  <InputButton {...args} value="请选择事件" prefix={<PlusOutlined />} suffix={<FilterOutlined />} />
);
export const CustomIcon = customPrefixTemplate.bind({});
CustomIcon.args = {
  onChange: () => action('onChange'),
  placeholder: '请选择事件',
};
