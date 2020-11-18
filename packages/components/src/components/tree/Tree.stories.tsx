import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Tree, { TreeProps } from './Tree';
import { Setting } from '@gio-design/icons';
import './style';

export default {
  title: 'Components/Functional/Tree',
  component: Tree,
} as Meta;

const treeData = [
  {
    title: '产品团队',
    key: '0-0',
    children: [
      {
        title: '产品经理团队',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: '产品一组',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: '产品二组',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: '设计师团队',
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: 'red' }}>UX</span>,
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
  {
    title: '市场团队',
    key: '0-1',
    children: [],
  },
];

export const Default: Story<TreeProps> = (args) => {
  const [keys, setKeys] = useState<string[]>([]);

  const onSelect = (selectedKeys: string[], info: any) => {
    if (selectedKeys.length === 0) {
      return;
    }
    setKeys(selectedKeys);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="tree-demo">
        <Tree
          onSelect={(selectedKeys: any[], info: any) => onSelect(selectedKeys, info)}
          selectedKeys={keys}
          {...args}
        />
      </div>
    </div>
  );
};

Default.args = {
  treeData: treeData,
  defaultExpandedKeys: ['0-0-0', '0-0-1'],
  defaultSelectedKeys: ['0-0-1'],
};
