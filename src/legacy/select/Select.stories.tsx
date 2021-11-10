import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FilterOutlined } from '@gio-design/icons';
import Select, { SelectProps } from './index';
import Docs from './Select.mdx';
import './style';
import Button from '../../legacy/button';

export default {
  title: 'legacy/Select',
  component: Select,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A7495',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
  subcomponents: {
    Group: Select.Group,
    Option: Select.Option,
  },
} as Meta;

const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];
const templatestOptions = values.map((value, index) => ({
  value,
  label: labels[index],
  groupValue: 'platform',
  groupLabel: '应用平台',
}));
const templatestEllipsisOptions = values.map((value, index) => ({
  value,
  label: labels[index].repeat(6),
  groupValue: 'platform',
  groupLabel: '应用平台',
}));
const Template: Story<SelectProps> = (args) => (
  <div>
    <Select
      {...args}
      triggerComponent={<Button type="text" size="small" icon={<FilterOutlined />} />}
      options={templatestEllipsisOptions}
    />
    <br />
    <br />
    <Select {...args} style={{ width: '300px' }} />
    <br />
    <br />
    <Select {...args} options={templatestEllipsisOptions} style={{ width: '300px' }} />
  </div>
);
export const Default = Template.bind({});
const DefaultArgs: SelectProps = {
  size: 'middle',
  placeholder: '请选择...',
  allowClear: true,
  options: templatestOptions,
  onDropDownVisibleChange: undefined,
};
Default.args = DefaultArgs;

const fruitValue = ['apple', 'orange', 'greengage', 'Hami melon', 'cherry', 'chestnut', 'Chinese gooseberry'];
const fruitLabel = ['苹果', '香蕉', '青梅', '哈密瓜', '樱桃', '栗子', '猕猴桃'];
const fruitOptions = new Array(20).fill(0).reduce(
  (prev, value, index) => [
    ...prev,
    {
      value: `${fruitValue[index % 7]}${index}`,
      label: `${fruitLabel[index % 7]}${index}`,
      title: `${fruitLabel[index % 7]}${index}`,
      groupValue: `'platform'${index % 7}`,
      groupLabel: `水果${index % 7}`,
    },
  ],
  []
);

const multipleTemplate: Story<SelectProps> = (args) => <Select {...args} style={{ width: '300px' }} />;
export const Multiple = multipleTemplate.bind({});
const multipleArgs: SelectProps = {
  multiple: true,
  options: fruitOptions,
  allowClear: true,
  placeholder: '请选择...',
  onDropDownVisibleChange: undefined,
  useFooter: true,
  onChange: (value, options) => {
    console.log(value, options);
  },
};
Multiple.args = multipleArgs;

const NoBorderTemplate: Story<SelectProps> = (args) => <Select {...args} />;
export const NoBorder = NoBorderTemplate.bind({});
NoBorder.args = {
  size: 'middle',
  placeholder: '请选择...',
  options: templatestOptions,
  bordered: false,
  onDropDownVisibleChange: undefined,
};
