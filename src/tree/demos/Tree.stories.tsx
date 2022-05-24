import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CheckOutlined, CopyOutlined, EventOutlined } from '@gio-design/icons';
import { Tree, TreeProps, TreeNode } from '../index';
import Docs from './TreePage';

export default {
  title: 'Upgraded/Tree',
  component: Tree,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Default: Story<TreeProps> = (args) => (
  <Tree {...args}>
    <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
      <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
        <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
        <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
      </TreeNode>
      <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
    </TreeNode>
  </Tree>
);

export const DefaultExpandedKeys = () => (
  <Tree defaultExpandedKeys={['0-0-1']} autoExpandParent>
    <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
      <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
        <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
        <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
      </TreeNode>
      <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
    </TreeNode>
  </Tree>
);

export const DefaultExpandedAll = () => (
  <Tree defaultExpandAll>
    <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
      <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
        <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
        <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
      </TreeNode>
      <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
    </TreeNode>
  </Tree>
);

export const Disabled = () => (
  <Tree>
    <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
      <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
        <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
        <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
      </TreeNode>
      <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
    </TreeNode>
  </Tree>
);

export const ExpandedKeys = () => {
  const [expendKeys, setExpandKeys] = useState<string[]>([]);
  return (
    <Tree
      expandedKeys={expendKeys}
      defaultExpandAll
      onExpand={(v) => {
        console.log('onExpand', v);
        setExpandKeys(v);
      }}
    >
      <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
        <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
          <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
          <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
        </TreeNode>
        <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
      </TreeNode>
    </Tree>
  );
};

export const DefaultSelectedKeys = () => (
  <Tree defaultSelectedKeys={['0-0']}>
    <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
      <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
        <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
        <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
      </TreeNode>
      <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
    </TreeNode>
  </Tree>
);

export const SelectedKeys = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const onSelect = (selectKeys: string[]) => {
    console.log(selectKeys, 'selectKeys');
    if (selectKeys.length === 0) {
      return;
    }
    setKeys(selectKeys);
  };

  return (
    <Tree selectedKeys={keys} onSelect={(selectKeys: any[]) => onSelect(selectKeys)} defaultSelectedKeys={['0-0']}>
      <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
        <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
          <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
          <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
        </TreeNode>
        <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
      </TreeNode>
    </Tree>
  );
};

export const OnClick = () => (
  <Tree
    defaultSelectedKeys={['0-0']}
    onSelect={(e) => {
      console.log(e, 'onSelect');
    }}
    onClick={(e) => {
      console.log(e, 'onClick');
    }}
  >
    <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
      <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
        <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
        <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
      </TreeNode>
      <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
    </TreeNode>
  </Tree>
);

export const Multiple = () => (
  <Tree
    onSelect={(e) => {
      console.log(e, 'onSelect');
    }}
    onClick={(e) => {
      console.log(e, 'onClick');
    }}
    multiple
  >
    <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
      <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
        <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
        <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
      </TreeNode>
      <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
    </TreeNode>
  </Tree>
);

export const Options = () => (
  <Tree
    options={[
      {
        label: '产品团队',
        value: '0-0',
        prefix: <EventOutlined />,
        childs: [
          {
            label: '产品经理团队',
            value: '0-0-0',
            disabled: true,
            childs: [
              {
                label: '产品一组',
                value: '0-0-0-0',
                prefix: <CheckOutlined />,
                disabled: true,
              },
              {
                label: '产品二组',
                value: '0-0-0-1',
                prefix: <CheckOutlined />,
              },
            ],
          },
          {
            label: '设计师团队',
            value: '0-0-1',
            childs: [
              {
                label: 'UX',
                value: '0-0-1-0',
                prefix: <CheckOutlined />,
              },
            ],
          },
        ],
      },
      {
        label: '市场团队',
        value: '0-1',
        prefix: <CopyOutlined />,
      },
    ]}
  />
);

export const FilterTreeNode = () => (
  <Tree filterTreeNode={(e) => e.value === '0-0'}>
    <TreeNode value="0-0" label="产品团队" prefix={<EventOutlined />}>
      <TreeNode value="0-0-0" label="产品经理团队" prefix={<EventOutlined />} disabled>
        <TreeNode value="0-0-0-0" label="产品一组" prefix={<CheckOutlined />} disabled />
        <TreeNode value="0-0-0-1" label="产品二组" prefix={<CheckOutlined />} />
      </TreeNode>
      <TreeNode value="0-0-1" label="设计师团队" prefix={<EventOutlined />} />
    </TreeNode>
  </Tree>
);
