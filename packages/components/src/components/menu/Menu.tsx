import React, { useCallback, Children } from 'react';
import RcMenu from 'rc-menu';
import classnames from 'classnames';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { MenuContext } from './MenuContext';
import { IMenuProps, TMenuMode, TRcMode } from './interface';

const transform2RcMode = (mode: TMenuMode): TRcMode => (mode === 'vertical' ? 'inline' : 'horizontal');

const getOpenKeys = (mode: TMenuMode, children: React.ReactNode) => {
  if (mode === 'horizontal') {
    return undefined;
  }
  return Children.map(children, (_: any) => (_.type.displayName === 'GIODesignSubMenu' ? _.key : null));
};

const Menu: React.FC<IMenuProps> = (props: IMenuProps) => {
  const {
    mode = 'horizontal',
    prefixCls: customPrefixCls,
    className,
    selectedKey = '',
    defaultSelectedKey = '',
    verticalIndent = 16,
    onClick,
    children,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('menu', customPrefixCls);
  const cls = classnames(className);

  const realMode = transform2RcMode(mode);

  const openKeys = getOpenKeys(mode, children);
  const spreadProps: Partial<IMenuProps> = {
    ...restProps,
  };
  if (openKeys !== undefined) {
    spreadProps.openKeys = openKeys;
  }

  const handleClick = useCallback(
    (e) => {
      if (onClick && typeof onClick === 'function') {
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <MenuContext.Provider
      value={{
        prefixCls,
        verticalIndent,
      }}
    >
      <RcMenu
        {...spreadProps}
        mode={realMode}
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[defaultSelectedKey]}
        onClick={handleClick}
        prefixCls={prefixCls}
        className={cls}
      >
        {children}
      </RcMenu>
    </MenuContext.Provider>
  );
};

export default Menu;
