import React, { useState } from 'react';
import TreeSelect, { TreeNode } from '@gio-design/components/es/components/tree-select';
import '@gio-design/components/es/components/tree-select/style/css.js';
import './index.less';

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

const Demo: React.FC = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [value2, setValue2] = useState<string | undefined>(undefined);

  return (
    <div style={{ display: 'flex' }}>
      <div className="tree-select-demo">
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          value={value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="请选择..."
          treeData={treeData}
          treeDefaultExpandAll
          onChange={(v: string) => setValue(v)}
        />
      </div>
      <div className="tree-select-demo">
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          value={value2}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="请选择..."
          allowClear
          treeDefaultExpandAll
          onChange={(v: string) => setValue2(v)}
        >
          <TreeNode value="全部成员" title="全部成员">
            <TreeNode value="产研团队" title="产研团队">
              <TreeNode value="产品经理团队" title="产品经理团队" />
              <TreeNode value="设计师团队" title="设计师团队" />
            </TreeNode>
            <TreeNode value="CSM&&RM 团队" title="CSM&&RM 团队" disabled>
              <TreeNode value="CSM团队" title={<b style={{ color: 'green' }}>CSM团队</b>} />
              <TreeNode value="RM团队" title={<b style={{ color: 'blue' }}>RM团队</b>} />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </div>
    </div>
  );
};

export default Demo;
