import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CheckOutlined, EventOutlined, CopyOutlined } from '@gio-design/icons';
import { Tree, TreeProps } from '../index';
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

const treeData = [
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
];

const Template: Story<TreeProps> = (args) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [expendKeys, setExpandKeys] = useState<string[]>([]);
  const onSelect = (selectKeys: string[]) => {
    if (selectKeys.length === 0) {
      return;
    }
    setKeys(selectKeys);
  };

  return (
    <>
      <h3>normal</h3>
      <div style={{ display: 'flex' }}>
        <div className="tree-demo" style={{ width: '300px' }}>
          <Tree {...args} />
        </div>
      </div>
      <h3>defaultExpandedAll</h3>
      <div className="tree-demo" style={{ width: '300px' }}>
        <Tree defaultExpandAll {...args} />
      </div>
      <h3>defaultExpandedKeys</h3>
      <div className="tree-demo" style={{ width: '300px' }}>
        <Tree defaultExpandedKeys={['0-0-1']} autoExpandParent {...args} />
      </div>
      <h3>defaultExpandedKeys and autoExpandParent = false</h3>
      <div className="tree-demo" style={{ width: '300px' }}>
        <Tree defaultExpandedKeys={['0-0-1']} autoExpandParent={false} {...args} />
      </div>

      <h3>expandedKeys</h3>
      <div className="tree-demo" style={{ width: '300px' }}>
        <Tree
          expandedKeys={expendKeys}
          defaultExpandAll
          onExpand={(v) => {
            console.log('v', v);
            setExpandKeys(v);
          }}
          {...args}
        />
      </div>
      <h3>defaultSelectedKeys</h3>
      <div className="tree-demo" style={{ width: '300px' }}>
        <Tree defaultSelectedKeys={['0-0']} {...args} />
      </div>
      <h3>defaultSelectedKeys and selectedKeys</h3>
      <div className="tree-demo" style={{ width: '300px' }}>
        <Tree
          selectedKeys={keys}
          onSelect={(selectKeys: any[]) => onSelect(selectKeys)}
          defaultSelectedKeys={['0-0']}
          {...args}
        />
      </div>
    </>
    //
  );
};
export const Default = Template.bind({});
Default.args = {
  options: treeData,
};
