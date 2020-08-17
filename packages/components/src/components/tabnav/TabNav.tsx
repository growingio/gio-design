import React, { useContext, useMemo, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { isNil } from 'lodash';
import { ConfigContext } from '../config-provider';
import { TabNavProps, TabNavItemProps } from './interface';
import useRefs from './hook/useRefs';

const TabNav = (props: TabNavProps, ref?: React.RefObject<HTMLDivElement>) => {
  const { children, prefixCls: customizePrefixCls, type = 'block', size = 'large', onChange } = props;

  const [activeKey, setActiveKey] = useState<string | number | null>(null);
  const [inkStyle, setInkStyle] = useState<{ left?: number; width?: number }>({});
  const wrapperRefKey = useRef<symbol>(Symbol('tabNav'));
  const [setRef, getRef] = useRefs<HTMLDivElement>();

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabnav', customizePrefixCls);
  const classString = classNames(prefixCls, `${prefixCls}-${type}`, {
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-md`]: size === 'middle',
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-xs`]: size === 'xs' && type === 'block',
  });

  const tabNavChildren = useMemo(
    () =>
      toArray(children).map((node: React.ReactElement<TabNavItemProps>, index) => {
        if (React.isValidElement(node) && node.type === TabNav.Item) {
          const { className, key, disabled, onClick, ...rest } = node.props;
          const _key = isNil(node.key) ? index.toString() : node.key;
          return (
            <TabNav.Item
              className={classNames(className, `${prefixCls}-item`, {
                [`${prefixCls}-item-active`]: activeKey === _key,
                [`${prefixCls}-item-disabled`]: disabled,
              })}
              disabled={disabled}
              key={index}
              ref={setRef(_key)}
              onClick={(e) => {
                if (!disabled) {
                  setActiveKey(_key);
                  onChange?.(_key);
                  onClick?.(e);
                }
              }}
              {...rest}
            />
          );
        }
        return null;
      }),
    [children, activeKey]
  );

  useEffect(() => {
    setActiveKey(tabNavChildren[0]!.key);
  }, []);

  useEffect(() => {
    if (!isNil(getRef(activeKey)?.current) && !isNil(getRef(wrapperRefKey.current)?.current)) {
      const { left, width } = getRef(activeKey)!.current!.getBoundingClientRect();
      const wrapperLeft = getRef(wrapperRefKey.current)!.current!.getBoundingClientRect().left;
      setInkStyle({ left: left - wrapperLeft, width });
    }
  }, [activeKey, tabNavChildren]);

  return (
    <div className={classString} ref={setRef(wrapperRefKey.current, ref)}>
      {tabNavChildren}
      <div className={`${prefixCls}-ink-bar`} style={{ ...inkStyle }} />
    </div>
  );
};

TabNav.Item = React.forwardRef(({ children, ...rest }: TabNavItemProps, ref: React.RefObject<HTMLDivElement>) => (
  <div ref={ref} {...rest}>
    <div>{children}</div>
  </div>
));

export default TabNav;
