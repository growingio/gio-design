import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import Divider from './Divider';
import { SubgroupProps } from './interfaces';
import { PREFIX } from './constants';
import ExpandableItems from './ExpandableItems';

function Subgroup({ className, style, title, isLast, items, expandable, expandText, value }: SubgroupProps) {
  const [expanded, setExpanded] = React.useState(false);

  function onExpand() {
    setExpanded(true);
  }

  const prefixCls = `${usePrefixCls(PREFIX)}__subgroup`;

  return (
    <li className={classnames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}__title`}>{title}</div>
      <ul className={`${prefixCls}__list`}>
        <ExpandableItems
          expandable={expandable}
          expandText={expandText}
          expanded={expanded}
          onExpand={onExpand}
          items={items}
          value={value}
        />
        {!isLast && <Divider key="group-divider" />}
      </ul>
    </li>
  );
}

export default Subgroup;
