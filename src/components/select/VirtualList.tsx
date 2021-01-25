import React, { Ref } from 'react';
import List, { ListRef } from 'rc-virtual-list';
import { VirtualListProps } from './interface';

const VirtualList = React.forwardRef<ListRef, VirtualListProps>((props: VirtualListProps, ref: Ref<ListRef>) => {
  const { itemHeight, height, prefixCls, children, data, virtual, itemKey } = props;
  return (
    <List
      itemKey={itemKey}
      ref={ref}
      itemHeight={itemHeight}
      height={height}
      data={data}
      virtual={virtual}
      prefixCls={`${prefixCls}-virtual-list`}
      fullHeight={false}
    >
      {children}
    </List>
  );
});

export default VirtualList;
