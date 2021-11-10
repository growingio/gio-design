import React from 'react';
import classnames from 'classnames';
import Divider from './Divider';
import { ListItemSubgroupProps } from './interfaces';
import { renderItems } from './utils';
import { PREFIX } from './constants';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

function ItemSubgroup({ className, style, title, children, items, expandable = false }: ListItemSubgroupProps) {
  const [expanded, setExpanded] = React.useState(false);

  function onExpand() {
    setExpanded(true);
  }

  const prefixCls = `${usePrefixCls(PREFIX)}__item-subgroup`;
  let content;
  if (items) {
    content = renderItems(expandable, expanded, items, onExpand).concat(<Divider key="subgroup-divider" />);
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
