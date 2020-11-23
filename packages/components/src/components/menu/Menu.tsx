import React, { useCallback, Children } from 'react';
import RcMenu from 'rc-menu';
import classnames from 'classnames';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import MenuPrefixClsContext from './MenuContext';
import { IMenuProps, TMenuMode } from './interface';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const transform2RcMode = (mode: TMenuMode) => (mode === 'vertical' ? 'inline' : 'horizontal');

const getOpenKeys = (mode: TMenuMode, children: React.ReactNode) => {
  if (mode === 'horizontal') {
    return undefined;
  }
  return Children.map(children, (_: any) => (_.type.displayName === 'GIODesignSubMenu' ? _.key : null));
};

const Menu = (props: IMenuProps) => {
  const {
    mode = 'horizontal',
    prefixCls: customPrefixCls,
    className,
    selectedKey = '',
    defaultSelectedKey = '',
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
    <MenuPrefixClsContext.Provider value={prefixCls}>
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
    </MenuPrefixClsContext.Provider>
  );
};

Menu.MenuItem = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
