import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';

import { CollapsePanelProps } from './interface'


const CollapsePanel: React.FC<CollapsePanelProps> = props => {
  const { prefixCls: customizePrefixCls, className = '', showArrow = true } = props;
  const prefixCls = (customizePrefixCls);
  const collapsePanelClassName = classNames(
    {
      [`${prefixCls}-no-arrow`]: !showArrow,
    },
    className,
  );
  return <RcCollapse.Panel {...props} prefixCls={prefixCls} className={collapsePanelClassName} />;
};

export default CollapsePanel;
