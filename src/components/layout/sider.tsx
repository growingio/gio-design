/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { LayoutSiderProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { LayoutContext } from './layout';
import useControlledState from '../../utils/hooks/useControlledState';

const generateId = (() => {
  let i = 0;
  return () => {
    i += 1;
    return `'sider'-${i}`;
  };
})();

const Sider = ({
  prefixCls: customizePrefixCls,
  className,
  style,
  children,
  collapsedWidth = 80,
  width = 200,
  collapsed,
  defaultCollapsed = true,
  onCollapse,
  suspendedPosition,
}: LayoutSiderProps) => {
  const { removeSider, updateSiders } = useContext(LayoutContext);
  const [localCollapsed] = useControlledState(collapsed, defaultCollapsed);
  const siderRef = useRef<HTMLDivElement>(null);
  const siderId = useRef<string>();

  useEffect(() => {
    const uniqueId = generateId();
    siderId.current = uniqueId;
    return () => removeSider(uniqueId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const siderWidth = siderRef.current?.getBoundingClientRect().width ?? 0;
    updateSiders({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: siderId.current!,
      width: suspendedPosition || localCollapsed ? collapsedWidth : siderWidth,
      collapsedWidth,
      suspendedPosition,
    });
  }, [collapsedWidth, localCollapsed, suspendedPosition, updateSiders]);

  useEffect(() => onCollapse?.(localCollapsed), [localCollapsed, onCollapse]);

  const prefixCls = usePrefixCls('layout-sider', customizePrefixCls);
  const mergedStyle: React.CSSProperties = {
    ['--layout-sider-width' as any]: `${width}px`,
    ['--layout-sider-collapsedWidth' as any]: `${collapsedWidth}px`,
    ['--layout-sider-collapsedWidth-negative' as any]: `-${collapsedWidth}px`,
    ...style,
  };

  return (
    <aside
      ref={siderRef}
      className={classNames(prefixCls, className, {
        [`${prefixCls}-suspend`]: !!suspendedPosition,
        [`${prefixCls}-suspend-${suspendedPosition}`]: !!suspendedPosition,
        [`${prefixCls}-collapsed`]: localCollapsed && !suspendedPosition,
        [`${prefixCls}-suspend-collapsed`]: localCollapsed && !!suspendedPosition,
      })}
      style={mergedStyle}
    >
      {children}
    </aside>
  );
};

export default Sider;
