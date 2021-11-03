import React from 'react';
import classNames from 'classnames';
import { TabPaneProps } from './interface';

const TabPane = ({
  children, prefixCls, style, className,
}: TabPaneProps) => (
  <div className={classNames(`${prefixCls}-tabpane`, className)} style={style}>
    {children}
  </div>
);

export default TabPane;
