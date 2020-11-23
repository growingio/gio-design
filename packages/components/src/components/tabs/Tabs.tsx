/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { isNil } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import TabNav from '../tab-nav';
import TabPane from './TabPane';
import { TabProps, TabPaneProps } from './interface';

const Tabs = (props: TabProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    type = 'block',
    size = 'large',
    children,
    prefixCls: customizePrefixCls,
    className,
    activeKey,
    defaultActiveKey = '',
    style,
    onTabClick,
    onChange,
  } = props;
  const [localActiveKey, setLocalActiveKey] = useState<string | number>(activeKey || defaultActiveKey);
  const prefixCls = usePrefixCls('tabs', customizePrefixCls);
  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: true,
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-md`]: size === 'middle',
    [`${prefixCls}-lg`]: size === 'large',
  });

  const [tabNav, tabPane] = useMemo(() => {
    const _tabItem: JSX.Element[] = [];
    const _tabPane = toArray(children).map((node: React.ReactElement<TabPaneProps>) => {
      if (React.isValidElement(node) && node.type === TabPane) {
        const { tab, className: paneClassName, disabled, style: paneStyle, ...restProps } = node.props;
        _tabItem.push(
          <TabNav.Item key={node.key} disabled={disabled}>
            {tab}
          </TabNav.Item>
        );
        return (
          <TabPane
            prefixCls={prefixCls}
            className={classNames(paneClassName, {
              [`${prefixCls}-tabpane-active`]: localActiveKey === node.key,
            })}
            key={node.key as string | number | undefined}
            style={localActiveKey === node.key ? paneStyle : { ...paneStyle, display: 'none' }}
            {...restProps}
          />
        );
      }
      return null;
    });
    return [_tabItem, _tabPane];
  }, [children, localActiveKey, prefixCls]);

  const tabNavKeys = useMemo(() => tabNav.map((item) => item.key!), [tabNav]);
  useMemo(() => {
    if (!tabNavKeys.includes(localActiveKey)) {
      setLocalActiveKey(tabNavKeys[0]);
    }
  }, [localActiveKey, tabNavKeys]);

  useMemo(() => {
    if (!isNil(activeKey) && tabNavKeys.includes(activeKey)) {
      setLocalActiveKey(activeKey);
    }
  }, [activeKey, tabNavKeys]);

  return (
    <div className={classString} ref={ref} style={style}>
      <TabNav
        size={size}
        type={type}
        activeKey={localActiveKey}
        onTabClick={onTabClick}
        onChange={(_key: string | number) => {
          if (isNil(activeKey)) {
            setLocalActiveKey(_key);
          }
          onChange?.(_key);
        }}
      >
        {tabNav}
      </TabNav>
      <div className={`${prefixCls}-content`}>{tabPane}</div>
    </div>
  );
};

export default React.forwardRef(Tabs);
