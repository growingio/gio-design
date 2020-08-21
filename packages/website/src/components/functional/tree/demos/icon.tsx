import React from 'react';
import Tree from '@gio-design/components/es/components/tree';
import '@gio-design/components/es/components/tree/style/css.js';
import { AppOutlined, Setting, Check } from '@gio-design/icons';
import './index.less';

const treeData = [
  {
    title: '产研团队',
    key: '0-0',
    icon: <Setting />,
    children: [
      {
        title: '服务端',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'Java开发',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'Ruby开发',
            key: '0-0-0-1',
            icon: <Check />,
          },
        ],
      },
      {
        title: '前端',
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: 'red' }}>前端一组</span>,
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
  {
    title: 'CSM 团队',
    key: '0-1',
    children: [],
  },
];

const Demo: React.FC<{}> = () => {
  const onSelect = (selectedKeys: any[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="tree-demo">
        <Tree
          defaultExpandedKeys={['0-0-0', '0-0-1']}
          defaultSelectedKeys={['0-0-1']}
          onSelect={onSelect}
          treeData={treeData}
          showIcon
          icon={<AppOutlined />}
        />
      </div>
    </div>
  );
};

export default Demo;
