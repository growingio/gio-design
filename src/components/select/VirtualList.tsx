import React, { useEffect, useRef } from 'react';
import List, { ListRef } from 'rc-virtual-list';
import { VirtualListProps } from './interface';

const defaultListRowHeight = 44;
const defaultListHeight = 520;

const VirtualList: React.FC<VirtualListProps> = (props) => {
  const {
    itemHeight = defaultListRowHeight,
    height = defaultListHeight,
    prefixCls,
    children,
    data,
    virtual,
    itemKey,
    activeIndex
  } = props;
  const Listref = useRef<ListRef>(null);
  useEffect(() => {
    Listref?.current?.scrollTo({index:activeIndex,offset:defaultListRowHeight * 3})
  }, [activeIndex])
  return (
    <List
      itemKey={itemKey}
      ref={Listref}
      itemHeight={itemHeight}
      height={height}
      data={data}
      virtual={virtual}
      prefixCls={`${prefixCls}-virtual-list`}
      style={{ paddingRight: 8 }}
      fullHeight={false}
    >
      {children}
    </List>
  );
};

export default VirtualList;
