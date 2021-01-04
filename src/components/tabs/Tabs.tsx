/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import TabNav from '../tab-nav';
import TabPane from './TabPane';
import { TabProps, TabPaneProps } from './interface';
import useControlledState from '../../utils/hooks/useControlledState';
import useDeepCompareMemo from '../../utils/hooks/useDeepCompareMemo';

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

  const [tabNav, tabPane] = useDeepCompareMemo(() => {
    const _tabItem: JSX.Element[] = [];
    const _tabPane = toArray(children).map((node: React.ReactElement<TabPaneProps>) => {
      if (React.isValidElement(node) && node.type === TabPane) {
        const { tab, className: paneClassName, disabled, style: paneStyle, ...restProps } = node.props;
        _tabItem.push(
          <TabNav.Item key={node.key} disabled={disabled}>
            {tab}
          </TabNav.Item>
        );
        return React.cloneElement(node, {
          prefixCls,
          className: classNames(paneClassName, {
            [`${prefixCls}-tabpane-active`]: localActiveKey === node.key,
          }),
          style: localActiveKey === node.key ? paneStyle : { ...paneStyle, display: 'none' },
          ...restProps,
        });
      }
      return null;
    });
    return [_tabItem, _tabPane];
  }, [children, localActiveKey, prefixCls]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tabNavKeys = useDeepCompareMemo(() => tabNav.map((item) => item.key!.toString()), [tabNav]);

  useMemo(() => {
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
