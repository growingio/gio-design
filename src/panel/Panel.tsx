import React, { useEffect, useState } from 'react';
import { useControlledState } from '@gio-design/utils';
import classnames from 'classnames';
import { difference } from 'lodash';
import Typography from '../typograhy';
import TabNav from '../tab-nav';
import { PanelProps, TabPaneProps } from './interfaces';
import TabPanel from './TabPanel';
import { usePrefixCls } from '..';

const InnerPanel: React.ForwardRefRenderFunction<HTMLDivElement, PanelProps> = (props, ref) => {
  const {
    title,
    description,
    children,
    footer,
    tabType = 'line',
    tabSize = 'middle',
    activeKey,
    defaultActiveKey,
    onTabClick,
    onChange,
    avatar,
    actions,
    bordered = true,
    className,
    style,
  } = props;
  const _prefixCls = usePrefixCls('panel');
  const prefix = (classname?: string) => `${_prefixCls}${classname || ''}`;

  const [key, setKey] = useControlledState(activeKey, defaultActiveKey);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const childs = React.Children.toArray(children);

  const tabs = childs.filter(
    (child) => React.isValidElement(child) && child.type === TabPanel
  ) as React.ReactElement<TabPaneProps>[];

  const otherChilds = difference(childs, tabs);

  const showTabs = tabs.length > 1;

  const hasChildren = childs.length > 0;

  useEffect(() => {
    const _currentIndex = tabs.findIndex((tab) => tab.key === `.$${key}`);
    if (_currentIndex > -1) {
      setCurrentTabIndex(_currentIndex);
    }
  }, [key, tabs]);

  const showHeader = title || description || !showTabs;

  const onTabChange = (_key: string) => {
    setKey(_key);
    onChange?.(_key);
  };

  return (
    <div ref={ref} className={classnames(prefix(), className, { [prefix('--bordered')]: bordered })} style={style}>
      <div
        className={classnames(
          prefix('__header'),
          { [prefix(`__header__border--bottom`)]: hasChildren && !showTabs },
          { [prefix('__header--hidden')]: !showHeader }
        )}
      >
        {avatar && (
          <div className={prefix('__header__avatar')}>
            <div className={prefix('__header__avatar--icon')}>{avatar}</div>
          </div>
        )}
        <div className={prefix('__header__meta')}>
          <div className={classnames(prefix('__header__meta__title'))}>{title}</div>
          <div className={classnames(prefix('__header__meta__description'))}>
            {typeof description === 'string' ? <Typography.Text lines={3}>{description}</Typography.Text> : description}
          </div>
        </div>
        <div className={classnames(prefix('__header__actions'))}>{actions}</div>
      </div>
      {showTabs ? (
        <div className={classnames(prefix('__tabs'))}>
          <TabNav
            size={tabSize}
            type={tabType}
            activeKey={key}
            onTabClick={onTabClick}
            defaultActiveKey={key}
            onChange={onTabChange}
          >
            {tabs.map((tab) => {
              const {
                key: _key,
                props: { name, disabled },
              } = tab;
              return (
                <TabNav.Item disabled={disabled} key={String(_key).slice(2)}>
                  {name}
                </TabNav.Item>
              );
            })}
          </TabNav>
        </div>
      ) : null}
      <div className={prefix('__content')}>
        {tabs[currentTabIndex]}
        {otherChilds}
      </div>
      {footer && <div className={prefix('__footer')}>{footer}</div>}
    </div>
  );
};

const Panel = React.forwardRef<unknown, PanelProps>(InnerPanel);

Panel.displayName = 'Panel';

export default Panel;
