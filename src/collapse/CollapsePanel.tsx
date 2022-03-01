import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';

import { CollapsePanelProps } from './interface';

const CollapsePanel: React.FC<CollapsePanelProps> = (props) => {
  const { prefixCls: customizePrefixCls, className = '', showArrow = true, children } = props;
  const prefixCls = customizePrefixCls;
  const collapsePanelClassName = classNames(
    {
      [`${prefixCls}-no-arrow`]: !showArrow,
    },
    className
  );
  return (
    <RcCollapse.Panel {...props} prefixCls={prefixCls} className={collapsePanelClassName}>
      {children}
    </RcCollapse.Panel>
  );
};

export default CollapsePanel;
