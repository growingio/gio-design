import React, { useMemo, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { isNil } from 'lodash';
import { TabNavProps, TabNavItemProps } from './interface';
import useRefs from '../../utils/hooks/useRefs';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const TabNav = (props: TabNavProps, ref?: React.RefObject<HTMLDivElement>) => {
  const {
    children,
    prefixCls: customizePrefixCls,
    type = 'block',
    size = 'large',
    onChange,
    onTabClick,
    activeKey,
    defaultActiveKey = '',
  } = props;

  const [localActiveKey, setLocalActiveKey] = useState<string | number>(activeKey || defaultActiveKey);
  const [inkStyle, setInkStyle] = useState<{ left?: number; width?: number }>({});
  const wrapperRefKey = useRef<symbol>(Symbol('tabNav'));
  const [setRef, getRef] = useRefs<HTMLDivElement>();

  const prefixCls = usePrefixCls('tabnav', customizePrefixCls);
  const classString = classNames(prefixCls, `${prefixCls}-${type}`, {
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-md`]: size === 'middle',
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-xs`]: size === 'xs' && type === 'block',
  });

  const [tabNavKeys, tabNavChildren] = useMemo(() => {
    const _tabNavKeys: (string | number)[] = [];
    const _tabNavChildren = toArray(children).map((node: React.ReactElement<TabNavItemProps>, index) => {
      if (React.isValidElement(node) && node.type === TabNav.Item) {
        const { className, disabled, onClick, ...rest } = node.props;
        const _key = isNil(node.key) ? index : node.key;
        _tabNavKeys.push(_key);
        return (
          <TabNav.Item
            className={classNames(className, `${prefixCls}-item`, {
              [`${prefixCls}-item-active`]: localActiveKey === _key,
              [`${prefixCls}-item-disabled`]: disabled,
            })}
            prefixCls={prefixCls}
            disabled={disabled}
            key={_key}
            ref={setRef(_key)}
            onClick={(e) => {
              if (!disabled) {
                onClick?.(e);
                onTabClick?.(_key);
                if (isNil(activeKey)) {
                  setLocalActiveKey(_key);
                }
                if (localActiveKey !== _key) {
                  onChange?.(_key);
                }
              }
            }}
            {...rest}
          />
        );
      }
      return null;
    });
    return [_tabNavKeys, _tabNavChildren];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, localActiveKey, onChange, onTabClick]);

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

  useEffect(() => {
    if (!isNil(getRef(localActiveKey)?.current) && !isNil(getRef(wrapperRefKey.current)?.current)) {
      const { left, width } = getRef(localActiveKey)!.current!.getBoundingClientRect();
      const wrapperLeft = getRef(wrapperRefKey.current)!.current!.getBoundingClientRect().left;
      setInkStyle({ left: left - wrapperLeft, width });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localActiveKey, tabNavChildren]);

  return (
    <div className={classString} ref={setRef(wrapperRefKey.current, ref)}>
      {tabNavChildren}
      <div className={`${prefixCls}-ink-bar`} style={{ ...inkStyle }} />
    </div>
  );
};

TabNav.Item = React.forwardRef(
  ({ prefixCls, children, ...rest }: TabNavItemProps, ref: React.RefObject<HTMLDivElement>) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={ref} {...rest}>
      <div className={`${prefixCls}-item-btn`}>{children}</div>
    </div>
  )
);

export default TabNav;
