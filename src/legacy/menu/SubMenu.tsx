import React, { useContext } from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import { DownOutlined } from '@gio-design/icons';
import { isUndefined } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { ISubMenuProps } from './interface';
import MenuTitle from './MenuTitle';
import { MenuContext, SubMenuContext, getInlineIndent } from './MenuContext';

const SubMenu = (props: ISubMenuProps) => {
  const { icon, title, children, expandIcon, ...restProps } = props;
  const { verticalIndent, inlineCollapsed } = useContext(MenuContext);
  const { inSubMenu, inIconSubMenu } = useContext(SubMenuContext);
  const prefixCls = usePrefixCls('menu');
  const inlineIndent = getInlineIndent(verticalIndent, inSubMenu, inIconSubMenu);

  const renderTitle = (): React.ReactElement => <MenuTitle title={title} icon={icon} />;
  return (
    <SubMenuContext.Provider value={{ inSubMenu: true, inIconSubMenu: !!icon }}>
      <RcSubMenu
        title={renderTitle()}
        expandIcon={
          isUndefined(expandIcon) ? (
            <DownOutlined color="#313E75" size="12px" className={`${prefixCls}-submenu-arrow`} />
          ) : (
            expandIcon
          )
        }
        {...restProps}
        inlineIndent={inlineIndent}
      >
        {inlineCollapsed && <li className={`${prefixCls}-collapsed-submenu-title`}>{title}</li>}
        {children}
      </RcSubMenu>
    </SubMenuContext.Provider>
  );
};

SubMenu.displayName = 'GIODesignSubMenu';
SubMenu.isSubMenu = true;
export default SubMenu;
