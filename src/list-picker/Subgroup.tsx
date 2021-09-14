/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import Divider from './Divider';
import { SubgroupProps } from './interfaces';
import { renderItems } from './utils';
import { PREFIX } from './constants';

function Subgroup({
  className,
  style,
  title,
  children,
  items,
  expandable = false,
  expandText,
  value,
  onSelect,
}: SubgroupProps) {
  const [expanded, setExpanded] = React.useState(false);

  function onExpand() {
    setExpanded(true);
  }

  const prefixCls = `${usePrefixCls(PREFIX)}__subgroup`;
  let content;
  if (items) {
    content = renderItems(
      expandable,
      expanded,
      items.map((i) => ({
        ...i,
        selected: i.value === value,
        onClick: () => {
          // @ts-ignore
          onSelect(i.value);
        },
      })),
      onExpand,
      expandText
    ).concat(<Divider key="subgroup-divider" />);
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

export default Subgroup;
