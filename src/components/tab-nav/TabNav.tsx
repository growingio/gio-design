/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useMemo, useEffect, useState, useLayoutEffect } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { isNil } from 'lodash';
import { TabNavProps, TabNavItemProps } from './interface';
import useRefs from '../../utils/hooks/useRefs';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import useControlledState from '../../utils/hooks/useControlledState';

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
    style
  } = props;

  const [localActiveKey, setLocalActiveKey] = useControlledState<string>(activeKey, defaultActiveKey);
  const wrapperRefKey = useRef<symbol>(Symbol('tabNav'));
  const [setRef, getRef] = useRefs<HTMLDivElement>();
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>({});

  const prefixCls = usePrefixCls('tabnav', customizePrefixCls);
  const classString = classNames(prefixCls, `${prefixCls}-${type}`, {
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-md`]: size === 'middle',
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-xs`]: size === 'xs' && type === 'block',
  });

  const [tabNavKeys, tabNavChildren] = useMemo(() => {
    const _tabNavKeys: string[] = [];
    const _tabNavChildren =
      toArray(children)
      .filter((node) => React.isValidElement(node) && node.type === TabNav.Item)
      .map((node, index) => {
        const { className, disabled, onClick, ...rest } = node.props;
        const _key: string = isNil(node.key) ? index.toString() : node.key.toString();
        _tabNavKeys.push(_key);
        return React.cloneElement(node, {
          className: classNames(className, `${prefixCls}-item`, {
            [`${prefixCls}-item-active`]: localActiveKey === _key,
            [`${prefixCls}-item-disabled`]: disabled,
          }),
          prefixCls,
          disabled,
          key: _key,
          ref: setRef(_key),
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            if (!disabled) {
              onClick?.(e);
              onTabClick?.(_key);
              setLocalActiveKey(_key);
              if (localActiveKey !== _key) {
                onChange?.(_key);
              }
            }
          },
          ...rest,
        });
      });
    return [_tabNavKeys, _tabNavChildren];
  }, [children, localActiveKey, onChange, onTabClick, prefixCls, setLocalActiveKey, setRef]);

  useEffect(() => {
    if (!tabNavKeys.includes(localActiveKey)) {
      setLocalActiveKey(tabNavKeys[0]);
    }
  }, [tabNavKeys, localActiveKey, setLocalActiveKey]);

  useLayoutEffect(() => {
    const activeTabElement = getRef(localActiveKey)?.current;
    const wrapperElement = getRef(wrapperRefKey.current)?.current;
    if (isNil(activeTabElement) || isNil(wrapperElement)) {
      setInkStyle({});
    } else {
      const { left, width } = activeTabElement.getBoundingClientRect();
      const wrapperLeft = wrapperElement.getBoundingClientRect().left;
      setInkStyle({ left: left - wrapperLeft, width });
    }
  } , [getRef, localActiveKey]);

  return (
    <div className={classString} ref={setRef(wrapperRefKey.current, ref)} style={style}>
      {tabNavChildren}
      <div className={`${prefixCls}-ink-bar`} style={{ ...inkStyle }} />
    </div>
  );
};

TabNav.Item = React.forwardRef<HTMLDivElement, TabNavItemProps>(({ prefixCls, children, ...rest }, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div data-testid='tabnav-item' ref={ref} {...rest}>
    <div className={`${prefixCls}-item-btn`}>{children}</div>
  </div>
));

export default TabNav;
