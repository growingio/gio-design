import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TreeSelect, { TreeNode } from './index';
import { TreeSelectProps } from './interface';
import './style';
import './style/demo.less';

export default {
  title: 'Components/Functional/TreeSelect',
  component: TreeSelect,
  subcomponents: { TreeNode },
} as Meta;

const treeData = [
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

export const Default = (args: TreeSelectProps<any>) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <div className="tree-select-demo">
      <TreeSelect value={value} onChange={(v: string) => setValue(v)} {...args} />
    </div>
  );
};

Default.args = {
  treeData: treeData,
  showSearch: true,
  style: { width: '100%' },
  dropdownStyle: { maxHeight: 400, overflow: 'auto' },
  placeholder: '请选择...',
  treeDefaultExpandAll: true,
};
