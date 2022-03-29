import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TreeSelect, { TreeNode } from '../index';
import { TreeSelectProps } from '../interface';
import Docs from './TreeSelectPage';
import '../style';

export default {
  title: 'upgraded/TreeSelect',
  component: TreeSelect,
  subcomponents: { TreeNode },
  argTypes: {
    multiple: {
      description: '是否多选',
      control: {
        type: 'boolean',
      },
    },
    value: {
      description: '选中值',
      type: 'string',
      control: {
        type: 'string',
      },
    },
    disabled: {
      description: '禁用',
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
    loadData: {
      description: '数据加载回调方法',
      type: { name: 'function' },
      // control: {
      //   type: null,
      // },
    }
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const treeSelectData = [
  {
    title: '市场团队',
    value: '市场团队',
    children: [
      {
        title: '用户运营团队',
        value: '用户运营团队',
      },
      {
        title: '内容运营团队',
        value: '内容运营团队',
      },
      {
        title: '活动运营团队',
        value: '活动运营团队',
        disabled: true,
      },
    ],
  },
  {
    title: 'SDR团队',
    value: 'SDR团队',
  },
];

const Template: Story<TreeSelectProps<any>> = (args) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return <TreeSelect value={value} allowClear onChange={(v: string) => setValue(v)} {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  treeData: treeSelectData,
  showSearch: true,
  style: { width: '400px' },
  dropdownStyle: { maxHeight: 400, overflow: 'auto' },
  placeholder: '请选择...',
  treeDefaultExpandAll: true,
  allowClear: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  treeData: treeSelectData,
  showSearch: true,
  style: { width: '400px' },
  dropdownStyle: { maxHeight: 400, overflow: 'auto' },
  placeholder: '请选择...',
  treeDefaultExpandAll: true,
  allowClear: true,
  multiple: false,
  treeCheckable: true,
};
