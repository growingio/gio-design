import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined, ExplainOutlined } from '@gio-design/icons';
import Button from '../index';
import IconButton from '../IconButton';
import { ButtonProps, IconButtonProps } from '../interface';
import '../style';
import Docs from './ButtonPage';
import { Divider } from '../..';

export default {
  title: 'Upgraded/Button',
  component: Button,
  subcomponents: { IconButton: Button.IconButton },
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
      url: 'https://www.figma.com/file/J2wZWEocPEb1DbDEj99AgD/Design-System?node-id=373%3A15923',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;
const Context = [
  { type: 'primary', children: '主要按钮' },
  { type: 'secondary', children: '次要按钮' },
  { type: 'text', children: '文字按钮' },
];

const Template: Story<ButtonProps> = (args) => (
  <table className="table-demo">
    <tr>
      <th>Button Control</th>
      <th>描述</th>
      {Context.map((item) => (
        <th>{item.type}</th>
      ))}
    </tr>
    <tr>
      <td>Size</td>
      <td>拥有两种尺寸：大号为高度36px，小号为高度30px</td>
      {Context.map((item: any) => (
        <td>
          <Button {...args} data-testid="normal-button" size="normal" type={item.type} />
          <Button {...args} size="small" type={item.type} />
        </td>
      ))}
    </tr>
    <tr>
      <td>Prefix Only</td>
      <td>按钮是否只有前缀</td>
      {Context.map((item: any) => (
        <td>
          <Button {...args} prefix={<PlusOutlined />} type={item.type} />
        </td>
      ))}
    </tr>
    <tr>
      <td>Suffix Only</td>
      <td>按钮是否只有后缀</td>
      {Context.map((item: any) => (
        <td>
          <Button {...args} suffix={<FilterOutlined />} type={item.type} />
        </td>
      ))}
    </tr>

    <tr>
      <td>Loading</td>
      <td>加载样式</td>
      {Context.map((item: any) => (
        <td>
          <Button {...args} type={item.type} loading />
          <Button {...args} size="small" type={item.type} loading />
        </td>
      ))}
    </tr>
    <tr>
      <td>Icon Only</td>
      <td>按钮是否只有icon</td>
      {Context.map((item: any) => (
        <td>
          <IconButton {...args} type={item.type}>
            <FilterOutlined />
          </IconButton>
          <IconButton {...args} size="small" type={item.type}>
            <FilterOutlined />
          </IconButton>
        </td>
      ))}
    </tr>
    <tr>
      <td>Disabled</td>
      <td>disabled状态的样式</td>
      {Context.map((item: any) => (
        <td>
          <Button {...args} disabled type={item.type} />
        </td>
      ))}
    </tr>
    <tr>
      <td>Prefix+Suffix</td>
      <td>前缀和后缀都存在</td>
      {Context.map((item: any) => (
        <td>
          <Button {...args} suffix={<FilterOutlined />} prefix={<PlusOutlined />} type={item.type} />
        </td>
      ))}
    </tr>
  </table>
);

export const Demo = Template.bind({});
Demo.args = {
  children: 'Button',
  style: {
    margin: '4px 8px',
  },
};

const ButtonTemplate: Story<ButtonProps> = (args) => <Button {...args} />;
export const Default = ButtonTemplate.bind({});

Default.args = {
  children: 'Button',
  prefix: <PlusOutlined />,
};
export const Disable = ButtonTemplate.bind({});
Disable.args = {
  children: 'Disable',
  disabled: true,
};

const IconButtonTemplate: Story<IconButtonProps> = (args) => (
  <>
    <div>
      <p>图标的默认大小为 14px</p>
      <IconButton {...args}>
        <FilterOutlined />
      </IconButton>
    </div>
    <Divider style={{ width: '100%' }} />
    <div>
      <p>可以设置 IconButton 的 font-size: 20px; 来改变图标大小</p>
      <IconButton {...args} style={{ fontSize: '20px' }}>
        <ExplainOutlined />
      </IconButton>
    </div>
  </>
);
export const IconButtonDemo = IconButtonTemplate.bind({});
IconButtonDemo.args = {};

export const BlockButton = ButtonTemplate.bind({});
BlockButton.args = {
  children: 'Block',
  style: {
    width: '100%',
  },
};
