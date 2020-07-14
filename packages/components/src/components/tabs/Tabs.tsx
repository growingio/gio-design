import React, { useContext } from 'react';
import { TabProps, TabPaneProps } from './interface';
import { ConfigContext } from '../config-provider';
import classNames from 'classnames';
import RcTabs, { TabPane as RcTabPane } from 'rc-tabs';
import toArray from 'rc-util/lib/Children/toArray';
import Icon from '@gio-design/icon';

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
      if (React.isValidElement(node)) {
        const { type: nodeType, children: nodeChildren, ...nodeRest } = node.props;
        if (nodeType) {
          return (
            <RcTabPane
              key={node.key as string | number | undefined}
              tab={<Icon type={nodeType} size={16} style={{ marginRight: 0 }} />}
              {...nodeRest}
            >
              {nodeChildren}
            </RcTabPane>
          );
        } else {
          return (
            <RcTabPane key={node.key as string | number | undefined} {...nodeRest}>
              {node.props.children}
            </RcTabPane>
          );
        }
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
