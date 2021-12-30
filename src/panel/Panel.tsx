import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { difference } from 'lodash';
import { useControlledState, usePrefixCls } from '@gio-design/utils';
import Typography from '../typography';
import Tabs, { Tab } from '../tabs';
import Divider from '../divider';
import { PanelProps, TabPaneProps } from './interfaces';
import TabPanel from './TabPanel';
import { Avatar } from '..';

const InnerPanel: React.ForwardRefRenderFunction<HTMLDivElement, PanelProps> = (props, ref) => {
  const {
    title,
    description,
    children,
    footer,
    tabSize = 'normal',
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

  const [currentTabKey, setCurrentTabKey] = useControlledState(activeKey, defaultActiveKey);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const panelChildren = React.Children.toArray(children);

  const panelTabs = panelChildren.filter(
    (child) => React.isValidElement(child) && child.type === TabPanel
  ) as React.ReactElement<TabPaneProps>[];

  const otherChildren = difference(panelChildren, panelTabs);

  const showTabs = panelTabs.length > 1;

  useEffect(() => {
    const _currentIndex = panelTabs.findIndex((tab) => tab.key === `.$${currentTabKey}`);
    if (_currentIndex > -1) {
      setCurrentTabIndex(_currentIndex);
    }
  }, [currentTabKey, panelTabs]);

  const showHeader = title || description || !showTabs;

  const onTabChange = (tabKey: string) => {
    setCurrentTabKey(tabKey);
    onChange?.(tabKey);
  };

  return (
    <div ref={ref} className={classnames(prefix(), className, { [prefix('--bordered')]: bordered })} style={style}>
      <div className={classnames(prefix('__header'), { [prefix('__header--hidden')]: !showHeader })}>
        {avatar && (
          <div className={prefix('__header__avatar')}>
            <Avatar size="large" icon={avatar} mode="square" />
          </div>
        )}
        <div className={prefix('__header__meta')}>
          {title && <div className={classnames(prefix('__header__meta__title'))}>{title}</div>}
          {description && (
            <div className={classnames(prefix('__header__meta__description'))}>
              {typeof description === 'string' ? (
                <Typography.Text lines={3}>{description}</Typography.Text>
              ) : (
                description
              )}
            </div>
          )}
        </div>
        {actions && <div className={classnames(prefix('__header__actions'))}>{actions}</div>}
      </div>
      {showTabs ? (
        <>
          <div className={classnames(prefix('__tabs'))}>
            <Tabs
              value={currentTabKey}
              onChange={onTabChange}
              onClick={onTabClick}
              size={tabSize}
              defaultValue={currentTabKey}
            >
              {panelTabs.map((tab) => {
                const {
                  key: tabKey,
                  props: { name },
                } = tab;
                return (
                  <Tab value={String(tabKey).slice(2)} label={name} key={tabKey} className={prefix('__tabs__tab')} />
                );
              })}
            </Tabs>
            <Divider className={prefix('__tabs__divider')} />
          </div>
          {panelTabs[currentTabIndex]}
        </>
      ) : (
        panelTabs[0]
      )}
      {otherChildren}
      {footer && <div className={prefix('__footer')}>{footer}</div>}
    </div>
  );
};

const Panel = React.forwardRef<unknown, PanelProps>(InnerPanel);

Panel.displayName = 'Panel';

export default Panel;
