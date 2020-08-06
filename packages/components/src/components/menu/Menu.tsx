import React, { useCallback, useContext, Children } from 'react';
import RcMenu from 'rc-menu';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';
import { MenuPrefixClsContext } from './MenuContext';
import { IMenuProps, TMenuMode } from './interface';

const transform2RcMode = (mode: TMenuMode) => (mode === 'vertical' ? 'inline' : 'horizontal');

const getOpenKeys = (mode: TMenuMode, children: React.ReactNode) => {
  if (mode === 'horizontal') {
    return undefined;
  }
  return Children.map(children, (_: any) => (_.type.displayName === 'GIODesignSubMenu' ? _.key : null));
};

const Menu: React.FC<IMenuProps> = (props) => {
  const {
    mode = 'horizontal',
    prefixCls,
    className,
    selectedKey = '',
    defaultSelectedKey = '',
    onClick,
    children,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('menu', prefixCls);
  const cls = classnames(className);

  const realMode = transform2RcMode(mode);

  const openKeys = getOpenKeys(mode, children);
  const spreadProps: Partial<IMenuProps> = {
    ...restProps,
  };
  if (openKeys !== undefined) {
    spreadProps.openKeys = openKeys;
  }

  const handleClick = useCallback((e) => {
    if (onClick && typeof onClick === 'function') {
      onClick(e);
    }
  }, []);

  return (
    <MenuPrefixClsContext.Provider value={prefix}>
      <RcMenu
        {...spreadProps}
        mode={realMode}
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[defaultSelectedKey]}
        onClick={handleClick}
        prefixCls={prefix}
        className={cls}
      >
        {children}
      </RcMenu>
    </MenuPrefixClsContext.Provider>
  );
};

export default Menu;
