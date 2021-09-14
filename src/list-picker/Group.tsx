/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import Divider from './Divider';
import { GroupProps, ItemProps } from './interfaces';
import { renderItems } from './utils';
import Subgroup from './Subgroup';
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
  value,
  onSelect,
}: GroupProps) {
  const prefixCls = `${usePrefixCls(PREFIX)}__group`;
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
      return <Subgroup key={subgroupProps.key} {...subgroupProps} onSelect={onSelect} />;
    });
  } else if (items) {
    content = renderItems(
      expandable,
      expanded,
      items.map((i: ItemProps) => ({
        ...i,
        selected: i.value === value,
        onClick: () => {
          // @ts-ignore
          onSelect(i.value);
        },
      })),
      onExpand,
      expandText
    ).concat(<Divider key="group-divider" />);
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
