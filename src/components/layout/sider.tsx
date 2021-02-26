/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { LeftOutlined, RightOutlined } from '@gio-design/icons';
import { isNil, isString } from 'lodash';
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
  trigger,
}: LayoutSiderProps) => {
  const { removeSider, updateSiders } = useContext(LayoutContext);
  const [localCollapsed, setLocalCollapsed] = useControlledState(collapsed, defaultCollapsed);
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

  const prefixCls = usePrefixCls('layout-sider', customizePrefixCls);
  const mergedStyle: React.CSSProperties = {
    ['--layout-sider-width' as any]: `${width}px`,
    ['--layout-sider-collapsedWidth' as any]: `${collapsedWidth}px`,
    ['--layout-sider-collapsedWidth-negative' as any]: `-${collapsedWidth}px`,
    ...style,
  };

  const renderTrigger = () => {
    if (isNil(trigger)) return null;
    if (isString(trigger)) {
      if (trigger === 'bottom') {
        return (
          <div
            className={`${prefixCls}-bottom-trigger`}
            onClick={() => {
              setLocalCollapsed(!localCollapsed);
              onCollapse?.(!localCollapsed);
            }}
            aria-hidden="true"
          >
            {localCollapsed ? <RightOutlined data-testid="right-icon" /> : <LeftOutlined data-testid="left-icon" />}
          </div>
        );
      }
      return null;
    }
    return trigger;
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
      <div data-testid="sider-content" className={`${prefixCls}-content`}>
        {children}
      </div>
      {renderTrigger()}
    </aside>
  );
};

export default Sider;
