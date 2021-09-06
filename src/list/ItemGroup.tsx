import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import Divider from './Divider';
import { ListItemGroupProps } from './interfaces';
import { renderItems } from './utils';
import ItemSubgroup from './ItemSubgroup';
import { PREFIX } from './constants';

function ItemGroup({
  className,
  style,
  title,
  children,
  subgroups,
  items,
  expandable = false,
  expandText,
}: ListItemGroupProps) {
  const prefixCls = `${usePrefixCls(PREFIX)}__item-group`;
  const [expanded, setExpanded] = React.useState(false);

  function onExpand() {
    setExpanded(true);
  }

  let content;
  if (subgroups) {
    content = subgroups.map((s) => {
      const subgroupProps = {
        ...s,
        expandable,
        expandText,
      };
      return <ItemSubgroup key={subgroupProps.key} {...subgroupProps} />;
    });
  } else if (items) {
    content = renderItems(expandable, expanded, items, onExpand, expandText).concat(<Divider key="group-divider" />);
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
