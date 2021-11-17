/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import Page from '../../../../page';
import ItemGroup from './ItemGroup';
import ItemSubgroup from './ItemSubgroup';
import Item from './Item';
import Divider from './Divider';
import { ListProps, ListItemProps, ListItemGroupProps } from './interfaces';
import { useRootPrefixCls } from './utils';

function InternalList({ className, style, children, items, expandable = false }: ListProps) {
  function renderItems(currentItems: (ListItemGroupProps | ListItemProps)[]) {
    return currentItems.map((item: ListItemGroupProps | ListItemProps, index) => {
      if ('title' in item) {
        const itemGroup = item as ListItemGroupProps;
        return <ItemGroup expandable={expandable} {...itemGroup} />;
      }
      return <Item key={`item-${index}`} {...(item as ListItemProps)} />;
    });
  }

  let content;
  if (items && items.length > 0) {
    // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
    content = React.useMemo(() => renderItems(items), [items, expandable]);
  } else if (children) {
    content = children;
  } else {
    content = <Page size="small" type="noData" />;
  }

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
