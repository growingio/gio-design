/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { isNil, isUndefined, reject } from 'lodash';
import { useDeepCompareEffect } from 'react-use';
import { TabNavProps, TabNavItemProps } from './interface';
import useRefs from '../../utils/hooks/useRefs';
import composeRef from '../../utils/composeRef';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import useControlledState from '../../utils/hooks/useControlledState';
import useDeepCompareMemo from '../../utils/hooks/useDeepCompareMemo';

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

  const [localActiveKey, setLocalActiveKey] = useControlledState<string>(activeKey, defaultActiveKey);
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

  const [tabNavKeys, tabNavChildren] = useDeepCompareMemo(() => {
    const _tabNavKeys: string[] = [];
    const _tabNavChildren = toArray(children).map((node: React.ReactElement<TabNavItemProps>, index) => {
      if (React.isValidElement(node) && node.type === TabNav.Item) {
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
          innerRef: setRef(_key),
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
      }
      return null;
    });
    return [_tabNavKeys, _tabNavChildren];
  }, [children, localActiveKey, onChange, onTabClick]);

  useMemo(() => {
    if (!tabNavKeys.includes(localActiveKey)) {
      setLocalActiveKey(tabNavKeys[0]);
    }
  }, [tabNavKeys, localActiveKey, setLocalActiveKey]);

  useDeepCompareEffect(() => {
    if (!isNil(getRef(localActiveKey)?.current) && !isNil(getRef(wrapperRefKey.current)?.current)) {
      const { left, width } = getRef(localActiveKey)!.current!.getBoundingClientRect();
      const wrapperLeft = getRef(wrapperRefKey.current)!.current!.getBoundingClientRect().left;
      setInkStyle({ left: left - wrapperLeft, width });
    }
  }, [localActiveKey, children]);

  return (
    <div className={classString} ref={setRef(wrapperRefKey.current, ref)}>
      {tabNavChildren}
      <div className={`${prefixCls}-ink-bar`} style={{ ...inkStyle }} />
    </div>
  );
};

TabNav.Item = React.forwardRef(
  ({ prefixCls, children, innerRef, ...rest }: TabNavItemProps, ref: React.RefObject<HTMLDivElement>) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={composeRef(...reject([ref, innerRef], isUndefined))} {...rest}>
      <div className={`${prefixCls}-item-btn`}>{children}</div>
    </div>
  )
);

export default TabNav;
