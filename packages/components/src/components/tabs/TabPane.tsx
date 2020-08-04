import React from 'react';
import { TabPaneProps } from './interface';
import { TabPane as RcTabPane } from 'rc-tabs';

const TabPane = (props: TabPaneProps) => {
  const { icon, tab, children, ...rest } = props;
  return (
    <RcTabPane tab={icon ? icon : tab} {...rest}>
      {children}
    </RcTabPane>
  );
};

export default TabPane;
