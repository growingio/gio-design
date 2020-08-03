import React, { useContext } from 'react';
import classNames from 'classnames';
import RcTabs from 'rc-tabs';
import toArray from 'rc-util/lib/Children/toArray';
import { ConfigContext } from '../config-provider';
import TabPane from './TabPane';
import { TabProps, TabPaneProps } from './interface';

const Tabs = (props: TabProps, ref: React.Ref<HTMLDivElement>) => {
  const { type = 'block', size = 'large', children, ...rest } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs');
  const classString = classNames({
    [`${prefixCls}-${type}`]: true,
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-md`]: size === 'middle',
    [`${prefixCls}-lg`]: size === 'large',
  });

  const getRcTabPane = (children: React.ReactNode) =>
    toArray(children).map((node: React.ReactElement<TabPaneProps>) => {
      if (React.isValidElement(node) && node.type === TabPane) {
        const { icon, tab, ...nodeType } = node.props;
        return <TabPane key={node.key as string | number | undefined} tab={icon ? icon : tab} {...nodeType} />;
      }
      return null;
    });

  return (
    <RcTabs className={classString} prefixCls={prefixCls} ref={ref} {...rest}>
      {getRcTabPane(children)}
    </RcTabs>
  );
};

export default React.forwardRef(Tabs);
