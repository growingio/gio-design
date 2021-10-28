import React from 'react';
import classNames from 'classnames';
import { TabPanelProps } from './interface';

const TabPanel = ({ style, children, className }: TabPanelProps) => (
  <div className={classNames(`tabs-tabpane`, className)} style={style} role="tabpanel">
    {children}
  </div>
);

export default TabPanel;
