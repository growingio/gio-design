/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import Result from '../../../../../../result';
import ItemGroup from './ItemGroup';
import ItemSubgroup from './ItemSubgroup';
import Item from './Item';
import Divider from './Divider';
import { ListProps, ListItemProps, ListItemGroupProps } from './interfaces';
import { useRootPrefixCls } from './utils';

function InternalList({ className, style, children, items, expandable = false }: ListProps) {

  const content = React.useMemo(() => {
    if (children) {
      return children;
    }

    if (items && items.length > 0) {
      return items.map((item: ListItemGroupProps | ListItemProps, index) => {
        if ('title' in item) {
          const itemGroup = item as ListItemGroupProps;
          return <ItemGroup expandable={expandable} {...itemGroup} />;
        }
        return <Item key={`item-${index}`} {...(item as ListItemProps)} />;
      });
    }

    return <Result size="small" type="empty" />;
  }, [items, expandable,children]);

  const cls = classnames(useRootPrefixCls(), className);
  return (
    <ul className={cls} style={style}>
      {content}
    </ul>
  );
}

class List extends React.Component<ListProps> {
  static Item = Item;

  static ItemGroup = ItemGroup;

  static ItemSubgroup = ItemSubgroup;

  static Divider = Divider;

  render() {
    return <InternalList {...this.props} />;
  }
}

export default List;
