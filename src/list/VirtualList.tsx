import React from 'react';
import List, { ListRef } from 'rc-virtual-list';
import { VirtualListProps } from './interface';

const defaultListRowHeight = 40;
const defaultListHeight = 520;

const VirtualList: React.ForwardRefRenderFunction<ListRef, VirtualListProps> = (props, ref) => {
  const {
    itemHeight = defaultListRowHeight,
    height = defaultListHeight,
    prefixCls,
    children,
    data,
    virtual,
    itemKey,
    fullHeight = false,
  } = props;
  return (
    <List
      itemKey={itemKey}
      ref={ref}
      itemHeight={itemHeight}
      height={height}
      data={data}
      virtual={virtual}
      prefixCls={`${prefixCls}-virtual-list`}
      style={{ paddingRight: 8 }}
      fullHeight={fullHeight}
    >
      {children}
    </List>
  );
};

const RefVirtualList = React.forwardRef(VirtualList);

export default RefVirtualList;
