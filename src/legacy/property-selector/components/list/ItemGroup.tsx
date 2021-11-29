import React from 'react';
import classnames from 'classnames';
import Divider from './Divider';
import { ListItemGroupProps, ListItemSubgroupProps } from './interfaces';
import { useRootPrefixCls, renderItem, renderExpandableItems } from './utils';
import ItemSubgroup from './ItemSubgroup';

function ItemGroup({ className, style, title, children, subgroups, items, expandable = false }: ListItemGroupProps) {
  const [expanded, setExpanded] = React.useState(false);

  function onExpand() {
    setExpanded(true);
  }

  function renderSubgroups(currentSubgroups: ListItemSubgroupProps[]) {
    // eslint-disable-next-line react/no-array-index-key
    return currentSubgroups.map((s, idx) => <ItemSubgroup {...s} key={`subgroup-${idx}`} expandable={expandable} />);
  }

  const prefixCls = `${useRootPrefixCls()}__item-group`;
  let content;
  if (subgroups) {
    content = renderSubgroups(subgroups);
  } else if (items) {
    if (expandable) {
      content = renderExpandableItems(expanded, items, onExpand);
    } else {
      content = items.map(renderItem);
    }
    content.push(<Divider key="group-divider" />);
  } else {
    content = children;
  }
  return (
    <li className={classnames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}__title`}>{title}</div>
      <ul className={`${prefixCls}__list`}>{content}</ul>
    </li>
  );
}

export default ItemGroup;
