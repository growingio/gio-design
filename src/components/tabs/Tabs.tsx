import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { isNil } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import TabNav from '../tab-nav';
import TabPane from './TabPane';
import { TabProps, TabPaneProps } from './interface';
import useControlledState from '../../utils/hooks/useControlledState';

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
  const [localActiveKey, setLocalActiveKey] = useControlledState<string>(activeKey, defaultActiveKey);
  const prefixCls = usePrefixCls('tabs', customizePrefixCls);
  const classString = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: true,
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-md`]: size === 'middle',
    [`${prefixCls}-lg`]: size === 'large',
  });

  const [tabNavKeys, tabNav, tabPane] = useMemo(() => {
    const _tabNavKeys: string[] = [];
    const _tabItem: JSX.Element[] = [];
    const _tabPane =
      toArray(children)
      .filter(node => React.isValidElement(node) && node.type === TabPane)
      .map((node: React.ReactElement<TabPaneProps>, index) => {
        const { tab, className: paneClassName, disabled, style: paneStyle, ...restProps } = node.props;
        const _key = isNil(node.key) ? index.toString() : node.key.toString();
        _tabNavKeys.push(_key);
        _tabItem.push(
          <TabNav.Item key={_key} disabled={disabled}>
            {tab}
          </TabNav.Item>
        );
        return React.cloneElement(node, {
          prefixCls,
          className: classNames(paneClassName, {
            [`${prefixCls}-tabpane-active`]: localActiveKey === _key,
          }),
          style: localActiveKey === _key ? paneStyle : { ...paneStyle, display: 'none' },
          ...restProps,
        });
      });
    return [_tabNavKeys, _tabItem, _tabPane];
  }, [children, localActiveKey, prefixCls]);

  useEffect(() => {
    if (!tabNavKeys.includes(localActiveKey)) {
      setLocalActiveKey(tabNavKeys[0]);
    }
  }, [localActiveKey, tabNavKeys, setLocalActiveKey]);

  return (
    <div className={classString} ref={ref} style={style}>
      <TabNav
        size={size}
        type={type}
        activeKey={localActiveKey}
        onTabClick={onTabClick}
        onChange={(_key: string) => {
          setLocalActiveKey(_key);
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
