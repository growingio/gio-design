import React from 'react';
import { VirtualList } from '../list';
import { OptionProps } from '../list/interface';
import { TreeItemProps, TreeListProps } from './interface';
import TreeNode from './TreeItem';
// import { flattenData } from './util';

const TreeList: React.FC<TreeListProps> = (props) => {
  const { virtual, fullHeight, height, itemHeight, options = [] } = props;
  // 扁平化数组,动态更改flattenOptions
  // const flattenOptions = flattenData(options,expandKeys);
  return (
    <ul className="gio-tree-list">
      <VirtualList
        prefixCls="gio"
        data={options as OptionProps[]}
        fullHeight={fullHeight}
        virtual={virtual}
        height={height}
        itemHeight={itemHeight}
        itemKey="value"
      >
        {(item) => <TreeNode {...(item as TreeItemProps)} />}
      </VirtualList>
    </ul>
  );
};

export default TreeList;
