import React, { useState } from 'react';
import Tree from '@gio-design/components/es/components/tree';
import '@gio-design/components/es/components/tree/style/css.js';
import { Setting } from '@gio-design/icons';
import './index.less';

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

const Demo: React.FC<{}> = () => {
  const [keys, setKeys] = useState<string[]>([]);

  const onSelect = (selectedKeys: string[], info: any) => {
    if (selectedKeys.length === 0) {
      return;
    }
    setKeys(selectedKeys);
  };

  const titleContent = (title: any) => (
    <>
      {title}
      <Setting className="title-icon" />
    </>
  );

  return (
    <div style={{ display: 'flex' }}>
      <div className="tree-demo">
        <Tree
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-1']}
          onSelect={(selectedKeys: any[], info: any) => onSelect(selectedKeys, info)}
          selectedKeys={keys}
          treeData={treeData}
        />
      </div>
      <div className="tree-demo">
        <Tree defaultExpandedKeys={['0-0-0']}>
          <Tree.TreeNode title={titleContent('全部成员')} key="0-0">
            <Tree.TreeNode title={titleContent('市场团队')} key="0-0-0">
              <Tree.TreeNode title={titleContent('内容运营')} key="0-0-0-0" />
              <Tree.TreeNode title={titleContent('线下活动')} key="0-0-0-1" />
              <Tree.TreeNode title={titleContent('产品市场')} key="0-0-0-2" />
            </Tree.TreeNode>
            <Tree.TreeNode title={titleContent('技术支持团队')} key="0-0-1">
              <Tree.TreeNode title={titleContent('售前支持')} key="0-0-1-0" />
            </Tree.TreeNode>
            <Tree.TreeNode title={titleContent('售后支持')} key="0-0-2">
              <Tree.TreeNode title={titleContent('华北区')} key="0-0-2-0" />
              <Tree.TreeNode title={titleContent('华南区')} key="0-0-2-1" />
            </Tree.TreeNode>
          </Tree.TreeNode>
        </Tree>
      </div>
    </div>
  );
};

export default Demo;
