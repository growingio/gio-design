/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import Empty from '../../legacy/empty';
import ItemGroup from './ItemGroup';
import ItemSubgroup from './ItemSubgroup';
import Item from './Item';
import Divider from './Divider';
import { ListProps, ListItemProps, ListItemGroupProps, DividerProps, ListItemSubgroupProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const List: React.FC<ListProps> & {
  Item: React.FC<ListItemProps>;
  ItemGroup: React.FC<ListItemGroupProps>;
  ItemSubgroup: React.FC<ListItemSubgroupProps>;
  Divider: React.FC<DividerProps>;
} = ({ className, style, children, items, expandable = false, empty }: ListProps) => {
  function renderItems(currentItems: (ListItemGroupProps | ListItemProps)[], currentExpandable: boolean) {
    return currentItems.map((item: ListItemGroupProps | ListItemProps, index) => {
      if ('title' in item) {
        return <ItemGroup expandable={currentExpandable} {...item} />;
      }
      return <Item key={`item-${index}`} {...(item as ListItemProps)} />;
    });
  }

  const prefixCls = usePrefixCls('list');
  const content = React.useMemo(() => {
    if (items && items.length > 0) {
      return renderItems(items, expandable);
    }
    if (children) {
      return children;
    }
    return <Empty size="small" {...empty} />;
  }, [items, expandable, children, empty]);

  const cls = classnames(prefixCls, className);
  return (
    <ul className={cls} style={style}>
      {content}
    </ul>
  );
};

List.Item = Item;
List.ItemGroup = ItemGroup;
List.ItemSubgroup = ItemSubgroup;
List.Divider = Divider;

export default List;
