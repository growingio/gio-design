import React, { useContext } from 'react';
import { Item as RcMenuItem } from 'rc-menu';
import { IMenuItemProps } from './interface';
import MenuTitle from './MenuTitle';
import { MenuContext, SubMenuContext, getInlineIndent } from './MenuContext';
import Tooltip from '../tooltip';

const MenuItem = (props: IMenuItemProps) => {
  const { icon, children, ...restProps } = props;
  const { verticalIndent, inlineCollapsed } = useContext(MenuContext);
  const { inSubMenu, inIconSubMenu } = useContext(SubMenuContext);
  const inlineIndent = getInlineIndent(verticalIndent, inSubMenu, inIconSubMenu);

  return (
    <Tooltip title={children} disabled={!inlineCollapsed || inSubMenu} placement="right">
      <RcMenuItem {...restProps} inlineIndent={inlineIndent}>
        <MenuTitle title={children} icon={icon} />
      </RcMenuItem>
    </Tooltip>
  );
};

MenuItem.isMenuItem = true;
export default MenuItem;
