import React from 'react';
import classnames from 'classnames';
import Divider from './Divider';
import { ListItemSubgroupProps } from './interfaces';
import { useRootPrefixCls, renderItem, renderExpandableItems } from './utils';

function ItemSubgroup({ className, style, title, children, items, expandable = false }: ListItemSubgroupProps) {
  const [expanded, setExpanded] = React.useState(false);

  function onExpand() {
    setExpanded(true);
  }

  const prefixCls = `${useRootPrefixCls()}__item-subgroup`;
  let content;
  if (items) {
    if (expandable) {
      content = renderExpandableItems(expanded, items, onExpand);
    } else {
      content = items.map(renderItem);
    }
    content.push(<Divider key="subgroup-divider" />);
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

export default ItemSubgroup;
