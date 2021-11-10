import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { AppOutlined, CheckOutlined, EventOutlined, CopyOutlined } from '@gio-design/icons';
import Tree, { TreeProps } from '../Tree';
import Docs from './TreePage';
import '../style';

export default {
  title: 'legacy/Tree',
  component: Tree,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1149%3A3854',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const treeData = [
  {
    title: '产品团队',
    key: '0-0',
    icon: <EventOutlined />,
    children: [
      {
        title: '产品经理团队',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: '产品一组',
            key: '0-0-0-0',
            icon: <CheckOutlined />,
            disableCheckbox: true,
          },
          {
            title: '产品二组',
            key: '0-0-0-1',
            icon: <CheckOutlined />,
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
            icon: <CheckOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: '市场团队',
    key: '0-1',
    icon: <CopyOutlined />,
    children: [],
  },
];

const Template: Story<TreeProps> = (args) => {
  const [keys, setKeys] = useState<string[]>([]);

  const onSelect = (selectedKeys: string[]) => {
    if (selectedKeys.length === 0) {
      return;
    }
    setKeys(selectedKeys);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="tree-demo" style={{ width: '300px' }}>
        <Tree onSelect={(selectedKeys: any[]) => onSelect(selectedKeys)} selectedKeys={keys} {...args} />
      </div>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  treeData,
  defaultExpandedKeys: ['0-0-0', '0-0-1'],
  defaultSelectedKeys: ['0-0-1'],
};

const IconTemplate: Story<TreeProps> = (args) => (
  <div style={{ display: 'flex' }}>
    <div className="tree-demo">
      <Tree icon={<AppOutlined />} {...args} />
    </div>
  </div>
);

export const IconTree = IconTemplate.bind({});
IconTree.args = {
  treeData,
  defaultExpandedKeys: ['0-0-0', '0-0-1'],
  defaultSelectedKeys: ['0-0-1'],
  showIcon: true,
  style: { width: '300px' },
};
