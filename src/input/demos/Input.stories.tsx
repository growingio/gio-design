import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { PlusOutlined, FilterOutlined } from '@gio-design/icons';
import { InputProps, InputButtonProps } from '../interface';
import Input from '../Input';
import '../style';
import InputNumber from '../InputNumber';
import Password from '../Password';
import TextArea from '../TextArea';
import Docs from './InputPage';
import InputButton from '../InputButton';

export default {
  title: 'Upgraded/Input',
  component: Input,
  subcomponents: { InputButton },
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
    <table className="table-demo">
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
    <table className="table-demo">
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

const InputButtonTemplate: Story<InputButtonProps> = (args) => (
  <>
    <p>In Button 继承 Secondary Button 的样式（但有背景色），通常作为选择器的触发以及选中内容的回显，支持回显Icon</p>
    <br />
    <h3>Type</h3>
    <table className="table-demo">
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
    <table className="table-demo">
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

export const InputButtonDemo = InputButtonTemplate.bind({});
InputButtonDemo.args = {
  onChange: () => action('onChange'),
  placeholder: '请选择事件',
};

const InputButtonDefaultTemplate = () => <InputButton />;
export const InputButtonDefault = InputButtonDefaultTemplate.bind({});
InputButtonDefault.args = {
  allowClear: false,
  onChange: () => action('onChange'),
};

const HidePrefixTemplate = (args: InputButtonProps) => <InputButton {...args} value="请选择事件" />;
export const InputButtonHidePrefix = HidePrefixTemplate.bind({});
InputButtonHidePrefix.args = {
  hidePrefix: true,
  onChange: () => action('onChange'),
  placeholder: '请选择事件',
};
const customPrefixTemplate = (args: InputButtonProps) => (
  <InputButton {...args} value="请选择事件" prefix={<PlusOutlined />} suffix={<FilterOutlined />} />
);
export const InputButtonCustomIcon = customPrefixTemplate.bind({});
InputButtonCustomIcon.args = {
  onChange: () => action('onChange'),
  placeholder: '请选择事件',
};

const InputButtonMaxWidthTemplate = (args: InputButtonProps) => (
  <InputButton {...args} value="可以限制value的字符数做缩略处理" maxWidth={200} />
);

export const InputButtonMaxWidth = InputButtonMaxWidthTemplate.bind({});
InputButtonMaxWidth.args = {};
