import React from 'react';
import RcMenu from 'rc-menu';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { MenuContext } from './MenuContext';
import { IMenuProps, TMenuMode, TRcMode } from './interface';

const transform2RcMode = (mode: TMenuMode): TRcMode => (mode === 'vertical' ? 'inline' : 'horizontal');

const Menu: React.FC<IMenuProps> = (props: IMenuProps) => {
  const {
    mode = 'horizontal',
    prefixCls: customPrefixCls,
    className,
    selectedKey = '',
    defaultSelectedKey = '',
    verticalIndent = 20,
    children,
    inlineCollapsed = false,
    title,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('menu-legacy', customPrefixCls);
  const cls = classnames(className, { [`${prefixCls}-inlineCollapsed`]: inlineCollapsed });

  const realMode = transform2RcMode(mode);

  return (
    <MenuContext.Provider
      value={{
        prefixCls,
        verticalIndent,
        inlineCollapsed,
      }}
    >
      {!!title && mode !== 'horizontal' && inlineCollapsed === false && (
        <div className={`${prefixCls}-title`}>{title}</div>
      )}
      <RcMenu
        {...restProps}
        mode={realMode}
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[defaultSelectedKey]}
        prefixCls={prefixCls}
        className={cls}
        inlineCollapsed={inlineCollapsed}
      >
        {children}
      </RcMenu>
    </MenuContext.Provider>
  );
};

export default Menu;
