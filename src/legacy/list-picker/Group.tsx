/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import Subgroup from './Subgroup';
import Divider from './Divider';
import { GroupProps, SubgroupType } from './interfaces';
import { PREFIX } from './constants';
import ExpandableItems from './ExpandableItems';

function Group({ className, style, title, isLast, items, expandable, expandText, value, subgroups }: GroupProps) {
  const prefixCls = `${usePrefixCls(PREFIX)}__group`;
  const [expanded, setExpanded] = React.useState(false);

  function onExpand() {
    setExpanded(true);
  }

  let content;
  if (subgroups) {
    content = subgroups.map((s: SubgroupType, index: number) => {
      const subgroupProps = {
        ...s,
        expandable,
        expandText,
      };
      return <Subgroup key={`subgroup-${index}`} isLast={index === subgroups.length - 1} {...subgroupProps} />;
    });
  }
  if (items) {
    content = (
      <ExpandableItems
        expandable={expandable}
        expandText={expandText}
        expanded={expanded}
        onExpand={onExpand}
        items={items}
        value={value}
      />
    );
  }

  return (
    <li className={classnames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}__title`}>{title}</div>
      <ul className={`${prefixCls}__list`}>
        {content}
        {!isLast && <Divider key="group-divider" />}
      </ul>
    </li>
  );
}

export default Group;
